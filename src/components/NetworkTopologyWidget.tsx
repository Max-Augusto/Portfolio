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

interface TopologyNode {
  id: string;
  name: string;
  type: 'client' | 'firewall' | 'switch' | 'server' | 'database' | 'gateway';
  ip: string;
  status: 'online' | 'busy' | 'standby';
  role: string;
}

export const NetworkTopologyWidget: React.FC = () => {
  const { theme } = useTheme();
  const [activeTest, setActiveTest] = useState<'idle' | 'pinging' | 'traceroute'>('idle');
  const [selectedNode, setSelectedNode] = useState<string>('server-django');
  const [testLogs, setTestLogs] = useState<string[]>([
    '⚡ Lab de Topologia & Diagnóstico N2 inicializado.',
    '✓ Topologia Corporativa LAN / Cloud em estado estável.',
    'Selecione um nó ou clique em "Executar Diagnóstico" para testar a rota.',
  ]);

  const nodes: TopologyNode[] = [
    {
      id: 'client-user',
      name: 'Cliente Web / Mobile',
      type: 'client',
      ip: '192.168.1.105',
      status: 'online',
      role: 'Origem de requisições HTTPS & Webhook events',
    },
    {
      id: 'fw-edge',
      name: 'Edge Gateway & WAF',
      type: 'firewall',
      ip: '10.0.0.1 (DMZ)',
      status: 'online',
      role: 'Inspeção de pacotes, SSL Termination e mitigação DDoS',
    },
    {
      id: 'switch-core',
      name: 'Switch L3 Core / VLAN 100',
      type: 'switch',
      ip: '10.0.1.254',
      status: 'online',
      role: 'Roteamento inter-VLANs e QoS prioritário',
    },
    {
      id: 'server-django',
      name: 'API Cluster (Django SaaS)',
      type: 'server',
      ip: '10.0.2.15:8000',
      status: 'online',
      role: 'Motor de regras de negócio, Auth0 & Orquestrador de Entregas',
    },
    {
      id: 'db-postgres',
      name: 'PostgreSQL Relational DB',
      type: 'database',
      ip: '10.0.3.50:5432',
      status: 'online',
      role: 'Persistência ACID transacional com réplica síncrona',
    },
    {
      id: 'gateway-mp',
      name: 'Mercado Pago Webhook',
      type: 'gateway',
      ip: 'api.mercadopago.com',
      status: 'online',
      role: 'Processamento PIX instantâneo e conciliação bancária',
    },
  ];

  const handleRunPing = () => {
    setActiveTest('pinging');
    setTestLogs([
      'Enviando pacotes ICMP para o Cluster Betim Express (10.0.2.15)...',
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
        '✔ Rota 100% saudável. Latência excelente e zero jitter detectado.',
      ]);
      setActiveTest('idle');
    }, 1400);
  };

  const handleRunTraceroute = () => {
    setActiveTest('traceroute');
    setTestLogs([
      'Executando traceroute para Betim Express Production (10.0.2.15), 30 hops max...',
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
        '✔ Rota validada com sucesso: 4 hops sem gargalo de conectividade.',
      ]);
      setActiveTest('idle');
    }, 1200);
  };

  const currentNodeObj = nodes.find(n => n.id === selectedNode) || nodes[3];

  return (
    <section className="space-y-6">
      {/* Header Banner */}
      <div className="bg-[#181d2a] border border-[#242b3d] rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded border ${theme.activeTagBg}`}>
                LABORATÓRIO DE REDES & INFRAESTRUTURA
              </span>
              <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                VLAN 100 ATIVA
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              Simulador de Topologia & Roteamento L2/L3
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-normal">
              Visualização interativa da arquitetura corporativa e fluxo de pacotes entre clientes, 
              firewalls de borda, switches gerenciáveis, microsserviços Django e bancos de dados.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleRunPing}
              disabled={activeTest !== 'idle'}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{activeTest === 'pinging' ? 'Testando Ping...' : 'Testar Ping'}</span>
            </button>

            <button
              onClick={handleRunTraceroute}
              disabled={activeTest !== 'idle'}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121620] border border-[#272f42] hover:border-slate-500 text-slate-200 font-mono text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Activity className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>{activeTest === 'traceroute' ? 'Rastreando...' : 'Traceroute'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Topology Map & Diagnostics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Visual Interactive Topology Nodes */}
        <div className="lg:col-span-8 bg-[#181d2a] border border-[#242b3d] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1e2433]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-bold">
                <Network className={`w-4 h-4 ${theme.activeText}`} />
                <span>NÓS DA TOPOLOGIA (CLIQUE PARA INSPECIONAR)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">6 NÓS MONITORADOS</span>
            </div>

            {/* Nodes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node.id)}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-32 ${
                      isSelected
                        ? `${theme.activeBadgeBorder} bg-[#121620] shadow-md`
                        : 'border-[#242b3d] bg-[#141824] hover:border-slate-600 hover:bg-[#181d2c]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate">
                          {node.type}
                        </span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" />
                      </div>
                      <div className="text-sm font-bold text-slate-100 truncate">
                        {node.name}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#1e2433] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>{node.ip}</span>
                      {isSelected && <span className={`text-[10px] ${theme.activeText} font-bold`}>Ativo ✓</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flow Diagram Connector */}
          <div className="mt-6 p-4 rounded-xl bg-[#121620] border border-[#1e2433]">
            <div className="text-[10px] font-mono text-slate-400 uppercase font-bold mb-2 flex items-center gap-1.5">
              <Sparkles className={`w-3 h-3 ${theme.activeText}`} />
              <span>Fluxo de Dados em Produção:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
              <span className="bg-[#181d2a] px-2.5 py-1 rounded border border-[#272f42] text-slate-200">Cliente</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-[#181d2a] px-2.5 py-1 rounded border border-[#272f42] text-slate-200">WAF/DMZ</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-[#181d2a] px-2.5 py-1 rounded border border-[#272f42] text-slate-200">Switch L3</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className={`bg-[#181d2a] px-2.5 py-1 rounded border ${theme.activeBorder} ${theme.activeText} font-bold`}>Django API</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="bg-[#181d2a] px-2.5 py-1 rounded border border-[#272f42] text-slate-200">PostgreSQL</span>
            </div>
          </div>
        </div>

        {/* Right Side: Selected Node Inspector & Live Terminal Logs */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Node Inspector Card */}
          <div className="bg-[#181d2a] border border-[#242b3d] rounded-2xl p-5 shadow-md">
            <div className="text-xs font-mono text-slate-400 uppercase font-bold mb-3 flex items-center gap-2">
              <Layers className={`w-4 h-4 ${theme.activeText}`} />
              <span>Inspeção do Nó Selecionado</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-slate-500 text-[10px]">NOME DO DISPOSITIVO</span>
                <div className="text-slate-100 font-bold text-sm">{currentNodeObj.name}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 text-[10px]">ENDEREÇO IP</span>
                  <div className="text-slate-200">{currentNodeObj.ip}</div>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px]">STATUS</span>
                  <div className="text-emerald-400 font-bold">OPERACIONAL</div>
                </div>
              </div>

              <div>
                <span className="text-slate-500 text-[10px]">PAPEL NA INFRAESTRUTURA</span>
                <p className="text-slate-300 font-sans text-xs mt-0.5 leading-relaxed">
                  {currentNodeObj.role}
                </p>
              </div>
            </div>
          </div>

          {/* Diagnostic Console Output */}
          <div className="bg-[#121620] border border-[#242b3d] rounded-2xl p-4 flex-1 flex flex-col justify-between font-mono text-xs shadow-md min-h-[220px]">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#1e2433] mb-2.5">
                <div className="flex items-center gap-2 text-slate-300 text-[11px] font-bold">
                  <Terminal className={`w-3.5 h-3.5 ${theme.activeText}`} />
                  <span>LOGS DE DIAGNÓSTICO</span>
                </div>
                <button
                  onClick={() => setTestLogs(['⚡ Console de diagnóstico limpo.'])}
                  className="text-[10px] text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  Limpar
                </button>
              </div>

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-[11px] text-slate-300">
                {testLogs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={log.startsWith('✔') ? 'text-emerald-400 font-bold' : log.startsWith('Enviando') || log.startsWith('Executando') ? theme.activeText : ''}
                  >
                    {log}
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e2433] text-[10px] text-slate-500 flex items-center justify-between">
              <span>SLA Suporte N2: 99.98%</span>
              <span className="text-emerald-400">Zero packet loss</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
