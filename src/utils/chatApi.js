/**
 * Worker chat API. Set `VITE_CHAT_API_URL` (no trailing slash required).
 */

function chatUrl() {
  const base = import.meta.env.VITE_CHAT_API_URL;
  if (!base || typeof base !== 'string') {
    throw new Error('Chat is not configured');
  }
  return `${base.replace(/\/$/, '')}/api/chat`;
}

function parseSseBuffer(buffer) {
  const lines = buffer.split('\n');
  const rest = lines.pop() ?? '';
  const textParts = [];
  let done = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const data = trimmed.slice(5).trim();
    if (data === '[DONE]') {
      done = true;
      continue;
    }
    try {
      const json = JSON.parse(data);
      const piece = json.choices?.[0]?.delta?.content;
      if (piece) textParts.push(piece);
    } catch {
      /* ignore malformed chunks */
    }
  }
  return { rest, textParts, done };
}

export async function* streamChat(messages) {
  const url = chatUrl();
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });
  } catch {
    throw new Error('Could not reach the chat service');
  }

  if (!res.ok) {
    let message = 'Something went wrong';
    try {
      const data = await res.json();
      if (data && typeof data.error === 'string') message = data.error;
    } catch {
      /* keep default */
    }
    throw new Error(message);
  }

  if (!res.body) {
    throw new Error('Empty response from chat service');
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        const { textParts } = parseSseBuffer(`${buffer}\n`);
        for (const t of textParts) yield t;
        break;
      }
      buffer += decoder.decode(value, { stream: true });
      const { rest, textParts, done: sseDone } = parseSseBuffer(buffer);
      buffer = rest;
      for (const t of textParts) yield t;
      if (sseDone) break;
    }
  } finally {
    reader.releaseLock();
  }
}

export async function sendChat(messages) {
  let full = '';
  try {
    for await (const chunk of streamChat(messages)) {
      full += chunk;
    }
  } catch (err) {
    throw err instanceof Error ? err : new Error('Something went wrong');
  }
  return full;
}
