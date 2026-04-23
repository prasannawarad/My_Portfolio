import { useEffect } from 'react';

export default function useRevealOnScroll(selector = '[data-reveal]') {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll(selector));
    if (nodes.length === 0) return undefined;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      nodes.forEach((el) => el.classList.add('reveal-in'));
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
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}

