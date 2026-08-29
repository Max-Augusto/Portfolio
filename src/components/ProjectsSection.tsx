import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Sparkles, 
  Layers, 
  X,
  Code2,
  SlidersHorizontal
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.2 },
  },
};

export const ProjectsSection: React.FC = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showShieldBadges, setShowShieldBadges] = useState<boolean>(true);

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
    <section id="projects" className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-9 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>REPOSITORIES // RELEASES &amp; BUILDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>Featured Projects</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        {/* Filter categories tabs & Shields toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowShieldBadges(!showShieldBadges)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer shadow-sm ${
              showShieldBadges
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 font-semibold'
                : 'bg-[#181d2a] text-slate-400 border-[#272f42] hover:text-slate-200'
            }`}
            title="Alternar entre ícones e badges oficiais Shields.io"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showShieldBadges ? 'Shields.io Ativo' : 'Badges Shields.io'}</span>
          </button>

          <div className="flex items-center gap-1 bg-[#181d2a] p-1 rounded-xl border border-[#272f42] overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? `${theme.activeBg} text-white font-bold shadow-sm`
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Bento Grid with Animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5"
        >
          {filteredProjects.map((project) => {
            const isFeatured = project.featured;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className={`bg-[#181d2a] border rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md ${
                  isFeatured 
                    ? `${theme.activeBorder} hover:${theme.activeBadgeBorder}` 
                    : 'border-[#242b3d] hover:border-slate-600'
                }`}
              >
                {/* Featured Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${
                      project.status === 'production'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : theme.activeTagBg
                    }`}>
                      {project.badge}
                    </span>
                    {project.status === 'production' && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        ONLINE
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-mono text-slate-500 uppercase font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-slate-200 transition-colors flex items-center gap-2">
                    <span>{project.title}</span>
                  </h3>
                  <div className={`text-xs font-mono ${theme.activeText} font-medium mt-0.5 mb-3`}>
                    {project.subtitle}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5 font-normal">
                    {project.description}
                  </p>

                  {/* Key Metrics / Specs pill box */}
                  <div className="bg-[#121620] rounded-xl p-3 border border-[#1e2433] mb-5">
                    <div className="text-[10px] font-mono uppercase text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                      <Sparkles className={`w-3 h-3 ${theme.activeText}`} />
                      <span>Destaques Técnicos &amp; Métricas:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 bg-[#181d2a] px-2 py-0.5 rounded border border-[#272f42] shadow-xs font-medium"
                        >
                          <span className={`w-1 h-1 rounded-full ${theme.activeBg}`}></span>
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
                      <TechBadge 
                        key={tIdx} 
                        tech={tag} 
                        size="sm" 
                        showShield={showShieldBadges} 
                      />
                    ))}
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-3 border-t border-[#1e2433] flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`text-xs font-mono text-slate-400 hover:${theme.activeText} flex items-center gap-1.5 cursor-pointer font-medium transition-colors`}
                    >
                      <Code2 className={`w-3.5 h-3.5 ${theme.activeText}`} />
                      <span>Ver Arquitetura</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${theme.activeBg} text-white font-mono text-xs font-bold ${theme.activeBgHover} transition-all shadow-sm`}
                        >
                          <span>Visitar SaaS</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#121620] border border-[#272f42] text-slate-300 hover:text-white hover:bg-[#181d2a] font-mono text-xs transition-all shadow-xs"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Código</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-[#090b10]/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#121620] border border-[#272f42] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto terminal-scroll">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-[#181d2a] text-slate-400 hover:text-white transition-colors cursor-pointer border border-[#272f42]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
              <span className={`px-2 py-0.5 rounded ${theme.activeTagBg}`}>
                {selectedProject.badge}
              </span>
              <span className="text-slate-400">• CATEGORY: {selectedProject.category.toUpperCase()}</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-100 mb-1">
              {selectedProject.title}
            </h3>
            <p className={`text-sm font-mono ${theme.activeText} font-medium mb-4`}>
              {selectedProject.subtitle}
            </p>

            {/* Long Description */}
            <div className="bg-[#181d2a] rounded-2xl p-4 border border-[#22293b] text-sm text-slate-300 leading-relaxed mb-5 font-normal">
              {selectedProject.longDescription}
            </div>

            {/* Architecture Highlights */}
            <div className="mb-5">
              <h4 className="text-xs font-mono uppercase text-slate-300 font-bold mb-2 flex items-center gap-2">
                <Layers className={`w-3.5 h-3.5 ${theme.activeText}`} />
                <span>Stack &amp; Componentes de Arquitetura:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((t, idx) => (
                  <TechBadge 
                    key={idx} 
                    tech={t} 
                    size="md" 
                    showShield={showShieldBadges} 
                  />
                ))}
              </div>
            </div>

            {/* Git Clone command helper */}
            <div className="bg-[#0b0d13] rounded-xl p-3.5 border border-[#1e2433] font-mono text-xs text-emerald-400 mb-6 flex items-center justify-between gap-3 shadow-inner">
              <div className="truncate">
                <span className="text-slate-500">git clone </span>
                <span className="text-slate-200">{selectedProject.githubUrl}.git</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${selectedProject.githubUrl}.git`);
                }}
                className="px-2.5 py-1 rounded-lg bg-[#181d2a] text-slate-200 text-[10px] hover:bg-[#22293b] shrink-0 font-semibold border border-[#272f42] cursor-pointer"
              >
                Copiar
              </button>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#1e2433]">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-[#181d2a] text-slate-300 hover:text-white font-mono text-xs font-medium cursor-pointer border border-[#272f42]"
              >
                Fechar
              </button>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.activeBg} text-white font-mono text-xs font-bold ${theme.activeBgHover} transition-all shadow-sm`}
                >
                  <span>Acessar SaaS em Produção</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#181d2a] text-slate-200 hover:text-white border border-[#272f42] font-mono text-xs font-medium transition-colors"
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
