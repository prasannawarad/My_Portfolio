import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useChat } from '../../hooks/useChat';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';

function ChatPanel({ open, onClose }) {
  const { messages, isLoading, error, sendMessage } = useChat();
  const isWaitingForResponse = isLoading;
  const panelRef = useRef(null);
  const endRef = useRef(null);
  const lastScrollLenRef = useRef(0);
  const openerRef = useRef(null);
  const lastIdx = messages.length - 1;

  useEffect(() => {
    if (!open) return undefined;

    const prevLen = lastScrollLenRef.current;
    const nextLen = messages.length;
    lastScrollLenRef.current = nextLen;

    // Only smooth-scroll when a new message is appended.
    const behavior = nextLen > prevLen && !isWaitingForResponse ? 'smooth' : 'auto';
    endRef.current?.scrollIntoView({ behavior, block: 'end' });

    return undefined;
  }, [messages.length, isWaitingForResponse, open]);

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
    openerRef.current = document.activeElement;
    const root = panelRef.current;
    if (!root) return undefined;

    window.requestAnimationFrame(() => {
      const inputEl = root.querySelector('input[type="text"]');
      if (inputEl) inputEl.focus();
      else {
        const focusables = root.querySelectorAll(
          'button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        const list = Array.from(focusables).filter(
          (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
        );
        list[0]?.focus();
      }
    });

    function onKeyDown(e) {
      if (e.key !== 'Tab') return;

      const focusables = root.querySelectorAll(
        'button, [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(focusables).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;

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
    return () => {
      root.removeEventListener('keydown', onKeyDown);
      openerRef.current?.focus?.();
    };
  }, [open]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={open ? 'true' : undefined}
      aria-hidden={!open ? 'true' : undefined}
      aria-labelledby="chat-panel-title"
      aria-describedby="chat-panel-subtitle"
      className={`relative z-[1] flex w-[360px] max-w-[min(360px,calc(100vw-2rem))] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-surface-accent bg-code-bg shadow-[0_8px_32px_rgba(0,0,0,0.4)] will-change-transform transition-[opacity,transform] duration-[250ms] ease-out
        h-[520px] max-h-[75dvh]
        max-md:fixed max-md:inset-0 max-md:z-[10000] max-md:h-full max-md:max-h-none max-md:w-full max-md:rounded-none ${
          open ? 'pointer-events-auto opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-2'
        }`}
    >
      <header className="flex shrink-0 items-center justify-between border-b border-surface-accent bg-surface-dark px-3 py-2 max-md:pt-[max(0.5rem,env(safe-area-inset-top))]">
        <div>
          <p id="chat-panel-title" className="font-mono text-xs font-bold uppercase tracking-wide text-primary">
            Prasanna AI
          </p>
          <p id="chat-panel-subtitle" className="text-[11px] text-text-muted">
            Ask me anything — work, life, or everything in between
          </p>
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
            isLoading={isWaitingForResponse && m.role === 'assistant' && i === lastIdx}
          />
        ))}
        <div ref={endRef} />
      </div>

      <div className="relative z-[2] shrink-0 pb-[env(safe-area-inset-bottom)]">
        <ChatInput onSend={sendMessage} disabled={isWaitingForResponse} />
      </div>
    </div>
  );
}

ChatPanel.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ChatPanel;
