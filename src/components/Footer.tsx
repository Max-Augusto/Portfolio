import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUp
} from 'lucide-react';
import { getPersonalInfo } from '../data/localizedData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t ${theme.borderCard} ${theme.bgCard} py-8 sm:py-10 px-4 sm:px-6 font-mono text-xs ${theme.textMuted} mt-12 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Top footer row */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b ${theme.borderCard}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl ${theme.bgSubCard} border ${theme.activeBorder} flex items-center justify-center ${theme.activeText} font-bold text-xs shadow-xs`}>
              MA
            </div>
            <div>
              <div className={`font-bold ${theme.textPrimary} tracking-tight`}>
                Max Augusto
              </div>
              <div className={`text-[10px] ${theme.textMuted}`}>
                {isPT ? 'Suporte N2 • Engenheiro Backend • DevOps & Redes' : 'Tier 2 Support • Backend Engineer • DevOps & Networks'}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textMuted} hover:${theme.activeText} hover:${theme.bgCard} transition-all shadow-xs`}
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textMuted} hover:${theme.activeText} hover:${theme.bgCard} transition-all shadow-xs`}
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className={`p-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textMuted} hover:${theme.activeText} hover:${theme.bgCard} transition-all shadow-xs`}
              title="E-mail"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textPrimary} border ${theme.borderSubCard} hover:${theme.activeBorder} transition-all cursor-pointer text-xs font-semibold`}
              title="Voltar ao topo"
            >
              <ArrowUp className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>{isPT ? 'TOPO' : 'TOP'}</span>
            </button>
          </div>
        </div>

        {/* Bottom system telemetry info */}
        <div className={`flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] ${theme.textMuted}`}>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${theme.activeBg} animate-pulse`}></span>
            <span>SYSTEM CONSOLE: OPERATIONAL</span>
            <span>•</span>
            <span>UPTIME: 99.98%</span>
            <span>•</span>
            <span>NODE: BETIM-MG</span>
          </div>

          <div className="text-center md:text-right">
            © {new Date().getFullYear()} Max Augusto. Systems & Infrastructure.
          </div>
        </div>

      </div>
    </footer>
  );
};
