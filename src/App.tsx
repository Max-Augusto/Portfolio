import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { PratamaHeader } from './components/PratamaHeader';
import { PratamaSidebar } from './components/PratamaSidebar';
import { GeometricPolyhedron } from './components/GeometricPolyhedron';
import { AboutMeCard } from './components/AboutMeCard';
import { WhatIDoSection } from './components/WhatIDoSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { NetworkTopologyWidget } from './components/NetworkTopologyWidget';
import { TerminalWidget } from './components/TerminalWidget';
import { ContactSection } from './components/ContactSection';
import { CommandPalette } from './components/CommandPalette';
import { ResumeModal } from './components/ResumeModal';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Footer } from './components/Footer';
import { ChevronLeft, ChevronRight, Hash } from 'lucide-react';

const MainPortfolio: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();

  const SECTIONS = [
    { id: 'about', label: t('nav.about'), title: isPT ? 'Perfil & Bio' : 'Profile & Bio' },
    { id: 'what-i-do', label: t('nav.what_i_do'), title: isPT ? 'Infraestrutura & Backend' : 'Infrastructure & Backend' },
    { id: 'experience', label: t('nav.experience'), title: isPT ? 'Trajetória & Positivo S+' : 'Career & Positivo S+' },
    { id: 'projects', label: t('nav.projects'), title: isPT ? 'Betim Express & Projetos' : 'Betim Express & Projects' },
    { id: 'skills', label: t('nav.skills'), title: isPT ? 'Stack Técnica & Redes' : 'Tech Stack & Networks' },
    { id: 'topology', label: t('nav.topology'), title: isPT ? 'Simulador de Rede L2/L3' : 'L2/L3 Network Simulator' },
    { id: 'terminal', label: t('nav.terminal'), title: isPT ? 'Console Interativo' : 'Interactive Console' },
    { id: 'contact', label: t('nav.contact'), title: isPT ? 'Canais Diretos' : 'Direct Channels' },
  ];

  const currentIndex = SECTIONS.findIndex(s => s.id === activeSection);
  const progressPercent = ((currentIndex + 1) / SECTIONS.length) * 100;
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K, Arrow keys, 1-8 for sections)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'ArrowLeft' && prevSection) {
        handleSelectSection(prevSection.id);
      } else if (e.key === 'ArrowRight' && nextSection) {
        handleSelectSection(nextSection.id);
      } else if (['1', '2', '3', '4', '5', '6', '7', '8'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (SECTIONS[idx]) {
          handleSelectSection(SECTIONS[idx].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSection, nextSection]);

  const renderActivePage = () => {
    switch (activeSection) {
      case 'about':
        return (
          <AboutMeCard 
            onOpenResume={() => setIsResumeOpen(true)} 
            onNavigateToContact={() => handleSelectSection('contact')}
          />
        );
      case 'what-i-do':
        return <WhatIDoSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'skills':
        return <SkillsMatrix />;
      case 'topology':
        return <NetworkTopologyWidget />;
      case 'terminal':
        return <TerminalWidget onNavigate={(sec) => handleSelectSection(sec)} />;
      case 'contact':
        return <ContactSection />;
      default:
        return (
          <AboutMeCard 
            onOpenResume={() => setIsResumeOpen(true)} 
            onNavigateToContact={() => handleSelectSection('contact')}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme.bgBody} ${theme.textPrimary} flex flex-col tech-grid-bg selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* Top Screen Page Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-[3px] ${theme.bgSubCard}/60 z-50 overflow-hidden pointer-events-none backdrop-blur-xs`}>
        <motion.div 
          className={`h-full ${theme.activeBg}`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            boxShadow: `0 0 10px ${theme.hex}, 0 0 20px ${theme.hex}80`
          }}
        />
      </div>

      {/* Background Geometric Polyhedron Origami Artwork (Pratama signature aesthetic) */}
      <GeometricPolyhedron />

      {/* Dynamic Pratama Ambient Lighting Glows */}
      <div 
        className="fixed top-20 right-10 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none -z-10 transition-colors duration-500 opacity-20"
        style={{ backgroundColor: theme.hex }}
      />
      <div 
        className="fixed bottom-32 left-10 w-[450px] h-[450px] rounded-full blur-[150px] pointer-events-none -z-10 transition-colors duration-500 opacity-15"
        style={{ backgroundColor: theme.hex }}
      />

      {/* Pratama Console Header with prominent 8-section direct bar */}
      <PratamaHeader 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Pratama Main 2-Column Body Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-28 lg:pb-12 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sticky Left Sidebar Navigation with Color Palette Blocks - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block w-full lg:w-auto lg:sticky lg:top-6 z-20">
          <PratamaSidebar 
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>

        {/* Central Dynamic Content Stack - Shows ONLY the Active Page */}
        <main className="flex-1 w-full flex flex-col gap-4 min-w-0">
          
          {/* Active Page Header Breadcrumb Status & Quick Navigation */}
          <div className={`${theme.bgCard}/90 border ${theme.borderCard} rounded-xl px-3 sm:px-4 py-2 flex items-center justify-between font-mono text-xs ${theme.textMuted} shadow-sm backdrop-blur-sm`}>
            <div className="flex items-center gap-2 min-w-0">
              <Hash className={`w-3.5 h-3.5 ${theme.activeText} shrink-0`} />
              <span className={`${theme.textMuted} shrink-0`}>{t('section.prefix')}</span>
              <span className={`${theme.activeText} font-bold uppercase tracking-wider truncate`}>
                {SECTIONS[currentIndex]?.label || ''}
              </span>
              <span className={`${theme.textMuted} hidden md:inline`}>•</span>
              <span className={`${theme.textSecondary} text-[11px] hidden md:inline truncate`}>
                {SECTIONS[currentIndex]?.title}
              </span>
            </div>

            {/* Top Navigation Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <span className={`text-[11px] ${theme.textMuted} font-mono font-medium px-2 py-0.5 rounded ${theme.bgSubCard} border ${theme.borderSubCard}`}>
                {currentIndex + 1} / {SECTIONS.length}
              </span>

              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={() => prevSection && handleSelectSection(prevSection.id)}
                  disabled={!prevSection}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-mono transition-all ${
                    prevSection
                      ? `${theme.bgSubCard} hover:${theme.bgCardHover} ${theme.textPrimary} border ${theme.borderSubCard} cursor-pointer active:scale-95`
                      : `opacity-40 cursor-not-allowed bg-slate-800/20 border-slate-700/40 text-slate-500`
                  }`}
                  title={prevSection ? `${isPT ? 'Anterior:' : 'Previous:'} ${prevSection.label}` : ''}
                  aria-label="Seção anterior"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px] font-medium">{prevSection ? prevSection.label : ''}</span>
                </button>

                <button
                  onClick={() => nextSection && handleSelectSection(nextSection.id)}
                  disabled={!nextSection}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all ${
                    nextSection
                      ? `${theme.activeBg} text-white font-bold border-transparent cursor-pointer active:scale-95 shadow-xs`
                      : `opacity-40 cursor-not-allowed bg-slate-800/20 border-slate-700/40 text-slate-500`
                  }`}
                  title={nextSection ? `${isPT ? 'Próxima:' : 'Next:'} ${nextSection.label}` : ''}
                  aria-label="Próxima seção"
                >
                  <span className="hidden sm:inline text-[11px] font-medium">{nextSection ? nextSection.label : ''}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Page Component with smooth transition */}
          <div className="relative min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                {renderActivePage()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Pagination Bar */}
          <div className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl p-4 flex items-center justify-between font-mono text-xs shadow-md`}>
            {prevSection ? (
              <button
                onClick={() => handleSelectSection(prevSection.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl ${theme.bgSubCard} hover:${theme.bgCardHover} ${theme.textPrimary} border ${theme.borderSubCard} transition-all cursor-pointer shadow-xs`}
              >
                <ChevronLeft className={`w-4 h-4 ${theme.activeText}`} />
                <span className="font-bold">{prevSection.label}</span>
              </button>
            ) : (
              <div className={`text-[11px] ${theme.textMuted} px-3 py-2 font-medium`}>
                {t('section.start')}
              </div>
            )}

            {/* Middle Indicator Dots */}
            <div className="hidden sm:flex items-center gap-1.5">
              {SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => handleSelectSection(sec.id)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeSection === sec.id
                      ? `w-6 ${theme.activeBg} ${theme.activeGlow}`
                      : `w-2 ${theme.bgSubCard} border ${theme.borderSubCard} hover:bg-slate-400`
                  }`}
                  title={sec.label}
                />
              ))}
            </div>

            {nextSection ? (
              <button
                onClick={() => handleSelectSection(nextSection.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-bold transition-all cursor-pointer shadow-sm`}
              >
                <span>{nextSection.label}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleSelectSection('about')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl ${theme.bgSubCard} hover:${theme.bgCardHover} ${theme.textPrimary} border ${theme.borderSubCard} transition-all cursor-pointer shadow-xs`}
              >
                <span>{t('section.back_to_start')}</span>
                <ChevronRight className={`w-4 h-4 ${theme.activeText}`} />
              </button>
            )}
          </div>

        </main>

      </div>

      {/* Technical Resume Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(sec) => handleSelectSection(sec)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* SRE Footer */}
      <div className="pb-24 lg:pb-6">
        <Footer />
      </div>

      {/* Ergonomic Floating Mobile Dock (App Style with Quick Direct Tabs + All 8-Section Drawer) */}
      <MobileBottomBar 
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <MainPortfolio />
      </ThemeProvider>
    </LanguageProvider>
  );
}
