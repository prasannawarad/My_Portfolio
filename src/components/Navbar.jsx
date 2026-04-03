import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bio } from '../data/experience';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function ProfileSocialLinks({ onNavigate }) {
  const after = onNavigate ? { onClick: onNavigate } : {};

  return (
    <div className="flex items-center gap-2" aria-label="Profile links">
      <a
        href={bio.github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded border border-surface-accent bg-code-bg text-text-muted transition-colors hover:border-primary hover:text-primary"
        aria-label="GitHub profile"
        {...after}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href={bio.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-10 w-10 items-center justify-center rounded border border-surface-accent bg-code-bg text-text-muted transition-colors hover:border-primary hover:text-primary"
        aria-label="LinkedIn profile"
        {...after}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
}

ProfileSocialLinks.propTypes = {
  onNavigate: PropTypes.func,
};

ProfileSocialLinks.defaultProps = {
  onNavigate: undefined,
};

function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isResumePage = pathname === '/resume';

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (sections.length === 0) {
      if (isResumePage) setActiveSection('');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -50% 0px',
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isResumePage]);

  const scrollToSection = (sectionId) => {
    if (isResumePage) {
      navigate(`/#${sectionId}`);
      return;
    }

    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(sectionId);
    setIsOpen(false);

    const newHash = `#${sectionId}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, '', newHash);
    }
  };

  const homeClick = () => {
    if (isResumePage) {
      navigate('/');
      return;
    }
    scrollToSection('home');
  };

  const linkClasses = (isActive, layout = 'inline') =>
    `${layout === 'block' ? 'flex w-full' : 'inline-flex'} items-center gap-2 text-sm font-mono font-medium transition-colors ${
      isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
    }`;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-surface-accent bg-background-dark/90 px-4 py-3 backdrop-blur-md sm:px-6 sm:py-4 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 sm:gap-6">
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center gap-2 text-left sm:gap-3 sm:flex-none"
          onClick={homeClick}
          aria-label="Scroll to home section"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-surface-accent bg-surface-dark text-primary">
            <span className="material-symbols-outlined" aria-hidden="true">
              terminal
            </span>
          </span>
          <span className="min-w-0">
            <h2 className="truncate font-mono text-base font-bold tracking-tight text-white sm:text-lg">
              <span className="text-primary">&gt;</span> Prasanna Warad
            </h2>
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={linkClasses(!isResumePage && activeSection === item.id)}
              aria-label={`Scroll to ${item.label}`}
              aria-current={!isResumePage && activeSection === item.id ? 'page' : undefined}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  !isResumePage && activeSection === item.id ? 'bg-primary' : 'bg-surface-accent'
                }`}
                aria-hidden="true"
              />
              {item.label}
            </button>
          ))}
          <Link
            to="/resume"
            className={linkClasses(isResumePage)}
            aria-label="Open resume page"
            aria-current={isResumePage ? 'page' : undefined}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                isResumePage ? 'bg-primary' : 'bg-surface-accent'
              }`}
              aria-hidden="true"
            />
            Resume
          </Link>
        </nav>

        <div className="hidden md:flex">
          <ProfileSocialLinks />
        </div>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded border border-surface-accent bg-code-bg text-white md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
    </header>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px] md:hidden"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="fixed left-0 right-0 top-16 z-50 flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto overscroll-y-contain border-t border-surface-accent bg-background-dark px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 shadow-2xl sm:top-[4.5rem] sm:max-h-[calc(100dvh-4.5rem)] md:hidden"
            aria-label="Mobile navigation"
            role="dialog"
            aria-modal="true"
          >
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`min-h-[44px] rounded px-1 py-2 text-left ${linkClasses(!isResumePage && activeSection === item.id, 'block')}`}
              aria-label={`Scroll to ${item.label}`}
              aria-current={!isResumePage && activeSection === item.id ? 'page' : undefined}
            >
              <span
                className={`inline-flex h-1.5 w-1.5 shrink-0 rounded-full ${
                  !isResumePage && activeSection === item.id ? 'bg-primary' : 'bg-surface-accent'
                }`}
                aria-hidden="true"
              />
              {item.label}
            </button>
          ))}
          <Link
            to="/resume"
            className={`min-h-[44px] rounded px-1 py-2 text-left ${linkClasses(isResumePage, 'block')}`}
            aria-label="Open resume page"
            aria-current={isResumePage ? 'page' : undefined}
            onClick={() => setIsOpen(false)}
          >
            <span
              className={`inline-flex h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                isResumePage ? 'bg-primary' : 'bg-surface-accent'
              }`}
              aria-hidden="true"
            />
            Resume
          </Link>
          <div className="mt-3 border-t border-surface-accent pt-3">
            <ProfileSocialLinks onNavigate={() => setIsOpen(false)} />
          </div>
        </nav>
        </>
      ) : null}
    </>
  );
}

export default Navbar;
