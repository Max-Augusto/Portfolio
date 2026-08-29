import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  ShieldCheck, 
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES } from '../data/portfolioData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

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
- **Backend & Arquitetura:** Python, Django, Django REST, FastAPI, C#, .NET 10, Entity Framework Core, PostgreSQL, REST APIs, Webhooks Mercado Pago & Stripe
- **Infraestrutura & Redes:** Suporte N2, Redes LAN, Switches L2/L3, VLANs, Servidores Windows/Linux, Bash, ITIL v4, SLA Crítico
- **Cloud & DevOps:** Docker, Docker Compose, Railway Cloud, AWS, GitHub Actions, CI/CD, DNS (SPF/DKIM), Resend
- **Segurança & Governança:** Cisco Cybersecurity, Auth0, Clerk, Secrets Management (.env/Vault)
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(getMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090b10]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className="bg-[#121620] border border-[#272f42] rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col">
        
        {/* Header Action Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1e2433] shrink-0">
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText}`}>
            <FileText className="w-4 h-4" />
            <span className="font-bold">CURRÍCULO TÉCNICO // OPERATOR_CV</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181d2a] hover:bg-[#1f2638] text-slate-300 text-xs font-mono border border-[#272f42] transition-all cursor-pointer font-medium"
              title="Copiar em formato Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span className="hidden sm:inline">{copied ? 'COPIADO!' : 'COPIAR MARKDOWN'}</span>
            </button>

            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.activeBg} text-white text-xs font-mono font-bold ${theme.activeBgHover} transition-all cursor-pointer shadow-sm`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>IMPRIMIR / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#181d2a] text-slate-400 hover:text-white transition-colors cursor-pointer border border-[#272f42]"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6 terminal-scroll pr-2 text-slate-300">
          
          {/* Header Info */}
          <div className="bg-[#181d2a] rounded-2xl p-5 border border-[#242b3d]">
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#121620] border-2 ${theme.avatarBorder} p-0.5 overflow-hidden shrink-0 shadow-md`}>
                  <img 
                    src={PERSONAL_INFO.avatarUrl} 
                    alt={PERSONAL_INFO.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className={`text-sm font-mono ${theme.activeText} font-bold mt-1`}>
                    {PERSONAL_INFO.title}
                  </p>
                  <p className="text-xs font-mono text-slate-400">
                    {PERSONAL_INFO.subtitle}
                  </p>
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className={`w-3.5 h-3.5 ${theme.activeText}`} />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div>
            <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-2 flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 ${theme.activeBg} rounded-sm`}></span>
              RESUMO PROFISSIONAL
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#181d2a] p-4 rounded-2xl border border-[#242b3d]">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Formação e Certificações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#181d2a] p-4 rounded-2xl border border-[#242b3d]">
              <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-2.5 flex items-center gap-2`}>
                <GraduationCap className="w-4 h-4" />
                FORMAÇÃO ACADÊMICA
              </h2>
              <div className="text-sm font-bold text-slate-100">{PERSONAL_INFO.education.degree}</div>
              <div className="text-xs text-slate-400 mt-0.5">{PERSONAL_INFO.education.institution} • {PERSONAL_INFO.education.period} ({PERSONAL_INFO.education.status})</div>
            </div>

            <div className="bg-[#181d2a] p-4 rounded-2xl border border-[#242b3d]">
              <h2 className="text-xs font-mono uppercase text-amber-400 font-bold tracking-wider mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                CERTIFICAÇÕES &amp; IDIOMAS
              </h2>
              <div className="text-xs text-slate-200 font-semibold">
                • {PERSONAL_INFO.certifications[0].name} (Cisco)
              </div>
              <div className="text-xs text-slate-400 mt-1">
                • Português (Nativo) • Inglês (Profissional)
              </div>
            </div>
          </div>

          {/* Experiências */}
          <div>
            <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-3 flex items-center gap-2`}>
              <Briefcase className="w-4 h-4" />
              HISTÓRICO PROFISSIONAL
            </h2>
            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="bg-[#181d2a] p-4 rounded-2xl border border-[#242b3d]">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-100">{exp.company} — {exp.role}</h3>
                      <div className={`text-xs font-mono ${theme.activeText} font-medium`}>{exp.period} • {exp.location}</div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121620] text-slate-300 border border-[#272f42] font-semibold shadow-xs">
                      {exp.badge}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300 my-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className={`${theme.activeText} font-bold`}>›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-[#1e2433]">
                    {exp.technologies.map((t, idx) => (
                      <TechBadge key={idx} tech={t} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#1e2433] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>MAX AUGUSTO • SRE &amp; BACKEND ENGINEER</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-[#181d2a] text-slate-300 hover:text-white font-medium border border-[#272f42] cursor-pointer"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
