/**
 * main.js — NextDoor Constructions LLP
 *
 * Entry point for site-wide JavaScript.
 * Responsibilities:
 *  1. Load shared components (navbar, footer) via fetch() injection
 *  2. Initialize navbar scroll behaviour
 *  3. Initialize scroll animations
 *  4. Mark the current page's nav link as active
 */

'use strict';

/* ── Component Loader ─────────────────────────────────────── */

/**
 * Fetches an HTML component file and injects it into a target element.
 * @param {string} url         - Path to the component HTML file
 * @param {string} targetId    - ID of the element to inject into
 * @param {Function} [callback] - Optional callback after injection
 */
async function loadComponent(url, targetId, callback) {
  const target = document.getElementById(targetId);
  if (!target) return;

  try {
    const versionedUrl = url + '?v=' + new Date().getTime();
    const response = await fetch(versionedUrl);
    if (!response.ok) throw new Error(`Failed to load component: ${url} (${response.status})`);
    const html = await response.text();
    target.innerHTML = html;

    // Execute any <script> tags embedded in the component
    target.querySelectorAll('script').forEach(oldScript => {
      const newScript = document.createElement('script');
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });

    if (callback) callback();
  } catch (error) {
    console.error('[NextDoor] Component load error:', error);
  }
}


/* ── Initialization ──────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', async () => {

  // 1. Load shared Navbar
  await loadComponent('/components/navbar.html', 'navbar-placeholder', () => {
    // initTransitions handles active nav link detection + click interception
    if (typeof initTransitions === 'function') initTransitions();

    // Initialize navbar scroll + mobile menu after it's in the DOM
    if (typeof initNavbar === 'function') initNavbar();
  });

  // 2. Load shared Footer
  await loadComponent('/components/footer.html', 'footer-placeholder');

  // 3. Initialize scroll animations
  if (typeof initAnimations === 'function') initAnimations();

  // 4. Initialize page-specific scripts
  // These functions are defined in their respective JS files and
  // called here after the DOM is fully ready.
  if (typeof initProjects  === 'function') initProjects();
  if (typeof initContactForm === 'function') initContactForm();
});

/* ── Global Careers Application Helper ─────────────────────── */

/**
 * Opens the Google Form in a new tab for a specific job title.
 * Allows buttons across the site to link directly to the pre-filled application form.
 * @param {string} jobTitle - The title of the job to pre-fill
 */
window.openApplyModal = function(jobTitle) {
  const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdfXynFMUJcfXJCFeFwNHBnldk8ZruwTc--3yRQDMPah0EjLQ/viewform";
  const params = `?usp=pp_url&entry.278542326=${encodeURIComponent(jobTitle)}`;
  window.open(baseUrl + params, '_blank', 'noopener,noreferrer');
};
