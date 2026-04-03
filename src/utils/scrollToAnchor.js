/** Section ids used for in-page navigation (must match Navbar + Home). */
export const SECTION_IDS = ['home', 'about', 'projects', 'contact'];

/**
 * Scrolls so the target section sits below the sticky header.
 * More reliable across browsers than scrollIntoView alone (especially with fixed headers).
 */
export function scrollToAnchor(elementId, { behavior = 'smooth' } = {}) {
  const el = document.getElementById(elementId);
  if (!el) return false;

  const header = document.querySelector('header');
  const headerHeight = header?.offsetHeight ?? 72;
  const gap = 12;
  const top = el.getBoundingClientRect().top + window.scrollY - headerHeight - gap;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
  return true;
}

/**
 * Retries until the element exists (e.g. right after route change from /resume).
 */
export function scrollToAnchorWhenReady(elementId, { maxAttempts = 30, behavior = 'smooth' } = {}) {
  let attempts = 0;

  const tryScroll = () => {
    if (scrollToAnchor(elementId, { behavior })) return;
    attempts += 1;
    if (attempts < maxAttempts) {
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}
