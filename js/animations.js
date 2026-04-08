/* ==========================================================================
   animations.js — Intersection Observer scroll reveals, counter animations,
                   particle generation, timeline line draw, skill filter,
                   active nav link highlighting
   Portfolio: Harsh Vardhan Arya

   ✏️ EDIT: Particle count → PARTICLE_COUNT constant below
   ✏️ EDIT: Reveal threshold → rootMargin / threshold in revealObserver
   ========================================================================== */

;(function () {
  'use strict';


  /* ── 1. Scroll-reveal ────────────────────────────────────────────────────
     Adds .reveal--visible to any element with .reveal when it enters view.
     CSS in animations.css handles the fade+slide transition.
  ─────────────────────────────────────────────────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold:  0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


  /* ── 2. Count-up animation on stat cards ─────────────────────────────────
     Triggered when stat card scrolls into view.
     Source of truth: data-count attribute on .stat-card__number elements.
  ─────────────────────────────────────────────────────────────────────────── */
  function animateCount(el, target, duration) {
    const startTime = performance.now();

    function step(timestamp) {
      const elapsed  = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el     = entry.target;
          const target = parseInt(el.dataset.count, 10);
          if (!isNaN(target)) animateCount(el, target, 1200);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll('.stat-card__number[data-count]').forEach((el) =>
    counterObserver.observe(el)
  );


  /* ── 3. Skill filter tabs ─────────────────────────────────────────────────
     Click a tab → pills matching data-category show; rest hide.
     ✏️ EDIT: Add new categories by adding a tab in HTML + pills with that data-category.
  ─────────────────────────────────────────────────────────────────────────── */
  const tabs  = document.querySelectorAll('.skills__tab');
  const pills = document.querySelectorAll('.skill-pill');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      // Switch active tab
      tabs.forEach((t) => t.classList.remove('skills__tab--active'));
      tab.classList.add('skills__tab--active');

      const filter = tab.dataset.filter;

      pills.forEach((pill, i) => {
        const match = filter === 'all' || pill.dataset.category === filter;
        if (match) {
          // Stagger the re-appearance
          pill.style.transitionDelay = `${i * 20}ms`;
          pill.classList.remove('skill-pill--hidden');
        } else {
          pill.style.transitionDelay = '0ms';
          pill.classList.add('skill-pill--hidden');
        }
      });
    });
  });


  /* ── 4. Timeline line draw animation ─────────────────────────────────────
     The vertical line scales from 0 to 1 when the timeline section enters view.
  ─────────────────────────────────────────────────────────────────────────── */
  const timelineLine = document.getElementById('timelineLine');
  if (timelineLine) {
    const lineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            timelineLine.classList.add('timeline__line--visible');
            lineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    lineObserver.observe(timelineLine.parentElement);
  }


  /* ── 5. Floating particles in hero ───────────────────────────────────────
     Generates lightweight CSS-animated dots.
     ✏️ EDIT: Change PARTICLE_COUNT for more/fewer particles (keep < 40)
  ─────────────────────────────────────────────────────────────────────────── */
  const particleContainer = document.getElementById('heroParticles');
  if (particleContainer) {
    const PARTICLE_COUNT = 28; // ✏️ EDIT: number of floating dots

    const COLORS = ['#7c3aed', '#2563eb', '#06b6d4', '#a855f7', '#38bdf8'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p        = document.createElement('div');
      p.className    = 'particle';
      const x        = Math.random() * 100;
      const duration = 7 + Math.random() * 12;
      const delay    = Math.random() * 10;
      const drift    = (Math.random() - 0.5) * 100;
      const size     = Math.random() > 0.65 ? 3 : 2;
      const color    = COLORS[Math.floor(Math.random() * COLORS.length)];

      p.style.cssText = `
        left:${x}%;
        --duration:${duration}s;
        --delay:${delay}s;
        --drift:${drift}px;
        width:${size}px;
        height:${size}px;
        background:${color};
        animation-delay:${delay}s;
      `;
      particleContainer.appendChild(p);
    }
  }


  /* ── 6. Active section highlighting in navbar ────────────────────────────
     The nav link matching the current section in view gets .navbar__link--active.
  ─────────────────────────────────────────────────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle(
              'navbar__link--active',
              link.getAttribute('href') === `#${id}`
            );
          });
        }
      });
    },
    {
      threshold:  0.35,
      rootMargin: '-72px 0px -40% 0px',
    }
  );

  sections.forEach((s) => sectionObserver.observe(s));

})();