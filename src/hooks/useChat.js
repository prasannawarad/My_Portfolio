import { useCallback, useEffect, useState } from 'react';
import { streamChat } from '../utils/chatApi';

const MAX_MESSAGES = 50;
/** Worker accepts at most 20 chat messages per request */
const MAX_API_MESSAGES = 20;

function newId() {
  return crypto.randomUUID();
}

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
          .map(({ role, content }) => ({ role, content }))
          .slice(-MAX_API_MESSAGES);
        return [...prev, userMsg, asstMsg].slice(-MAX_MESSAGES);
      });

      setIsLoading(true);

      try {
        let acc = '';
        for await (const chunk of streamChat(apiMessages)) {
          acc += chunk;
          setMessages((prev) =>
            prev.map((m) => (m.id === asstId ? { ...m, content: acc } : m)),
          );
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Something went wrong';
        setError(msg);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.id === asstId && !last.content) return prev.slice(0, -1);
          return prev;
        });
      } finally {
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
