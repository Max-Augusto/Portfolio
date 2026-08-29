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
import { TechBadge } from './TechBadge';

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
        <div className="md:col-span-12 lg:col-span-7 bg-white border border-slate-200/90 hover:border-slate-300 transition-all rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm hover:shadow-md">
          {/* Subtle background ambient blur */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-100/50 transition-all duration-700"></div>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-50 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Header & Bio */}
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Avatar with status border */}
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-100 border border-slate-200 p-0.5 overflow-hidden flex items-center justify-center shadow-xs">
                    <img 
                      src={PERSONAL_INFO.avatarUrl} 
                      alt={PERSONAL_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        // Fallback in case of network issue
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent && !parent.querySelector('.fallback-initials')) {
                          const fallback = document.createElement('div');
                          fallback.className = 'fallback-initials w-full h-full rounded-xl bg-slate-100 flex items-center justify-center text-2xl font-bold font-mono text-slate-800';
                          fallback.innerText = 'MA';
                          parent.appendChild(fallback);
                        }
                      }}
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-xs">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200 font-semibold">
                      OPERATOR_ID: MAX_AUGUSTO
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                    Max Augusto
                  </h1>
                  <p className="text-sm font-mono text-blue-700 font-medium flex items-center gap-1.5 mt-0.5">
                    <span>[SRE, Infrastructure & Python Developer]</span>
                  </p>
                </div>
              </div>

              {/* Location Badge */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Structured Technical Bio */}
            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              <p>
                Profissional de TI com sólida vivência prática em <strong className="text-slate-900 font-semibold">suporte N2</strong>, sustentação de operações críticas distribuídas e <strong className="text-slate-900 font-semibold">infraestrutura de redes LAN</strong> corporativas.
              </p>
              <p>
                Paralelamente, atuo na engenharia de software com <strong className="text-blue-700 font-semibold">Python & Django</strong> e arquiteturas em nuvem (<span className="text-slate-800 font-medium">Railway, PostgreSQL, CI/CD, DNS SPF/DKIM</span>), tendo concebido e colocado em produção real o SaaS <a href="https://www.betimexpress.com.br" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline decoration-blue-300 underline-offset-4 hover:decoration-blue-600 font-semibold inline-flex items-center gap-0.5">Betim Express <ArrowUpRight className="w-3.5 h-3.5 inline" /></a>.
              </p>
            </div>

            {/* Academic & Certs line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <GraduationCap className="w-4 h-4 text-blue-600 shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">FORMAÇÃO SUPERIOR</div>
                  <div className="truncate font-bold text-slate-900">PUC Minas • Sist. de Inf. (2024-2027)</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">CERTIFICAÇÃO CISCO</div>
                  <div className="truncate font-bold text-slate-900">Introduction to Cybersecurity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 relative z-10">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold hover:bg-blue-600 transition-all shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-300" />
                <span>BAIXAR / VER CV</span>
              </button>

              <a
                href="#contact"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-mono text-xs font-semibold border border-slate-200 hover:border-slate-300 transition-all shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>INICIAR CONTATO</span>
              </a>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-mono text-xs border border-slate-200 transition-all cursor-pointer shadow-xs"
              title="Copiar e-mail para a área de transferência"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span className="font-medium">{copiedEmail ? 'COPIADO!' : PERSONAL_INFO.email}</span>
            </button>
          </div>
        </div>

        {/* CARD 2: Right Column (Metrics + Shell Simulator + What I'm Doing preview) */}
        <div className="md:col-span-12 lg:col-span-5 flex flex-col gap-4">
          
          {/* Top Numerical Stats Block */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-slate-300 transition-all shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 group-hover:text-blue-600 transition-colors">
                {PERSONAL_INFO.stats.yearsExp}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 mt-1 tracking-wider font-semibold">
                Anos de TI
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-slate-300 transition-all shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-600 group-hover:scale-105 transition-transform">
                {PERSONAL_INFO.stats.saasProjects}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 mt-1 tracking-wider font-semibold">
                Projetos Prod
              </span>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col items-center justify-center text-center group hover:border-slate-300 transition-all shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 group-hover:text-emerald-600 transition-colors">
                {PERSONAL_INFO.stats.publicRepos}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-slate-500 mt-1 tracking-wider font-semibold">
                Repositórios
              </span>
            </div>
          </div>

          {/* Interactive Shell Sneak Peek (Refined Dark Monospace Window) */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 sm:p-5 font-mono relative overflow-hidden shadow-md flex flex-col justify-between min-h-[170px]">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
                <span className="text-[10px] text-slate-400 ml-2">max@dev-host: ~</span>
              </div>
              <button
                onClick={onNavigateToTerminal}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer font-bold"
              >
                <span>OPEN CLI</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>

            <div className="py-2.5 text-xs space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-blue-400">➜</span>
                <span className="text-slate-100 font-semibold">max-cli</span>
                <span className="text-amber-400">--get-active-stack</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                [✓] L2/L3 Networking & Support N2 • [✓] Python/Django • [✓] PostgreSQL • [✓] Railway CI/CD • [✓] ITIL
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-blue-400">➜</span>
                <span className="text-emerald-400 font-bold">dig +short betimexpress.com.br</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 font-semibold">LIVE 200 OK</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <span>Type 'help' in terminal below</span>
              <span className="text-emerald-400 font-semibold">STATUS: 0 ERRORS</span>
            </div>
          </div>

          {/* Quick Pillar Tags */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Core Competencies
              </span>
              <a href="#what-i-do" className="text-[11px] text-blue-600 hover:underline font-mono font-semibold">
                Ver detalhes →
              </a>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {[
                'Suporte N2',
                'LAN L2/L3',
                'Python & Django',
                'FastAPI',
                'PostgreSQL',
                'Docker',
                'Railway CI/CD',
                'DNS (SPF/DKIM)',
                'Cisco Security',
                'ITIL v4'
              ].map((item, idx) => (
                <TechBadge key={idx} tech={item} size="sm" />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
