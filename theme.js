// Theme toggle with persistence: light -> dark -> pink -> light.
// The class lives on <html> so the early script in <head> can set it before
// first paint (no flash). Default = follow the OS (light or dark).
(function () {
  const storageKey = 'hm-theme';
  const MODES = ['light', 'dark', 'pink'];
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // The mode actually on screen, resolving "follow the OS" to light or dark.
  function current() {
    return MODES.find((m) => root.classList.contains(m)) || (systemDark.matches ? 'dark' : 'light');
  }

  function applyTheme(theme) {
    root.classList.remove(...MODES);
    if (theme) root.classList.add(theme);
    if (toggle) toggle.dataset.mode = current();
  }

  const saved = localStorage.getItem(storageKey);
  applyTheme(MODES.includes(saved) ? saved : '');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const next = MODES[(MODES.indexOf(current()) + 1) % MODES.length];
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  // Follow the OS while the user has not made an explicit choice
  systemDark.addEventListener('change', () => {
    if (!localStorage.getItem(storageKey)) applyTheme('');
  });
})();
