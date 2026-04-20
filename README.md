# Prasanna's Portfolio

A single-page portfolio with a dedicated Resume route, built with **React** and **Vite**. The home experience is one scrollable page with section anchors (About, Projects, Contact, and more), plus a fully personalized **AI chat widget** (Prasanna AI) backed by a **Cloudflare Worker** and powered by **Groq**.

## Features

- **Single-page layout** — Hero, experience, projects, skills stack, and contact on one home view with hash navigation
- **Resume page** — Lazy-loaded route with in-browser PDF viewing (`react-pdf`)
- **Prasanna AI** — Floating chat assistant that knows Prasanna's career, projects, AND personal life (sports, shows, books, anime, and more). Backed by a Cloudflare Worker + Groq LLM.
- **Responsive design** — Mobile-first layout with Tailwind CSS; chat panel goes fullscreen on mobile
- **SEO** — `react-helmet-async` for meta tags
- **Hosting** — GitHub Pages–ready; Netlify config included

## Tech Stack

### Frontend

| Technology | Role |
|------------|------|
| **React 18** | UI, hooks, client-side app |
| **React Router v6** | `/` and `/resume`, layout wrapper |
| **Vite 5** | Dev server, production build, `@` → `src` alias |
| **react-helmet-async** | Document head / SEO |
| **react-pdf** | Resume PDF rendering |

### Styling

| Technology | Role |
|------------|------|
| **Tailwind CSS 3** | Utility-first styles, theme in `tailwind.config.js` |
| **PostCSS** + **Autoprefixer** | CSS pipeline |
| **Custom CSS** | Global styles and chat animations in `src/index.css` |

### App Data & Content

Content lives in `src/data/` (e.g. `experience.js`, `projects.js`, `stack.js`, `contactChannels.js`, `chatbot-knowledge.js`). Skill categories shown on the site are defined in **`stack.js`** — edit that file to update the "tech stack" sections on the page.

### Chat API

| Technology | Role |
|------------|------|
| **Cloudflare Workers** | Edge API for the chatbot (`worker/`) — holds system prompt and knowledge base; keeps API keys off the client |
| **Groq** | LLM inference — fast, low-latency responses |
| **Wrangler** | Local dev and deploy for the worker |

#### How Prasanna AI works

1. User sends a message via the floating chat widget (bottom-right corner of the page)
2. Frontend posts to the Cloudflare Worker at `/api/chat`
3. Worker injects a rich system prompt with Prasanna's full knowledge base and calls Groq
4. Response returns to the chat panel

The bot covers everything — not just work:

- **Career & skills** — data engineering, pipelines, analytics, Python, SQL, Spark, Airflow, Tableau
- **Projects** — all featured side and work projects
- **Sports** — Cricket, Pickleball, Table Tennis, Soccer (watches games every week)
- **Books** — Fiction and Philosophy are favorites
- **Shows** — Suits, Billions, Modern Family
- **Entertainment** — Big Marvel movie fan, big Anime watcher
- **Side projects** — loves building random ideas that help in everyday work

> **After any system prompt change:** redeploy the Cloudflare Worker (`wrangler deploy`) so Groq picks up the new instructions.

### Tooling & Quality

| Technology | Role |
|------------|------|
| **ESLint 9** | Linting (`eslint.config.js`) |
| **PropTypes** | Runtime checks where used |
| **gh-pages** | Manual deploy to `gh-pages` branch |

### Deployment Targets

| Platform | Notes |
|----------|-------|
| **GitHub Pages** | `homepage` in `package.json`; SPA fallbacks in `public/404.html` |
| **GitHub Actions** | `.github/workflows/deploy-pages.yml` — build and publish on push to `main` / `master` |
| **Netlify** | `netlify.toml` + `public/_redirects` for SPA routing |
| **Cloudflare Workers** | Chat API backend |

## Installation

```bash
git clone https://github.com/prasannawarad/PortFolio.git
cd PortFolio
npm install
npm run dev
```

### Cloudflare Worker (chat backend)

```bash
cd worker
npm install

# Add your Groq API key as a secret (not in code)
wrangler secret put GROQ_API_KEY

# Run locally
wrangler dev

# Deploy
wrangler deploy
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Build and push `dist/` to `gh-pages` |

## Deployment

### GitHub Pages

- **GitHub Actions** (recommended): push to `main` or `master`; workflow builds and deploys automatically.
- **Manual**: `npm run deploy` after configuring the `gh-pages` branch and repo settings.

**SPA note:** Hash or history routing is supported via `public/404.html` and your host's SPA rules.

### Netlify

1. Connect the repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. `netlify.toml` and `public/_redirects` handle SPA redirects

## Project Structure

```
PortFolio/
├── .github/workflows/      # GitHub Pages deploy workflow
├── public/
│   ├── _redirects          # Netlify SPA routing
│   ├── 404.html            # GitHub Pages SPA fallback
│   ├── CNAME               # Custom domain (if used)
│   └── resume.pdf
├── worker/                 # Cloudflare Worker (chat API)
│   └── src/
│       └── index.js        # System prompt, knowledge base, Groq call
├── src/
│   ├── components/         # Layout, Navbar, Footer, chat UI, etc.
│   │   └── chat/
│   │       ├── ChatWidget.jsx    # Floating launcher + teaser bubble
│   │       ├── ChatPanel.jsx     # Open chat panel (pops up from FAB)
│   │       ├── ChatInput.jsx     # Input field + send button
│   │       └── QuickActions.jsx  # Suggested prompt chips
│   ├── pages/              # Home.jsx, Resume.jsx
│   ├── data/               # Content: projects, stack, experience, chatbot-knowledge, …
│   ├── hooks/              # e.g. useChat
│   ├── utils/              # Chat API client, scroll helpers
│   ├── config/             # Site config
│   ├── App.jsx             # Mounts ChatWidget outside layout
│   ├── main.jsx
│   └── index.css           # Tailwind + global styles + chat animations
├── netlify.toml
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Live Site

- **GitHub Pages:** https://prasannawarad.github.io/PortFolio/
- **Custom domain:** https://prasannawarad.com

## Customization

- **Copy & sections:** `src/data/` and page components under `src/pages/`
- **Skills columns:** `src/data/stack.js`
- **AI knowledge base:** `src/data/chatbot-knowledge.js` (frontend) and `worker/src/index.js` (authoritative — what the bot actually uses)
- **Resume file:** replace `public/resume.pdf`
- **Theme:** `tailwind.config.js` and `src/index.css`
- **Base URL / repo name:** `package.json` `homepage` and Vite `base` if you use a subpath

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and run `npm run lint` / `npm run build`
4. Open a pull request

## License

This project is open source. Add a `LICENSE` file at the repo root if you want a standard license (e.g. MIT) linked from here.

---

Built with care by Prasanna Warad