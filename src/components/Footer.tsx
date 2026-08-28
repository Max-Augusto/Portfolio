import React from 'react';
import { 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  Heart, 
  Activity, 
  ArrowUp,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1e293b] bg-[#0a0f1d] py-10 px-4 sm:px-6 font-mono text-xs text-[#94a3b8]">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#1e293b]/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0f172a] border border-[#10b981]/40 flex items-center justify-center text-[#10b981] font-bold text-xs">
              MA
            </div>
            <div>
              <div className="font-bold text-[#f8fafc] tracking-tight">
                Max Augusto
              </div>
              <div className="text-[10px] text-[#64748b]">
                Support Analyst • Backend Engineer • DevOps & Networks Enthusiast
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#10b981] hover:border-[#10b981]/40 transition-all"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#06b6d4] hover:border-[#06b6d4]/40 transition-all"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#f59e0b] hover:border-[#f59e0b]/40 transition-all"
              title="E-mail"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] transition-all cursor-pointer text-xs"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>TOPO</span>
            </button>
          </div>
        </div>

        {/* Bottom system telemetry info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span>SYSTEM CONSOLE: OPERATIONAL</span>
            <span>•</span>
            <span>UPTIME: 99.98%</span>
            <span>•</span>
            <span>NODE: BETIM-MG</span>
          </div>

          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Max Augusto. Desenvolvido com React, TypeScript & Tailwind CSS.
          </div>
        </div>

      </div>
    </footer>
  );
};
