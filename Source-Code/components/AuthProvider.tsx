"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface UserData {
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: UserData | null;
  loading: boolean;
  ngo_refresh: () => void;
}

const NgoAuthContext = createContext<AuthContextType>({ user: null, loading: true, ngo_refresh: () => {} });

// AUTHHHHHHHHHHHHHHHHH
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const ngo_fetchUser = useCallback(async () => {
    try {
      const ngo_response = await fetch("/api/user/me");
      if (!ngo_response.ok) { setUser(null); setLoading(false); return; }
      const ngo_data = await ngo_response.json();
      setUser(ngo_data?.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    ngo_fetchUser();
  }, [ngo_fetchUser]);

  const ngo_refresh = useCallback(() => {
    setLoading(true);
    ngo_fetchUser();
  }, [ngo_fetchUser]);

  return (
    <NgoAuthContext.Provider value={{ user, loading, ngo_refresh }}>
      {children}
    </NgoAuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(NgoAuthContext);
}
