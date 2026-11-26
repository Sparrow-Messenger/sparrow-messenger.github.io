/**
 * Interactive Onion Routing & Offline Mailbox Visualizer
 * Inspired by Sparrow's OnionGraphic.kt and docs/features/transport.md.
 */

const NODE_LAYOUTS = {
  2: [
    { x: 0.1, y: 0.72, role: "you", operator: null },
    { x: 0.34, y: 0.34, role: "home", operator: "Op A" },
    { x: 0.62, y: 0.74, role: "relay", operator: "Op B" },
    { x: 0.88, y: 0.38, role: "mailbox", operator: "Op C" }
  ],
  3: [
    { x: 0.08, y: 0.72, role: "you", operator: null },
    { x: 0.27, y: 0.32, role: "home", operator: "Op A" },
    { x: 0.49, y: 0.76, role: "relay", operator: "Op B" },
    { x: 0.69, y: 0.3, role: "relay", operator: "Op C" },
    { x: 0.9, y: 0.68, role: "mailbox", operator: "Op D" }
  ],
  5: [
    { x: 0.06, y: 0.72, role: "you", operator: null },
    { x: 0.21, y: 0.32, role: "home", operator: "Op A" },
    { x: 0.36, y: 0.76, role: "relay", operator: "Op B" },
    { x: 0.52, y: 0.28, role: "relay", operator: "Op C" },
    { x: 0.67, y: 0.76, role: "relay", operator: "Op D" },
    { x: 0.8, y: 0.32, role: "relay", operator: "Op E" },
    { x: 0.93, y: 0.68, role: "mailbox", operator: "Op F" }
  ]
};

const CONTROL_PLANE_POS = { x: 0.5, y: 0.1 };
const DECOY_TARGETS = [
  { x: 0.86, y: 0.17 },
  { x: 0.91, y: 0.85 }
];

const COLORS = {
  bg: "#071A2E",
  surface: "#102A46",
  surfaceHigh: "#17324D",
  primary: "#35E6FF",
  secondary: "#8AB9C7",
  tertiary: "#4FD3A3",
  warning: "#E0B050",
  text: "#F6FAFE",
  muted: "#B7C8D6",
  outline: "#668095",
  outlineVariant: "#2D4A62"
};

function easeInOut(v) {
  return v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2;
}

export function mountOnionAnimation(canvas, getLabels) {
  const ctx = canvas.getContext("2d");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let hopCount = 2;
  let decoysEnabled = true;
  let playing = !reducedMotion;
  let activeStep = 0; // 0: wrap, 1: circuit, 2: mailbox, 3: discovery
  let simTime = 0;
  let lastNow = performance.now();
  let rafId = null;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(320, Math.round(rect.width));
    const h = Math.max(240, Math.round(rect.height));
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
  }

  function drawRoundedRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
  }

  function drawControlPlane(w, h, labels, time, points) {
    const cp = { x: CONTROL_PLANE_POS.x * w, y: CONTROL_PLANE_POS.y * h };
    const home = points[1];
    const relay2 = points[2];

    // Subtle discovery path from Home -> Relay2 -> Control Plane
    ctx.save();
    ctx.setLineDash([4, 6]);
    ctx.strokeStyle = activeStep === 3 ? COLORS.tertiary : "rgba(102, 128, 149, 0.35)";
    ctx.lineWidth = activeStep === 3 ? 1.8 : 1.1;
    ctx.beginPath();
    ctx.moveTo(home.px, home.py);
    ctx.lineTo(cp.x - 42, cp.y + 12);
    ctx.moveTo(relay2.px, relay2.py);
    ctx.lineTo(cp.x + 42, cp.y + 12);
    ctx.stroke();
    ctx.restore();

    // Control Plane pill
    const pillW = Math.min(188, w * (w < 430 ? 0.58 : 0.36));
    const pillH = 30;
    ctx.save();
    drawRoundedRect(cp.x - pillW / 2, cp.y - pillH / 2, pillW, pillH, 15);
    ctx.fillStyle = activeStep === 3 ? "rgba(18, 61, 50, 0.9)" : "rgba(16, 42, 70, 0.88)";
    ctx.fill();
    ctx.strokeStyle = activeStep === 3 ? COLORS.tertiary : COLORS.outlineVariant;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.fillStyle = activeStep === 3 ? COLORS.tertiary : COLORS.secondary;
    ctx.font = w < 430 ? "600 10px system-ui, -apple-system, sans-serif" : "600 11px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labels.controlPlane, cp.x, cp.y + 0.5, pillW - 24);

    if (activeStep === 3) {
      const pulse = ((time % 1800) / 1800);
      ctx.beginPath();
      ctx.arc(cp.x, cp.y, 16 + pulse * 14, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(79, 211, 163, ${0.45 * (1 - pulse)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  function render(now) {
    const dt = now - lastNow;
    lastNow = now;
    if (playing) {
      simTime += dt;
    }

    resize();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const labels = getLabels();

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    // Subtle background dot grid
    ctx.fillStyle = "rgba(102, 128, 149, 0.14)";
    for (let gx = 24; gx < w; gx += 32) {
      for (let gy = 24; gy < h; gy += 32) {
        ctx.fillRect(gx, gy, 1.4, 1.4);
      }
    }

    const rawNodes = NODE_LAYOUTS[hopCount] || NODE_LAYOUTS[2];
    const compact = w < 430;
    const points = rawNodes.map((n) => ({
      ...n,
      px: n.x * w,
      py: (compact ? 0.2 + n.y * 0.5 : n.y) * h
    }));

    drawControlPlane(w, h, labels, simTime, points);

    const hops = points.length - 1;
    const hopDuration = 1350;
    const moveDuration = 1050;
    const pauseDuration = 950;
    const cycleDuration = hops * hopDuration + pauseDuration;
    const timeInCycle = Number.isFinite(simTime) ? simTime % cycleDuration : 0;

    const currentHop = Math.max(
      0,
      Math.min(points.length - 2, Math.floor(timeInCycle / hopDuration))
    );
    const inHop = timeInCycle - currentHop * hopDuration;
    const moved = easeInOut(Math.min(1, Math.max(0, inHop / moveDuration)));
    const packetPos = {
      x: points[currentHop].px + (points[currentHop + 1].px - points[currentHop].px) * moved,
      y: points[currentHop].py + (points[currentHop + 1].py - points[currentHop].py) * moved
    };
    const peeledCount = Math.floor(timeInCycle / hopDuration) + (inHop >= moveDuration ? 1 : 0);

    // Route dashed path
    ctx.save();
    ctx.setLineDash([5, 6]);
    ctx.lineDashOffset = -(simTime * 0.02);
    ctx.strokeStyle = COLORS.outline;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    points.forEach((pt, idx) => {
      if (idx === 0) ctx.moveTo(pt.px, pt.py);
      else ctx.lineTo(pt.px, pt.py);
    });
    ctx.stroke();
    ctx.restore();

    // Active traversed glow
    ctx.save();
    ctx.strokeStyle = "rgba(53, 230, 255, 0.36)";
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    ctx.moveTo(points[0].px, points[0].py);
    for (let i = 1; i <= currentHop; i++) {
      ctx.lineTo(points[i].px, points[i].py);
    }
    ctx.lineTo(packetPos.x, packetPos.y);
    ctx.stroke();
    ctx.restore();

    // Decoy envelopes branching from the final relay
    if (decoysEnabled) {
      const lastRelay = points[points.length - 2];
      const decoyProgress = Math.min(1, Math.max(0, (timeInCycle - (hops - 1.3) * hopDuration) / (hopDuration * 1.1)));
      DECOY_TARGETS.forEach((target, idx) => {
        const tx = target.x * w;
        const ty = target.y * h;
        ctx.save();
        ctx.setLineDash([3, 5]);
        ctx.strokeStyle = "rgba(138, 185, 199, 0.25)";
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(lastRelay.px, lastRelay.py);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(tx, ty, 5, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.surfaceHigh;
        ctx.fill();
        ctx.strokeStyle = COLORS.outlineVariant;
        ctx.stroke();

        ctx.fillStyle = COLORS.outline;
        ctx.font = "500 10px system-ui, -apple-system, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(labels.decoy, tx, ty + (idx === 0 ? -12 : 16));

        if (decoyProgress > 0 && decoyProgress < 1) {
          const dx = lastRelay.px + (tx - lastRelay.px) * easeInOut(decoyProgress);
          const dy = lastRelay.py + (ty - lastRelay.py) * easeInOut(decoyProgress);
          ctx.beginPath();
          ctx.arc(dx, dy, 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(138, 185, 199, 0.75)";
          ctx.fill();
        }
        ctx.restore();
      });
    }

    // Draw nodes and labels
    points.forEach((pt, idx) => {
      const isStart = idx === 0;
      const isMailbox = idx === points.length - 1;
      const isHome = idx === 1;
      const isActiveNode =
        (activeStep === 0 && isStart) ||
        (activeStep === 1 && !isStart && !isMailbox) ||
        (activeStep === 2 && isMailbox);

      // Node glow
      if (isActiveNode || idx === currentHop) {
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, 17, 0, Math.PI * 2);
        ctx.fillStyle = isMailbox ? "rgba(79, 211, 163, 0.14)" : "rgba(53, 230, 255, 0.14)";
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, isStart || isMailbox ? 9.5 : 8, 0, Math.PI * 2);
      if (isStart) {
        ctx.fillStyle = COLORS.text;
        ctx.fill();
      } else if (isMailbox) {
        ctx.fillStyle = COLORS.surface;
        ctx.fill();
        ctx.strokeStyle = COLORS.tertiary;
        ctx.lineWidth = 2.4;
        ctx.stroke();
      } else {
        ctx.fillStyle = COLORS.bg;
        ctx.fill();
        ctx.strokeStyle = idx <= currentHop ? COLORS.primary : COLORS.secondary;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Label placement above or below node
      const labelAbove = pt.y < 0.5;
      const labelY = labelAbove ? pt.py - 20 : pt.py + 22;
      let nodeTitle = labels.relay;
      if (isStart) nodeTitle = labels.you;
      else if (isHome) nodeTitle = labels.homeNode;
      else if (isMailbox) nodeTitle = labels.mailbox;

      ctx.fillStyle = isStart || isMailbox ? COLORS.text : COLORS.muted;
      ctx.font = compact ? "600 10px system-ui, -apple-system, sans-serif" : "600 11.5px system-ui, -apple-system, sans-serif";
      ctx.textBaseline = "middle";
      if (compact && isStart) {
        ctx.textAlign = "left";
        ctx.fillText(nodeTitle, Math.max(12, pt.px), labelY);
      } else if (compact && isMailbox) {
        ctx.textAlign = "right";
        ctx.fillText(nodeTitle, Math.min(w - 12, pt.px), labelY);
      } else {
        ctx.textAlign = "center";
        ctx.fillText(nodeTitle, pt.px, labelY);
      }

      if (pt.operator && w > 430) {
        ctx.fillStyle = COLORS.outline;
        ctx.font = "500 10px system-ui, -apple-system, sans-serif";
        ctx.fillText(pt.operator, pt.px, labelY + (labelAbove ? -13 : 13));
      }
    });

    // Onion packet with concentric encryption layers (outer layers peel as hops pass)
    const maxVisualLayers = Math.min(hops, 4);
    for (let layer = 0; layer < maxVisualLayers; layer++) {
      // Layers peel from outermost (layer 0) inward as peeledCount advances
      const layerRadius = 22 - layer * 4.5;
      if (peeledCount <= layer) {
        ctx.beginPath();
        ctx.arc(packetPos.x, packetPos.y, layerRadius, 0, Math.PI * 2);
        ctx.strokeStyle = COLORS.primary;
        ctx.globalAlpha = 0.9 - layer * 0.16;
        ctx.lineWidth = 1.7;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;

    // E2EE core packet (never peeled by relays)
    ctx.beginPath();
    ctx.arc(packetPos.x, packetPos.y, 5.5, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.primary;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(packetPos.x, packetPos.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = COLORS.bg;
    ctx.fill();

    // Subtle status pill at bottom-left
    const remaining = Math.max(1, hops - peeledCount);
    const layerLabel =
      peeledCount < hops
        ? `${labels.layersRemaining}: ${remaining}/${hops} + E2EE`
        : labels.e2eeLocked;
    ctx.fillStyle = "rgba(16, 42, 70, 0.85)";
    drawRoundedRect(14, h - 38, Math.min(230, w - 28), 26, 13);
    ctx.fill();
    ctx.strokeStyle = COLORS.outlineVariant;
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = COLORS.primary;
    ctx.font = "600 11px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(layerLabel, 26, h - 25);

    ctx.restore();
    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);

  return {
    setHops(count) {
      hopCount = NODE_LAYOUTS[count] ? count : 2;
      simTime = 0;
    },
    setDecoys(enabled) {
      decoysEnabled = Boolean(enabled);
    },
    setPlaying(nextPlaying) {
      playing = Boolean(nextPlaying);
    },
    isPlaying() {
      return playing;
    },
    setStep(stepIndex) {
      activeStep = stepIndex;
    },
    destroy() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
