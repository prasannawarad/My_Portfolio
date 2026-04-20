import {
  bio,
  experience,
  technicalExperience,
  leadershipExperience,
  education,
  certifications,
  impactMetrics,
} from './experience.js';
import { homeFeaturedProjects, projects } from './projects.js';
import { stackColumns } from './stack.js';

/** Hobbies & life beyond work — keep in sync with worker/src/index.js SYSTEM_PROMPT */
export const personalBeyondWork = {
  sportsPlay: ['Cricket', 'Pickleball', 'Table Tennis'],
  sportsWatch: 'Loves soccer; watches games every single week',
  reading: 'Reads often; fiction and philosophy are favorite genres',
  showsTop: ['Suits', 'Billions', 'Modern Family'],
  showsNote: 'Binge-watches; these are top favorites among others',
  marvel: 'Big Marvel movie fan',
  anime: 'Big anime watcher; watches regularly',
  sideProjects:
    'Loves side projects from random ideas that often help with everyday work and tooling',
};

export const profileData = {
  bio,
  personalBeyondWork,
  experience,
  technicalExperience,
  leadershipExperience,
  education,
  certifications,
  impactMetrics,
  homeFeaturedProjects,
  projects,
  stackColumns,
};

function formatBio() {
  const b = bio;
  const lines = [
    `Name: ${b.name}`,
    `Role: ${b.role}`,
    `Location: ${b.location}`,
    `Years active (approx.): ${b.yearsActive}`,
    `Primary focus: ${b.primaryFocus}`,
    `Status: ${b.status}`,
    '',
    `Headline: ${b.heroLine1} ${b.heroLine2}`,
    '',
    `Elevator pitch: ${b.elevatorPitch}`,
    '',
    `Summary: ${b.summary}`,
    '',
    `Interests: ${b.interests.join(', ')}`,
  ];
  return lines.join('\n');
}

function formatEducation() {
  return education
    .map((e) => {
      const parts = [
        `${e.degree}`,
        `Institution: ${e.institution}`,
        `Duration: ${e.duration}`,
      ];
      if (e.distinction) parts.push(`Distinction: ${e.distinction}`);
      if (e.extra) parts.push(`Extra: ${e.extra}`);
      if (e.gpa && e.gpa !== 'N/A') parts.push(`GPA: ${e.gpa}`);
      return parts.join('\n');
    })
    .join('\n\n---\n\n');
}

function formatExperienceEntry(item) {
  const header = [
    `${item.duration} — ${item.label}`,
    `Role: ${item.role}`,
    item.office ? `Office / location: ${item.office}` : '',
    item.current ? '(Current)' : '',
  ]
    .filter(Boolean)
    .join('\n');
  const bullets = item.points.map((p) => `  • ${p}`).join('\n');
  return `${header}\n${bullets}`;
}

function formatExperience() {
  const blocks = [
    'All roles (chronological):',
    experience.map(formatExperienceEntry).join('\n\n'),
    '',
    'Technical roles:',
    technicalExperience.map(formatExperienceEntry).join('\n\n'),
    '',
    'Leadership & operations:',
    leadershipExperience.map(formatExperienceEntry).join('\n\n'),
    '',
    'Selected impact metrics (from prior roles):',
    impactMetrics.map((m) => `  • ${m.label}: ${m.value} — ${m.text}`).join('\n'),
  ];
  return blocks.join('\n');
}

function formatProjects() {
  const fmt = (list, title) => {
    const body = list
      .map((p) => {
        const bits = [
          `${p.title}`,
          p.description,
          `Tags: ${Array.isArray(p.tags) ? p.tags.join(', ') : ''}`,
        ];
        if (p.category) bits.push(`Category: ${p.category}`);
        if (p.codeUrl) bits.push(`Code: ${p.codeUrl}`);
        if (p.projectUrl) bits.push(`Link: ${p.projectUrl}`);
        if (p.liveUrl && p.liveUrl !== '#') bits.push(`Live: ${p.liveUrl}`);
        return bits.filter(Boolean).join('\n');
      })
      .join('\n\n---\n\n');
    return `${title}\n${body}`;
  };
  return [
    fmt(homeFeaturedProjects, 'Featured (home):'),
    '',
    fmt(projects, 'Full project list:'),
  ].join('\n');
}

function formatStack() {
  return stackColumns
    .map((col) => {
      const items = col.items.map((i) => `  • ${i}`).join('\n');
      return `${col.title}\n${items}`;
    })
    .join('\n\n');
}

function formatCertifications() {
  return certifications.map((c) => `${c.title}: ${c.subtitle}`).join('\n');
}

function formatContact() {
  const b = bio;
  return [
    `Phone: ${b.phone}`,
    `Email: ${b.email}`,
    `LinkedIn: ${b.linkedin}`,
    `GitHub: ${b.github}`,
    `Timezone: ${b.timezone}`,
  ].join('\n');
}

function formatPersonalBeyondWork() {
  const p = personalBeyondWork;
  return [
    `Sports (play): ${p.sportsPlay.join(', ')}`,
    `Sports (watch): ${p.sportsWatch}`,
    `Reading: ${p.reading}`,
    `TV / streaming: ${p.showsTop.join(', ')} — ${p.showsNote}`,
    `Movies: ${p.marvel}`,
    `Anime: ${p.anime}`,
    `Side projects: ${p.sideProjects}`,
  ].join('\n');
}

export function buildSystemPrompt() {
  return [
    '# Portfolio knowledge base',
    'Use only the following information when answering about Prasanna Warad (career and personal life below).',
    '',
    '## Bio',
    formatBio(),
    '',
    '## Beyond work — personal life & interests',
    formatPersonalBeyondWork(),
    '',
    '## Education',
    formatEducation(),
    '',
    '## Experience',
    formatExperience(),
    '',
    '## Projects',
    formatProjects(),
    '',
    '## Tech Stack',
    formatStack(),
    '',
    '## Certifications',
    formatCertifications(),
    '',
    '## Contact / Links',
    formatContact(),
    '',
  ].join('\n');
}
