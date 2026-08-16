export const bio = {
  name: 'Prasanna Kailash Warad',
  /** Hero headline (two lines visually; reads as one sentence) */
  heroLine1: 'Building Data &',
  heroLine2: 'Agentic AI Systems',
  /** Plain-language line for recruiters / execs (non-terminal) */
  elevatorPitch:
    'I build production LLM, RAG, and data systems with measurable outcomes — from hybrid retrieval and quantitative evaluation to retail ETL serving 19,000+ stores and agentic hiring workflows that complete a 5-stage process in under 2 minutes.',
  role: 'Data & AI Engineer · Software Engineer',
  location: 'Dallas, TX',
  yearsActive: 1.5,
  primaryFocus: 'Data pipelines, LLM workflows & ML systems',
  status: 'Open to full-time Data Engineering, AI Engineering & SWE roles',
  summary:
    'Data and AI Engineer with 1.5 years of production experience across ETL pipelines, ML models, and LLM systems. MS ITM from UT Dallas — Dean\'s Excellence Scholar, GPA 3.88.',
  interests: ['Agentic AI', 'ETL/ELT Pipelines', 'ML Systems', 'Cloud Data Platforms'],
  phone: '469-766-7241',
  email: 'waradprasanna@gmail.com',
  linkedin: 'https://www.linkedin.com/in/prasannawarad',
  github: 'https://github.com/prasannawarad',
  timezone: 'UTC-6 (CST)',
};

/** Hero social-proof strip — short, verifiable wins. */
export const highlights = [
  { id: 'hl-1', icon: 'emoji_events', text: '5th Place · Goldman Sachs / UTD Hackathon' },
  { id: 'hl-2', icon: 'school', text: 'Dean\'s Excellence Scholar · GPA 3.88' },
  { id: 'hl-3', icon: 'ac_unit', text: 'SnowPro Platform Certified' },
];

/** Plain company name for UI (falls back to stripping `//` from `label`). */
export function experienceCompanyName(item) {
  if (item.company) return item.company;
  if (!item.label) return '';
  return item.label.replace(/^\s*\/\/\s*/, '').trim();
}

export const experience = [
  {
    id: 'exp-1',
    duration: '2025-10 — 2026-05',
    company: 'Cloud BC Labs',
    label: '// Cloud BC Labs',
    office: 'Reston, VA',
    role: 'Software Engineer Intern — AI & Data Engineering',
    points: [
      'Automated the full candidate assessment lifecycle using n8n agentic workflows and Groq LLM; job description submission triggers role-specific question generation and candidate email delivery with no manual steps, collapsing a 5-stage hiring process to under 2 minutes end-to-end.',
      'Designed 6 PostgreSQL schema migrations from scratch, normalizing candidates, assessments, AI scores, proctoring flags, and job requisitions into a structured schema powering real-time recruiter dashboard queries.',
      'Orchestrated 4 AI services — DeepFace identity verification, Groq LLM MCQ scoring, Whisper transcription, and MediaPipe behavioral proctoring — into a 6-container Docker Compose pipeline with Ollama fallback nodes.',
      'Built FastAPI, Flask, and Node.js/Express REST APIs with JWT auth linking a React/TypeScript dashboard to AI scoring services; standardized contracts across 4 microservices and cut integration overhead 20% through GitHub Actions CI/CD.',
    ],
    current: false,
    category: 'technical',
  },
  {
    id: 'exp-2',
    duration: '2025-01 — 2025-10',
    label: '// The University of Texas at Dallas',
    office: 'Richardson, TX',
    role: 'Student Services & Operations Manager',
    points: [
      'Ran day-to-day student services operations, streamlining student-facing processes and cross-team handoffs through structured process tracking.',
    ],
    current: false,
    category: 'leadership',
  },
  {
    id: 'exp-3',
    duration: '2025-01 — 2025-09',
    label: '// UTD Infinity Lions Club',
    office: 'Richardson, TX',
    role: 'Vice President',
    points: [
      'Led event planning and execution end to end, aligning cross-functional student teams and driving member engagement and community outreach.',
    ],
    current: false,
    category: 'leadership',
  },
  {
    id: 'exp-4',
    duration: '2023-02 — 2024-07',
    company: 'HCLTech Ltd — Client: Dollar General (Fortune 100 Retailer)',
    label: '// HCLTech Ltd (client: Dollar General, Fortune 100)',
    office: 'Noida, India',
    role: 'Data Engineer',
    points: [
      'Implemented Spark and Airflow data pipelines with partition pruning and query caching, cutting operational reporting latency 28% across Dollar General\'s retail analytics stack serving 19,000+ store locations.',
      'Validated 2M+ retail transaction records via Python and SQL anomaly detection, resolving data quality gaps that were degrading inventory replenishment model accuracy across Dollar General\'s fulfillment network.',
      'Constructed an anomaly detection and downtime forecasting model using scikit-learn and PyTorch on AWS system performance logs, cutting incident response time by 25% by flagging at-risk systems before failures reached production.',
    ],
    current: false,
    category: 'technical',
  },
];

export const technicalExperience = experience.filter((item) => item.category === 'technical');

export const leadershipExperience = experience.filter((item) => item.category === 'leadership');

export const education = [
  {
    id: 'edu-1',
    degree: 'Master of Science, Information Technology & Management',
    institution: 'The University of Texas at Dallas',
    duration: 'Aug 2024 - May 2026',
    distinction: 'Dean\'s Excellence Scholar',
    extra: 'Graduate Certificate: Business Analytics & Data Mining',
    gpa: '3.88/4.0',
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Engineering, Electrical',
    institution: 'Savitribai Phule Pune University',
    duration: 'Aug 2018 - May 2022',
    gpa: '3.80/4.0',
  },
];

export const impactMetrics = [
  { id: 'metric-1', label: 'Hiring Funnel', value: '<2m', text: 'Agentic AI screening lifecycle from JD to candidate delivery' },
  { id: 'metric-2', label: 'AI Pipeline', value: '4 / 6', text: 'AI services orchestrated across a 6-container Docker Compose system' },
  { id: 'metric-3', label: 'Integration Overhead', value: '-20%', text: 'Standardized contracts across 4 AI microservices with CI/CD' },
  { id: 'metric-4', label: 'Reporting Latency', value: '-28%', text: 'Spark and Airflow partition pruning plus query caching' },
  { id: 'metric-5', label: 'Retail Footprint', value: '19K+', text: 'Store locations served by the retail analytics stack' },
  { id: 'metric-6', label: 'Data Quality', value: '2M+', text: 'Transaction records validated with Python and SQL anomaly detection' },
  { id: 'metric-7', label: 'Incident Response', value: '-25%', text: 'Downtime forecasting on AWS CloudWatch system logs' },
];

export const careerProofs = [
  { id: 'proof-1', value: '6', label: 'PostgreSQL migrations designed for AI screening workflows' },
  { id: 'proof-2', value: '20', label: 'Question golden dataset used for RAGAS evaluation in CI' },
  { id: 'proof-3', value: '131', label: 'CodeLens AI unit tests, plus browser end-to-end coverage' },
];

export const certifications = [
  {
    id: 'cert-5',
    icon: 'rocket_launch',
    iconClass: 'text-orange-400',
    title: 'DataExpert.io',
    subtitle: 'AI Data Engineer',
    // `detail` is chatbot-KB only — the About page cards render title/subtitle.
    detail:
      'One-week intensive bootcamp run by DataExpert.io Academy (Zachary Wilson), issued Aug 2026, credential DE-2026-0807. Attended all three live sessions, completed all three assignments, and delivered the capstone, covering Databricks, Lakehouse architecture, data engineering, and generative AI. The four assignments and capstone are public repos: Lakebase Support Desk (day 1), Weather Intelligence Retrieval (day 2), Weather Prediction MCP Agent (day 3), and Market Research Copilot (capstone).',
  },
  {
    id: 'cert-4',
    icon: 'ac_unit',
    iconClass: 'text-sky-400',
    title: 'Snowflake',
    subtitle: 'SnowPro Core',
  },
  {
    id: 'cert-1',
    icon: 'workspace_premium',
    iconClass: 'text-yellow-500',
    title: 'Salesforce Certified',
    subtitle: 'AI Associate',
  },
  {
    id: 'cert-2',
    icon: 'analytics',
    iconClass: 'text-blue-400',
    title: 'KNIME Analytics',
    subtitle: 'Basic Proficiency',
  },
  {
    id: 'cert-3',
    icon: 'health_and_safety',
    iconClass: 'text-green-400',
    title: 'Domain Knowledge',
    subtitle: 'HIPAA',
  },
];
