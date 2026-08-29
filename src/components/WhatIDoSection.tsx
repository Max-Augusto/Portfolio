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
import { WHAT_I_DO } from '../data/portfolioData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

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
      case 'infra-networks': return { text: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', hover: 'hover:border-emerald-500/50' };
      case 'backend-saas': return { text: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10', hover: 'hover:border-blue-500/50' };
      case 'devops-cloud': return { text: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', hover: 'hover:border-amber-500/50' };
      case 'incident-itil': return { text: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10', hover: 'hover:border-rose-500/50' };
      default: return { text: theme.activeText, border: theme.activeBorder, bg: 'bg-cyan-500/10', hover: 'hover:border-cyan-500/50' };
    }
  };

  return (
    <section id="what-i-do" className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-9 shadow-xl">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>SYSTEM_ARCHITECTURE // PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>What I'm Doing</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-[#181d2a] px-3 py-1.5 rounded-xl border border-[#272f42] shadow-sm">
          <span>4 CORE PILLARS • END-TO-END VISIBILITY</span>
        </div>
      </div>

      {/* 4-Pillar Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5"
      >
        {WHAT_I_DO.map((item, index) => {
          const Icon = getIcon(item.iconName);
          const accent = getAccentColor(item.id);

          return (
            <motion.div
              key={item.id}
              variants={cardVariants}
              className={`bg-[#181d2a] border border-[#242b3d] rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md ${accent.hover}`}
            >
              {/* Card index indicator */}
              <div className="absolute top-4 right-5 font-mono text-xs font-bold text-slate-600 group-hover:text-slate-400 transition-colors">
                MODULE_0{index + 1}
              </div>

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-[#121620] border ${accent.border} flex items-center justify-center ${accent.text} shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${accent.bg} ${accent.text} border ${accent.border}`}>
                      {item.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-100 mt-1 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 mb-3 font-medium">
                  {item.subtitle}
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
                  {item.description}
                </p>

                {/* Technical Specifications list */}
                <div className="bg-[#121620] rounded-xl p-4 border border-[#1e2433] mb-5">
                  <div className="text-[11px] font-mono uppercase text-slate-300 font-bold mb-2.5 flex items-center gap-2">
                    <Activity className={`w-3.5 h-3.5 ${accent.text}`} />
                    <span>Protocolos & Entregáveis Técnicos:</span>
                  </div>
                  <ul className="space-y-2">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags footer */}
              <div className="pt-3 border-t border-[#1e2433] flex flex-wrap gap-1.5">
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
