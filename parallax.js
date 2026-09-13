// Wave background parallax.
// Drives --wave-y across the layer's 30vh of headroom over the whole page,
// so the waves drift slower than the content but always stay behind it.
(function () {
  const root = document.documentElement;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const waveBg = document.querySelector('.wave-bg');

  const update = () => {
    if (reduced.matches) return root.style.setProperty('--wave-y', '0px');
    const vh = window.innerHeight || 1;
    // Measure the wave layer's own box. window.innerHeight grows when a mobile
    // URL bar hides, while a position:fixed element keeps the small viewport;
    // using the window there shifted the layers further than their headroom
    // allowed and exposed their flat bottom edge as a hard horizontal line.
    const boxH = (waveBg && waveBg.clientHeight) || vh;
    const scrollable = Math.max(1, document.documentElement.scrollHeight - vh);
    const progress = Math.min(1, Math.max(0, (window.scrollY || 0) / scrollable));
    root.style.setProperty('--wave-y', `${-progress * boxH * 0.3}px`);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  reduced.addEventListener('change', update);
})();

// Spin hero image on load and when scrolled through its midline
(function(){
  const hero = document.querySelector('.hero');
  const img = document.querySelector('.hero-photo img');
  if (!hero || !img) return;

  const setFlipByViewport = () => {
    const rect = hero.getBoundingClientRect();
    const viewportMid = window.innerHeight / 2;
    const heroMid = rect.top + rect.height / 2;
    const isCrossingMid = heroMid < viewportMid && rect.bottom > 0 && rect.top < window.innerHeight;
    // Trigger a 360 spin when crossing the midpoint into view
    if (isCrossingMid) triggerSpin();
  };

  // Flip once after first paint
  window.requestAnimationFrame(() => {
    triggerSpin();
    // then compute based on actual position
    setFlipByViewport();
  });

  window.addEventListener('scroll', setFlipByViewport, { passive: true });
  window.addEventListener('resize', setFlipByViewport);
})();

function triggerSpin(){
  const img = document.querySelector('.hero-photo img');
  if (!img) return;
  img.classList.remove('is-spinning');
  // restart animation
  void img.offsetWidth;
  img.classList.add('is-spinning');
}
