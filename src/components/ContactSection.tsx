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
import { getPersonalInfo } from '../data/localizedData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

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
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);

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
      setStatusMessage(isPT ? 'Por favor, preencha todos os campos obrigatórios.' : 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage(isPT ? 'Mensagem preparada! Abrindo cliente de e-mail...' : 'Message prepared! Opening email client...');
      
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
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
    <section id="contact" className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl p-4 sm:p-7 md:p-9 shadow-xl transition-colors duration-300`}>
      {/* Section Header */}
      <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3 sm:gap-4 pb-4 border-b ${theme.borderCard}`}>
        <div>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} uppercase tracking-wider mb-1.5 font-bold`}>
            <span className={`w-2 h-2 rounded-sm ${theme.activeBg}`}></span>
            <span>COMMUNICATION_LINK // DIRECT_DISPATCH</span>
          </div>
          <h2 className={`text-xl xs:text-2xl sm:text-3xl font-extrabold ${theme.textPrimary} tracking-tight flex items-center`}>
            <span>{isPT ? 'Fale Comigo' : 'Get In Touch'}</span>
            <span className={theme.activeText}>.</span>
          </h2>
        </div>

        <div className={`text-xs font-mono ${theme.textPrimary} ${theme.bgSubCard} px-2.5 sm:px-3 py-1.5 rounded-xl border ${theme.borderSubCard} shadow-xs flex items-center gap-2 self-start sm:self-auto`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{isPT ? 'DISPONÍVEL PARA PROJETOS & OPORTUNIDADES' : 'OPEN TO OFFERS & CONTRACTS'}</span>
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
          <motion.div variants={itemVariants} className={`${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all shadow-xs`}>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${theme.bgCard} ${theme.activeText} border ${theme.activeBorder} flex items-center justify-center shrink-0`}>
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-mono uppercase ${theme.textMuted} font-semibold`}>{t('contact.direct_email')}</div>
                  <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary} font-mono truncate`}>{personalInfo.email}</div>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${theme.borderCard}`}>
              <button
                onClick={() => handleCopy(personalInfo.email, 'email')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl ${theme.bgCard} hover:${theme.bgSubCard} ${theme.textSecondary} text-xs font-mono border ${theme.borderCard} transition-all cursor-pointer font-medium min-h-[40px]`}
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedType === 'email' ? t('header.copied') : t('header.copy_email')}</span>
              </button>

              <a
                href={`mailto:${personalInfo.email}`}
                className={`flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl ${theme.activeBg} text-white text-xs font-mono font-bold ${theme.activeBgHover} transition-all shadow-xs min-h-[40px]`}
              >
                <span>{isPT ? 'Enviar' : 'Send'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* WhatsApp / Phone Card */}
          <motion.div variants={itemVariants} className={`${theme.bgSubCard} border ${theme.borderSubCard} hover:border-slate-400 rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all shadow-xs`}>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${theme.bgCard} text-emerald-500 border border-emerald-500/30 flex items-center justify-center shrink-0`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className={`text-[10px] font-mono uppercase ${theme.textMuted} font-semibold`}>WhatsApp / Phone</div>
                  <div className={`text-xs sm:text-sm font-bold ${theme.textPrimary} font-mono truncate`}>{personalInfo.phone}</div>
                </div>
              </div>
            </div>

            <div className={`flex items-center gap-2 mt-3 pt-3 border-t ${theme.borderCard}`}>
              <button
                onClick={() => handleCopy(personalInfo.phone, 'phone')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl ${theme.bgCard} hover:${theme.bgSubCard} ${theme.textSecondary} text-xs font-mono border ${theme.borderCard} transition-all cursor-pointer font-medium min-h-[40px]`}
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                <span>{copiedType === 'phone' ? t('header.copied') : (isPT ? 'Copiar Telefone' : 'Copy Phone')}</span>
              </button>

              <a
                href={`https://wa.me/${personalInfo.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-mono font-bold hover:bg-emerald-500 transition-all shadow-xs min-h-[40px]"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Social Profiles Grid */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.bgSubCard} border ${theme.borderSubCard} hover:${theme.activeBadgeBorder} rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 group shadow-xs min-h-[84px]`}
            >
              <div className="flex items-center justify-between">
                <Linkedin className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.activeText} group-hover:scale-110 transition-transform`} />
                <ExternalLink className={`w-3.5 h-3.5 text-slate-400 group-hover:${theme.activeText}`} />
              </div>
              <div className="mt-2.5">
                <div className={`text-xs font-bold ${theme.textPrimary}`}>LinkedIn</div>
                <div className={`text-[10px] font-mono ${theme.textMuted} truncate`}>/in/max-augusto</div>
              </div>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`${theme.bgSubCard} border ${theme.borderSubCard} hover:${theme.activeBadgeBorder} rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-200 group shadow-xs min-h-[84px]`}
            >
              <div className="flex items-center justify-between">
                <Github className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.textPrimary} group-hover:scale-110 transition-transform`} />
                <ExternalLink className={`w-3.5 h-3.5 text-slate-400 group-hover:${theme.activeText}`} />
              </div>
              <div className="mt-2.5">
                <div className={`text-xs font-bold ${theme.textPrimary}`}>GitHub</div>
                <div className={`text-[10px] font-mono ${theme.textMuted} truncate`}>/Max-Augusto</div>
              </div>
            </a>
          </motion.div>

          {/* Location & SLA card */}
          <motion.div variants={itemVariants} className={`${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-3.5 sm:p-4 font-mono text-xs ${theme.textMuted} space-y-2`}>
            <div className={`flex items-center gap-2 ${theme.textSecondary} font-medium`}>
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>Base: {personalInfo.location}</span>
            </div>
            <div className={`flex items-center gap-2 ${theme.textSecondary} font-medium`}>
              <Clock className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t('contact.response_time')}: &lt; 24h</span>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Interactive Dispatch Terminal / Form */}
        <motion.div variants={itemVariants} className={`lg:col-span-7 ${theme.bgSubCard} border ${theme.borderSubCard} rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-8 flex flex-col justify-between relative shadow-xs`}>
          <div>
            <div className={`flex items-center justify-between mb-3 sm:mb-4 pb-3 border-b ${theme.borderCard}`}>
              <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText} font-bold`}>
                <MessageSquare className={`w-4 h-4 ${theme.activeText}`} />
                <span>{isPT ? 'MENSAGEM DIRETA // DISPATCH_FORM' : 'DIRECT MESSAGE // DISPATCH_FORM'}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-medium hidden xs:inline">SECURE_MAILTO</span>
            </div>

            <p className={`text-xs sm:text-sm ${theme.textSecondary} mb-4 sm:mb-6 font-normal leading-relaxed`}>
              {isPT 
                ? 'Envie uma mensagem direta sobre propostas de trabalho, suporte N2, arquitetura SaaS com Python/Django ou infraestrutura de redes.'
                : 'Send a direct message regarding job opportunities, Tier 2 IT support, SaaS backend architecture with Python/Django, or network infrastructure.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className={`block text-xs font-mono ${theme.textMuted} font-medium mb-1`}>
                    {t('contact.form_name')} <span className={theme.activeText}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ex: Carlos Silva / Recruiter"
                    className={`w-full ${theme.bgCard} border ${theme.borderCard} ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm ${theme.textPrimary} placeholder-slate-400 outline-none transition-all min-h-[44px]`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-mono ${theme.textMuted} font-medium mb-1`}>
                    {t('contact.form_email')} <span className={theme.activeText}>*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="seu.email@empresa.com"
                    className={`w-full ${theme.bgCard} border ${theme.borderCard} ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm ${theme.textPrimary} placeholder-slate-400 outline-none transition-all min-h-[44px]`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-xs font-mono ${theme.textMuted} font-medium mb-1`}>
                  {t('contact.form_subject')}
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Ex: Oportunidade SRE / Projeto Django / Suporte N2"
                  className={`w-full ${theme.bgCard} border ${theme.borderCard} ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm ${theme.textPrimary} placeholder-slate-400 outline-none transition-all min-h-[44px]`}
                />
              </div>

              <div>
                <label className={`block text-xs font-mono ${theme.textMuted} font-medium mb-1`}>
                  {t('contact.form_message')} <span className={theme.activeText}>*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Descreva sua proposta, projeto ou dúvida técnica..."
                  className={`w-full ${theme.bgCard} border ${theme.borderCard} ${theme.ringBorder} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm ${theme.textPrimary} placeholder-slate-400 outline-none transition-all resize-none leading-relaxed`}
                ></textarea>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-500 flex items-center gap-2">
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
                <span>{isSubmitting ? (isPT ? 'PREPARANDO DISPATCH...' : 'PREPARING DISPATCH...') : t('contact.form_submit')}</span>
              </button>
            </form>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
