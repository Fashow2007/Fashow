/* FASHOW refinement behaviors. Presentation only; does not touch app.js state.
   Load with: <script src="fashow-refine.js" defer></script>  (after app.js)

   1. Adds .is-scrolled to the header after a few pixels of scroll.
   2. Fades/rises content that is below the fold as it enters view.
      - Anything already on screen is left alone (no flash).
      - Re-scans when the hash view changes and when app.js injects cards.
      - Skipped entirely for prefers-reduced-motion.
*/
(() => {
  'use strict';

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

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
    '.campaign-demo-card',
    '.dash-stat-card',
    '.side-panel'
  ].join(',');

  const seen = new WeakSet();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('in');
        io.unobserve(el);
        // Drop the helper classes once done so hover transitions stay snappy.
        setTimeout(() => {
          el.classList.remove('reveal', 'in');
          el.style.removeProperty('--reveal-delay');
        }, 1000);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );

  const scan = () => {
    document.querySelectorAll(SELECTORS).forEach((el) => {
      if (seen.has(el)) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return; // inside a hidden view; try again later
      seen.add(el);
      if (rect.top < window.innerHeight * 0.92) return; // already visible
      const idx = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--reveal-delay', Math.min(idx, 5) * 70 + 'ms');
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
  window.addEventListener('hashchange', () => scheduleScan(150));
  window.addEventListener('load', () => scheduleScan(50));

  const main = document.getElementById('main-content');
  if (main && 'MutationObserver' in window) {
    new MutationObserver(() => scheduleScan(150)).observe(main, { childList: true, subtree: true });
  }
})();
