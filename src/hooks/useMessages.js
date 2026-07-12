import { useState, useCallback, useEffect } from 'react';
import { fetchMessages } from '../api';

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const list = await fetchMessages();
    setMessages(list);
    return list;
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  return { messages, loading, refresh };
}