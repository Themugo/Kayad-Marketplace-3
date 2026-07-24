import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeConfig, defaultThemeConfig } from './ThemeConfig';

interface ThemeContextType {
  theme: ThemeConfig;
  setThemeMode: (mode: 'dark' | 'light' | 'auto') => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultThemeConfig,
  setThemeMode: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultThemeConfig);

  const setThemeMode = (mode: 'dark' | 'light' | 'auto') => {
    setTheme(prev => ({ ...prev, mode }));
  };

  useEffect(() => {
    // Apply CSS variables for the color system dynamically
    const root = document.documentElement;
    root.style.setProperty('--primary-navy', theme.tokens.colors.primaryNavy);
    root.style.setProperty('--secondary-navy', theme.tokens.colors.secondaryNavy);
    root.style.setProperty('--aqua-accent', theme.tokens.colors.aquaAccent);
    root.style.setProperty('--success-green', theme.tokens.colors.successGreen);
    root.style.setProperty('--bg-light', theme.tokens.colors.backgroundLight);
    root.style.setProperty('--text-dark', theme.tokens.colors.textDark);
    root.style.setProperty('--danger-red', theme.tokens.colors.dangerRed);
    root.style.setProperty('--nav-active', theme.tokens.colors.navActive);
    root.style.setProperty('--warning-gold', theme.tokens.colors.warningGold);
    root.style.setProperty('--info-indigo', theme.tokens.colors.infoIndigo);
    root.style.setProperty('--deepest-navy', theme.tokens.colors.deepestNavy);
    root.style.setProperty('--deep-navy', theme.tokens.colors.deepNavy);
    root.style.setProperty('--navy-highlight', theme.tokens.colors.navyHighlight);
    root.style.setProperty('--warm-accent-bg', theme.tokens.colors.warmAccentBg);
    root.style.setProperty('--muted-text', theme.tokens.colors.mutedText);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
