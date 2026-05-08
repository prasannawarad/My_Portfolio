import PropTypes from 'prop-types';

/**
 * Hero “Focus” panel — plain language tied to `experience.js` / bio, not abstract graphics.
 */
function FocusPipelineCard({ data }) {
  const { title, bullets, tags } = data;

  return (
    <div className="relative overflow-hidden rounded-lg border border-surface-accent bg-[#0a1012] p-5 shadow-xl shadow-black/40 ring-1 ring-white/[0.04]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start gap-3 border-b border-surface-accent/70 pb-3">
        <span className="material-symbols-outlined mt-0.5 shrink-0 text-primary" aria-hidden="true">
          data_object
        </span>
        <h2 className="font-display text-lg font-bold tracking-tight text-primary">{title}</h2>
      </div>

      <ul className="relative z-10 mt-4 list-none space-y-3 font-mono text-[13px] leading-relaxed text-slate-300">
        {bullets.map((line) => (
          <li key={line} className="flex gap-2.5">
            <span className="shrink-0 font-bold text-primary/80" aria-hidden="true">
              ›
            </span>
            <span className="min-w-0">{line}</span>
          </li>
        ))}
      </ul>

      {tags?.length ? (
        <div className="relative z-10 mt-5 flex flex-wrap gap-2 border-t border-surface-accent/60 pt-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-surface-accent bg-code-bg/80 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-primary/90"
            >
              {tag}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

FocusPipelineCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bullets: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default FocusPipelineCard;
