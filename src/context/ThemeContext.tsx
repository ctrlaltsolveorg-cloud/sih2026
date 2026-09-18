'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';

export type Theme = 'light' | 'dark' | 'bhor';
export type ResolvedTheme = 'light' | 'dark' | 'bhor';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'kb_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default theme is 'bhor' (pre-dawn mandi) or 'light'
  const [theme, setThemeState] = useState<Theme>('bhor');
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('bhor');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    setMounted(true);
    try {
      const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'bhor' || savedTheme === 'light') {
        setThemeState(savedTheme);
        setResolvedTheme(savedTheme);
      } else {
        setThemeState('bhor');
        setResolvedTheme('bhor');
      }
    } catch {
      setThemeState('bhor');
      setResolvedTheme('bhor');
    }
  }, []);

  // Sync resolved theme and document classes whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'bhor');

    if (theme === 'bhor') {
      setResolvedTheme('bhor');
      root.classList.add('bhor');
      root.setAttribute('data-theme', 'bhor');
      root.style.colorScheme = 'dark';
    } else if (theme === 'dark') {
      setResolvedTheme('dark');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      setResolvedTheme('light');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Failed to save theme preference in localStorage:', e);
    }
  };

  const toggleTheme = () => {
    // Cycle between: 'bhor' -> 'light' -> 'dark' -> 'bhor'
    let nextTheme: Theme = 'bhor';
    if (resolvedTheme === 'bhor') nextTheme = 'light';
    else if (resolvedTheme === 'light') nextTheme = 'dark';
    else if (resolvedTheme === 'dark') nextTheme = 'bhor';
    setTheme(nextTheme);
  };

  const contextValue = useMemo<ThemeContextType>(() => ({
    theme,
    resolvedTheme: mounted ? resolvedTheme : 'light',
    setTheme,
    toggleTheme,
  }), [theme, resolvedTheme, mounted]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
