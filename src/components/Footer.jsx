import { useLocation } from 'react-router-dom';

function Footer() {
  const { pathname } = useLocation();
  const showProjectMetrics = pathname === '/projects';

  return (
    <footer className="border-t border-surface-accent bg-surface-dark py-8 px-6 text-center mt-auto w-full">
      {showProjectMetrics ? (
        <div className="mb-4 flex justify-center gap-4 text-xs font-mono text-text-muted" aria-label="System metrics">
          <span>
            RAM: <span className="text-primary">12%</span>
          </span>
          <span>
            CPU: <span className="text-primary">04%</span>
          </span>
          <span>
            UPTIME: <span className="text-primary">24d 14h 22m</span>
          </span>
        </div>
      ) : null}
      <p className="font-mono text-sm text-text-muted">
        © {new Date().getFullYear()} Prasanna Kailash Warad. Built with <span className="text-primary">Tailwind</span>{' '}
        &amp; <span className="text-primary">Passion</span>. <br className="md:hidden" />
        <span className="hidden md:inline"> | </span>
        System Status: <span className="text-green-500">Normal</span>
      </p>
    </footer>
  );
}

export default Footer;
