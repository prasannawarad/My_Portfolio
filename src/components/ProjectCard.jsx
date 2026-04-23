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
          {isValidLink(project.projectUrl) ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}`}
              className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <span className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors cursor-pointer">
                open_in_new
              </span>
            </a>
          ) : null}
        </div>
        <div>
          <h3 className="font-display text-xl font-black tracking-tight text-white mb-2">{project.title}</h3>
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
          <div className="flex gap-2">
            {isValidLink(project.codeUrl) ? (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View code for ${project.title}`}
                className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-text-muted hover:text-primary transition-colors cursor-pointer text-lg">
                  code
                </span>
              </a>
            ) : null}
            {isValidLink(project.liveUrl) ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live project ${project.title}`}
                className="rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="material-symbols-outlined text-text-muted hover:text-primary transition-colors cursor-pointer text-lg">
                  open_in_new
                </span>
              </a>
            ) : null}
          </div>
        </div>
        <h3 className="font-display text-xl font-black tracking-tight text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-4 h-20 overflow-hidden text-ellipsis">
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
