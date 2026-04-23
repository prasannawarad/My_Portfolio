import { useCallback, useEffect, useRef, useState } from 'react';
import { sendChat, streamChat } from '../utils/chatApi';

const MAX_MESSAGES = 50;
/** Worker accepts at most 20 chat messages per request */
const MAX_API_MESSAGES = 20;
const MAX_API_MESSAGE_CONTENT = 400;

function trimMessageContent(content) {
  return content.length > MAX_API_MESSAGE_CONTENT
    ? content.slice(0, MAX_API_MESSAGE_CONTENT)
    : content;
}

function newId() {
  return crypto.randomUUID();
}

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const friendlyError = "Couldn't reach Prasanna AI right now. Please try again in a moment.";
  const streamRafRef = useRef(null);

  useEffect(() => {
    if (!error) return undefined;
    const t = window.setTimeout(() => setError(null), 5000);
    return () => window.clearTimeout(t);
  }, [error]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text ?? '').trim();
      if (!trimmed || isLoading) return;

      setError(null);

      const userMsg = {
        id: newId(),
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };
      const asstId = newId();
      const asstMsg = {
        id: asstId,
        role: 'assistant',
        content: '',
        timestamp: Date.now(),
      };

      let apiMessages;
      setMessages((prev) => {
        apiMessages = [...prev, userMsg]
          .map(({ role, content }) => ({ role, content: trimMessageContent(content) }))
          .slice(-MAX_API_MESSAGES);
        return [...prev, userMsg, asstMsg].slice(-MAX_MESSAGES);
      });

      setIsLoading(true);

      try {
        let acc = '';
        let gotAny = false;
        let pending = false;

        const flush = () => {
          pending = false;
          setMessages((prev) => prev.map((m) => (m.id === asstId ? { ...m, content: acc } : m)));
        };

        for await (const chunk of streamChat(apiMessages)) {
          gotAny = true;
          acc += chunk;
          if (pending) continue;
          pending = true;
          streamRafRef.current = window.requestAnimationFrame(flush);
        }
        if (pending) flush();
        if (!gotAny || !acc.trim()) throw new Error('Empty response');
      } catch {
        try {
          const full = await sendChat(apiMessages);
          if (full && full.trim()) {
            setError(null);
            setMessages((prev) =>
              prev.map((m) => (m.id === asstId ? { ...m, content: full } : m)),
            );
          } else {
            setError(friendlyError);
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.id === asstId && !last.content) return prev.slice(0, -1);
              return prev;
            });
          }
        } catch {
          setError(friendlyError);
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.id === asstId && !last.content) return prev.slice(0, -1);
            return prev;
          });
        }
      } finally {
        if (streamRafRef.current) {
          window.cancelAnimationFrame(streamRafRef.current);
          streamRafRef.current = null;
        }
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
