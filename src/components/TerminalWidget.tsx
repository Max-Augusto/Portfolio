import React, { useState, useRef, useEffect } from 'react';
import { 
  CornerDownLeft, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  Command 
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, EXPERIENCES, TERMINAL_COMMANDS_HELP } from '../data/portfolioData';
import { TerminalLog } from '../types';
import { useTheme } from '../context/ThemeContext';

interface TerminalWidgetProps {
  onNavigate?: (section: string) => void;
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ onNavigate }) => {
  const { theme, setAccentColor } = useTheme();
  const [input, setInput] = useState('');
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [history, setHistory] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'MAX-CORE OPERATOR CONSOLE [Version 2.6.4-LTS-Betim]',
      timestamp: '00:00:01',
    },
    {
      id: 'init-2',
      type: 'info',
      text: 'Kernel initialized. Host node: MAX-SRE-V2 (Betim/MG). All subsystems nominal.',
      timestamp: '00:00:02',
    },
    {
      id: 'init-3',
      type: 'success',
      text: 'Digite "help" para ver os comandos disponíveis, "matrix" para modo hacker ou clique nos atalhos.',
      timestamp: '00:00:03',
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const getTimestamp = () => {
    const now = new Date();
    return now.toTimeString().split(' ')[0];
  };

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    const cmdId = Date.now().toString();
    const newLogs: TerminalLog[] = [
      ...history,
      {
        id: `cmd-${cmdId}`,
        type: 'input',
        text: trimmed,
        timestamp: getTimestamp(),
      },
    ];

    setCommandHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    const args = lower.split(' ');
    const mainCmd = args[0];

    switch (mainCmd) {
      case 'help': {
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: `Comandos do Console do Operador:\n${TERMINAL_COMMANDS_HELP.map(c => `• ${c.cmd.padEnd(12)} - ${c.desc}`).join('\n')}`,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'about': {
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'info',
          text: `[OPERADOR] ${PERSONAL_INFO.name}\n[PERFIL] ${PERSONAL_INFO.title}\n[LOCAL] ${PERSONAL_INFO.location}\n\n${PERSONAL_INFO.bio}`,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'skills': {
        const skillsOutput = [
          '⚡ CAPACIDADES TÉCNICAS & ARQUITETURA:',
          '├── Backend: Python, Django REST, FastAPI, C#, .NET 10, PostgreSQL, EF Core',
          '├── Infraestrutura: Redes LAN L2/L3, Switches, Linux/Windows Server, ITIL v4, SLA Crítico',
          '├── Cloud & DevOps: Docker, Docker Compose, Railway, AWS, GitHub Actions, DNS (SPF/DKIM)',
          '└── Segurança: Cisco Cybersecurity, Auth0, Clerk, Secrets Management (.env/Vault)',
        ].join('\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: skillsOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'stats':
      case 'github': {
        const statsOutput = [
          '🐱 GITHUB TELEMETRY & WAKATIME DATA:',
          '├── Contribuições em 2026: 320+ commits (Active Streak)',
          '├── Código Escrito: ~68.48 mil linhas de código',
          '├── Repositórios: 10 Públicos | 5 Privados | Status: Open to Hire',
          '├── Horário Mais Ativo: Early Bird (38.2% Manhã, 33.6% Tarde, 28.1% Noite)',
          '├── Dia de Pico: Sexta-feira (57.5% dos commits)',
          '└── Linguagens Principais: Python (38.5%), HTML (30.8%), TypeScript (15.4%), C# (7.7%), CSS (7.7%)',
        ].join('\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'info',
          text: statsOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'projects': {
        const projOutput = [
          '🚀 PROJETOS & REPOSITÓRIOS EM DESTAQUE:',
          ...PROJECTS.map((p, i) => `${i + 1}. [${p.badge}] ${p.title}\n   ↳ ${p.subtitle}\n   ↳ Stack: ${p.tags.join(', ')}\n   ↳ URL: ${p.liveUrl || p.githubUrl}`),
        ].join('\n\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'info',
          text: projOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'exp':
      case 'experience': {
        const expOutput = [
          '📅 HISTÓRICO DE OPERAÇÕES E EXPERIÊNCIA:',
          ...EXPERIENCES.map((e, i) => `${i + 1}. ${e.company} — ${e.role} (${e.period})\n   ↳ Local: ${e.location} | [${e.badge}]\n   ↳ Destaque: ${e.highlights[0]}`),
        ].join('\n\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: expOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'contact': {
        const contactOutput = [
          '📬 CANAIS DE COMUNICAÇÃO DIRETA:',
          `• E-mail:    ${PERSONAL_INFO.email}`,
          `• Telefone:  ${PERSONAL_INFO.phone}`,
          `• LinkedIn:  ${PERSONAL_INFO.linkedin}`,
          `• GitHub:    ${PERSONAL_INFO.github}`,
          `• Local:     ${PERSONAL_INFO.location}`,
        ].join('\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: contactOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'neofetch':
      case 'sysinfo': {
        const sysOutput = [
          `   /\\_/\\      operator@max-host`,
          `  ( o.o )     -----------------`,
          `   > ^ <      OS: Custom SRE Kernel v2.6.4`,
          `              Host: PUC Minas / Betim Station`,
          `              Uptime: 99.98% High Availability`,
          `              Shell: max-sh (Interactive Operator)`,
          `              Terminal: SRE-Console-Bento`,
          `              CPU: Python / Django Engine @ 3.4GHz`,
          `              Memory: PostgreSQL ACID 100% Buffered`,
          `              Network: L2/L3 Switched + Railway Cloud`,
        ].join('\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'output',
          text: sysOutput,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'ping': {
        const randPing = Math.floor(18 + Math.random() * 10);
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: `PING cluster-betim.lan (192.168.1.1): 56 data bytes\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=${randPing}.${Math.floor(Math.random() * 9)} ms\n--- cluster-betim.lan ping statistics ---\n1 packets transmitted, 1 received, 0% packet loss`,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'curl': {
        if (args[1]?.includes('saas') || args[1]?.includes('betim')) {
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: `HTTP/2 200 OK\nserver: Railway Edge\ndate: ${new Date().toUTCString()}\ncontent-type: application/json\n\n{\n  "service": "Betim Express Logistics SaaS",\n  "status": "operational",\n  "database": "PostgreSQL ACID Active",\n  "payments": "MercadoPago Webhook Connected",\n  "domain": "https://www.betimexpress.com.br"\n}`,
            timestamp: getTimestamp(),
          });
        } else {
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'info',
            text: `curl: specify target, e.g. "curl saas" or "curl betimexpress"`,
            timestamp: getTimestamp(),
          });
        }
        break;
      }

      case 'cat': {
        if (args[1] === 'cv' || args[1] === 'resume') {
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'output',
            text: `=== CURRÍCULO TÉCNICO: MAX AUGUSTO ===\n- Cargo: Support & Infrastructure Analyst | Python & Django Developer\n- Formação: Bacharelado em Sistemas de Informação (PUC Minas, 2024-2027)\n- Certificação: Introduction to Cybersecurity (Cisco)\n- Experiências: Positivo S+ (Aeroporto/Aviação), Betim Express (SaaS), Prefeitura de Betim (N2/Redes)\n- Contato: ${PERSONAL_INFO.email} | ${PERSONAL_INFO.phone}`,
            timestamp: getTimestamp(),
          });
        } else {
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'error',
            text: `cat: ${args[1] || 'file'}: No such file or directory. Try "cat cv"`,
            timestamp: getTimestamp(),
          });
        }
        break;
      }

      case 'sudo': {
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'error',
          text: `operator is not in the sudoers file. This incident will be reported to Max Augusto.`,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'matrix': {
        setIsMatrixMode(prev => !prev);
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: `[MATRIX] Modo Matrix ${!isMatrixMode ? 'ATIVADO' : 'DESATIVADO'}. Digite "matrix" novamente para alternar.`,
          timestamp: getTimestamp(),
        });
        break;
      }

      case 'theme': {
        const targetTheme = args[1];
        if (targetTheme && ['blue', 'cyan', 'amber', 'rose'].includes(targetTheme)) {
          setAccentColor(targetTheme as any);
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: `✔ Paleta visual do console alterada para: ${targetTheme.toUpperCase()}`,
            timestamp: getTimestamp(),
          });
        } else {
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'info',
            text: `Uso: theme <blue | cyan | amber | rose>\nExemplo: theme cyan`,
            timestamp: getTimestamp(),
          });
        }
        break;
      }

      case 'topology':
      case 'lab': {
        if (onNavigate) {
          onNavigate('topology');
          newLogs.push({
            id: `out-${cmdId}`,
            type: 'success',
            text: `✔ Redirecionando para o Laboratório de Topologia & Redes N2...`,
            timestamp: getTimestamp(),
          });
        }
        break;
      }

      case 'clear':
      case 'cls': {
        setHistory([
          {
            id: `clear-${cmdId}`,
            type: 'system',
            text: 'Terminal limpo. Digite "help" para ver os comandos.',
            timestamp: getTimestamp(),
          },
        ]);
        setInput('');
        return;
      }

      default: {
        newLogs.push({
          id: `out-${cmdId}`,
          type: 'error',
          text: `Comando não reconhecido: "${trimmed}". Digite "help" para ver os comandos válidos.`,
          timestamp: getTimestamp(),
        });
      }
    }

    setHistory(newLogs);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (!current) return;
      const matched = TERMINAL_COMMANDS_HELP.find(c => c.cmd.startsWith(current));
      if (matched) {
        setInput(matched.cmd);
      }
    }
  };

  const quickCommands = ['help', 'skills', 'projects', 'exp', 'topology', 'matrix', 'contact', 'sysinfo', 'ping', 'curl saas', 'clear'];

  const copyTerminalOutput = () => {
    const textToCopy = history.map(h => `[${h.timestamp}] ${h.type === 'input' ? '$ ' : ''}${h.text}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="bg-[#121620] border border-[#1e2433] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-widest mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>INTERACTIVE_SHELL // CLI_EMULATOR</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>Terminal Console</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 self-start sm:self-auto">
          <button
            onClick={copyTerminalOutput}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:text-white text-[11px] sm:text-xs font-mono transition-all cursor-pointer shadow-xs min-h-[36px]"
            title="Copiar log do terminal"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'COPIADO' : 'COPIAR'}</span>
          </button>

          <button
            onClick={() => handleCommand('clear')}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:text-rose-400 text-[11px] sm:text-xs font-mono transition-all cursor-pointer shadow-xs min-h-[36px]"
            title="Limpar terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>LIMPAR</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-xl bg-[#181d2a] border border-[#272f42] text-slate-400 hover:text-white transition-all cursor-pointer shadow-xs min-h-[36px] min-w-[36px] flex items-center justify-center"
            title={isExpanded ? 'Diminuir tamanho' : 'Expandir terminal'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Main Window */}
      <div className={`bg-[#0a0d14] border border-[#1e2433] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? 'h-[520px] sm:h-[650px]' : 'h-[360px] sm:h-[440px]'
      } flex flex-col relative scanline`}>
        
        {/* Terminal Header Bar */}
        <div className="bg-[#121620] px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-[#1e2433] flex items-center justify-between font-mono text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#ef4444]"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#f59e0b]"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#10b981]"></span>
            </div>
            <span className="ml-1 sm:ml-2 text-slate-200 font-semibold text-[10px] sm:text-[11px] truncate">
              bash — max@operator: ~
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] text-slate-500 shrink-0">
            <span>TAB: AUTOCOMPLETE</span>
            <span>▲▼: HISTÓRICO</span>
          </div>
        </div>

        {/* Terminal Logs View */}
        <div 
          ref={logsContainerRef}
          onClick={() => inputRef.current?.focus()}
          className={`flex-1 p-3 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm space-y-2 terminal-scroll cursor-text transition-colors duration-300 ${
            isMatrixMode ? 'bg-[#030d06] text-emerald-400 font-semibold' : ''
          }`}
        >
          {history.map((log) => {
            let textColor = 'text-slate-300';

            if (isMatrixMode) {
              textColor = 'text-emerald-400';
            }

            if (log.type === 'input') {
              return (
                <div key={log.id} className="flex items-start gap-1.5 sm:gap-2 text-slate-100">
                  <span className={`${isMatrixMode ? 'text-emerald-500' : theme.activeText} font-bold select-none text-[11px] sm:text-xs shrink-0`}>operator@max:~$</span>
                  <span className={isMatrixMode ? 'text-emerald-300 font-bold' : `${theme.activeText} font-semibold`}>{log.text}</span>
                  <span className="text-[9px] sm:text-[10px] text-slate-600 ml-auto select-none hidden xs:inline">{log.timestamp}</span>
                </div>
              );
            }

            if (!isMatrixMode) {
              if (log.type === 'system') textColor = 'text-slate-500';
              if (log.type === 'info') textColor = theme.activeText;
              if (log.type === 'success') textColor = 'text-emerald-400';
              if (log.type === 'error') textColor = 'text-rose-400';
            }

            return (
              <div key={log.id} className={`leading-relaxed whitespace-pre-wrap text-[11px] sm:text-xs ${textColor}`}>
                {log.text}
              </div>
            );
          })}
        </div>

        {/* Terminal Input Bar */}
        <div className="p-2 sm:p-3 bg-[#121620] border-t border-[#1e2433] flex items-center gap-1.5 sm:gap-2">
          <span className={`${theme.activeText} font-mono text-[11px] sm:text-xs font-bold shrink-0 select-none`}>
            $
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="help, skills, projects, contact..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:ring-0 min-h-[36px]"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
          />
          <button
            onClick={() => handleCommand(input)}
            className={`p-2 rounded-lg ${theme.activeBg} text-white font-bold ${theme.activeBgHover} transition-all cursor-pointer shrink-0 shadow-xs min-h-[36px] min-w-[36px] flex items-center justify-center`}
            title="Executar comando"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Commands Quickbar */}
        <div className="bg-[#0c0e14] px-2.5 sm:px-3 py-2 border-t border-[#1e2433] flex items-center gap-1.5 overflow-x-auto text-[10px] sm:text-[11px] font-mono text-slate-400 no-scrollbar">
          <span className="text-slate-500 shrink-0 flex items-center gap-1 text-[10px]">
            <Command className="w-3 h-3" />
          </span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              onClick={() => handleCommand(qCmd)}
              className={`px-2 py-1 rounded-lg bg-[#181d2a] hover:bg-[#22293b] text-slate-300 hover:${theme.activeText} border border-[#272f42] transition-all whitespace-nowrap cursor-pointer min-h-[28px]`}
            >
              {qCmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
