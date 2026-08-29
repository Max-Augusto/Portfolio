import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
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

const SECTIONS = [
  { id: 'about', label: 'ABOUT', title: 'Sobre Mim' },
  { id: 'what-i-do', label: 'WHAT I DO', title: 'O que Faço' },
  { id: 'experience', label: 'EXPERIENCE', title: 'Experiência' },
  { id: 'projects', label: 'PROJECTS', title: 'Projetos' },
  { id: 'skills', label: 'SKILLS', title: 'Habilidades' },
  { id: 'topology', label: 'TOPOLOGIA & LAB', title: 'Simulador de Rede & Diagnóstico N2' },
  { id: 'terminal', label: 'TERMINAL', title: 'Console Terminal Interativo' },
  { id: 'contact', label: 'CONTACT', title: 'Contato' },
];

const MainPortfolio: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { theme } = useTheme();

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
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col tech-grid-bg selection:bg-blue-600 selection:text-white relative overflow-x-hidden transition-colors duration-300">
      
      {/* Top Screen Page Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-[#121620]/60 z-50 overflow-hidden pointer-events-none backdrop-blur-xs">
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
          <div className="bg-[#121620]/80 border border-[#1e2433] rounded-2xl px-5 py-3 flex items-center justify-between font-mono text-xs text-slate-400 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Hash className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span className="text-slate-500">SECTION //</span>
              <span className={`${theme.activeText} font-bold uppercase tracking-wider`}>
                {SECTIONS[currentIndex]?.label || 'ABOUT'}
              </span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">
                {SECTIONS[currentIndex]?.title}
              </span>
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              PÁGINA {currentIndex + 1} DE {SECTIONS.length}
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
          <div className="bg-[#121620] border border-[#1e2433] rounded-2xl p-4 flex items-center justify-between font-mono text-xs shadow-md">
            {prevSection ? (
              <button
                onClick={() => handleSelectSection(prevSection.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 hover:text-white border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs"
              >
                <ChevronLeft className={`w-4 h-4 ${theme.activeText}`} />
                <span className="font-bold">{prevSection.label}</span>
              </button>
            ) : (
              <div className="text-[11px] text-slate-600 px-3 py-2">
                INÍCIO DO CONSOLE
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
                      : 'w-2 bg-[#272f42] hover:bg-slate-500'
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
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 hover:text-white border border-[#272f42] transition-all cursor-pointer shadow-xs"
              >
                <span>VOLTAR AO INÍCIO</span>
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
    <ThemeProvider>
      <MainPortfolio />
    </ThemeProvider>
  );
}
