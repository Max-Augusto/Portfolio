import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send, 
  Check, 
  Copy, 
  MapPin, 
  Clock, 
  MessageSquare, 
  ExternalLink 
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.03,
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

export const ContactSection: React.FC = () => {
  const { theme } = useTheme();
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setStatusMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage('Mensagem preparada! Abrindo cliente de e-mail...');
      
      const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        formState.subject || `Contato via Portfólio de ${formState.name}`
      )}&body=${encodeURIComponent(
        `Nome: ${formState.name}\nEmail: ${formState.email}\n\nMensagem:\n${formState.message}`
      )}`;
      
      window.location.href = mailtoUrl;

      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 600);
  };

  return (
    <section id="contact" className="bg-[#121620] border border-[#1e2433] rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b border-[#1e2433]">
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>COMMUNICATION_LINK // DIRECT_DISPATCH</span>
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight flex items-center">
            <span>Get In Touch</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        <div className="text-xs font-mono text-slate-300 bg-[#181d2a] px-2.5 sm:px-3 py-1.5 rounded-xl border border-[#272f42] shadow-sm flex items-center gap-2 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>DISPONÍVEL PARA PROJETOS &amp; OPORTUNIDADES</span>
        </div>
      </div>

      {/* Main Bento Grid for Contact */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5"
      >
        
        {/* Left Column: Direct channels & Telemetry */}
        <div className="lg:col-span-5 flex flex-col gap-3.5 sm:gap-4">
          
          {/* Email Quick Card */}
          <motion.div variants={itemVariants} className="bg-[#181d2a] border border-[#242b3d] hover:border-slate-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all shadow-md">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-[#121620] ${theme.activeText} border ${theme.activeBorder} flex items-center justify-center shrink-0`}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">E-mail Direto</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 font-mono truncate">{PERSONAL_INFO.email}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1e2433]">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#121620] hover:bg-[#1f2638] text-slate-300 text-xs font-mono border border-[#272f42] transition-all cursor-pointer font-medium min-h-[40px]"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedType === 'email' ? 'Copiado!' : 'Copiar E-mail'}</span>
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl ${theme.activeBg} text-white text-xs font-mono font-bold ${theme.activeBgHover} transition-all shadow-sm min-h-[40px]`}
              >
                <span>Enviar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* WhatsApp / Phone Card */}
          <motion.div variants={itemVariants} className="bg-[#181d2a] border border-[#242b3d] hover:border-slate-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all shadow-md">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#121620] text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold">WhatsApp / Telefone</div>
                  <div className="text-xs sm:text-sm font-bold text-slate-100 font-mono truncate">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1e2433]">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#121620] hover:bg-[#1f2638] text-slate-300 text-xs font-mono border border-[#272f42] transition-all cursor-pointer font-medium min-h-[40px]"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                <span>{copiedType === 'phone' ? 'Copiado!' : 'Copiar Telefone'}</span>
              </button>

              <a
                href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold hover:bg-emerald-500 transition-all shadow-sm min-h-[40px]"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Social Profiles Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-[#181d2a] border border-[#242b3d] hover:${theme.activeBadgeBorder} rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 group shadow-md min-h-[84px]`}
            >
              <div className="flex items-center justify-between">
                <Linkedin className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.activeText} group-hover:scale-110 transition-transform`} />
                <ExternalLink className={`w-3.5 h-3.5 text-slate-500 group-hover:${theme.activeText}`} />
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-200">LinkedIn</div>
                <div className="text-[10px] font-mono text-slate-400 truncate">/in/max-augusto</div>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-[#181d2a] border border-[#242b3d] hover:${theme.activeBadgeBorder} rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 group shadow-md min-h-[84px]`}
            >
              <div className="flex items-center justify-between">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300 group-hover:scale-110 transition-transform" />
                <ExternalLink className={`w-3.5 h-3.5 text-slate-500 group-hover:${theme.activeText}`} />
              </div>
              <div className="mt-2.5">
                <div className="text-xs font-bold text-slate-200">GitHub</div>
                <div className="text-[10px] font-mono text-slate-400 truncate">/Max-Augusto</div>
              </div>
            </a>
          </motion.div>

          {/* Location & SLA card */}
          <motion.div variants={itemVariants} className="bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 font-mono text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Base: {PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Tempo de Resposta: &lt; 24h</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Interactive Dispatch Terminal / Form */}
        <motion.div variants={itemVariants} className="lg:col-span-7 bg-[#181d2a] border border-[#242b3d] rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-8 flex flex-col justify-between relative shadow-md">
          <div>
            <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 border-b border-[#1e2433]">
              <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} font-bold`}>
                <MessageSquare className={`w-4 h-4 ${theme.activeText}`} />
                <span>MENSAGEM DIRETA // DISPATCH_FORM</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 font-medium hidden xs:inline">SECURE_MAILTO</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 mb-4 sm:mb-6 font-normal leading-relaxed">
              Envie uma mensagem direta sobre propostas de trabalho, suporte N2, arquitetura SaaS com Python/Django ou infraestrutura de redes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 font-medium mb-1">
                    Seu Nome <span className={theme.activeText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ex: Carlos Silva / Recruiter"
                    className={`w-full bg-[#121620] border border-[#272f42] ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all min-h-[44px]`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 font-medium mb-1">
                    Seu E-mail <span className={theme.activeText}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="seu.email@empresa.com"
                    className={`w-full bg-[#121620] border border-[#272f42] ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all min-h-[44px]`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 font-medium mb-1">
                  Assunto / Finalidade
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Ex: Oportunidade SRE / Projeto Django / Suporte N2"
                  className={`w-full bg-[#121620] border border-[#272f42] ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all min-h-[44px]`}
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 font-medium mb-1">
                  Mensagem Detalhada <span className={theme.activeText}>*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Descreva sua proposta, projeto ou dúvida técnica..."
                  className={`w-full bg-[#121620] border border-[#272f42] ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none leading-relaxed`}
                ></textarea>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-xl ${theme.activeBg} text-white font-mono text-xs sm:text-sm font-bold ${theme.activeBgHover} transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-h-[44px]`}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'PREPARANDO DISPATCH...' : 'ENVIAR TRANSMISSÃO'}</span>
              </button>
            </form>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
