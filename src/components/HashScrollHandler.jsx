import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToAnchorWhenReady, SECTION_IDS } from '../utils/scrollToAnchor';

/**
 * Scrolls to the section in the URL hash on the home route. Handles:
 * - Opening https://site.com/#about
 * - Navigating from /resume to /#contact (Navbar uses navigate + hash only)
 * - React Router <Link to="/#projects"> clicks
 */
function HashScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (pathname !== '/') return;

    const id = hash?.replace(/^#/, '') ?? '';
    if (!id || !SECTION_IDS.includes(id)) return;

    scrollToAnchorWhenReady(id);
  }, [pathname, hash]);

  return null;
}

export default HashScrollHandler;
