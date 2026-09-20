/**
 * DeltaTime — Benchmark Module
 * Animates progress bars when the benchmark section enters the viewport.
 * Also handles the Engine Comparison tab switching.
 */

const Benchmark = (() => {
  'use strict';

  // Benchmark data
  const data = {
    godot: { fps: 142, ram: 820, loadTime: 4.2, buildSize: 42 },
    unity: { fps: 128, ram: 960, loadTime: 5.1, buildSize: 86 }
  };

  let hasAnimated = false;

  function init() {
    initProgressBars();
    initComparison();
  }

  /* ---- Progress Bars ---- */

  function initProgressBars() {
    const benchmarkSection = document.getElementById('benchmark');
    if (!benchmarkSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true;
          animateProgressBars();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2
    });

    observer.observe(benchmarkSection);
  }

  function animateProgressBars() {
    const godotBar = document.getElementById('godot-fps-bar');
    const unityBar = document.getElementById('unity-fps-bar');
    const godotValue = document.getElementById('godot-fps-value');
    const unityValue = document.getElementById('unity-fps-value');

    if (!godotBar && !unityBar) return;

    if (godotBar) godotBar.value = 0;
    if (unityBar) unityBar.value = 0;

    animateMetric(godotBar, godotValue, 0, data.godot.fps, 'fps', 1200);
    animateMetric(unityBar, unityValue, 0, data.unity.fps, 'fps', 1200);
  }

  function animateMetric(bar, valueEl, start, end, unit, duration) {
    if (!bar && !valueEl) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (bar) bar.value = end;
      if (valueEl) valueEl.innerHTML = end + '<span>' + unit + '</span>';
      return;
    }

    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);

      if (bar) bar.value = current;
      if (valueEl) valueEl.innerHTML = current + '<span>' + unit + '</span>';

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        if (bar) bar.value = end;
        if (valueEl) valueEl.innerHTML = end + '<span>' + unit + '</span>';
      }
    }

    requestAnimationFrame(update);
  }

  /* ---- Engine Comparison Tabs ---- */

  function initComparison() {
    const tabs = document.querySelectorAll('.comparison__tab');
    if (tabs.length === 0) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const engine = tab.dataset.engine;
        setActiveTab(tabs, tab);
        updateComparison(engine);
      });
    });
  }

  function setActiveTab(tabs, activeTab) {
    tabs.forEach(tab => {
      tab.classList.remove('is-active');
      tab.setAttribute('aria-selected', 'false');
    });
    activeTab.classList.add('is-active');
    activeTab.setAttribute('aria-selected', 'true');

    const panel = document.getElementById('comparison-panel');
    if (panel) {
      panel.setAttribute('aria-labelledby', activeTab.id);
    }
  }

  function updateComparison(engine) {
    const d = data[engine];
    const other = engine === 'godot' ? 'unity' : 'godot';
    const otherD = data[other];
    const otherName = other.charAt(0).toUpperCase() + other.slice(1);

    // Update values
    setTextContent('comp-fps', d.fps);
    setTextContent('comp-mem', d.ram);
    setTextContent('comp-load', d.loadTime);
    setTextContent('comp-build', d.buildSize);

    // Update diffs
    updateDiff('comp-fps-diff', d.fps, otherD.fps, otherName, true);   // higher is better
    updateDiff('comp-mem-diff', d.ram, otherD.ram, otherName, false);   // lower is better
    updateDiff('comp-load-diff', d.loadTime, otherD.loadTime, otherName, false);  // lower is better
    updateDiff('comp-build-diff', d.buildSize, otherD.buildSize, otherName, false);  // lower is better
  }

  function setTextContent(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function updateDiff(id, value, otherValue, otherName, higherIsBetter) {
    const el = document.getElementById(id);
    if (!el) return;

    const diff = ((value - otherValue) / otherValue * 100).toFixed(1);
    const sign = diff > 0 ? '+' : '';
    el.textContent = sign + diff + '% vs ' + otherName;

    // Determine if this is good or bad
    let isGood;
    if (higherIsBetter) {
      isGood = diff > 0;
    } else {
      isGood = diff < 0;
    }

    el.classList.remove('is-positive', 'is-negative');
    if (diff == 0) {
      // neutral, no class
    } else {
      el.classList.add(isGood ? 'is-positive' : 'is-negative');
    }
  }

  return { init };
})();
