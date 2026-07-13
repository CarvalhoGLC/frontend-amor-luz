import { useState, useCallback, useEffect } from 'react';
import { fetchVideos } from '../api';

export function useVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const list = await fetchVideos();
    setVideos(list);
    return list;
  }, []);

  useEffect(() => {
    setLoading(true);
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  return { videos, loading, refresh };
}