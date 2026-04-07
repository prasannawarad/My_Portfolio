import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const Resume = lazy(() => import('./pages/Resume'));
const ChatWidget = lazy(() => import('./components/chat/ChatWidget'));

function ResumeRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] w-full items-center justify-center bg-background-dark font-mono text-sm text-text-muted">
          Loading resume…
        </div>
      }
    >
      <Resume />
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/resume" element={<ResumeRoute />} />
        </Route>
      </Routes>
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
