(function () {
  'use strict';

  /* ===== DOM ===== */
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const drawer = document.getElementById('nav-drawer');
  const signupForm = document.getElementById('signup-form');
  const eventForm = document.getElementById('event-form');

  /* ===== Nav scroll ===== */
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===== Nav drawer ===== */
  const closeDrawer = () => {
    toggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    drawer.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      drawer.setAttribute('aria-hidden', String(open));
      drawer.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });

    const closeBtn = drawer.querySelector('.nav__drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    drawer.querySelectorAll('.nav__drawer-link').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  /* ===== Forms ===== */
  signupForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Welcome to the list. You'll hear from us soon.");
    signupForm.reset();
  });

  eventForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you. We'll be in touch about your event enquiry.");
    eventForm.reset();
  });

  /* ===== Scroll reveal ===== */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ===== Smooth scroll ===== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ===== Gallery infinite scroll — duplicate track ===== */
  const track = document.querySelector('.gallery__track');
  if (track) {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  }
})();