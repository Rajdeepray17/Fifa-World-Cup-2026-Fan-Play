import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { nations, defaultTheme, hexToRgba } from '../data/nations';

const ThemeContext = createContext();

const STORAGE_KEY = 'fifa-wc2026-nation';

/* Apply CSS custom properties to :root */
function applyThemeToDOM(primary, secondary, accent) {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', primary);
  root.style.setProperty('--theme-secondary', secondary);
  root.style.setProperty('--theme-accent', accent);
  root.style.setProperty('--theme-primary-10', hexToRgba(primary, 0.15));
  root.style.setProperty('--theme-secondary-10', hexToRgba(secondary, 0.15));
}

export function ThemeProvider({ children }) {
  const [selectedNation, setSelectedNation] = useState(null);
  const [isNationSelected, setIsNationSelected] = useState(false);

  /* Restore from localStorage on mount */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      if (saved === 'default') {
        setSelectedNation(defaultTheme);
        applyThemeToDOM(defaultTheme.primary, defaultTheme.secondary, defaultTheme.accent);
      } else {
        const nation = nations.find((n) => n.id === saved);
        if (nation) {
          setSelectedNation(nation);
          applyThemeToDOM(nation.primary, nation.secondary, nation.accent);
        }
      }
    }
  }, []);

  /* Select a nation */
  const selectNation = useCallback((nationId) => {
    if (nationId === 'default') {
      setSelectedNation(defaultTheme);
      setIsNationSelected(true);
      localStorage.setItem(STORAGE_KEY, 'default');
      applyThemeToDOM(defaultTheme.primary, defaultTheme.secondary, defaultTheme.accent);
      return;
    }
    const nation = nations.find((n) => n.id === nationId);
    if (!nation) return;
    setSelectedNation(nation);
    setIsNationSelected(true);
    localStorage.setItem(STORAGE_KEY, nation.id);
    applyThemeToDOM(nation.primary, nation.secondary, nation.accent);
  }, []);

  /* Reset nation (useful for re-picking) */
  const resetNation = useCallback(() => {
    setSelectedNation(null);
    setIsNationSelected(false);
    localStorage.removeItem(STORAGE_KEY);
    applyThemeToDOM(defaultTheme.primary, defaultTheme.secondary, defaultTheme.accent);
  }, []);

  const value = {
    selectedNation,
    isNationSelected,
    selectNation,
    resetNation,
    nations,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
