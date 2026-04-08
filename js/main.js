/* ==========================================================================
   main.js — Core page logic
   Handles: loader, navbar glass effect, scroll progress, custom cursor,
            hamburger menu, smooth scroll, scroll-to-top, contact form,
            easter egg (Konami code)
   Portfolio: Harsh Vardhan Arya
   ========================================================================== */

;(function () {
  'use strict';


  /* ── 1. Loading Screen ───────────────────────────────────────────────────
     Hides the loader after 1.4 s, then adds .loaded to <body> to trigger
     hero entrance animations and terminal line cascade.
  ─────────────────────────────────────────────────────────────────────────── */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) loader.classList.add('loader--hidden');
      document.body.classList.add('loaded');
    }, 1400);
  });


  /* ── 2. Scroll Progress Bar ──────────────────────────────────────────────
     Width = scrolled% of total document height.
  ─────────────────────────────────────────────────────────────────────────── */
  const progressBar = document.getElementById('scrollProgress');

  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docHeight > 0
      ? `${(scrollTop / docHeight) * 100}%`
      : '0%';
  }


  /* ── 3. Navbar glass effect ──────────────────────────────────────────────
     Adds .navbar--scrolled (frosted glass) once user scrolls > 60px.
  ─────────────────────────────────────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle('navbar--scrolled', window.scrollY > 60);
  }


  /* ── 4. Scroll-to-top button ─────────────────────────────────────────────
     Appears after scrolling 300px; smooth-scrolls to top on click.
  ─────────────────────────────────────────────────────────────────────────── */
  const scrollTopBtn = document.getElementById('scrollTop');

  function updateScrollTop() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('scroll-top--visible', window.scrollY > 300);
  }

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ── Unified scroll handler (passive for performance) ────────────────────*/
  window.addEventListener('scroll', () => {
    updateScrollProgress();
    updateNavbar();
    updateScrollTop();
  }, { passive: true });

  // Initialise on load (page may already be scrolled on refresh)
  updateScrollProgress();
  updateNavbar();
  updateScrollTop();


  /* ── 5. Custom Cursor ────────────────────────────────────────────────────
     Dot snaps instantly; ring follows with lerp lag for a trailing effect.
  ─────────────────────────────────────────────────────────────────────────── */
  const cursorDot  = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top  = `${mouseY}px`;
    }
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    if (cursorRing) {
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top  = `${ringY}px`;
    }
    requestAnimationFrame(animateRing);
  })();

  // Expand cursor on interactive elements
  const INTERACTIVES = 'a, button, [role="button"], input, textarea, label, .skill-pill, .project-card, .stat-card';

  function addCursorHover() {
    cursorDot?.classList.add('cursor-dot--hover');
    cursorRing?.classList.add('cursor-ring--hover');
  }
  function removeCursorHover() {
    cursorDot?.classList.remove('cursor-dot--hover');
    cursorRing?.classList.remove('cursor-ring--hover');
  }

  // Use event delegation on document for dynamically added elements
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(INTERACTIVES)) addCursorHover();
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(INTERACTIVES)) removeCursorHover();
  });


  /* ── 6. Hamburger Menu ───────────────────────────────────────────────────
     Toggles slide-in mobile nav.
  ─────────────────────────────────────────────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  function openMenu()  {
    hamburger?.classList.add('navbar__hamburger--open');
    navLinks?.classList.add('navbar__links--open');
  }
  function closeMenu() {
    hamburger?.classList.remove('navbar__hamburger--open');
    navLinks?.classList.remove('navbar__links--open');
  }

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('navbar__hamburger--open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when a nav link is tapped
  document.querySelectorAll('.navbar__link').forEach((link) =>
    link.addEventListener('click', closeMenu)
  );

  // Close when tapping outside the nav
  document.addEventListener('click', (e) => {
    if (
      navLinks?.classList.contains('navbar__links--open') &&
      !navLinks.contains(e.target) &&
      !hamburger?.contains(e.target)
    ) {
      closeMenu();
    }
  });


  /* ── 7. Smooth scroll for all anchor links ───────────────────────────────
     Accounts for fixed navbar height (72px) so headings aren't hidden.
  ─────────────────────────────────────────────────────────────────────────── */
  const NAV_OFFSET = 72; // px — update if navbar height changes

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href   = anchor.getAttribute('href');
      const target = href === '#' ? document.body : document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── 8. Contact Form ─────────────────────────────────────────────────────
     Shows loading state on submit. Actual submission handled by Formspree
     (or whatever action is set on the form).
  ─────────────────────────────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  const submitBtn   = document.getElementById('submitBtn');

  contactForm?.addEventListener('submit', () => {
    if (!submitBtn) return;
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled    = true;

    // Re-enable after 4 s as a fallback (Formspree will redirect or respond sooner)
    setTimeout(() => {
      submitBtn.innerHTML  = 'Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;display:inline;vertical-align:middle"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>';
      submitBtn.disabled   = false;
    }, 4000);
  });


  /* ── 9. Easter Egg — Konami Code ─────────────────────────────────────────
     Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
     Triggers a fun terminal modal.
     ✏️ EDIT: Update the terminal content in the #easterEggModal HTML in index.html
  ─────────────────────────────────────────────────────────────────────────── */
  const KONAMI_CODE = [
    'ArrowUp','ArrowUp',
    'ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight',
    'ArrowLeft','ArrowRight',
    'b','a',
  ];
  let konamiIndex = 0;

  const easterModal  = document.getElementById('easterEggModal');
  const closeEgg     = document.getElementById('closeEasterEgg');

  function showEasterEgg() {
    easterModal?.classList.add('easter-egg-modal--visible');
  }
  function hideEasterEgg() {
    easterModal?.classList.remove('easter-egg-modal--visible');
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === KONAMI_CODE[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === KONAMI_CODE.length) {
        konamiIndex = 0;
        showEasterEgg();
      }
    } else {
      konamiIndex = 0;
      // Still check if the failed key starts the sequence
      if (e.key === KONAMI_CODE[0]) konamiIndex = 1;
    }
  });

  closeEgg?.addEventListener('click', hideEasterEgg);

  // Click backdrop to close
  easterModal?.addEventListener('click', (e) => {
    if (e.target === easterModal) hideEasterEgg();
  });

  // Esc key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') hideEasterEgg();
  });

})();