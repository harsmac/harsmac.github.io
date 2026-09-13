// Sections are now static markup in index.html, so crawlers (and anything that
// does not run JS) see the whole page. All that is left is the paper filter.
(function () {
  const searchInput = document.getElementById('paper-search');
  const filterSelect = document.getElementById('paper-filter');
  const papers = document.querySelectorAll('.paper');
  if (!searchInput || !filterSelect) return;

  function filterPapers() {
    const term = searchInput.value.toLowerCase();
    const tag = filterSelect.value.toLowerCase();
    papers.forEach((paper) => {
      const title = paper.querySelector('.paper-title').textContent.toLowerCase();
      const tags = (paper.dataset.tags || '').toLowerCase();
      paper.hidden = !(title.includes(term) && (!tag || tags.includes(tag)));
    });
  }

  searchInput.addEventListener('input', filterPapers);
  filterSelect.addEventListener('change', filterPapers);
})();
