import PropTypes from 'prop-types';

const PRESETS = [
  'Who is Prasanna?',
  "What's your work experience?",
  'Show me your projects',
  'What are your skills?',
  'What do you do outside work?',
  'How can I reach you?',
];

function QuickActions({ onPick, visible }) {
  if (!visible) return null;

  return (
    <div className="flex flex-wrap gap-2 px-3 pb-2 pt-1 max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:pb-3 terminal-scrollbar">
      {PRESETS.map((label) => (
        <button
          key={label}
          type="button"
          onClick={() => onPick(label)}
          className="shrink-0 rounded-full border border-surface-accent bg-surface-dark px-3 py-1.5 text-left text-xs font-mono text-text-muted transition-colors hover:border-primary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
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
