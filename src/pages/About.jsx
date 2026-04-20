import profileImage from '../assets/profile-960.webp';
import Button from '../components/Button';
import TerminalWindow from '../components/TerminalWindow';
import {
  bio,
  certifications,
  education,
  experience,
  experienceCompanyName,
  impactMetrics,
} from '../data/experience';

function About() {
  return (
    <div className="w-full max-w-5xl px-4 lg:px-8 py-12">
      <header className="mb-10 flex items-end gap-4 border-b border-surface-accent pb-4">
        <h1 className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight">
          <span className="text-primary mr-2">$</span>whoami
        </h1>
        <span className="mb-2 hidden md:inline-block rounded bg-surface-accent px-2 py-0.5 font-mono text-xs text-text-muted">
          user: root
        </span>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10" aria-label="About content">
        <div className="lg:col-span-7 flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Data Engineer building scalable systems</h2>
            <p className="text-text-muted text-base leading-relaxed max-w-2xl">
              I specialize in analyzing vast datasets, optimizing enterprise pipelines, and building predictive ML models. With experience handling multi-million record datasets and improving database architectures, I focus on turning complex data challenges into robust, production-grade solutions.
            </p>
          </div>

          <TerminalWindow title="bio.json" bodyClassName="p-6 font-mono text-sm leading-relaxed overflow-x-auto terminal-scrollbar">
            <pre>
              <code className="language-json text-text-muted">
                {'{'}
                {'\n'}  <span className="text-primary">&quot;name&quot;</span>: <span className="text-green-400">&quot;{bio.name}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;role&quot;</span>: <span className="text-green-400">&quot;{bio.role}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;location&quot;</span>: <span className="text-green-400">&quot;{bio.location}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;years_active&quot;</span>: <span className="text-yellow-400">{bio.yearsActive}</span>,
                {'\n'}  <span className="text-primary">&quot;status&quot;</span>: <span className="text-green-400">&quot;{bio.status}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;phone&quot;</span>: <span className="text-green-400">&quot;{bio.phone}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;email&quot;</span>: <span className="text-green-400">&quot;{bio.email}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;linkedin&quot;</span>: <span className="text-green-400">&quot;{bio.linkedin}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;bio&quot;</span>: <span className="text-green-400">&quot;{bio.summary}&quot;</span>,
                {'\n'}  <span className="text-primary">&quot;interests&quot;</span>: [
                {'\n'}    {bio.interests.map((interest, index) => (
                  <span key={interest}>
                    <span className="text-green-400">&quot;{interest}&quot;</span>
                    {index === bio.interests.length - 1 ? '' : ','}
                    {'\n'}
                  </span>
                ))}
                {'  ]\n'}
                {'}'}
              </code>
            </pre>
          </TerminalWindow>

          {/* Quick Contact — scannable for non-technical visitors */}
          <div className="rounded border border-surface-accent bg-surface-dark p-5 flex flex-col gap-3">
            <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wider flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Quick Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={`mailto:${bio.email}`}
                className="group flex items-center gap-3 p-3 rounded bg-code-bg border border-surface-accent hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">mail</span>
                <span className="text-sm text-text-muted group-hover:text-white transition-colors truncate">{bio.email}</span>
              </a>
              <a
                href={`tel:${bio.phone}`}
                className="group flex items-center gap-3 p-3 rounded bg-code-bg border border-surface-accent hover:border-primary/50 transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">call</span>
                <span className="text-sm text-text-muted group-hover:text-white transition-colors">{bio.phone}</span>
              </a>
              <a
                href={bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 rounded bg-code-bg border border-surface-accent hover:border-primary/50 transition-colors sm:col-span-2"
              >
                <span className="material-symbols-outlined text-primary text-lg" aria-hidden="true">work</span>
                <span className="text-sm text-text-muted group-hover:text-white transition-colors">linkedin.com/in/prasannawarad</span>
                <span className="material-symbols-outlined text-text-muted text-sm ml-auto opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
              </a>
            </div>
          </div>

          <TerminalWindow
            title="education.json"
            bodyClassName="p-6 font-mono text-sm leading-relaxed overflow-x-auto terminal-scrollbar"
          >
            <pre>
              <code className="language-json text-text-muted">
                {'['}
                {education.map((item, index) => (
                  <span key={item.id}>
                    {'\n  {'}
                    {'\n    '}<span className="text-primary">&quot;degree&quot;</span>: <span className="text-green-400">&quot;{item.degree}&quot;</span>,
                    {'\n    '}<span className="text-primary">&quot;institution&quot;</span>: <span className="text-green-400">&quot;{item.institution}&quot;</span>,
                    {'\n    '}<span className="text-primary">&quot;duration&quot;</span>: <span className="text-yellow-400">&quot;{item.duration}&quot;</span>,
                    {'\n    '}<span className="text-primary">&quot;gpa&quot;</span>: <span className="text-green-400">&quot;{item.gpa}&quot;</span>
                    {item.distinction ? (
                      <span>
                        ,
                        {'\n    '}<span className="text-primary">&quot;distinction&quot;</span>: <span className="text-green-400">&quot;{item.distinction}&quot;</span>
                      </span>
                    ) : null}
                    {'\n  }'}
                    {index === education.length - 1 ? '' : ','}
                  </span>
                ))}
                {'\n]'}
              </code>
            </pre>
          </TerminalWindow>

          <section aria-label="Career history">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                history
              </span>
              <h2 className="font-mono text-xl font-bold text-white">tail -f Professional_Experience.log</h2>
            </div>

            <div className="relative border-l-2 border-surface-accent ml-3 pl-8 space-y-8 font-mono">
              {experience.map((item) => {
                const company = experienceCompanyName(item);
                return (
                <article key={item.id} className="relative group">
                  <span
                    className={`absolute -left-[39px] top-1.5 h-5 w-5 rounded-full border-4 border-background-dark ${
                      item.current
                        ? 'bg-primary shadow shadow-primary/50'
                        : 'bg-surface-accent group-hover:bg-primary transition-colors'
                    }`}
                  />
                  <p className={`mb-1 ${item.current ? 'text-primary' : 'text-text-muted'} font-bold`}>
                    {item.duration}
                  </p>
                  <h3
                    className={`text-lg font-bold ${
                      item.current ? 'text-white' : 'text-text-main group-hover:text-white transition-colors'
                    }`}
                  >
                    {item.role}
                  </h3>
                  {company ? <p className="mt-1 text-sm text-white">{company}</p> : null}
                  {item.office ? (
                    <p className="mt-1 text-xs text-white">{item.office}</p>
                  ) : null}
                  <p className="text-text-muted text-sm mt-2 leading-relaxed max-w-xl">
                    {item.points.map((point) => (
                      <span key={point}>
                        &gt; {point}
                        <br />
                      </span>
                    ))}
                  </p>
                </article>
                );
              })}
              <div className="relative">
                <span className="absolute -left-[35px] top-2 h-3 w-3 rounded-full bg-surface-accent" />
                <span className="text-xs text-surface-accent font-mono animate-pulse">_ End of log stream</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-5 flex flex-col gap-8" aria-label="Profile and skills">
          <div className="relative w-full aspect-square rounded-lg border border-surface-accent bg-surface-dark overflow-hidden flex items-center justify-center group">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#1C3338 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="relative h-64 w-64 rounded-full overflow-hidden border-4 border-surface-accent group-hover:border-primary transition-all duration-500 shadow-2xl">
              <img
                alt="Profile portrait"
                className="h-full w-full object-cover grayscale-0 group-hover:sepia-[.2] transition-all duration-500"
                src={profileImage}
              />
              <div className="absolute inset-0 bg-transparent group-hover:bg-primary/20 mix-blend-overlay transition-all duration-500" />
            </div>
            <div className="absolute bottom-4 right-4 bg-background-dark border border-primary px-3 py-1 rounded shadow-lg">
              <span className="text-xs font-mono text-primary font-bold">Data Engineer</span>
            </div>
          </div>

          <div className="rounded border border-surface-accent bg-surface-dark p-6">
            <h3 className="font-mono text-sm font-bold text-text-muted mb-4 border-b border-surface-accent pb-2">
              KEY_IMPACT_METRICS
            </h3>
            <div className="space-y-6 font-mono">
              {impactMetrics.map((metric) => (
                <div key={metric.id} className="flex flex-col gap-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">{metric.value}</span>
                    <span className="text-white font-bold">{metric.label}</span>
                  </div>
                  <span className="text-text-muted text-sm border-l-2 border-surface-accent pl-2 mt-1">
                    {metric.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 [&>*]:min-w-0">
            {certifications.map((certification) => (
              <div
                key={certification.id}
                className="flex min-h-[10.5rem] w-full min-w-0 flex-col items-center justify-center gap-2 rounded border border-surface-accent bg-code-bg p-4 text-center transition-colors hover:border-primary/50"
              >
                <div className="flex w-full shrink-0 justify-center">
                  <span
                    className={`material-symbols-outlined text-3xl ${certification.iconClass}`}
                    aria-hidden="true"
                  >
                    {certification.icon}
                  </span>
                </div>
                <div className="w-full min-w-0">
                  <p className="text-balance font-mono text-xs font-bold text-white">{certification.title}</p>
                  <p className="mt-1 text-balance font-mono text-xs leading-snug text-white/80">{certification.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-16 flex flex-col items-center gap-4 text-center" aria-label="Call to action">
        <p className="font-mono text-text-muted text-sm">
          {'// Ready to collaborate? Initialize contact sequence.'}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="solid"
            to="/contact"
            ariaLabel="Send email"
            className="h-12"
            icon={<span className="material-symbols-outlined text-lg">mail</span>}
          >
            ./send_email.sh
          </Button>
          <Button
            variant="outline"
            href="/resume.pdf"
            ariaLabel="Download resume"
            className="h-12"
            icon={<span className="material-symbols-outlined text-lg">download</span>}
          >
            curl resume.pdf
          </Button>
        </div>
      </section>
    </div>
  );
}

export default About;
