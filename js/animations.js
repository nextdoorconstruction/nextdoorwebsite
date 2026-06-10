/**
 * animations.js — NextDoor Constructions LLP
 *
 * Scroll-triggered fade animations using IntersectionObserver.
 * No dependencies, no libraries. Purposeful and minimal.
 *
 * Usage in HTML:
 *   Add class "anim-fade-up" or "anim-slide-left" to any element.
 *   When it enters the viewport, the class "animated" is added.
 *
 * The CSS transitions are defined in animations.css.
 */

'use strict';

/**
 * initAnimations — called from main.js on DOMContentLoaded.
 */
function initAnimations() {

  // Guard: skip if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ANIMATION_CLASSES = ['.anim-fade-up', '.anim-slide-left'];

  // Collect all animatable elements
  const elements = document.querySelectorAll(ANIMATION_CLASSES.join(', '));

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Unobserve after animation runs — no repeated triggers
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,          // Trigger when 12% of element is visible
      rootMargin: '0px 0px -40px 0px', // Slightly before fully in view
    }
  );

  elements.forEach(el => observer.observe(el));
}
