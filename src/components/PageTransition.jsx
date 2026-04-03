import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition — wraps every page in a subtle fade + slide-up
 * animation triggered on each route change.
 * No third-party library required — pure CSS keyframe driven by a
 * className toggle on the container ref.
 */
function PageTransition({ children }) {
  const { pathname } = useLocation();
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Remove the class first so it can be re-applied (re-triggers animation)
    node.classList.remove('page-enter');
    // Force a reflow so the browser registers the removal before re-adding
    void node.offsetWidth;
    node.classList.add('page-enter');
  }, [pathname]);

  return (
    <div ref={containerRef} className="page-enter w-full flex flex-col items-center">
      {children}
    </div>
  );
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
