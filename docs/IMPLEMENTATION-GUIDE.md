# Implementation Guide — Portfolio Chatbot

This is the step-by-step build order. Follow this sequence exactly.

---

## Prerequisites

Before writing any code, set up these accounts and tools:

### 1. Groq API Key (free)

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (no credit card needed)
3. Go to **API Keys** → **Create API Key**
4. Copy and save the key (starts with `gsk_`)
5. You'll use this in the Cloudflare Worker later

### 2. Cloudflare Account (free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) and sign up
2. Install Wrangler CLI: `npm install -g wrangler`
3. Run `wrangler login` to authenticate

### 3. Cursor Setup

1. Open your portfolio project in Cursor
2. Copy the `.cursor/rules/` folder (with all 3 rule files) into your project root
3. Copy the `docs/` folder into your project root
4. Cursor will now use these rules to guide every code generation

---

## Phase 1: Knowledge Layer (30 min)

**Goal**: Create the aggregated knowledge file that powers the chatbot.

### Task for Cursor

> "Create `src/data/chatbot-knowledge.js` that imports from `experience.js`, `projects.js`, and `stack.js`, and exports a single `getSystemPrompt()` function that returns a formatted string with ALL portfolio data. Follow the rules in `.cursor/rules/project-rules.md`."

### What it should produce

- A function that concatenates all bio, experience, project, and stack data into a readable string
- This string becomes the system prompt content
- Also export a plain text version for the Worker to use

### Manual step after

Copy the output of `getSystemPrompt()` into the Worker's system prompt constant. (Or create a build script that generates it — but for v1, copy-paste is fine.)

---

## Phase 2: Cloudflare Worker (1-2 hours)

**Goal**: Build and deploy the API proxy.

### Step 2a: Scaffold the Worker

> "Create the `worker/` directory with `package.json`, `wrangler.toml`, `src/index.js`, and `.dev.vars`. Follow the rules in `.cursor/rules/worker-rules.md` exactly."

### Step 2b: Implement the Worker

> "Implement the Cloudflare Worker in `worker/src/index.js`. It should handle POST /api/chat, validate input, prepend the system prompt, call Groq's API with streaming, and pipe the SSE response back. Include CORS handling and basic rate limiting. Follow `.cursor/rules/worker-rules.md`."

### Step 2c: Test locally

```bash
cd worker
wrangler dev
```

Test with curl:

```bash
curl -X POST http://localhost:8787/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Who is Prasanna?"}]}'
```

### Step 2d: Deploy

```bash
wrangler secret put GROQ_API_KEY
# paste your gsk_ key when prompted

wrangler deploy
```

Note the deployed URL (e.g., `https://portfolio-chatbot-api.<your-subdomain>.workers.dev`).

---

## Phase 3: Chat UI Components (2-3 hours)

**Goal**: Build the frontend chat widget.

### Step 3a: API utility and hook

> "Create `src/utils/chatApi.js` and `src/hooks/useChat.js`. The API utility should call the Worker endpoint (from `VITE_CHAT_API_URL` env var) and handle streaming SSE responses. The hook should manage messages state, loading state, and expose a `sendMessage` function. Follow `.cursor/rules/project-rules.md`."

### Step 3b: Chat components

> "Create all chat components in `src/components/chat/`: `ChatWidget.jsx`, `ChatPanel.jsx`, `ChatMessage.jsx`, `ChatInput.jsx`, `QuickActions.jsx`. Follow `.cursor/rules/chat-ui-rules.md` for all design specs, animations, and responsive behavior."

### Step 3c: Mount in Layout

> "Update `src/components/Layout.jsx` to lazy-load and mount `ChatWidget` using `React.lazy` and `Suspense`. The widget should appear on all routes."

### Step 3d: Environment variable

Create `.env` in project root:

```
VITE_CHAT_API_URL=https://portfolio-chatbot-api.<your-subdomain>.workers.dev
```

Add to `.gitignore`:

```
.env
.env.local
```

---

## Phase 4: Test & Polish (1-2 hours)

### Local testing

```bash
npm run dev
```

1. Click the chat button — panel should slide in
2. Quick actions should appear in empty chat
3. Ask "Who is Prasanna?" — should get a grounded response
4. Ask "What's the weather?" — should get a polite redirect
5. Test on mobile viewport — should go full-screen

### Polish checklist

- [ ] Chat button has initial pulse animation
- [ ] Panel close button works
- [ ] Messages auto-scroll to bottom
- [ ] Loading dots show while waiting
- [ ] Streaming text appears word-by-word (or sentence-by-sentence)
- [ ] Quick actions disappear after first message
- [ ] Error state shows if Worker is unreachable
- [ ] Mobile responsive (full-width panel)
- [ ] No layout shift on chat open/close
- [ ] Escape key closes panel

---

## Phase 5: Deploy Frontend (15 min)

1. Update `.env.production` with the deployed Worker URL
2. Run `npm run deploy` (builds and pushes to GitHub Pages)
3. Test on live URL

---

## Phase 6: Future Improvements (Optional)

These are NOT needed for launch but are nice to have later:

- [ ] Markdown rendering in bot responses (use `react-markdown`)
- [ ] "Sources" links that scroll to portfolio sections
- [ ] Conversation persistence in `sessionStorage`
- [ ] Analytics: count total chats per day (Cloudflare Worker analytics, no user data)
- [ ] Fallback to Google Gemini if Groq is down
- [ ] Typing speed animation (reveal text character by character)
