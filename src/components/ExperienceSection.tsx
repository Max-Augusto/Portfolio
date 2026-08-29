import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  Building2, 
  Plane, 
  Truck, 
  Landmark, 
  ChevronRight 
} from 'lucide-react';
import { getExperiences } from '../data/localizedData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.03,
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

export const ExperienceSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<string>('positivo-splus');
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const experiences = getExperiences(language);

  const getCompanyIcon = (id: string) => {
    switch (id) {
      case 'positivo-splus': return Plane;
      case 'betim-express': return Truck;
      case 'pref-betim': return Landmark;
      default: return Building2;
    }
  };

  const getBadgeStyle = (id: string) => {
    switch (id) {
      case 'positivo-splus': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30';
      case 'betim-express': return theme.activeTagBg;
      case 'pref-betim': return 'bg-amber-500/10 text-amber-500 border-amber-500/30';
      default: return `${theme.bgSubCard} ${theme.textSecondary} border ${theme.borderSubCard}`;
    }
  };

  return (
    <section id="experience" className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-colors duration-300`}>
      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b ${theme.borderCard}`}>
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>DEPLOYMENT_HISTORY // TIMELINE</span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
            <span>{isPT ? 'Experiência & Trajetória' : 'Experience & Track Record'}</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>
        <div className={`text-xs font-mono ${theme.textMuted} ${theme.bgSubCard} px-2.5 sm:px-3 py-1.5 rounded-xl border ${theme.borderSubCard} shadow-xs self-start sm:self-auto`}>
          <span>HIGH AVAILABILITY &amp; PROD SLA</span>
        </div>
      </div>

      {/* Timeline Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3.5 sm:space-y-4"
      >
        {experiences.map((exp) => {
          const Icon = getCompanyIcon(exp.id);
          const badgeStyle = getBadgeStyle(exp.id);
          const isExpanded = expandedExp === exp.id;

          return (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className={`${theme.bgSubCard} border transition-all duration-300 rounded-xl sm:rounded-2xl p-4 sm:p-6 relative overflow-hidden shadow-md ${
                isExpanded ? `${theme.activeBadgeBorder} ${theme.activeGlow}` : `${theme.borderSubCard} hover:border-slate-400`
              }`}
            >
              {/* Active Pulse indicator for ongoing jobs */}
              {exp.status === 'active' && (
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-500/10 text-emerald-500 text-[9px] sm:text-[10px] font-mono font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-bl-xl border-l border-b border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>{t('exp.active_tag')}</span>
                  </div>
                </div>
              )}

              {/* Header Info */}
              <div 
                className="cursor-pointer"
                onClick={() => setExpandedExp(isExpanded ? '' : exp.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl ${theme.bgCard} border ${theme.borderCard} flex items-center justify-center ${theme.activeText} shadow-xs shrink-0 mt-0.5`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badgeStyle}`}>
                          {exp.badge}
                        </span>
                        {exp.slaMetrics && (
                          <span className={`text-[9px] sm:text-[10px] font-mono ${theme.textMuted} ${theme.bgCard} px-2 py-0.5 rounded border ${theme.borderCard} hidden xs:inline`}>
                            SLA: {exp.slaMetrics}
                          </span>
                        )}
                      </div>

                      <h3 className={`text-base sm:text-xl font-bold ${theme.textPrimary} mt-1 flex flex-wrap items-center gap-1 sm:gap-2`}>
                        <span>{exp.company}</span>
                        <span className={`${theme.textMuted} font-normal text-xs sm:text-base`}>— {exp.role}</span>
                      </h3>

                      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] sm:text-xs font-mono ${theme.textMuted}`}>
                        <span className={`flex items-center gap-1 ${theme.activeText} font-medium`}>
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className={`flex items-center gap-1 ${theme.textMuted}`}>
                          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-center">
                    <button
                      className={`p-1.5 rounded-lg ${theme.bgCard} ${theme.textMuted} hover:${theme.textPrimary} transition-colors cursor-pointer border ${theme.borderCard}`}
                      aria-label="Expandir detalhes"
                    >
                      <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isExpanded ? `rotate-90 ${theme.activeText}` : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className={`mt-4 sm:mt-5 pt-4 sm:pt-5 border-t ${theme.borderCard} space-y-3 sm:space-y-4 animate-fadeIn`}>
                  <div>
                    <h4 className={`text-[11px] sm:text-xs font-mono uppercase ${theme.textPrimary} font-bold tracking-wider mb-2 flex items-center gap-1.5`}>
                      <Activity className={`w-3.5 h-3.5 ${theme.activeText}`} />
                      <span>{t('exp.highlights_title')}:</span>
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className={`text-xs sm:text-sm ${theme.textSecondary} flex items-start gap-2 leading-relaxed`}>
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack used in this position */}
                  <div className="pt-1">
                    <div className={`text-[10px] sm:text-[11px] font-mono uppercase ${theme.textMuted} font-medium mb-1.5`}>
                      {t('exp.tech_title')}:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, tIdx) => (
                        <TechBadge key={tIdx} tech={tech} size="sm" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
