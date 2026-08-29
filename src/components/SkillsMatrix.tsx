import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Network, 
  CloudLightning, 
  Cpu
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Code2': return Code2;
      case 'Network': return Network;
      case 'CloudLightning': return CloudLightning;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-9 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>CAPABILITY_INDEX // TECH_STACK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>Skills &amp; Capabilities</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-400 bg-[#181d2a] px-3 py-1.5 rounded-xl border border-[#272f42] shadow-sm">
          <span>VERIFIED SYS_STACK v2.6</span>
        </div>
      </div>

      {/* Category selector pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = getCategoryIcon(cat.icon);
          const isSelected = activeCategoryIndex === idx;

          return (
            <button
              key={idx}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between cursor-pointer shadow-md ${
                isSelected
                  ? `bg-[#181d2a] ${theme.activeBadgeBorder} ${theme.activeGlow} text-slate-100`
                  : 'bg-[#181d2a]/50 border-[#242b3d] text-slate-400 hover:bg-[#181d2a] hover:border-slate-600 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${isSelected ? theme.activeTagBg : 'bg-[#121620] text-slate-500'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold">
                    {cat.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 font-medium">
                    {cat.skills.length} módulos mapeados
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill, sIdx) => (
            <motion.div
              key={sIdx}
              variants={cardVariants}
              className="bg-[#181d2a] border border-[#242b3d] hover:border-slate-600 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 shadow-md group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h4 className={`text-base font-bold text-slate-100 group-hover:${theme.activeText} transition-colors`}>
                    {skill.name}
                  </h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#121620] ${theme.activeText} border ${theme.activeBorder}`}>
                    {skill.level}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4 font-normal">
                  {skill.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1e2433]">
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
