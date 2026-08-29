import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Network, 
  Server, 
  ShieldCheck, 
  Wifi, 
  Activity, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Layers, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface TopologyNode {
  id: string;
  name: string;
  type: 'client' | 'firewall' | 'switch' | 'server' | 'database' | 'gateway';
  ip: string;
  status: 'online' | 'busy' | 'standby';
  role: string;
}

export const NetworkTopologyWidget: React.FC = () => {
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const [activeTest, setActiveTest] = useState<'idle' | 'pinging' | 'traceroute'>('idle');
  const [selectedNode, setSelectedNode] = useState<string>('server-django');
  const [testLogs, setTestLogs] = useState<string[]>([
    isPT ? '⚡ Lab de Topologia & Diagnóstico N2 inicializado.' : '⚡ Network Topology & L2/L3 Diagnostic Lab initialized.',
    isPT ? '✓ Topologia Corporativa LAN / Cloud em estado estável.' : '✓ Corporate LAN / Cloud Topology in healthy state.',
    isPT ? 'Selecione um nó ou clique em "Executar Diagnóstico" para testar a rota.' : 'Select a node or click "Run Ping" to test route connectivity.',
  ]);

  const nodes: TopologyNode[] = [
    {
      id: 'client-user',
      name: isPT ? 'Cliente Web / Mobile' : 'Web / Mobile Client',
      type: 'client',
      ip: '192.168.1.105',
      status: 'online',
      role: isPT ? 'Origem de requisições HTTPS & Webhook events' : 'Source of HTTPS requests & Webhook events',
    },
    {
      id: 'fw-edge',
      name: isPT ? 'Edge Gateway & WAF' : 'Edge Gateway & WAF',
      type: 'firewall',
      ip: '10.0.0.1 (DMZ)',
      status: 'online',
      role: isPT ? 'Inspeção de pacotes, SSL Termination e mitigação DDoS' : 'Packet inspection, SSL Termination and DDoS mitigation',
    },
    {
      id: 'switch-core',
      name: isPT ? 'Switch L3 Core / VLAN 100' : 'Switch L3 Core / VLAN 100',
      type: 'switch',
      ip: '10.0.1.254',
      status: 'online',
      role: isPT ? 'Roteamento inter-VLANs e QoS prioritário' : 'Inter-VLAN routing & prioritized QoS',
    },
    {
      id: 'server-django',
      name: isPT ? 'API Cluster (Django SaaS)' : 'API Cluster (Django SaaS)',
      type: 'server',
      ip: '10.0.2.15:8000',
      status: 'online',
      role: isPT ? 'Motor de regras de negócio, Auth0 & Orquestrador de Entregas' : 'Business rules engine, Auth0 & Delivery Dispatcher',
    },
    {
      id: 'db-postgres',
      name: 'PostgreSQL Relational DB',
      type: 'database',
      ip: '10.0.3.50:5432',
      status: 'online',
      role: isPT ? 'Persistência ACID transacional com réplica síncrona' : 'Transactional ACID persistence with sync replica',
    },
    {
      id: 'gateway-mp',
      name: 'Mercado Pago Webhook',
      type: 'gateway',
      ip: 'api.mercadopago.com',
      status: 'online',
      role: isPT ? 'Processamento PIX instantâneo e conciliação bancária' : 'Instant PIX processing & payment reconciliation',
    },
  ];

  const handleRunPing = () => {
    setActiveTest('pinging');
    setTestLogs([
      isPT ? 'Enviando pacotes ICMP para o Cluster Betim Express (10.0.2.15)...' : 'Sending ICMP packets to Betim Express Cluster (10.0.2.15)...',
      'PING 10.0.2.15 (10.0.2.15) 56(84) bytes of data.',
    ]);

    setTimeout(() => {
      setTestLogs(prev => [
        ...prev,
        '64 bytes from 10.0.2.15: icmp_seq=1 ttl=64 time=1.24 ms',
        '64 bytes from 10.0.2.15: icmp_seq=2 ttl=64 time=0.98 ms',
      ]);
    }, 600);

    setTimeout(() => {
      setTestLogs(prev => [
        ...prev,
        '64 bytes from 10.0.2.15: icmp_seq=3 ttl=64 time=1.05 ms',
        '--- 10.0.2.15 ping statistics ---',
        '3 packets transmitted, 3 received, 0% packet loss, time 2003ms',
        'rtt min/avg/max = 0.980/1.090/1.240 ms',
        isPT ? '✔ Rota 100% saudável. Latência excelente e zero jitter detectado.' : '✔ Route 100% healthy. Excellent latency, 0% packet loss.',
      ]);
      setActiveTest('idle');
    }, 1400);
  };

  const handleRunTraceroute = () => {
    setActiveTest('traceroute');
    setTestLogs([
      isPT ? 'Executando traceroute para Betim Express Production (10.0.2.15), 30 hops max...' : 'Executing traceroute to Betim Express Production (10.0.2.15), 30 hops max...',
    ]);

    setTimeout(() => {
      setTestLogs(prev => [
        ...prev,
        ' 1  192.168.1.1 (Gateway Local)  0.412 ms  0.380 ms',
        ' 2  10.0.0.1 (WAF / Edge Firewall)  0.890 ms  0.750 ms',
      ]);
    }, 500);

    setTimeout(() => {
      setTestLogs(prev => [
        ...prev,
        ' 3  10.0.1.254 (Switch L3 Core / VLAN 100)  1.020 ms  0.940 ms',
        ' 4  10.0.2.15 (Django App Backend)  1.180 ms [DESTINO ALCANÇADO]',
        isPT ? '✔ Rota validada com sucesso: 4 hops sem gargalo de conectividade.' : '✔ Route validated successfully: 4 hops with zero bottlenecks.',
      ]);
      setActiveTest('idle');
    }, 1200);
  };

  const currentNodeObj = nodes.find(n => n.id === selectedNode) || nodes[3];

  return (
    <section className="space-y-4 sm:space-y-6">
      {/* Header Banner */}
      <div className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl p-4 sm:p-7 relative overflow-hidden shadow-lg transition-colors duration-300`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[9px] sm:text-[10px] font-mono font-bold uppercase px-2 sm:px-2.5 py-0.5 rounded border ${theme.activeTagBg}`}>
                {isPT ? 'LABORATÓRIO DE REDES & INFRA' : 'NETWORKS & INFRA LAB'}
              </span>
              <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-emerald-500 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                VLAN 100 ACTIVE
              </span>
            </div>
            <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight`}>
              {isPT ? 'Simulador de Topologia & Roteamento L2/L3' : 'L2/L3 Network Topology & Routing Simulator'}
            </h2>
            <p className={`text-xs sm:text-sm ${theme.textSecondary} mt-1 max-w-2xl font-normal leading-relaxed`}>
              {isPT 
                ? 'Visualização interativa da arquitetura corporativa e fluxo de pacotes entre clientes, firewalls de borda, switches gerenciáveis, microsserviços Django e bancos de dados.'
                : 'Interactive visual architecture and packet flow between clients, edge firewalls, managed switches, Django backend services and relational databases.'}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 pt-2 md:pt-0">
            <button
              onClick={handleRunPing}
              disabled={activeTest !== 'idle'}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 min-h-[44px]`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{activeTest === 'pinging' ? (isPT ? 'Testando Ping...' : 'Pinging...') : (isPT ? 'Testar Ping' : 'Run Ping')}</span>
            </button>

            <button
              onClick={handleRunTraceroute}
              disabled={activeTest !== 'idle'}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 ${theme.textPrimary} font-mono text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50 min-h-[44px]`}
            >
              <Activity className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>{activeTest === 'traceroute' ? (isPT ? 'Rastreando...' : 'Tracing...') : 'Traceroute'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Topology Map & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5">
        
        {/* Left Side: Visual Interactive Topology Nodes */}
        <div className={`lg:col-span-8 ${theme.bgCard} border ${theme.borderCard} rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md flex flex-col justify-between`}>
          <div>
            <div className={`flex items-center justify-between mb-3 sm:mb-4 pb-3 border-b ${theme.borderCard}`}>
              <div className={`flex items-center gap-2 text-xs font-mono ${theme.textPrimary} font-bold`}>
                <Network className={`w-4 h-4 ${theme.activeText}`} />
                <span>{isPT ? 'NÓS DA TOPOLOGIA (CLIQUE PARA INSPECIONAR)' : 'TOPOLOGY NODES (CLICK TO INSPECT)'}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 hidden xs:inline">6 NODES MONITORED</span>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3.5">
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[110px] sm:h-32 ${
                      isSelected
                        ? `${theme.activeBadgeBorder} ${theme.bgSubCard} shadow-md`
                        : `${theme.borderSubCard} ${theme.bgSubCard}/50 hover:border-slate-400 hover:${theme.bgSubCard}`
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                        <span className={`text-[10px] font-mono ${theme.textMuted} font-bold uppercase truncate`}>
                          {node.type}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                      </div>
                      <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary} truncate`}>
                        {node.name}
                      </div>
                    </div>

                    <div className={`pt-2 border-t ${theme.borderCard} flex items-center justify-between text-[10px] sm:text-[11px] font-mono ${theme.textMuted}`}>
                      <span className="truncate">{node.ip}</span>
                      {isSelected && <span className={`text-[10px] ${theme.activeText} font-bold shrink-0 ml-1`}>Ativo ✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flow Diagram Connector */}
          <div className={`mt-4 sm:mt-6 p-3 sm:p-4 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard}`}>
            <div className={`text-[10px] font-mono ${theme.textMuted} uppercase font-bold mb-2 flex items-center gap-1.5`}>
              <Sparkles className={`w-3 h-3 ${theme.activeText}`} />
              <span>{isPT ? 'Fluxo de Dados em Produção:' : 'Production Data Flow:'}</span>
            </div>
            <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono ${theme.textSecondary}`}>
              <span className={`${theme.bgCard} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border ${theme.borderCard} ${theme.textPrimary}`}>Client</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className={`${theme.bgCard} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border ${theme.borderCard} ${theme.textPrimary}`}>WAF/DMZ</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className={`${theme.bgCard} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border ${theme.borderCard} ${theme.textPrimary}`}>Switch L3</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className={`${theme.bgCard} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border ${theme.activeBorder} ${theme.activeText} font-bold`}>Django API</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <span className={`${theme.bgCard} px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border ${theme.borderCard} ${theme.textPrimary}`}>PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Node Inspector & Live Terminal Logs */}
        <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
          
          {/* Node Inspector Card */}
          <div className={`${theme.bgCard} border ${theme.borderCard} rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-md`}>
            <div className={`text-xs font-mono ${theme.textMuted} uppercase font-bold mb-3 flex items-center gap-2`}>
              <Layers className={`w-4 h-4 ${theme.activeText}`} />
              <span>{isPT ? 'Inspeção do Nó Selecionado' : 'Selected Node Inspector'}</span>
            </div>

            <div className="space-y-2.5 sm:space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">{isPT ? 'NOME DO DISPOSITIVO' : 'DEVICE NAME'}</span>
                <div className={`${theme.textPrimary} font-bold text-sm`}>{currentNodeObj.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 text-[10px]">{isPT ? 'ENDEREÇO IP' : 'IP ADDRESS'}</span>
                  <div className={`${theme.textSecondary} truncate`}>{currentNodeObj.ip}</div>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px]">STATUS</span>
                  <div className="text-emerald-500 font-bold">OPERATIONAL</div>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px]">{isPT ? 'PAPEL NA INFRAESTRUTURA' : 'INFRASTRUCTURE ROLE'}</span>
                <p className={`${theme.textSecondary} font-sans text-xs mt-0.5 leading-relaxed`}>
                  {currentNodeObj.role}
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Console Output */}
          <div className={`${theme.bgCard} border ${theme.borderCard} rounded-xl sm:rounded-2xl p-4 flex-1 flex flex-col justify-between font-mono text-xs shadow-md min-h-[190px]`}>
            <div>
              <div className={`flex items-center justify-between pb-2 border-b ${theme.borderCard} mb-2.5`}>
                <div className={`flex items-center gap-2 ${theme.textPrimary} text-[11px] font-bold`}>
                  <Terminal className={`w-3.5 h-3.5 ${theme.activeText}`} />
                  <span>{isPT ? 'LOGS DE DIAGNÓSTICO' : 'DIAGNOSTIC LOGS'}</span>
                </div>
                <button
                  onClick={() => setTestLogs([isPT ? '⚡ Console de diagnóstico limpo.' : '⚡ Diagnostic console cleared.'])}
                  className={`text-[10px] ${theme.textMuted} hover:${theme.textPrimary} cursor-pointer`}
                >
                  {isPT ? 'Limpar' : 'Clear'}
                </button>
              </div>

              <div className={`space-y-1.5 max-h-40 sm:max-h-48 overflow-y-auto pr-1 text-[10px] sm:text-[11px] ${theme.textSecondary}`}>
                {testLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={log.startsWith('✔') ? 'text-emerald-500 font-bold' : log.startsWith('Enviando') || log.startsWith('Sending') || log.startsWith('Executando') || log.startsWith('Executing') ? theme.activeText : ''}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className={`pt-2 border-t ${theme.borderCard} text-[10px] ${theme.textMuted} flex items-center justify-between`}>
              <span>SLA Suporte N2: 99.98%</span>
              <span className="text-emerald-500 font-bold">0% packet loss</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
