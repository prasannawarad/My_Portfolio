import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import StackColumn from '../components/StackColumn';
import TerminalWindow from '../components/TerminalWindow';
import {
  bio,
  certifications,
  education,
  experienceCompanyName,
  impactMetrics,
  leadershipExperience,
  technicalExperience,
} from '../data/experience';
import { contactChannels } from '../data/contactChannels';
import { projects } from '../data/projects';
import { stackColumns } from '../data/stack';
import useRevealOnScroll from '../hooks/useRevealOnScroll';

function Home() {
  useRevealOnScroll();

  const heroRef = useRef(null);
  const heroRafRef = useRef(null);

  const heroSpotlightDefaults = useMemo(() => ({ '--mx': '22%', '--my': '18%', '--hero-gold-a': '0.14' }), []);
  const profileImageUrl = useMemo(() => `${import.meta.env.BASE_URL}prasanna.jpeg`, []);
  const isCoarsePointer = useMemo(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(pointer: coarse)').matches;
  }, []);

  useEffect(() => {
    return () => {
      if (heroRafRef.current) cancelAnimationFrame(heroRafRef.current);
    };
  }, []);

  const onHeroPointerMove = (e) => {
    if (isCoarsePointer) return;
    const el = heroRef.current;
    if (!el) return;
    if (heroRafRef.current) cancelAnimationFrame(heroRafRef.current);

    heroRafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      el.style.setProperty('--mx', `${(x * 100).toFixed(2)}%`);
      el.style.setProperty('--my', `${(y * 100).toFixed(2)}%`);
    });
  };

  const onHeroPointerLeave = () => {
    if (isCoarsePointer) return;
    const el = heroRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '22%');
    el.style.setProperty('--my', '18%');
  };

  return (
    <div className="w-full min-w-0 max-w-7xl px-4 pb-16 pt-8 sm:px-5 lg:px-8">
      <section
        id="home"
        className="scroll-mt-20 pt-6 pb-6 sm:scroll-mt-24 sm:pt-8 sm:pb-8 md:pt-14 md:pb-14"
        aria-label="Home section"
      >
        <div
          ref={heroRef}
          className="hero-spotlight relative grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center"
          style={heroSpotlightDefaults}
          onPointerMove={onHeroPointerMove}
          onPointerLeave={onHeroPointerLeave}
        >
          <div
            className="pointer-events-none absolute -inset-x-4 -top-10 -bottom-8 opacity-70 sm:-inset-x-6 lg:-inset-x-10"
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--mx)_var(--my),rgba(212_175_55_/_var(--hero-gold-a)),transparent_44%),radial-gradient(circle_at_82%_32%,rgba(148_163_184_/_0.10),transparent_44%),linear-gradient(to_bottom,rgba(8_15_16_/_0.55),rgba(8_15_16_/_0))]" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgba(148,163,184,0.9)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.9)_1px,transparent_1px)] [background-size:48px_48px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.10),transparent_55%)] blur-2xl" />
          </div>
          <div className="hero-copy relative flex min-w-0 flex-col gap-6">
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded border border-surface-accent bg-surface-dark px-2 py-1 sm:px-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse motion-reduce:animate-none" />
              <span className="truncate font-mono text-[10px] font-bold text-primary sm:text-xs">
                System Online // v7.0.0
              </span>
            </div>

            <h1 className="text-balance break-words text-3xl font-black leading-[1.06] tracking-tight text-white font-display sm:text-4xl md:text-5xl lg:text-[3.35rem]">
              <span className="block text-white">
                {bio.heroLine1}{' '}
                <span className="bg-gradient-to-r from-primary to-yellow-200 bg-clip-text text-transparent">
                  {bio.heroLine2}
                </span>
              </span>
            </h1>

            <p className="max-w-2xl border-l-2 border-primary/40 pl-4 text-sm leading-relaxed text-slate-300 md:text-base">
              {bio.elevatorPitch}
            </p>

            <p className="max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
              {bio.summary}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/projects"
                replace
                className="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-5 font-mono text-sm font-bold text-primary transition-all hover:bg-primary hover:text-background-dark sm:w-auto sm:px-6"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                ./view_projects.sh
              </Link>
              <Link
                to="/contact"
                replace
                className="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded border border-surface-accent bg-code-bg px-5 font-mono text-sm font-bold text-white transition-colors hover:border-primary hover:text-primary sm:w-auto sm:px-6"
              >
                <span className="material-symbols-outlined text-base">mail</span>
                echo &quot;contact&quot;
              </Link>
            </div>

            <div className="overflow-x-auto rounded border-l-2 border-primary bg-surface-dark p-4 sm:p-5">
              <p className="min-w-0 font-mono text-xs leading-relaxed text-text-muted sm:text-sm">
                <span className="text-primary">const</span> engineer = {'{'}
                <br />
                {'  '}focus: <span className="text-green-300">&quot;{bio.primaryFocus}&quot;</span>,
                <br />
                {'  '}roles: <span className="text-green-300">&quot;{bio.role}&quot;</span>,
                <br />
                {'  '}location: <span className="text-green-300">&quot;{bio.location}&quot;</span>,
                <br />
                {'  '}status: <span className="text-green-300">&quot;{bio.status}&quot;</span>
                <br />
                {'};'}
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <TerminalWindow title="profile --card" className="terminal-window--no-filter" bodyClassName="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="mx-auto h-52 w-52 overflow-hidden rounded-full border-2 border-surface-accent sm:h-56 sm:w-56">
                  <img
                    src={profileImageUrl}
                    alt="Prasanna Warad profile"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-[86%_40%] scale-[1.18] transition-transform duration-500 hover:scale-[1.22]"
                  />
                </div>
                <div className="border-t border-surface-accent pt-4 font-mono text-sm text-text-muted">
                  <p>
                    name: <span className="text-white">{bio.name}</span>
                  </p>
                  <p>
                    email:{' '}
                    <a href={`mailto:${bio.email}`} className="text-primary hover:underline">
                      {bio.email}
                    </a>
                  </p>
                  <p>
                    phone:{' '}
                    <a href={`tel:${bio.phone}`} className="text-white hover:underline">
                      {bio.phone}
                    </a>
                  </p>
                  <p>
                    github:{' '}
                    <a href={bio.github} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      github.com/prasannawarad
                    </a>
                  </p>
                </div>
              </div>
            </TerminalWindow>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="home-main-section reveal"
        aria-label="About section"
        data-reveal
        style={{ '--reveal-delay': '20ms' }}
      >
        <SectionHeader title="ABOUT" />
        <div className="mt-8 grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="flex min-w-0 flex-col gap-8 lg:col-span-7">
            <TerminalWindow title="bio.json" bodyClassName="p-6 font-mono text-sm leading-relaxed overflow-x-auto terminal-scrollbar">
              <pre>
                <code className="text-text-muted">
                  {'{'}
                  {'\n'}  <span className="text-primary">&quot;name&quot;</span>: <span className="text-green-400">&quot;{bio.name}&quot;</span>,
                  {'\n'}  <span className="text-primary">&quot;role&quot;</span>: <span className="text-green-400">&quot;{bio.role}&quot;</span>,
                  {'\n'}  <span className="text-primary">&quot;location&quot;</span>: <span className="text-green-400">&quot;{bio.location}&quot;</span>,
                  {'\n'}  <span className="text-primary">&quot;summary&quot;</span>: <span className="text-green-400">&quot;{bio.summary}&quot;</span>
                  {'\n'}
                  {'}'}
                </code>
              </pre>
            </TerminalWindow>

            <div className="rounded border border-surface-accent bg-surface-dark p-6">
              <h3 className="mb-6 font-mono text-lg font-bold text-white">tail -f Professional_Experience.log</h3>
              <div className="relative ml-3 space-y-7 border-l-2 border-surface-accent pl-7 font-mono">
                {technicalExperience.map((item) => {
                  const company = experienceCompanyName(item);
                  return (
                  <article key={item.id} className="relative">
                    <span
                      className={`absolute -left-[34px] top-1.5 h-4 w-4 rounded-full border-4 border-background-dark ${
                        item.current ? 'bg-primary' : 'bg-surface-accent'
                      }`}
                    />
                    <p className="text-xs font-bold text-primary">{item.duration}</p>
                    <h4 className="mt-1 text-base font-bold text-white">{item.role}</h4>
                    {company ? <p className="mt-1 text-sm text-white">{company}</p> : null}
                    {item.office ? <p className="mt-1 text-xs text-white">{item.office}</p> : null}
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {item.points.map((point) => (
                        <li key={point}>&gt; {point}</li>
                      ))}
                    </ul>
                  </article>
                  );
                })}
              </div>
            </div>
          </div>

          <aside className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <div className="rounded border border-surface-accent bg-surface-dark p-6">
              <h3 className="mb-4 border-b border-surface-accent pb-2 font-mono text-sm font-bold text-text-muted">
                KEY_IMPACT_METRICS
              </h3>
              <div className="grid grid-cols-1 gap-4 font-mono">
                {impactMetrics.map((metric) => (
                  <div key={metric.id}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-primary">{metric.value}</span>
                      <span className="text-sm font-bold text-white">{metric.label}</span>
                    </div>
                    <p className="mt-1 border-l-2 border-surface-accent pl-2 text-xs text-text-muted">
                      {metric.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 [&>*]:min-w-0">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className="flex min-h-[9.5rem] w-full min-w-0 flex-col items-center justify-center gap-2 rounded border border-surface-accent bg-code-bg p-4 text-center transition-colors hover:border-primary/50"
                >
                  <div className="flex w-full shrink-0 justify-center">
                    <span className={`material-symbols-outlined text-2xl ${certification.iconClass}`} aria-hidden="true">
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

            <TerminalWindow title="education.json" bodyClassName="p-5 font-mono text-sm leading-relaxed">
              <div className="space-y-4 text-text-muted">
                {education.map((item) => (
                  <article key={item.id}>
                    <p className="text-white">{item.degree}</p>
                    <p>{item.institution}</p>
                    <p className="text-primary">{item.duration}</p>
                  </article>
                ))}
              </div>
            </TerminalWindow>

            <div className="rounded border border-surface-accent bg-code-bg p-5">
              <h3 className="mb-3 font-mono text-sm font-bold text-text-muted">
                LEADERSHIP_&_CAMPUS_EXPERIENCE
              </h3>
              <div className="space-y-3 font-mono text-sm text-text-muted">
                {leadershipExperience.map((item) => {
                  const company = experienceCompanyName(item);
                  return (
                    <article key={item.id}>
                      <p className="text-xs font-bold text-primary">{item.duration}</p>
                      <p className="text-white">{item.role}</p>
                      {company ? <p className="text-white">{company}</p> : null}
                    </article>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="projects"
        className="home-main-section reveal"
        aria-label="Projects section"
        data-reveal
        style={{ '--reveal-delay': '60ms' }}
      >
        <SectionHeader title="PROJECTS" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="full" />
          ))}
        </div>

        <div className="mt-12">
          <SectionHeader as="h3" title="TECHNICAL STACK" />
          <div className="mt-8 rounded border border-surface-accent bg-code-bg p-7">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {stackColumns.map((column) => (
                <StackColumn key={column.id} icon={column.icon} title={column.title} items={column.items} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="home-main-section reveal"
        aria-label="Contact section"
        data-reveal
        style={{ '--reveal-delay': '90ms' }}
      >
        <SectionHeader title="CONTACT" />
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {contactChannels.map((ch) => (
              <a
                key={ch.id}
                href={ch.href}
                {...(ch.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex min-h-[11.5rem] flex-col rounded border border-surface-accent bg-surface-dark p-5 transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:shadow-lg hover:shadow-primary/5"
                aria-label={`${ch.title}: ${ch.value}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-primary/35 bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                      {ch.icon}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-lg text-text-muted opacity-60 transition-opacity group-hover:opacity-100 group-hover:text-primary" aria-hidden="true">
                    {ch.external ? 'open_in_new' : 'arrow_forward'}
                  </span>
                </div>
                <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-primary">{ch.title}</p>
                <p className="mt-1 break-all text-sm font-semibold text-white group-hover:text-primary">{ch.value}</p>
                <p className="mt-auto pt-3 text-xs leading-snug text-text-muted">{ch.hint}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
