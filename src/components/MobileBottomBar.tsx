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
  Compass,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { useTheme, AccentColor } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomBarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activeSection,
  onSelectSection
}) => {
  const { accentColor, setAccentColor, theme, mode, toggleMode, isDark } = useTheme();
  const { language, setLanguage, isPT, t } = useLanguage();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAllSectionsDrawer, setShowAllSectionsDrawer] = useState(false);

  const allSections = [
    { id: 'about', label: t('nav.about'), fullLabel: isPT ? 'Sobre Mim & Perfil' : 'About Me & Profile', icon: User, badge: 'N2 / SRE' },
    { id: 'what-i-do', label: t('nav.what_i_do'), fullLabel: isPT ? 'Áreas de Atuação' : 'Areas of Expertise', icon: Layers, badge: isPT ? '4 Pilares' : '4 Pillars' },
    { id: 'experience', label: t('nav.experience'), fullLabel: isPT ? 'Experiência & Trajetória' : 'Career & Experience', icon: FileText, badge: 'Positivo S+ / PLU' },
    { id: 'projects', label: t('nav.projects'), fullLabel: isPT ? 'Projetos & SaaS' : 'Projects & SaaS', icon: FolderGit2, badge: 'Betim Express' },
    { id: 'skills', label: t('nav.skills'), fullLabel: isPT ? 'Habilidades & Tecnologias' : 'Skills & Technologies', icon: Cpu, badge: 'L2/L3 · Django' },
    { id: 'topology', label: t('nav.topology'), fullLabel: isPT ? 'Lab & Topologia L3' : 'Lab & Topology L3', icon: Network, badge: isPT ? 'Simulador' : 'Simulator' },
    { id: 'terminal', label: t('nav.terminal'), fullLabel: isPT ? 'Terminal Interativo' : 'Interactive CLI', icon: Terminal, badge: 'Shell SRE' },
    { id: 'contact', label: t('nav.contact'), fullLabel: isPT ? 'Fale Comigo' : 'Contact & Channels', icon: Mail, badge: 'WhatsApp / Email' },
  ];

  const colorSwatches: { id: AccentColor; label: string; bg: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', bg: 'bg-[#3b82f6]' },
    { id: 'cyan', label: 'Cyber Cyan', bg: 'bg-[#06b6d4]' },
    { id: 'amber', label: 'Amber Gold', bg: 'bg-[#eab308]' },
    { id: 'rose', label: 'Coral Rose', bg: 'bg-[#f43f5e]' },
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
        <div className="lg:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          <div className={`${theme.bgCard} border-t ${theme.borderCard} rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl`}>
            
            <div className={`flex items-center justify-between pb-3.5 border-b ${theme.borderCard}`}>
              <div className="flex items-center gap-2">
                <Compass className={`w-4 h-4 ${theme.activeText}`} />
                <span className={`font-mono text-xs font-bold ${theme.textPrimary}`}>
                  {isPT ? 'MAPA DE SEÇÕES // NAVEGAÇÃO' : 'SECTION MAP // NAVIGATION'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {/* Language switch */}
                <button
                  onClick={() => setLanguage(isPT ? 'en' : 'pt')}
                  className={`px-2 py-1 rounded-lg ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textPrimary} text-xs font-mono font-bold`}
                >
                  {isPT ? 'EN' : 'PT'}
                </button>
                {/* Light/Dark switch */}
                <button
                  onClick={toggleMode}
                  className={`p-1.5 rounded-lg ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textSecondary}`}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
                </button>
                <button 
                  onClick={() => setShowAllSectionsDrawer(false)}
                  className={`p-1.5 rounded-xl ${theme.bgSubCard} ${theme.textSecondary} hover:${theme.textPrimary} border ${theme.borderSubCard}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
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
                        ? `${theme.bgSubCard} ${theme.activeBadgeBorder} ${theme.activeGlow}` 
                        : `${theme.bgSubCard} ${theme.borderSubCard} ${theme.textSecondary}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? theme.activeTagBg : `${theme.bgCard} ${theme.textMuted}`
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-xs font-bold font-mono ${isActive ? theme.activeText : theme.textPrimary}`}>
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
          className={`lg:hidden fixed bottom-20 left-4 right-4 z-40 ${theme.bgCard} backdrop-blur-md border ${theme.borderCard} rounded-2xl p-3.5 shadow-2xl animate-fadeIn flex items-center justify-between`}
        >
          <div className={`text-xs font-mono ${theme.textPrimary} font-bold flex items-center gap-1.5`}>
            <Palette className={`w-4 h-4 ${theme.activeText}`} />
            <span>{isPT ? 'TEMA:' : 'THEME:'}</span>
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
        className={`lg:hidden fixed bottom-3 left-3 right-3 z-40 ${theme.bgCard} backdrop-blur-xl border ${theme.borderCard} rounded-2xl px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex items-center justify-between gap-1.5`}
      >
        {/* Prev section button */}
        <button
          onClick={handlePrev}
          aria-label="Seção anterior"
          className={`p-2.5 rounded-xl ${theme.bgSubCard} hover:bg-slate-200 dark:hover:bg-[#1f2638] ${theme.textSecondary} active:scale-95 transition-all border ${theme.borderSubCard} shrink-0`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Current Active Section Badge / Menu Trigger */}
        <button
          onClick={() => {
            setShowAllSectionsDrawer(true);
            setShowColorPicker(false);
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 ${theme.textPrimary} transition-all cursor-pointer min-w-0`}
        >
          <currentSection.icon className={`w-4 h-4 ${theme.activeText} shrink-0`} />
          <div className="flex items-center gap-1.5 truncate">
            <span className={`font-mono text-xs font-bold ${theme.textPrimary} uppercase tracking-wider truncate`}>
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
          className={`p-2.5 rounded-xl ${theme.bgSubCard} hover:bg-slate-200 dark:hover:bg-[#1f2638] ${theme.textSecondary} active:scale-95 transition-all border ${theme.borderSubCard} shrink-0`}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Light/Dark Toggle */}
        <button
          onClick={toggleMode}
          className={`p-2.5 rounded-xl transition-all border shrink-0 ${theme.bgSubCard} ${theme.textSecondary} border ${theme.borderSubCard}`}
          title={isDark ? 'Modo Claro' : 'Modo Escuro'}
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
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
              : `${theme.bgSubCard} ${theme.textSecondary} border ${theme.borderSubCard}`
          }`}
          title="Mudar cores"
        >
          <Palette className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
};
