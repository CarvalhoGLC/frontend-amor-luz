import { useState, useCallback } from 'react';
import { login as loginRequest } from '../api';

// Token guardado só em memória (estado do React) — some ao recarregar a
// página, exigindo login novamente. Isso é intencional, não um bug.
export function useAuth() {
  const [token, setToken] = useState(null);

  const login = useCallback(async (password) => {
    const newToken = await loginRequest(password);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => setToken(null), []);

  return { token, isAuthenticated: !!token, login, logout };
}