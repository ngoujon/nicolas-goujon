import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeModeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
}

const STORAGE_KEY = 'theme-mode';
const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

const getSystemPreference = (): ThemeMode =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'light' || stored === 'dark' ? stored : getSystemPreference();
  });
  const [hasManualPreference] = useState(() => window.localStorage.getItem(STORAGE_KEY) !== null);

  // Suit les changements de réglages système tant que l'utilisateur n'a pas choisi manuellement.
  useEffect(() => {
    if (hasManualPreference || !window.matchMedia) return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setMode(e.matches ? 'dark' : 'light');
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [hasManualPreference]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      window.localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ mode, toggleMode }), [mode, toggleMode]);

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export const useThemeMode = () => {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) throw new Error('useThemeMode doit être utilisé dans un ThemeModeProvider');
  return ctx;
};
