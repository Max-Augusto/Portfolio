import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Activity, 
  Building2, 
  Plane, 
  Truck, 
  Landmark,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const [expandedExp, setExpandedExp] = useState<string>('positivo-splus');

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
      case 'positivo-splus': return 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/30';
      case 'betim-express': return 'bg-[#06b6d4]/10 text-[#06b6d4] border-[#06b6d4]/30';
      case 'pref-betim': return 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30';
      default: return 'bg-[#1e293b] text-[#94a3b8] border-[#334155]';
    }
  };

  return (
    <section id="experience" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#06b6d4] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#06b6d4]"></span>
            <span>DEPLOYMENT_HISTORY // TIMELINE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Experiência Profissional <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ Track Record</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-[#94a3b8] bg-[#0f172a] px-3 py-1.5 rounded-lg border border-[#1e293b]">
          <span>HIGH AVAILABILITY & PRODUCTION SYSTEMS</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="space-y-4">
        {EXPERIENCES.map((exp, index) => {
          const Icon = getCompanyIcon(exp.id);
          const badgeStyle = getBadgeStyle(exp.id);
          const isExpanded = expandedExp === exp.id;

          return (
            <div
              key={exp.id}
              className={`bg-[#0f172a] border transition-all rounded-2xl p-5 sm:p-6 relative overflow-hidden ${
                isExpanded ? 'border-[#334155] shadow-lg bg-[#0f172a]' : 'border-[#1e293b] hover:border-[#334155]/80 bg-[#0f172a]/60'
              }`}
            >
              {/* Active Pulse indicator for ongoing jobs */}
              {exp.status === 'active' && (
                <div className="absolute top-0 right-0">
                  <div className="bg-[#10b981]/15 text-[#10b981] text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[#10b981]/30 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
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
                    <div className="w-12 h-12 rounded-xl bg-[#090d16] border border-[#1e293b] flex items-center justify-center text-[#10b981] shadow-inner shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded border ${badgeStyle}`}>
                          {exp.badge}
                        </span>
                        {exp.slaMetrics && (
                          <span className="text-[10px] font-mono text-[#94a3b8] bg-[#090d16] px-2 py-0.5 rounded border border-[#1e293b] hidden sm:inline">
                            SLA: {exp.slaMetrics}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#f8fafc] mt-1.5 flex items-center gap-2">
                        <span>{exp.company}</span>
                        <span className="text-[#64748b] font-normal text-sm sm:text-base">— {exp.role}</span>
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs font-mono text-[#94a3b8]">
                        <span className="flex items-center gap-1.5 text-[#06b6d4]">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{exp.period}</span>
                        </span>
                        <span className="flex items-center gap-1.5 text-[#cbd5e1]">
                          <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                          <span>{exp.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-center sm:self-start">
                    <button
                      className="p-1.5 rounded-lg bg-[#1e293b]/60 text-[#94a3b8] hover:text-[#f8fafc] transition-colors"
                      aria-label="Expandir detalhes"
                    >
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-[#10b981]' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expandable details */}
              {isExpanded && (
                <div className="mt-5 pt-5 border-t border-[#1e293b] space-y-4 animate-fadeIn">
                  <div>
                    <h4 className="text-xs font-mono uppercase text-[#cbd5e1] font-bold tracking-wider mb-2.5 flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-[#10b981]" />
                      <span>Atividades & Responsabilidades Operacionais:</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="text-sm text-[#94a3b8] flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack used in this position */}
                  <div className="pt-2">
                    <div className="text-[11px] font-mono uppercase text-[#64748b] mb-2">
                      Ambiente & Tecnologias Empregadas:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#090d16] text-[#cbd5e1] border border-[#1e293b]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
