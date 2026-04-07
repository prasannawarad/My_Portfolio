import { bio } from '../data/experience';
import { contactChannels } from '../data/contactChannels';

function Contact() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <header
        className="flex min-w-0 w-full max-w-3xl flex-col gap-5 border-l-4 border-primary py-2 pl-6"
        aria-label="Contact header"
      >
        <div className="flex items-center gap-3 font-mono text-sm text-text-muted">
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            dns
          </span>
          <span>prasanna@portfolio:~/contact</span>
        </div>
        <h1 className="blinking-cursor break-words font-mono text-2xl font-black leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          ssh <span className="break-all text-primary">{bio.email}</span>
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-300">
          Full-time roles in software engineering, data engineering, and analytics. Choose a channel below to connect.
        </p>
      </header>

      <section aria-label="Contact content">
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
                <span
                  className="material-symbols-outlined text-lg text-text-muted opacity-60 transition-opacity group-hover:text-primary group-hover:opacity-100"
                  aria-hidden="true"
                >
                  {ch.external ? 'open_in_new' : 'arrow_forward'}
                </span>
              </div>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-primary">{ch.title}</p>
              <p className="mt-1 break-all text-sm font-semibold text-white group-hover:text-primary">{ch.value}</p>
              <p className="mt-auto pt-3 text-xs leading-snug text-text-muted">{ch.hint}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Contact;
