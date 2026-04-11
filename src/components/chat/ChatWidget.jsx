import { useCallback, useEffect, useRef, useState } from 'react';
import ChatPanel from './ChatPanel';

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [hasOpenedChat, setHasOpenedChat] = useState(false);
  const [hasDismissedBubble, setHasDismissedBubble] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleExiting, setBubbleExiting] = useState(false);
  const bubbleAutoDismissRef = useRef(null);

  const dismissBubble = useCallback(() => {
    if (!showBubble || bubbleExiting) return;
    window.clearTimeout(bubbleAutoDismissRef.current);
    setBubbleExiting(true);
  }, [showBubble, bubbleExiting]);

  useEffect(() => {
    if (!bubbleExiting) return undefined;
    const id = window.setTimeout(() => {
      setShowBubble(false);
      setHasDismissedBubble(true);
      setBubbleExiting(false);
    }, 280);
    return () => window.clearTimeout(id);
  }, [bubbleExiting]);

  useEffect(() => {
    if (hasOpenedChat || hasDismissedBubble) return undefined;
    const t = window.setTimeout(() => {
      setShowBubble(true);
    }, 3000);
    return () => window.clearTimeout(t);
  }, [hasOpenedChat, hasDismissedBubble]);

  useEffect(() => {
    if (!showBubble || bubbleExiting) return undefined;
    bubbleAutoDismissRef.current = window.setTimeout(() => {
      setBubbleExiting(true);
    }, 8000);
    return () => window.clearTimeout(bubbleAutoDismissRef.current);
  }, [showBubble, bubbleExiting]);

  const handleToggleChat = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setHasOpenedChat(true);
    if (showBubble) {
      dismissBubble();
    }
  };

  const showTeaser = !open && showBubble;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3" aria-live="polite">
      <ChatPanel
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <div className="flex max-w-[min(100%,calc(100vw-2rem))] flex-row items-center gap-3">
        {showTeaser ? (
          <div
            className={`max-w-[min(16rem,calc(100vw-8rem))] overflow-visible ${
              bubbleExiting ? 'chat-bubble-exit' : 'animate-chat-bubble-in'
            }`}
            role="status"
          >
            <div className="chat-teaser-bubble rounded-xl border border-primary/35 bg-surface-dark/95 py-2.5 pl-3 pr-8 text-sm leading-snug text-text-main shadow-lg shadow-black/50 backdrop-blur-sm">
              <p className="text-balance pr-1">
                Hey! Ask me anything about Prasanna <span aria-hidden="true">👋</span>
              </p>
              <button
                type="button"
                onClick={dismissBubble}
                className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-surface-accent/60 hover:text-text-main"
                aria-label="Dismiss"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleToggleChat}
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/15 text-primary hover:bg-primary hover:text-background-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-dark ${
            !hasOpenedChat ? 'animate-chat-pulse-glow' : ''
          }`}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label={open ? 'Close Prasanna personalized assistant' : 'Open Prasanna personalized assistant'}
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;
