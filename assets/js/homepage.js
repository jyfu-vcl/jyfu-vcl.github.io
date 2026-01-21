/**
 * Homepage Interactions
 * Adds tilt effects, scroll animations, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return; // Skip all animations if user prefers reduced motion
  }

  // ========================================
  // Tilt Effect for Research Cards
  // ========================================
  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', function() {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ========================================
  // Scroll Reveal Animations
  // ========================================
  const revealElements = document.querySelectorAll(
    '.about-section, .research-section, .news-section, .quick-links-section, ' +
    '.research-card, .news-item, .quick-link-card'
  );

  const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach(el => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  // ========================================
  // Smooth Scroll for Anchor Links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========================================
  // Typing Effect for Hero (Optional)
  // ========================================
  const typingElement = document.querySelector('.hero__tagline');
  if (typingElement && typingElement.dataset.typing) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }

    setTimeout(typeWriter, 500);
  }

  // ========================================
  // Parallax Effect for Floating Shapes
  // ========================================
  const shapes = document.querySelectorAll('.floating-shape');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 0.1;
      shape.style.transform = `translateY(${scrollY * speed}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // ========================================
  // Tag Hover Animation
  // ========================================
  const tags = document.querySelectorAll('.research-card__tags li');

  tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });

    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // ========================================
  // Counter Animation for Stats (if any)
  // ========================================
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }

    updateCounter();
  }

  // Observe counter elements
  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.counter);
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
  .reveal-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .reveal-on-scroll.revealed {
    opacity: 1;
    transform: translateY(0);
  }

  .research-card.reveal-on-scroll {
    transition-delay: 0.1s;
  }

  .research-card.reveal-on-scroll:nth-child(2) {
    transition-delay: 0.2s;
  }

  .quick-link-card.reveal-on-scroll:nth-child(1) { transition-delay: 0.1s; }
  .quick-link-card.reveal-on-scroll:nth-child(2) { transition-delay: 0.15s; }
  .quick-link-card.reveal-on-scroll:nth-child(3) { transition-delay: 0.2s; }
  .quick-link-card.reveal-on-scroll:nth-child(4) { transition-delay: 0.25s; }

  .news-item.reveal-on-scroll:nth-child(1) { transition-delay: 0.1s; }
  .news-item.reveal-on-scroll:nth-child(2) { transition-delay: 0.2s; }
  .news-item.reveal-on-scroll:nth-child(3) { transition-delay: 0.3s; }
`;
document.head.appendChild(style);
