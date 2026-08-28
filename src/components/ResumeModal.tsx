import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Languages, 
  Cpu,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, WHAT_I_DO, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getMarkdownResume = () => {
    return `# ${PERSONAL_INFO.name}
**${PERSONAL_INFO.title}**
${PERSONAL_INFO.location} | E-mail: ${PERSONAL_INFO.email} | Telefone: ${PERSONAL_INFO.phone}
LinkedIn: ${PERSONAL_INFO.linkedin} | GitHub: ${PERSONAL_INFO.github}

---

## RESUMO PROFISSIONAL
${PERSONAL_INFO.bio}

---

## FORMAÇÃO ACADÊMICA
- **${PERSONAL_INFO.education.degree}** — ${PERSONAL_INFO.education.institution} (${PERSONAL_INFO.education.period}) [${PERSONAL_INFO.education.status}]

## CERTIFICAÇÕES
- **Introduction to Cybersecurity** — Cisco Networking Academy

## IDIOMAS
- Português: Nativo
- Inglês: Profissional

---

## EXPERIÊNCIA PROFISSIONAL
${EXPERIENCES.map(e => `### ${e.company} — ${e.role}
*${e.period} | ${e.location}*
${e.highlights.map(h => `- ${h}`).join('\n')}
**Tecnologias:** ${e.technologies.join(', ')}
`).join('\n')}

---

## COMPETÊNCIAS TÉCNICAS
- **Backend:** Python, Django, Django REST, PostgreSQL, REST APIs, Webhooks Mercado Pago
- **Infraestrutura:** Suporte N2, Redes LAN, Switches L2/L3, VLANs, Servidores Windows/Linux, ITIL
- **Cloud & DevOps:** Railway Cloud, CI/CD, DNS (SPF/DKIM), Resend, Git/GitHub
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(getMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090d16]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#0f172a] border border-[#334155] rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e293b] shrink-0">
          <div className="flex items-center gap-2 font-mono text-xs text-[#10b981]">
            <FileText className="w-4 h-4" />
            <span className="font-bold">CURRÍCULO TÉCNICO // OPERATOR_CV</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#090d16] hover:bg-[#1e293b] text-[#cbd5e1] text-xs font-mono border border-[#1e293b] transition-all cursor-pointer"
              title="Copiar em formato Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'COPIADO!' : 'COPIAR MARKDOWN'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10b981] text-[#090d16] text-xs font-mono font-bold hover:bg-[#34d399] transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IMPRIMIR / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#1e293b] text-[#94a3b8] hover:text-[#f8fafc] transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 terminal-scroll pr-2 text-[#cbd5e1]">
          
          {/* Header Info */}
          <div className="bg-[#090d16] rounded-xl p-5 border border-[#1e293b]">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#f8fafc]">
                  {PERSONAL_INFO.name}
                </h1>
                <p className="text-sm font-mono text-[#10b981] font-semibold mt-1">
                  {PERSONAL_INFO.title}
                </p>
                <p className="text-xs font-mono text-[#06b6d4]">
                  {PERSONAL_INFO.subtitle}
                </p>
              </div>

              <div className="text-xs font-mono text-[#94a3b8] space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#10b981]" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#06b6d4]" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div>
            <h2 className="text-xs font-mono uppercase text-[#10b981] font-bold tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-sm"></span>
              RESUMO PROFISSIONAL
            </h2>
            <p className="text-sm text-[#94a3b8] leading-relaxed bg-[#090d16]/50 p-4 rounded-xl border border-[#1e293b]">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Formação e Certificações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#090d16]/50 p-4 rounded-xl border border-[#1e293b]">
              <h2 className="text-xs font-mono uppercase text-[#06b6d4] font-bold tracking-widest mb-2.5 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                FORMAÇÃO ACADÊMICA
              </h2>
              <div className="text-sm font-bold text-[#f8fafc]">{PERSONAL_INFO.education.degree}</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">{PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.period} ({PERSONAL_INFO.education.status})</div>
            </div>

            <div className="bg-[#090d16]/50 p-4 rounded-xl border border-[#1e293b]">
              <h2 className="text-xs font-mono uppercase text-[#f59e0b] font-bold tracking-widest mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                CERTIFICAÇÕES & IDIOMAS
              </h2>
              <div className="text-xs text-[#cbd5e1] font-semibold">
                • {PERSONAL_INFO.certifications[0].name} (Cisco)
              </div>
              <div className="text-xs text-[#94a3b8] mt-1">
                • Português (Nativo) • Inglês (Profissional)
              </div>
            </div>
          </div>

          {/* Experiências */}
          <div>
            <h2 className="text-xs font-mono uppercase text-[#10b981] font-bold tracking-widest mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              HISTÓRICO PROFISSIONAL
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="bg-[#090d16]/60 p-4 rounded-xl border border-[#1e293b]">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-[#f8fafc]">{exp.company} — {exp.role}</h3>
                      <div className="text-xs font-mono text-[#06b6d4]">{exp.period} • {exp.location}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-[#10b981] border border-[#334155]">
                      {exp.badge}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-[#94a3b8] my-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#10b981] font-bold">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[#1e293b]/60">
                    {exp.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e293b] text-[#cbd5e1]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
          <span>MAX AUGUSTO • SRE & BACKEND ENGINEER</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-[#1e293b] text-[#cbd5e1] hover:text-white"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
