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

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    fetch('/api/auth/session')
      .then(async (response) => {
        if (ignore) return;
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
      })
      .catch(() => {
        if (!ignore) {
          setState({ user: null, isLoading: false, isAuthenticated: false });
        }
      });

    return () => {
      ignore = true;
    };
  }, [refreshKey]);

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  return { ...state, refresh };
}
