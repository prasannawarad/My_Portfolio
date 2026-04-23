import PropTypes from 'prop-types';

function SectionHeader({ title, as: HeadingTag }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-baseline gap-3 min-w-0">
        <span
          className="hidden sm:inline-flex font-mono text-[10px] font-bold tracking-[0.22em] text-primary/90"
          aria-hidden="true"
        >
          SECTION
        </span>
        <HeadingTag className="min-w-0 text-2xl md:text-3xl font-display font-black tracking-tight text-white">
          {title}
        </HeadingTag>
      </div>
      <div className="h-px flex-grow bg-surface-accent" />
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  as: PropTypes.elementType,
};

SectionHeader.defaultProps = {
  as: 'h2',
};

export default SectionHeader;
