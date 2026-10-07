/* ==========================================================================
   FASHOW — Presentation Behaviors (Sections 8, 9, 10)
   1. Logo Intro Animation (1.8s once-per-session, skip control, reduced-motion)
   2. Demo mode URL toggle (?demo=1)
   3. Header scroll state (.is-scrolled)
   4. Section scroll reveal (IntersectionObserver, reduced-motion safety)
   ========================================================================== */

(() => {
  'use strict';

  // 1. Demo Mode URL Check (Section 8)
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('demo') === '1') {
      document.body.classList.add('is-demo-mode');
    }
  } catch (e) {}

  // 2. Logo Intro Animation (Section 9)
  const initIntroAnimation = () => {
    const overlay = document.getElementById('fashow-intro-overlay');
    if (!overlay) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let alreadySeen = false;
    try {
      alreadySeen = !!sessionStorage.getItem('fashow_intro_seen');
    } catch (e) {}

    const skipBtn = document.getElementById('intro-skip-btn');

    const dismissIntro = () => {
      if (overlay.classList.contains('fade-out')) return;
      overlay.classList.add('fade-out');
      document.body.classList.remove('intro-locked');
      try {
        sessionStorage.setItem('fashow_intro_seen', '1');
      } catch (e) {}
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 550);
    };

    if (reduceMotion || alreadySeen) {
      overlay.style.display = 'none';
      document.body.classList.remove('intro-locked');
      return;
    }

    // Lock scroll during intro
    document.body.classList.add('intro-locked');

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dismissIntro();
      });
    }

    // Auto dismiss after 1.8 seconds sequence
    setTimeout(dismissIntro, 1800);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIntroAnimation);
  } else {
    initIntroAnimation();
  }

  // 3. Header Scrolled State (Section 3)
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // 4. Subtle Scroll Reveal (Section 10)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal');

  const SELECTORS = [
    '.section-header-row',
    '.step-card-editorial',
    '.casting-card',
    '.category-card',
    '.campus-chip',
    '.manifesto-box',
    '.dash-stat-card',
    '.collage-card'
  ].join(',');

  const seen = new WeakSet();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        io.unobserve(el);
        setTimeout(() => {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--reveal-delay');
        }, 800);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
  );

  const scan = () => {
    document.querySelectorAll(SELECTORS).forEach((el) => {
      if (seen.has(el)) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return;
      seen.add(el);
      if (rect.top < window.innerHeight * 0.94) return;
      const idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--reveal-delay', Math.min(idx, 4) * 60 + 'ms');
      el.classList.add('reveal');
      io.observe(el);
    });
  };

  let timer = null;
  const scheduleScan = (delay) => {
    clearTimeout(timer);
    timer = setTimeout(scan, delay);
  };

  scan();
  window.addEventListener('hashchange', () => scheduleScan(120));
  window.addEventListener('load', () => scheduleScan(50));

  const main = document.getElementById('main-content');
  if (main && 'MutationObserver' in window) {
    new MutationObserver(() => scheduleScan(120)).observe(main, { childList: true, subtree: true });
  }
})();
