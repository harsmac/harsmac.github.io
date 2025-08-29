// Dynamic section loader for modular content
(function() {
  const sections = {
    'background': 'sections/background.html',
    'papers': 'sections/papers.html', 
    'projects': 'sections/projects.html'
  };

  const loadedSections = new Set();
  const sectionContainers = new Map();

  // Create placeholder containers for each section
  function createSectionPlaceholders() {
    const main = document.querySelector('main');
    
    Object.keys(sections).forEach(sectionId => {
      const placeholder = document.createElement('div');
      placeholder.id = `placeholder-${sectionId}`;
      placeholder.className = 'section-placeholder';
      placeholder.innerHTML = '<div class="loading">Loading...</div>';
      
      // Insert after hero section
      const hero = document.querySelector('.hero');
      if (hero && sectionId === 'background') {
        hero.parentNode.insertBefore(placeholder, hero.nextSibling);
      } else {
        main.appendChild(placeholder);
      }
      
      sectionContainers.set(sectionId, placeholder);
    });
  }

  // Load section content
  async function loadSection(sectionId) {
    if (loadedSections.has(sectionId)) return;
    
    const container = sectionContainers.get(sectionId);
    if (!container) return;

    try {
      const response = await fetch(sections[sectionId]);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const html = await response.text();
      container.innerHTML = html;
      loadedSections.add(sectionId);
      
      // Re-initialize any section-specific scripts
      if (sectionId === 'papers') {
        initializePaperControls();
      }
    } catch (error) {
      console.error(`Failed to load section ${sectionId}:`, error);
      container.innerHTML = '<div class="error">Failed to load content</div>';
    }
  }

  // Load sections when they come into view
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id.replace('placeholder-', '');
        loadSection(sectionId);
      }
    });
  }

  // Initialize intersection observer
  function initializeObserver() {
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });

    sectionContainers.forEach(container => {
      observer.observe(container);
    });
  }

  // Initialize paper search and filter functionality
  function initializePaperControls() {
    const searchInput = document.getElementById('paper-search');
    const filterSelect = document.getElementById('paper-filter');
    const papers = document.querySelectorAll('.paper');

    if (!searchInput || !filterSelect) return;

    function filterPapers() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedTag = filterSelect.value.toLowerCase();

      papers.forEach(paper => {
        const title = paper.querySelector('.paper-title').textContent.toLowerCase();
        const tags = paper.dataset.tags.toLowerCase();
        const matchesSearch = title.includes(searchTerm);
        const matchesFilter = !selectedTag || tags.includes(selectedTag);

        paper.style.display = matchesSearch && matchesFilter ? 'block' : 'none';
      });
    }

    searchInput.addEventListener('input', filterPapers);
    filterSelect.addEventListener('change', filterPapers);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      createSectionPlaceholders();
      initializeObserver();
    });
  } else {
    createSectionPlaceholders();
    initializeObserver();
  }
})();
