# Project Rules — Portfolio AI Chatbot

## Tech Stack

- **Frontend**: React 18, Vite 5, React Router v6, Tailwind CSS 3
- **Chatbot Backend**: Cloudflare Worker (proxies to Groq API)
- **LLM Provider**: Groq (free tier) — Llama 3.3 70B Versatile
- **Deployment**: GitHub Pages (frontend), Cloudflare Workers (API)

## Architecture Constraints

1. **No API keys in the browser.** The Groq API key lives ONLY in the Cloudflare Worker as an environment variable. The React app calls the Worker endpoint.
2. **No server-side rendering.** This is a static SPA deployed to GitHub Pages.
3. **No RAG or vector stores.** All portfolio data fits in the system prompt (~3000 tokens). Concatenate `src/data/*` into the system prompt directly.
4. **OpenAI-compatible SDK.** Groq uses the OpenAI chat completions format. Use `openai` npm package pointed at `https://api.groq.com/openai/v1`.

## File Structure Conventions

```
src/
├── components/
│   ├── chat/
│   │   ├── ChatWidget.jsx        # Main floating widget wrapper
│   │   ├── ChatPanel.jsx         # Slide-over chat panel
│   │   ├── ChatMessage.jsx       # Single message bubble
│   │   ├── ChatInput.jsx         # Input field + send button
│   │   └── QuickActions.jsx      # Preset question buttons
│   ├── Layout.jsx                # Mounts ChatWidget here
│   ├── Navbar.jsx
│   └── ...existing components
├── data/
│   ├── experience.js             # EXISTING — bio, education, certs
│   ├── projects.js               # EXISTING — project list
│   ├── stack.js                  # EXISTING — tech stack
│   └── chatbot-knowledge.js      # NEW — aggregated profile for system prompt
├── hooks/
│   └── useChat.js                # Chat state management hook
├── utils/
│   └── chatApi.js                # Fetch wrapper for the Worker endpoint
└── ...

worker/
├── src/
│   └── index.js                  # Cloudflare Worker entry
├── wrangler.toml                 # Worker config
├── package.json
└── .dev.vars                     # Local dev secrets (gitignored)
```

## Coding Standards

- Use functional components with hooks only. No class components.
- Use Tailwind utility classes. No inline styles, no CSS modules.
- Lazy-load the chat widget — it should NOT be in the initial bundle.
- All chat components go in `src/components/chat/`.
- Environment variables for the frontend use `VITE_` prefix.
- The only public env var is `VITE_CHAT_API_URL` (the Worker URL).
- Keep the Worker under 100 lines. It does ONE thing: proxy to Groq with a system prompt.

## Chatbot Behavior Rules

- The chatbot answers ONLY about Prasanna Warad and their portfolio.
- If asked about anything unrelated, it politely redirects.
- If unsure, it says so and suggests visiting Contact or GitHub.
- Responses should be concise (2-4 sentences max for simple questions).
- The system prompt includes ALL portfolio data — no retrieval needed.

## Security Rules

- Never commit API keys or `.dev.vars` files.
- The Worker must validate: request origin (CORS), message length (max 500 chars), rate limiting.
- No user data is logged or stored.

## Git Rules

- `.env` and `.dev.vars` files are gitignored.
- The `worker/` directory is a separate deployable unit.
- Commit messages follow conventional commits: `feat:`, `fix:`, `chore:`.
