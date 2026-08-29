import React from 'react';
import { motion } from 'motion/react';
import { 
  Network, 
  Server, 
  Cloud, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Cpu
} from 'lucide-react';
import { getWhatIDo } from '../data/localizedData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const WhatIDoSection: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const whatIDoItems = getWhatIDo(language);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Network': return Network;
      case 'Server': return Server;
      case 'Cloud': return Cloud;
      case 'ShieldCheck': return ShieldCheck;
      default: return Cpu;
    }
  };

  const getAccentColor = (id: string) => {
    switch (id) {
      case 'backend-saas': return { text: theme.activeText, border: theme.activeBadgeBorder, bg: theme.activeTagBg, hover: `hover:${theme.activeBadgeBorder}` };
      case 'infra-networks': return { text: 'text-emerald-500', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30', hover: 'hover:border-emerald-500/50' };
      case 'devops-cloud': return { text: 'text-amber-500', border: 'border-amber-500/30', bg: 'bg-amber-500/10 text-amber-500 border-amber-500/30', hover: 'hover:border-amber-500/50' };
      case 'security-governance': return { text: 'text-rose-500', border: 'border-rose-500/30', bg: 'bg-rose-500/10 text-rose-500 border-rose-500/30', hover: 'hover:border-rose-500/50' };
      default: return { text: theme.activeText, border: theme.activeBorder, bg: theme.activeTagBg, hover: `hover:${theme.activeBorder}` };
    }
  };

  return (
    <section id="what-i-do" className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-colors duration-300`}>
      {/* Section Title */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b ${theme.borderCard}`}>
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>SYSTEM_ARCHITECTURE // PILLARS</span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
            <span>{isPT ? 'O Que Faço' : 'What I Do'}</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>
        <div className={`text-xs font-mono ${theme.textMuted} ${theme.bgSubCard} px-2.5 sm:px-3 py-1.5 rounded-xl border ${theme.borderSubCard} shadow-xs self-start sm:self-auto`}>
          <span>4 CORE PILLARS • 360° VISIBILITY</span>
        </div>
      </div>

      {/* 4-Pillar Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5"
      >
        {whatIDoItems.map((item, index) => {
          const Icon = getIcon(item.iconName);
          const accent = getAccentColor(item.id);

          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md ${accent.hover}`}
            >
              {/* Card index indicator */}
              <div className="absolute top-3.5 right-4 font-mono text-[11px] sm:text-xs font-bold text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                MODULE_0{index + 1}
              </div>

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${theme.bgCard} border ${accent.border} flex items-center justify-center ${accent.text} shadow-xs group-hover:scale-105 transition-transform shrink-0`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${accent.bg} ${accent.text} border ${accent.border}`}>
                      {item.badge}
                    </span>
                    <h3 className={`text-sm sm:text-base md:text-lg font-bold ${theme.textPrimary} mt-0.5 group-hover:${theme.activeText} transition-colors`}>
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className={`text-[11px] sm:text-xs font-mono ${theme.textMuted} mb-2.5 font-medium`}>
                  {item.subtitle}
                </div>

                <p className={`text-xs sm:text-sm ${theme.textSecondary} leading-relaxed mb-4 sm:mb-5 font-normal`}>
                  {item.description}
                </p>

                {/* Technical Specifications list */}
                <div className={`${theme.bgCard} rounded-xl p-3 sm:p-4 border ${theme.borderCard} mb-4 sm:mb-5`}>
                  <div className={`text-[10px] sm:text-[11px] font-mono uppercase ${theme.textPrimary} font-bold mb-2 flex items-center gap-1.5`}>
                    <Activity className={`w-3.5 h-3.5 ${accent.text}`} />
                    <span>{t('what_i_do.spec_title')}:</span>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className={`text-[11px] sm:text-xs ${theme.textSecondary} flex items-start gap-2 leading-relaxed`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags footer */}
              <div className={`pt-3 border-t ${theme.borderCard} flex flex-wrap gap-1.5`}>
                {item.tags.map((tag, tIdx) => (
                  <TechBadge key={tIdx} tech={tag} size="sm" />
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
