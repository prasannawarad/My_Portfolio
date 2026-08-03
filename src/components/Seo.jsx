import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import {
  OG_IMAGE_URL,
  SITE_URL,
  defaultOgDescription,
  resumeOgDescription,
} from '../config/site';

const HOME_TITLE = 'Prasanna Warad — Portfolio';
const RESUME_TITLE = 'Resume — Prasanna Warad';
const PROJECTS_TITLE = 'Projects — Prasanna Warad';
const ABOUT_TITLE = 'About — Prasanna Warad';
const CONTACT_TITLE = 'Contact — Prasanna Warad';

const routeMetadata = {
  '/projects': {
    title: PROJECTS_TITLE,
    description: 'Selected data engineering, AI, and software projects by Prasanna Warad, including production RAG systems, analytics, and private case studies.',
  },
  '/about': {
    title: ABOUT_TITLE,
    description: 'About Prasanna Warad, a data and AI engineer focused on reliable data systems, LLM applications, and analytics.',
  },
  '/contact': {
    title: CONTACT_TITLE,
    description: 'Contact Prasanna Warad for data engineering, AI engineering, and software opportunities.',
  },
};

function buildAbsoluteUrl(pathname) {
  if (pathname === '/' || pathname === '') return SITE_URL;
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${path}`;
}

/**
 * Client-side head updates per route. Default tags also live in index.html so crawlers
 * that do not run JavaScript still see home Open Graph data.
 */
function Seo() {
  const { pathname } = useLocation();
  const isResume = pathname === '/resume';

  const metadata = routeMetadata[pathname];
  const title = isResume ? RESUME_TITLE : metadata?.title ?? HOME_TITLE;
  const description = isResume ? resumeOgDescription : metadata?.description ?? defaultOgDescription;
  const url = buildAbsoluteUrl(pathname);

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Prasanna Warad" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />
    </Helmet>
  );
}

export default Seo;
