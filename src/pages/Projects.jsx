import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const filters = ['--all', '--data-eng', '--web-dev', '--devops', '--ml-ai'];

function Projects() {
  return (
    <div className="w-full max-w-7xl px-4 lg:px-8 py-12">
      <header className="mb-10" aria-label="Projects header">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-text-muted font-mono text-sm mb-2">
            <span className="text-green-500">prasanna@portfolio</span>
            <span>:</span>
            <span className="text-blue-400">~/workspace</span>
            <span>$</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
            ls <span className="text-primary">./projects/</span>
          </h1>
          <p className="text-text-muted mt-2 font-mono text-sm md:text-base max-w-2xl">
            Found {projects.length} directories. Access level: public. Displaying latest commits.
          </p>
        </div>
      </header>

      <section className="mb-12 border-b border-surface-accent pb-6" aria-label="Project filters">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-sm text-text-muted hidden sm:inline-block">Filter flags:</span>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`group flex items-center gap-2 rounded px-4 py-2 text-sm font-mono transition-colors ${
                filter === '--all'
                  ? 'bg-primary text-background-dark font-bold hover:bg-primary-dark'
                  : 'border border-surface-accent bg-transparent text-text-muted font-medium hover:border-primary hover:text-primary'
              }`}
              aria-label={`Filter ${filter}`}
            >
              <span>{filter}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Projects list">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="full" />
        ))}
      </section>

      <nav className="mt-16 flex justify-center" aria-label="Project pagination">
        <div className="flex items-center gap-4 text-sm font-mono">
          <button
            type="button"
            className="px-4 py-2 text-text-muted hover:text-primary disabled:opacity-50"
            disabled
            aria-label="Previous page"
          >
            &lt; prev
          </button>
          <span className="text-primary font-bold">[ 1 ]</span>
          <button
            type="button"
            className="px-4 py-2 text-text-muted hover:text-primary hover:bg-surface-dark rounded border border-transparent hover:border-surface-accent"
            aria-label="Go to page 2"
          >
            2
          </button>
          <button
            type="button"
            className="px-4 py-2 text-text-muted hover:text-primary hover:bg-surface-dark rounded border border-transparent hover:border-surface-accent"
            aria-label="Go to page 3"
          >
            3
          </button>
          <button
            type="button"
            className="px-4 py-2 text-text-muted hover:text-primary"
            aria-label="Next page"
          >
            next &gt;
          </button>
        </div>
      </nav>
    </div>
  );
}

export default Projects;
