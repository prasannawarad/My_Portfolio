import PropTypes from 'prop-types';

const PRESETS = [
  'Tell me about Prasanna',
  'Show me projects',
  "What's the tech stack?",
  'How to contact?',
];

function QuickActions({ onPick, visible }) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2 pt-1">
      {PRESETS.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(label)}
          className="rounded-full border border-surface-accent bg-surface-dark px-3 py-1.5 text-left text-xs font-mono text-text-muted transition-colors hover:border-primary hover:text-primary"
        >
          {label}
        </button>
      ))}
    </div>
  );
}

QuickActions.propTypes = {
  onPick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default QuickActions;
