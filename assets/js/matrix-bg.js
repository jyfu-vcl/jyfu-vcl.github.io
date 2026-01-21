/**
 * Matrix Rain Background Effect
 * Animated falling characters inspired by The Matrix
 */

(function() {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return; // Skip animation if user prefers reduced motion
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrix);
  } else {
    initMatrix();
  }

  function initMatrix() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.4';

    // Insert canvas as first child of body
    document.body.insertBefore(canvas, document.body.firstChild);

    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters - mix of katakana, latin, and numbers
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const charArray = chars.split('');

    // Configuration
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; // Start at random heights above screen
    }

    // Color palette - cyan and green neon
    const colors = [
      'rgba(0, 255, 255, 1)',    // Cyan
      'rgba(0, 255, 65, 1)',     // Green
      'rgba(0, 217, 255, 1)',    // Electric blue
    ];

    // Animation loop
    function draw() {
      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];

        // Random color from palette
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Add glow effect to leading character
        if (drops[i] * fontSize > 0 && drops[i] * fontSize < canvas.height) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = color;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }

      // Clear shadow for next frame
      ctx.shadowBlur = 0;
    }

    // Start animation
    let animationId;
    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    // Pause animation when page is hidden (performance optimization)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
      } else {
        animate();
      }
    });

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
      cancelAnimationFrame(animationId);
    });
  }
})();
