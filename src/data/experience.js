export const bio = {
  name: 'Prasanna Kailash Warad',
  /** Hero headline (two lines visually; reads as one sentence) */
  heroLine1: 'Building Data &',
  heroLine2: 'Agentic AI Systems',
  /** Plain-language line for recruiters / execs (non-terminal) */
  elevatorPitch:
    'I design data pipelines, agentic AI workflows, and ML systems that cut manual work and surface decisions at scale — from retail ETL serving 19,000+ stores to LLM pipelines that automate 5-stage hiring processes end-to-end.',
  role: 'Data & AI Engineer · Software Engineer',
  location: 'Dallas, TX',
  yearsActive: 3,
  primaryFocus: 'Data pipelines, LLM workflows & ML systems',
  status: 'Open to full-time Data Engineering, AI Engineering & SWE roles',
  summary:
    '3 years in production across retail-scale data engineering and agentic AI systems. MS ITM at UT Dallas — Dean\'s Excellence Scholar, GPA 3.88.',
  interests: ['Agentic AI', 'ETL/ELT Pipelines', 'ML Systems', 'Cloud Data Platforms'],
  phone: '469-766-7241',
  email: 'waradprasanna@gmail.com',
  linkedin: 'http://www.linkedin.com/in/prasannawarad',
  github: 'https://github.com/prasannawarad',
  timezone: 'UTC-6 (CST)',
};

/** Plain company name for UI (falls back to stripping `//` from `label`). */
export function experienceCompanyName(item) {
  if (item.company) return item.company;
  if (!item.label) return '';
  return item.label.replace(/^\s*\/\/\s*/, '').trim();
}

export const experience = [
  {
    id: 'exp-1',
    duration: '2025-10 — Present',
    company: 'Cloud BC Labs',
    label: '// Cloud BC Labs',
    office: 'Reston, VA',
    role: 'Software Engineer Intern — Data & AI Engineering',
    points: [
      'Automated the full candidate assessment lifecycle using n8n agentic workflows and Groq LLM; job description submission triggers role-specific question generation and candidate email delivery with no manual steps, collapsing a 5-stage hiring process to under 2 minutes end-to-end.',
      'Designed 6 PostgreSQL schema migrations from scratch, normalizing candidates, assessments, AI scores, proctoring flags, and job requisitions into a structured schema powering real-time recruiter dashboard queries.',
      'Integrated 4 AI services — DeepFace for identity verification, Groq LLM for MCQ scoring, Groq Whisper for video transcription, and MediaPipe for behavioral proctoring — into a 6-container Docker pipeline with no manual routing between stages.',
      'Deployed RESTful APIs in FastAPI and Node.js connecting the React HR dashboard to backend AI scoring services; standardized data contracts across 4 microservices, cutting cross-service integration overhead by 20%.',
      'Instrumented an end-to-end screening funnel with usage analytics, surfacing recurring failure patterns that cut incoming bug report volume 15% and shifted sprint priorities toward the highest-impact fixes.',
    ],
    current: true,
    category: 'technical',
  },
  {
    id: 'exp-2',
    duration: '2025-01 — 2025-10',
    label: '// The University of Texas at Dallas',
    office: 'Richardson, TX',
    role: 'Student Services & Operations Manager',
    points: [
      'Coordinated student services and operations workflows across student-facing processes.',
      'Improved communication and execution across teams through structured process tracking.',
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
      'Led planning and execution for club activities with cross-functional student collaboration.',
      'Supported event coordination, team alignment, and community engagement initiatives.',
    ],
    current: false,
    category: 'leadership',
  },
  {
    id: 'exp-4',
    duration: '2023-02 — 2024-07',
    company: 'HCLTech — Client: Dollar General',
    label: '// HCLTech (client: Dollar General)',
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
  { id: 'metric-2', label: 'Reporting Latency', value: '-28%', text: 'Spark and Airflow partition pruning + query caching' },
  { id: 'metric-3', label: 'Retail Records', value: '2M+', text: 'Python and SQL anomaly detection for transaction quality' },
  { id: 'metric-4', label: 'Incident Response', value: '-25%', text: 'Downtime forecasting on AWS system performance logs' },
];

export const certifications = [
  {
    id: 'cert-4',
    icon: 'ac_unit',
    iconClass: 'text-sky-400',
    title: 'Snowflake',
    subtitle: 'SnowPro Associate: Platform Certified',
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
