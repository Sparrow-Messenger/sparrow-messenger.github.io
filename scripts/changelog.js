import { CHANGELOG_I18N } from "./changelog.i18n.js";
import { SPARROW_CONFIG } from "./config.js";

const STORAGE_LANG_KEY = "sparrow_lang";
const supportedLanguages = Object.keys(CHANGELOG_I18N);
const savedLanguage = localStorage.getItem(STORAGE_LANG_KEY);
const initialLanguage = supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : navigator.language.toLowerCase().startsWith("de")
    ? "de"
    : "en";
let currentLanguage = initialLanguage;
let releases = [];
let loadingState = "loading";

function getNested(object, path) {
  return path.split(".").reduce((value, part) => (value && value[part] !== undefined ? value[part] : null), object);
}

function renderEntries(dictionary) {
  const entryList = document.getElementById("changelog-list");
  const status = document.getElementById("changelog-status");
  entryList.replaceChildren();
  entryList.hidden = releases.length === 0;

  if (loadingState === "loading") {
    status.textContent = dictionary.loadingMessage;
    status.hidden = false;
  } else if (loadingState === "error") {
    status.textContent = dictionary.errorMessage;
    status.hidden = false;
  } else if (releases.length === 0) {
    status.textContent = dictionary.emptyMessage;
    status.hidden = false;
  } else {
    status.hidden = true;
  }

  releases.forEach((release) => {
    const item = document.createElement("li");
    item.className = "changelog-entry";

    const heading = document.createElement("h2");
    const releaseLink = document.createElement("a");
    releaseLink.href = release.html_url;
    releaseLink.target = "_blank";
    releaseLink.rel = "noopener noreferrer";
    releaseLink.textContent = release.name || release.tag_name;
    heading.appendChild(releaseLink);
    item.appendChild(heading);

    const date = document.createElement("time");
    date.dateTime = release.published_at;
    date.textContent = new Intl.DateTimeFormat(currentLanguage === "de" ? "de-DE" : "en-US", {
      dateStyle: "medium"
    }).format(new Date(release.published_at));

    const metadata = document.createElement("div");
    metadata.className = "changelog-release-meta";
    const tag = document.createElement("code");
    tag.textContent = release.tag_name;
    metadata.append(date, tag);
    if (release.prerelease) {
      const preRelease = document.createElement("span");
      preRelease.textContent = dictionary.preRelease;
      metadata.appendChild(preRelease);
    }
    item.appendChild(metadata);

    if (release.body) {
      const notes = document.createElement("details");
      notes.className = "changelog-release-notes";
      const summary = document.createElement("summary");
      summary.textContent = dictionary.releaseNotes;
      const body = document.createElement("p");
      body.textContent = release.body;
      notes.append(summary, body);
      item.appendChild(notes);
    }
    entryList.appendChild(item);
  });
}

function applyLanguage(language) {
  currentLanguage = language;
  const dictionary = CHANGELOG_I18N[language];
  document.documentElement.lang = language;
  document.title = dictionary.pageTitle;
  document.querySelector('meta[name="description"]').setAttribute("content", dictionary.metaDescription);

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = getNested(dictionary, element.dataset.i18n);
    if (typeof value === "string") element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const value = getNested(dictionary, element.dataset.i18nAriaLabel);
    if (typeof value === "string") element.setAttribute("aria-label", value);
  });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    const selected = button.dataset.lang === language;
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  renderEntries(dictionary);
  localStorage.setItem(STORAGE_LANG_KEY, language);
}

function isValidRelease(release) {
  if (
    !release ||
    typeof release !== "object" ||
    release.draft ||
    typeof release.tag_name !== "string" ||
    typeof release.html_url !== "string" ||
    typeof release.published_at !== "string" ||
    Number.isNaN(Date.parse(release.published_at))
  ) {
    return false;
  }

  try {
    const url = new URL(release.html_url);
    return url.protocol === "https:" && url.hostname === "github.com";
  } catch {
    return false;
  }
}

async function loadReleases() {
  try {
    const response = await fetch(SPARROW_CONFIG.githubReleasesApiUrl, {
      headers: { Accept: "application/vnd.github+json" }
    });
    if (!response.ok) {
      throw new Error(`GitHub Releases API returned HTTP ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("GitHub Releases API returned an unexpected response");
    }

    releases = data
      .filter(isValidRelease)
      .sort((left, right) => Date.parse(right.published_at) - Date.parse(left.published_at));
    loadingState = "loaded";
  } catch (error) {
    loadingState = "error";
    console.error("Could not load GitHub releases for the changelog.", error);
  }

  renderEntries(CHANGELOG_I18N[currentLanguage]);
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

document.getElementById("all-releases-link").href = SPARROW_CONFIG.githubReleasesUrl;

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");
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

applyLanguage(initialLanguage);
loadReleases();
