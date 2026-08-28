import React, { useState } from 'react';
import { 
  Network, 
  Server, 
  Cloud, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Activity, 
  ArrowRight,
  Terminal,
  Cpu
} from 'lucide-react';
import { WHAT_I_DO } from '../data/portfolioData';

export const WhatIDoSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

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
      case 'infra-networks': return { text: 'text-[#10b981]', border: 'border-[#10b981]/40', bg: 'bg-[#10b981]/10', glow: 'hover:border-[#10b981]' };
      case 'backend-saas': return { text: 'text-[#06b6d4]', border: 'border-[#06b6d4]/40', bg: 'bg-[#06b6d4]/10', glow: 'hover:border-[#06b6d4]' };
      case 'devops-cloud': return { text: 'text-[#f59e0b]', border: 'border-[#f59e0b]/40', bg: 'bg-[#f59e0b]/10', glow: 'hover:border-[#f59e0b]' };
      case 'incident-itil': return { text: 'text-[#a78bfa]', border: 'border-[#a78bfa]/40', bg: 'bg-[#a78bfa]/10', glow: 'hover:border-[#a78bfa]' };
      default: return { text: 'text-[#10b981]', border: 'border-[#10b981]/40', bg: 'bg-[#10b981]/10', glow: 'hover:border-[#10b981]' };
    }
  };

  return (
    <section id="what-i-do" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#10b981]"></span>
            <span>SYSTEM_ARCHITECTURE // PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            O Que Eu Faço <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ What I'm Doing</span>
          </h2>
        </div>
        <div className="text-xs font-mono text-[#94a3b8] bg-[#0f172a] px-3 py-1.5 rounded-lg border border-[#1e293b]">
          <span>4 CORE SPECIALTIES • END-TO-END VISIBILITY</span>
        </div>
      </div>

      {/* 4-Pillar Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {WHAT_I_DO.map((item, index) => {
          const Icon = getIcon(item.iconName);
          const accent = getAccentColor(item.id);
          const isSelected = selectedPillar === item.id;

          return (
            <div
              key={item.id}
              className={`bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden group ${accent.glow}`}
            >
              {/* Subtle card index indicator */}
              <div className="absolute top-4 right-5 font-mono text-xs font-bold text-[#334155] group-hover:text-[#64748b] transition-colors">
                MODULE_0{index + 1}
              </div>

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-[#090d16] border ${accent.border} flex items-center justify-center ${accent.text} shadow-sm group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded ${accent.bg} ${accent.text} border ${accent.border}`}>
                      {item.badge}
                    </span>
                    <h3 className="text-lg font-bold text-[#f8fafc] mt-1 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#64748b] mb-3">
                  {item.subtitle}
                </div>

                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Technical Specifications list */}
                <div className="bg-[#090d16]/70 rounded-xl p-4 border border-[#1e293b]/70 mb-5">
                  <div className="text-[11px] font-mono uppercase text-[#cbd5e1] font-semibold mb-2.5 flex items-center gap-2">
                    <Activity className={`w-3.5 h-3.5 ${accent.text}`} />
                    <span>Protocolos & Entregáveis Técnicos:</span>
                  </div>
                  <ul className="space-y-2">
                    {item.specs.map((spec, sIdx) => (
                      <li key={sIdx} className="text-xs text-[#94a3b8] flex items-start gap-2 leading-tight">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${accent.text} shrink-0 mt-0.5`} />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tags footer */}
              <div className="pt-3 border-t border-[#1e293b] flex flex-wrap gap-1.5">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b]/70 text-[#cbd5e1] border border-[#334155]/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
