import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Download, 
  Send, 
  Copy, 
  Check, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { getPersonalInfo } from '../data/localizedData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface AboutMeCardProps {
  onOpenResume: () => void;
  onNavigateToContact?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AboutMeCard: React.FC<AboutMeCardProps> = ({ onOpenResume, onNavigateToContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.div 
      id="about" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl relative overflow-hidden transition-colors duration-300`}
    >
      
      {/* Heading with dot (Pratama signature: About Me.) */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
          <span>{isPT ? 'Sobre Mim' : 'About Me'}</span>
          <span className={theme.activeText}>.</span>
        </h2>
        
        {/* Accent Bar: Dynamic theme gradient line */}
        <div className="flex items-center gap-1 mt-2.5 sm:mt-3">
          <div className={`h-1 sm:h-1.5 w-8 sm:w-10 rounded-full ${theme.activeBg}`}></div>
          <div className={`h-1 sm:h-1.5 w-5 sm:w-6 rounded-full ${theme.bgSubCard}`}></div>
        </div>

        {/* Metadata sub-headline line with diamond bullet */}
        <div className={`mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-mono ${theme.textMuted}`}>
          <span className={theme.activeText}>◆</span>
          <span>{isPT ? 'Suporte N2 & Redes LAN' : 'Tier 2 Support & Enterprise Networks'}</span>
          <span className="text-slate-400">·</span>
          <span>Python &amp; Django / .NET 10</span>
          <span className="text-slate-400 hidden xs:inline">·</span>
          <span className="hidden xs:inline">Betim / BH, BR</span>
          <span className="text-slate-400 hidden sm:inline">·</span>
          <span className="hidden sm:inline">{isPT ? '2+ anos exp TI' : '2+ yrs IT Exp'}</span>
        </div>
      </motion.div>

      {/* Key Metrics / Highlights Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-5 sm:my-6">
        <div className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between`}>
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{isPT ? 'DISPONIBILIDADE' : 'UPTIME SLA'}</div>
          <div className={`text-base sm:text-lg font-bold ${theme.textPrimary} font-mono mt-1`}>99.9%</div>
          <div className="text-[10px] text-emerald-500 font-mono font-semibold">{isPT ? 'Operações Críticas' : 'Mission Critical'}</div>
        </div>

        <div className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between`}>
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{isPT ? 'SAAS EM PRODUÇÃO' : 'PRODUCTION SAAS'}</div>
          <div className={`text-base sm:text-lg font-bold ${theme.textPrimary} font-mono mt-1`}>1 SaaS Live</div>
          <div className={`text-[10px] ${theme.activeText} font-mono font-semibold`}>Betim Express</div>
        </div>

        <div className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between`}>
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{isPT ? 'ESPECIALIDADE' : 'CORE FOCUS'}</div>
          <div className={`text-base sm:text-lg font-bold ${theme.textPrimary} font-mono mt-1`}>N2 + Django</div>
          <div className={`text-[10px] ${theme.textMuted} font-mono`}>Hardware &amp; API</div>
        </div>

        <div className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between`}>
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{isPT ? 'FORMAÇÃO' : 'EDUCATION'}</div>
          <div className={`text-base sm:text-lg font-bold ${theme.textPrimary} font-mono mt-1`}>Sist. Inform.</div>
          <div className="text-[10px] text-amber-500 font-mono font-semibold">PUC Minas</div>
        </div>
      </motion.div>

      {/* Main Paragraphs */}
      <motion.div variants={itemVariants} className={`space-y-3 sm:space-y-4 ${theme.textSecondary} text-xs sm:text-sm md:text-base leading-relaxed`}>
        <p>
          {t('about.p1')}
        </p>

        <p>
          {t('about.p2')}
        </p>

        <p>
          {t('about.p3')} {' '}
          <a 
            href="https://www.betimexpress.com.br" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${theme.activeText} underline underline-offset-4 hover:opacity-80 font-medium inline-flex items-center gap-0.5`}
          >
            Betim Express <ArrowUpRight className="w-3.5 h-3.5 inline" />
          </a>
        </p>
      </motion.div>

      {/* Academic & Cisco Certification Badges */}
      <motion.div variants={itemVariants} className={`grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t ${theme.borderCard}`}>
        <div className={`${theme.bgSubCard} p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border ${theme.borderSubCard} flex items-center gap-3`}>
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${theme.activeTagBg} flex items-center justify-center shrink-0`}>
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{t('about.education_title')}</div>
            <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary}`}>{personalInfo.education.degree}</div>
            <div className={`text-[10px] sm:text-[11px] font-mono ${theme.textMuted} mt-0.5`}>PUC Minas · {personalInfo.education.period} ({personalInfo.education.status})</div>
          </div>
        </div>

        <div className={`${theme.bgSubCard} p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border ${theme.borderSubCard} flex items-center gap-3`}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">{t('about.cert_title')}</div>
            <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary}`}>Introduction to Cybersecurity</div>
            <div className={`text-[10px] sm:text-[11px] font-mono ${theme.textMuted} mt-0.5`}>Cisco Networking Academy · {t('about.cert_badge')}</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div variants={itemVariants} className={`mt-5 sm:mt-7 pt-4 sm:pt-5 border-t ${theme.borderCard} flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3`}>
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenResume}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-mono text-xs font-semibold transition-all shadow-md cursor-pointer min-h-[44px]`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t('about.cta_resume').toUpperCase()}</span>
          </button>

          {onNavigateToContact ? (
            <button
              onClick={onNavigateToContact}
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textPrimary} font-mono text-xs font-semibold border ${theme.borderSubCard} hover:border-slate-400 transition-all cursor-pointer shadow-xs min-h-[44px]`}
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>{t('about.cta_contact').toUpperCase()}</span>
            </button>
          ) : (
            <a
              href="#contact"
              className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textPrimary} font-mono text-xs font-semibold border ${theme.borderSubCard} hover:border-slate-400 transition-all cursor-pointer shadow-xs min-h-[44px]`}
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>{t('about.cta_contact').toUpperCase()}</span>
            </a>
          )}
        </div>

        <button
          onClick={handleCopyEmail}
          className={`flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textSecondary} font-mono text-xs border ${theme.borderSubCard} hover:border-slate-400 transition-all cursor-pointer shadow-xs min-h-[44px] w-full sm:w-auto`}
          title={t('header.copy_email')}
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
          <span className="font-medium truncate">{copiedEmail ? t('header.copied') : personalInfo.email}</span>
        </button>
      </motion.div>

    </motion.div>
  );
};
