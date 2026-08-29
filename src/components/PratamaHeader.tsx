import React, { useState, useEffect } from 'react';
import { 
  Download, 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Copy, 
  Check,
  Command,
  Activity,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { getPersonalInfo } from '../data/localizedData';
import { useTheme, AccentColor } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface PratamaHeaderProps {
  onOpenResume: () => void;
  onOpenCommandPalette?: () => void;
}

export const PratamaHeader: React.FC<PratamaHeaderProps> = ({ 
  onOpenResume,
  onOpenCommandPalette 
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  
  const { theme, accentColor, setAccentColor, mode, toggleMode, isDark } = useTheme();
  const { language, toggleLanguage, setLanguage, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

  const colorSwatches: { id: AccentColor; label: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', bg: 'bg-[#f43f5e]' },
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
      });
      setCurrentTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
      {/* Pratama Master Console Box */}
      <div className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden shadow-2xl transition-all duration-300`}>
        
        {/* Top Console Bar */}
        <div className={`flex flex-wrap items-center justify-between pb-3 sm:pb-5 border-b ${theme.borderCard} mb-4 sm:mb-6 gap-2`}>
          
          {/* Left: macOS Terminal Dots & Live Operational Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
            </div>

            {/* Live Operational Status Indicator */}
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full ${theme.bgSubCard} border ${theme.borderSubCard} text-[10px] sm:text-[11px] font-mono ${theme.textSecondary} shadow-xs`}>
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 animate-pulse shrink-0" />
              <span className="truncate">{t('header.operator_status')}</span>
              <span className="text-slate-500 hidden xs:inline">|</span>
              <span className="text-emerald-500 font-semibold hidden xs:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {t('header.uptime')}
              </span>
            </div>
          </div>

          {/* Right Controls: Language Selector, Light/Dark Mode, Color Palette & Command Palette */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Language Switcher Button (PT / EN) */}
            <div className={`flex items-center p-0.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} shadow-xs font-mono text-[11px]`}>
              <button
                onClick={() => setLanguage('pt')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  isPT 
                    ? `${theme.activeBg} text-white shadow-xs` 
                    : `${theme.textMuted} hover:${theme.textPrimary}`
                }`}
                title="Português (Brasil)"
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                  !isPT 
                    ? `${theme.activeBg} text-white shadow-xs` 
                    : `${theme.textMuted} hover:${theme.textPrimary}`
                }`}
                title="English (US)"
              >
                EN
              </button>
            </div>

            {/* Light / Dark Mode Toggle Button */}
            <button
              onClick={toggleMode}
              className={`p-1.5 sm:p-2 rounded-xl ${theme.bgSubCard} hover:bg-slate-200 dark:hover:bg-[#202738] border ${theme.borderSubCard} ${theme.textSecondary} transition-all cursor-pointer shadow-xs min-h-[32px]`}
              title={isDark ? 'Mudar para Modo Claro (Light Mode)' : 'Mudar para Modo Escuro (Dark Mode)'}
              aria-label="Alternar tema claro/escuro"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-fadeIn" />
              ) : (
                <Moon className="w-4 h-4 text-blue-600 animate-fadeIn" />
              )}
            </button>

            {/* Direct Theme Accent Color Switcher */}
            <div className={`flex items-center gap-1 ${theme.bgSubCard} p-1 rounded-xl border ${theme.borderSubCard} shadow-xs`} title={t('header.theme_title')}>
              {colorSwatches.map((swatch) => {
                const isSelected = accentColor === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setAccentColor(swatch.id)}
                    className={`relative w-5 h-5 sm:w-6 sm:h-6 rounded-lg ${swatch.bg} flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'scale-110 ring-2 ring-white/90 ring-offset-1 ring-offset-slate-800 shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'opacity-65 hover:opacity-100'
                    }`}
                    title={swatch.label}
                    aria-label={swatch.label}
                  >
                    {isSelected && (
                      <Check className="w-3 h-3 text-white drop-shadow-md stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Command Palette Button */}
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                title="Abrir Command Palette (Ctrl+K ou ⌘K)"
                className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 ${theme.textSecondary} font-mono text-xs cursor-pointer transition-all shadow-xs group min-h-[32px]`}
              >
                <Command className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span className="hidden sm:inline">{t('header.search')}</span>
                <kbd className={`text-[10px] ${theme.bgCard} px-1.5 py-0.5 rounded border ${theme.borderSubCard} ${theme.textMuted} font-bold hidden xs:inline-block`}>
                  ⌘K
                </kbd>
              </button>
            )}

          </div>
        </div>

        {/* Main Content Grid: Identity | Status | Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Identity & Avatar (5 cols) */}
          <div className="lg:col-span-5 flex items-center gap-3.5 sm:gap-5">
            {/* Pratama Avatar Frame with dynamic theme border */}
            <div className="relative shrink-0">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${theme.bgSubCard} border-2 ${theme.avatarBorder} p-1 overflow-hidden shadow-md transition-colors duration-300`}>
                <img 
                  src={personalInfo.avatarUrl} 
                  alt={personalInfo.name}
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
              {/* Online Operational Status Dot */}
              <span 
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#121620] shadow-[0_0_10px_#10b981]"
                title="Status: Online e Operacional"
              ></span>
            </div>

            {/* Name & Role */}
            <div className="min-w-0">
              <h1 className={`text-xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center gap-1.5 truncate`}>
                <span>Max</span>
                <span className="font-normal opacity-85">Augusto</span>
              </h1>
              <p className={`text-xs sm:text-sm ${theme.textMuted} font-normal mt-0.5 truncate`}>
                {t('header.role')}
              </p>
              <div className="text-[11px] sm:text-xs font-mono text-slate-500 mt-1 flex items-center gap-2">
                <span>operator/01</span>
                <span>•</span>
                <span className={`${theme.activeText} truncate`}>puc-minas</span>
                <span>•</span>
                <span className="text-emerald-500 font-semibold truncate hidden xs:inline">Betim / BH, MG</span>
              </div>
            </div>
          </div>

          {/* Middle Column: System Status (3 cols) */}
          <div className={`lg:col-span-3 ${theme.bgSubCard} sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none lg:border-l ${theme.borderCard} lg:pl-6 grid grid-cols-3 sm:flex sm:flex-col gap-2 sm:space-y-1.5 font-mono text-xs ${theme.textMuted}`}>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-semibold hidden sm:block mb-2">
              SYSTEM STATUS
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">status:</span>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`flex items-center gap-1 cursor-pointer ${theme.textSecondary} hover:text-emerald-500 transition-colors focus:outline-none`}
              >
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'} animate-pulse shrink-0`}></span>
                <span className={`text-[11px] sm:text-xs truncate ${isAvailable ? 'text-emerald-500 font-medium' : 'text-amber-500'}`}>
                  {isAvailable ? t('header.status_available') : t('header.status_busy')}
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">local/tz:</span>
              <span className={`${theme.textSecondary} font-medium text-[11px] sm:text-xs truncate`}>
                {isPT ? 'Betim / BH' : 'Minas Gerais, BR'} {currentTime ? `(${currentTime})` : '(GMT-3)'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">resposta:</span>
              <span className={`${theme.textSecondary} font-medium text-[11px] sm:text-xs`}>&lt;24h SLA</span>
            </div>
          </div>

          {/* Right Column: Actions (Download CV, Email, Socials) (4 cols) */}
          <div className={`lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-2.5 sm:gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 ${theme.borderCard}`}>
            {/* Download CV button */}
            <div className="flex items-center w-full lg:w-auto">
              <button
                onClick={onOpenResume}
                className={`w-full sm:w-auto flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl ${theme.bgSubCard} ${theme.textPrimary} border ${theme.borderSubCard} hover:border-slate-400 text-xs font-mono font-medium transition-all shadow-sm group cursor-pointer min-h-[42px]`}
              >
                <Download className={`w-3.5 h-3.5 ${theme.textMuted} group-hover:${theme.activeText} transition-colors`} />
                <span>{t('header.download_cv')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>
            </div>

            {/* Email and Socials row */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto">
              {/* Email link */}
              <div className={`flex items-center gap-1.5 font-mono text-[11px] sm:text-xs ${theme.textMuted} hover:${theme.textPrimary} transition-colors truncate`}>
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <button
                  onClick={handleCopyEmail}
                  className="hover:underline cursor-pointer flex items-center gap-1 focus:outline-none truncate"
                  title={t('header.copy_email')}
                >
                  <span className="truncate max-w-[150px] xs:max-w-[200px]">{personalInfo.email}</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-500 shrink-0" /> : <Copy className="w-3 h-3 text-slate-500 opacity-60 shrink-0" />}
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 text-slate-400 text-sm shrink-0">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-lg ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors`}
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-lg ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors`}
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/${personalInfo.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-1.5 rounded-lg ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors`}
                  title="WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};
