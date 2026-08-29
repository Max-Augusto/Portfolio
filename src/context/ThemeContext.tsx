import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'blue' | 'cyan' | 'amber' | 'rose';

export interface ThemeConfig {
  id: AccentColor;
  label: string;
  hex: string;
  activeBorder: string;
  activeText: string;
  activeBg: string;
  activeBgHover: string;
  activeGlow: string;
  activeTagBg: string;
  activeBadgeBorder: string;
  activeGradient: string;
  ringBorder: string;
  avatarBorder: string;
}

export const THEME_CONFIGS: Record<AccentColor, ThemeConfig> = {
  blue: {
    id: 'blue',
    label: 'Cobalt Blue',
    hex: '#3b82f6',
    activeBorder: 'border-blue-500/40',
    activeText: 'text-blue-400',
    activeBg: 'bg-blue-600',
    activeBgHover: 'hover:bg-blue-500',
    activeGlow: 'shadow-[0_0_14px_rgba(59,130,246,0.25)]',
    activeTagBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    activeBadgeBorder: 'border-blue-500/50',
    activeGradient: 'from-blue-600 to-indigo-600',
    ringBorder: 'focus:border-blue-500',
    avatarBorder: 'border-blue-500/40',
  },
  cyan: {
    id: 'cyan',
    label: 'Cyber Cyan',
    hex: '#06b6d4',
    activeBorder: 'border-cyan-500/40',
    activeText: 'text-cyan-400',
    activeBg: 'bg-cyan-600',
    activeBgHover: 'hover:bg-cyan-500',
    activeGlow: 'shadow-[0_0_14px_rgba(6,182,212,0.25)]',
    activeTagBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    activeBadgeBorder: 'border-cyan-500/50',
    activeGradient: 'from-cyan-600 to-teal-600',
    ringBorder: 'focus:border-cyan-500',
    avatarBorder: 'border-cyan-500/40',
  },
  amber: {
    id: 'amber',
    label: 'Amber Gold',
    hex: '#eab308',
    activeBorder: 'border-amber-500/40',
    activeText: 'text-amber-400',
    activeBg: 'bg-amber-600',
    activeBgHover: 'hover:bg-amber-500',
    activeGlow: 'shadow-[0_0_14px_rgba(234,179,8,0.25)]',
    activeTagBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    activeBadgeBorder: 'border-amber-500/50',
    activeGradient: 'from-amber-600 to-yellow-600',
    ringBorder: 'focus:border-amber-500',
    avatarBorder: 'border-amber-500/40',
  },
  rose: {
    id: 'rose',
    label: 'Coral Rose',
    hex: '#f43f5e',
    activeBorder: 'border-rose-500/40',
    activeText: 'text-rose-400',
    activeBg: 'bg-rose-600',
    activeBgHover: 'hover:bg-rose-500',
    activeGlow: 'shadow-[0_0_14px_rgba(244,63,94,0.25)]',
    activeTagBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    activeBadgeBorder: 'border-rose-500/50',
    activeGradient: 'from-rose-600 to-pink-600',
    ringBorder: 'focus:border-rose-500',
    avatarBorder: 'border-rose-500/40',
  },
};

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  theme: ThemeConfig;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_accent_color');
      if (saved && (saved === 'blue' || saved === 'cyan' || saved === 'amber' || saved === 'rose')) {
        return saved as AccentColor;
      }
    }
    return 'blue';
  });

  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_accent_color', color);
    }
  };

  const theme = THEME_CONFIGS[accentColor];

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor: handleSetAccentColor, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
