// Minimal parallax: update a CSS variable based on scroll
(function(){
  const root = document.documentElement;
  const update = () => {
    root.style.setProperty('--scroll', String(window.scrollY || 0));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// Flip hero image on load and when scrolled through its midline
(function(){
  const hero = document.querySelector('.hero');
  const img = document.querySelector('.hero-photo img');
  if (!hero || !img) return;

  const setFlipByViewport = () => {
    const rect = hero.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const heroMid = rect.top + rect.height / 2;
    const isCrossingMid = heroMid < viewportMid && rect.bottom > 0 && rect.top < window.innerHeight;
    img.classList.toggle('is-flipped', isCrossingMid);
  };

  // Flip once after first paint
  window.requestAnimationFrame(() => {
    img.classList.add('is-flipped');
    // then compute based on actual position
    setFlipByViewport();
  });

  window.addEventListener('scroll', setFlipByViewport, { passive: true });
  window.addEventListener('resize', setFlipByViewport);
})();
