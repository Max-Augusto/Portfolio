import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'blue' | 'cyan' | 'amber' | 'rose';
export type ThemeMode = 'dark' | 'light';

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
  // Dynamic mode-aware surface styles
  bgBody: string;
  bgCard: string;
  bgCardHover: string;
  bgSubCard: string;
  borderCard: string;
  borderSubCard: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  codeBg: string;
}

const ACCENT_COLOR_MAP: Record<AccentColor, { label: string; hex: string; gradient: string }> = {
  blue: { label: 'Cobalt Blue', hex: '#3b82f6', gradient: 'from-blue-600 to-indigo-600' },
  cyan: { label: 'Cyber Cyan', hex: '#06b6d4', gradient: 'from-cyan-600 to-teal-600' },
  amber: { label: 'Amber Gold', hex: '#eab308', gradient: 'from-amber-600 to-yellow-600' },
  rose: { label: 'Coral Rose', hex: '#f43f5e', gradient: 'from-rose-600 to-pink-600' },
};

function buildThemeConfig(accent: AccentColor, mode: ThemeMode): ThemeConfig {
  const isDark = mode === 'dark';
  const meta = ACCENT_COLOR_MAP[accent];

  const accentStyles: Record<AccentColor, {
    activeBorder: string;
    activeText: string;
    activeBg: string;
    activeBgHover: string;
    activeGlow: string;
    activeTagBg: string;
    activeBadgeBorder: string;
    avatarBorder: string;
    ringBorder: string;
  }> = {
    blue: {
      activeBorder: isDark ? 'border-blue-500/40' : 'border-blue-500/50',
      activeText: isDark ? 'text-blue-400' : 'text-blue-600',
      activeBg: 'bg-blue-600',
      activeBgHover: 'hover:bg-blue-500',
      activeGlow: isDark ? 'shadow-[0_0_14px_rgba(59,130,246,0.25)]' : 'shadow-[0_4px_14px_rgba(59,130,246,0.2)]',
      activeTagBg: isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' : 'bg-blue-50 text-blue-700 border-blue-200',
      activeBadgeBorder: isDark ? 'border-blue-500/50' : 'border-blue-400',
      avatarBorder: isDark ? 'border-blue-500/40' : 'border-blue-400',
      ringBorder: 'focus:border-blue-500',
    },
    cyan: {
      activeBorder: isDark ? 'border-cyan-500/40' : 'border-cyan-500/50',
      activeText: isDark ? 'text-cyan-400' : 'text-cyan-600',
      activeBg: 'bg-cyan-600',
      activeBgHover: 'hover:bg-cyan-500',
      activeGlow: isDark ? 'shadow-[0_0_14px_rgba(6,182,212,0.25)]' : 'shadow-[0_4px_14px_rgba(6,182,212,0.2)]',
      activeTagBg: isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30' : 'bg-cyan-50 text-cyan-700 border-cyan-200',
      activeBadgeBorder: isDark ? 'border-cyan-500/50' : 'border-cyan-400',
      avatarBorder: isDark ? 'border-cyan-500/40' : 'border-cyan-400',
      ringBorder: 'focus:border-cyan-500',
    },
    amber: {
      activeBorder: isDark ? 'border-amber-500/40' : 'border-amber-500/50',
      activeText: isDark ? 'text-amber-400' : 'text-amber-600',
      activeBg: 'bg-amber-600',
      activeBgHover: 'hover:bg-amber-500',
      activeGlow: isDark ? 'shadow-[0_0_14px_rgba(234,179,8,0.25)]' : 'shadow-[0_4px_14px_rgba(234,179,8,0.2)]',
      activeTagBg: isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' : 'bg-amber-50 text-amber-700 border-amber-200',
      activeBadgeBorder: isDark ? 'border-amber-500/50' : 'border-amber-400',
      avatarBorder: isDark ? 'border-amber-500/40' : 'border-amber-400',
      ringBorder: 'focus:border-amber-500',
    },
    rose: {
      activeBorder: isDark ? 'border-rose-500/40' : 'border-rose-500/50',
      activeText: isDark ? 'text-rose-400' : 'text-rose-600',
      activeBg: 'bg-rose-600',
      activeBgHover: 'hover:bg-rose-500',
      activeGlow: isDark ? 'shadow-[0_0_14px_rgba(244,63,94,0.25)]' : 'shadow-[0_4px_14px_rgba(244,63,94,0.2)]',
      activeTagBg: isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-rose-50 text-rose-700 border-rose-200',
      activeBadgeBorder: isDark ? 'border-rose-500/50' : 'border-rose-400',
      avatarBorder: isDark ? 'border-rose-500/40' : 'border-rose-400',
      ringBorder: 'focus:border-rose-500',
    },
  };

  const currentAccent = accentStyles[accent];

  return {
    id: accent,
    label: meta.label,
    hex: meta.hex,
    activeGradient: meta.gradient,
    ...currentAccent,
    bgBody: isDark ? 'bg-[#0a0d14]' : 'bg-[#f8fafc]',
    bgCard: isDark ? 'bg-[#121620]' : 'bg-white',
    bgCardHover: isDark ? 'hover:bg-[#151b27]' : 'hover:bg-slate-50',
    bgSubCard: isDark ? 'bg-[#181d2a]' : 'bg-[#f1f5f9]',
    borderCard: isDark ? 'border-[#1e2433]' : 'border-slate-200',
    borderSubCard: isDark ? 'border-[#272f42]' : 'border-slate-300',
    textPrimary: isDark ? 'text-slate-100' : 'text-slate-900',
    textSecondary: isDark ? 'text-slate-300' : 'text-slate-700',
    textMuted: isDark ? 'text-slate-400' : 'text-slate-500',
    codeBg: isDark ? 'bg-[#0d111a]' : 'bg-slate-100',
  };
}

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
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

  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_theme_mode');
      if (saved === 'light' || saved === 'dark') {
        return saved as ThemeMode;
      }
    }
    return 'dark';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (mode === 'light') {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      } else {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
      }
    }
  }, [mode]);

  const handleSetAccentColor = (color: AccentColor) => {
    setAccentColor(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_accent_color', color);
    }
  };

  const handleSetMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_theme_mode', newMode);
    }
  };

  const toggleMode = () => {
    handleSetMode(mode === 'dark' ? 'light' : 'dark');
  };

  const isDark = mode === 'dark';
  const theme = buildThemeConfig(accentColor, mode);

  return (
    <ThemeContext.Provider 
      value={{ 
        accentColor, 
        setAccentColor: handleSetAccentColor, 
        mode, 
        setMode: handleSetMode, 
        toggleMode, 
        isDark, 
        theme 
      }}
    >
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
