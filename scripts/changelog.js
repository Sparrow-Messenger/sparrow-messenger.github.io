import { CHANGELOG_I18N } from "./changelog.i18n.js";

const STORAGE_LANG_KEY = "sparrow_lang";
const supportedLanguages = Object.keys(CHANGELOG_I18N);
const savedLanguage = localStorage.getItem(STORAGE_LANG_KEY);
const initialLanguage = supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : navigator.language.toLowerCase().startsWith("de")
    ? "de"
    : "en";

function getNested(object, path) {
  return path.split(".").reduce((value, part) => (value && value[part] !== undefined ? value[part] : null), object);
}

function renderEntries(dictionary) {
  const entryList = document.getElementById("changelog-list");
  const emptyState = document.getElementById("changelog-empty");
  entryList.replaceChildren();
  emptyState.hidden = dictionary.entries.length > 0;
  entryList.hidden = dictionary.entries.length === 0;

  dictionary.entries.forEach((entry) => {
    const item = document.createElement("li");
    item.className = "changelog-entry";

    const date = document.createElement("time");
    date.dateTime = entry.date;
    date.textContent = entry.dateLabel;
    item.appendChild(date);

    const heading = document.createElement("h2");
    heading.textContent = entry.title;
    item.appendChild(heading);

    const changes = document.createElement("ul");
    entry.changes.forEach((change) => {
      const changeItem = document.createElement("li");
      changeItem.textContent = change;
      changes.appendChild(changeItem);
    });
    item.appendChild(changes);
    entryList.appendChild(item);
  });
}

function applyLanguage(language) {
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

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

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
