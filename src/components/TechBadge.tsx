import React from 'react';
import { 
  Code2, 
  Terminal, 
  Server, 
  Database, 
  Network, 
  ShieldCheck, 
  Cloud, 
  Layers, 
  Cpu, 
  Box, 
  FileCode2, 
  Globe, 
  Lock, 
  Workflow, 
  Zap,
  HardDrive,
  Laptop
} from 'lucide-react';

interface TechBadgeProps {
  tech: string;
  size?: 'sm' | 'md';
  variant?: 'shield' | 'lucide' | 'minimal';
  showShield?: boolean;
}

// Map tech name to specific Lucide Icon and official branding color / badge query
export const getTechMeta = (name: string) => {
  const normalized = name.toLowerCase().trim();

  // Python
  if (normalized.includes('python')) {
    return {
      icon: FileCode2,
      color: '#3776AB',
      badgeUrl: 'https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white',
      category: 'Language'
    };
  }

  // Django
  if (normalized.includes('django')) {
    return {
      icon: Server,
      color: '#092E20',
      badgeUrl: 'https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white',
      category: 'Framework'
    };
  }

  // FastAPI
  if (normalized.includes('fastapi')) {
    return {
      icon: Zap,
      color: '#009688',
      badgeUrl: 'https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white',
      category: 'Framework'
    };
  }

  // C# / .NET
  if (normalized.includes('c#') || normalized.includes('.net') || normalized.includes('dotnet')) {
    return {
      icon: Code2,
      color: '#512BD4',
      badgeUrl: 'https://img.shields.io/badge/.NET_10-512BD4?style=flat-square&logo=dotnet&logoColor=white',
      category: 'Framework'
    };
  }

  // PostgreSQL
  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return {
      icon: Database,
      color: '#4169E1',
      badgeUrl: 'https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white',
      category: 'Database'
    };
  }

  // Docker
  if (normalized.includes('docker')) {
    return {
      icon: Box,
      color: '#2496ED',
      badgeUrl: 'https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white',
      category: 'DevOps'
    };
  }

  // Linux
  if (normalized.includes('linux')) {
    return {
      icon: Terminal,
      color: '#FCC624',
      badgeUrl: 'https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black',
      category: 'OS'
    };
  }

  // Windows Server
  if (normalized.includes('windows')) {
    return {
      icon: Laptop,
      color: '#0078D6',
      badgeUrl: 'https://img.shields.io/badge/Windows_Server-0078D6?style=flat-square&logo=windows&logoColor=white',
      category: 'OS'
    };
  }

  // Railway
  if (normalized.includes('railway')) {
    return {
      icon: Cloud,
      color: '#0B0D0E',
      badgeUrl: 'https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white',
      category: 'Cloud'
    };
  }

  // AWS
  if (normalized.includes('aws')) {
    return {
      icon: Cloud,
      color: '#FF9900',
      badgeUrl: 'https://img.shields.io/badge/AWS-FF9900?style=flat-square&logo=amazon-aws&logoColor=white',
      category: 'Cloud'
    };
  }

  // Git & GitHub
  if (normalized.includes('git')) {
    return {
      icon: Workflow,
      color: '#F05032',
      badgeUrl: 'https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white',
      category: 'Tool'
    };
  }

  // Networking / L2/L3 / LAN
  if (normalized.includes('network') || normalized.includes('lan') || normalized.includes('l2/l3') || normalized.includes('switch') || normalized.includes('tcp/ip') || normalized.includes('vlan')) {
    return {
      icon: Network,
      color: '#10b981',
      badgeUrl: 'https://img.shields.io/badge/LAN_L2%2FL3-10B981?style=flat-square&logo=cisco&logoColor=white',
      category: 'Network'
    };
  }

  // Security / Cisco / Auth
  if (normalized.includes('cisco') || normalized.includes('security') || normalized.includes('auth')) {
    return {
      icon: ShieldCheck,
      color: '#1BA0D7',
      badgeUrl: 'https://img.shields.io/badge/Cisco_Security-1BA0D7?style=flat-square&logo=cisco&logoColor=white',
      category: 'Security'
    };
  }

  // Pillow / Image
  if (normalized.includes('pillow') || normalized.includes('pil') || normalized.includes('image')) {
    return {
      icon: Layers,
      color: '#F97316',
      badgeUrl: 'https://img.shields.io/badge/Pillow-F97316?style=flat-square&logo=python&logoColor=white',
      category: 'Library'
    };
  }

  // Tkinter / GUI
  if (normalized.includes('tkinter') || normalized.includes('gui')) {
    return {
      icon: Laptop,
      color: '#38BDF8',
      badgeUrl: 'https://img.shields.io/badge/Tkinter-38BDF8?style=flat-square&logo=python&logoColor=white',
      category: 'GUI'
    };
  }

  // Tailwind CSS
  if (normalized.includes('tailwind')) {
    return {
      icon: Globe,
      color: '#06B6D4',
      badgeUrl: 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white',
      category: 'CSS'
    };
  }

  // ITIL
  if (normalized.includes('itil')) {
    return {
      icon: ShieldCheck,
      color: '#10b981',
      badgeUrl: 'https://img.shields.io/badge/ITIL_v4-10B981?style=flat-square&logo=checkmarx&logoColor=white',
      category: 'Standard'
    };
  }

  // Default fallback
  return {
    icon: Cpu,
    color: '#94A3B8',
    badgeUrl: `https://img.shields.io/badge/${encodeURIComponent(name)}-1E293B?style=flat-square&logoColor=white`,
    category: 'Technology'
  };
};

export const TechBadge: React.FC<TechBadgeProps> = ({ 
  tech, 
  size = 'sm', 
  variant = 'shield',
  showShield = true 
}) => {
  const meta = getTechMeta(tech);
  const Icon = meta.icon;

  if (showShield) {
    return (
      <img 
        src={meta.badgeUrl} 
        alt={tech}
        className="inline-block rounded h-[20px] shadow-sm transition-transform hover:scale-105"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    );
  }

  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-2 py-0.5 gap-1.5' 
    : 'text-xs px-2.5 py-1 gap-2';

  return (
    <span 
      className={`inline-flex items-center font-mono rounded-md bg-slate-100 text-slate-700 border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-200/80 ${sizeClasses}`}
    >
      <Icon 
        className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} 
        style={{ color: meta.color }} 
      />
      <span className="font-medium">{tech}</span>
    </span>
  );
};
