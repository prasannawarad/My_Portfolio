import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  const { pathname } = useLocation();
  const showFooter = pathname !== '/resume';

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-text-main font-display antialiased overflow-x-hidden">
      <Navbar />
      <main className="flex w-full min-w-0 flex-grow flex-col items-center">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
    </div>
  );
}

export default Layout;
