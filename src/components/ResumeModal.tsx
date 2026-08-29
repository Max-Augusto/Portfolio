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
import { getPersonalInfo, getExperiences } from '../data/localizedData';
import { TechBadge } from './TechBadge';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();
  const personalInfo = getPersonalInfo(language);
  const experiences = getExperiences(language);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getMarkdownResume = () => {
    return `# ${personalInfo.name}
**${personalInfo.title}**
${personalInfo.location} | E-mail: ${personalInfo.email} | Telefone: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin} | GitHub: ${personalInfo.github}

---

## ${isPT ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
${personalInfo.bio}

---

## ${isPT ? 'FORMAÇÃO ACADÊMICA' : 'EDUCATION'}
- **${personalInfo.education.degree}** — ${personalInfo.education.institution} (${personalInfo.education.period}) [${personalInfo.education.status}]

## ${isPT ? 'CERTIFICAÇÕES' : 'CERTIFICATIONS'}
- **Introduction to Cybersecurity** — Cisco Networking Academy

## ${isPT ? 'IDIOMAS' : 'LANGUAGES'}
- ${isPT ? 'Português: Nativo | Inglês: Técnico / Profissional' : 'Portuguese: Native | English: Professional / Technical'}

---

## ${isPT ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE'}
${experiences.map(e => `### ${e.company} — ${e.role}
*${e.period} | ${e.location}*
${e.highlights.map(h => `- ${h}`).join('\n')}
**${isPT ? 'Tecnologias' : 'Technologies'}:** ${e.technologies.join(', ')}
`).join('\n')}

---

## ${isPT ? 'COMPETÊNCIAS TÉCNICAS' : 'TECHNICAL SKILLS'}
- **Backend & Architecture:** Python, Django, Django REST, FastAPI, C#, .NET 10, Entity Framework Core, PostgreSQL, REST APIs, Webhooks Mercado Pago & Stripe
- **Infrastructure & Networks:** Tier 2 IT Support, Enterprise LAN Networks, L2/L3 Switches, VLANs, Windows/Linux Servers, Bash, ITIL v4, Mission-Critical SLA
- **Cloud & DevOps:** Docker, Docker Compose, Railway Cloud, AWS, GitHub Actions, CI/CD, DNS (SPF/DKIM), Resend
- **Security & Governance:** Cisco Cybersecurity, Auth0, Clerk, Secrets Management (.env/Vault)
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(getMarkdownResume());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fadeIn">
      <div className={`${theme.bgCard} border ${theme.borderCard} rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] flex flex-col transition-colors duration-300`}>
        
        {/* Header Action Bar */}
        <div className={`flex items-center justify-between pb-4 border-b ${theme.borderCard} shrink-0`}>
          <div className={`flex items-center gap-2 font-mono text-xs ${theme.activeText}`}>
            <FileText className="w-4 h-4" />
            <span className="font-bold">{isPT ? 'CURRÍCULO TÉCNICO // OPERATOR_CV' : 'TECHNICAL RESUME // OPERATOR_CV'}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textSecondary} text-xs font-mono border ${theme.borderSubCard} transition-all cursor-pointer font-medium`}
              title="Copiar em formato Markdown"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{copied ? t('header.copied') : 'MARKDOWN'}</span>
            </button>

            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.activeBg} text-white text-xs font-mono font-bold ${theme.activeBgHover} transition-all cursor-pointer shadow-xs`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isPT ? 'IMPRIMIR / PDF' : 'PRINT / PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl ${theme.bgSubCard} ${theme.textMuted} hover:${theme.textPrimary} transition-colors cursor-pointer border ${theme.borderSubCard}`}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className={`flex-1 overflow-y-auto py-6 space-y-6 terminal-scroll pr-2 ${theme.textSecondary}`}>
          
          {/* Header Info */}
          <div className={`${theme.bgSubCard} rounded-2xl p-5 border ${theme.borderSubCard}`}>
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${theme.bgCard} border-2 ${theme.avatarBorder} p-0.5 overflow-hidden shrink-0 shadow-md`}>
                  <img 
                    src={personalInfo.avatarUrl} 
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className={`text-2xl sm:text-3xl font-extrabold ${theme.textPrimary}`}>
                    {personalInfo.name}
                  </h1>
                  <p className={`text-sm font-mono ${theme.activeText} font-bold mt-1`}>
                    {personalInfo.title}
                  </p>
                  <p className={`text-xs font-mono ${theme.textMuted}`}>
                    {personalInfo.subtitle}
                  </p>
                </div>
              </div>

              <div className={`text-xs font-mono ${theme.textMuted} space-y-1 text-left sm:text-right`}>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-500" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className={`w-3.5 h-3.5 ${theme.activeText}`} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{personalInfo.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div>
            <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-2 flex items-center gap-2`}>
              <span className={`w-1.5 h-1.5 ${theme.activeBg} rounded-sm`}></span>
              {isPT ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
            </h2>
            <p className={`text-sm ${theme.textSecondary} leading-relaxed ${theme.bgSubCard} p-4 rounded-2xl border ${theme.borderSubCard}`}>
              {personalInfo.bio}
            </p>
          </div>

          {/* Formação e Certificações */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${theme.bgSubCard} p-4 rounded-2xl border ${theme.borderSubCard}`}>
              <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-2.5 flex items-center gap-2`}>
                <GraduationCap className="w-4 h-4" />
                {isPT ? 'FORMAÇÃO ACADÊMICA' : 'ACADEMIC EDUCATION'}
              </h2>
              <div className={`text-sm font-bold ${theme.textPrimary}`}>{personalInfo.education.degree}</div>
              <div className={`text-xs ${theme.textMuted} mt-0.5`}>{personalInfo.education.institution} • {personalInfo.education.period} ({personalInfo.education.status})</div>
            </div>

            <div className={`${theme.bgSubCard} p-4 rounded-2xl border ${theme.borderSubCard}`}>
              <h2 className="text-xs font-mono uppercase text-amber-500 font-bold tracking-wider mb-2.5 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                {isPT ? 'CERTIFICAÇÕES & IDIOMAS' : 'CERTIFICATIONS & LANGUAGES'}
              </h2>
              <div className={`text-xs ${theme.textPrimary} font-semibold`}>
                • {personalInfo.certifications[0].name} (Cisco)
              </div>
              <div className={`text-xs ${theme.textMuted} mt-1`}>
                • {isPT ? 'Português (Nativo) • Inglês (Profissional)' : 'Portuguese (Native) • English (Professional)'}
              </div>
            </div>
          </div>

          {/* Experiências */}
          <div>
            <h2 className={`text-xs font-mono uppercase ${theme.activeText} font-bold tracking-wider mb-3 flex items-center gap-2`}>
              <Briefcase className="w-4 h-4" />
              {isPT ? 'HISTÓRICO PROFISSIONAL' : 'CAREER HISTORY'}
            </h2>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className={`${theme.bgSubCard} p-4 rounded-2xl border ${theme.borderSubCard}`}>
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <div>
                      <h3 className={`text-base font-bold ${theme.textPrimary}`}>{exp.company} — {exp.role}</h3>
                      <div className={`text-xs font-mono ${theme.activeText} font-medium`}>{exp.period} • {exp.location}</div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${theme.bgCard} ${theme.textPrimary} border ${theme.borderCard} font-semibold shadow-xs`}>
                      {exp.badge}
                    </span>
                  </div>

                  <ul className={`space-y-1.5 text-xs ${theme.textSecondary} my-3`}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 leading-relaxed">
                        <span className={`${theme.activeText} font-bold`}>›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-1 pt-2 border-t ${theme.borderCard}`}>
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
        <div className={`pt-3 border-t ${theme.borderCard} flex items-center justify-between text-[11px] font-mono ${theme.textMuted}`}>
          <span>MAX AUGUSTO • SRE &amp; BACKEND ENGINEER</span>
          <button
            onClick={onClose}
            className={`px-3 py-1 rounded-xl ${theme.bgSubCard} ${theme.textPrimary} font-medium border ${theme.borderSubCard} cursor-pointer`}
          >
            {isPT ? 'Fechar' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
