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
import { PERSONAL_INFO } from '../data/portfolioData';

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
  const { theme, setAccentColor, accentColor } = useTheme();

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
    { id: 'about', label: 'Sobre Mim (About)', category: 'Navegação', icon: User, shortcut: '1' },
    { id: 'what-i-do', label: 'O Que Faço (Architecture & Infra)', category: 'Navegação', icon: Layers, shortcut: '2' },
    { id: 'experience', label: 'Experiência Profissional (Positivo S+)', category: 'Navegação', icon: FileText, shortcut: '3' },
    { id: 'projects', label: 'Projetos (Betim Express & Microservices)', category: 'Navegação', icon: FolderGit2, shortcut: '4' },
    { id: 'skills', label: 'Matriz de Habilidades (.NET, Django, Redes)', category: 'Navegação', icon: Layers, shortcut: '5' },
    { id: 'topology', label: 'Topologia & Laboratório de Redes N2', category: 'Navegação', icon: Network, shortcut: '6' },
    { id: 'terminal', label: 'Console Terminal Interativo', category: 'Navegação', icon: Terminal, shortcut: '7' },
    { id: 'contact', label: 'Contato Direto & Mensagem', category: 'Navegação', icon: Send, shortcut: '8' },
  ];

  const themeOptions: { id: AccentColor; label: string; hex: string }[] = [
    { id: 'blue', label: 'Cobalt Blue (Padrão)', hex: '#3b82f6' },
    { id: 'cyan', label: 'Cyber Cyan (Redes)', hex: '#06b6d4' },
    { id: 'amber', label: 'Amber Gold (Operações)', hex: '#eab308' },
    { id: 'rose', label: 'Coral Rose (SaaS)', hex: '#f43f5e' },
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
          className="relative w-full max-w-xl bg-[#121620] border border-[#242b3d] rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Top Search Input */}
          <div className="flex items-center px-4 border-b border-[#1e2433] bg-[#181d2a]/70">
            <Search className={`w-5 h-5 ${theme.activeText} shrink-0`} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite um comando, seção ou ação..."
              className="w-full bg-transparent px-3.5 py-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-mono"
            />
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#242b3d] text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action List Content */}
          <div className="max-h-[380px] overflow-y-auto p-2 space-y-4 font-mono text-xs">
            
            {/* Quick Actions */}
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Ações Rápidas
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    onOpenResume();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#181d2a] text-slate-200 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className={`w-4 h-4 ${theme.activeText}`} />
                    <span>Visualizar Currículo Completo (PDF)</span>
                  </div>
                  <span className="text-[10px] bg-[#1e2433] px-2 py-0.5 rounded text-slate-400">
                    Abrir CV
                  </span>
                </button>

                <button
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'Email')}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#181d2a] text-slate-200 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    {copiedText === 'Email' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className={`w-4 h-4 ${theme.activeText}`} />
                    )}
                    <span>{PERSONAL_INFO.email}</span>
                  </div>
                  <span className="text-[10px] bg-[#1e2433] px-2 py-0.5 rounded text-slate-400">
                    {copiedText === 'Email' ? 'Copiado!' : 'Copiar E-mail'}
                  </span>
                </button>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#181d2a] text-slate-200 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <ExternalLink className={`w-4 h-4 ${theme.activeText}`} />
                    <span>GitHub: github.com/Max-Augusto</span>
                  </div>
                  <span className="text-[10px] bg-[#1e2433] px-2 py-0.5 rounded text-slate-400">
                    Externo ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Navigation Section */}
            {filteredSections.length > 0 && (
              <div>
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Navegar Para
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
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#181d2a] text-slate-200 hover:text-white transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 text-slate-400 group-hover:${theme.activeText}`} />
                          <span>{item.label}</span>
                        </div>
                        <kbd className="text-[10px] bg-[#1e2433] px-2 py-0.5 rounded text-slate-400 font-bold border border-[#272f42]">
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
                <div className="px-3 py-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Temas & Cores do Console
                </div>
                <div className="space-y-1">
                  {filteredThemes.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setAccentColor(item.id);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#181d2a] text-slate-200 hover:text-white transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span 
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ backgroundColor: item.hex }}
                        />
                        <span>{item.label}</span>
                      </div>
                      {accentColor === item.id && (
                        <span className="text-[10px] text-emerald-400 font-bold">
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
          <div className="p-3 bg-[#181d2a]/80 border-t border-[#1e2433] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Dica: Use <strong>ESC</strong> para fechar</span>
            <div className="flex items-center gap-2">
              <span>Navegar: <strong>1 a 8</strong></span>
              <span>•</span>
              <span>Paleta: <strong>⌘K / Ctrl+K</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
