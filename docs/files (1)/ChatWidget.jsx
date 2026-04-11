import { useEffect, useState } from 'react';
import ChatPanel from './ChatPanel';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  useEffect(() => {
    if (open) setPanelMounted(true);
  }, [open]);


  useEffect(() => {
    const t = window.setTimeout(() => setShowPulse(false), 6000);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
        }}
        className={`fixed bottom-6 right-6 z-[110] flex h-14 w-14 items-center justify-center rounded-full border border-primary bg-primary/15 text-primary shadow-lg shadow-black/40 transition-colors hover:bg-primary hover:text-background-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
          showPulse ? 'animate-chat-attention' : ''
        }`}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={open ? 'Close Prasanna AI chat' : 'Chat with Prasanna AI'}
      >
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>
      {panelMounted ? (
        <ChatPanel
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        />
      ) : null}
    </>
  );
}

export default ChatWidget;
