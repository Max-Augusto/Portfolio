import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Terminal, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  X,
  Code2
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';

export const ProjectsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Projetos' },
    { id: 'saas', label: 'SaaS em Produção' },
    { id: 'backend', label: 'Backend & Django' },
    { id: 'algorithms', label: 'Algoritmos & CS' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#f59e0b] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#f59e0b]"></span>
            <span>REPOSITORIES // RELEASES & BUILDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Projetos em Destaque <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ Production & Repos</span>
          </h2>
        </div>

        {/* Filter categories tabs */}
        <div className="flex items-center gap-1.5 bg-[#0f172a] p-1 rounded-xl border border-[#1e293b] overflow-x-auto max-w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1e293b] text-[#10b981] font-bold border border-[#10b981]/30 shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {filteredProjects.map((project) => {
          const isFeatured = project.featured;

          return (
            <div
              key={project.id}
              className={`bg-[#0f172a] border rounded-2xl p-6 flex flex-col justify-between transition-all relative overflow-hidden group hover:shadow-xl ${
                isFeatured 
                  ? 'border-[#10b981]/40 hover:border-[#10b981]' 
                  : 'border-[#1e293b] hover:border-[#334155]'
              }`}
            >
              {/* Featured Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                    project.status === 'production'
                      ? 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30'
                      : 'bg-[#06b6d4]/15 text-[#06b6d4] border-[#06b6d4]/30'
                  }`}>
                    {project.badge}
                  </span>
                  {project.status === 'production' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-[#10b981]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse"></span>
                      ONLINE
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-mono text-[#64748b] uppercase">
                  {project.category}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-xl font-bold text-[#f8fafc] group-hover:text-white transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                </h3>
                <div className="text-xs font-mono text-[#06b6d4] mt-0.5 mb-3">
                  {project.subtitle}
                </div>

                <p className="text-sm text-[#94a3b8] leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Key Metrics / Specs pill box */}
                <div className="bg-[#090d16]/70 rounded-xl p-3 border border-[#1e293b] mb-5">
                  <div className="text-[10px] font-mono uppercase text-[#64748b] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                    <span>Destaques Técnicos & Métricas:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.metrics.map((m, mIdx) => (
                      <span
                        key={mIdx}
                        className="text-[11px] font-mono text-[#cbd5e1] flex items-center gap-1.5 bg-[#0f172a] px-2 py-0.5 rounded border border-[#1e293b]"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#10b981]"></span>
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons & Tech Tags */}
              <div>
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b]/60 text-[#94a3b8] border border-[#334155]/40"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-[#cbd5e1] hover:text-[#10b981] flex items-center gap-1.5 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#10b981]" />
                    <span>Ver Arquitetura</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#090d16] font-mono text-xs font-bold hover:bg-[#34d399] transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                      >
                        <span>Visitar SaaS</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090d16] border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] hover:border-[#334155] font-mono text-xs transition-all"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#090d16]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0f172a] border border-[#334155] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto terminal-scroll">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#10b981]">
              <span className="px-2 py-0.5 rounded bg-[#10b981]/15 border border-[#10b981]/30">
                {selectedProject.badge}
              </span>
              <span>• CATEGORY: {selectedProject.category.toUpperCase()}</span>
            </div>

            <h3 className="text-2xl font-bold text-[#f8fafc] mb-1">
              {selectedProject.title}
            </h3>
            <p className="text-sm font-mono text-[#06b6d4] mb-4">
              {selectedProject.subtitle}
            </p>

            {/* Long Description */}
            <div className="bg-[#090d16] rounded-xl p-4 border border-[#1e293b] text-sm text-[#cbd5e1] leading-relaxed mb-5 font-normal">
              {selectedProject.longDescription}
            </div>

            {/* Architecture Highlights */}
            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase text-[#94a3b8] font-bold mb-2 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Stack & Componentes de Arquitetura:</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-[#1e293b] text-[#f8fafc] border border-[#334155]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Git Clone command helper */}
            <div className="bg-[#090d16] rounded-xl p-3.5 border border-[#1e293b] font-mono text-xs text-[#10b981] mb-6 flex items-center justify-between gap-3">
              <div className="truncate">
                <span className="text-[#94a3b8]">git clone </span>
                <span>{selectedProject.githubUrl}.git</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${selectedProject.githubUrl}.git`);
                }}
                className="px-2.5 py-1 rounded bg-[#1e293b] text-[#f8fafc] text-[10px] hover:bg-[#334155] shrink-0"
              >
                Copiar
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#1e293b]">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-[#1e293b] text-[#cbd5e1] hover:text-white font-mono text-xs"
              >
                Fechar
              </button>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10b981] text-[#090d16] font-mono text-xs font-bold hover:bg-[#34d399] transition-all"
                >
                  <span>Acessar SaaS em Produção</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#090d16] border border-[#1e293b] text-[#f8fafc] hover:border-[#334155] font-mono text-xs"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Ver no GitHub</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
