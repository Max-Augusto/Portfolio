import React, { useState } from 'react';
import { OperatorHeader } from './components/OperatorHeader';
import { Navbar } from './components/Navbar';
import { HeroBento } from './components/HeroBento';
import { WhatIDoSection } from './components/WhatIDoSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { TerminalWidget } from './components/TerminalWidget';
import { ContactSection } from './components/ContactSection';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleNavigateToTerminal = () => {
    const termElem = document.getElementById('terminal');
    if (termElem) {
      termElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-[#f8fafc] flex flex-col tech-grid-bg selection:bg-[#10b981]/25 selection:text-[#10b981] relative">
      {/* Background ambient lighting accents */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#10b981]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 right-10 w-96 h-96 bg-[#06b6d4]/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Operator Console Top Bar */}
      <OperatorHeader />

      {/* Sticky Technical Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 space-y-4">
        {/* Bento Hero Section */}
        <HeroBento 
          onOpenResume={() => setIsResumeOpen(true)}
          onNavigateToTerminal={handleNavigateToTerminal}
        />

        {/* What I'm Doing / Core Pillars */}
        <WhatIDoSection />

        {/* Deployment History / Professional Timeline */}
        <ExperienceSection />

        {/* Projects Bento Grid & Production SaaS */}
        <ProjectsSection />

        {/* System Capability & Skills Matrix */}
        <SkillsMatrix />

        {/* Interactive CLI Terminal Emulator */}
        <TerminalWidget />

        {/* Direct Dispatch & Communication Link */}
        <ContactSection />
      </main>

      {/* Resume / CV Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* SRE Footer */}
      <Footer />
    </div>
  );
}
