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
      className="bg-[#121620] border border-[#1e2433] rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden"
    >
      
      {/* Heading with dot (Pratama signature: About Me.) */}
      <motion.div variants={itemVariants} className="mb-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight flex items-center">
          <span>About Me</span>
          <span className={theme.activeText}>.</span>
        </h2>
        
        {/* Accent Bar: Dynamic theme gradient line */}
        <div className="flex items-center gap-1 mt-3">
          <div className={`h-1.5 w-10 rounded-full ${theme.activeBg}`}></div>
          <div className="h-1.5 w-6 rounded-full bg-[#1e2433]"></div>
        </div>

        {/* Metadata sub-headline line with diamond bullet */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <span className={theme.activeText}>◆</span>
          <span>Suporte N2 &amp; Redes LAN</span>
          <span className="text-slate-600">·</span>
          <span>Python &amp; Django</span>
          <span className="text-slate-600">·</span>
          <span>Betim, BR</span>
          <span className="text-slate-600">·</span>
          <span>2+ anos experiência em TI</span>
        </div>
      </motion.div>

      {/* Main Paragraphs */}
      <motion.div variants={itemVariants} className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
        <p>
          Profissional de Tecnologia da Informação com atuação sólida em <strong className="text-white font-semibold">Suporte N2</strong>, sustentação de operações de missão crítica e <strong className="text-white font-semibold">infraestrutura de redes corporativas</strong> (switches, patch panels, cabeamento estruturado e conformidade ITIL).
        </p>

        <p>
          Na Positivo S+ (alocado no Aeroporto de Confins / BH Airport), garanto alta disponibilidade em sistemas aeroportuários essenciais, lidando diretamente com diagnósticos avançados de hardware, sistemas operacionais e enlaces de rede sob rigorosos acordos de nível de serviço (SLA).
        </p>

        <p>
          Paralelamente, projeto e implemento arquiteturas de software e serviços web com <strong className={`${theme.activeText} font-semibold`}>Python, Django REST Framework e PostgreSQL</strong>. Sou o criador e mantenedor do SaaS em produção real <a href="https://www.betimexpress.com.br" target="_blank" rel="noopener noreferrer" className={`${theme.activeText} underline underline-offset-4 hover:opacity-80 font-medium inline-flex items-center gap-0.5`}>Betim Express <ArrowUpRight className="w-3.5 h-3.5 inline" /></a>, integrando gateways de pagamento (Mercado Pago), mensageria transacional e deploy automatizado na nuvem (Railway/Docker).
        </p>
      </motion.div>

      {/* Academic & Cisco Certification Badges */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 pt-6 border-t border-[#1e2433]">
        <div className="bg-[#181d2a] p-4 rounded-2xl border border-[#22293b] flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl ${theme.activeTagBg} flex items-center justify-center shrink-0`}>
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">GRADUAÇÃO SUPERIOR</div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">PUC Minas • Sist. de Informação</div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">2024 - 2027 (Em andamento)</div>
          </div>
        </div>

        <div className="bg-[#181d2a] p-4 rounded-2xl border border-[#22293b] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold">CERTIFICAÇÃO OFICIAL</div>
            <div className="text-xs sm:text-sm font-bold text-slate-200">Introduction to Cybersecurity</div>
            <div className="text-[11px] font-mono text-slate-400 mt-0.5">Cisco Networking Academy</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Buttons */}
      <motion.div variants={itemVariants} className="mt-7 pt-5 border-t border-[#1e2433] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2.5">
          <button
            onClick={onOpenResume}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl ${theme.activeBg} ${theme.activeBgHover} text-white font-mono text-xs font-semibold transition-all shadow-md cursor-pointer`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>VISUALIZAR / BAIXAR CV</span>
          </button>

          {onNavigateToContact ? (
            <button
              onClick={onNavigateToContact}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 font-mono text-xs font-semibold border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs"
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>FALAR COM MAX</span>
            </button>
          ) : (
            <a
              href="#contact"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-200 font-mono text-xs font-semibold border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs"
            >
              <Send className={`w-3.5 h-3.5 ${theme.activeText}`} />
              <span>FALAR COM MAX</span>
            </a>
          )}
        </div>

        <button
          onClick={handleCopyEmail}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 font-mono text-xs border border-[#272f42] hover:border-slate-600 transition-all cursor-pointer shadow-xs"
          title="Copiar e-mail"
        >
          {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
          <span className="font-medium">{copiedEmail ? 'E-MAIL COPIADO!' : PERSONAL_INFO.email}</span>
        </button>
      </motion.div>

    </motion.div>
  );
};
