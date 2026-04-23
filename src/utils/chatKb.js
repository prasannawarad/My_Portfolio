import {
  bio,
  certifications,
  education,
  impactMetrics,
  leadershipExperience,
  technicalExperience,
} from '../data/experience';
import { contactChannels } from '../data/contactChannels';
import { projects } from '../data/projects';
import { stackColumns } from '../data/stack';

function line(s) {
  return String(s ?? '').replace(/\s+/g, ' ').trim();
}

function section(title, lines) {
  const body = lines.filter(Boolean).map((l) => `- ${l}`).join('\n');
  return `## ${title}\n${body}`;
}

function safeList(items, mapFn) {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map(mapFn).filter(Boolean);
}

export const chatKb = [
  section('Bio', [
    `Name: ${line(bio.name)}`,
    `Role: ${line(bio.role)}`,
    `Location: ${line(bio.location)}`,
    `Primary focus: ${line(bio.primaryFocus)}`,
    `Status: ${line(bio.status)}`,
    `Headline: ${line(bio.heroLine1)} ${line(bio.heroLine2)}`,
    `Elevator pitch: ${line(bio.elevatorPitch)}`,
    `Summary: ${line(bio.summary)}`,
    `Resume PDF: /resume.pdf (treat as authoritative if any mismatch)`,
  ]),

  section(
    'Experience (technical + leadership)',
    [
      ...safeList(technicalExperience, (e) => `${line(e.duration)} — ${line(e.role)} — ${line(e.company || '')}`.trim()),
      ...safeList(leadershipExperience, (e) => `${line(e.duration)} — ${line(e.role)} — ${line(e.company || '')}`.trim()),
    ],
  ),

  section('Impact metrics', safeList(impactMetrics, (m) => `${line(m.label)}: ${line(m.value)} — ${line(m.text)}`)),

  section(
    'Projects',
    safeList(projects, (p) => `${line(p.title)} — ${line(p.description)} (tags: ${(p.tags || []).slice(0, 8).join(', ')})`),
  ),

  section(
    'Tech stack',
    safeList(stackColumns, (c) => `${line(c.title)}: ${(c.items || []).slice(0, 14).map(line).join(', ')}`),
  ),

  section(
    'Education',
    safeList(education, (e) => `${line(e.degree)} — ${line(e.institution)} (${line(e.duration)})`),
  ),

  section(
    'Certifications',
    safeList(certifications, (c) => `${line(c.title)} — ${line(c.subtitle)}`),
  ),

  section(
    'Contact',
    safeList(contactChannels, (c) => `${line(c.title)}: ${line(c.value)} (${line(c.href)})`),
  ),
].join('\n\n');

