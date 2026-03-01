import PropTypes from 'prop-types';

function TerminalWindow({ title, children, className, bodyClassName, showHeader }) {
  return (
    <div
      className={`rounded-lg border border-surface-accent bg-code-bg overflow-hidden shadow-2xl shadow-black/50 ${className}`}
    >
      {showHeader ? (
        <div className="flex items-center justify-between border-b border-surface-accent bg-surface-dark px-4 py-2">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="font-mono text-xs text-text-muted">{title}</div>
          <div className="w-10" />
        </div>
      ) : null}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

TerminalWindow.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  bodyClassName: PropTypes.string,
  showHeader: PropTypes.bool,
};

TerminalWindow.defaultProps = {
  title: 'terminal',
  className: '',
  bodyClassName: 'p-6',
  showHeader: true,
};

export default TerminalWindow;
