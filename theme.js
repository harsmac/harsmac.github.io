// Simple theme toggle with persistence
(function () {
  const storageKey = 'hm-theme';
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    if (theme) document.body.classList.add(theme);
    if (toggle && toggle.type === 'checkbox') {
      toggle.checked = document.body.classList.contains('dark');
    }
  }

  // Load preference
  const saved = localStorage.getItem(storageKey);
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
  } else {
    applyTheme('');
  }

  // Wire up toggle
  if (toggle) {
    const handler = () => {
      const next = toggle.checked ? 'dark' : 'light';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    };
    toggle.addEventListener('change', handler);
  }
})();

