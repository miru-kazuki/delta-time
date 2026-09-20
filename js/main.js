/**
 * DeltaTime — Main Entry Point
 * Initializes all modules when the DOM is ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  if (typeof Navigation !== 'undefined') Navigation.init();
  if (typeof Search !== 'undefined') Search.init();
  if (typeof Benchmark !== 'undefined') Benchmark.init();
  if (typeof Gallery !== 'undefined') Gallery.init();
  if (typeof Animation !== 'undefined') Animation.init();
});
