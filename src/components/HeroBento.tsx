import React, { useState } from 'react';
import { 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  Terminal, 
  ArrowUpRight, 
  Download, 
  Send, 
  Cpu, 
  Server, 
  Cloud, 
  CheckCircle2, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroBentoProps {
  onOpenResume: () => void;
  onNavigateToTerminal: () => void;
}

export const HeroBento: React.FC<HeroBentoProps> = ({ onOpenResume, onNavigateToTerminal }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="about" className="py-6 sm:py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">
        
        {/* CARD 1: Main Operator Identity Card (Bento Hero) */}
        <div className="md:col-span-12 lg:col-span-7 bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] transition-all rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg">
          {/* Subtle background ambient blur */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#10b981]/15 transition-all duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#06b6d4]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Header & Bio */}
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Avatar with status border */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#090d16] border-2 border-[#10b981]/50 p-1 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center text-2xl font-bold font-mono text-[#10b981]">
                      MA
                    </div>
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#090d16] border-2 border-[#090d16] flex items-center justify-center">
                    <span className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#10b981] bg-[#10b981]/10 px-2.5 py-0.5 rounded-md border border-[#10b981]/20">
                      OPERATOR_ID: MAX_AUGUSTO
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#f8fafc] tracking-tight mt-1">
                    Max Augusto
                  </h1>
                  <p className="text-sm font-mono text-[#06b6d4] font-medium flex items-center gap-1.5 mt-0.5">
                    <span>[SRE, Infrastructure & Python Developer]</span>
                  </p>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-1.5 text-xs text-[#94a3b8] font-mono bg-[#090d16]/80 px-3 py-1.5 rounded-lg border border-[#1e293b]">
                <MapPin className="w-3.5 h-3.5 text-[#10b981]" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Structured Technical Bio */}
            <div className="space-y-3 text-[#94a3b8] text-sm sm:text-base leading-relaxed mb-6 font-normal">
              <p>
                Profissional de TI com sólida vivência prática em <strong className="text-[#f8fafc] font-semibold">suporte N2</strong>, sustentação de operações críticas distribuídas e <strong className="text-[#10b981] font-semibold">infraestrutura de redes LAN</strong> corporativas.
              </p>
              <p>
                Paralelamente, atuo na engenharia de software com <strong className="text-[#06b6d4] font-semibold">Python & Django</strong> e arquiteturas em nuvem (<span className="text-[#f8fafc]">Railway, PostgreSQL, CI/CD, DNS SPF/DKIM</span>), tendo concebido e colocado em produção real o SaaS <a href="https://www.betimexpress.com.br" target="_blank" rel="noopener noreferrer" className="text-[#10b981] underline decoration-[#10b981]/50 underline-offset-4 hover:decoration-[#10b981] font-semibold inline-flex items-center gap-0.5">Betim Express <ArrowUpRight className="w-3.5 h-3.5 inline" /></a>.
              </p>
            </div>

            {/* Academic & Certs line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-[#1e293b]">
              <div className="flex items-center gap-2 text-xs text-[#cbd5e1] font-mono bg-[#090d16]/60 p-2.5 rounded-lg border border-[#1e293b]/60">
                <GraduationCap className="w-4 h-4 text-[#06b6d4] shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-[#64748b]">FORMAÇÃO SUPERIOR</div>
                  <div className="truncate font-semibold text-[#f8fafc]">PUC Minas • Sistemas de Inf. (2024-2027)</div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#cbd5e1] font-mono bg-[#090d16]/60 p-2.5 rounded-lg border border-[#1e293b]/60">
                <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-[#64748b]">CERTIFICAÇÃO CISCO</div>
                  <div className="truncate font-semibold text-[#f8fafc]">Introduction to Cybersecurity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#10b981] text-[#090d16] font-mono text-xs font-bold hover:bg-[#34d399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>BAIXAR / VER CV</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1e293b] hover:bg-[#334155] text-[#f8fafc] font-mono text-xs font-medium border border-[#334155] transition-all"
              >
                <Send className="w-3.5 h-3.5 text-[#06b6d4]" />
                <span>INICIAR CONTATO</span>
              </a>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#090d16] text-[#94a3b8] hover:text-[#f8fafc] font-mono text-xs border border-[#1e293b] transition-all cursor-pointer"
              title="Copiar e-mail para a área de transferência"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'COPIADO!' : PERSONAL_INFO.email}</span>
            </button>
          </div>
        </div>

        {/* CARD 2: Right Column (Metrics + Shell Simulator + What I'm Doing preview) */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
          
          {/* Top Numerical Stats Block */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-[#10b981]/40 transition-all">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#10b981] group-hover:scale-105 transition-transform">
                {PERSONAL_INFO.stats.yearsExp}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#94a3b8] mt-1 tracking-wider">
                Anos de TI
              </span>
            </div>

            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-[#06b6d4]/40 transition-all">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#06b6d4] group-hover:scale-105 transition-transform">
                {PERSONAL_INFO.stats.saasProjects}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#94a3b8] mt-1 tracking-wider">
                Projetos Prod
              </span>
            </div>

            <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-[#f59e0b]/40 transition-all">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#f59e0b] group-hover:scale-105 transition-transform">
                {PERSONAL_INFO.stats.publicRepos}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#94a3b8] mt-1 tracking-wider">
                Repositórios
              </span>
            </div>
          </div>

          {/* Interactive Shell Sneak Peek */}
          <div className="bg-[#090d16] border border-[#10b981]/30 rounded-2xl p-4 sm:p-5 font-mono relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[170px]">
            <div className="flex items-center justify-between pb-2 border-b border-[#1e293b]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]/80"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/80"></span>
                <span className="text-[10px] text-[#94a3b8] ml-2">operator@max-host: ~</span>
              </div>
              <button
                onClick={onNavigateToTerminal}
                className="text-[10px] text-[#10b981] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>OPEN CLI</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="py-2.5 text-xs space-y-1 text-[#10b981]">
              <div className="flex items-center gap-2">
                <span className="text-[#06b6d4]">➜</span>
                <span className="text-[#f8fafc]">max-cli</span>
                <span className="text-[#f59e0b]">--get-active-stack</span>
              </div>
              <p className="text-[#94a3b8] text-[11px]">
                [✓] L2/L3 Networking & Support N2 • [✓] Python/Django • [✓] PostgreSQL • [✓] Railway CI/CD • [✓] ITIL
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[#06b6d4]">➜</span>
                <span className="text-[#10b981] animate-pulse font-bold">dig +short betimexpress.com.br</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#10b981]/20 text-[#10b981]">LIVE 200 OK</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#1e293b]/60 flex items-center justify-between text-[10px] text-[#64748b]">
              <span>Type 'help' in terminal below</span>
              <span className="text-[#10b981] font-semibold">STATUS: 0 ERRORS</span>
            </div>
          </div>

          {/* Quick Pillar Tags */}
          <div className="bg-[#0f172a] border border-[#1e293b] rounded-2xl p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#94a3b8] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]"></span>
                Core Competencies
              </span>
              <a href="#what-i-do" className="text-[11px] text-[#06b6d4] hover:underline font-mono">
                Ver detalhes →
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                { tag: 'Suporte N2', color: 'text-[#10b981] border-[#10b981]/30 bg-[#10b981]/5' },
                { tag: 'Redes LAN (L2/L3)', color: 'text-[#06b6d4] border-[#06b6d4]/30 bg-[#06b6d4]/5' },
                { tag: 'Python & Django', color: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/5' },
                { tag: 'PostgreSQL', color: 'text-[#818cf8] border-[#818cf8]/30 bg-[#818cf8]/5' },
                { tag: 'Railway CI/CD', color: 'text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/5' },
                { tag: 'DNS SPF / DKIM', color: 'text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/5' },
                { tag: 'ITIL Framework', color: 'text-[#34d399] border-[#34d399]/30 bg-[#34d399]/5' },
                { tag: 'SLA Crítico', color: 'text-[#f43f5e] border-[#f43f5e]/30 bg-[#f43f5e]/5' },
              ].map((item, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${item.color}`}
                >
                  #{item.tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
