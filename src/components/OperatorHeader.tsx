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
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-2.5 font-mono text-[11px] tracking-wider text-slate-600 uppercase select-none transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2">
        {/* Left Status Nodes */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
          <button 
            onClick={() => setIsAvailable(!isAvailable)}
            title="Clique para alternar status do operador"
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-500 shadow-xs' : 'bg-amber-500 shadow-xs'} animate-pulse`}></span>
            <span className="group-hover:text-slate-900 transition-colors">
              STATUS: <strong className={isAvailable ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{isAvailable ? 'AVAILABLE / DISPONÍVEL' : 'IN WORKFLOW'}</strong>
            </span>
          </button>

          <span className="hidden sm:inline text-slate-300">|</span>

          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="text-blue-600 font-semibold">TZ:</span> GMT-3 [Betim/BR]
            <span className="text-slate-900 font-bold tracking-normal ml-1 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
              {currentTime ? `${currentTime} BRT` : '12:00:00 BRT'}
            </span>
          </span>

          <span className="hidden md:inline text-slate-300">|</span>

          <span className="hidden md:flex items-center gap-1 text-slate-600">
            <span>NODE:</span> <span className="text-slate-900 font-semibold">MAX-INFRA-V2</span>
          </span>
        </div>

        {/* Right Status Nodes */}
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1 ml-auto">
          <span className="hidden lg:flex items-center gap-1 text-slate-600">
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>PING:</span> <span className="text-blue-700 font-semibold">{latency}ms</span>
          </span>

          <span className="hidden sm:inline text-slate-300">|</span>

          <span className="flex items-center gap-1 text-slate-600">
            <span>UPTIME:</span> <span className="text-emerald-700 font-bold">{PERSONAL_INFO.stats.uptimeMetric}</span>
          </span>

          <span className="hidden sm:inline text-slate-300">|</span>

          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span className="text-amber-700 font-semibold">SEC_LEVEL: ALPHA</span>
          </span>

          <a 
            href="#terminal"
            className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 hover:bg-slate-200 hover:text-blue-700 transition-all ml-1 font-semibold"
          >
            <TerminalIcon className="w-3 h-3 text-slate-700" />
            <span>CLI</span>
          </a>
        </div>
      </div>
    </header>
  );
};
