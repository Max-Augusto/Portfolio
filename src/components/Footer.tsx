import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#1e2433] bg-[#0c0e14] py-10 px-4 sm:px-6 font-mono text-xs text-slate-400 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top footer row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#1e2433]">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl bg-[#181d2a] border ${theme.activeBorder} flex items-center justify-center ${theme.activeText} font-bold text-xs shadow-sm`}>
              MA
            </div>
            <div>
              <div className="font-bold text-slate-200 tracking-tight">
                Max Augusto
              </div>
              <div className="text-[10px] text-slate-500">
                Support Analyst • Backend Engineer • DevOps &amp; Networks
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:${theme.activeText} hover:bg-[#1f2638] transition-all shadow-xs`}
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:${theme.activeText} hover:bg-[#1f2638] transition-all shadow-xs`}
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className={`p-2 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:${theme.activeText} hover:bg-[#1f2638] transition-all shadow-xs`}
              title="E-mail"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 border border-[#272f42] hover:${theme.activeBorder} transition-all cursor-pointer text-xs font-semibold`}
              title="Voltar ao topo"
            >
              <ArrowUp className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>TOPO</span>
            </button>
          </div>
        </div>

        {/* Bottom system telemetry info */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${theme.activeBg} animate-pulse`}></span>
            <span>SYSTEM CONSOLE: OPERATIONAL</span>
            <span>•</span>
            <span>UPTIME: 99.98%</span>
            <span>•</span>
            <span>NODE: BETIM-MG</span>
          </div>

          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Max Augusto. Portfolio Dark Edition.
          </div>
        </div>

      </div>
    </footer>
  );
};
