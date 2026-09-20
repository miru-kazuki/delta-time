/**
 * DeltaTime — Search Module
 * Handles opening/closing the search modal and client-side filtering.
 */

const Search = (() => {
  'use strict';

  let modal;
  let input;
  let toggleBtn;
  let resultsContainer;

  // Mock data for client-side search demo
  const searchIndex = [
    { title: 'Godot 4.3 vs Unity 2024: Rendering Pipeline Deep Dive', url: 'article.html', category: 'Performance Analysis' },
    { title: 'Physics Engine Stress Test: 10,000 Rigid Bodies', url: 'article.html', category: 'Benchmark' },
    { title: 'Memory Profiling: GDScript vs C# Allocations', url: 'article.html', category: 'Analysis' },
    { title: 'Build Pipeline: Export Times and Output Optimization', url: 'article.html', category: 'Tooling' },
    { title: 'Asset Import Times: Large Scale Projects', url: 'article.html', category: 'Workflow' },
    { title: 'Battery Drain on Mobile Targets', url: 'article.html', category: 'Mobile' },
    { title: 'Average FPS Comparison', url: 'benchmarks.html', category: 'Data' },
    { title: 'DeltaTime Tech Stack', url: 'tech-stack.html', category: 'About' }
  ];

  function init() {
    modal = document.getElementById('search-modal');
    input = document.getElementById('search-input');
    toggleBtn = document.getElementById('search-toggle');

    if (!modal || !input) return;

    // Create results container
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    input.parentNode.appendChild(resultsContainer);

    if (toggleBtn) {
      toggleBtn.addEventListener('click', openModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (modal.classList.contains('is-open')) {
          closeModal();
        } else {
          openModal();
        }
      }
    });

    input.addEventListener('input', handleSearch);
  }

  function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    resultsContainer.innerHTML = '';
    
    if (query.length < 2) return;

    const matches = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) || 
      item.category.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      const ul = document.createElement('ul');
      ul.className = 'search-results-list';
      ul.style.listStyle = 'none';
      ul.style.padding = '0';
      ul.style.marginTop = 'var(--space-md)';
      
      matches.forEach(match => {
        const li = document.createElement('li');
        li.style.marginBottom = 'var(--space-sm)';
        
        const a = document.createElement('a');
        a.href = match.url;
        a.className = 'search-result-link';
        a.style.display = 'block';
        a.style.padding = 'var(--space-md)';
        a.style.background = 'var(--color-bg)';
        a.style.textDecoration = 'none';
        a.style.color = 'var(--color-text)';
        a.style.border = 'var(--border-thin)';
        
        a.innerHTML = `<span style="font-size: var(--text-xs); color: var(--color-text-light); display: block; margin-bottom: 4px;">${match.category}</span><strong>${match.title}</strong>`;
        
        li.appendChild(a);
        ul.appendChild(li);
      });
      resultsContainer.appendChild(ul);
    } else {
      resultsContainer.innerHTML = '<p style="color: var(--color-text-light); margin-top: var(--space-md);">No results found.</p>';
    }
  }

  function openModal() {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    input.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    input.value = '';
    resultsContainer.innerHTML = '';
    document.body.style.overflow = '';
  }

  return { init };
})();
