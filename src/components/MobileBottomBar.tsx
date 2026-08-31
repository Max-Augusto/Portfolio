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
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface MobileBottomBarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  activeSection,
  onSelectSection
}) => {
  const { theme, isDark, toggleMode } = useTheme();
  const { isPT, setLanguage, t } = useLanguage();
  const [showDrawer, setShowDrawer] = useState(false);

  const allSections = [
    { id: 'about', label: t('nav.about'), desc: isPT ? 'Perfil profissional, biografia e visão geral' : 'Professional profile, bio and overview', icon: User, num: '01' },
    { id: 'what-i-do', label: t('nav.what_i_do'), desc: isPT ? 'Infraestrutura N2, SRE e Engenharia de Backend' : 'N2 Infrastructure, SRE & Backend Engineering', icon: Layers, num: '02' },
    { id: 'experience', label: t('nav.experience'), desc: isPT ? 'Positivo S+ (Pampulha), setor público e projetos' : 'Positivo S+ (Pampulha), public sector & roles', icon: FileText, num: '03' },
    { id: 'projects', label: t('nav.projects'), desc: isPT ? 'Betim Express SaaS, APIs e algoritmos' : 'Betim Express SaaS, APIs & algorithms', icon: FolderGit2, num: '04' },
    { id: 'skills', label: t('nav.skills'), desc: isPT ? 'Python, .NET, Linux, Redes, Docker e Banco de Dados' : 'Python, .NET, Linux, Networks, Docker & Databases', icon: Cpu, num: '05' },
    { id: 'topology', label: t('nav.topology'), desc: isPT ? 'Simulador interativo de rede L2/L3 e troubleshooting' : 'Interactive L2/L3 network simulator & troubleshooting', icon: Network, num: '06' },
    { id: 'terminal', label: t('nav.terminal'), desc: isPT ? 'Shell interativo com comandos Linux e Matrix' : 'Interactive shell with Linux commands and Matrix', icon: Terminal, num: '07' },
    { id: 'contact', label: t('nav.contact'), desc: isPT ? 'Formulário direto, WhatsApp, LinkedIn e GitHub' : 'Direct contact form, WhatsApp, LinkedIn & GitHub', icon: Mail, num: '08' },
  ];

  // 4 Primary Direct Quick Shortcuts in Bottom Dock (matching the exact section names)
  const primaryDockTabs = [
    { id: 'about', label: t('nav.about'), icon: User },
    { id: 'what-i-do', label: t('nav.what_i_do'), icon: Layers },
    { id: 'experience', label: t('nav.experience'), icon: FileText },
    { id: 'projects', label: t('nav.projects'), icon: FolderGit2 },
    { id: 'contact', label: t('nav.contact'), icon: Mail },
  ];

  const handleSelect = (id: string) => {
    onSelectSection(id);
    setShowDrawer(false);
  };

  const isPrimaryActive = primaryDockTabs.some(tab => tab.id === activeSection);
  const currentSectionObj = allSections.find(s => s.id === activeSection) || allSections[0];

  return (
    <>
      {/* 1. ERGONOMIC FLOATING BOTTOM DOCK (Mobile App standard pattern) */}
      <nav 
        aria-label="Navegação rápida inferior"
        className="lg:hidden fixed bottom-3 left-3 right-3 z-40 max-w-lg mx-auto"
      >
        <div className={`${theme.bgCard}/95 backdrop-blur-xl border ${theme.borderCard} rounded-2xl p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.35)] flex items-center justify-around gap-1`}>
          {primaryDockTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleSelect(tab.id)}
                className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer min-h-[50px] select-none ${
                  isActive 
                    ? `${theme.activeBg} text-white font-bold shadow-sm ring-1 ring-white/20` 
                    : `${theme.textSecondary} hover:${theme.textPrimary} hover:${theme.bgSubCard}`
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : theme.textMuted}`} />
                <span className="text-[11px] font-mono mt-0.5 tracking-tight truncate max-w-full">
                  {tab.label}
                </span>
              </button>
            );
          })}

          {/* 6th Tab: Mais (8) with Drawer Trigger */}
          <button
            onClick={() => setShowDrawer(true)}
            className={`flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all cursor-pointer min-h-[50px] select-none ${
              !isPrimaryActive
                ? `${theme.activeBg} text-white font-bold shadow-sm ring-1 ring-white/20`
                : `${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textSecondary} hover:${theme.textPrimary}`
            }`}
            title="Ver todas as 8 seções"
          >
            <Menu className={`w-4 h-4 ${!isPrimaryActive ? 'text-white' : theme.activeText}`} />
            <span className="text-[11px] font-mono mt-0.5 tracking-tight font-medium flex items-center gap-0.5">
              <span>{t('dock.more')}</span>
              <span className={`text-[9px] px-1 py-0.2 rounded-full font-mono ${!isPrimaryActive ? 'bg-white/30 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                8
              </span>
            </span>
          </button>
        </div>
      </nav>

      {/* 2. FULL DRAWER BOTTOM SHEET WITH ALL 8 SECTIONS */}
      {showDrawer && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end animate-fadeIn">
          {/* Backdrop dismiss */}
          <div className="fixed inset-0" onClick={() => setShowDrawer(false)} />
          
          <div className={`relative z-10 ${theme.bgCard} border-t ${theme.borderCard} rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto shadow-2xl space-y-4 pb-8`}>
            
            {/* Drawer Header */}
            <div className={`flex items-center justify-between pb-3 border-b ${theme.borderCard}`}>
              <div>
                <div className={`font-mono text-sm font-bold ${theme.textPrimary} flex items-center gap-2`}>
                  <Menu className={`w-4 h-4 ${theme.activeText}`} />
                  <span>{t('drawer.title')}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  {t('drawer.subtitle')}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLanguage(isPT ? 'en' : 'pt')}
                  className={`px-2.5 py-1.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textPrimary} text-xs font-mono font-bold cursor-pointer`}
                  title="Alternar idioma"
                >
                  {isPT ? 'EN' : 'PT'}
                </button>
                <button
                  onClick={toggleMode}
                  className={`p-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} ${theme.textSecondary} cursor-pointer`}
                  title={isDark ? 'Modo Claro' : 'Modo Escuro'}
                >
                  {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-blue-600" />}
                </button>
                <button 
                  onClick={() => setShowDrawer(false)}
                  className={`p-2 rounded-xl ${theme.bgSubCard} ${theme.textSecondary} hover:${theme.textPrimary} border ${theme.borderSubCard} cursor-pointer`}
                  aria-label="Fechar menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List of all 8 sections in Grid */}
            <div className="grid grid-cols-1 gap-2 pt-1">
              {allSections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => handleSelect(sec.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer text-left ${
                      isActive 
                        ? `${theme.bgSubCard} ${theme.activeBadgeBorder} shadow-md ring-1 ring-white/10` 
                        : `${theme.bgSubCard} ${theme.borderSubCard} ${theme.textSecondary} hover:${theme.textPrimary}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? `${theme.activeBg} text-white shadow-sm` : `${theme.bgCard} ${theme.textMuted}`
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className={`text-sm font-bold font-mono ${isActive ? theme.activeText : theme.textPrimary} flex items-center gap-2`}>
                          <span>{sec.label}</span>
                          {isActive && (
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-1.5 py-0.2 rounded font-mono font-normal">
                              {t('drawer.active')}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-mono mt-0.5 line-clamp-1">
                          {sec.desc}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono text-slate-500 font-bold">
                        {sec.num}
                      </span>
                      <ChevronRight className={`w-4 h-4 ${isActive ? theme.activeText : 'text-slate-500 opacity-50'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </>
  );
};
