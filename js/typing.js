/* ==========================================================================
   typing.js — Typewriter / role cycling effect
   Portfolio: Harsh Vardhan Arya

   ✏️ EDIT: Add, remove, or reorder roles in the ROLES array below.
   ✏️ EDIT: Adjust TYPING_SPEED, DELETING_SPEED, PAUSE_AFTER, PAUSE_BEFORE
            to change the feel of the animation.
   ========================================================================== */

;(function () {
  'use strict';

  /* ── ✏️ EDIT: Roles that cycle in the hero ────────────────────────────── */
  const ROLES = [
    'Backend Engineer',
    'Distributed Systems Engineer',
    'Cloud Developer',
    'Problem Solver',
  ];

  /* ── Timing config ──────────────────────────────────────────────────────── */
  const TYPING_SPEED   = 75;   // ms per character while typing
  const DELETING_SPEED = 40;   // ms per character while deleting
  const PAUSE_AFTER    = 2000; // ms to hold after fully typing a word
  const PAUSE_BEFORE   = 350;  // ms before typing the next word
  const START_DELAY    = 1600; // ms before the first word starts (after loader)

  /* ── State ──────────────────────────────────────────────────────────────── */
  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  /* ── Core tick function ─────────────────────────────────────────────────── */
  function tick() {
    const el = document.getElementById('typedRole');
    if (!el) return;

    const current = ROLES[roleIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
    } else {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
    }

    let delay = isDeleting ? DELETING_SPEED : TYPING_SPEED;

    if (!isDeleting && charIndex === current.length) {
      // Finished typing — pause, then start deleting
      isDeleting = true;
      delay = PAUSE_AFTER;
    } else if (isDeleting && charIndex === 0) {
      // Finished deleting — move to next role
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % ROLES.length;
      delay = PAUSE_BEFORE;
    }

    setTimeout(tick, delay);
  }

  /* ── Kick off after page load ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(tick, START_DELAY);
  });

})();