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
  MapPin,
  Linkedin,
  Github,
  Download,
  Eye,
  FileCode,
  CheckCircle2,
  Code2,
  Server,
  Network,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';
import { getPersonalInfo, getExperiences, getProjects, getSkillCategories } from '../data/localizedData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<'md' | 'txt' | null>(null);
  const [resumeLang, setResumeLang] = useState<'pt' | 'en'>('pt');
  const [viewMode, setViewMode] = useState<'a4' | 'terminal'>('a4');
  
  const { theme, isDark } = useTheme();
  const { language, isPT, t } = useLanguage();

  // Keep synced with global language by default
  React.useEffect(() => {
    setResumeLang(language);
  }, [language]);

  const isCurrentPT = resumeLang === 'pt';
  const personalInfo = getPersonalInfo(resumeLang);
  const experiences = getExperiences(resumeLang);
  const projects = getProjects(resumeLang);
  const skillCategories = getSkillCategories(resumeLang);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const getMarkdownResume = () => {
    return `# ${personalInfo.name}
**${personalInfo.title}**
📍 ${personalInfo.location} | ✉️ ${personalInfo.email} | 📱 ${personalInfo.phone}
🔗 LinkedIn: ${personalInfo.linkedin} | 🐙 GitHub: ${personalInfo.github}

---

## ${isCurrentPT ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
${personalInfo.bio}

---

## ${isCurrentPT ? 'COMPETÊNCIAS TÉCNICAS' : 'TECHNICAL SKILLS'}
- **Backend & APIs:** Python, Django, Django REST Framework, FastAPI, C#, .NET 10, Entity Framework Core, PostgreSQL, REST APIs, Webhooks (Mercado Pago, Stripe).
- **Infraestrutura & Redes N2:** Redes Corporativas LAN, Comutação L2/L3, VLANs, Roteamento, TCP/IP, Servidores Linux & Windows Server, Bash, ITIL v4, SLA de Missão Crítica.
- **Cloud, DevOps & Ferramentas:** Docker, Docker Compose, Railway Cloud, AWS, GitHub Actions (CI/CD), Git, DNS (SPF/DKIM), Resend.
- **Segurança & Governança:** Cisco Cybersecurity, Auth0, Clerk, Gerenciamento de Credenciais (.env/Vault), Procedimentos Operacionais Padrão (SOPs).

---

## ${isCurrentPT ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE'}
${experiences.map(e => `### ${e.company} — ${e.role}
*${e.period} | ${e.location}* [${e.badge}]
${e.highlights.map(h => `- ${h}`).join('\n')}
**${isCurrentPT ? 'Tecnologias' : 'Technologies'}:** ${e.technologies.join(', ')}
`).join('\n')}

---

## ${isCurrentPT ? 'PROJETOS EM DESTAQUE' : 'FEATURED PROJECTS'}
${projects.filter(p => p.featured).map(p => `### ${p.title} (${p.badge})
*${p.subtitle}*
${p.description}
- **Stack:** ${p.tags.join(', ')}
- **Repo / Demo:** ${p.githubUrl || p.liveUrl || ''}
`).join('\n')}

---

## ${isCurrentPT ? 'FORMAÇÃO ACADÊMICA & CERTIFICAÇÕES' : 'EDUCATION & CERTIFICATIONS'}
- **${personalInfo.education.degree}** — ${personalInfo.education.institution} (${personalInfo.education.period}) [${personalInfo.education.status}]
- **Introduction to Cybersecurity** — Cisco Networking Academy (Cisco Verified)
- **${isCurrentPT ? 'Idiomas' : 'Languages'}:** ${isCurrentPT ? 'Português (Nativo) | Inglês (Técnico / Profissional)' : 'Portuguese (Native) | English (Professional / Technical)'}
`;
  };

  const getPlainTextResume = () => {
    return `========================================================================
${personalInfo.name.toUpperCase()}
${personalInfo.title}
========================================================================
Localização: ${personalInfo.location}
E-mail: ${personalInfo.email}
Telefone / WhatsApp: ${personalInfo.phone}
LinkedIn: ${personalInfo.linkedin}
GitHub: ${personalInfo.github}

------------------------------------------------------------------------
${isCurrentPT ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
------------------------------------------------------------------------
${personalInfo.bio}

------------------------------------------------------------------------
${isCurrentPT ? 'COMPETÊNCIAS TÉCNICAS' : 'TECHNICAL SKILLS'}
------------------------------------------------------------------------
* Backend & APIs: Python, Django, Django REST Framework, FastAPI, C#, .NET 10, Entity Framework Core, PostgreSQL, REST APIs, Webhooks (Mercado Pago, Stripe).
* Infraestrutura & Redes: Redes Corporativas LAN, Comutação L2/L3, VLANs, Roteamento, Servidores Linux/Windows, Bash, ITIL v4, SLA Crítico.
* Cloud & DevOps: Docker, Docker Compose, Railway, AWS, GitHub Actions (CI/CD), Git, DNS (SPF/DKIM), Resend.
* Segurança: Cisco Cybersecurity, Auth0, Clerk, Gestão de Segredos, SOPs.

------------------------------------------------------------------------
${isCurrentPT ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE'}
------------------------------------------------------------------------
${experiences.map(e => `[ ${e.company.toUpperCase()} ] — ${e.role}
Período: ${e.period} | Local: ${e.location} (${e.badge})
${e.highlights.map(h => `  • ${h}`).join('\n')}
Tecnologias: ${e.technologies.join(', ')}
`).join('\n')}

------------------------------------------------------------------------
${isCurrentPT ? 'FORMAÇÃO ACADÊMICA & CERTIFICAÇÕES' : 'EDUCATION & CERTIFICATIONS'}
------------------------------------------------------------------------
* ${personalInfo.education.degree} — ${personalInfo.education.institution} (${personalInfo.education.period}) [${personalInfo.education.status}]
* Introduction to Cybersecurity — Cisco Networking Academy
* Idiomas: ${isCurrentPT ? 'Português (Nativo) | Inglês (Técnico / Profissional)' : 'Portuguese (Native) | English (Professional / Technical)'}
`;
  };

  const handleCopy = (type: 'md' | 'txt') => {
    const text = type === 'md' ? getMarkdownResume() : getPlainTextResume();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleDownload = (format: 'md' | 'txt') => {
    const text = format === 'md' ? getMarkdownResume() : getPlainTextResume();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Max_Augusto_Curriculo_${resumeLang.toUpperCase()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      id="print-modal-wrapper"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn overflow-y-auto"
    >
      <div 
        id="print-root-container"
        className={`${theme.bgCard} border ${theme.borderCard} rounded-2xl sm:rounded-3xl max-w-5xl w-full p-4 sm:p-6 md:p-8 shadow-2xl relative max-h-[94vh] flex flex-col transition-colors duration-300`}
      >
        
        {/* Top Control Bar (Hidden on actual print) */}
        <div className={`pb-4 border-b ${theme.borderCard} flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 no-print`}>
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard}`}>
              <FileText className={`w-4 h-4 ${theme.activeText}`} />
            </div>
            <div>
              <div className={`font-mono text-xs font-bold ${theme.textPrimary} flex items-center gap-1.5`}>
                <span>{isCurrentPT ? 'CURRÍCULO PROFISSIONAL' : 'PROFESSIONAL RESUME'}</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-500 px-1.5 py-0.2 rounded font-mono">
                  A4 / PDF READY
                </span>
              </div>
              <p className={`text-[11px] font-mono ${theme.textMuted}`}>
                Max Augusto • {isCurrentPT ? 'Pronto para Impressão & ATS' : 'Print & ATS Ready'}
              </p>
            </div>
          </div>

          {/* Quick Actions & Toggles */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {/* Language Switch */}
            <div className={`flex items-center p-0.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} font-mono text-xs`}>
              <button
                onClick={() => setResumeLang('pt')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${resumeLang === 'pt' ? `${theme.activeBg} text-white font-bold` : `${theme.textMuted} hover:${theme.textPrimary}`}`}
              >
                PT
              </button>
              <button
                onClick={() => setResumeLang('en')}
                className={`px-2 py-1 rounded-lg transition-all cursor-pointer ${resumeLang === 'en' ? `${theme.activeBg} text-white font-bold` : `${theme.textMuted} hover:${theme.textPrimary}`}`}
              >
                EN
              </button>
            </div>

            {/* View Mode Switch */}
            <div className={`flex items-center p-0.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} font-mono text-xs`}>
              <button
                onClick={() => setViewMode('a4')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${viewMode === 'a4' ? `${theme.activeBg} text-white font-bold` : `${theme.textMuted} hover:${theme.textPrimary}`}`}
                title="Visualização Limpa Formato Folha A4"
              >
                <Eye className="w-3 h-3" />
                <span className="hidden sm:inline">A4 Clean</span>
              </button>
              <button
                onClick={() => setViewMode('terminal')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer ${viewMode === 'terminal' ? `${theme.activeBg} text-white font-bold` : `${theme.textMuted} hover:${theme.textPrimary}`}`}
                title="Visualização Estilo Terminal Dark"
              >
                <Code2 className="w-3 h-3" />
                <span className="hidden sm:inline">Dark UI</span>
              </button>
            </div>

            {/* Copy Actions */}
            <button
              onClick={() => handleCopy('md')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textSecondary} text-xs font-mono border ${theme.borderSubCard} transition-all cursor-pointer font-medium`}
              title="Copiar Currículo em formato Markdown"
            >
              {copiedType === 'md' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <FileCode className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{copiedType === 'md' ? 'Copiado!' : 'Markdown'}</span>
            </button>

            <button
              onClick={() => handleCopy('txt')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textSecondary} text-xs font-mono border ${theme.borderSubCard} transition-all cursor-pointer font-medium`}
              title="Copiar Texto Puro para Vagas e Formulários"
            >
              {copiedType === 'txt' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="hidden sm:inline">{copiedType === 'txt' ? 'Copiado!' : 'Texto'}</span>
            </button>

            {/* Primary Print / Save PDF Button */}
            <button
              onClick={handlePrint}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${theme.activeBg} text-white text-xs font-mono font-bold ${theme.activeBgHover} transition-all cursor-pointer shadow-md active:scale-95`}
              title="Abrir diálogo de Impressão e Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isCurrentPT ? 'IMPRIMIR / PDF' : 'PRINT / PDF'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className={`p-1.5 rounded-xl ${theme.bgSubCard} ${theme.textMuted} hover:${theme.textPrimary} transition-colors cursor-pointer border ${theme.borderSubCard}`}
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Informative helper banner for generating perfect PDF */}
        <div className={`my-2 p-2.5 rounded-xl ${theme.bgSubCard} border ${theme.borderSubCard} text-xs font-mono ${theme.textMuted} flex items-center justify-between gap-2 no-print`}>
          <div className="flex items-center gap-2">
            <Sparkles className={`w-3.5 h-3.5 ${theme.activeText} shrink-0`} />
            <span>
              {isCurrentPT 
                ? '💡 Dica: Ao clicar em "Imprimir / PDF", selecione "Salvar como PDF" como impressora de destino.' 
                : '💡 Tip: When clicking "Print / PDF", select "Save as PDF" as the destination printer.'}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={() => handleDownload('txt')}
              className="underline hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>.txt</span>
            </button>
            <button 
              onClick={() => handleDownload('md')}
              className="underline hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>.md</span>
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className={`flex-1 overflow-y-auto pr-1 terminal-scroll print-scroll-container rounded-xl ${
          viewMode === 'a4' 
            ? 'bg-white text-slate-900 p-6 sm:p-8 md:p-10 border border-slate-200 shadow-inner' 
            : `${theme.bgCard} ${theme.textSecondary} p-2 sm:p-4 space-y-6`
        }`}>
          
          {/* ========================================================= */}
          {/* RESUME HEADER: Name, Specialization & Single-Line Contacts */}
          {/* ========================================================= */}
          <div className={`pb-5 border-b ${viewMode === 'a4' ? 'border-slate-300' : theme.borderCard} print-avoid-break`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${viewMode === 'a4' ? 'text-slate-900' : theme.textPrimary} print-text-dark`}>
                  {personalInfo.name}
                </h1>
                <p className={`text-sm sm:text-base font-bold font-mono mt-1 ${viewMode === 'a4' ? 'text-blue-700' : theme.activeText}`}>
                  {personalInfo.title}
                </p>
                <p className={`text-xs font-mono mt-0.5 ${viewMode === 'a4' ? 'text-slate-600' : theme.textMuted} print-text-muted`}>
                  {personalInfo.subtitle}
                </p>
              </div>

              {/* Minimal Tech Tag */}
              <div className="hidden md:flex flex-col items-end text-right font-mono text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700 dark:text-slate-300">DISPONIBILIDADE</span>
                <span className="text-emerald-600 font-bold">● Aberto a Oportunidades</span>
                <span className="text-[10px] text-slate-400">Presencial / Híbrido / Remoto</span>
              </div>
            </div>

            {/* Clean Structured Contact Strip */}
            <div className={`mt-4 pt-3 border-t ${viewMode === 'a4' ? 'border-slate-200 text-slate-700' : `${theme.borderSubCard} ${theme.textSecondary}`} flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-mono`}>
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{personalInfo.location}</span>
              </div>
              <span className="opacity-40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline text-blue-600">
                  {personalInfo.email}
                </a>
              </div>
              <span className="opacity-40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <a href={`https://wa.me/${personalInfo.phoneClean}`} target="_blank" rel="noreferrer" className="hover:underline">
                  {personalInfo.phone}
                </a>
              </div>
              <span className="opacity-40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                  linkedin.com/in/max-augusto
                </a>
              </div>
              <span className="opacity-40 hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-800 dark:text-slate-200" />
                <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                  github.com/Max-Augusto
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PROFESSIONAL SUMMARY */}
          {/* ========================================================= */}
          <div className={`mt-5 print-avoid-break`}>
            <div className={`flex items-center gap-2 pb-1 mb-2 border-b ${viewMode === 'a4' ? 'border-slate-200' : theme.borderSubCard}`}>
              <span className={`w-2 h-2 rounded-full ${viewMode === 'a4' ? 'bg-blue-600' : theme.activeBg}`}></span>
              <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${viewMode === 'a4' ? 'text-slate-900' : theme.activeText}`}>
                {isCurrentPT ? 'RESUMO PROFISSIONAL' : 'PROFESSIONAL SUMMARY'}
              </h2>
            </div>
            <p className={`text-xs sm:text-sm leading-relaxed ${viewMode === 'a4' ? 'text-slate-700 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200' : `${theme.bgSubCard} p-4 rounded-xl border ${theme.borderSubCard} ${theme.textSecondary}`}`}>
              {personalInfo.bio}
            </p>
          </div>

          {/* ========================================================= */}
          {/* TECHNICAL SKILLS MATRIX */}
          {/* ========================================================= */}
          <div className="mt-5 print-avoid-break">
            <div className={`flex items-center gap-2 pb-1 mb-2 border-b ${viewMode === 'a4' ? 'border-slate-200' : theme.borderSubCard}`}>
              <Cpu className={`w-3.5 h-3.5 ${viewMode === 'a4' ? 'text-blue-600' : theme.activeText}`} />
              <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${viewMode === 'a4' ? 'text-slate-900' : theme.activeText}`}>
                {isCurrentPT ? 'COMPETÊNCIAS TÉCNICAS & ARQUITETURA' : 'TECHNICAL SKILLS & ARCHITECTURE'}
              </h2>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs ${viewMode === 'a4' ? 'text-slate-800' : theme.textSecondary}`}>
              <div className={`p-3 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className="font-bold font-mono text-[11px] text-blue-600 mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>BACKEND & BANCO DE DADOS</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Linguagens & Frameworks:</strong> Python, Django, Django REST, FastAPI, C#, .NET 10, Entity Framework Core, SQL.
                </p>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  <strong>Integrações & Dados:</strong> PostgreSQL, Modelagem Relacional, APIs RESTful, Webhooks Mercado Pago &amp; Stripe.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className="font-bold font-mono text-[11px] text-blue-600 mb-1 flex items-center gap-1.5">
                  <Network className="w-3.5 h-3.5" />
                  <span>INFRAESTRUTURA & REDES CORPORATIVAS N2</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Redes & Hardware:</strong> Diagnóstico LAN/WAN, Comutação L2/L3, VLANs, Roteamento, Servidores Windows &amp; Linux.
                </p>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  <strong>Operação & SLA:</strong> Sustentação sob ITIL v4, SLA de Aviação de 99.9%, Scripts Bash, Cabeamento Estruturado.
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className="font-bold font-mono text-[11px] text-blue-600 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>CLOUD, DEVOPS & MENSAGERIA</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Containers & Deploy:</strong> Docker, Docker Compose, Railway Cloud, AWS, GitHub Actions (CI/CD Automatizado).
                </p>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  <strong>DNS & E-mails:</strong> SPF, DKIM, DMARC, Resend, Anymail, Gestão de Segredos (.env / Vault).
                </p>
              </div>

              <div className={`p-3 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className="font-bold font-mono text-[11px] text-blue-600 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SEGURANÇA, GOVERNANÇA & IDIOMAS</span>
                </div>
                <p className="leading-relaxed">
                  <strong>Certificações:</strong> Introduction to Cybersecurity (Cisco Networking Academy).
                </p>
                <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">
                  <strong>Idiomas:</strong> Português (Nativo) • Inglês (Profissional / Técnico).
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* PROFESSIONAL EXPERIENCE */}
          {/* ========================================================= */}
          <div className="mt-6">
            <div className={`flex items-center gap-2 pb-1 mb-3 border-b ${viewMode === 'a4' ? 'border-slate-200' : theme.borderSubCard} print-avoid-break`}>
              <Briefcase className={`w-3.5 h-3.5 ${viewMode === 'a4' ? 'text-blue-600' : theme.activeText}`} />
              <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${viewMode === 'a4' ? 'text-slate-900' : theme.activeText}`}>
                {isCurrentPT ? 'EXPERIÊNCIA PROFISSIONAL' : 'WORK EXPERIENCE'}
              </h2>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div 
                  key={exp.id} 
                  className={`p-4 rounded-xl border print-avoid-break ${viewMode === 'a4' ? 'bg-slate-50/70 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold ${viewMode === 'a4' ? 'text-slate-900' : theme.textPrimary}`}>
                        {exp.company} — <span className="font-semibold text-blue-700 dark:text-blue-400">{exp.role}</span>
                      </h3>
                      <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mt-0.5">
                        {exp.period} • {exp.location}
                      </div>
                    </div>
                    
                    <span className={`self-start text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${viewMode === 'a4' ? 'bg-blue-50 text-blue-800 border-blue-200' : `${theme.bgCard} ${theme.textPrimary} border ${theme.borderCard}`}`}>
                      {exp.badge}
                    </span>
                  </div>

                  {/* Highlights Bullet Points */}
                  <ul className={`mt-2 space-y-1.5 text-xs ${viewMode === 'a4' ? 'text-slate-700' : theme.textSecondary}`}>
                    {exp.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <span className="text-blue-600 font-bold mt-0.5">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies footer */}
                  <div className={`mt-3 pt-2 border-t ${viewMode === 'a4' ? 'border-slate-200 text-slate-600' : `${theme.borderCard} ${theme.textMuted}`} text-[11px] font-mono flex flex-wrap items-center gap-1.5`}>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Stack:</span>
                    {exp.technologies.map((t, idx) => (
                      <span 
                        key={idx}
                        className={`px-1.5 py-0.5 rounded text-[10px] ${viewMode === 'a4' ? 'bg-white border border-slate-200 text-slate-700' : `${theme.bgCard} text-slate-300`}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* FEATURED PROJECTS */}
          {/* ========================================================= */}
          <div className="mt-6 print-avoid-break">
            <div className={`flex items-center gap-2 pb-1 mb-3 border-b ${viewMode === 'a4' ? 'border-slate-200' : theme.borderSubCard}`}>
              <Code2 className={`w-3.5 h-3.5 ${viewMode === 'a4' ? 'text-blue-600' : theme.activeText}`} />
              <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${viewMode === 'a4' ? 'text-slate-900' : theme.activeText}`}>
                {isCurrentPT ? 'PROJETOS EM DESTAQUE & SAAS' : 'FEATURED PROJECTS & SAAS'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {projects.filter(p => p.featured).slice(0, 4).map((proj) => (
                <div 
                  key={proj.id} 
                  className={`p-3.5 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50/70 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className={`font-bold font-mono text-xs ${viewMode === 'a4' ? 'text-slate-900' : theme.textPrimary}`}>
                      {proj.title}
                    </h3>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold ${viewMode === 'a4' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-400'}`}>
                      {proj.badge}
                    </span>
                  </div>
                  <p className={`text-[11px] ${viewMode === 'a4' ? 'text-slate-600' : theme.textMuted} mb-2`}>
                    {proj.subtitle}
                  </p>
                  <p className={`leading-relaxed text-[11px] ${viewMode === 'a4' ? 'text-slate-700' : theme.textSecondary} mb-2`}>
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {proj.tags.slice(0, 5).map((tg, idx) => (
                      <span key={idx} className={`text-[9px] font-mono px-1 py-0.5 rounded ${viewMode === 'a4' ? 'bg-white border border-slate-200 text-slate-700' : `${theme.bgCard} text-slate-400`}`}>
                        {tg}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========================================================= */}
          {/* ACADEMIC EDUCATION & CERTIFICATIONS */}
          {/* ========================================================= */}
          <div className="mt-6 print-avoid-break">
            <div className={`flex items-center gap-2 pb-1 mb-3 border-b ${viewMode === 'a4' ? 'border-slate-200' : theme.borderSubCard}`}>
              <GraduationCap className={`w-3.5 h-3.5 ${viewMode === 'a4' ? 'text-blue-600' : theme.activeText}`} />
              <h2 className={`font-mono text-xs font-bold uppercase tracking-wider ${viewMode === 'a4' ? 'text-slate-900' : theme.activeText}`}>
                {isCurrentPT ? 'FORMAÇÃO ACADÊMICA & CERTIFICAÇÕES' : 'EDUCATION & CERTIFICATIONS'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className={`p-3.5 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50/70 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className={`font-bold text-sm ${viewMode === 'a4' ? 'text-slate-900' : theme.textPrimary}`}>
                  {personalInfo.education.degree}
                </div>
                <div className="text-xs font-mono text-blue-700 dark:text-blue-400 mt-0.5">
                  {personalInfo.education.institution}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  {personalInfo.education.period} • {personalInfo.education.status}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border ${viewMode === 'a4' ? 'bg-slate-50/70 border-slate-200' : `${theme.bgSubCard} border ${theme.borderSubCard}`}`}>
                <div className={`font-bold text-sm ${viewMode === 'a4' ? 'text-slate-900' : theme.textPrimary}`}>
                  Introduction to Cybersecurity
                </div>
                <div className="text-xs font-mono text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Cisco Networking Academy (Cisco Verified)</span>
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  Cibersegurança Aplicada, Firewalls &amp; Governança
                </div>
              </div>
            </div>
          </div>

          {/* Footer note in document */}
          <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] font-mono text-slate-400">
            Max Augusto • Portfólio &amp; Console SRE: {personalInfo.linkedin} • Atualizado em 2026
          </div>

        </div>

        {/* Modal Footer Controls (Hidden on Print) */}
        <div className={`mt-3 pt-3 border-t ${theme.borderCard} flex items-center justify-between text-xs font-mono ${theme.textMuted} no-print`}>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">MAX AUGUSTO // TECHNICAL CV</span>
            <span>•</span>
            <span className="text-emerald-500 font-bold">{personalInfo.stats.uptimeMetric} UPTIME</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className={`px-3 py-1.5 rounded-xl ${theme.activeBg} text-white font-bold cursor-pointer transition-all active:scale-95 flex items-center gap-1.5`}
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isCurrentPT ? 'Imprimir / PDF' : 'Print / PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className={`px-3 py-1.5 rounded-xl ${theme.bgSubCard} hover:${theme.bgCard} ${theme.textPrimary} border ${theme.borderSubCard} cursor-pointer transition-colors`}
            >
              {isCurrentPT ? 'Fechar' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
