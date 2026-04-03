import { useState } from 'react';
import { Link } from 'react-router-dom';
import profileImage from '../assets/profile-960.webp';
import ProjectCard from '../components/ProjectCard';
import SectionHeader from '../components/SectionHeader';
import StackColumn from '../components/StackColumn';
import TerminalWindow from '../components/TerminalWindow';
import {
  bio,
  certifications,
  education,
  impactMetrics,
  leadershipExperience,
  technicalExperience,
} from '../data/experience';
import { projects } from '../data/projects';
import { stackColumns } from '../data/stack';

const initialState = {
  name: '',
  email: '',
  message: '',
};

function Home() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState('idle');

  const socialLinks = [
    { id: 'social-1', icon: 'work', label: 'linkedin.com/in/prasannawarad', href: bio.linkedin, external: true },
    { id: 'social-2', icon: 'code', label: 'github.com/prasannawarad', href: bio.github, external: true },
    { id: 'social-3', icon: 'mail', label: bio.email, href: `mailto:${bio.email}` },
    { id: 'social-4', icon: 'call', label: bio.phone, href: `tel:${bio.phone.replace(/\D/g, '')}` },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus('sending');

    const body = new URLSearchParams({
      'form-name': 'contact',
      ...formData,
    });

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        setStatus('success');
        setFormData(initialState);
      })
      .catch(() => {
        setStatus('error');
      });
  };

  return (
    <div className="w-full min-w-0 max-w-7xl px-4 pb-24 pt-14 sm:px-5 lg:px-8">
      <section id="home" className="scroll-mt-24 py-10 sm:scroll-mt-28 sm:py-12 md:py-16" aria-label="Home section">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div className="flex min-w-0 flex-col gap-6">
            <div className="inline-flex w-fit max-w-full items-center gap-2 rounded border border-surface-accent bg-surface-dark px-2 py-1 sm:px-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-green-500 animate-pulse" />
              <span className="truncate font-mono text-[10px] font-bold text-primary sm:text-xs">
                System Online // v5.0.0
              </span>
            </div>

            <h1 className="text-balance break-words text-3xl font-black leading-[1.12] tracking-tight text-white font-mono sm:text-4xl md:text-5xl lg:text-[3.25rem]">
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
                to="/#projects"
                replace
                className="inline-flex h-11 min-h-[44px] w-full items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-5 font-mono text-sm font-bold text-primary transition-all hover:bg-primary hover:text-background-dark sm:w-auto sm:px-6"
              >
                <span className="material-symbols-outlined text-base">terminal</span>
                ./view_projects.sh
              </Link>
              <Link
                to="/#contact"
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
            <TerminalWindow title="profile --card" bodyClassName="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div className="mx-auto h-56 w-56 overflow-hidden rounded-full border-2 border-surface-accent">
                  <img src={profileImage} alt="Prasanna Warad profile" className="h-full w-full object-cover" />
                </div>
                <div className="border-t border-surface-accent pt-4 font-mono text-sm text-text-muted">
                  <p>
                    name: <span className="text-white">{bio.name}</span>
                  </p>
                  <p>
                    email: <span className="text-primary">{bio.email}</span>
                  </p>
                  <p>
                    phone: <span className="text-white">{bio.phone}</span>
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

      <section id="about" className="scroll-mt-24 py-10 sm:scroll-mt-28 sm:py-12 md:py-16" aria-label="About section">
        <SectionHeader index="01" title="ABOUT" />
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
              <h3 className="mb-6 font-mono text-lg font-bold text-white">tail -f relevant_experience.log</h3>
              <div className="relative ml-3 space-y-7 border-l-2 border-surface-accent pl-7 font-mono">
                {technicalExperience.map((item) => (
                  <article key={item.id} className="relative">
                    <span
                      className={`absolute -left-[34px] top-1.5 h-4 w-4 rounded-full border-4 border-background-dark ${
                        item.current ? 'bg-primary' : 'bg-surface-accent'
                      }`}
                    />
                    <p className="text-xs font-bold text-primary">{item.duration}</p>
                    <h4 className="mt-1 text-base font-bold text-white">{item.role}</h4>
                    {item.label ? <p className="mt-1 text-xs text-text-muted">{item.label}</p> : null}
                    <ul className="mt-3 space-y-2 text-sm text-text-muted">
                      {item.points.map((point) => (
                        <li key={point}>&gt; {point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded border border-surface-accent bg-code-bg p-5">
              <h3 className="mb-3 font-mono text-sm font-bold text-text-muted">
                LEADERSHIP_&_CAMPUS_EXPERIENCE
              </h3>
              <div className="space-y-3 font-mono text-sm text-text-muted">
                {leadershipExperience.map((item) => (
                  <article key={item.id}>
                    <p className="text-xs font-bold text-primary">{item.duration}</p>
                    <p className="text-white">{item.role}</p>
                    <p>{item.label}</p>
                  </article>
                ))}
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

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {certifications.map((certification) => (
                <div
                  key={certification.id}
                  className="rounded border border-surface-accent bg-code-bg p-4 text-center transition-colors hover:border-primary/50"
                >
                  <span className={`material-symbols-outlined text-2xl ${certification.iconClass}`} aria-hidden="true">
                    {certification.icon}
                  </span>
                  <p className="mt-2 font-mono text-xs font-bold text-white">{certification.title}</p>
                  <p className="font-mono text-xs text-text-muted">{certification.subtitle}</p>
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
          </aside>
        </div>
      </section>

      <section id="projects" className="scroll-mt-24 py-10 sm:scroll-mt-28 sm:py-12 md:py-16" aria-label="Projects section">
        <SectionHeader index="02" title="PROJECTS" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="full" />
          ))}
        </div>

        <div className="mt-10 rounded border border-surface-accent bg-code-bg p-7">
          <h3 className="mb-6 font-mono text-sm font-bold text-text-muted">TECHNICAL_STACK</h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {stackColumns.map((column) => (
              <StackColumn key={column.id} icon={column.icon} title={column.title} items={column.items} />
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 py-10 sm:scroll-mt-28 sm:py-12 md:py-16" aria-label="Contact section">
        <SectionHeader index="03" title="CONTACT" />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form
              className="relative flex flex-col gap-6 overflow-hidden rounded border border-surface-accent bg-surface-dark p-6 md:p-8"
              onSubmit={handleSubmit}
              name="contact"
              data-netlify="true"
            >
              <input type="hidden" name="form-name" value="contact" />
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50" />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label htmlFor="name" className="font-mono text-sm font-bold text-primary">
                  &gt; Name:
                  <input
                    className="mt-2 w-full rounded border border-surface-accent bg-code-bg px-3 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-primary"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label htmlFor="email" className="font-mono text-sm font-bold text-primary">
                  &gt; Email:
                  <input
                    className="mt-2 w-full rounded border border-surface-accent bg-code-bg px-3 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-primary"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <label htmlFor="message" className="font-mono text-sm font-bold text-primary">
                &gt; Message:
                <textarea
                  className="terminal-scrollbar mt-2 w-full resize-none rounded border border-surface-accent bg-code-bg px-3 py-3 font-mono text-sm text-white outline-none transition-colors focus:border-primary"
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="font-mono text-xs text-text-muted">
                  {status === 'sending'
                    ? 'Transmitting payload...'
                    : status === 'success'
                      ? 'Message sent successfully.'
                      : status === 'error'
                        ? 'Transmission failed.'
                        : 'Input stream ready'}
                </p>
                <button
                  type="submit"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded border border-primary bg-primary/10 px-6 font-mono text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-background-dark disabled:opacity-60"
                  disabled={status === 'sending'}
                >
                  <span className="material-symbols-outlined text-base">send</span>
                  {status === 'sending' ? 'sending...' : './send_message.sh'}
                </button>
              </div>
            </form>
          </div>

          <aside className="lg:col-span-2 flex flex-col gap-4">
            <div className="rounded border border-surface-accent bg-code-bg p-5">
              <h3 className="mb-3 font-mono text-sm font-bold text-white">
                <span className="text-primary">#</span> current_status
              </h3>
              <div className="space-y-1 font-mono text-xs text-text-muted">
                <p>availability: <span className="text-green-400">{bio.status}</span></p>
                <p>location: <span className="text-yellow-200">{bio.location}</span></p>
                <p>timezone: <span className="text-blue-300">{bio.timezone}</span></p>
                <p>response_time: <span className="text-blue-300">&lt; 24h</span></p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between rounded border border-surface-accent bg-surface-dark p-3 transition-colors hover:border-primary/50"
                  aria-label={`Open ${item.label}`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-text-muted group-hover:text-primary">
                      {item.icon}
                    </span>
                    <span className="min-w-0 break-words font-mono text-xs text-text-muted group-hover:text-white">
                      {item.label}
                    </span>
                  </span>
                  <span className="material-symbols-outlined text-sm text-text-muted opacity-0 transition-opacity group-hover:opacity-100">
                    arrow_forward
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Home;
