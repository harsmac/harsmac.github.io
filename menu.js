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

