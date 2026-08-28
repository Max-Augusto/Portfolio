import React, { useState } from 'react';
import { 
  Code2, 
  Network, 
  CloudLightning, 
  Cpu, 
  CheckCircle2, 
  Layers, 
  Activity,
  Terminal
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'Code2': return Code2;
      case 'Network': return Network;
      case 'CloudLightning': return CloudLightning;
      default: return Cpu;
    }
  };

  return (
    <section id="skills" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#10b981]"></span>
            <span>CAPABILITY_INDEX // TECH_STACK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Matriz de Competências <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ Skills & Protocols</span>
          </h2>
        </div>

        <div className="text-xs font-mono text-[#94a3b8] bg-[#0f172a] px-3 py-1.5 rounded-lg border border-[#1e293b]">
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
              className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                isSelected
                  ? 'bg-[#0f172a] border-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.15)] text-[#f8fafc]'
                  : 'bg-[#0f172a]/50 border-[#1e293b] text-[#94a3b8] hover:border-[#334155] hover:text-[#f8fafc]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-[#10b981]/15 text-[#10b981]' : 'bg-[#1e293b] text-[#64748b]'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono font-semibold">
                    {cat.title}
                  </div>
                  <div className="text-[10px] font-mono text-[#64748b]">
                    {cat.skills.length} módulos mapeados
                  </div>
                </div>
              </div>

              {isSelected && (
                <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected category skills cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill, sIdx) => (
          <div
            key={sIdx}
            className="bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] rounded-xl p-5 flex flex-col justify-between transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-bold text-[#f8fafc] group-hover:text-[#10b981] transition-colors">
                  {skill.name}
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#1e293b] text-[#06b6d4] border border-[#334155]">
                  {skill.level}
                </span>
              </div>

              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                {skill.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1e293b]/70">
              {skill.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#090d16] text-[#cbd5e1] border border-[#1e293b]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
