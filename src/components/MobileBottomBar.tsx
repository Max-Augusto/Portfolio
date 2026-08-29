import React, { useState } from 'react';
import { 
  User, 
  Layers, 
  FileText, 
  FolderGit2, 
  Cpu, 
  Network, 
  Terminal, 
  Mail,
  Palette,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Compass
} from 'lucide-react';
import { useTheme, AccentColor } from '../context/ThemeContext';

interface MobileBottomBarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activeSection,
  onSelectSection
}) => {
  const { accentColor, setAccentColor, theme } = useTheme();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAllSectionsDrawer, setShowAllSectionsDrawer] = useState(false);

  const allSections = [
    { id: 'about', label: 'About', fullLabel: 'Sobre Mim & Perfil', icon: User, badge: 'N2 / SRE' },
    { id: 'what-i-do', label: 'Stack', fullLabel: 'Áreas de Atuação', icon: Layers, badge: '4 Pilares' },
    { id: 'experience', label: 'Exp', fullLabel: 'Experiência & Trajetória', icon: FileText, badge: 'Positivo S+ / Pampulha' },
    { id: 'projects', label: 'Projetos', fullLabel: 'Projetos & SaaS', icon: FolderGit2, badge: 'Betim Express' },
    { id: 'skills', label: 'Skills', fullLabel: 'Habilidades & Tecnologias', icon: Cpu, badge: 'L2/L3 · Django' },
    { id: 'topology', label: 'Topologia', fullLabel: 'Lab & Topologia L3', icon: Network, badge: 'Simulador' },
    { id: 'terminal', label: 'CLI', fullLabel: 'Terminal Interativo', icon: Terminal, badge: 'Shell N2' },
    { id: 'contact', label: 'Contato', fullLabel: 'Fale Comigo', icon: Mail, badge: 'WhatsApp / Email' },
  ];

  const colorSwatches: { id: AccentColor; label: string; hex: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', hex: '#3b82f6', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', hex: '#06b6d4', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', hex: '#eab308', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', hex: '#f43f5e', bg: 'bg-[#f43f5e]' },
  ];

  const currentIndex = allSections.findIndex(s => s.id === activeSection);
  const currentSection = allSections[currentIndex] || allSections[0];

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + allSections.length) % allSections.length;
    onSelectSection(allSections[prevIdx].id);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % allSections.length;
    onSelectSection(allSections[nextIdx].id);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSelect = (id: string) => {
    onSelectSection(id);
    setShowAllSectionsDrawer(false);
    setShowColorPicker(false);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <>
      {/* Full Sections Modal Drawer (Mobile) */}
      {showAllSectionsDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#090b10]/85 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          <div className="bg-[#121620] border-t border-[#272f42] rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl">
            
            <div className="flex items-center justify-between pb-3.5 border-b border-[#1e2433]">
              <div className="flex items-center gap-2">
                <Compass className={`w-4 h-4 ${theme.activeText}`} />
                <span className="font-mono text-xs font-bold text-slate-200">MAPA DE SEÇÕES // NAVEGAÇÃO</span>
              </div>
              <button 
                onClick={() => setShowAllSectionsDrawer(false)}
                className="p-1.5 rounded-xl bg-[#181d2a] text-slate-400 hover:text-white border border-[#272f42]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-4">
              {allSections.map((sec, idx) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelect(sec.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      isActive 
                        ? `bg-[#1a2030] ${theme.activeBadgeBorder} ${theme.activeGlow}` 
                        : 'bg-[#181d2a] border-[#22293b] text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? theme.activeTagBg : 'bg-[#121620] text-slate-400'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold font-mono ${isActive ? theme.activeText : 'text-slate-200'}`}>
                          {sec.fullLabel}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {sec.badge}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-slate-500">
                        0{idx + 1}
                      </span>
                      {isActive && (
                        <span className={`w-2 h-2 rounded-full ${theme.activeBg} animate-pulse`} />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* Floating Theme Quick Selector Drawer (Mobile) */}
      {showColorPicker && (
        <div 
          className="lg:hidden fixed bottom-20 left-4 right-4 z-40 bg-[#121620]/95 backdrop-blur-md border border-[#272f42] rounded-2xl p-3.5 shadow-2xl animate-fadeIn flex items-center justify-between"
        >
          <div className="text-xs font-mono text-slate-300 font-bold flex items-center gap-1.5">
            <Palette className={`w-4 h-4 ${theme.activeText}`} />
            <span>TEMA DE DESTAQUE:</span>
          </div>
          <div className="flex items-center gap-2">
            {colorSwatches.map((swatch) => (
              <button
                key={swatch.id}
                onClick={() => {
                  setAccentColor(swatch.id);
                  setShowColorPicker(false);
                }}
                className={`w-8 h-8 rounded-xl ${swatch.bg} flex items-center justify-center transition-all ${
                  accentColor === swatch.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-80'
                }`}
                title={swatch.label}
              />
            ))}
          </div>
        </div>
      )}

      {/* Optimized Ergonomic Mobile Floating Bottom Bar */}
      <nav 
        aria-label="Navegação rápida mobile"
        className="lg:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#0f131c]/92 backdrop-blur-xl border border-[#242c3f] rounded-2xl px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-1.5"
      >
        {/* Prev section button */}
        <button
          onClick={handlePrev}
          aria-label="Seção anterior"
          className="p-2.5 rounded-xl bg-[#161b26] hover:bg-[#1f2638] text-slate-300 active:scale-95 transition-all border border-[#242b3d] shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Current Active Section Badge / Menu Trigger */}
        <button
          onClick={() => {
            setShowAllSectionsDrawer(true);
            setShowColorPicker(false);
          }}
          className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#161b26] border border-[#242b3d] hover:border-slate-500 text-slate-200 transition-all cursor-pointer min-w-0"
        >
          <currentSection.icon className={`w-4 h-4 ${theme.activeText} shrink-0`} />
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-mono text-xs font-bold text-slate-100 uppercase tracking-wider truncate">
              {currentSection.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500 hidden xs:inline">
              ({currentIndex + 1}/8)
            </span>
          </div>
          <Menu className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-0.5" />
        </button>

        {/* Next section button */}
        <button
          onClick={handleNext}
          aria-label="Próxima seção"
          className="p-2.5 rounded-xl bg-[#161b26] hover:bg-[#1f2638] text-slate-300 active:scale-95 transition-all border border-[#242b3d] shrink-0"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Theme Palette Switcher Icon */}
        <button
          onClick={() => {
            setShowColorPicker(!showColorPicker);
            setShowAllSectionsDrawer(false);
          }}
          className={`p-2.5 rounded-xl transition-all border shrink-0 ${
            showColorPicker 
              ? `${theme.activeBg} text-white border-transparent` 
              : 'bg-[#161b26] hover:bg-[#1f2638] text-slate-300 border-[#242b3d]'
          }`}
          title="Mudar cores"
        >
          <Palette className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
};
