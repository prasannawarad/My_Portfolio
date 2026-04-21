import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToAnchorWhenReady, SECTION_IDS } from '../utils/scrollToAnchor';

/**
 * Scrolls to the right section for the "home sections" routes. Handles:
 * - Opening https://site.com/#about (legacy hash deep link)
 * - Opening https://site.com/projects (clean route deep link)
 * - Navigating from /resume to /contact (Navbar uses clean routes)
 */
function HashScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const homeSectionPathnames = new Set(['/', ...SECTION_IDS.map((id) => `/${id}`)]);
    if (!homeSectionPathnames.has(pathname)) return;

    const hashId = hash?.replace(/^#/, '') ?? '';
    const pathId = pathname === '/' ? 'home' : pathname.replace(/^\//, '');
    const targetId = (hashId && SECTION_IDS.includes(hashId) ? hashId : pathId) ?? '';

    if (!targetId || !SECTION_IDS.includes(targetId)) return;

    scrollToAnchorWhenReady(targetId);
  }, [pathname, hash]);

  return null;
}

export default HashScrollHandler;
