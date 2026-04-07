import PropTypes from 'prop-types';

function SectionHeader({ title, as: HeadingTag }) {
  return (
    <div className="flex items-center gap-4">
      <HeadingTag className="text-2xl md:text-3xl font-mono font-bold text-white">
        {title}
      </HeadingTag>
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
