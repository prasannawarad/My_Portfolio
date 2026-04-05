import PropTypes from 'prop-types';

function BotIcon() {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-surface-accent bg-surface-dark font-mono text-xs font-bold text-primary"
      aria-hidden
    >
      PW
    </div>
  );
}

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 px-1 py-0.5" aria-label="Prasanna AI is thinking">
      <span className="chat-loading-dot inline-block h-1.5 w-1.5 rounded-full bg-text-muted [animation-delay:0ms]" />
      <span className="chat-loading-dot inline-block h-1.5 w-1.5 rounded-full bg-text-muted [animation-delay:150ms]" />
      <span className="chat-loading-dot inline-block h-1.5 w-1.5 rounded-full bg-text-muted [animation-delay:300ms]" />
    </span>
  );
}

function ChatMessage({ role, content, isLoading }) {
  const isUser = role === 'user';

  if (isUser) {
    return (
      <div className="animate-chat-message flex justify-end">
        <div
          className="max-w-[85%] rounded-2xl rounded-br-md border border-primary/40 bg-primary/15 px-3 py-2 text-sm text-text-main"
          role="article"
        >
          <p className="whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-chat-message flex gap-2 justify-start">
      <BotIcon />
      <div
        className="max-w-[85%] rounded-2xl rounded-bl-md border border-surface-accent bg-surface-dark px-3 py-2 text-sm text-text-main"
        role="article"
      >
        {isLoading && !content ? (
          <LoadingDots />
        ) : (
          <p className="whitespace-pre-wrap break-words">{content}</p>
        )}
      </div>
    </div>
  );
}

ChatMessage.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  content: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

ChatMessage.defaultProps = {
  isLoading: false,
};

export default ChatMessage;
