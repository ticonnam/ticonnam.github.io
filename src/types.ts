export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail: string;    // Add this
  caseStudy: string;    // Add this
  tags: string[];
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum SectionId {
  HERO = 'hero',
  WORK = 'work',      // Add this if you want to use SectionId.WORK
  PORTFOLIO = 'portfolio',
  ABOUT = 'about',
  CONTACT = 'contact'
}