import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-dark text-text-main font-display antialiased overflow-x-hidden terminal-scrollbar">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
