import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Terminal as TerminalIcon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const OperatorHeader: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [latency, setLatency] = useState<number>(24);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      // Formatted for GMT-3 (Brazil / São Paulo / Betim)
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
    
    // Simulate slight natural latency fluctuation
    const pingInterval = setInterval(() => {
      setLatency(Math.floor(18 + Math.random() * 12));
    }, 4000);

    return () => {
      clearInterval(interval);
      clearInterval(pingInterval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b] bg-[#0a0f1d]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 font-mono text-[11px] tracking-wider text-[#94a3b8] uppercase select-none transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
        {/* Left Status Nodes */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            title="Clique para alternar status do operador"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-[#10b981] shadow-[0_0_8px_#10b981]' : 'bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]'} animate-pulse`}></span>
            <span className="group-hover:text-[#f8fafc] transition-colors">
              STATUS: <strong className={isAvailable ? 'text-[#10b981]' : 'text-[#f59e0b]'}>{isAvailable ? 'AVAILABLE / DISPONÍVEL' : 'IN WORKFLOW'}</strong>
            </span>
          </button>

          <span className="hidden sm:inline text-[#334155]">|</span>

          <span className="flex items-center gap-1.5 text-[#cbd5e1]">
            <span className="text-[#06b6d4]">TZ:</span> GMT-3 [Betim/BR]
            <span className="text-[#10b981] font-semibold tracking-normal ml-1">
              {currentTime ? `${currentTime} BRT` : '12:00:00 BRT'}
            </span>
          </span>

          <span className="hidden md:inline text-[#334155]">|</span>

          <span className="hidden md:flex items-center gap-1 text-[#94a3b8]">
            <span>HOST:</span> <span className="text-[#f8fafc]">MAX-SRE-V2</span>
          </span>
        </div>

        {/* Right Status Nodes */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 ml-auto">
          <span className="hidden lg:flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-[#06b6d4]" />
            <span>PING:</span> <span className="text-[#06b6d4]">{latency}ms</span>
          </span>

          <span className="hidden sm:inline text-[#334155]">|</span>

          <span className="flex items-center gap-1">
            <span>UPTIME:</span> <span className="text-[#10b981] font-semibold">{PERSONAL_INFO.stats.uptimeMetric}</span>
          </span>

          <span className="hidden sm:inline text-[#334155]">|</span>

          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f59e0b]" />
            <span className="text-[#f59e0b] font-semibold">SEC_LEVEL: ALPHA</span>
          </span>

          <a 
            href="#terminal"
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#1e293b]/70 border border-[#334155] text-[#10b981] hover:bg-[#1e293b] hover:border-[#10b981] transition-all ml-1"
          >
            <TerminalIcon className="w-3 h-3" />
            <span>CLI</span>
          </a>
        </div>
      </div>
    </header>
  );
};
