import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isPT: boolean;
  t: (key: string) => string;
}

const DICTIONARY: Record<Language, Record<string, string>> = {
  pt: {
    // Navigation / Header
    'nav.about': 'Sobre Mim',
    'nav.what_i_do': 'O Que Faço',
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.skills': 'Habilidades',
    'nav.topology': 'Topologia & Lab',
    'nav.terminal': 'Terminal CLI',
    'nav.contact': 'Contato',
    'header.operator_status': 'SISTEMAS OPERACIONAIS',
    'header.uptime': '99.9% UPTIME',
    'header.search': 'Buscar',
    'header.role': 'Support Analyst & SRE / Backend',
    'header.status_available': 'disponível',
    'header.status_busy': 'em plantão',
    'header.download_cv': 'Ver / Baixar Currículo',
    'header.copy_email': 'Clique para copiar e-mail',
    'header.copied': 'Copiado!',
    'header.theme_title': 'Paleta de Cores',
    'header.mode_toggle': 'Alternar Modo Claro/Escuro',
    'header.lang_toggle': 'Mudar Idioma',

    // Section Breadcrumbs & General
    'section.prefix': 'SEÇÃO //',
    'section.page': 'PÁGINA',
    'section.of': 'DE',
    'section.start': 'INÍCIO DO CONSOLE',
    'section.back_to_start': 'VOLTAR AO INÍCIO',

    // About Me
    'about.badge': 'PERFIL PROFISSIONAL & ENGENHARIA',
    'about.title': 'Construindo pontes entre infraestrutura crítica N2 e arquiteturas modernas de software.',
    'about.p1': 'Sou Max Augusto, graduando em Sistemas de Informação pela PUC Minas (2024–2027), atuando na interseção entre suporte de infraestrutura N2 de alta disponibilidade e engenharia de backend escalável.',
    'about.p2': 'Na Positivo S+ (alocado no Aeroporto da Pampulha em Belo Horizonte), garanto alta disponibilidade em sistemas de infraestrutura de TI aeroportuária essencial, lidando diretamente com diagnósticos avançados de hardware, estações de missão crítica, sistemas operacionais e enlaces de rede sob rigorosos acordos de nível de serviço (SLA).',
    'about.p3': 'Como desenvolvedor backend e criador do Betim Express (SaaS de logística em produção ativa), projeto arquiteturas com Python, Django, FastAPI, C# (.NET 10), PostgreSQL e integração de checkout transparente com Mercado Pago.',
    'about.stats.experience': 'Experiência TI & Dev',
    'about.stats.saas': 'SaaS em Produção',
    'about.stats.sla': 'Cumprimento de SLA',
    'about.stats.lines': 'Linhas de Código',
    'about.cta_contact': 'Falar Comigo',
    'about.cta_resume': 'Visualizar Currículo',
    'about.education_title': 'FORMAÇÃO ACADÊMICA',
    'about.education_degree': 'Bacharelado em Sistemas de Informação',
    'about.education_status': 'Cursando · 2024 - 2027',
    'about.cert_title': 'CERTIFICAÇÃO EM DESTAQUE',
    'about.cert_badge': 'CISCO VERIFIED',
    'about.langs_title': 'IDIOMAS',

    // What I Do
    'what_i_do.badge': 'ÁREAS DE ATUAÇÃO // 4 PILARES',
    'what_i_do.title': 'Competências Técnicas e Operacionais',
    'what_i_do.subtitle': 'Do diagnóstico físico e roteamento L2/L3 até pipelines de CI/CD e APIs corporativas em produção.',
    'what_i_do.spec_title': 'ESPECIFICAÇÕES TÉCNICAS & ATIVIDADES',

    // Experience
    'exp.badge': 'TRAJETÓRIA // EXPERIÊNCIA PROFISSIONAL',
    'exp.title': 'Histórico Profissional & Sustentação N2',
    'exp.subtitle': 'Experiência comprovada em operações de missão crítica no setor de aviação, setor público e engenharia SaaS.',
    'exp.active_tag': 'CONTRATO ATIVO',
    'exp.completed_tag': 'CONCLUÍDO',
    'exp.highlights_title': 'PRINCIPAIS ENTREGAS & RESPONSABILIDADES',
    'exp.tech_title': 'TECNOLOGIAS & FERRAMENTAS UTILIZADAS',

    // Projects
    'projects.badge': 'PORTFÓLIO DE CÓDIGO // PROJETOS',
    'projects.title': 'Projetos, SaaS e Algoritmos em Destaque',
    'projects.subtitle': 'Aplicações reais em produção, microserviços assíncronos e implementações algorítmicas avançadas.',
    'projects.filter_all': 'Todos os Projetos',
    'projects.filter_saas': 'SaaS em Produção',
    'projects.filter_backend': 'Backend & APIs',
    'projects.filter_algo': 'Algoritmos & Estruturas',
    'projects.view_live': 'Acessar Produção',
    'projects.view_github': 'Código no GitHub',
    'projects.production_badge': 'EM PRODUÇÃO',

    // Skills
    'skills.badge': 'MATRIZ DE COMPETÊNCIAS // STACK',
    'skills.title': 'Habilidades Técnicas & Ferramentas',
    'skills.subtitle': 'Visão categorizada das tecnologias com nível de proficiência e aplicação prática.',
    'skills.tech_stack_summary': 'RESUMO DE PROFICIÊNCIA',

    // Topology
    'topo.badge': 'LABORATÓRIO INTERATIVO // REDES & N2',
    'topo.title': 'Simulador de Topologia de Rede & Diagnóstico',
    'topo.subtitle': 'Visualize enlaces L2/L3, simule tráfego de dados e teste comandos de troubleshooting.',
    'topo.status_normal': 'REDE OPERACIONAL',
    'topo.status_warning': 'ALERTA EM ENLACE',
    'topo.simulate_ping': 'Executar Ping / Diagnóstico',
    'topo.inspect_node': 'Clique em um nó da rede para inspecionar métricas e configurações.',

    // Terminal
    'terminal.badge': 'CONSOLE SRE // TERMINAL INTERATIVO',
    'terminal.title': 'Shell Interativo de Operações',
    'terminal.subtitle': 'Digite comandos como "help", "about", "projects", "matrix" ou "ping".',
    'terminal.welcome': 'Bem-vindo ao Console SRE de Max Augusto. Digite "help" para ver comandos.',
    'terminal.prompt_placeholder': 'Digite um comando (ex: help, projects, exp, theme cyan)...',
    'terminal.clear_btn': 'Limpar',
    'terminal.matrix_btn': 'Modo Matrix',

    // Contact
    'contact.badge': 'CANAIS DIRETOS // VAMOS CONVERSAR',
    'contact.title': 'Entre em Contato',
    'contact.subtitle': 'Disponível para oportunidades em Suporte N2/Infraestrutura, SRE e Desenvolvimento Backend.',
    'contact.form_name': 'Seu Nome',
    'contact.form_email': 'Seu E-mail',
    'contact.form_subject': 'Assunto',
    'contact.form_message': 'Mensagem',
    'contact.form_send': 'Enviar Mensagem via WhatsApp / E-mail',
    'contact.direct_channels': 'CANAIS DE ATENDIMENTO DIRETO',
    'contact.location_val': 'Betim / Belo Horizonte, MG (Presencial / Híbrido / Remoto)',

    // Resume Modal
    'resume.title': 'Currículo Estruturado',
    'resume.subtitle': 'Max Augusto · Suporte N2, Infraestrutura & Backend',
    'resume.print': 'Imprimir / Salvar PDF',
    'resume.close': 'Fechar',
    'resume.summary_title': 'RESUMO PROFISSIONAL',
    'resume.exp_title': 'EXPERIÊNCIA PROFISSIONAL',
    'resume.edu_title': 'FORMAÇÃO & CERTIFICAÇÕES',
    'resume.skills_title': 'HABILIDADES TÉCNICAS',

    // Footer
    'footer.built_with': 'Desenvolvido por Max Augusto · PUC Minas · Positivo S+ (Pampulha)',
    'footer.rights': 'Todos os direitos reservados.',
    'footer.shortcuts': 'Atalhos: [⌘K / Ctrl+K] Buscar · [← / →] Navegar Seções · [1-8] Acesso Direto',
  },
  en: {
    // Navigation / Header
    'nav.about': 'About Me',
    'nav.what_i_do': 'What I Do',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.topology': 'Topology & Lab',
    'nav.terminal': 'Interactive CLI',
    'nav.contact': 'Contact',
    'header.operator_status': 'OPERATIONAL SYSTEMS',
    'header.uptime': '99.9% UPTIME',
    'header.search': 'Search',
    'header.role': 'Support Analyst & SRE / Backend Developer',
    'header.status_available': 'available',
    'header.status_busy': 'in on-call duty',
    'header.download_cv': 'View / Download Resume',
    'header.copy_email': 'Click to copy email',
    'header.copied': 'Copied!',
    'header.theme_title': 'Color Palette',
    'header.mode_toggle': 'Toggle Light/Dark Mode',
    'header.lang_toggle': 'Change Language',

    // Section Breadcrumbs & General
    'section.prefix': 'SECTION //',
    'section.page': 'PAGE',
    'section.of': 'OF',
    'section.start': 'START OF CONSOLE',
    'section.back_to_start': 'BACK TO START',

    // About Me
    'about.badge': 'PROFESSIONAL PROFILE & ENGINEERING',
    'about.title': 'Bridging the gap between critical N2 infrastructure and modern software architectures.',
    'about.p1': 'I am Max Augusto, an Information Systems undergraduate at PUC Minas (2024–2027), working at the intersection of high-availability N2 infrastructure support and scalable backend engineering.',
    'about.p2': 'At Positivo S+ (stationed at Pampulha Airport in Belo Horizonte), I deliver high availability across critical airport IT infrastructure, handling advanced hardware troubleshooting, mission-critical workstations, operating systems, and network links under strict service level agreements (SLAs).',
    'about.p3': 'As a backend developer and creator of Betim Express (logistics SaaS in active production), I architect solutions using Python, Django, FastAPI, C# (.NET 10), PostgreSQL, and transparent Mercado Pago checkout integrations.',
    'about.stats.experience': 'IT & Dev Experience',
    'about.stats.saas': 'Production SaaS',
    'about.stats.sla': 'SLA Compliance',
    'about.stats.lines': 'Lines of Code',
    'about.cta_contact': 'Get in Touch',
    'about.cta_resume': 'View Resume',
    'about.education_title': 'ACADEMIC EDUCATION',
    'about.education_degree': 'Bachelor of Science in Information Systems',
    'about.education_status': 'In Progress · 2024 - 2027',
    'about.cert_title': 'FEATURED CERTIFICATION',
    'about.cert_badge': 'CISCO VERIFIED',
    'about.langs_title': 'LANGUAGES',

    // What I Do
    'what_i_do.badge': 'AREAS OF EXPERTISE // 4 PILLARS',
    'what_i_do.title': 'Technical and Operational Capabilities',
    'what_i_do.subtitle': 'From physical troubleshooting and L2/L3 routing to CI/CD pipelines and production-ready enterprise APIs.',
    'what_i_do.spec_title': 'TECHNICAL SPECS & SCOPE OF WORK',

    // Experience
    'exp.badge': 'CAREER TRAJECTORY // WORK EXPERIENCE',
    'exp.title': 'Professional Background & N2 Support',
    'exp.subtitle': 'Proven experience across mission-critical aviation operations, public sector infrastructure, and SaaS engineering.',
    'exp.active_tag': 'ACTIVE CONTRACT',
    'exp.completed_tag': 'COMPLETED',
    'exp.highlights_title': 'KEY ACHIEVEMENTS & RESPONSIBILITIES',
    'exp.tech_title': 'TECHNOLOGIES & TOOLSET',

    // Projects
    'projects.badge': 'CODE PORTFOLIO // PROJECTS',
    'projects.title': 'Featured Projects, SaaS & Algorithms',
    'projects.subtitle': 'Real-world production apps, asynchronous microservices, and advanced algorithmic implementations.',
    'projects.filter_all': 'All Projects',
    'projects.filter_saas': 'Production SaaS',
    'projects.filter_backend': 'Backend & APIs',
    'projects.filter_algo': 'Algorithms & Data Structs',
    'projects.view_live': 'View Live Site',
    'projects.view_github': 'Source on GitHub',
    'projects.production_badge': 'IN PRODUCTION',

    // Skills
    'skills.badge': 'TECHNICAL MATRIX // STACK',
    'skills.title': 'Technical Skills & Toolsets',
    'skills.subtitle': 'Categorized breakdown of technologies with proficiency level and real-world application.',
    'skills.tech_stack_summary': 'PROFICIENCY OVERVIEW',

    // Topology
    'topo.badge': 'INTERACTIVE LAB // NETWORKING & N2',
    'topo.title': 'Network Topology Simulator & Diagnostics',
    'topo.subtitle': 'Visualize L2/L3 links, simulate packet traffic, and test troubleshooting commands.',
    'topo.status_normal': 'NETWORK OPERATIONAL',
    'topo.status_warning': 'LINK ALERT',
    'topo.simulate_ping': 'Run Ping / Diagnostic',
    'topo.inspect_node': 'Click on a network node to inspect metrics and configurations.',

    // Terminal
    'terminal.badge': 'SRE CONSOLE // INTERACTIVE TERMINAL',
    'terminal.title': 'Interactive Operations Shell',
    'terminal.subtitle': 'Type commands like "help", "about", "projects", "matrix", or "ping".',
    'terminal.welcome': 'Welcome to Max Augusto\'s SRE Console. Type "help" to see all commands.',
    'terminal.prompt_placeholder': 'Enter a command (e.g., help, projects, exp, theme cyan)...',
    'terminal.clear_btn': 'Clear',
    'terminal.matrix_btn': 'Matrix Mode',

    // Contact
    'contact.badge': 'DIRECT CHANNELS // LET\'S CONNECT',
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Available for opportunities in N2 Support/Infrastructure, SRE, and Backend Development.',
    'contact.form_name': 'Your Name',
    'contact.form_email': 'Your Email',
    'contact.form_subject': 'Subject',
    'contact.form_message': 'Message',
    'contact.form_send': 'Send Message via WhatsApp / Email',
    'contact.direct_channels': 'DIRECT CONTACT CHANNELS',
    'contact.location_val': 'Betim / Belo Horizonte, MG, Brazil (On-site / Hybrid / Remote)',

    // Resume Modal
    'resume.title': 'Structured Resume',
    'resume.subtitle': 'Max Augusto · N2 Support, Infrastructure & Backend',
    'resume.print': 'Print / Save as PDF',
    'resume.close': 'Close',
    'resume.summary_title': 'PROFESSIONAL SUMMARY',
    'resume.exp_title': 'PROFESSIONAL EXPERIENCE',
    'resume.edu_title': 'EDUCATION & CERTIFICATIONS',
    'resume.skills_title': 'TECHNICAL SKILLS',

    // Footer
    'footer.built_with': 'Crafted by Max Augusto · PUC Minas · Positivo S+ (Pampulha Airport)',
    'footer.rights': 'All rights reserved.',
    'footer.shortcuts': 'Shortcuts: [⌘K / Ctrl+K] Search · [← / →] Navigate · [1-8] Direct Section Jump',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio_language');
      if (saved === 'pt' || saved === 'en') {
        return saved;
      }
      // Check browser default
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('pt')) return 'pt';
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_language', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  const t = (key: string): string => {
    return DICTIONARY[language]?.[key] || DICTIONARY['pt']?.[key] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage, 
        toggleLanguage, 
        isPT: language === 'pt',
        t 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
