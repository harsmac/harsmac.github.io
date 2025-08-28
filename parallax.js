// Minimal parallax: update a CSS variable based on scroll
(function(){
  const root = document.documentElement;
  const update = () => {
    root.style.setProperty('--scroll', String(window.scrollY || 0));
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
})();
