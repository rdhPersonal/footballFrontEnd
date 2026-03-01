'use client';

import { useState, useEffect, useCallback } from 'react';

export interface User {
  sub: string;
  email: string;
  name?: string;
}

interface SessionState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useSession(): SessionState & { refresh: () => void } {
  const [state, setState] = useState<SessionState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const data = await response.json();
        setState({
          user: data.user,
          isLoading: false,
          isAuthenticated: !!data.user,
        });
      } else {
        setState({ user: null, isLoading: false, isAuthenticated: false });
      }
    } catch {
      setState({ user: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  return { ...state, refresh: fetchSession };
}
