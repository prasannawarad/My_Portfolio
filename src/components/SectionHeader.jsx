import PropTypes from 'prop-types';

function SectionHeader({ title }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-2xl md:text-3xl font-mono font-bold text-white">
        {title}
      </h2>
      <div className="h-px flex-grow bg-surface-accent" />
    </div>
  );
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
