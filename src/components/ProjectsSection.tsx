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
import { getProjects } from '../data/localizedData';
import { Project } from '../types';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showShieldBadges, setShowShieldBadges] = useState<boolean>(true);

  const projects = getProjects(language);

  const categories = [
    { id: 'all', label: t('projects.cat_all') },
    { id: 'saas', label: t('projects.cat_saas') },
    { id: 'backend', label: t('projects.cat_backend') },
    { id: 'algorithms', label: t('projects.cat_algorithms') },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-colors duration-300`}>
      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b ${theme.borderCard}`}>
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>REPOSITORIES // RELEASES &amp; BUILDS</span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
            <span>{isPT ? 'Projetos em Destaque' : 'Featured Projects'}</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        {/* Filter categories tabs & Shields toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowShieldBadges(!showShieldBadges)}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl border text-[11px] sm:text-xs font-mono transition-all cursor-pointer shadow-xs ${
              showShieldBadges
                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/40 font-semibold'
                : `${theme.bgSubCard} ${theme.textMuted} ${theme.borderSubCard} hover:${theme.textPrimary}`
            }`}
            title="Alternar entre ícones e badges oficiais Shields.io"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showShieldBadges ? 'Shields.io' : 'Badges'}</span>
          </button>

          <div className={`flex items-center gap-1 ${theme.bgSubCard} p-1 rounded-xl border ${theme.borderSubCard} overflow-x-auto max-w-full no-scrollbar`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? `${theme.activeBg} text-white font-bold shadow-xs`
                    : `${theme.textMuted} hover:${theme.textPrimary}`
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
          className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5"
        >
          {filteredProjects.map((project) => {
            const isFeatured = project.featured;

            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className={`${theme.bgSubCard} border rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-md ${
                  isFeatured 
                    ? `${theme.activeBorder} hover:${theme.activeBadgeBorder}` 
                    : `${theme.borderSubCard} hover:border-slate-400`
                }`}
              >
                {/* Featured Badge */}
                <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      project.status === 'production'
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                        : theme.activeTagBg
                    }`}>
                      {project.badge}
                    </span>
                    {project.status === 'production' && (
                      <span className="flex items-center gap-1 text-[9px] sm:text-[10px] font-mono text-emerald-500 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        ONLINE
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 uppercase font-semibold">
                    {project.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className={`text-lg sm:text-xl font-bold ${theme.textPrimary} group-hover:${theme.activeText} transition-colors flex items-center gap-2`}>
                    <span>{project.title}</span>
                  </h3>
                  <div className={`text-xs font-mono ${theme.activeText} font-medium mt-0.5 mb-2.5 sm:mb-3`}>
                    {project.subtitle}
                  </div>

                  <p className={`text-xs sm:text-sm ${theme.textSecondary} leading-relaxed mb-4 sm:mb-5 font-normal`}>
                    {project.description}
                  </p>

                  {/* Key Metrics / Specs pill box */}
                  <div className={`${theme.bgCard} rounded-xl p-3 border ${theme.borderCard} mb-4 sm:mb-5`}>
                    <div className={`text-[10px] font-mono uppercase ${theme.textMuted} font-bold mb-1.5 sm:mb-2 flex items-center gap-1.5`}>
                      <Sparkles className={`w-3 h-3 ${theme.activeText}`} />
                      <span>{t('projects.metrics_title')}:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className={`text-[10px] sm:text-[11px] font-mono ${theme.textSecondary} flex items-center gap-1 ${theme.bgSubCard} px-2 py-0.5 rounded border ${theme.borderSubCard} shadow-xs font-medium`}
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
                  <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
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
                  <div className={`pt-3 border-t ${theme.borderCard} flex flex-wrap items-center justify-between gap-2.5`}>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className={`text-xs font-mono ${theme.textMuted} hover:${theme.activeText} flex items-center gap-1.5 cursor-pointer font-medium transition-colors min-h-[36px]`}
                    >
                      <Code2 className={`w-3.5 h-3.5 ${theme.activeText}`} />
                      <span>{t('projects.view_arch')}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg ${theme.activeBg} text-white font-mono text-xs font-bold ${theme.activeBgHover} transition-all shadow-xs min-h-[36px]`}
                        >
                          <span>{t('projects.visit_saas')}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg ${theme.bgCard} border ${theme.borderCard} ${theme.textSecondary} hover:${theme.textPrimary} font-mono text-xs transition-all shadow-xs min-h-[36px]`}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>{t('projects.code')}</span>
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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className={`${theme.bgCard} border ${theme.borderCard} rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto terminal-scroll`}>
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-5 right-5 p-2 rounded-xl ${theme.bgSubCard} ${theme.textMuted} hover:${theme.textPrimary} transition-colors cursor-pointer border ${theme.borderSubCard}`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-bold">
              <span className={`px-2 py-0.5 rounded ${theme.activeTagBg}`}>
                {selectedProject.badge}
              </span>
              <span className={`${theme.textMuted}`}>• CATEGORY: {selectedProject.category.toUpperCase()}</span>
            </div>

            <h3 className={`text-2xl font-bold ${theme.textPrimary} mb-1`}>
              {selectedProject.title}
            </h3>
            <p className={`text-sm font-mono ${theme.activeText} font-medium mb-4`}>
              {selectedProject.subtitle}
            </p>

            {/* Long Description */}
            <div className={`${theme.bgSubCard} rounded-2xl p-4 border ${theme.borderSubCard} text-sm ${theme.textSecondary} leading-relaxed mb-5 font-normal`}>
              {selectedProject.longDescription}
            </div>

            {/* Architecture Highlights */}
            <div className="mb-5">
              <h4 className={`text-xs font-mono uppercase ${theme.textPrimary} font-bold mb-2 flex items-center gap-2`}>
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
            <div className={`bg-black/40 rounded-xl p-3.5 border ${theme.borderCard} font-mono text-xs text-emerald-500 mb-6 flex items-center justify-between gap-3 shadow-inner`}>
              <div className="truncate">
                <span className="text-slate-500">git clone </span>
                <span className={`${theme.textPrimary}`}>{selectedProject.githubUrl}.git</span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`git clone ${selectedProject.githubUrl}.git`);
                }}
                className={`px-2.5 py-1 rounded-lg ${theme.bgSubCard} ${theme.textPrimary} text-[10px] hover:border-slate-400 shrink-0 font-semibold border ${theme.borderSubCard} cursor-pointer`}
              >
                {t('projects.copy')}
              </button>
            </div>

            {/* Modal Actions */}
            <div className={`flex flex-wrap items-center justify-end gap-3 pt-4 border-t ${theme.borderCard}`}>
              <button
                onClick={() => setSelectedProject(null)}
                className={`px-4 py-2 rounded-xl ${theme.bgSubCard} ${theme.textSecondary} hover:${theme.textPrimary} font-mono text-xs font-medium cursor-pointer border ${theme.borderSubCard}`}
              >
                {t('projects.close')}
              </button>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.activeBg} text-white font-mono text-xs font-bold ${theme.activeBgHover} transition-all shadow-xs`}
                >
                  <span>{t('projects.visit_saas')}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl ${theme.bgSubCard} ${theme.textSecondary} hover:${theme.textPrimary} border ${theme.borderSubCard} font-mono text-xs font-medium transition-colors`}
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
