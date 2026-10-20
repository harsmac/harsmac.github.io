// Theme toggle with persistence.
// The class lives on <html> so the early script in <head> can set it before
// first paint (no flash). Default = follow the OS.
(function () {
  const storageKey = 'hm-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function isDark() {
    return root.classList.contains('dark') || (!root.classList.contains('light') && systemDark.matches);
  }

  function applyTheme(theme) {
    root.classList.remove('light', 'dark');
    if (theme) root.classList.add(theme);
    if (toggle) toggle.checked = isDark();
  }

  const saved = localStorage.getItem(storageKey);
  applyTheme(saved === 'dark' || saved === 'light' ? saved : '');

  if (toggle) {
    toggle.addEventListener('change', () => {
      const next = toggle.checked ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  // Follow the OS while the user has not made an explicit choice
  systemDark.addEventListener('change', () => {
    if (!localStorage.getItem(storageKey)) applyTheme('');
  });
})();
