/**
 * DeltaTime — Animation Module
 * Initializes AOS (Animate on Scroll) and Vanilla Tilt.
 */

const Animation = (() => {
  'use strict';

  function init() {
    initAOS();
    initTilt();
  }

  function initAOS() {
    if (typeof AOS === 'undefined') {
      console.warn('AOS library not loaded.');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      disable: prefersReducedMotion
    });
  }

  function initTilt() {
    if (typeof VanillaTilt === 'undefined') {
      console.warn('Vanilla Tilt library not loaded.');
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Tilt is initialized automatically via data-tilt attributes by Vanilla Tilt.
    // No additional JS needed — the library scans for [data-tilt] on load.
  }

  return { init };
})();
