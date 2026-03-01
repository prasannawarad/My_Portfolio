import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Button from './Button';

const navItems = [
  { path: '/', label: '~/home' },
  { path: '/about', label: '~/about' },
  { path: '/projects', label: '~/projects' },
  { path: '/contact', label: '~/contact' },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `transition-colors text-sm font-mono font-medium ${
      isActive ? 'text-primary' : 'text-text-muted hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-surface-accent bg-background-dark/90 backdrop-blur-md px-6 py-4 lg:px-10 w-full">
      <div className="flex items-center gap-3 text-primary">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-surface-dark border border-surface-accent text-primary">
          <span className="material-symbols-outlined" aria-hidden="true">
            terminal
          </span>
        </div>
        <h2 className="text-white text-lg font-mono font-bold tracking-tight">
          <span className="text-primary">&gt;</span> Prasanna.Warad<span className="animate-pulse">_</span>
        </h2>
      </div>

      <div className="hidden md:flex flex-1 justify-end gap-8">
        <nav className="flex items-center gap-8" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={linkClasses}
              aria-label={`Navigate to ${item.label.replace('~/', '')}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex gap-3">
          <Button variant="primary" ariaLabel="Hire me button">
            $ hire_me
          </Button>
          <Button href="/resume.pdf" variant="outline" ariaLabel="Open resume PDF">
            cat resume.pdf
          </Button>
        </div>
      </div>

      <button
        type="button"
        className="flex md:hidden h-10 w-10 items-center justify-center text-white"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          {isOpen ? 'close' : 'menu'}
        </span>
      </button>

      {isOpen ? (
        <nav
          id="mobile-nav"
          className="absolute left-0 top-full w-full border-b border-surface-accent bg-background-dark md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col p-4 gap-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={linkClasses}
                  aria-label={`Navigate to ${item.label.replace('~/', '')}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

export default Navbar;
