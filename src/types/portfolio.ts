export type ProjectCategory = 'all' | 'event-driven' | 'fullstack' | 'systems';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'event-driven' | 'fullstack' | 'systems';
  description: string;
  technologies: string[];
  features: string[];
  architecture: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  visualizationType?: 'graph' | 'rabbitmq' | 'microservices' | 'network' | 'mobile';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
  featuredBadge?: string;
}

export interface SkillItem {
  name: string;
  highlight?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  iconName: string;
  skills: SkillItem[];
}

export interface Certification {
  id: string;
  institution: string;
  title: string;
  score: string;
  credentialUrl?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  currentStatus?: string;
}

export interface Language {
  name: string;
  level: string;
  flag: string;
}
