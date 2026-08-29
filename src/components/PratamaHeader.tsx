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
  Activity
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

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
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
      {/* Pratama Master Console Box */}
      <div className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-7 relative overflow-hidden shadow-2xl transition-all duration-300">
        
        {/* Top Console Bar */}
        <div className="flex items-center justify-between pb-5 border-b border-[#1e2433]/70 mb-6">
          {/* macOS Terminal Dots & Live Operational Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block shadow-sm"></span>
            </div>

            {/* Live Operational Status Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#161b26] border border-[#232a3d] text-[11px] font-mono text-slate-300 shadow-xs">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>SISTEMAS OPERACIONAIS</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                99.9% UPTIME
              </span>
            </div>
          </div>

          {/* Right Controls: Command Palette trigger & active theme badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            {onOpenCommandPalette && (
              <button
                onClick={onOpenCommandPalette}
                title="Abrir Command Palette (Ctrl+K ou ⌘K)"
                className="flex items-center gap-2 px-3 py-1 rounded-xl bg-[#181d2a] hover:bg-[#202738] border border-[#272f42] hover:border-slate-500 text-slate-300 font-mono text-xs cursor-pointer transition-all shadow-xs group"
              >
                <Command className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span className="text-slate-300 group-hover:text-white">Buscar</span>
                <kbd className="text-[10px] bg-[#121620] px-1.5 py-0.5 rounded border border-[#272f42] text-slate-400 font-bold">
                  ⌘K
                </kbd>
              </button>
            )}

            <span className="font-mono text-xs text-slate-500 tracking-wider hidden md:inline-block">
              operator console
            </span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${theme.activeTagBg} uppercase tracking-wider font-semibold hidden sm:inline-block`}>
              THEME: {theme.label}
            </span>
          </div>
        </div>

        {/* Main Content Grid: Identity | Status | Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Identity & Avatar (5 cols) */}
          <div className="lg:col-span-5 flex items-center gap-4 sm:gap-5">
            {/* Pratama Avatar Frame with dynamic theme border */}
            <div className="relative shrink-0">
              <div className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-[#181d2a] border-2 ${theme.avatarBorder} p-1 overflow-hidden shadow-md transition-colors duration-300`}>
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
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center gap-1">
                <span>Max</span>
                <span className="text-slate-300 font-normal">Augusto</span>
              </h1>
              <p className="text-sm text-slate-400 font-normal mt-0.5">
                Support Analyst &amp; SRE / Backend
              </p>
              <div className="text-xs font-mono text-slate-500 mt-1 flex items-center gap-2">
                <span>operator/01</span>
                <span>•</span>
                <span className={theme.activeText}>puc-minas</span>
              </div>
            </div>
          </div>

          {/* Middle Column: System Status (3 cols) */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#1e2433] lg:pl-6 space-y-1.5 font-mono text-xs text-slate-400">
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-2">
              SYSTEM STATUS
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-500 w-20">status :</span>
              <button 
                onClick={() => setIsAvailable(!isAvailable)}
                className="flex items-center gap-1.5 cursor-pointer text-slate-200 hover:text-emerald-400 transition-colors focus:outline-none"
              >
                <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500'} animate-pulse`}></span>
                <span className={isAvailable ? 'text-emerald-400 font-medium' : 'text-amber-400'}>
                  {isAvailable ? 'available' : 'in workflow'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 w-20">tz :</span>
              <span className="text-slate-300 font-medium">GMT-3</span>
              {currentTime && (
                <span className="text-[10px] text-slate-500">({currentTime})</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-500 w-20">response :</span>
              <span className="text-slate-300 font-medium">&lt;24h</span>
            </div>
          </div>

          {/* Right Column: Download CV & Social Links (4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3.5">
            {/* Download CV button */}
            <div className="flex items-center w-full lg:w-auto">
              <button
                onClick={onOpenResume}
                className="flex-1 lg:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 border border-[#272f42] hover:border-[#38435d] text-xs font-mono font-medium transition-all shadow-sm group cursor-pointer"
              >
                <Download className={`w-3.5 h-3.5 text-slate-400 group-hover:${theme.activeText} transition-colors`} />
                <span>Download CV</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </button>
            </div>

            {/* Email link */}
            <div className="flex items-center gap-2 font-mono text-xs text-slate-400 hover:text-slate-200 transition-colors">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              <button
                onClick={handleCopyEmail}
                className="hover:underline cursor-pointer flex items-center gap-1.5 focus:outline-none"
                title="Clique para copiar e-mail"
              >
                <span>{PERSONAL_INFO.email}</span>
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-600 opacity-60" />}
              </button>
            </div>

            {/* Social Icons row */}
            <div className="flex items-center gap-4 text-slate-400 text-sm pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-100 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-100 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-100 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </header>
  );
};
