# Architecture — Portfolio Chatbot (Revised)

## System Overview

```
┌─────────────────────────────────────────────────┐
│                   BROWSER                        │
│                                                  │
│  ┌──────────────────────────────────────────┐    │
│  │          React SPA (Vite)                │    │
│  │                                          │    │
│  │  ┌─────────┐  ┌──────────────────────┐   │    │
│  │  │ Existing │  │   ChatWidget (lazy)  │   │    │
│  │  │ Portfolio│  │                      │   │    │
│  │  │ Sections │  │  ChatPanel           │   │    │
│  │  │          │  │  ├── QuickActions    │   │    │
│  │  │  Home    │  │  ├── ChatMessage[]   │   │    │
│  │  │  About   │  │  └── ChatInput       │   │    │
│  │  │  Projects│  │                      │   │    │
│  │  │  Contact │  │  useChat hook        │   │    │
│  │  │  Resume  │  │  └── chatApi.js      │   │    │
│  │  └─────────┘  └──────────┬───────────┘   │    │
│  └──────────────────────────┼───────────────┘    │
│                             │ POST /api/chat      │
│                             │ (HTTPS)             │
└─────────────────────────────┼───────────────────-─┘
                              │
                              ▼
┌─────────────────────────────────────────────────┐
│           CLOUDFLARE WORKER (Edge)               │
│                                                  │
│  1. Validate input (length, format)              │
│  2. Check rate limit (IP-based)                  │
│  3. Prepend system prompt (portfolio data)       │
│  4. Forward to Groq API                          │
│  5. Stream SSE response back to browser          │
│                                                  │
│  Secrets: GROQ_API_KEY (env var)                 │
│  Config:  ALLOWED_ORIGIN (CORS)                  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              GROQ API (Free Tier)                │
│                                                  │
│  Model: llama-3.3-70b-versatile                  │
│  Endpoint: api.groq.com/openai/v1               │
│  Format: OpenAI-compatible                       │
│  Speed: ~500-1000 tokens/sec on LPU             │
│  Limits: ~30 RPM, ~14,400 RPD (free)            │
└─────────────────────────────────────────────────┘
```

## Data Flow

```
User types question
       │
       ▼
ChatInput → useChat.sendMessage(text)
       │
       ▼
chatApi.js → POST to Cloudflare Worker
       │      Body: { messages: [...history, {role:"user", content: text}] }
       │
       ▼
Worker validates → prepends system prompt → calls Groq
       │
       ▼
Groq returns SSE stream
       │
       ▼
Worker pipes stream → chatApi reads chunks → useChat updates state
       │
       ▼
ChatMessage renders incrementally (streaming text)
```

## Cost Analysis

| Service | Free Tier | Your Usage | Monthly Cost |
|---------|-----------|------------|-------------|
| GitHub Pages | Unlimited static hosting | Portfolio SPA | $0 |
| Cloudflare Worker | 100,000 requests/day | ~50-200/day estimate | $0 |
| Groq API | ~14,400 requests/day, 30 RPM | ~50-200/day estimate | $0 |
| **Total** | | | **$0** |

## Security Model

```
BROWSER                    WORKER                     GROQ
  │                          │                          │
  │ ── POST /api/chat ──►    │                          │
  │    (user messages only)  │                          │
  │                          │ ── Validate ──►          │
  │                          │    • CORS origin check   │
  │                          │    • Message length ≤500 │
  │                          │    • Array length ≤20    │
  │                          │    • Rate limit 10/min   │
  │                          │    • Strip system msgs   │
  │                          │                          │
  │                          │ ── API call ──────────►  │
  │                          │    + System prompt       │
  │                          │    + GROQ_API_KEY header │
  │                          │                          │
  │    ◄── SSE stream ────   │   ◄── SSE stream ────   │
  │    (response only)       │                          │
  │                          │                          │
  ✗ No API key in browser    │                          │
  ✗ No direct Groq access    │                          │
  ✗ No user data logged      │                          │
```

## Model Choice Rationale

**Llama 3.3 70B Versatile** on Groq because:

- Free forever (no credit card, no trial expiration)
- OpenAI-compatible API (easy to swap providers later)
- 70B parameter model = strong enough for conversational Q&A
- Groq's LPU hardware = sub-second response times
- If the model gets deprecated, switch to the latest Llama in one line

**Fallback plan**: If Groq changes their free tier, swap to:
1. Google AI Studio (Gemini Flash) — generous free tier
2. OpenRouter — aggregates multiple free open-source models
3. Together.ai — free tier for open-source models

The Worker abstracts the provider. Changing it means updating one URL and one model string.
