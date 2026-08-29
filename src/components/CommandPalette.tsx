import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Terminal, 
  Layers, 
  FolderGit2, 
  FileText, 
  Network, 
  Send, 
  User, 
  Palette, 
  ExternalLink,
  Copy,
  Check,
  X
} from 'lucide-react';
import { useTheme, AccentColor } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { getPersonalInfo } from '../data/localizedData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenResume,
}) => {
  const [query, setQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { theme, setAccentColor, accentColor, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setCopiedText(null);
    }
  }, [isOpen]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sections = [
    { id: 'about', label: isPT ? 'Sobre Mim (About)' : 'About Me', category: isPT ? 'Navegação' : 'Navigation', icon: User, shortcut: '1' },
    { id: 'what-i-do', label: isPT ? 'O Que Faço (Architecture & Infra)' : 'What I Do (Architecture & Infra)', category: isPT ? 'Navegação' : 'Navigation', icon: Layers, shortcut: '2' },
    { id: 'experience', label: isPT ? 'Experiência Profissional (Positivo S+)' : 'Career Experience (Positivo S+)', category: isPT ? 'Navegação' : 'Navigation', icon: FileText, shortcut: '3' },
    { id: 'projects', label: isPT ? 'Projetos (Betim Express & Microservices)' : 'Projects (Betim Express & Microservices)', category: isPT ? 'Navegação' : 'Navigation', icon: FolderGit2, shortcut: '4' },
    { id: 'skills', label: isPT ? 'Matriz de Habilidades (.NET, Django, Redes)' : 'Skills Matrix (.NET, Django, Networks)', category: isPT ? 'Navegação' : 'Navigation', icon: Layers, shortcut: '5' },
    { id: 'topology', label: isPT ? 'Topologia & Laboratório de Redes N2' : 'L2/L3 Topology Lab', category: isPT ? 'Navegação' : 'Navigation', icon: Network, shortcut: '6' },
    { id: 'terminal', label: isPT ? 'Console Terminal Interativo' : 'Interactive Terminal Console', category: isPT ? 'Navegação' : 'Navigation', icon: Terminal, shortcut: '7' },
    { id: 'contact', label: isPT ? 'Contato Direto & Mensagem' : 'Direct Contact & Message', category: isPT ? 'Navegação' : 'Navigation', icon: Send, shortcut: '8' },
  ];

  const themeOptions: { id: AccentColor; label: string; hex: string }[] = [
    { id: 'blue', label: 'Cobalt Blue', hex: '#3b82f6' },
    { id: 'cyan', label: 'Cyber Cyan', hex: '#06b6d4' },
    { id: 'amber', label: 'Amber Gold', hex: '#eab308' },
    { id: 'rose', label: 'Coral Rose', hex: '#f43f5e' },
  ];

  const filteredSections = sections.filter(s => 
    s.label.toLowerCase().includes(query.toLowerCase()) || 
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  const filteredThemes = themeOptions.filter(t => 
    t.label.toLowerCase().includes(query.toLowerCase()) ||
    t.id.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Command Dialog Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`relative w-full max-w-xl ${theme.bgCard} border ${theme.borderCard} rounded-2xl shadow-2xl overflow-hidden z-10`}
        >
          {/* Top Search Input */}
          <div className={`flex items-center px-4 border-b ${theme.borderCard} ${theme.bgSubCard}`}>
            <Search className={`w-5 h-5 ${theme.activeText} shrink-0`} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isPT ? "Digite um comando, seção ou ação..." : "Type a command, section or action..."}
              className={`w-full bg-transparent px-3.5 py-4 text-sm ${theme.textPrimary} placeholder-slate-400 focus:outline-none font-mono`}
            />
            <button
              onClick={onClose}
              className={`p-1 rounded-lg hover:${theme.bgCard} ${theme.textMuted} hover:${theme.textPrimary} transition-colors`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List Content */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-4 font-mono text-xs">
            
            {/* Quick Actions */}
            <div>
              <div className={`px-3 py-1.5 text-[10px] font-bold ${theme.textMuted} uppercase tracking-wider`}>
                {isPT ? 'Ações Rápidas' : 'Quick Actions'}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onOpenResume();
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:${theme.bgSubCard} ${theme.textPrimary} transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${theme.activeText}`} />
                    <span>{isPT ? 'Visualizar Currículo Completo (PDF)' : 'View Full Resume (PDF)'}</span>
                  </div>
                  <span className={`text-[10px] ${theme.bgSubCard} px-2 py-0.5 rounded ${theme.textMuted}`}>
                    CV
                  </span>
                </button>

                <button
                  onClick={() => handleCopy(personalInfo.email, 'Email')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:${theme.bgSubCard} ${theme.textPrimary} transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center gap-2.5">
                    {copiedText === 'Email' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className={`w-4 h-4 ${theme.activeText}`} />
                    )}
                    <span>{personalInfo.email}</span>
                  </div>
                  <span className={`text-[10px] ${theme.bgSubCard} px-2 py-0.5 rounded ${theme.textMuted}`}>
                    {copiedText === 'Email' ? t('header.copied') : t('header.copy_email')}
                  </span>
                </button>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:${theme.bgSubCard} ${theme.textPrimary} transition-colors cursor-pointer group`}
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className={`w-4 h-4 ${theme.activeText}`} />
                    <span>GitHub: github.com/Max-Augusto</span>
                  </div>
                  <span className={`text-[10px] ${theme.bgSubCard} px-2 py-0.5 rounded ${theme.textMuted}`}>
                    GitHub ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Navigation Section */}
            {filteredSections.length > 0 && (
              <div>
                <div className={`px-3 py-1.5 text-[10px] font-bold ${theme.textMuted} uppercase tracking-wider`}>
                  {isPT ? 'Navegar Para' : 'Navigate To'}
                </div>
                <div className="space-y-1">
                  {filteredSections.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          onClose();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:${theme.bgSubCard} ${theme.textPrimary} transition-colors cursor-pointer group`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${theme.textMuted} group-hover:${theme.activeText}`} />
                          <span>{item.label}</span>
                        </div>
                        <kbd className={`text-[10px] ${theme.bgSubCard} px-2 py-0.5 rounded ${theme.textMuted} font-bold border ${theme.borderSubCard}`}>
                          {item.shortcut}
                        </kbd>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Themes Switcher */}
            {filteredThemes.length > 0 && (
              <div>
                <div className={`px-3 py-1.5 text-[10px] font-bold ${theme.textMuted} uppercase tracking-wider`}>
                  {isPT ? 'Paleta de Cores' : 'Color Accent'}
                </div>
                <div className="space-y-1">
                  {filteredThemes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAccentColor(item.id);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl hover:${theme.bgSubCard} ${theme.textPrimary} transition-colors cursor-pointer`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: item.hex }}
                        />
                        <span>{item.label}</span>
                      </div>
                      {accentColor === item.id && (
                        <span className="text-[10px] text-emerald-500 font-bold">
                          Ativo ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer Shortcuts */}
          <div className={`p-3 ${theme.bgSubCard} border-t ${theme.borderCard} flex items-center justify-between text-[11px] font-mono ${theme.textMuted}`}>
            <span>{isPT ? 'Dica: Use ESC para fechar' : 'Tip: Use ESC to close'}</span>
            <div className="flex items-center gap-2">
              <span>{isPT ? 'Paleta: ⌘K / Ctrl+K' : 'Palette: ⌘K / Ctrl+K'}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
