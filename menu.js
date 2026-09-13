// Mobile menu toggle and responsive close logic
(function(){
  const toggleBtn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav[data-collapsible]');
  if(!toggleBtn || !nav) return;

  function setOpen(open){
    nav.classList.toggle('open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
  }

  toggleBtn.addEventListener('click', ()=> setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A') setOpen(false);
  });
  window.addEventListener('resize', ()=>{
    if(window.innerWidth > 600) setOpen(false);
  });
})();


// Back-to-top. Lives here because menu.js is the one script every page loads.
(function () {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
    + 'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
    + '<path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const toggle = () => {
    btn.classList.toggle('is-shown', window.scrollY > window.innerHeight * 0.6);
  };

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' });
  });

  toggle();
  window.addEventListener('scroll', toggle, { passive: true });
  window.addEventListener('resize', toggle);
})();
