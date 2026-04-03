# Cloudflare Worker Rules (Chatbot API)

## Purpose

A minimal proxy that sits between the React frontend and the Groq API. Its ONLY job:

1. Receive chat messages from the frontend.
2. Prepend the system prompt (portfolio knowledge).
3. Forward to Groq's OpenAI-compatible API.
4. Stream the response back to the frontend.

## Setup

### Prerequisites

- Node.js 18+
- Cloudflare account (free tier)
- `npm install -g wrangler` (Cloudflare CLI)
- Groq API key from `console.groq.com` (free, no credit card)

### Project Init

```bash
cd worker/
npm init -y
npm install wrangler --save-dev
```

### `wrangler.toml`

```toml
name = "portfolio-chatbot-api"
main = "src/index.js"
compatibility_date = "2024-12-01"

[vars]
ALLOWED_ORIGIN = "https://prasannawarad.github.io"

# Secrets (set via `wrangler secret put GROQ_API_KEY`):
# GROQ_API_KEY — never in this file
```

### `.dev.vars` (local dev only, gitignored)

```
GROQ_API_KEY=gsk_your_key_here
ALLOWED_ORIGIN=http://localhost:5173
```

## Worker Implementation Rules

### Request Handling

- Accept only `POST` to `/api/chat`.
- Accept only `OPTIONS` (for CORS preflight) and `POST`.
- Return 405 for all other methods.
- Return 404 for all other paths.

### CORS

- `Access-Control-Allow-Origin`: set to `env.ALLOWED_ORIGIN` (never `*` in production).
- Allow headers: `Content-Type`.
- Allow methods: `POST, OPTIONS`.

### Input Validation

- Parse JSON body. If invalid, return 400.
- `messages` must be an array with at least 1 message.
- Each message must have `role` (string) and `content` (string).
- `content` max length: 500 characters per message.
- Max 20 messages in the array (conversation history).
- Strip any `system` role messages from user input (we inject our own).

### Groq API Call

- Endpoint: `https://api.groq.com/openai/v1/chat/completions`
- Model: `llama-3.3-70b-versatile`
- Headers: `Authorization: Bearer ${env.GROQ_API_KEY}`, `Content-Type: application/json`
- Body:
  ```json
  {
    "model": "llama-3.3-70b-versatile",
    "messages": [systemPrompt, ...userMessages],
    "max_tokens": 300,
    "temperature": 0.7,
    "stream": true
  }
  ```

### Streaming

- For v1: enable `stream: true` in the Groq request.
- Pipe the SSE stream directly back to the client.
- Set response header `Content-Type: text/event-stream`.
- If streaming is too complex for the first pass, fall back to non-streaming and return the full response as JSON.

### System Prompt

The system prompt is built from the portfolio data. It should be a single string constant in the Worker, structured like:

```
You are a helpful assistant on Prasanna Warad's portfolio website.
You ONLY answer questions about Prasanna, their work, skills, projects, and experience.
If asked about anything else, politely say you can only discuss Prasanna's portfolio and suggest they visit the Contact section.
If you're unsure about something, say so honestly and point them to GitHub or LinkedIn.
Keep answers concise — 2-4 sentences for simple questions, slightly longer for detailed ones.
Be friendly and professional.

Here is everything you know about Prasanna:

---
[PASTE AGGREGATED DATA FROM src/data/experience.js, projects.js, stack.js]
---
```

### Error Handling

- If Groq returns an error, return a generic 502 with `{ "error": "AI service temporarily unavailable" }`.
- Never expose the Groq API key or raw error details to the client.
- Log errors to console (Cloudflare Workers dashboard shows these).

### Rate Limiting (v1 — simple)

- Use Cloudflare's built-in `request.headers.get('CF-Connecting-IP')`.
- In-memory Map: track request count per IP per minute.
- Limit: 10 requests per minute per IP.
- Return 429 if exceeded.
- Note: in-memory state resets when the Worker cold-starts. This is fine for v1.

## Deployment

```bash
# Set the API key as a secret
wrangler secret put GROQ_API_KEY

# Deploy
wrangler deploy

# Local dev
wrangler dev
```

## Testing

- Use `curl` or Postman to test the endpoint.
- Test CORS with a browser request from a different origin.
- Test rate limiting by sending 11+ rapid requests.
- Test with empty messages, oversized messages, and invalid JSON.
