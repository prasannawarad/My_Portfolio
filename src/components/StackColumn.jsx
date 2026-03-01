import PropTypes from 'prop-types';

function StackColumn({ icon, title, items }) {
  return (
    <div className="flex flex-col gap-3 border-l border-surface-accent pl-4 hover:border-primary transition-colors">
      <div className="text-primary flex items-center gap-2">
        <span className="material-symbols-outlined" aria-hidden="true">
          {icon}
        </span>
        <span className="font-mono font-bold text-sm">{title}</span>
      </div>
      <ul className="flex flex-col gap-2 text-sm text-text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

StackColumn.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StackColumn;
