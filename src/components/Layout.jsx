import { Suspense, lazy } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HashScrollHandler from './HashScrollHandler';
import Navbar from './Navbar';
import Footer from './Footer';

const ChatWidget = lazy(() => import('./chat/ChatWidget'));

function Layout() {
  const { pathname } = useLocation();
  const showFooter = pathname !== '/resume';

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-text-main font-display antialiased overflow-x-hidden">
      <HashScrollHandler />
      <Navbar />
      <main className="flex w-full min-w-0 flex-grow flex-col items-center">
        <Outlet />
      </main>
      {showFooter ? <Footer /> : null}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
}

export default Layout;
