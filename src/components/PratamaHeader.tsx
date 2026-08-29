import React, { useState, useEffect } from 'react';
import { 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Phone, 
  ChevronDown, 
  Copy, 
  Check,
  Command,
  Activity,
  Palette
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme, AccentColor } from '../context/ThemeContext';

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
  const { theme, accentColor, setAccentColor } = useTheme();

  const colorSwatches: { id: AccentColor; label: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', bg: 'bg-[#f43f5e]' },
  ];

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat('pt-BR', options).format(now));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <header className="w-full max-w-7xl mx-auto px-3 sm:px-6 pt-3 sm:pt-6 pb-2">
      {/* Pratama Master Console Box */}
      <div className="bg-[#121620] border border-[#1e2433] rounded-2xl sm:rounded-3xl p-4 sm:p-7 relative overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Top Console Bar */}
        <div className="flex items-center justify-between pb-3 sm:pb-5 border-b border-[#1e2433]/70 mb-4 sm:mb-6 gap-2">
          {/* macOS Terminal Dots & Live Operational Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
            </div>

            {/* Live Operational Status Indicator */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-[#161b26] border border-[#232a3d] text-[10px] sm:text-[11px] font-mono text-slate-300 shadow-xs">
              <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">SISTEMAS OPERACIONAIS</span>
              <span className="text-slate-600 hidden xs:inline">|</span>
              <span className="text-emerald-400 font-semibold hidden xs:flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                99.9% UPTIME
              </span>
            </div>
          </div>

          {/* Right Controls: Color Palette Switcher + Command Palette trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Direct Theme Switcher (Available and prominent on all screens) */}
            <div className="flex items-center gap-1 bg-[#161b26] p-1 rounded-xl border border-[#232a3d] shadow-inner" title="Mudar Paleta de Cores">
              {colorSwatches.map((swatch) => {
                const isSelected = accentColor === swatch.id;
                return (
                  <button
                    key={swatch.id}
                    onClick={() => setAccentColor(swatch.id)}
                    className={`relative w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${swatch.bg} flex items-center justify-center transition-all cursor-pointer ${
                      isSelected
                        ? 'scale-110 ring-2 ring-white/90 ring-offset-1 ring-offset-[#121620] shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={`Mudar tema para ${swatch.label}`}
                    aria-label={`Tema ${swatch.label}`}
                  >
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-white drop-shadow-md stroke-[3]" />
                    )}
                  </button>
                );
              })}
            </div>

            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                title="Abrir Command Palette (Ctrl+K ou ⌘K)"
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-xl bg-[#181d2a] hover:bg-[#202738] border border-[#272f42] hover:border-slate-500 text-slate-300 font-mono text-xs cursor-pointer transition-all shadow-xs group min-h-[32px]"
              >
                <Command className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span className="text-slate-300 group-hover:text-white hidden sm:inline">Buscar</span>
                <kbd className="text-[10px] bg-[#121620] px-1.5 py-0.5 rounded border border-[#272f42] text-slate-400 font-bold hidden xs:inline-block">
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
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#181d2a] border-2 ${theme.avatarBorder} p-1 overflow-hidden shadow-md transition-colors duration-300`}>
                <img 
                  src={PERSONAL_INFO.avatarUrl} 
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent && !parent.querySelector('.fallback-initials')) {
                      const fallback = document.createElement('div');
                      fallback.className = 'fallback-initials w-full h-full rounded-xl bg-[#1c2230] flex items-center justify-center text-xl font-bold font-mono text-slate-200';
                      fallback.innerText = 'MA';
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
            </div>

            {/* Name & Role */}
            <div className="min-w-0">
              <h1 className="text-xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-1.5 truncate">
                <span>Max</span>
                <span className="text-slate-300 font-normal">Augusto</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-normal mt-0.5 truncate">
                Support Analyst &amp; SRE / Backend
              </p>
              <div className="text-[11px] sm:text-xs font-mono text-slate-500 mt-1 flex items-center gap-2">
                <span>operator/01</span>
                <span>•</span>
                <span className={`${theme.activeText} truncate`}>puc-minas</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold truncate hidden xs:inline">Positivo S+</span>
              </div>
            </div>
          </div>

          {/* Middle Column: System Status (3 cols) */}
          <div className="lg:col-span-3 bg-[#181d2a]/60 sm:bg-transparent p-2.5 sm:p-0 rounded-xl sm:rounded-none lg:border-l lg:border-[#1e2433] lg:pl-6 grid grid-cols-3 sm:flex sm:flex-col gap-2 sm:space-y-1.5 font-mono text-xs text-slate-400">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 font-semibold hidden sm:block mb-2">
              SYSTEM STATUS
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">status:</span>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className="flex items-center gap-1 cursor-pointer text-slate-200 hover:text-emerald-400 transition-colors focus:outline-none"
              >
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'} animate-pulse shrink-0`}></span>
                <span className={`text-[11px] sm:text-xs truncate ${isAvailable ? 'text-emerald-400 font-medium' : 'text-amber-400'}`}>
                  {isAvailable ? 'disponível' : 'em plantão'}
                </span>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">local/tz:</span>
              <span className="text-slate-300 font-medium text-[11px] sm:text-xs truncate">
                Pampulha {currentTime ? `(${currentTime})` : '(GMT-3)'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <span className="text-slate-500 text-[10px] sm:text-xs sm:w-20">resposta:</span>
              <span className="text-slate-300 font-medium text-[11px] sm:text-xs">&lt;24h SLA</span>
            </div>
          </div>

          {/* Right Column: Download CV & Social Links (4 cols) */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-2.5 sm:gap-3.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1e2433]">
            {/* Download CV button */}
            <div className="flex items-center w-full lg:w-auto">
              <button
                onClick={onOpenResume}
                className="w-full sm:w-auto flex-1 lg:flex-initial flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 border border-[#272f42] hover:border-[#38435d] text-xs font-mono font-medium transition-all shadow-sm group cursor-pointer min-h-[42px]"
              >
                <Download className={`w-3.5 h-3.5 text-slate-400 group-hover:${theme.activeText} transition-colors`} />
                <span>Ver / Baixar Currículo</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>
            </div>

            {/* Email and Socials row */}
            <div className="flex items-center justify-between sm:justify-end gap-3 w-full lg:w-auto">
              {/* Email link */}
              <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs text-slate-400 hover:text-slate-200 transition-colors truncate">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <button
                  onClick={handleCopyEmail}
                  className="hover:underline cursor-pointer flex items-center gap-1 focus:outline-none truncate"
                  title="Clique para copiar e-mail"
                >
                  <span className="truncate max-w-[150px] xs:max-w-[200px]">{PERSONAL_INFO.email}</span>
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400 shrink-0" /> : <Copy className="w-3 h-3 text-slate-600 opacity-60 shrink-0" />}
                </button>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 text-slate-400 text-sm shrink-0">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#181d2a] hover:text-slate-100 border border-[#242b3d] transition-colors"
                  title="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#181d2a] hover:text-slate-100 border border-[#242b3d] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-[#181d2a] hover:text-slate-100 border border-[#242b3d] transition-colors"
                  title="WhatsApp"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};
