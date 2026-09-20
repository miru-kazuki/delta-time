/**
 * DeltaTime — Main Entry Point
 * Initializes all modules when the DOM is ready.
 */

// Force scroll ke paling atas saat di-refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);

  if (typeof AOS !== 'undefined') {
    AOS.refreshHard();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (typeof Navigation !== 'undefined') Navigation.init();
  if (typeof Search !== 'undefined') Search.init();
  if (typeof Benchmark !== 'undefined') Benchmark.init();
  if (typeof Gallery !== 'undefined') Gallery.init();
  if (typeof Animation !== 'undefined') Animation.init();
  if (typeof Typewriter !== 'undefined') Typewriter.init();
});