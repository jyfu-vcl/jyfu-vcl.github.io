/**
 * Scroll Animations using Intersection Observer API
 * Triggers animations when elements enter the viewport
 */

(function() {
  'use strict';

  // Check if Intersection Observer is supported
  if (!('IntersectionObserver' in window)) {
    console.warn('Intersection Observer not supported');
    return;
  }

  // Configuration for the observer
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Callback function for intersection observer
  const observerCallback = function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Initialize animations when DOM is ready
  function initScrollAnimations() {
    // Animate publication/archive items
    const archiveItems = document.querySelectorAll('.archive__item');
    archiveItems.forEach(function(item, index) {
      // Add stagger class for sequential animation
      if (index < 6) {
        item.classList.add('stagger-' + (index + 1));
      }
      observer.observe(item);
    });

    // Animate list items
    const listItems = document.querySelectorAll('.list__item');
    listItems.forEach(function(item, index) {
      if (index < 6) {
        item.classList.add('stagger-' + (index + 1));
      }
      observer.observe(item);
    });

    // Animate grid items
    const gridItems = document.querySelectorAll('.grid__item');
    gridItems.forEach(function(item, index) {
      if (index < 6) {
        item.classList.add('stagger-' + (index + 1));
      }
      observer.observe(item);
    });

    // Animate page sections
    const pageSections = document.querySelectorAll('.page__content > section');
    pageSections.forEach(function(section) {
      observer.observe(section);
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }

})();
