import { useState } from 'react';
import Button from '../components/Button';

const initialState = {
  name: '',
  email: '',
  message: '',
};

const socialLinks = [
  {
    id: 'social-1',
    icon: 'work',
    label: 'linkedin.com/in/prasannawarad',
    href: 'http://www.linkedin.com/in/prasannawarad',
  },
  {
    id: 'social-2',
    icon: 'mail',
    label: 'waradprasanna@gmail.com',
    href: 'mailto:waradprasanna@gmail.com',
  },
  {
    id: 'social-3',
    icon: 'call',
    label: '+1 469-766-7241',
    href: 'tel:+14697667241',
  },
];

const statusItems = [
  { key: 'availability', value: 'Open to opportunities', colorClass: 'text-green-400' },
  { key: 'location', value: 'Dallas, TX', colorClass: 'text-yellow-200' },
  { key: 'timezone', value: 'UTC-6 (CST)', colorClass: 'text-blue-300' },
  { key: 'response_time', value: '< 24h', colorClass: 'text-red-300' },
];

function Contact() {
  const [formData, setFormData] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setFormData(initialState);
  };

  return (
    <div className="mx-auto w-full max-w-5xl flex flex-col gap-12 px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <header
        className="w-full max-w-3xl flex flex-col gap-5 border-l-4 border-primary pl-6 py-2 min-w-0"
        aria-label="Contact header"
      >
        <div className="flex items-center gap-3 text-text-muted font-mono text-sm">
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            dns
          </span>
          <span>prasanna@portfolio:~/contact</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white font-mono blinking-cursor break-words">
          ssh <span className="text-primary break-all">waradprasanna@gmail.com</span>
        </h1>
        <p className="text-text-muted font-mono max-w-2xl mt-2">
          Establishing secure connection...
          <br />
          Please authenticate yourself by filling out the form below to initiate communication
          protocol.
        </p>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16" aria-label="Contact content">
        <div className="lg:col-span-2">
          <form
            className="flex flex-col gap-6 bg-surface-dark border border-surface-accent p-6 md:p-8 rounded shadow-2xl shadow-primary/5 relative overflow-hidden group"
            onSubmit={handleSubmit}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50" />

            <div className="flex flex-col gap-1">
              <label className="font-mono text-primary font-bold text-sm" htmlFor="name">
                &gt; Enter Name:
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-text-muted font-mono text-lg select-none">$</span>
                <input
                  className="w-full bg-code-bg border border-surface-accent rounded py-3 pl-8 pr-4 text-white font-mono placeholder-text-muted/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  id="name"
                  name="name"
                  placeholder="[Type your name here...]"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  aria-label="Enter your name"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-primary font-bold text-sm" htmlFor="email">
                &gt; Enter Email:
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-text-muted font-mono text-lg select-none">$</span>
                <input
                  className="w-full bg-code-bg border border-surface-accent rounded py-3 pl-8 pr-4 text-white font-mono placeholder-text-muted/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors"
                  id="email"
                  name="email"
                  placeholder="[Type your email address...]"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-label="Enter your email"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-mono text-primary font-bold text-sm" htmlFor="message">
                &gt; Message:
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 text-text-muted font-mono text-lg select-none">$</div>
                <textarea
                  className="w-full bg-code-bg border border-surface-accent rounded py-3 pl-8 pr-4 text-white font-mono placeholder-text-muted/30 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-colors resize-none terminal-scrollbar"
                  id="message"
                  name="message"
                  placeholder="[Type your message payload...]"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-label="Enter your message"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between mt-2 gap-4">
              <div className="flex items-center gap-2 text-xs text-text-muted font-mono">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Input stream ready</span>
              </div>
              <Button
                type="submit"
                variant="solid"
                className="group relative h-12 px-8 active:scale-[0.98]"
                ariaLabel="Send contact message"
                icon={<span className="material-symbols-outlined">send</span>}
              >
                ./send_message.sh
              </Button>
            </div>

            {submitted ? (
              <p className="font-mono text-xs text-green-400">
                Message payload submitted successfully. Awaiting response...
              </p>
            ) : null}
          </form>
        </div>

        <aside className="lg:col-span-1 flex flex-col gap-8" aria-label="Contact metadata">
          <div className="p-6 border border-surface-accent bg-code-bg rounded relative">
            <h2 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
              <span className="text-primary">#</span> current_status
            </h2>
            <div className="font-mono text-sm space-y-3 text-text-muted">
              {statusItems.map((item) => (
                <p key={item.key}>
                  <span className="text-purple-400">{item.key}</span>:{' '}
                  <span className={item.colorClass}>&quot;{item.value}&quot;</span>
                </p>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-white font-mono font-bold flex items-center gap-2 text-xl">
              <span className="text-primary">&gt;</span> links --social
            </h2>
            <div className="flex flex-col gap-3">
              {socialLinks.map((socialLink) => (
                <a
                  key={socialLink.id}
                  className="group flex items-center justify-between p-4 border border-surface-accent bg-surface-dark hover:border-primary/50 hover:bg-surface-accent/50 rounded transition-all"
                  href={socialLink.href}
                  aria-label={`Open ${socialLink.label}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-text-muted group-hover:text-primary transition-colors"
                      aria-hidden="true"
                    >
                      {socialLink.icon}
                    </span>
                    <span className="text-text-muted group-hover:text-white font-mono text-sm transition-colors">
                      {socialLink.label}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

export default Contact;
