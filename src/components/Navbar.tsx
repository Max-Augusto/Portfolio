import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  User, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Mail, 
  Menu, 
  X, 
  FileText,
  Github,
  Linkedin
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { id: 'about', label: 'Sobre', icon: User },
    { id: 'what-i-do', label: 'O Que Faço', icon: Cpu },
    { id: 'experience', label: 'Experiência', icon: Briefcase },
    { id: 'projects', label: 'Projetos', icon: FolderGit2 },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'terminal', label: 'Terminal', icon: Terminal },
    { id: 'contact', label: 'Contato', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="sticky top-[37px] z-40 w-full border-b border-[#1e293b]/80 bg-[#090d16]/95 backdrop-blur-md px-4 sm:px-6 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand / Logo */}
        <a 
          href="#about" 
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#0f172a] border border-[#10b981]/40 flex items-center justify-center text-[#10b981] font-mono font-bold text-sm shadow-[0_0_12px_rgba(16,185,129,0.2)] group-hover:border-[#10b981] group-hover:shadow-[0_0_16px_rgba(16,185,129,0.4)] transition-all">
            MA
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#f8fafc] tracking-tight group-hover:text-[#10b981] transition-colors flex items-center gap-1.5">
              Max Augusto
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1e293b] text-[#06b6d4] font-normal hidden sm:inline">
                v2.6
              </span>
            </span>
            <span className="text-[10px] font-mono text-[#94a3b8] -mt-0.5">
              Infra / SRE & Backend
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-[#0f172a]/70 p-1 rounded-xl border border-[#1e293b]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1e293b] text-[#10b981] shadow-sm border border-[#10b981]/30 font-semibold'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#10b981]' : 'text-[#64748b]'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub Profile"
            className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#10b981] hover:border-[#10b981]/40 transition-all"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#06b6d4] hover:border-[#06b6d4]/40 transition-all"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#10b981] text-[#090d16] font-mono text-xs font-bold hover:bg-[#34d399] transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV / RESUMO</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#10b981] text-[#090d16] font-mono text-[11px] font-bold sm:hidden"
          >
            <FileText className="w-3 h-3" />
            <span>CV</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc]"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-[#1e293b] flex flex-col gap-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1e293b] text-[#10b981] border-l-2 border-[#10b981]'
                    : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-[#1e293b]/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#10b981]' : 'text-[#64748b]'}`} />
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="pt-2 mt-1 border-t border-[#1e293b] flex items-center justify-between gap-2 px-1">
            <div className="flex gap-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] text-xs flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] text-xs flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="px-3 py-2 rounded-lg bg-[#10b981] text-[#090d16] font-mono text-xs font-bold"
            >
              Ver Currículo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
