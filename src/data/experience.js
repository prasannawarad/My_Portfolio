export const bio = {
  name: 'Prasanna Kailash Warad',
  /** Hero headline (two lines visually; reads as one sentence) */
  heroLine1: 'Turning Data Into',
  heroLine2: 'Product Decisions',
  /** Plain-language line for recruiters / execs (non-terminal) */
  elevatorPitch:
    'I build pipelines, analytics, and production-facing data systems so teams can trust the numbers—from millions of transactions to leadership-ready dashboards.',
  role: 'Software Engineer · Data Engineer · Data Analyst',
  location: 'Dallas, TX',
  yearsActive: 3,
  primaryFocus: 'Data systems, analytics & backend APIs',
  status: 'Open to full-time SWE, data engineering & analytics roles',
  summary:
    'Hands-on with Python, SQL, Spark, Airflow, Tableau, and cloud data platforms. Background in retail-scale analytics and ML; MS ITM at UT Dallas (Dean’s Excellence Scholar).',
  interests: ['Data Pipelines', 'Real-time Analytics', 'ML Systems', 'Cloud Data Platforms'],
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
    office: 'Reston, VA (Remote)',
    role: 'Software Engineer Intern',
    points: [
      'Developed RESTful APIs in Node.js/Python to streamline data exchange; cut integration effort by 20%.',
      'Restructured Python ETL pipelines with indexing, query refactors, and batch processing to boost throughput by 25%.',
      'Analyzed application usage metrics to surface behavioral trends, reducing recurring bug reports by 15%.',
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
      'Analyzed 2M+ retail transactions with Python and SQL to detect anomalies, improving reporting accuracy and model reliability.',
      'Boosted Oracle throughput by 30% with indexing and PL/SQL tuning for 10,000+ daily transactions.',
      'Built Spark + Airflow pipelines for reporting; reduced query latency by 28% through caching and partition pruning.',
      'Designed Tableau dashboards for leadership, reducing manual reporting effort by 40%.',
      'Developed scikit-learn/PyTorch model on AWS logs to forecast downtimes, cutting incident response time by 25%.',
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
    gpa: 'N/A',
  },
  {
    id: 'edu-2',
    degree: 'Bachelor of Engineering, Electrical',
    institution: 'Savitribai Phule Pune University',
    duration: 'Aug 2018 - May 2022',
    gpa: 'N/A',
  },
];

export const impactMetrics = [
  { id: 'metric-1', label: 'DB Throughput', value: '+30%', text: 'Oracle indexing and PL/SQL tuning' },
  { id: 'metric-2', label: 'Manual Reporting', value: '-40%', text: 'Tableau dashboard automation' },
  { id: 'metric-3', label: 'Query Latency', value: '-28%', text: 'Caching and partition pruning' },
  { id: 'metric-4', label: 'Incident Response', value: '-25%', text: 'Predictive downtime model (AWS logs)' },
];

export const certifications = [
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
  {
    id: 'cert-4',
    icon: 'ac_unit',
    iconClass: 'text-sky-400',
    title: 'Snowflake',
    subtitle: 'SnowPro Associate: Platform Certified',
  },
];
