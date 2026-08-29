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
    { id: 'about', label: 'ABOUT', title: isPT ? 'Sobre Mim' : 'About Me' },
    { id: 'what-i-do', label: 'WHAT I DO', title: isPT ? 'O que Faço' : 'What I Do' },
    { id: 'experience', label: 'EXPERIENCE', title: isPT ? 'Experiência' : 'Experience' },
    { id: 'projects', label: 'PROJECTS', title: isPT ? 'Projetos' : 'Projects' },
    { id: 'skills', label: 'SKILLS', title: isPT ? 'Habilidades' : 'Skills' },
    { id: 'topology', label: 'TOPOLOGY & LAB', title: isPT ? 'Simulador de Rede & Diagnóstico N2' : 'Network Simulator & L2/L3 Diagnostics' },
    { id: 'terminal', label: 'TERMINAL', title: isPT ? 'Console Terminal Interativo' : 'Interactive Terminal Console' },
    { id: 'contact', label: 'CONTACT', title: isPT ? 'Contato' : 'Contact' },
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

      {/* Pratama Console Header */}
      <PratamaHeader 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Pratama Main 2-Column Body Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-4 pb-12 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sticky Left Sidebar Navigation with Color Palette Blocks - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block w-full lg:w-auto lg:sticky lg:top-6 z-20">
          <PratamaSidebar 
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            onOpenResume={() => setIsResumeOpen(true)}
          />
        </div>

        {/* Central Dynamic Content Stack - Shows ONLY the Active Page */}
        <main className="flex-1 w-full flex flex-col gap-5 min-w-0">
          
          {/* Active Page Header Breadcrumb Status */}
          <div className={`${theme.bgCard}/80 border ${theme.borderCard} rounded-2xl px-5 py-3 flex items-center justify-between font-mono text-xs ${theme.textMuted} shadow-sm backdrop-blur-sm`}>
            <div className="flex items-center gap-2">
              <Hash className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span className={theme.textMuted}>{t('section.prefix')}</span>
              <span className={`${theme.activeText} font-bold uppercase tracking-wider`}>
                {SECTIONS[currentIndex]?.label || 'ABOUT'}
              </span>
              <span className={`${theme.textMuted} hidden sm:inline`}>•</span>
              <span className={`${theme.textSecondary} text-[11px] hidden sm:inline`}>
                {SECTIONS[currentIndex]?.title}
              </span>
            </div>

            <div className={`text-[11px] ${theme.textMuted} font-medium`}>
              {t('section.page')} {currentIndex + 1} {t('section.of')} {SECTIONS.length}
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
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>

      {/* Mobile Floating Bottom Bar */}
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
