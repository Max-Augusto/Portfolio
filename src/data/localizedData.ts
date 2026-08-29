import { Experience, Project, SkillCategory, WhatIDoItem } from '../types';
import { Language } from '../context/LanguageContext';

export const getPersonalInfo = (lang: Language) => {
  const isEn = lang === 'en';
  return {
    name: 'Max Augusto',
    title: isEn
      ? 'IT Support & Infrastructure · Backend Developer · Systems Architecture'
      : 'Suporte N2 & Infraestrutura · Desenvolvedor Backend · Arquitetura de Sistemas',
    subtitle: isEn
      ? 'Bridging enterprise infrastructure, N2 operations, and scalable software architecture'
      : 'Conectando infraestrutura corporativa, operações N2 e arquiteturas escaláveis de software',
    location: isEn ? 'Betim / Belo Horizonte, Minas Gerais, Brazil' : 'Betim / Belo Horizonte, Minas Gerais, Brasil',
    email: 'maxaugusto6474@gmail.com',
    phone: '+55 (31) 99102-5715',
    phoneClean: '5531991025715',
    linkedin: 'https://www.linkedin.com/in/max-augusto-226530255',
    github: 'https://github.com/Max-Augusto',
    avatarUrl: 'https://github.com/Max-Augusto.png',
    education: {
      degree: isEn ? 'Bachelor of Science in Information Systems' : 'Bacharelado em Sistemas de Informação',
      institution: 'PUC Minas',
      period: '2024 - 2027',
      status: isEn ? 'In Progress' : 'Em andamento',
    },
    certifications: [
      {
        name: 'Introduction to Cybersecurity',
        issuer: 'Cisco Networking Academy',
        badge: 'CISCO VERIFIED',
      },
    ],
    languages: isEn
      ? [
          { lang: 'Portuguese', level: 'Native' },
          { lang: 'English', level: 'Professional' },
        ]
      : [
          { lang: 'Português', level: 'Nativo' },
          { lang: 'Inglês', level: 'Profissional' },
        ],
    bio: isEn
      ? "Hi! I'm Max Augusto, an IT Support & Infrastructure Analyst and Backend Developer based in Betim/Belo Horizonte, MG, Brazil. I bridge the gap between enterprise IT operations (N2/LAN networks) and production-ready backend systems. Creator and maintainer of Betim Express (logistics SaaS in active production with Python, Django, PostgreSQL, CI/CD, and Mercado Pago). Currently working at Positivo S+ delivering critical IT infrastructure support for aviation operations at Pampulha Airport, with prior experience supporting distributed municipal environments. Undergraduate in Information Systems at PUC Minas (2024–2027)."
      : "Olá! Sou Max Augusto, Analista de Suporte de TI & Infraestrutura e Desenvolvedor Backend baseado em Betim/Belo Horizonte, MG. Atuo na convergência entre suporte de infraestrutura corporativa N2 (redes LAN, comutação L2/L3 e servidores) e desenvolvimento de sistemas backend em produção. Criador e mantenedor do Betim Express (SaaS de logística em produção com Python, Django, PostgreSQL, CI/CD e Mercado Pago). Atualmente na Positivo S+ prestando suporte de TI de missão crítica para operações da aviação no Aeroporto da Pampulha, com histórico prévio na Prefeitura de Betim. Graduando em Sistemas de Informação na PUC Minas (2024–2027).",
    stats: {
      yearsExp: '2+',
      saasProjects: '04+',
      publicRepos: '10+',
      contributions2026: '320+',
      linesOfCode: '68k+',
      uptimeMetric: '99.98%',
      responseTime: isEn ? '< 24h' : '< 24h',
    },
  };
};

export const getWhatIDo = (lang: Language): WhatIDoItem[] => {
  const isEn = lang === 'en';
  return [
    {
      id: 'infra-networks',
      title: isEn ? 'Enterprise Infrastructure & LAN Networking' : 'Infraestrutura Corporativa & Redes LAN',
      subtitle: isEn ? 'High Availability & Critical Operations' : 'Alta Disponibilidade & Missão Crítica',
      description: isEn
        ? 'Connectivity troubleshooting, L2/L3 switching, structured cabling, Linux & Windows Server administration, and critical operations support in aviation and public sectors.'
        : 'Diagnóstico de conectividade, comutação L2/L3, cabeamento estruturado, servidores Linux & Windows Server e suporte a operações de missão crítica no setor de aviação e setor público.',
      iconName: 'Network',
      badge: 'MISSION_CRITICAL',
      tags: ['LAN Networking', 'Linux', 'Windows Server', 'Switches L2/L3', 'Bash', 'ITIL v4', 'TCP/IP'],
      specs: isEn
        ? [
            'Advanced diagnostic of enterprise LAN connectivity and network equipment',
            'On-site and remote support under strict SLA agreements in aviation (Positivo S+)',
            'Preventive & corrective maintenance of physical servers and mission-critical stations',
            'Inventory, mapping, and topological documentation of IT infrastructure',
          ]
        : [
            'Diagnóstico avançado de conectividade LAN e ativos de rede corporativos',
            'Suporte presencial/remoto sob rigorosos acordos de SLA na aviação (Positivo S+)',
            'Manutenção preventiva e sustentação de servidores físicos e estações críticas',
            'Inventário e documentação topológica de infraestrutura corporativa',
          ],
    },
    {
      id: 'backend-saas',
      title: isEn ? 'Backend & Systems Architecture' : 'Arquitetura Backend & Engenharia SaaS',
      subtitle: isEn ? 'Python, Django, FastAPI & .NET 10' : 'Python, Django, FastAPI & .NET 10',
      description: isEn
        ? 'Full-stack backend architecture with Python/Django, FastAPI, C# and .NET 10 Web APIs. PostgreSQL modeling, financial business rules, transparent Mercado Pago & Stripe checkout.'
        : 'Desenvolvimento de arquiteturas completas com Python/Django, FastAPI, C# e .NET 10 Web APIs. Modelagem PostgreSQL, regras de negócio financeiras, checkout transparente Mercado Pago e Stripe.',
      iconName: 'Server',
      badge: 'CORE_ENGINEERING',
      tags: ['Python', 'Django', 'FastAPI', 'C# / .NET 10', 'PostgreSQL', 'EF Core', 'REST APIs', 'Mercado Pago'],
      specs: isEn
        ? [
            'High-integrity relational data modeling with PostgreSQL, EF Core and Django ORM',
            'Transparent checkouts, recurring billing, and secure webhooks (Mercado Pago & Stripe)',
            'Real-time freight, commission, and profit margin calculation engines (Betim Express)',
            'High-throughput asynchronous microservices architectures with low latency',
          ]
        : [
            'Modelagem relacional de alta integridade com PostgreSQL e EF Core / Django ORM',
            'Checkout transparente, assinaturas recorrentes e Webhooks (Mercado Pago & Stripe)',
            'Motores de cálculo de frete, comissão e margem de lucro em tempo real (Betim Express)',
            'Arquiteturas de microserviços de alto desempenho e parsing financeiro',
          ],
    },
    {
      id: 'devops-cloud',
      title: isEn ? 'CI/CD, Cloud & DevOps' : 'CI/CD, Nuvem & DevOps',
      subtitle: isEn ? 'Docker, Railway, AWS & GitHub Actions' : 'Docker, Railway, AWS & GitHub Actions',
      description: isEn
        ? 'Automated deployments and containerization with Docker, CI/CD pipelines with GitHub Actions and Railway, AWS hosting, and technical DNS deliverability setup (SPF, DKIM).'
        : 'Deploy automatizado e containerização com Docker, pipelines de CI/CD com GitHub Actions e Railway, infraestrutura AWS e configuração técnica de entregabilidade DNS (SPF, DKIM, Resend/Anymail).',
      iconName: 'Cloud',
      badge: 'AUTOMATION_FIRST',
      tags: ['Docker', 'Railway', 'AWS', 'GitHub Actions', 'Git', 'DNS (SPF/DKIM)', 'Resend'],
      specs: isEn
        ? [
            'Application containerization with Docker and Docker Compose orchestration',
            'Automated CI/CD pipelines with GitHub Actions and continuous deployments to Railway',
            'Advanced DNS configuration (SPF, DKIM) for transactional email deliverability',
            'Secure secrets management, environment variable controls, and logging observability',
          ]
        : [
            'Containerização de aplicações com Docker e orquestração Docker Compose',
            'Pipelines automatizados de CI/CD com GitHub Actions e deploy contínuo na Railway',
            'Configuração avançada de DNS (SPF, DKIM) para entregabilidade de e-mails transacionais',
            'Gestão segura de credenciais, variáveis de ambiente e observabilidade de logs',
          ],
    },
    {
      id: 'security-governance',
      title: isEn ? 'Security, Identity & ITIL Governance' : 'Segurança, Identidade & Governança ITIL',
      subtitle: isEn ? 'Cybersecurity, Auth0/Clerk & SLA Compliance' : 'Cibersegurança, Auth0/Clerk & Conformidade SLA',
      description: isEn
        ? 'ITIL v4 compliance, rigorous operational incident management, robust identity implementations (Auth0, Clerk), secrets management, and Cisco certification.'
        : 'Conformidade com ITIL v4, gerenciamento rigoroso de incidentes operacionais, implementação de autenticação segura (Auth0, Clerk), gerenciamento de segredos (.env / Vault) e certificação Cisco.',
      iconName: 'ShieldCheck',
      badge: 'SECURITY_FIRST',
      tags: ['Cisco Cybersecurity', 'Auth0', 'Clerk', 'Secrets Vault', 'ITIL v4', 'SLA Management'],
      specs: isEn
        ? [
            'Cisco Introduction to Cybersecurity certification applied to system integrity',
            'Integration of modern identity providers and role-based access control (Auth0, Clerk)',
            'Incident triage aligned with ITIL best practices and standard operating procedures (SOPs)',
            'Root cause analysis (RCA) and mitigation of network and application vulnerabilities',
          ]
        : [
            'Certificação Cisco Introduction to Cybersecurity aplicada à integridade de sistemas',
            'Integração de provedores modernos de identidade e controle de acesso (Auth0 e Clerk)',
            'Gestão de incidentes alinhada a boas práticas ITIL e criação de SOPs operacionais',
            'Análise de causa raiz (RCA) e mitigação de vulnerabilidades de rede e aplicação',
          ],
    },
  ];
};

export const getExperiences = (lang: Language): Experience[] => {
  const isEn = lang === 'en';
  return [
    {
      id: 'positivo-splus',
      company: 'Positivo S+',
      role: isEn ? 'Junior Support Analyst / Airport IT' : 'Analista de Suporte Júnior / TI Aeroportuária',
      period: isEn ? 'Aug/2026 - Present' : 'Ago/2026 - Presente',
      location: isEn ? 'Belo Horizonte / Pampulha Airport (PLU)' : 'Belo Horizonte / Aeroporto da Pampulha (PLU)',
      badge: isEn ? 'CRITICAL SECTOR: AVIATION' : 'SETOR CRÍTICO: AVIAÇÃO',
      status: 'active',
      slaMetrics: isEn ? '99.9% critical airport SLA compliance' : '99.9% cumprimento de SLA de atendimento crítico aeroportuário',
      highlights: isEn
        ? [
            'On-site and remote IT support in a mission-critical environment at Pampulha Airport (Positivo S+), ensuring uninterrupted flight and passenger terminal operations.',
            'Preventive and corrective maintenance of hardware, check-in/gate workstations, local servers, and essential airport IT assets.',
            'Active management of Tier 2 incidents aligned with strict aviation operational SLAs and systematic technical SOP creation.',
            'Rapid diagnosis of LAN connectivity incidents, telecom links, and direct interface with central engineering teams.',
          ]
        : [
            'Suporte presencial e sustentação de TI em ambiente de missão crítica no Aeroporto da Pampulha (Positivo S+), garantindo continuidade operacional ininterrupta de voos e terminal.',
            'Manutenção preventiva e corretiva de hardware, estações de atendimento, servidores locais e ativos de TI essenciais.',
            'Gestão ativa de incidentes N2 alinhada a rigorosos SLAs operacionais da aviação e criação sistemática de documentações técnicas (SOPs).',
            'Diagnóstico ágil de incidentes de conectividade LAN, links e interface direta com equipes de engenharia central.',
          ],
      technologies: isEn 
        ? ['Airport IT Infrastructure', 'Tier 2 Hardware', 'Windows/Linux Servers', 'ITIL v4', 'SOPs', 'Network Troubleshooting']
        : ['Infraestrutura Aeroportuária (Pampulha)', 'Hardware N2', 'Servidores Windows/Linux', 'ITIL v4', 'SOPs', 'Troubleshooting de Redes'],
    },
    {
      id: 'betim-express',
      company: 'Betim Express',
      role: isEn ? 'Founder & Lead Engineer / SaaS' : 'Criador & Engenheiro Principal / SaaS',
      period: isEn ? 'Jan/2026 - Present' : 'Jan/2026 - Presente',
      location: isEn ? 'Betim, MG (Live Production)' : 'Betim, MG (Produção Real)',
      badge: isEn ? 'PRODUCTION SAAS' : 'SAAS EM PRODUÇÃO',
      status: 'active',
      slaMetrics: isEn ? '100% automated freight reconciliation and payment workflows' : '100% de automação em conciliação de fretes e pagamentos',
      highlights: isEn
        ? [
            'Complete conception, system architecture, and full-stack development of a logistics SaaS platform for fleet management and transport commissions.',
            'Implementation of a real-time freight, margin, and net profit engine integrated with Mercado Pago transparent checkout via webhooks.',
            'Cloud infrastructure setup on Railway with managed PostgreSQL databases and automated continuous integration/deployment (CI/CD).',
            'Enterprise email deliverability setup with DNS SPF, DKIM records, and transactional messaging using Resend & Anymail.',
          ]
        : [
            'Concepção, arquitetura e desenvolvimento integral de uma plataforma SaaS logística para gestão e comissionamento de frotas e transportes.',
            'Implementação de motor de cálculo de fretes, margem e lucros em tempo real acoplado a checkout transparente Mercado Pago via Webhooks.',
            'Configuração de infraestrutura em nuvem na Railway com banco de dados PostgreSQL gerenciado e pipelines de integração contínua (CI/CD).',
            'Estruturação de segurança de e-mails corporativos com DNS SPF, DKIM e mensageria transacional via Resend & Anymail.',
          ],
      technologies: ['Python', 'Django', 'PostgreSQL', 'Railway Cloud', 'Mercado Pago API', 'DNS (SPF/DKIM)', 'Resend', 'CI/CD'],
    },
    {
      id: 'pref-betim',
      company: isEn ? 'Municipality of Betim' : 'Prefeitura de Betim',
      role: isEn ? 'Tier 2 Support | Networks & Infrastructure' : 'Suporte N2 | Redes e Infraestrutura',
      period: isEn ? 'Sep/2024 - May/2026' : 'Set/2024 - Mai/2026',
      location: 'Betim, MG',
      badge: isEn ? 'PUBLIC SECTOR & DISTRIBUTED NETWORKS' : 'SETOR PÚBLICO & REDES DISTRIBUÍDAS',
      status: 'completed',
      slaMetrics: isEn ? '300+ managed devices and dozens of departments sustained' : '+300 ativos gerenciados e dezenas de secretarias sustentadas',
      highlights: isEn
        ? [
            'Maintained enterprise corporate LAN networks distributed across municipal secretariats, agencies, and educational institutions.',
            'Handled and resolved Tier 2 tickets of medium and high complexity, applying methodologies aligned with ITIL best practices.',
            'Device inventory, switching/routing configurations, and large-scale support for Windows and Linux operating systems.',
            'Supported telecom links, structured cabling, and maintenance of telecommunications equipment.',
          ]
        : [
            'Sustentação da infraestrutura de redes LAN corporativas distribuídas entre secretarias municipais, autarquias e unidades educacionais.',
            'Atendimento e resolução de chamados N2 de média e alta complexidade, aplicando metodologias alinhadas às boas práticas ITIL.',
            'Inventário, configuração de roteamento/switching e suporte a sistemas operacionais Windows e distribuições Linux em larga escala.',
            'Suporte a links de telecomunicações, cabeamento estruturado e manutenção de ativos de telecom.',
          ],
      technologies: isEn 
        ? ['LAN Networks', 'Switches & Routers', 'Tier 2 Support', 'ITIL', 'Linux / Windows Server', 'Structured Cabling']
        : ['Redes LAN', 'Switches & Roteadores', 'Suporte N2', 'ITIL', 'Linux / Windows Server', 'Cabeamento Estruturado'],
    },
  ];
};

export const getProjects = (lang: Language): Project[] => {
  const isEn = lang === 'en';
  return [
    {
      id: 'betim-express-saas',
      title: 'Betim Express',
      subtitle: isEn ? 'Logistics Management SaaS in Active Production' : 'SaaS de Gestão Logística em Produção Real',
      description: isEn
        ? 'Full-featured logistics management SaaS in production with real-time financial margin computation and Mercado Pago payments.'
        : 'Plataforma SaaS logística completa em produção real com motor de cálculo financeiro e pagamentos Mercado Pago.',
      longDescription: isEn
        ? 'Full-featured logistics management SaaS in active production. Real-time net profit and driver commission computation engine. Transparent checkout and recurring subscription webhooks via Mercado Pago. Production cloud deployment on Railway with managed PostgreSQL, CI/CD, and transactional email deliverability (Resend/Anymail + SPF/DKIM DNS configuration).'
        : 'Plataforma SaaS logística completa em produção real. Motor de cálculo de fretes, margem e lucros em tempo real. Checkout transparente e webhooks de assinaturas recorrentes com Mercado Pago. Deploy em produção na Railway com PostgreSQL gerenciado, CI/CD automatizado e entregabilidade de e-mails transacionais (Resend/Anymail + DNS SPF/DKIM).',
      category: 'saas',
      badge: 'LIVE_PRODUCTION',
      liveUrl: 'https://www.betimexpress.com.br',
      githubUrl: 'https://github.com/Max-Augusto/Logistica-Caminhao',
      tags: ['Python', 'Django', 'PostgreSQL', 'Railway', 'Mercado Pago', 'Webhooks', 'DNS SPF/DKIM', 'Resend'],
      metrics: isEn ? ['Live Production', 'Integrated Checkout', 'Automated CI/CD'] : ['Produção Ativa', 'Checkout Integrado', 'CI/CD Automatizado'],
      status: 'production',
      featured: true,
    },
    {
      id: 'qr-code-microservice',
      title: 'Dynamic QR Code Microservice',
      subtitle: isEn ? 'High-Performance Python & FastAPI Engine' : 'Motor Assíncrono de Alta Performance em FastAPI',
      description: isEn
        ? 'High-performance URL router, dynamic QR Code generator, and real-time redirection microservice.'
        : 'Roteador de URLs de alto desempenho, gerador dinâmico de QR Codes e motor de redirecionamento em tempo real.',
      longDescription: isEn
        ? 'High-performance URL routing, dynamic QR code generation, and low-latency redirection engine built with Python, FastAPI, and asynchronous backend processing.'
        : 'Microserviço assíncrono para roteamento de URLs, geração dinâmica e instantânea de QR Codes e redirecionamento de links em tempo real com FastAPI e Python.',
      category: 'backend',
      badge: 'FASTAPI_MICROSERVICE',
      githubUrl: 'https://github.com/Max-Augusto/dynamic-qr-redirect',
      tags: ['Python', 'FastAPI', 'Microservices', 'Async IO', 'QR Generation', 'REST APIs'],
      metrics: isEn ? ['Low Latency', 'Async Engine', 'Microservice Arch'] : ['Baixa Latência', 'Async Engine', 'Arquitetura Microserviço'],
      status: 'featured',
      featured: true,
    },
    {
      id: 'taskmanager-django',
      title: 'TaskManager Django',
      subtitle: isEn ? 'Enterprise Task Management & Role-Based Auth' : 'Gestão Corporativa de Tarefas & Autenticação',
      description: isEn
        ? 'Robust Django web application for enterprise task management, status workflows, and permission levels.'
        : 'Aplicação web robusta com Django para gestão corporativa de tarefas, controle de status e níveis de permissão.',
      longDescription: isEn
        ? 'Full-stack web application built with Django using MVC/MTV design patterns. Includes secure authentication, role-based access control (RBAC), efficient query pagination, and responsive UI.'
        : 'Aplicação web completa desenvolvida com Django utilizando boas práticas de modelagem MVC/MTV. Contém módulos de autenticação segura, autorização baseada em papéis (RBAC), paginação eficiente de queries e interfaces limpas e responsivas.',
      category: 'backend',
      badge: 'FULLSTACK_DJANGO',
      githubUrl: 'https://github.com/Max-Augusto/Taskmanager-django',
      tags: ['Python', 'Django', 'PostgreSQL', 'Auth & Permissions', 'Tailwind CSS'],
      metrics: isEn ? ['Role Based Access', 'MTV Architecture', 'Full CRUD'] : ['Role Based Access', 'Arquitetura MTV', 'CRUD Completo'],
      status: 'completed',
      featured: true,
    },
    {
      id: 'image-compressor',
      title: 'Image Compressor Desktop',
      subtitle: isEn ? 'Smart Compression & Automation with Python and Pillow' : 'Compressão Inteligente & Automação com Python e Pillow',
      description: isEn
        ? 'Desktop application with GUI (Tkinter) for smart image optimization and compression across JPEG, PNG, and WebP formats.'
        : 'Aplicativo desktop com interface gráfica (Tkinter) para otimização e compressão inteligente de imagens nos formatos JPEG, PNG e WebP.',
      longDescription: isEn
        ? 'Python desktop application utilizing Pillow and Tkinter GUI. Allows setting size limits in KB/MB, with an iterative algorithm for automatic quality adjustment and proportional resizing. Includes EXIF orientation correction and automatic transparency conversion.'
        : 'Aplicativo desktop em Python utilizando a biblioteca Pillow e interface gráfica Tkinter. Permite definir limites de tamanho em KB ou MB, com algoritmo iterativo de ajuste automático de qualidade e redimensionamento proporcional. Inclui correção de orientação EXIF, conversão inteligente de transparências para JPEG e modo automático de seleção de formato.',
      category: 'backend',
      badge: 'PYTHON_DESKTOP_TOOL',
      githubUrl: 'https://github.com/Max-Augusto/Compressor_imagens',
      tags: ['Python', 'Pillow (PIL)', 'Tkinter', 'Image Processing', 'GUI Desktop', 'Automação'],
      metrics: isEn ? ['EXIF Correction', 'Auto Mode', 'JPEG/PNG/WebP'] : ['Ajuste EXIF', 'Modo Automático', 'Suporte JPEG/PNG/WebP'],
      status: 'featured',
      featured: true,
    },
    {
      id: 'coin-change-dp',
      title: 'Dynamic Programming — Coin Change',
      subtitle: isEn ? 'Algorithmic Optimization in Python' : 'Otimização Algorítmica em Python',
      description: isEn
        ? 'Optimized implementation of the Minimum Coin Change problem overcoming greedy algorithm pitfalls via Dynamic Programming.'
        : 'Implementação otimizada do problema do Troco Mínimo superando falhas de algoritmos gulosos através de Programação Dinâmica.',
      longDescription: isEn
        ? 'Deep study and practical implementation of Dynamic Programming algorithms. Calculates the minimum number of coins for any arbitrary denomination set, ensuring optimal O(n*amount) time complexity and minimal space.'
        : 'Estudo aprofundado e implementação prática de estruturas de dados e algoritmos de Programação Dinâmica. O algoritmo calcula de maneira ótima a quantidade mínima de moedas para qualquer conjunto arbitrário de denominações, demonstrando controle de complexidade de tempo O(n*amount) e espaço otimizado.',
      category: 'algorithms',
      badge: 'ALGORITHMIC_CORE',
      githubUrl: 'https://github.com/Max-Augusto/dynamic-programming-coin-change',
      tags: ['Python', 'Dynamic Programming', 'Algoritmos', 'Complexidade O(n)', 'Otimização'],
      metrics: isEn ? ['O(n) Complexity', 'Guaranteed Optimal', 'Clean Code'] : ['Complexidade O(n)', 'Solução Ótima Garantida', 'Clean Code'],
      status: 'completed',
      featured: false,
    },
    {
      id: 'grafos-python',
      title: isEn ? 'Graph Data Structures & Algorithms' : 'Estruturas de Dados em Grafos',
      subtitle: isEn ? 'Connectivity & Shortest Path Algorithms' : 'Algoritmos de Conectividade & Caminhos Mínimos',
      description: isEn
        ? 'Graph structures and algorithms in Python for solving shortest path, adjacency matrices, and network mesh connectivity.'
        : 'Estruturas e algoritmos de grafos em Python para resolução de caminhos mínimos, matrizes de adjacência e conectividade de malhas de rede.',
      longDescription: isEn
        ? 'Directed and undirected graph implementation module in Python. Implements core algorithms like BFS, DFS, Dijkstra, and cycle detection, with direct applicability to network topologies and routing.'
        : 'Módulo de implementação de grafos direcionados e não-direcionados em Python. Implementa algoritmos fundamentais como BFS, DFS, Dijkstra e verificação de ciclos, com aplicabilidade direta em topologias e roteamento de redes.',
      category: 'algorithms',
      badge: 'NETWORKS_ALGO',
      githubUrl: 'https://github.com/Max-Augusto/Grafos',
      tags: ['Python', 'Grafos', 'Dijkstra', 'BFS / DFS', 'Redes de Computadores'],
      metrics: isEn ? ['Network Routing', 'Complexity Analysis', 'Core Algorithms'] : ['Roteamento de Redes', 'Análise de Complexidade', 'Algoritmos Fundamentais'],
      status: 'completed',
      featured: false,
    },
  ];
};

export const getSkillCategories = (lang: Language): SkillCategory[] => {
  const isEn = lang === 'en';
  return [
    {
      title: isEn ? 'Backend & Systems Architecture' : 'Arquitetura Backend & Sistemas',
      icon: 'Code2',
      skills: [
        { 
          name: 'Python & Django / Django REST', 
          level: isEn ? 'Advanced / Production' : 'Avançado / Produção', 
          description: isEn 
            ? 'MTV/MVC patterns, advanced ORM, authentication, custom middlewares, and Mercado Pago webhooks.' 
            : 'Arquiteturas MTV/MVC, ORM avançado, autenticação, middlewares e Webhooks Mercado Pago.', 
          tags: ['Python', 'Django', 'ORM', 'Webhooks'] 
        },
        { 
          name: 'FastAPI', 
          level: isEn ? 'Advanced' : 'Avançado', 
          description: isEn 
            ? 'Building high-throughput asynchronous microservices with typing, Pydantic, and OpenAPI.' 
            : 'Construção de microserviços assíncronos de alta performance com tipagem e OpenAPI.', 
          tags: ['FastAPI', 'AsyncIO', 'Microservices', 'Pydantic'] 
        },
        { 
          name: 'C# & .NET 10 Web APIs', 
          level: isEn ? 'Intermediate / Advanced' : 'Intermediário / Avançado', 
          description: isEn 
            ? 'Clean architecture, Entity Framework Core, dependency injection, and enterprise web APIs.' 
            : 'Clean architecture, Entity Framework Core, injeção de dependências e APIs corporativas.', 
          tags: ['C#', '.NET 10', 'EF Core', 'Web API'] 
        },
        { 
          name: 'PostgreSQL & Relational DBs', 
          level: isEn ? 'Advanced' : 'Avançado', 
          description: isEn 
            ? 'High-integrity relational modeling, ACID transactions, financial ledger consistency, and indexes.' 
            : 'Modelagem relacional de alta integridade, ACID, transações financeiras e índices.', 
          tags: ['PostgreSQL', 'SQL', 'EF Core', 'Migrations'] 
        },
      ],
    },
    {
      title: isEn ? 'Enterprise Infrastructure & Networks' : 'Infraestrutura Corporativa & Redes',
      icon: 'Network',
      skills: [
        { 
          name: 'LAN Networking & Switching L2/L3', 
          level: isEn ? 'Advanced' : 'Avançado', 
          description: isEn 
            ? 'Corporate connectivity diagnosis, switches, routers, VLANs, TCP/IP subnetting, and DHCP.' 
            : 'Diagnóstico de conectividade corporativa, switches, roteadores, VLANs, TCP/IP e DHCP.', 
          tags: ['L2/L3', 'VLAN', 'TCP/IP', 'Routing'] 
        },
        { 
          name: 'Linux & Windows Server', 
          level: isEn ? 'Advanced' : 'Avançado', 
          description: isEn 
            ? 'Server administration, Bash shell scripts, essential network services, and performance troubleshooting.' 
            : 'Administração de servidores, scripts em Bash, serviços de rede e diagnóstico de performance.', 
          tags: ['Linux', 'Windows Server', 'Bash', 'SysAdmin'] 
        },
        { 
          name: 'ITIL Framework v4 & Tier 2 Management', 
          level: isEn ? 'Solid / Applied' : 'Sólido / Prático', 
          description: isEn 
            ? 'Enterprise incident management workflows, strict SLA compliance, and standard operating procedures (SOPs).' 
            : 'Processos de gerenciamento de incidentes corporativos, conformidade com SLAs rígidos e SOPs.', 
          tags: ['ITIL v4', 'SLA', 'Incident Mgmt', 'SOP'] 
        },
        { 
          name: isEn ? 'Critical Environments (Aviation)' : 'Ambientes Críticos (Aviação)', 
          level: isEn ? 'Applied / Active' : 'Prático / Ativo', 
          description: isEn 
            ? 'Support at Positivo S+ (Pampulha Airport) ensuring 99.9% uptime, stability, and quick recovery.' 
            : 'Sustentação na Positivo S+ (Aeroporto/Aviação) com foco em 99.9% de uptime e estabilidade.', 
          tags: ['Mission-Critical', 'Aviação', 'N2 Support'] 
        },
      ],
    },
    {
      title: isEn ? 'CI/CD, Cloud & Security' : 'CI/CD, Nuvem & Segurança',
      icon: 'CloudLightning',
      skills: [
        { 
          name: 'Docker & Docker Compose', 
          level: isEn ? 'Applied / Advanced' : 'Prático / Avançado', 
          description: isEn 
            ? 'Microservices containerization, environment isolation, and local/cloud orchestration.' 
            : 'Containerização de microserviços, isolamento de ambientes e orquestração local/nuvem.', 
          tags: ['Docker', 'Containers', 'Docker Compose'] 
        },
        { 
          name: 'Railway, AWS & GitHub Actions', 
          level: isEn ? 'Production' : 'Produção', 
          description: isEn 
            ? 'Automated CI/CD pipelines, continuous deployment, container registry, and cloud hosting.' 
            : 'Pipelines automatizadas de CI/CD, deploy contínuo, orquestração e cloud hosting.', 
          tags: ['Railway', 'AWS', 'GitHub Actions', 'CI/CD'] 
        },
        { 
          name: isEn ? 'DNS & Deliverability (SPF/DKIM)' : 'DNS & Entregabilidade (SPF/DKIM)', 
          level: isEn ? 'Specialist' : 'Especialista', 
          description: isEn 
            ? 'DNS records configuration, SPF, DKIM, DMARC, and transactional email infrastructure (Resend/Anymail).' 
            : 'Configuração de registros DNS, SPF, DKIM e mensageria transacional (Resend/Anymail).', 
          tags: ['DNS', 'SPF', 'DKIM', 'Resend'] 
        },
        { 
          name: 'Cybersecurity & Auth (Auth0/Clerk)', 
          level: isEn ? 'Cisco Certified' : 'Cisco Certificado', 
          description: isEn 
            ? 'Network security fundamentals (Cisco), OAuth/JWT authentication flows, Auth0, Clerk, and secrets vault.' 
            : 'Fundamentos de segurança de redes (Cisco), autenticação OAuth/JWT, Auth0 e Clerk.', 
          tags: ['Cybersecurity', 'Auth0', 'Clerk', 'Secrets'] 
        },
      ],
    },
  ];
};

export const getTerminalCommandsHelp = (lang: Language) => {
  const isEn = lang === 'en';
  return [
    { cmd: 'help', desc: isEn ? 'Displays the list of all available commands' : 'Exibe a lista de todos os comandos disponíveis no console' },
    { cmd: 'about', desc: isEn ? 'Presents Max Augusto\'s biography and engineering focus' : 'Apresenta a biografia e foco profissional de Max Augusto' },
    { cmd: 'skills', desc: isEn ? 'Lists technical skills (Python, Django, FastAPI, .NET 10, Networks, Cloud)' : 'Lista as competências técnicas (.NET 10, Python, FastAPI, Redes, Cloud)' },
    { cmd: 'projects', desc: isEn ? 'Shows key projects (Betim Express SaaS, QR Microservice, etc.)' : 'Exibe projetos (Betim Express, QR Microservice, etc.)' },
    { cmd: 'exp', desc: isEn ? 'Shows professional work history (Positivo S+ Airport, Betim Express)' : 'Mostra o histórico de experiências profissionais (Positivo S+, Betim Express)' },
    { cmd: 'topology', desc: isEn ? 'Opens the interactive network topology lab & Tier 2 diagnostics' : 'Abre o laboratório de topologia de rede e diagnóstico N2' },
    { cmd: 'matrix', desc: isEn ? 'Toggles Hacker Matrix visual mode on the terminal' : 'Ativa / desativa o modo visual Hacker Matrix no terminal' },
    { cmd: 'theme <color>', desc: isEn ? 'Changes visual accent color (blue, cyan, amber, rose)' : 'Altera o tema visual (blue, cyan, amber, rose)' },
    { cmd: 'mode', desc: isEn ? 'Toggles Light / Dark mode' : 'Alterna entre Modo Claro e Modo Escuro' },
    { cmd: 'lang <pt|en>', desc: isEn ? 'Switches portfolio language (pt or en)' : 'Altera o idioma do portfólio (pt ou en)' },
    { cmd: 'contact', desc: isEn ? 'Shows direct contact channels (Email, LinkedIn, WhatsApp)' : 'Mostra os canais de contato direto (E-mail, LinkedIn, WhatsApp)' },
    { cmd: 'sysinfo', desc: isEn ? 'Displays system status, commit telemetry, and host metrics' : 'Exibe status do sistema, telemetria de commits e métricas do host' },
    { cmd: 'stats', desc: isEn ? 'Displays GitHub telemetry (Contributions, Languages, Productivity)' : 'Exibe telemetria do GitHub (Contributions, Linguagens, Produtividade)' },
    { cmd: 'ping', desc: isEn ? 'Tests connection latency with the Betim / Pampulha cluster' : 'Testa a latência da conexão com o cluster de Betim / Pampulha' },
    { cmd: 'curl saas', desc: isEn ? 'Executes simulated API request to Betim Express' : 'Executa requisição simulada à API do Betim Express' },
    { cmd: 'cat cv', desc: isEn ? 'Outputs structured resume in the terminal' : 'Gera o resumo estruturado do currículo para visualização' },
    { cmd: 'clear', desc: isEn ? 'Clears the terminal log history' : 'Limpa o histórico de logs do terminal' },
  ];
};
