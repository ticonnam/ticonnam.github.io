import { Project, SkillData, Experience } from './types';

// HERO TEXT
export const HERO_TITLE = "Designing for the Future, One Pixel at a Time";
export const HERO_SUBTITLE = "Hi, I'm Ticonna. A Junior UX Designer transforming complex problems into intuitive, user-friendly designs.";

// PROJECTS DATA
export const PROJECTS: Project[] = [
  {
    id: 'yt-music',
    title: 'YouTube Music Shuffle',
    description: 'Added a "Shuffle All" feature to the library to improve user control and reduce friction when starting a music session.',
    thumbnail: 'youtube_thumbnail.jpg',
    caseStudy: 'youtube_music_shuffle_case_study.pdf',
    gallery: ['youtube_thumbnail.jpg', 'youtube_wireframe.jpg'],
    tags: ['UX Research', 'Feature Addition', 'Mobile Design'],
    stats: [{ label: 'Core Focus', value: 'User Control' }]
  },
  {
    id: 'diabetic-bakery',
    title: 'Diabetic-Safe Bakery',
    description: 'An inclusive e-commerce experience designed to help users with dietary restrictions find safe treats with zero friction.',
    thumbnail: 'diabetic_bakery_thumbnail.jpg',
    caseStudy: 'diabetic_bakery_case_study.pdf',
    gallery: ['diabetic_bakery_thumbnail.jpg', 'diabetic_bakery_wireframe.jpg'],
    tags: ['Accessibility', 'E-commerce', 'Inclusivity'],
    stats: [{ label: 'Accessibility', value: 'AA Compliant' }]
  },
  {
    id: 'crunchyroll',
    title: 'Crunchyroll Redesign',
    description: 'Personalized the homepage to reduce endless scrolling and prioritize content based on individual viewing history.',
    thumbnail: 'crunchyroll_redesign_thumbnail.jpg',
    caseStudy: 'crunchyroll_homepage_redesign_case_study.pdf',
    gallery: ['crunchyroll_redesign_thumbnail.jpg', 'crunchyroll_wireframe.jpg'],
    tags: ['Personalization', 'Information Architecture', 'Streaming UI'],
    stats: [{ label: 'Scroll Time', value: '-40% Reduction' }]
  }
];

// SKILLS DATA
export const SKILLS_DATA: SkillData[] = [
  { subject: 'User Empathy', A: 95, fullMark: 100 },
  { subject: 'Accessibility', A: 95, fullMark: 100 },
  { subject: 'Figma', A: 90, fullMark: 100 },
  { subject: 'User Research', A: 85, fullMark: 100 },
  { subject: 'Prototyping', A: 85, fullMark: 100 },
  { subject: 'Visual Design', A: 80, fullMark: 100 },
];

// EXPERIENCE DATA - Explicitly exported to fix SyntaxError
export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "UX/UI Design Mastery Certificate",
    company: "UX Peak",
    period: "2024 - 2025",
    description: "Rigorous training on industry-standard tools and visual design principles, resulting in 3 comprehensive case studies."
  }
];

// AIRA SYSTEM INSTRUCTIONS
export const AI_SYSTEM_INSTRUCTION = `
  You are 'Aloy', the specialized AI Assistant for Ticonna Mckinney's UX Design Portfolio.
  Ticonna is a Junior UX Designer based in Oak Park, IL, and holds a UX/UI Design Mastery Certificate by UXPeak.

  CORE KNOWLEDGE:
  1. YouTube Music Shuffle: Improved feature visibility for "Shuffle All" in the library.
  2. Diabetic-Safe Bakery: Created an inclusive, anxiety-free shopping experience for diabetics.
  3. Crunchyroll Redesign: Used personalization to reduce excessive scrolling.

  PORTFOLIO UPDATES:
  - Explicitly mention that "Full PDF Case Studies" are now available for download on each project card for deep-dives into research.
  - If users ask for her process, mention the multi-image scroll showing both her thumbnails and wireframes.

  Tone: Professional, empathetic, and user-centric. 
  Contact: ticonnam@gmail.com
`;