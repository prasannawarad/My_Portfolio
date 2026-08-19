import { useEffect } from 'react';

export default function useRevealOnScroll(selector = '[data-reveal]') {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length === 0) return undefined;

    // `.reveal` starts at opacity 0, so anything we fail to reveal is invisible
    // content, not a missing animation. Every bail-out below reveals instead.
    const revealAll = () => nodes.forEach((el) => el.classList.add('reveal-in'));

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      revealAll();
      return undefined;
    }

    if (typeof IntersectionObserver === 'undefined') {
      revealAll();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      // threshold MUST stay 0. It is a fraction of the *target's* area, not the
      // screen's, so any positive value is unreachable once a section grows past
      // viewportHeight / threshold. On mobile every grid collapses to one column
      // and #projects passes 7000px — at the old 0.12 it needed 920px of itself
      // on screen inside a 598px window, so it never fired and the whole section
      // sat at opacity 0. rootMargin alone gives the "reveal just before it
      // lands" feel and can never become impossible to satisfy.
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}
