/**
 * transitions.js — NextDoor Constructions LLP
 *
 * Premium page transition system.
 * Inspired by: Apple, Porsche, Foster + Partners, Aesop.
 *
 * Behaviour:
 *  - Entry: body fades in + rises 12px on every page load
 *  - Exit:  body fades out + rises 10px before navigating
 *  - Intercepts all internal <a> clicks automatically
 *  - No external dependencies
 *
 * CSS states (defined in animations.css):
 *  body             → hidden (opacity: 0, translateY: 12px)
 *  body.page-ready  → visible (opacity: 1, translateY: 0) — 650ms ease-in-out
 *  body.page-exit   → hidden (opacity: 0, translateY: -10px) — 500ms ease-in
 */

'use strict';

// ── Config ─────────────────────────────────────────────────
const TRANSITION_EXIT_MS  = 520;  // How long the exit animation runs before navigating
const TRANSITION_ENTER_MS = 650;  // CSS duration for the entry animation (must match CSS)

// ── State ──────────────────────────────────────────────────
let isNavigating = false; // Prevent double-click race conditions

// ── Entry Animation ────────────────────────────────────────

/**
 * Called once on DOMContentLoaded.
 * Body starts hidden via CSS — this triggers the fade-in.
 */
function triggerPageEnter() {
  // Two rAF calls ensure the browser has painted the initial (hidden) state
  // before we add the transition. This prevents the animation being skipped.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.classList.remove('page-exit');
      document.body.classList.add('page-ready');
    });
  });
}

// ── Exit Animation ─────────────────────────────────────────

/**
 * Fades the current page out, then navigates to href.
 * @param {string} href
 */
function triggerPageExit(href) {
  if (isNavigating) return;
  isNavigating = true;

  document.body.classList.remove('page-ready');
  document.body.classList.add('page-exit');

  setTimeout(() => {
    window.location.href = href;
  }, TRANSITION_EXIT_MS);
}

// ── Link Interception ──────────────────────────────────────

/**
 * Handles all anchor click events via event delegation.
 * Skips external links, hash anchors, mailto/tel, and modifier key clicks.
 */
function handleLinkClick(e) {
  // Walk up from click target to find the closest anchor
  const anchor = e.target.closest('a[href]');
  if (!anchor) return;

  const href = anchor.getAttribute('href');

  // Conditions that should NOT trigger the page transition:
  const isExternal     = href.startsWith('http') || href.startsWith('//');
  const isHash         = href.startsWith('#');
  const isMailto       = href.startsWith('mailto:');
  const isTel          = href.startsWith('tel:');
  const isNewTab       = anchor.target === '_blank';
  const isDownload     = anchor.hasAttribute('download');
  const isModifierKey  = e.ctrlKey || e.metaKey || e.shiftKey || e.altKey;

  if (isExternal || isHash || isMailto || isTel || isNewTab || isDownload || isModifierKey) {
    return; // Let the browser handle it normally
  }

  // It's an internal navigation — intercept it
  e.preventDefault();
  triggerPageExit(href);
}



// ── Init ───────────────────────────────────────────────────

/**
 * initTransitions — called from main.js after components are loaded,
 * so the navbar exists in the DOM when setActiveNavLink() runs.
 * The entry animation (triggerPageEnter) is called separately on
 * DOMContentLoaded so it fires as early as possible.
 */
function initTransitions() {
  // Bind click interception at document level (captures all future nav links too)
  document.addEventListener('click', handleLinkClick, true);
}

// Entry animation fires immediately on DOM ready — before components load
document.addEventListener('DOMContentLoaded', triggerPageEnter);

// ── Back/Forward Cache Restore ─────────────────────────────
//
// When navigating away, triggerPageExit() leaves the body in the
// .page-exit state (opacity: 0) before calling window.location.href.
// If the user returns via the browser back/forward button, some
// browsers restore the page from bfcache in that exact hidden state.
// DOMContentLoaded does not fire on bfcache restores, so without this
// the page would appear blank. Re-run the enter animation and reset
// navigation state whenever the page is restored this way.
window.addEventListener('pageshow', (e) => {
  if (e.persisted) {
    isNavigating = false;
    triggerPageEnter();
  }
});
