import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowUpRight, 
  Download, 
  Send, 
  Copy, 
  Check, 
  GraduationCap, 
  ShieldCheck 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface AboutMeCardProps {
  onOpenResume: () => void;
  onNavigateToContact?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const AboutMeCard: React.FC<AboutMeCardProps> = ({ onOpenResume, onNavigateToContact }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { theme } = useTheme();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.div 
      id="about" 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-[#121620] border border-[#1e2433] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl relative overflow-hidden"
    >
      
      {/* Heading with dot (Pratama signature: About Me.) */}
      <motion.div variants={itemVariants} className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center">
          <span>About Me</span>
          <span className={theme.activeText}>.</span>
        </h2>
        
        {/* Accent Bar: Dynamic theme gradient line */}
        <div className="flex items-center gap-1 mt-2.5 sm:mt-3">
          <div className={`h-1 sm:h-1.5 w-8 sm:w-10 rounded-full ${theme.activeBg}`}></div>
          <div className="h-1 sm:h-1.5 w-5 sm:w-6 rounded-full bg-[#1e2433]"></div>
        </div>

        {/* Metadata sub-headline line with diamond bullet */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm font-mono text-slate-400">
          <span className={theme.activeText}>◆</span>
          <span>Suporte N2 &amp; Redes LAN</span>
          <span className="text-slate-600">·</span>
          <span>Python &amp; Django</span>
          <span className="text-slate-600 hidden xs:inline">·</span>
          <span className="hidden xs:inline">Betim, BR</span>
          <span className="text-slate-600 hidden sm:inline">·</span>
          <span className="hidden sm:inline">2+ anos exp TI</span>
        </div>
      </motion.div>

      {/* Key Metrics / Highlights Strip */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 my-5 sm:my-6">
        <div className="bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">DISPONIBILIDADE</div>
          <div className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-1">99.9%</div>
          <div className="text-[10px] text-emerald-400 font-mono">SLA Aeroportuário</div>
        </div>

        <div className="bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">SAAS EM PRODUÇÃO</div>
          <div className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-1">1 SaaS Live</div>
          <div className={`text-[10px] ${theme.activeText} font-mono`}>Betim Express</div>
        </div>

        <div className="bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">ESPECIALIDADE</div>
          <div className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-1">N2 + Django</div>
          <div className="text-[10px] text-slate-400 font-mono">Hardware &amp; API</div>
        </div>

        <div className="bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between">
          <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">FORMAÇÃO</div>
          <div className="text-base sm:text-lg font-bold text-slate-100 font-mono mt-1">Sist. Inform.</div>
          <div className="text-[10px] text-amber-400 font-mono">PUC Minas</div>
        </div>
      </motion.div>

      {/* Main Paragraphs */}
      <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4 text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
        <p>
          Profissional de Tecnologia da Informação com atuação sólida em <strong className="text-white font-semibold">Suporte N2</strong>, sustentação de operações de missão crítica e <strong className="text-white font-semibold">infraestrutura de redes corporativas</strong> (switches, patch panels, cabeamento estruturado e conformidade ITIL).
        </p>

        <p>
          Na Positivo S+ (alocado no Aeroporto da Pampulha em Belo Horizonte), garanto alta disponibilidade em sistemas de infraestrutura de TI aeroportuária essencial, lidando diretamente com diagnósticos avançados de hardware, estações de missão crítica, sistemas operacionais e enlaces de rede sob rigorosos acordos de nível de serviço (SLA).
        </p>

        <p>
          Paralelamente, projeto e implemento arquiteturas de software e serviços web com <strong className={`${theme.activeText} font-semibold`}>Python, Django REST Framework e PostgreSQL</strong>. Sou o criador e mantenedor do SaaS em produção real <a href="https://www.betimexpress.com.br" target="_blank" rel="noopener noreferrer" className={`${theme.activeText} underline underline-offset-4 hover:opacity-80 font-medium inline-flex items-center gap-0.5`}>Betim Express <ArrowUpRight className="w-3.5 h-3.5 inline" /></a>, integrando gateways de pagamento (Mercado Pago), mensageria transacional e deploy automatizado na nuvem (Railway/Docker).
        </p>
      </motion.div>

      {/* Academic & Cisco Certification Badges */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#1e2433]">
        <div className="bg-[#181d2a] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#22293b] flex items-center gap-3">
          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl ${theme.activeTagBg} flex items-center justify-center shrink-0`}>
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">GRADUAÇÃO SUPERIOR</div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">PUC Minas • Sist. de Informação</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-0.5">2024 - 2027 (Em andamento)</div>
          </div>
        </div>

        <div className="bg-[#181d2a] p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#22293b] flex items-center gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">CERTIFICAÇÃO OFICIAL</div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Introduction to Cybersecurity</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 mt-0.5">Cisco Networking Academy</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div variants={itemVariants} className="mt-5 sm:mt-7 pt-4 sm:pt-5 border-t border-[#1e2433] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
        <div className="flex flex-col xs:flex-row gap-2 sm:gap-2.5 w-full sm:w-auto">
          <button
            onClick={onOpenResume}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-mono text-xs font-semibold transition-all shadow-md cursor-pointer min-h-[44px]`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>VISUALIZAR / BAIXAR CV</span>
          </button>

          {onNavigateToContact ? (
            <button
              onClick={onNavigateToContact}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 font-mono text-xs font-semibold border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs min-h-[44px]"
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>FALAR COM MAX</span>
            </button>
          ) : (
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 font-mono text-xs font-semibold border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs min-h-[44px]"
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>FALAR COM MAX</span>
            </a>
          )}
        </div>

        <button
          onClick={handleCopyEmail}
          className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 font-mono text-xs border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs min-h-[44px] w-full sm:w-auto"
          title="Copiar e-mail"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          <span className="font-medium truncate">{copiedEmail ? 'E-MAIL COPIADO!' : PERSONAL_INFO.email}</span>
        </button>
      </motion.div>

    </motion.div>
  );
};
