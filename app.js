import { SPARROW_CONFIG } from "./config.js";
import { TRANSLATIONS } from "./i18n.js";
import { mountSparrowLogo } from "./sparrow-logo.js";
import { mountOnionAnimation } from "./onion-animation.js";

const STORAGE_LANG_KEY = "sparrow_lang";

function detectInitialLang() {
  const saved = localStorage.getItem(STORAGE_LANG_KEY);
  if (saved === "en" || saved === "de") return saved;
  return navigator.language && navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

function getNested(obj, path) {
  return path.split(".").reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : null), obj);
}

let currentLang = detectInitialLang();

function applyTranslations(lang) {
  currentLang = lang;
  localStorage.setItem(STORAGE_LANG_KEY, lang);
  document.documentElement.lang = lang;

  const dict = TRANSLATIONS[lang];
  document.title = dict.pageTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", dict.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const val = getNested(dict, el.getAttribute("data-i18n"));
    if (typeof val === "string") {
      el.textContent = val;
    }
  });

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
  });

  updatePlayButtonLabel();
}

function wireConfigLinks() {
  document.querySelectorAll("[data-config-href]").forEach((el) => {
    const key = el.getAttribute("data-config-href");
    if (SPARROW_CONFIG[key]) {
      el.setAttribute("href", SPARROW_CONFIG[key]);
    }
  });

  document.querySelectorAll("[data-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-placeholder");
    const entry = SPARROW_CONFIG[key];
    if (!entry) return;

    if (!entry.isPlaceholder && entry.url) {
      el.setAttribute("href", entry.url);
      if (entry.url.startsWith("http")) {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener noreferrer");
      }
    }
  });
}

// Sparrow Logo Animation
const logoCanvas = document.getElementById("sparrow-hero-canvas");
const logoStage = document.getElementById("logo-stage");
const replayLogoBtn = document.getElementById("replay-logo-btn");
const sparrowLogo = logoCanvas ? mountSparrowLogo(logoCanvas) : null;

if (logoStage && sparrowLogo) {
  logoStage.addEventListener("click", () => sparrowLogo.triggerSend());
  logoStage.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      sparrowLogo.triggerSend();
    }
  });
}

if (replayLogoBtn && sparrowLogo) {
  replayLogoBtn.addEventListener("click", () => sparrowLogo.replay());
}

// Onion Routing Animation
const onionCanvas = document.getElementById("onion-canvas");
const onionPlayBtn = document.getElementById("onion-play-btn");
const decoysToggle = document.getElementById("decoys-toggle");
const onionAnim = onionCanvas
  ? mountOnionAnimation(onionCanvas, () => TRANSLATIONS[currentLang].comm.canvasLabels)
  : null;

function updatePlayButtonLabel() {
  if (!onionPlayBtn || !onionAnim) return;
  const dict = TRANSLATIONS[currentLang].comm;
  onionPlayBtn.textContent = onionAnim.isPlaying() ? dict.pause : dict.play;
}

if (onionAnim) {
  document.querySelectorAll("[data-hops]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hops = Number(btn.getAttribute("data-hops"));
      onionAnim.setHops(hops);
      document.querySelectorAll("[data-hops]").forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  if (decoysToggle) {
    decoysToggle.addEventListener("change", () => {
      onionAnim.setDecoys(decoysToggle.checked);
    });
  }

  if (onionPlayBtn) {
    onionPlayBtn.addEventListener("click", () => {
      onionAnim.setPlaying(!onionAnim.isPlaying());
      updatePlayButtonLabel();
    });
  }

  document.querySelectorAll("#comm-steps .step-card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = Number(card.getAttribute("data-step"));
      onionAnim.setStep(idx);
      document.querySelectorAll("#comm-steps .step-card").forEach((c) => c.classList.toggle("active", c === card));
    });
  });
}

// Language buttons
document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    applyTranslations(btn.getAttribute("data-lang"));
  });
});

// Mobile menu
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Privacy-friendly YouTube Facade
const loadVideoBtn = document.getElementById("load-video-btn");
const videoFrame = document.getElementById("video-frame");
const videoPoster = document.getElementById("video-poster");
if (loadVideoBtn && videoFrame && videoPoster) {
  loadVideoBtn.addEventListener("click", () => {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${SPARROW_CONFIG.youtubeVideoId}?autoplay=1&rel=0`;
    iframe.title = "Sparrow Product Video";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    videoPoster.remove();
    videoFrame.appendChild(iframe);
  });
}

// Placeholder Modal
const modal = document.getElementById("placeholder-modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const modalSecondary = document.getElementById("modal-secondary-link");
const modalClose = document.getElementById("modal-close-btn");

function openPlaceholderModal(type) {
  const m = TRANSLATIONS[currentLang].modal;
  modalSecondary.style.display = "none";

  if (type === "betaTest") {
    modalTitle.textContent = m.betaTitle;
    modalBody.textContent = m.betaBody;
    modalSecondary.textContent = m.betaAction;
    modalSecondary.href = SPARROW_CONFIG.githubReleasesUrl;
    modalSecondary.style.display = "inline-flex";
  } else if (type === "buyMeACoffee") {
    modalTitle.textContent = m.coffeeTitle;
    modalBody.textContent = m.coffeeBody;
  } else if (type === "supporter") {
    modalTitle.textContent = m.supporterTitle;
    modalBody.textContent = m.supporterBody;
  } else if (type === "contact") {
    modalTitle.textContent = m.contactTitle;
    modalBody.textContent = m.contactBody;
    modalSecondary.textContent = "GitHub Issues";
    modalSecondary.href = SPARROW_CONFIG.githubIssuesUrl;
    modalSecondary.style.display = "inline-flex";
  }

  modal.classList.add("open");
  modalClose.focus();
}

function closePlaceholderModal() {
  modal.classList.remove("open");
}

document.querySelectorAll("[data-placeholder]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const key = el.getAttribute("data-placeholder");
    const entry = SPARROW_CONFIG[key];
    if (entry && entry.isPlaceholder) {
      e.preventDefault();
      openPlaceholderModal(key);
    }
  });
});

if (modal && modalClose) {
  modalClose.addEventListener("click", closePlaceholderModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePlaceholderModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closePlaceholderModal();
    }
  });
}

// Scroll Reveal
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Active Nav Highlighting
const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          document.querySelectorAll(".nav-links a").forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));
}

wireConfigLinks();
applyTranslations(currentLang);
