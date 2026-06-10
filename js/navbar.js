/**
 * navbar.js — NextDoor Constructions LLP
 *
 * Handles:
 *  - Sticky navbar: adds background on scroll
 *  - Mobile hamburger menu toggle
 *  - Hamburger icon animation (lines → X)
 */

'use strict';

/**
 * initNavbar — called from main.js after navbar component is injected.
 */
function initNavbar() {
  try {
    const navbar         = document.getElementById('navbar');
    const mobileToggle   = document.getElementById('mobile-menu-toggle');
    const mobileMenu     = document.getElementById('mobile-menu');
    const hamburgerLine1 = document.getElementById('hamburger-line-1');
    const hamburgerLine2 = document.getElementById('hamburger-line-2');
    const hamburgerLine3 = document.getElementById('hamburger-line-3');
    const logoImg        = document.querySelector('.hero-logo');

    if (!navbar) return;

    /* ── Set Active Navigation Link based on URL ── */
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      
      // Get the href attribute (e.g. /about.html)
      const href = link.getAttribute('href');
      if (!href) return;

      // Bulletproof string matching
      if (
        currentPath === href || 
        (currentPath === '/' && href === '/index.html') ||
        (currentPath === '/index.html' && href === '/') ||
        (currentPath.includes(href.replace('.html', '')))
      ) {
        link.classList.add('active');
      }
    });

    /* ── Scroll effect disabled as per fixed black header request ── */
    const handleScroll = () => {
      // Navbar is permanently black, so no background/logo switching is needed.
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on load

    /* ── Mobile Menu Toggle ── */
    if (!mobileToggle || !mobileMenu) return;

    let isOpen = false;

    mobileToggle.addEventListener('click', () => {
      isOpen = !isOpen;

      // Toggle menu visibility
      mobileMenu.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', String(isOpen));

      // Animate hamburger → X
      if (isOpen) {
        hamburgerLine1?.style.setProperty('transform', 'translateY(8px) rotate(45deg)');
        hamburgerLine2?.style.setProperty('opacity', '0');
        hamburgerLine3?.style.setProperty('transform', 'translateY(-8px) rotate(-45deg)');
        hamburgerLine3?.style.setProperty('width', '24px');
      } else {
        hamburgerLine1?.style.removeProperty('transform');
        hamburgerLine2?.style.removeProperty('opacity');
        hamburgerLine3?.style.removeProperty('transform');
        hamburgerLine3?.style.setProperty('width', '16px');
      }
    });

    /* ── Close Mobile Menu Helper ── */
    function closeMobileMenu() {
      if (!isOpen) return;
      isOpen = false;
      mobileMenu.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      hamburgerLine1?.style.removeProperty('transform');
      hamburgerLine2?.style.removeProperty('opacity');
      hamburgerLine3?.style.removeProperty('transform');
      hamburgerLine3?.style.setProperty('width', '16px');
    }

    /* ── Close mobile menu on outside click ── */
    document.addEventListener('click', (e) => {
      if (isOpen && !navbar.contains(e.target)) {
        closeMobileMenu();
      }
    });

    /* ── Close mobile menu on nav link click ── */
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

  } catch (e) {
    console.error("Navbar initialization error:", e);
  }
}
