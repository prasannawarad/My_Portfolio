import { bio } from '../data/experience';

export const SITE_URL = 'https://prasannawarad.com';

/** Absolute URL for Open Graph / Twitter preview (must stay https + absolute for crawlers). */
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;

export const defaultOgDescription = bio.elevatorPitch;

export const resumeOgDescription =
  'PDF resume — Data and AI Engineering, ETL/ELT pipelines, LLM-orchestrated workflows, ML systems, Python, SQL, Spark, Airflow, FastAPI, Docker, and AWS.';
