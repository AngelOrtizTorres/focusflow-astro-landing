// theme-toggle.js
(function () {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY);
  }

  function detectPreferredTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function applyTheme(theme) {
    root.style.colorScheme = theme;
  }

  function updateIcon(button, theme) {
    if (!button) return;

    const isDark = theme === "dark";

    if (isDark) {
      button.innerHTML = '<span class="material-symbols-outlined">light_mode</span>';
      button.setAttribute("aria-label", "Cambiar a modo claro");
    } else {
      button.innerHTML = '<span class="material-symbols-outlined">dark_mode</span>';
      button.setAttribute("aria-label", "Cambiar a modo oscuro");
    }
  }

  function init() {
    const button = document.getElementById("theme-toggle");

    const initialTheme = getSavedTheme() || detectPreferredTheme();
    applyTheme(initialTheme);
    updateIcon(button, initialTheme);

    if (button) {
      button.addEventListener("click", () => {
        const current = root.style.colorScheme || detectPreferredTheme();
        const next = current === "dark" ? "light" : "dark";

        applyTheme(next);
        localStorage.setItem(STORAGE_KEY, next);
        updateIcon(button, next);
      });
    }
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();