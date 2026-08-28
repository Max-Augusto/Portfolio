import React, { useState } from 'react';
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
  Sparkles,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
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
    // Simulating message dispatch / mailto link generation
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage('Mensagem enviada para o canal de despacho! Abrindo cliente de e-mail...');
      
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
    }, 800);
  };

  return (
    <section id="contact" className="py-8 sm:py-12 border-t border-[#1e293b]/60">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#06b6d4] uppercase tracking-widest mb-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#06b6d4]"></span>
            <span>COMMUNICATION_LINK // DIRECT_DISPATCH</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc] tracking-tight">
            Contato & Conexão <span className="text-[#94a3b8] font-normal text-lg sm:text-xl">/ Get In Touch</span>
          </h2>
        </div>

        <div className="text-xs font-mono text-[#94a3b8] bg-[#0f172a] px-3 py-1.5 rounded-lg border border-[#1e293b] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
          <span>DISPONÍVEL PARA PROJETOS & OPORTUNIDADES</span>
        </div>
      </div>

      {/* Main Bento Grid for Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Direct channels & Telemetry */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          
          {/* Email Quick Card */}
          <div className="bg-[#0f172a] border border-[#1e293b] hover:border-[#10b981]/40 rounded-2xl p-5 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#64748b]">E-mail Corporativo</div>
                  <div className="text-sm font-bold text-[#f8fafc] font-mono">{PERSONAL_INFO.email}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1e293b]">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#090d16] hover:bg-[#1e293b] text-[#cbd5e1] text-xs font-mono border border-[#1e293b] transition-all cursor-pointer"
              >
                {copiedType === 'email' ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'email' ? 'Copiado!' : 'Copiar E-mail'}</span>
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#090d16] text-xs font-mono font-bold hover:bg-[#34d399] transition-all"
              >
                <span>Enviar</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* WhatsApp / Phone Card */}
          <div className="bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4]/40 rounded-2xl p-5 transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase text-[#64748b]">WhatsApp / Telefone</div>
                  <div className="text-sm font-bold text-[#f8fafc] font-mono">{PERSONAL_INFO.phone}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1e293b]">
              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#090d16] hover:bg-[#1e293b] text-[#cbd5e1] text-xs font-mono border border-[#1e293b] transition-all cursor-pointer"
              >
                {copiedType === 'phone' ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === 'phone' ? 'Copiado!' : 'Copiar Telefone'}</span>
              </button>

              <a
                href={`https://wa.me/${PERSONAL_INFO.phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06b6d4] text-[#090d16] text-xs font-mono font-bold hover:bg-[#22d3ee] transition-all"
              >
                <span>WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f172a] border border-[#1e293b] hover:border-[#06b6d4] rounded-2xl p-4 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between">
                <Linkedin className="w-5 h-5 text-[#06b6d4] group-hover:scale-110 transition-transform" />
                <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#06b6d4]" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-[#f8fafc]">LinkedIn</div>
                <div className="text-[10px] font-mono text-[#94a3b8]">/in/max-augusto-226530255</div>
              </div>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#0f172a] border border-[#1e293b] hover:border-[#10b981] rounded-2xl p-4 flex flex-col justify-between transition-all group"
            >
              <div className="flex items-center justify-between">
                <Github className="w-5 h-5 text-[#10b981] group-hover:scale-110 transition-transform" />
                <ExternalLink className="w-3.5 h-3.5 text-[#64748b] group-hover:text-[#10b981]" />
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-[#f8fafc]">GitHub</div>
                <div className="text-[10px] font-mono text-[#94a3b8]">/Max-Augusto</div>
              </div>
            </a>
          </div>

          {/* Location & SLA card */}
          <div className="bg-[#090d16] border border-[#1e293b] rounded-2xl p-4 font-mono text-xs text-[#94a3b8] space-y-2">
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Base Operacional: {PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 text-[#cbd5e1]">
              <Clock className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Tempo Médio de Resposta: &lt; 24h úteis</span>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive Dispatch Terminal / Form */}
        <div className="lg:col-span-7 bg-[#0f172a] border border-[#1e293b] rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1e293b]">
              <div className="flex items-center gap-2 font-mono text-xs text-[#10b981]">
                <MessageSquare className="w-4 h-4 text-[#10b981]" />
                <span>MENSAGEM RÁPIDA // DIRECT_DISPATCH_FORM</span>
              </div>
              <span className="text-[10px] font-mono text-[#64748b]">ENCRYPTED_TRANSMISSION</span>
            </div>

            <p className="text-xs sm:text-sm text-[#94a3b8] mb-6">
              Envie uma mensagem direta sobre propostas de trabalho, suporte N2, arquitetura SaaS com Python/Django ou consultoria de redes.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-[#cbd5e1] mb-1.5">
                    Seu Nome <span className="text-[#10b981]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ex: Ana Silva / Tech Recruiter"
                    className="w-full bg-[#090d16] border border-[#1e293b] focus:border-[#10b981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#cbd5e1] mb-1.5">
                    Seu E-mail <span className="text-[#10b981]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="seu.email@empresa.com"
                    className="w-full bg-[#090d16] border border-[#1e293b] focus:border-[#10b981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-1.5">
                  Assunto / Finalidade
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="Ex: Oportunidade SRE / Projeto Django / Suporte N2"
                  className="w-full bg-[#090d16] border border-[#1e293b] focus:border-[#10b981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-1.5">
                  Mensagem Detalhada <span className="text-[#10b981]">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Descreva sua proposta, projeto ou dúvida técnica..."
                  className="w-full bg-[#090d16] border border-[#1e293b] focus:border-[#10b981] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#f8fafc] placeholder-[#475569] outline-none transition-colors resize-none"
                ></textarea>
              </div>

              {statusMessage && (
                <div className="p-3 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 text-xs font-mono text-[#10b981] flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{statusMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-[#10b981] text-[#090d16] font-mono text-xs sm:text-sm font-bold hover:bg-[#34d399] transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'ENVIANDO DISPATCH...' : 'ENVIAR TRANSMISSÃO'}</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
