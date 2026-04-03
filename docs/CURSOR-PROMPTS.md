# Cursor Prompts — Copy & Paste These In Order

Use these prompts in Cursor's AI chat (Cmd+L / Ctrl+L) to build each piece.
Run them **in order**. Each builds on the previous step.

---

## Prompt 1: Knowledge Layer

```
Read the files in src/data/ (experience.js, projects.js, stack.js) and create a new file src/data/chatbot-knowledge.js.

This file should:
1. Import all data from the three existing data files
2. Export a function called buildSystemPrompt() that returns a single formatted string containing ALL the portfolio data in a readable format
3. The string should be structured with clear sections: Bio, Education, Experience, Projects, Tech Stack, Certifications, Contact/Links
4. Also export the raw data as a plain object called profileData

Follow the project rules in .cursor/rules/project-rules.md
```

---

## Prompt 2: Cloudflare Worker Setup

```
Create the worker/ directory for a Cloudflare Worker with this structure:
- worker/package.json (with wrangler as dev dependency)
- worker/wrangler.toml (configured per .cursor/rules/worker-rules.md)
- worker/.dev.vars.example (template, NOT the real secrets)
- worker/.gitignore (ignores .dev.vars and node_modules)

Do NOT create the main index.js yet — just the scaffolding.
Follow .cursor/rules/worker-rules.md for all config values.
```

---

## Prompt 3: Worker Implementation

```
Create worker/src/index.js — the Cloudflare Worker that proxies chat requests to Groq.

Requirements from .cursor/rules/worker-rules.md:
- Handle POST /api/chat only, return 404/405 for everything else
- CORS handling with env.ALLOWED_ORIGIN
- Input validation: messages array, max 500 chars per message, max 20 messages, strip system role
- Prepend a system prompt that includes the portfolio data (copy the output format from src/data/chatbot-knowledge.js but hardcode it as a string constant in the Worker)
- Call Groq API at https://api.groq.com/openai/v1/chat/completions with model llama-3.3-70b-versatile
- Stream the SSE response back to the client
- Basic in-memory rate limiting: 10 requests/min per IP
- Return generic error messages, never expose API key or raw errors

Read the existing src/data/ files to populate the system prompt with real portfolio content.
Keep the Worker under 150 lines total.
```

---

## Prompt 4: Chat API Utility

```
Create src/utils/chatApi.js

This utility should:
1. Export an async generator function called streamChat(messages) that:
   - POSTs to VITE_CHAT_API_URL + '/api/chat'
   - Sends { messages } in the body
   - Reads the SSE stream from the response
   - Yields each text chunk as it arrives
   - Handles errors gracefully (network failures, non-200 responses)

2. Export a simpler non-streaming fallback function sendChat(messages) that:
   - Same POST request but without streaming
   - Returns the full response text
   - Used as fallback if streaming fails

Follow .cursor/rules/project-rules.md
```

---

## Prompt 5: useChat Hook

```
Create src/hooks/useChat.js

A custom React hook that manages chat state:
- messages: array of { id, role, content, timestamp }
- isLoading: boolean
- error: string | null
- sendMessage(text): adds user message, calls streamChat, streams assistant response into a new message
- clearChat(): resets to empty
- Use streamChat from src/utils/chatApi.js for streaming responses
- Generate unique IDs with crypto.randomUUID() or Date.now()
- Auto-clear error after 5 seconds
- Maintain max 50 messages in history (trim oldest)

Follow .cursor/rules/project-rules.md
```

---

## Prompt 6: Chat Components

```
Create all chat UI components in src/components/chat/ following .cursor/rules/chat-ui-rules.md exactly:

1. ChatWidget.jsx — floating button + mounts ChatPanel. Manages open/close state.
2. ChatPanel.jsx — the slide-over panel with header, message list, quick actions, and input. Uses useChat hook.
3. ChatMessage.jsx — single message bubble. Different styles for user vs assistant. Loading dots for streaming.
4. ChatInput.jsx — text input + send button. 500 char max. Enter to send. Disabled while loading.
5. QuickActions.jsx — 4 preset question buttons shown in empty chat. Disappears after first message.

Design must match the portfolio's terminal-inspired dark theme. Use Tailwind only.
All animations must be CSS-only (no framer-motion or similar).
Make everything responsive per the rules.
```

---

## Prompt 7: Mount Widget in Layout

```
Update src/components/Layout.jsx to:
1. Import ChatWidget using React.lazy()
2. Wrap it in Suspense with null fallback
3. Render it inside the Layout so it appears on all routes
4. The widget should be outside the main content flow (fixed positioning handles this)

Also add to .env.example:
VITE_CHAT_API_URL=http://localhost:8787

Follow .cursor/rules/project-rules.md
```

---

## Prompt 8: Final Polish

```
Review all chat components and fix:
1. Ensure the chat panel has proper z-index to appear above all content (z-50)
2. Add aria-labels and roles per .cursor/rules/chat-ui-rules.md accessibility section
3. Add a subtle entry animation pulse on the chat button that plays once on page load then stops
4. Ensure mobile viewport: panel should be full-width and nearly full-height
5. Add an error state in ChatPanel that shows a friendly message if the API is unreachable
6. Escape key should close the panel
7. Clicking outside the panel should close it

Check all files for console.logs and remove them.
```

---

## Troubleshooting Prompts (use as needed)

### If streaming doesn't work:

```
The SSE streaming from the Worker to the React app isn't working. Update chatApi.js to properly parse the SSE stream using a ReadableStream reader. Each chunk from Groq's SSE looks like:
data: {"choices":[{"delta":{"content":"token"}}]}

Parse each line, extract the content delta, and yield it. Handle the [DONE] signal.
```

### If CORS fails:

```
I'm getting CORS errors when the React app calls the Worker. Update worker/src/index.js to:
1. Handle OPTIONS preflight requests properly
2. Return Access-Control-Allow-Origin set to the exact origin (not wildcard)
3. Return Access-Control-Allow-Headers: Content-Type
4. Return Access-Control-Allow-Methods: POST, OPTIONS
Make sure CORS headers are on EVERY response including errors.
```

### If the model doesn't stay on topic:

```
The chatbot is answering questions outside of the portfolio scope. Strengthen the system prompt in worker/src/index.js:
- Add explicit instructions: "You are ONLY allowed to discuss Prasanna Warad's portfolio. For ANY other topic, respond with: 'I can only answer questions about Prasanna's work and experience. Feel free to ask about projects, skills, or experience!'"
- Add few-shot examples of off-topic handling
- Set temperature to 0.5 (lower = more focused)
```
