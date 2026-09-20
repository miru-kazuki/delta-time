/**
 * DeltaTime — Gallery Module
 * Handles opening article images in a native HTML <dialog>.
 */

const Gallery = (() => {
  'use strict';

  let modal, modalImg, modalCaption, closeBtn;
  let lastFocusedElement = null;

  function init() {
    modal = document.getElementById('gallery-modal') || document.querySelector('dialog.image-dialog');
    if (!modal) return;

    modalImg = document.getElementById('gallery-img') || modal.querySelector('img');
    modalCaption = document.getElementById('gallery-caption') || modal.querySelector('figcaption');
    closeBtn = document.getElementById('gallery-close') || modal.querySelector('.dialog-close, .gallery-modal__close');

    // Attach click and keyboard events to article images
    const images = document.querySelectorAll('.article-image');
    images.forEach(fig => {
      fig.addEventListener('click', () => {
        openModal(fig);
      });
      // Accessibility: allow opening with Enter/Space
      if (!fig.hasAttribute('tabindex')) {
        fig.setAttribute('tabindex', '0');
      }
      fig.setAttribute('role', 'button');
      fig.setAttribute('aria-haspopup', 'dialog');
      fig.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(fig);
        }
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    // Close on click outside the image / figure
    modal.addEventListener('click', (e) => {
      const figure = modal.querySelector('figure');
      if (e.target === modal || (figure && !figure.contains(e.target) && e.target !== closeBtn)) {
        closeModal();
      }
    });

    // Handle ESC key and restore scroll and focus
    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    });
  }

  function openModal(figure) {
    if (!modal) return;

    lastFocusedElement = document.activeElement;

    // Find the image or visual div inside the clicked figure
    const imgEl = figure.querySelector('img');
    const visualDiv = figure.querySelector('[role="img"]');
    const captionEl = figure.querySelector('figcaption');

    let src = '';
    let alt = '';

    if (imgEl) {
      src = imgEl.currentSrc || imgEl.src;
      alt = imgEl.alt || '';
    } else if (visualDiv) {
      // Fallback for CSS background placeholders
      const style = window.getComputedStyle(visualDiv);
      alt = visualDiv.getAttribute('aria-label') || '';

      if (style.backgroundImage && style.backgroundImage !== 'none') {
        const urlMatch = style.backgroundImage.match(/url\((['"])?(.*?)\1\)/);
        if (urlMatch) src = urlMatch[2];
      }

      if (!src) {
        src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
          `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
            <rect width="800" height="600" fill="#181818"/>
            <text x="50%" y="50%" fill="#888" font-family="monospace" font-size="16" text-anchor="middle" dominant-baseline="middle">${alt || 'Image Preview'}</text>
          </svg>`
        );
      }
    }

    if (modalImg) {
      modalImg.src = src;
      modalImg.alt = alt;
    }

    if (modalCaption) {
      if (captionEl && captionEl.textContent.trim()) {
        modalCaption.textContent = captionEl.textContent.trim();
        modalCaption.style.display = '';
      } else {
        modalCaption.textContent = '';
        modalCaption.style.display = 'none';
      }
    }

    if (typeof modal.showModal === 'function') {
      modal.showModal();
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  }

  function closeModal() {
    if (modal && modal.open && typeof modal.close === 'function') {
      modal.close();
    }
  }

  return { init, openModal, closeModal };
})();
