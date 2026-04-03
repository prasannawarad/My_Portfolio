import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';

function ChatPanel({ open, onClose }) {
  const { messages, isLoading, error, sendMessage } = useChat();
  const panelRef = useRef(null);
  const endRef = useRef(null);
  const lastIdx = messages.length - 1;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading, open]);

  useEffect(() => {
    if (!open) return undefined;
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const root = panelRef.current;
    if (!root) return undefined;

    const focusables = root.querySelectorAll(
      'button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const list = Array.from(focusables).filter(
      (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
    );
    const first = list[0];
    const last = list[list.length - 1];
    window.requestAnimationFrame(() => {
      const inputEl = root.querySelector('input[type="text"]');
      if (inputEl) inputEl.focus();
      else first?.focus();
    });

    function onKeyDown(e) {
      if (e.key !== 'Tab' || list.length === 0) return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }

    root.addEventListener('keydown', onKeyDown);
    return () => root.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[100] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {open ? (
        <div
          className="absolute inset-0 hidden bg-black/20 transition-opacity duration-300 md:block"
          onClick={onClose}
        />
      ) : null}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Chat with portfolio assistant"
        className={`absolute flex max-h-[100dvh] flex-col overflow-hidden border-surface-accent bg-code-bg shadow-2xl shadow-black/70 transition-transform duration-300 ease-out z-[1]
          inset-0 h-[100dvh] w-full rounded-none border md:inset-auto md:bottom-6 md:left-auto md:right-6 md:top-auto md:h-auto md:max-h-[600px] md:w-96 md:rounded-2xl md:border
          ${open ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-surface-accent bg-surface-dark px-3 py-2">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-wide text-primary">
              Ask about Prasanna
            </p>
            <p className="text-[11px] text-text-muted">Portfolio assistant</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-transparent text-text-muted transition-colors hover:border-surface-accent hover:text-text-main md:h-9 md:w-9"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        {error ? (
          <div className="shrink-0 border-b border-orange-500/30 bg-orange-500/10 px-3 py-2 text-xs text-orange-200">
            {error}
          </div>
        ) : null}

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="terminal-scrollbar min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3"
        >
          {messages.length === 0 ? (
            <QuickActions onPick={sendMessage} visible />
          ) : null}
          {messages.map((m, i) => (
            <ChatMessage
              key={m.id}
              role={m.role}
              content={m.content}
              isLoading={isLoading && m.role === 'assistant' && i === lastIdx}
            />
          ))}
          <div ref={endRef} />
        </div>

        <div className="shrink-0 pb-[env(safe-area-inset-bottom)]">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}

ChatPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatPanel;
