import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
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
  Globe,
  Compass,
  User,
  Layers,
  FileText,
  FolderGit2,
  Cpu,
  Network,
  Terminal
} from 'lucide-react';
import { getPersonalInfo } from '../data/localizedData';
import { useTheme, AccentColor } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface PratamaHeaderProps {
  onOpenResume: () => void;
  onOpenCommandPalette?: () => void;
  activeSection?: string;
  onSelectSection?: (sectionId: string) => void;
}

export const PratamaHeader: React.FC<PratamaHeaderProps> = ({ 
  onOpenResume,
  onOpenCommandPalette,
  activeSection = 'about',
  onSelectSection
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  const { theme, accentColor, setAccentColor, mode, toggleMode, isDark } = useTheme();
  const { language, toggleLanguage, setLanguage, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

  const headerScrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const headerSections = [
    { id: 'about', label: t('nav.about'), icon: User, num: '01' },
    { id: 'what-i-do', label: t('nav.what_i_do'), icon: Layers, num: '02' },
    { id: 'experience', label: t('nav.experience'), icon: FileText, num: '03' },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2, num: '04' },
    { id: 'skills', label: t('nav.skills'), icon: Cpu, num: '05' },
    { id: 'topology', label: t('nav.topology'), icon: Network, num: '06' },
    { id: 'terminal', label: t('nav.terminal'), icon: Terminal, num: '07' },
    { id: 'contact', label: t('nav.contact'), icon: Mail, num: '08' },
  ];

  const currentHeaderIndex = headerSections.findIndex(s => s.id === activeSection);
  const prevHeaderSection = currentHeaderIndex > 0 ? headerSections[currentHeaderIndex - 1] : null;
  const nextHeaderSection = currentHeaderIndex < headerSections.length - 1 ? headerSections[currentHeaderIndex + 1] : null;

  // Auto-scroll active item into center view when changed
  useEffect(() => {
    const activeEl = itemRefs.current[activeSection];
    const container = headerScrollRef.current;
    if (activeEl && container) {
      const containerWidth = container.offsetWidth;
      const elOffsetLeft = activeEl.offsetLeft;
      const elWidth = activeEl.offsetWidth;
      const targetScroll = elOffsetLeft - (containerWidth / 2) + (elWidth / 2);
      
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth'
      });
    }
  }, [activeSection]);

  const scrollHeader = (direction: 'left' | 'right') => {
    if (headerScrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      headerScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 sm:pb-5 border-b ${theme.borderCard} mb-4 sm:mb-6 gap-3`}>
          
          {/* Left: macOS Terminal Dots & Live Operational Status */}
          <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
            </div>

            {/* Live Operational Status Indicator */}
            <div className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full ${theme.bgSubCard} border ${theme.borderSubCard} text-[10px] sm:text-[11px] font-mono ${theme.textSecondary} shadow-xs`}>
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-500 animate-pulse shrink-0" />
              <span className="font-semibold text-emerald-500">{t('header.operator_status')}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 font-mono">
                {t('header.uptime')}
              </span>
            </div>
          </div>

          {/* Right Controls: Language Selector, Light/Dark Mode, Color Palette & Command Palette */}
          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar py-0.5">
            
            {/* Language Switcher Button (PT / EN) */}
            <div className={`flex items-center p-0.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} shadow-xs font-mono text-[11px] shrink-0`}>
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
              className={`p-1.5 sm:p-2 rounded-xl ${theme.bgSubCard} hover:bg-slate-200 dark:hover:bg-[#202738] border ${theme.borderSubCard} ${theme.textSecondary} transition-all cursor-pointer shadow-xs min-h-[32px] shrink-0`}
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
            <div className={`flex items-center gap-1 ${theme.bgSubCard} p-1 rounded-xl border ${theme.borderSubCard} shadow-xs shrink-0`} title={t('header.theme_title')}>
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
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 ${theme.textSecondary} font-mono text-xs cursor-pointer transition-all shadow-xs group min-h-[32px] shrink-0`}
              >
                <Command className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span className="hidden sm:inline">{t('header.search')}</span>
                <kbd className={`text-[10px] ${theme.bgCard} px-1.5 py-0.5 rounded border ${theme.borderSubCard} ${theme.textMuted} font-bold hidden md:inline-block`}>
                  ⌘K
                </kbd>
              </button>
            )}

          </div>
        </div>

        {/* Main Content Grid: Identity | Status | Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start lg:items-center">
          
          {/* Left Column: Identity & Avatar (5 cols) */}
          <div className="lg:col-span-5 flex items-start sm:items-center gap-3.5 sm:gap-5">
            {/* Pratama Avatar Frame with dynamic theme border */}
            <div className="relative shrink-0 mt-0.5 sm:mt-0">
              <div className={`w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 rounded-2xl ${theme.bgSubCard} border-2 ${theme.avatarBorder} p-1 overflow-hidden shadow-md transition-colors duration-300`}>
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
                className="absolute -bottom-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-emerald-500 rounded-full border-2 border-[#121620] shadow-[0_0_10px_#10b981]"
                title="Status: Online e Operacional"
              ></span>
            </div>

            {/* Name & Role */}
            <div className="min-w-0 flex-1">
              <h1 className={`text-xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center gap-1.5`}>
                <span>Max</span>
                <span className="font-normal opacity-85">Augusto</span>
              </h1>
              <p className={`text-xs sm:text-sm ${theme.textMuted} font-normal mt-0.5 leading-snug line-clamp-2`}>
                {t('header.role')}
              </p>
              <div className="text-[11px] sm:text-xs font-mono text-slate-500 mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="px-1.5 py-0.5 rounded bg-slate-500/10 text-slate-400">operator/01</span>
                <span>•</span>
                <span className={`${theme.activeText} font-semibold`}>puc-minas</span>
                <span>•</span>
                <span className="text-emerald-500 font-semibold">Betim / BH, MG</span>
              </div>
            </div>
          </div>

          {/* Middle Column: System Status (3 cols) */}
          <div className={`lg:col-span-3 ${theme.bgSubCard} sm:bg-transparent p-3 sm:p-0 rounded-xl sm:rounded-none lg:border-l ${theme.borderCard} lg:pl-6 grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-col gap-2.5 sm:space-y-1.5 font-mono text-xs ${theme.textMuted}`}>
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-semibold hidden sm:block mb-1">
              SYSTEM STATUS
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] sm:text-xs w-16 sm:w-20 shrink-0">status:</span>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className={`flex items-center gap-1.5 cursor-pointer ${theme.textSecondary} hover:text-emerald-500 transition-colors focus:outline-none`}
              >
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'} animate-pulse shrink-0`}></span>
                <span className={`text-[11px] sm:text-xs font-medium ${isAvailable ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {isAvailable ? t('header.status_available') : t('header.status_busy')}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-[11px] sm:text-xs w-16 sm:w-20 shrink-0">local/tz:</span>
              <span className={`${theme.textSecondary} font-medium text-[11px] sm:text-xs truncate`}>
                Betim / BH {currentTime ? `(${currentTime})` : ''}
              </span>
            </div>

            <div className="flex items-center gap-2 xs:col-span-2 sm:col-span-1">
              <span className="text-slate-500 text-[11px] sm:text-xs w-16 sm:w-20 shrink-0">resposta:</span>
              <span className={`${theme.textSecondary} font-medium text-[11px] sm:text-xs text-emerald-400 font-semibold`}>&lt;24h SLA</span>
            </div>
          </div>

          {/* Right Column: Actions (Download CV, Email, Socials) (4 cols) */}
          <div className={`lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 ${theme.borderCard}`}>
            {/* Download CV button */}
            <div className="w-full lg:w-auto">
              <button
                onClick={onOpenResume}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl ${theme.bgSubCard} ${theme.textPrimary} border ${theme.borderSubCard} hover:border-slate-400 text-xs font-mono font-medium transition-all shadow-sm group cursor-pointer min-h-[42px]`}
              >
                <Download className={`w-3.5 h-3.5 ${theme.textMuted} group-hover:${theme.activeText} transition-colors`} />
                <span>{t('header.download_cv')}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>
            </div>

            {/* Email and Socials row */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full lg:w-auto">
              {/* Email link button */}
              <button
                onClick={handleCopyEmail}
                className={`flex-1 sm:flex-initial flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} font-mono text-[11px] sm:text-xs ${theme.textSecondary} hover:${theme.textPrimary} transition-colors cursor-pointer min-w-0`}
                title={t('header.copy_email')}
              >
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate max-w-[160px] xs:max-w-[200px] text-left">{personalInfo.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-500 shrink-0 ml-auto" /> : <Copy className="w-3 h-3 text-slate-500 opacity-60 shrink-0 ml-auto" />}
              </button>

              {/* Social Icons */}
              <div className="flex items-center gap-1.5 text-slate-400 text-sm shrink-0">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors flex items-center justify-center`}
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors flex items-center justify-center`}
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/${personalInfo.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-xl ${theme.bgSubCard} hover:${theme.textPrimary} border ${theme.borderSubCard} transition-colors flex items-center justify-center`}
                  title="WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Header Navigation Shortcut Bar - Prominent direct access to all 8 modules (PC & Mobile) */}
        {onSelectSection && (
          <div className={`mt-4 sm:mt-5 pt-3 sm:pt-4 border-t ${theme.borderCard}`}>
            <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                <Compass className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span>{t('header.nav_title')}</span>
              </div>
              
              {/* Quick Prev / Next jump buttons & scroll helper */}
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono ${theme.textMuted} hidden xs:inline`}>
                  {t('header.nav_hint')}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => prevHeaderSection && onSelectSection(prevHeaderSection.id)}
                    disabled={!prevHeaderSection}
                    className={`p-1.5 rounded-lg border font-mono text-xs transition-all ${
                      prevHeaderSection
                        ? `${theme.bgSubCard} hover:${theme.bgCardHover} ${theme.textPrimary} border ${theme.borderSubCard} cursor-pointer active:scale-95`
                        : `opacity-40 cursor-not-allowed bg-slate-800/20 border-slate-700/40 text-slate-500`
                    }`}
                    title={prevHeaderSection ? `${isPT ? 'Anterior:' : 'Previous:'} ${prevHeaderSection.label}` : ''}
                    aria-label="Módulo anterior"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => nextHeaderSection && onSelectSection(nextHeaderSection.id)}
                    disabled={!nextHeaderSection}
                    className={`p-1.5 rounded-lg border font-mono text-xs transition-all ${
                      nextHeaderSection
                        ? `${theme.activeBg} text-white border-transparent cursor-pointer active:scale-95 shadow-xs`
                        : `opacity-40 cursor-not-allowed bg-slate-800/20 border-slate-700/40 text-slate-500`
                    }`}
                    title={nextHeaderSection ? `${isPT ? 'Próximo:' : 'Next:'} ${nextHeaderSection.label}` : ''}
                    aria-label="Próximo módulo"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Tabs Container with Side Arrow Hints */}
            <div className="relative group">
              {/* Left Scroll Button (visible on hover or mobile) */}
              <button
                onClick={() => scrollHeader('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full ${theme.bgCard} shadow-md border ${theme.borderCard} ${theme.textPrimary} hover:scale-105 transition-all cursor-pointer hidden md:flex items-center justify-center opacity-0 group-hover:opacity-90 hover:opacity-100`}
                title="Rolar para esquerda"
                aria-label="Rolar abas para a esquerda"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <div 
                ref={headerScrollRef}
                className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
              >
                {headerSections.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      ref={(el) => { itemRefs.current[item.id] = el; }}
                      onClick={() => onSelectSection(item.id)}
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl font-mono text-xs transition-all duration-200 cursor-pointer min-h-[36px] ${
                        isActive
                          ? `${theme.activeBg} text-white font-bold shadow-md ring-2 ring-white/20`
                          : `${theme.bgSubCard} ${theme.textSecondary} hover:${theme.textPrimary} border ${theme.borderSubCard} hover:border-slate-500`
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : theme.textMuted}`} />
                      <span className="whitespace-nowrap font-medium">{item.label}</span>
                      <span className={`text-[10px] font-mono opacity-80 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {item.num}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Scroll Button (visible on hover or desktop) */}
              <button
                onClick={() => scrollHeader('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-1.5 rounded-full ${theme.bgCard} shadow-md border ${theme.borderCard} ${theme.textPrimary} hover:scale-105 transition-all cursor-pointer hidden md:flex items-center justify-center opacity-0 group-hover:opacity-90 hover:opacity-100`}
                title="Rolar para direita"
                aria-label="Rolar abas para a direita"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
