# Pre-Flight Checklist

## Accounts Needed (all free, no credit card)

- [ ] **Groq** — [console.groq.com](https://console.groq.com) → get API key (starts with `gsk_`)
- [ ] **Cloudflare** — [dash.cloudflare.com](https://dash.cloudflare.com) → sign up + install `wrangler` CLI

## Tools

- [ ] Node.js 18+ installed
- [ ] `npm install -g wrangler` done
- [ ] `wrangler login` done (authenticates with Cloudflare)
- [ ] Cursor IDE with project open

## Files to Add to Your Project

Copy these into your project root:

```
your-portfolio/
├── .cursor/
│   └── rules/
│       ├── project-rules.md      ← overall project rules
│       ├── chat-ui-rules.md      ← chat component specs
│       └── worker-rules.md       ← backend API rules
├── docs/
│   ├── ARCHITECTURE.md           ← system design reference
│   ├── IMPLEMENTATION-GUIDE.md   ← step-by-step build order
│   └── CURSOR-PROMPTS.md         ← exact prompts for Cursor
└── ... your existing code
```

## Build Order

1. [ ] Copy `.cursor/rules/` and `docs/` into project
2. [ ] Create `src/data/chatbot-knowledge.js` (Prompt 1)
3. [ ] Scaffold `worker/` directory (Prompt 2)
4. [ ] Implement Worker (Prompt 3)
5. [ ] Test Worker locally: `cd worker && wrangler dev`
6. [ ] Deploy Worker: `wrangler secret put GROQ_API_KEY && wrangler deploy`
7. [ ] Note the Worker URL
8. [ ] Create `src/utils/chatApi.js` (Prompt 4)
9. [ ] Create `src/hooks/useChat.js` (Prompt 5)
10. [ ] Create chat components (Prompt 6)
11. [ ] Mount in Layout (Prompt 7)
12. [ ] Add `.env` with `VITE_CHAT_API_URL=<your-worker-url>`
13. [ ] Test locally: `npm run dev`
14. [ ] Polish (Prompt 8)
15. [ ] Deploy: `npm run deploy`
16. [ ] Test on live site

## Quick Commands

```bash
# Local dev (frontend)
npm run dev

# Local dev (worker)
cd worker && wrangler dev

# Deploy worker
cd worker && wrangler deploy

# Deploy frontend
npm run deploy

# Set worker secret
cd worker && wrangler secret put GROQ_API_KEY
```
