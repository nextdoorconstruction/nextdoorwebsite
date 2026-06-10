/**
 * projects.js — NextDoor Constructions LLP
 *
 * Dynamically renders the project portfolio on projects.html.
 *
 * How to add a new project:
 *  → Open /data/projects.json
 *  → Add a new object to the array
 *  → Save. Done. No HTML editing required.
 *
 * Features:
 *  - Fetches data from /data/projects.json
 *  - Renders project cards into #projects-grid
 *  - Filter buttons by category
 *  - Graceful loading & error states
 */

'use strict';

// Fallback placeholder image (base64 1×1 dark pixel)
const PLACEHOLDER_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='260' viewBox='0 0 600 260'%3E%3Crect width='600' height='260' fill='%23111111'/%3E%3Ctext x='50%25' y='50%25' font-family='Inter,sans-serif' font-size='14' fill='%23444' text-anchor='middle' dominant-baseline='middle'%3EImage Coming Soon%3C/text%3E%3C/svg%3E";

/**
 * Build the HTML string for a single project card.
 * @param {Object} project
 * @returns {string} HTML string
 */
function buildProjectCard(project) {
  const statusClass  = project.status === 'Ongoing' ? 'text-yellow-400' : 'text-green-400';
  const tagsHtml     = (project.tags || [])
    .map(tag => `<span class="badge mr-1">${tag}</span>`)
    .join('');

  return `
    <article class="project-card anim-fade-up" data-category="${project.category}">
      <img
        src="${project.image}"
        alt="${project.title} — ${project.category} project in ${project.location}"
        loading="lazy"
        onerror="this.src='${PLACEHOLDER_IMG}'"
      />
      <div class="project-card-body">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold tracking-widest uppercase text-brand-red">${project.category}</span>
          <span class="text-xs ${statusClass} font-medium">${project.status}</span>
        </div>
        <h3 class="heading-card mb-2">${project.title}</h3>
        <p class="text-xs text-brand-muted mb-1">${project.location} &middot; ${project.year}</p>
        <p class="body-base text-sm mt-3 mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-1">${tagsHtml}</div>
      </div>
    </article>
  `;
}

/**
 * Render the projects grid, optionally filtered by category.
 * @param {Array}  projects       - Full projects array
 * @param {string} activeCategory - 'All' or a category name
 */
function renderProjects(projects, activeCategory = 'All') {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  if (!filtered.length) {
    grid.innerHTML = `<p class="text-brand-muted col-span-full text-center py-16">No projects found in this category yet.</p>`;
    return;
  }

  grid.innerHTML = filtered.map(buildProjectCard).join('');

  // Re-trigger scroll animations on newly rendered cards
  if (typeof initAnimations === 'function') {
    // Use a tiny delay so DOM has settled
    setTimeout(initAnimations, 50);
  }
}

/**
 * Build and bind category filter buttons.
 * @param {Array} projects - Full projects array
 */
function buildFilters(projects) {
  const filterContainer = document.getElementById('projects-filters');
  if (!filterContainer) return;

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  filterContainer.innerHTML = categories
    .map((cat, i) => `
      <button
        class="filter-btn${i === 0 ? ' active' : ''}"
        data-filter="${cat}"
        aria-pressed="${i === 0 ? 'true' : 'false'}"
      >${cat}</button>
    `)
    .join('');

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const category = btn.dataset.filter;

    // Update active state
    filterContainer.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-pressed', String(b === btn));
    });

    renderProjects(projects, category);
  });
}

/**
 * initProjects — called from main.js on DOMContentLoaded.
 */
async function initProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return; // Not on the projects page

  // Show loading state
  grid.innerHTML = `
    <div class="col-span-full flex items-center justify-center py-24">
      <div class="text-brand-muted text-sm tracking-wide">Loading projects…</div>
    </div>
  `;

  try {
    const response = await fetch('/data/projects.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const projects = await response.json();

    buildFilters(projects);
    renderProjects(projects, 'All');

    // Update the project count stat if element exists
    const countEl = document.getElementById('projects-count');
    if (countEl) countEl.textContent = projects.length + '+';

  } catch (error) {
    console.error('[NextDoor] Failed to load projects:', error);
    grid.innerHTML = `
      <div class="col-span-full text-center py-24">
        <p class="text-brand-muted">Unable to load projects at this time.</p>
        <p class="text-xs text-brand-muted mt-2">Please refresh or contact us directly.</p>
      </div>
    `;
  }
}
