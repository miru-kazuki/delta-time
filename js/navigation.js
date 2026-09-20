/**
 * DeltaTime — Navigation Module
 * Handles mobile menu toggle and smooth scroll for nav links.
 */

const Navigation = (() => {
  'use strict';

  let menuToggle;
  let mainNav;

  function init() {
    menuToggle = document.getElementById('menu-toggle');
    mainNav = document.getElementById('main-nav');

    if (!menuToggle || !mainNav) return;

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu on nav link click (mobile)
    const navLinks = mainNav.querySelectorAll('.header__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          closeMenu();
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  }

  function closeMenu() {
    mainNav.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  return { init };
})();
