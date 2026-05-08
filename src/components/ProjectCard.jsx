import PropTypes from 'prop-types';

function ProjectCard({ project, variant }) {
  const isValidLink = (url) => typeof url === 'string' && url.trim() !== '' && url.trim() !== '#';

  if (variant === 'featured') {
    return (
      <article className="group relative flex flex-col gap-4 rounded border border-surface-accent bg-surface-dark p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/35">
        <div className="flex items-start justify-between">
          <div className="rounded bg-background-dark p-3 text-primary border border-surface-accent">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {project.icon}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isValidLink(project.projectUrl) ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.title}`}
                className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors cursor-pointer">
                  code
                </span>
              </a>
            ) : null}
            {isValidLink(project.liveUrl) ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary transition-all hover:bg-primary hover:text-background-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-[13px]" aria-hidden="true">rocket_launch</span>
                LIVE
              </a>
            ) : null}
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl font-black tracking-tight text-white mb-1">{project.title}</h3>
          {project.award && (
            <div className="inline-flex items-center gap-1 rounded border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400 mb-2">
              <span className="material-symbols-outlined text-[12px]" aria-hidden="true">emoji_events</span>
              {project.award}
            </div>
          )}
          <p className="text-text-muted text-sm leading-relaxed mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-code-bg px-2 py-1 text-xs font-mono text-primary border border-surface-accent"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative flex flex-col gap-0 rounded border border-surface-accent bg-surface-dark transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 overflow-hidden focus-within:ring-2 focus-within:ring-primary/35">
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="rounded bg-background-dark p-3 text-primary border border-surface-accent group-hover:text-white group-hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {project.icon}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isValidLink(project.codeUrl) ? (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.title}`}
                className="rounded p-1 text-text-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-lg leading-none">code</span>
              </a>
            ) : null}
            {isValidLink(project.liveUrl) ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                className="flex items-center gap-1 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary transition-all hover:bg-primary hover:text-background-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-[13px] leading-none" aria-hidden="true">open_in_new</span>
                LIVE
              </a>
            ) : null}
          </div>
        </div>
        <h3 className="font-display text-xl font-black tracking-tight text-white mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.award && (
          <div className="inline-flex items-center gap-1 rounded border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-400 mb-2">
            <span className="material-symbols-outlined text-[12px]" aria-hidden="true">emoji_events</span>
            {project.award}
          </div>
        )}
        <p className="text-text-muted text-sm leading-relaxed mb-4 max-h-[5rem] overflow-hidden transition-[max-height] duration-500 ease-in-out group-hover:max-h-[30rem]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-code-bg px-2 py-1 text-xs font-mono text-primary border border-surface-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-auto border-t border-surface-accent bg-code-bg p-4 font-mono text-xs">
        <div className="flex items-center gap-2 text-text-muted opacity-70 mb-1">
          <span className="material-symbols-outlined text-xs" aria-hidden="true">
            history
          </span>
          <span>git log -1</span>
        </div>
        <div className="text-green-500">commit {project.commit}</div>
        <div className="text-text-muted truncate">{project.commitMessage}</div>
        <div className="text-text-muted text-[10px] mt-1">{project.updatedAt}</div>
      </div>
    </article>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    projectUrl: PropTypes.string,
    codeUrl: PropTypes.string,
    liveUrl: PropTypes.string,
    award: PropTypes.string,
    commit: PropTypes.string,
    commitMessage: PropTypes.string,
    updatedAt: PropTypes.string,
  }).isRequired,
  variant: PropTypes.oneOf(['featured', 'full']),
};

ProjectCard.defaultProps = {
  variant: 'full',
};

export default ProjectCard;
