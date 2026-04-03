import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const MAX_LEN = 500;

function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState('');

  const submit = useCallback(() => {
    const t = value.trim();
    if (!t || disabled) return;
    onSend(t);
    setValue('');
  }, [value, disabled, onSend]);

  const onKeyDown = useCallback(
    (e) => {
      if (e.key !== 'Enter' || e.shiftKey) return;
      e.preventDefault();
      submit();
    },
    [submit],
  );

  return (
    <div className="flex items-end gap-2 border-t border-surface-accent bg-code-bg p-3">
      <input
        type="text"
        maxLength={MAX_LEN}
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, MAX_LEN))}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder="Ask about Prasanna…"
        aria-label="Chat message"
        autoComplete="off"
        className="min-w-0 flex-1 rounded-lg border border-surface-accent bg-surface-dark px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
      />
      <button
        type="button"
        onClick={submit}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/50 text-primary transition-colors hover:bg-primary hover:text-background-dark disabled:pointer-events-none disabled:opacity-40"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
      </button>
    </div>
  );
}

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

ChatInput.defaultProps = {
  disabled: false,
};

export default ChatInput;
