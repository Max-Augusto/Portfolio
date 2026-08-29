import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Network, 
  CloudLightning, 
  Cpu
} from 'lucide-react';
import { getSkillCategories } from '../data/localizedData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.03,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.18 },
  },
};

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const skillCategories = getSkillCategories(language);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Code2': return Code2;
      case 'Network': return Network;
      case 'CloudLightning': return CloudLightning;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-colors duration-300`}>
      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b ${theme.borderCard}`}>
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>CAPABILITY_INDEX // TECH_STACK</span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
            <span>{isPT ? 'Habilidades & Tecnologias' : 'Skills & Capabilities'}</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        <div className={`text-xs font-mono ${theme.textMuted} ${theme.bgSubCard} px-2.5 sm:px-3 py-1.5 rounded-xl border ${theme.borderSubCard} shadow-xs self-start sm:self-auto`}>
          <span>VERIFIED SYS_STACK v2.6</span>
        </div>
      </div>

      {/* Category selector pills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        {skillCategories.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon);
          const isSelected = activeCategoryIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer shadow-xs min-h-[56px] ${
                isSelected
                  ? `${theme.bgSubCard} ${theme.activeBadgeBorder} ${theme.activeGlow} ${theme.textPrimary}`
                  : `${theme.bgSubCard}/60 ${theme.borderSubCard} ${theme.textMuted} hover:${theme.bgSubCard} hover:border-slate-400 hover:${theme.textPrimary}`
              }`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className={`p-2 sm:p-2.5 rounded-xl ${isSelected ? theme.activeTagBg : `${theme.bgCard} ${theme.textMuted}`}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold">
                    {cat.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 font-medium">
                    {cat.skills.length} {t('skills.modules_mapped')}
                  </div>
                </div>
              </div>

              {isSelected && (
                <span className={`w-2 h-2 rounded-full ${theme.activeBg} shadow-xs`}></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected category skills cards with Stagger Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategoryIndex}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4"
        >
          {skillCategories[activeCategoryIndex].skills.map((skill, sIdx) => (
            <motion.div
              key={sIdx}
              variants={cardVariants}
              className={`${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xs group`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className={`text-sm sm:text-base font-bold ${theme.textPrimary} group-hover:${theme.activeText} transition-colors`}>
                    {skill.name}
                  </h4>
                  <span className={`text-[9px] sm:text-[10px] font-mono font-bold px-2 py-0.5 rounded ${theme.bgCard} ${theme.activeText} border ${theme.activeBorder}`}>
                    {skill.level}
                  </span>
                </div>

                <p className={`text-xs ${theme.textSecondary} leading-relaxed mb-3 sm:mb-4 font-normal`}>
                  {skill.description}
                </p>
              </div>

              <div className={`flex flex-wrap gap-1.5 pt-3 border-t ${theme.borderCard}`}>
                {skill.tags.map((tag, tIdx) => (
                  <TechBadge key={tIdx} tech={tag} size="sm" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
