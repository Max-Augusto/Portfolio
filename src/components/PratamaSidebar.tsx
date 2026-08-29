import React from 'react';
import { 
  User, 
  Layers, 
  FileText, 
  FolderGit2, 
  Cpu, 
  Network, 
  Terminal, 
  Mail, 
  Download,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useTheme, AccentColor } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface PratamaSidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const PratamaSidebar: React.FC<PratamaSidebarProps> = ({
  activeSection,
  onSelectSection,
  onOpenResume,
}) => {
  const { accentColor, setAccentColor, theme, mode, toggleMode, isDark } = useTheme();
  const { language, setLanguage, isPT, t } = useLanguage();

  const sections = [
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'what-i-do', label: t('nav.what_i_do'), icon: Layers },
    { id: 'experience', label: t('nav.experience'), icon: FileText },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2 },
    { id: 'skills', label: t('nav.skills'), icon: Cpu },
    { id: 'topology', label: t('nav.topology'), icon: Network },
    { id: 'terminal', label: t('nav.terminal'), icon: Terminal },
    { id: 'contact', label: t('nav.contact'), icon: Mail },
  ];

  const colorSwatches: { id: AccentColor; label: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', bg: 'bg-[#f43f5e]' },
  ];

  return (
    <aside className={`w-full lg:w-64 ${theme.bgCard} border ${theme.borderCard} rounded-3xl p-5 shadow-2xl flex flex-col justify-between gap-6 transition-all duration-300`}>
      
      {/* Navigation Links */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-700/30">
          <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">
            // CONSOLE NAV
          </div>
          {/* Light/Dark & Language Quick Badges */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleMode}
              className={`p-1 rounded-lg ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textSecondary} hover:${theme.textPrimary} transition-colors text-xs`}
              title={isDark ? 'Modo Claro' : 'Modo Escuro'}
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-blue-600" />}
            </button>
            <button
              onClick={() => setLanguage(isPT ? 'en' : 'pt')}
              className={`px-1.5 py-0.5 rounded-lg ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textPrimary} text-[10px] font-bold font-mono hover:${theme.activeText}`}
              title="Alternar Idioma"
            >
              {isPT ? 'PT' : 'EN'}
            </button>
          </div>
        </div>

        <nav className="space-y-1" aria-label="Sidebar navigation">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer group ${
                  isActive 
                    ? `${theme.bgSubCard} ${theme.activeText} font-bold border ${theme.activeBadgeBorder} ${theme.activeGlow}` 
                    : `${theme.textSecondary} hover:${theme.textPrimary} hover:${theme.bgSubCard}`
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? theme.activeText : 'text-slate-400 group-hover:text-slate-200'}`} />
                  <span className="capitalize">{sec.label}</span>
                </div>
                <span className={`text-[10px] font-mono ${isActive ? theme.activeText : 'text-slate-500'}`}>
                  0{idx + 1}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Resume CTA & Theme Controls */}
      <div className={`space-y-4 pt-4 border-t ${theme.borderCard}`}>
        {/* Quick Resume Button */}
        <button
          onClick={onOpenResume}
          className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} border ${theme.borderSubCard} hover:border-slate-400 ${theme.textPrimary} font-mono text-xs transition-all shadow-xs cursor-pointer group`}
        >
          <Download className={`w-3.5 h-3.5 ${theme.textMuted} group-hover:${theme.activeText} transition-colors`} />
          <span className="font-semibold">{t('header.download_cv')}</span>
        </button>

        {/* Color Palette Switcher */}
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            <span>{t('header.theme_title')}</span>
            <span className={`${theme.activeText} font-bold`}>{theme.label}</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {colorSwatches.map((swatch) => (
              <button
                key={swatch.id}
                onClick={() => setAccentColor(swatch.id)}
                className={`h-7 rounded-lg ${swatch.bg} transition-all duration-200 cursor-pointer ${
                  accentColor === swatch.id
                    ? 'ring-2 ring-white/90 ring-offset-2 ring-offset-slate-900 scale-105 shadow-md'
                    : 'opacity-70 hover:opacity-100'
                }`}
                title={swatch.label}
              />
            ))}
          </div>
        </div>

        {/* Status Indicator */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} text-[10px] font-mono ${theme.textMuted}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="truncate">SRE OPERATIONAL · BH</span>
        </div>
      </div>

    </aside>
  );
};
