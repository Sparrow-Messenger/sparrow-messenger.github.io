/**
 * Faithful Canvas2D port of Sparrow's StartupArtwork.kt (SparrowAnimation).
 * 1000 x 1000 logical coordinate space:
 * A sparrow flies in from top-left, flaps its wings, and morphs smoothly into the
 * two halves of the Sparrow shield with a repeating pulse ring.
 */

const VIEWPORT = 1000;
const TOTAL_MILLIS = 2400;
const PULSE_MILLIS = 2600;
const PULSE_RING_MILLIS = 1500;
const FIRST_PULSE_DELAY_MILLIS = 1720;

const CENTER = { x: 500, y: 500 };
const HEAD_ANCHOR = { x: 532, y: 374 };
const SHIELD_CENTER = { x: 500, y: 600 };

const LINE_WIDTH = 9;
const INNER_WIDTH = 4;
const INNER_ALPHA = 0.35;
const DETAIL_WIDTH = 6;
const DETAIL_ALPHA = 0.6;
const RING_WIDTH = 3;
const RING_ALPHA = 0.5;
const FLAP_DEGREES = 16;
const FLAP_HERTZ = 2.6;
const HEAD_X = 494;
const PULSE_BUMP = 0.018;
const PULSE_BUMP_RISE = 0.12;
const PULSE_BUMP_FALL = 0.4;

const FLIGHT_CORNERS = [
  { x: 490, y: 380 },
  { x: 86, y: 196 },
  { x: 176, y: 260 },
  { x: 118, y: 282 },
  { x: 214, y: 302 },
  { x: 176, y: 336 },
  { x: 276, y: 334 },
  { x: 478, y: 442 }
];

const FLIGHT_BOWS = [-0.13, 0.03, -0.02, 0.03, -0.02, 0.03, -0.12, 0];

const SHIELD_SEGMENTS = [
  [{ x: 500, y: 358 }, { x: 412.5, y: 360 }, { x: 315, y: 348 }, { x: 250, y: 326 }],
  [{ x: 250, y: 326 }, { x: 247.5, y: 358 }, { x: 246.2, y: 390 }, { x: 247.5, y: 420 }],
  [{ x: 247.5, y: 420 }, { x: 248.8, y: 450 }, { x: 251.2, y: 476 }, { x: 257.5, y: 500 }],
  [{ x: 257.5, y: 500 }, { x: 263.8, y: 526 }, { x: 270, y: 554 }, { x: 280, y: 580 }],
  [{ x: 280, y: 580 }, { x: 290, y: 606 }, { x: 302.5, y: 634 }, { x: 320, y: 660 }],
  [{ x: 320, y: 660 }, { x: 337.5, y: 686 }, { x: 356.2, y: 712 }, { x: 377.5, y: 736 }],
  [{ x: 377.5, y: 736 }, { x: 410, y: 774 }, { x: 452.5, y: 816 }, { x: 500, y: 846 }],
  [{ x: 500, y: 846 }, { x: 500, y: 846 }, { x: 500, y: 846 }, { x: 500, y: 846 }]
];

const HEAD_PATH = new Path2D(
  "M414 262 L452 246 L440 222 C474 190 530 176 578 186 C612 192 636 210 648 232 L714 264 L652 290 " +
  "C640 304 618 312 600 314 C592 340 580 362 566 374 C546 380 518 380 500 374 C474 358 454 336 440 306 " +
  "C428 292 418 278 414 262 Z"
);
const EYE_PATH = new Path2D("M548 230 L620 244 L606 258 C588 262 566 258 554 246 Z");
const BEAK_LINE_PATH = new Path2D("M652 262 L700 264");
const INNER_SHIELD_PATH = new Path2D(
  "M500 400 C462.5 400 362.5 392 310 378 C305 470 315 556 355 640 C390 712 440 762 500 798 " +
  "C560 762 610 712 645 640 C685 556 695 470 690 378 C637.5 392 537.5 400 500 400 Z"
);
const RING_PATH = new Path2D(
  "M500 358 C412.5 360 315 348 250 324 C242.5 440 250 560 307.5 660 C355 742 425 800 500 846 " +
  "C575 800 645 742 692.5 660 C750 560 757.5 440 750 324 C685 348 587.5 360 500 358 Z"
);

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function lerpPt(a, b, t) {
  return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) };
}

function progress(millis, start, duration) {
  return clamp((millis - start) / duration, 0, 1);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function rotatedAround(pt, center, degrees) {
  const rad = (degrees * Math.PI) / 180;
  const dx = pt.x - center.x;
  const dy = pt.y - center.y;
  const c = Math.cos(rad);
  const s = Math.sin(rad);
  return {
    x: center.x + dx * c - dy * s,
    y: center.y + dx * s + dy * c
  };
}

function bowedControls(start, end, bow) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const nx = dy * bow;
  const ny = -dx * bow;
  return [
    { x: start.x + dx / 3 + nx, y: start.y + dy / 3 + ny },
    { x: start.x + (dx * 2) / 3 + nx, y: start.y + (dy * 2) / 3 + ny }
  ];
}

function computeWingSegments(morph, flap) {
  const shoulder = FLIGHT_CORNERS[0];
  const corners = FLIGHT_CORNERS.map((corner, index) =>
    rotatedAround(
      corner,
      shoulder,
      flap * FLAP_DEGREES * (index === 0 || index === 7 ? 0 : 1)
    )
  );
  return FLIGHT_CORNERS.map((_, index) => {
    const start = corners[index];
    const end = corners[(index + 1) % corners.length];
    const controls = bowedControls(start, end, FLIGHT_BOWS[index]);
    const flight = [start, controls[0], controls[1], end];
    return flight.map((pt, pIdx) => lerpPt(pt, SHIELD_SEGMENTS[index][pIdx], morph));
  });
}

function traceWingPath(ctx, segments, mirrored, from, to) {
  const side = (pt) => (mirrored ? { x: VIEWPORT - pt.x, y: pt.y } : pt);
  ctx.beginPath();
  const start = side(segments[from][0]);
  ctx.moveTo(start.x, start.y);
  for (let i = from; i < to; i++) {
    const seg = segments[i];
    const c1 = side(seg[1]);
    const c2 = side(seg[2]);
    const end = side(seg[3]);
    ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
  }
}

function buildNeckCutPath(morph) {
  const y = (shieldY) => lerp(396, shieldY, morph);
  const path = new Path2D();
  path.moveTo(0, 0);
  path.lineTo(VIEWPORT, 0);
  path.lineTo(VIEWPORT, y(330));
  path.lineTo(750, y(330));
  path.bezierCurveTo(685, y(352), 587.5, y(364), 500, y(362));
  path.bezierCurveTo(412.5, y(364), 315, y(352), 250, y(330));
  path.lineTo(0, y(330));
  path.closePath();
  return path;
}

function frameAt(millis) {
  const entrance = easeOut(progress(millis, 0, 750));
  const morph = easeInOut(progress(millis, 950, 600));
  const impactTime = progress(millis, 1500, 280);
  const impact = impactTime < 0.3 ? impactTime / 0.3 : 1 - (impactTime - 0.3) / 0.7;
  const flapStrength = 1 - progress(millis, 750, 200) * 0.8;
  return {
    visibility: progress(millis, 0, 160),
    offsetX: lerp(-460, 0, entrance),
    offsetY: lerp(-260, 0, entrance),
    rotation: lerp(-14, 0, entrance),
    scale: lerp(0.55, 1, entrance) * (1 - impact * 0.03),
    morph,
    flap: Math.sin((millis / 1000) * 2 * Math.PI * FLAP_HERTZ) * flapStrength,
    inner: clamp((morph - 0.7) / 0.3, 0, 1),
    ring: progress(millis, 1520, 700)
  };
}

function getPulseRing(millis) {
  const p = clamp(millis / PULSE_RING_MILLIS, 0, 1);
  return p < 1 ? p : 0;
}

function getPulseBump(ring) {
  const bump =
    ring < PULSE_BUMP_RISE
      ? ring / PULSE_BUMP_RISE
      : Math.max(0, 1 - (ring - PULSE_BUMP_RISE) / PULSE_BUMP_FALL);
  return 1 + PULSE_BUMP * bump;
}

export function mountSparrowLogo(canvas, options = {}) {
  const primaryColor = options.primaryColor || "#0099B8";
  const backgroundColor = options.backgroundColor || "#EEF2F5";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = canvas.getContext("2d");
  let startTime = performance.now();
  let sendStart = null;
  let rafId = null;

  function computeSendTransform(now) {
    if (sendStart === null) return { offsetX: 0, scale: 1, rotation: 0 };
    const elapsed = now - sendStart;
    if (elapsed > 360) {
      sendStart = null;
      return { offsetX: 0, scale: 1, rotation: 0 };
    }
    // Scale: 1 -> 0.94 (90ms) -> 1.02 (110ms) -> 1 (140ms)
    let scale = 1;
    if (elapsed < 90) scale = lerp(1, 0.94, elapsed / 90);
    else if (elapsed < 200) scale = lerp(0.94, 1.02, (elapsed - 90) / 110);
    else if (elapsed < 340) scale = lerp(1.02, 1, (elapsed - 200) / 140);

    // Rotation: 0 -> -2deg (100ms) -> 0 (180ms)
    let rotation = 0;
    if (elapsed < 100) rotation = lerp(0, -2, elapsed / 100);
    else if (elapsed < 280) rotation = lerp(-2, 0, (elapsed - 100) / 180);

    // Offset: 0 -> 14 (140ms) -> 0 (200ms)
    let offsetX = 0;
    if (elapsed < 140) offsetX = lerp(0, 14, elapsed / 140);
    else if (elapsed < 340) offsetX = lerp(14, 0, (elapsed - 140) / 200);

    return { offsetX, scale, rotation };
  }

  function scaleAround(pivot, sx, sy = sx) {
    ctx.translate(pivot.x, pivot.y);
    ctx.scale(sx, sy);
    ctx.translate(-pivot.x, -pivot.y);
  }

  function rotateAround(pivot, degrees) {
    ctx.translate(pivot.x, pivot.y);
    ctx.rotate((degrees * Math.PI) / 180);
    ctx.translate(-pivot.x, -pivot.y);
  }

  function drawRing(progressVal) {
    if (progressVal <= 0 || progressVal >= 1) return;
    ctx.save();
    scaleAround(SHIELD_CENTER, 1.04 + progressVal * 0.16);
    ctx.globalAlpha = (1 - progressVal) * RING_ALPHA;
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = RING_WIDTH;
    ctx.stroke(RING_PATH);
    ctx.restore();
  }

  function drawLineHead(frame, alpha) {
    const headScale = lerp(0.8, 1.1, frame.morph);
    const headAt = { x: HEAD_X, y: lerp(402, 372, frame.morph) };

    const transformHead = () => {
      ctx.translate(headAt.x - HEAD_ANCHOR.x, headAt.y - HEAD_ANCHOR.y);
      scaleAround(HEAD_ANCHOR, headScale);
    };

    // Mask behind head with background color
    ctx.save();
    transformHead();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = backgroundColor;
    ctx.fill(HEAD_PATH);
    ctx.restore();

    // Draw clipped head details
    ctx.save();
    ctx.clip(buildNeckCutPath(frame.morph));
    transformHead();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = LINE_WIDTH / headScale;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke(HEAD_PATH);

    ctx.fillStyle = primaryColor;
    ctx.fill(EYE_PATH);

    ctx.globalAlpha = alpha * DETAIL_ALPHA;
    ctx.lineWidth = DETAIL_WIDTH / headScale;
    ctx.stroke(BEAK_LINE_PATH);
    ctx.restore();
  }

  function drawFlyingMark(frame) {
    const alpha = frame.visibility;
    if (alpha <= 0) return;

    const segments = computeWingSegments(frame.morph, frame.flap);
    const bodyEdgeAlpha = 1 - clamp(frame.morph * 1.6, 0, 1);

    ctx.save();
    ctx.translate(frame.offsetX, frame.offsetY);
    rotateAround(CENTER, frame.rotation);
    scaleAround(CENTER, frame.scale);

    ctx.strokeStyle = primaryColor;
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.globalAlpha = alpha;
    traceWingPath(ctx, segments, false, 0, 7);
    ctx.stroke();
    traceWingPath(ctx, segments, true, 0, 7);
    ctx.stroke();

    if (bodyEdgeAlpha > 0.001) {
      ctx.globalAlpha = alpha * bodyEdgeAlpha;
      traceWingPath(ctx, segments, false, 7, 8);
      ctx.stroke();
      traceWingPath(ctx, segments, true, 7, 8);
      ctx.stroke();
    }

    if (frame.inner > 0.001) {
      ctx.globalAlpha = alpha * frame.inner * INNER_ALPHA;
      ctx.lineWidth = INNER_WIDTH;
      ctx.stroke(INNER_SHIELD_PATH);
    }

    drawLineHead(frame, alpha);
    ctx.restore();
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(200, Math.round(rect.width));
    if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    }
  }

  function render(now) {
    resize();
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const elapsed = reducedMotion ? TOTAL_MILLIS : now - startTime;
    const timeVal = clamp(elapsed, 0, TOTAL_MILLIS);
    let pulseVal = 0;
    if (!reducedMotion && elapsed > TOTAL_MILLIS + FIRST_PULSE_DELAY_MILLIS) {
      pulseVal = (elapsed - TOTAL_MILLIS - FIRST_PULSE_DELAY_MILLIS) % PULSE_MILLIS;
    }

    const frame = frameAt(timeVal);
    const pulseRing = getPulseRing(pulseVal);
    const send = computeSendTransform(now);
    const unit = Math.min(width, height) / VIEWPORT;

    ctx.save();
    ctx.translate((width - VIEWPORT * unit) / 2 + send.offsetX * unit, (height - VIEWPORT * unit) / 2);
    ctx.scale(unit, unit);
    scaleAround(CENTER, send.scale);
    rotateAround(CENTER, send.rotation);

    ctx.save();
    scaleAround(SHIELD_CENTER, getPulseBump(pulseRing));
    drawFlyingMark(frame);
    ctx.restore();

    drawRing(frame.ring);
    drawRing(pulseRing);
    ctx.restore();

    if (!reducedMotion || sendStart !== null) {
      rafId = requestAnimationFrame(render);
    }
  }

  rafId = requestAnimationFrame(render);

  return {
    replay() {
      startTime = performance.now();
      if (rafId === null) rafId = requestAnimationFrame(render);
    },
    triggerSend() {
      sendStart = performance.now();
      if (rafId === null) rafId = requestAnimationFrame(render);
    },
    destroy() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
