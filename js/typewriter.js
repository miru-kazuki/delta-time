/**
 * DeltaTime — Typewriter Module
 * Handles natural looping typewriter effect with line-based speeds.
 */

const Typewriter = (() => {
  'use strict';

  const line1 = "Measure the engine.";
  const line2 = "Understand the game.";
  const fullText = `${line1}\n${line2}`;

  let charIndex = 0;
  let isDeleting = false;
  let targetElement = null;

  function renderText() {
    if (!targetElement) return;

    targetElement.innerHTML = '';
    const currentSubstring = fullText.substring(0, charIndex);
    const lines = currentSubstring.split('\n');

    lines.forEach((lineText, index) => {
      targetElement.appendChild(document.createTextNode(lineText));
      if (index < lines.length - 1) {
        targetElement.appendChild(document.createElement('br'));
      }
    });
  }

  function typeLoop() {
    if (!targetElement) return;

    renderText();

    let delay = 60;

    if (!isDeleting) {
      // --- MODE MENGETIK ---
      charIndex++;

      // Baris 1: Kecepatan tinggi (30ms - 50ms)
      if (charIndex <= line1.length) {
        delay = Math.floor(Math.random() * (50 - 30 + 1)) + 30;

        if (charIndex === line1.length) {
          delay = 400; // Jeda sejenak sebelum turun ke baris 2
        }
      } 
      // Baris 2: Kecepatan lebih santai / berbobot (80ms - 120ms)
      else {
        delay = Math.floor(Math.random() * (120 - 80 + 1)) + 80;
      }

      // Selesai ngetik seluruh kalimat
      if (charIndex === fullText.length) {
        isDeleting = true;
        delay = 2500; // Diam 2.5s agar pengguna selesai membaca
      }
    } else {
      // --- MODE MENGHAPUS ---
      charIndex--;
      delay = 30; // Kecepatan hapus konstan & cepat

      if (charIndex === 0) {
        isDeleting = false;
        delay = 500; // Jeda sebelum mulai ngetik dari awal
      }
    }

    setTimeout(typeLoop, delay);
  }

  function init() {
    targetElement = document.getElementById('typewriter-text');
    if (!targetElement) return;

    charIndex = 0;
    isDeleting = false;

    setTimeout(typeLoop, 400);
  }

  return { init };
})();