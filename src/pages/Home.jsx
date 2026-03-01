import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import StackColumn from '../components/StackColumn';
import TerminalWindow from '../components/TerminalWindow';
import { homeFeaturedProjects } from '../data/projects';
import { stackColumns } from '../data/stack';

const heroVisualUrl =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAn7cc0FpCwUVzVzhNSlx4RWszK1XHnMq83qabnI4eecGf0TJN1EXewy5q5Mj-v6Za_litQl3Kh-ygSEF_4j9IVZRdnTd1Q1B7JjUvLRVv1mr3sojEZJyrvZS5s2wo8Saubdfa3muYUETgww0cmL4OohoVGn24FubEHYNYc09-BF-CcHQIjF3a0bHbSGuF1CQAvohqvBS6jL_Qwlg5Zy872nAmhmaCIhywwhKJLtVcxSSFkxRhuNMpiZf-teT-3_Y6KqAXw882w9sI';

function Home() {
  return (
    <div className="w-full max-w-7xl px-4 lg:px-8 py-12">
      <section className="mb-20" aria-label="Hero section">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-6 lg:w-1/2">
            <div className="inline-flex items-center gap-2 rounded bg-surface-dark border border-surface-accent px-3 py-1 w-fit">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-mono text-primary font-bold">System Online // v4.0.1</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white font-mono">
              BUILDING ROBUST
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">
                DIGITAL ARCHITECTURE
              </span>
            </h1>

            <div className="relative overflow-hidden rounded border-l-2 border-primary bg-surface-dark p-6">
              <p className="font-mono text-sm md:text-base text-text-muted leading-relaxed">
                <span className="text-primary">const</span>{' '}
                <span className="text-blue-300">developer</span> = {'{'}
                <br />
                {'  '}role: <span className="text-green-300">&quot;Data Engineer&quot;</span>,
                <br />
                {'  '}specialty:{' '}
                <span className="text-green-300">&quot;Scalable Data Pipelines &amp; ML Systems&quot;</span>,
                <br />
                {'  '}location: <span className="text-green-300">&quot;Dallas, TX&quot;</span>
                <br />
                {'};'}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-2">
              <Button
                variant="solid"
                to="/projects"
                ariaLabel="View projects"
                className="h-12"
                icon={<span className="material-symbols-outlined text-lg">terminal</span>}
              >
                ./view_projects.sh
              </Button>
              <Button
                variant="outline"
                to="/contact"
                ariaLabel="Navigate to contact"
                className="h-12"
                icon={<span className="material-symbols-outlined text-lg">mail</span>}
              >
                echo &quot;contact&quot;
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute -top-4 -right-4 h-24 w-24 border-t-2 border-r-2 border-primary/30 rounded-tr-xl z-0" />
            <div className="absolute -bottom-4 -left-4 h-24 w-24 border-b-2 border-l-2 border-primary/30 rounded-bl-xl z-0" />
            <TerminalWindow
              title="bash — 80x24"
              className="relative z-10 w-full aspect-video"
              bodyClassName="h-full w-full"
            >
              <div
                className="h-full w-full object-cover bg-cover bg-center relative mt-8"
                style={{ backgroundImage: `url('${heroVisualUrl}')` }}
                role="img"
                aria-label="Monitors displaying code and data visualization"
              >
                <div className="absolute inset-0 bg-background-dark/40 backdrop-grayscale-[0.3]" />
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6 mb-20" aria-label="Featured projects">
        <SectionHeader index="01" title="FEATURED_PROJECTS" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeFeaturedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="featured" />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6" aria-label="Technical stack">
        <SectionHeader index="02" title="TECHNICAL_STACK" />
        <div className="rounded border border-surface-accent bg-code-bg p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {stackColumns.map((stackColumn) => (
              <StackColumn
                key={stackColumn.id}
                icon={stackColumn.icon}
                title={stackColumn.title}
                items={stackColumn.items}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
