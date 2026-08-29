import React from 'react';
import { 
  User, 
  FolderGit2, 
  FileText, 
  Terminal, 
  Mail, 
  Layers, 
  Cpu,
  Check
} from 'lucide-react';
import { useTheme, AccentColor } from '../context/ThemeContext';

interface PratamaSidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const PratamaSidebar: React.FC<PratamaSidebarProps> = ({
  activeSection,
  onSelectSection,
  onOpenResume,
}) => {
  const { accentColor, setAccentColor, theme } = useTheme();

  const colorSwatches: { id: AccentColor; label: string; hex: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', hex: '#3b82f6', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', hex: '#06b6d4', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', hex: '#eab308', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', hex: '#f43f5e', bg: 'bg-[#f43f5e]' },
  ];

  const navItems = [
    { id: 'about', label: 'ABOUT', icon: User },
    { id: 'what-i-do', label: 'WHAT I DO', icon: Layers },
    { id: 'experience', label: 'EXPERIENCE', icon: FileText },
    { id: 'projects', label: 'PROJECTS', icon: FolderGit2 },
    { id: 'skills', label: 'SKILLS', icon: Cpu },
    { id: 'terminal', label: 'TERMINAL', icon: Terminal },
    { id: 'contact', label: 'CONTACT', icon: Mail },
  ];

  return (
    <aside className="w-full lg:w-48 xl:w-52 shrink-0 flex flex-col gap-3">
      {/* 4 Colored Style Blocks (Pratama Accent Swatches Theme Switcher) */}
      <div className="bg-[#121620] border border-[#1e2433] rounded-2xl p-3 flex flex-col gap-2 shadow-lg">
        <div className="flex items-center justify-between gap-2">
          {colorSwatches.map((swatch) => {
            const isSelected = accentColor === swatch.id;
            return (
              <button
                key={swatch.id}
                onClick={() => setAccentColor(swatch.id)}
                className={`relative w-8 h-8 rounded-lg ${swatch.bg} flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  isSelected 
                    ? 'scale-110 ring-2 ring-white/80 ring-offset-2 ring-offset-[#121620] shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                    : 'opacity-80 hover:opacity-100 hover:scale-105'
                }`}
                title={`Mudar tema para ${swatch.label}`}
                aria-label={`Tema ${swatch.label}`}
              >
                {isSelected && (
                  <Check className="w-4 h-4 text-white drop-shadow-md stroke-[2.5]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation List Menu */}
      <nav className="bg-[#121620] border border-[#1e2433] rounded-2xl p-2.5 flex flex-col gap-1.5 shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-mono text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? `bg-[#1a2030] ${theme.activeText} border ${theme.activeBorder} ${theme.activeGlow}`
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#161b27] border border-transparent'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? theme.activeText : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              
              {/* Dot indicator */}
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive ? 'bg-emerald-400 shadow-[0_0_6px_#10b981]' : 'bg-slate-700'
                }`}
              ></span>
            </button>
          );
        })}

        {/* Quick CV Trigger */}
        <div className="pt-2 mt-1 border-t border-[#1e2433]/70">
          <button
            onClick={onOpenResume}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 hover:text-white font-mono text-xs font-semibold border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>CV MODAL</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};
