// Injects the shared header, social bar and footer into project detail pages.
// Nav links are derived from <section id> elements, so pages only ship content.
(function () {
  // Site root, derived from this script's own URL (it lives at the root).
  const SITE = new URL('.', document.currentScript.src).href;
  const ICONS = {
    github: ['https://github.com/harsmac', 'GitHub', 'M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.7 1.2 3.3.9.1-.8.4-1.2.7-1.5-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.4 1.3 1-.3 2-.4 3-.4s2 .1 3 .4C18 5.4 19 5.7 19 5.7c.6 1.7.2 3 .1 3.3.8.9 1.2 2 1.2 3.3 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6A12 12 0 0 0 12 .5z'],
    linkedin: ['https://www.linkedin.com/in/harshitha-machiraju', 'LinkedIn', 'M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.1c.5-1 1.8-2.1 3.8-2.1 4 0 4.8 2.6 4.8 6v8.6h-4V15c0-1.9 0-4.4-2.7-4.4-2.7 0-3.1 2.1-3.1 4.2V23h-4V8.5z'],
    email: ['mailto:harshitha.acad@gmail.com', 'Email', 'M12 13 2 6.76V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6.76L12 13zm10-9H2l10 6 10-6z'],
  };

  const svg = (d) =>
    `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${d}"/></svg>`;

  // Nav labels come from data-nav-label, else the heading - but a long
  // heading ("Method: Background-Debiased Contrastive Pairs") wrecks the bar,
  // so anything over 22 chars falls back to the section id instead.
  function labelFor(section) {
    if (section.dataset.navLabel) return section.dataset.navLabel;
    const heading = ((section.querySelector('h1,h2') || {}).textContent || '').trim();
    if (heading && heading.length <= 22) return heading;
    return section.id
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function navLinks() {
    return [...document.querySelectorAll('main section[id]')]
      .map((s) => {
        const label = labelFor(s);
        return label ? `<a href="#${s.id}">${label}</a>` : '';
      })
      .join('');
  }

  function build() {
    const wave = '<div class="wave-bg" aria-hidden="true"><span></span></div>';
    const social =
      '<aside class="social-bar" aria-label="Social links">' +
      Object.values(ICONS)
        .map(([href, label, d]) => {
          const ext = href.startsWith('mailto:') ? '' : ' target="_blank" rel="noreferrer"';
          return `<a href="${href}" aria-label="${label}"${ext}>${svg(d)}</a>`;
        })
        .join('') +
      '</aside>';
    const header =
      '<header class="site-header">' +
      `<a class="brand" href="${SITE}">HM</a>` +
      '<button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">☰</button>' +
      '<nav class="site-nav" data-collapsible>' +
      `<a href="${SITE}">Home</a>${navLinks()}` +
      '<input id="theme-toggle" type="checkbox" class="theme-toggle-input" aria-label="Toggle dark mode" />' +
      '<label for="theme-toggle" class="theme-toggle" title="Toggle theme" aria-hidden="true"></label>' +
      '</nav></header>';

    document.body.insertAdjacentHTML('afterbegin', wave + social + header);
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div class="section back-link"><a href="${SITE}" class="primary-btn">← Back to home</a></div>` +
        '<footer class="copyright"><p>© 2026 Harshitha Machiraju. All rights reserved.</p></footer>'
    );
  }

  // A wide table makes the whole PAGE scroll sideways on a phone. Give each one
  // its own scroll container instead, so only the table moves.
  document.querySelectorAll('main table').forEach((t) => {
    if (t.parentElement.classList.contains('table-wrap')) return;
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    t.parentNode.insertBefore(wrap, t);
    wrap.appendChild(t);
  });

  // A figure whose file is missing should leave a gap, not a broken-image box.
  // (Its caption goes with it.)
  document.querySelectorAll('main img').forEach((img) => {
    img.addEventListener('error', () => {
      const caption = img.nextElementSibling;
      if (caption && caption.classList.contains('caption')) caption.hidden = true;
      img.hidden = true;
    });
  });

  // Runs synchronously: this script sits at the end of <body>, before
  // menu.js / theme.js, which need the injected header to already exist.
  build();
})();
