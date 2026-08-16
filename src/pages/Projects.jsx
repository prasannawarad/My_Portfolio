import { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const pageSize = 6;
const filters = [
  { value: 'all', label: '--all' },
  { value: 'ml-ai', label: '--ml-ai' },
  { value: 'data-eng', label: '--data-eng' },
];

function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.category === activeFilter),
    [activeFilter],
  );
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const visibleProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  const selectFilter = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  return (
    <div className="safe-page w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
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
            Found {filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}{activeFilter === 'all' ? '' : ` in ${activeFilter}`}. Displaying verified project metadata.
          </p>
        </div>
      </header>

      <section className="mb-12 border-b border-surface-accent pb-6" aria-label="Project filters">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono text-sm text-text-muted hidden sm:inline-block">Filter flags:</span>
          {filters.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => selectFilter(filter.value)}
              className={`group flex items-center gap-2 rounded px-4 py-2 text-sm font-mono transition-colors ${
                activeFilter === filter.value
                  ? 'bg-primary text-background-dark font-bold hover:bg-primary-dark'
                  : 'border border-surface-accent bg-transparent text-text-muted font-medium hover:border-primary hover:text-primary'
              }`}
              aria-label={`Filter ${filter.label}`}
              aria-pressed={activeFilter === filter.value}
            >
              <span>{filter.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Projects list">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="full" />
        ))}
      </section>

      {totalPages > 1 ? (
        <nav className="mt-16 flex justify-center" aria-label="Project pagination">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm font-mono">
          <button
            type="button"
            className="min-h-[44px] px-4 py-2 text-text-muted hover:text-primary disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
            aria-label="Previous page"
          >
            &lt; prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              className={`inline-flex min-h-[44px] items-center rounded border px-4 py-2 ${
                pageNumber === page
                  ? 'border-primary bg-primary/10 font-bold text-primary'
                  : 'border-transparent text-text-muted hover:border-surface-accent hover:bg-surface-dark hover:text-primary'
              }`}
              onClick={() => setCurrentPage(pageNumber)}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            className="min-h-[44px] px-4 py-2 text-text-muted hover:text-primary"
            disabled={page === totalPages}
            onClick={() => setCurrentPage((value) => Math.min(totalPages, value + 1))}
            aria-label="Next page"
          >
            next &gt;
          </button>
        </div>
        </nav>
      ) : null}
    </div>
  );
}

export default Projects;
