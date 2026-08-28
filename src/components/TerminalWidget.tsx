import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  Copy,
  Check,
  Sparkles,
  Command
} from 'lucide-react';
import { PERSONAL_INFO, PROJECTS, WHAT_I_DO, EXPERIENCES, TERMINAL_COMMANDS_HELP } from '../data/portfolioData';
import { TerminalLog } from '../types';

export const TerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
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
      text: 'Digite "help" para ver os comandos disponíveis ou clique nos atalhos rápidos abaixo.',
      timestamp: '00:00:03',
    },
  ]);

  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Add command to input log
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
        const helpText = TERMINAL_COMMANDS_HELP.map(
          c => `  \x1b[38;2;16;185;129m${c.cmd.padEnd(14)}\x1b[0m ${c.desc}`
        ).join('\n');

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
          '⚡ CAPACIDADES TÉCNICAS E PROTOCOLOS:',
          '├── Backend: Python, Django, Django REST, PostgreSQL, REST APIs, Webhooks',
          '├── Infraestrutura: Redes LAN L2/L3, Switches, Hardware de Servidores, VLANs, TCP/IP',
          '├── Cloud & DevOps: Railway Cloud, CI/CD Pipelines, DNS (SPF/DKIM), Resend/Anymail',
          '└── Metodologia: ITIL v4, SLA Crítico, Gestão de Incidentes, SOPs',
        ].join('\n');

        newLogs.push({
          id: `out-${cmdId}`,
          type: 'success',
          text: skillsOutput,
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

  const quickCommands = ['help', 'skills', 'projects', 'exp', 'contact', 'sysinfo', 'ping', 'curl saas', 'clear'];

  const copyTerminalOutput = () => {
    const textToCopy = history.map(h => `[${h.timestamp}] ${h.type === 'input' ? '$ ' : ''}${h.text}`).join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="terminal" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#10b981] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#10b981]"></span>
            <span>INTERACTIVE_SHELL // CLI_EMULATOR</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Terminal Interativo <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ Operator Console</span>
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyTerminalOutput}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] text-xs font-mono transition-all cursor-pointer"
            title="Copiar log do terminal"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'LOG COPIADO' : 'COPIAR LOG'}</span>
          </button>

          <button
            onClick={() => handleCommand('clear')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#ef4444] text-xs font-mono transition-all cursor-pointer"
            title="Limpar terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">LIMPAR</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg bg-[#0f172a] border border-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] transition-all cursor-pointer"
            title={isExpanded ? 'Diminuir tamanho' : 'Expandir terminal'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Terminal Main Window */}
      <div className={`bg-[#090d16] border border-[#1e293b] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
        isExpanded ? 'h-[650px]' : 'h-[440px]'
      } flex flex-col relative scanline`}>
        
        {/* Terminal Header Bar */}
        <div className="bg-[#0a0f1d] px-4 py-3 border-b border-[#1e293b] flex items-center justify-between font-mono text-xs text-[#94a3b8] select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#dc2626]/40"></span>
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] border border-[#d97706]/40"></span>
              <span className="w-3 h-3 rounded-full bg-[#10b981] border border-[#059669]/40"></span>
            </div>
            <span className="ml-2 text-[#cbd5e1] font-semibold text-[11px]">
              bash — max@operator-node: ~ (pt-BR / UTF-8)
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-[10px] text-[#64748b]">
            <span>TAB: AUTOCOMPLETE</span>
            <span>▲▼: HISTÓRICO</span>
          </div>
        </div>

        {/* Terminal Logs View */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 p-4 sm:p-5 overflow-y-auto font-mono text-xs sm:text-sm space-y-2.5 terminal-scroll cursor-text"
        >
          {history.map((log) => {
            let textColor = 'text-[#cbd5e1]';
            let prefix = '';

            if (log.type === 'input') {
              return (
                <div key={log.id} className="flex items-start gap-2 text-[#f8fafc]">
                  <span className="text-[#10b981] font-bold select-none">operator@max:~$</span>
                  <span className="text-[#06b6d4] font-semibold">{log.text}</span>
                  <span className="text-[10px] text-[#475569] ml-auto select-none">{log.timestamp}</span>
                </div>
              );
            }

            if (log.type === 'system') textColor = 'text-[#64748b]';
            if (log.type === 'info') textColor = 'text-[#38bdf8]';
            if (log.type === 'success') textColor = 'text-[#10b981]';
            if (log.type === 'error') textColor = 'text-[#f87171]';

            return (
              <div key={log.id} className={`leading-relaxed whitespace-pre-wrap ${textColor}`}>
                {log.text}
              </div>
            );
          })}
          <div ref={logsEndRef} />
        </div>

        {/* Terminal Input Bar */}
        <div className="p-3 bg-[#0a0f1d] border-t border-[#1e293b] flex items-center gap-2">
          <span className="text-[#10b981] font-mono text-xs sm:text-sm font-bold shrink-0 select-none">
            operator@max:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite um comando (ex: help, skills, projects, contact)..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-[#f8fafc] placeholder-[#475569] focus:ring-0"
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={() => handleCommand(input)}
            className="p-1.5 rounded-md bg-[#10b981] text-[#090d16] hover:bg-[#34d399] transition-all cursor-pointer shrink-0"
            title="Executar comando"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Commands Quickbar */}
        <div className="bg-[#090d16] px-3 py-2 border-t border-[#1e293b]/70 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-[#94a3b8]">
          <span className="text-[#64748b] shrink-0 flex items-center gap-1 text-[10px]">
            <Command className="w-3 h-3" /> ATALHOS:
          </span>
          {quickCommands.map((qCmd) => (
            <button
              key={qCmd}
              onClick={() => handleCommand(qCmd)}
              className="px-2 py-0.5 rounded bg-[#1e293b]/70 hover:bg-[#1e293b] text-[#cbd5e1] hover:text-[#10b981] border border-[#334155]/60 transition-all whitespace-nowrap cursor-pointer"
            >
              {qCmd}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
