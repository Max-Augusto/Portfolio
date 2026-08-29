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
import { EXPERIENCES } from '../data/portfolioData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

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
      case 'positivo-splus': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'betim-express': return theme.activeTagBg;
      case 'pref-betim': return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="experience" className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-9 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>DEPLOYMENT_HISTORY // TIMELINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>Experience &amp; Track Record</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-slate-400 bg-[#181d2a] px-3 py-1.5 rounded-xl border border-[#272f42] shadow-sm">
          <span>HIGH AVAILABILITY &amp; PRODUCTION SLA</span>
        </div>
      </div>

      {/* Timeline Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
        {EXPERIENCES.map((exp) => {
          const Icon = getCompanyIcon(exp.id);
          const badgeStyle = getBadgeStyle(exp.id);
          const isExpanded = expandedExp === exp.id;

          return (
            <motion.div
              key={exp.id}
              variants={cardVariants}
              className={`bg-[#181d2a] border transition-all duration-300 rounded-2xl p-5 sm:p-6 relative overflow-hidden shadow-md ${
                isExpanded ? `${theme.activeBadgeBorder} ${theme.activeGlow}` : 'border-[#242b3d] hover:border-slate-600'
              }`}
            >
              {/* Active Pulse indicator for ongoing jobs */}
              {exp.status === 'active' && (
                <div className="absolute top-0 right-0">
                  <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>PRODUÇÃO ATIVA</span>
                  </div>
                </div>
              )}

              {/* Header Info */}
              <div 
                className="cursor-pointer"
                onClick={() => setExpandedExp(isExpanded ? '' : exp.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-[#121620] border border-[#272f42] flex items-center justify-center ${theme.activeText} shadow-sm shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${badgeStyle}`}>
                          {exp.badge}
                        </span>
                        {exp.slaMetrics && (
                          <span className="text-[10px] font-mono text-slate-400 bg-[#121620] px-2 py-0.5 rounded border border-[#272f42] hidden sm:inline">
                            SLA: {exp.slaMetrics}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-100 mt-1.5 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-slate-400 font-normal text-sm sm:text-base">— {exp.role}</span>
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-mono text-slate-400">
                        <span className={`flex items-center gap-1.5 ${theme.activeText} font-medium`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-center sm:self-start">
                    <button
                      className="p-1.5 rounded-lg bg-[#121620] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      aria-label="Expandir detalhes"
                    >
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? `rotate-90 ${theme.activeText}` : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className="mt-5 pt-5 border-t border-[#1e2433] space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider mb-2.5 flex items-center gap-2">
                      <Activity className={`w-3.5 h-3.5 ${theme.activeText}`} />
                      <span>Atividades &amp; Responsabilidades Operacionais:</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack used in this position */}
                  <div className="pt-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-medium mb-2">
                      Ambiente &amp; Tecnologias Empregadas:
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
