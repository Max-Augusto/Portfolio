export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  badge: string;
  status: 'active' | 'completed';
  highlights: string[];
  technologies: string[];
  slaMetrics?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  category: 'saas' | 'backend' | 'algorithms' | 'infra';
  badge: string;
  stars?: number;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
  metrics: string[];
  status: 'production' | 'featured' | 'completed';
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: {
    name: string;
    level: string;
    description: string;
    tags: string[];
  }[];
}

export interface WhatIDoItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badge: string;
  tags: string[];
  specs: string[];
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system' | 'info';
  text: string;
  timestamp: string;
}
