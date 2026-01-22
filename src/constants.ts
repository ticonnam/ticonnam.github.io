import { Project, SkillData, Experience } from './types';

// Imports for Case Study Assets
import ytThumb from "../public/youtubeshuffle.jpg";
import bakeryThumb from "../public/diabeticbakery.jpg";
import crunchyThumb from "../public/crunchyroll.jpg";
import ytCase from "../public/yt-music-case-study.jpg";
import bakeryCase from "../public/diabetic-bakery-case-study.jpg";
import crunchyCase from "../public/crunchyroll-case-study.jpg";

export const HERO_TITLE = "Designing for the Future, One Pixel at a Time";
export const HERO_SUBTITLE = "Hi, I'm Ticonna. A Junior UX Designer transforming complex problems into intuitive, user-friendly designs.";

export const PROJECTS: Project[] = [
  {
    id: 'yt-music',
    title: 'YouTube Music Shuffle',
    description: 'Added a "Shuffle All" feature to the library to improve user control and reduce friction when starting a music session.',
    thumbnail: 'youtubeshuffle.jpg', // Use the imported variable, no quotes or slashes needed
    caseStudy: 'yt-music-case-study.jpg',
    gallery: ['youtubeshuffle.jpg', 'yt-music-case-study.jpg',],
    tags: ['UX Research', 'Feature Addition', 'Mobile Design'],
    stats: [{ label: 'Core Focus', value: 'User Control' }]
  },
  {
    id: 'diabetic-bakery',
    title: 'Diabetic-Safe Bakery',
    description: 'An inclusive e-commerce experience designed to help users with dietary restrictions find safe treats with zero friction.',
    thumbnail: 'diabeticbakery.jpg',
    caseStudy: 'diabetic-bakery-case-study.jpg',
    gallery: ['diabeticbakery.jpg', 'diabetic-bakery-case-study.jpg',],
    tags: ['Accessibility', 'E-commerce', 'Inclusivity'],
    stats: [{ label: 'Accessibility', value: 'AA Compliant' }]
  },
  {
    id: 'crunchyroll',
    title: 'Crunchyroll Redesign',
    description: 'Personalized the homepage to reduce endless scrolling and prioritize content based on individual viewing history.',
    thumbnail: 'crunchyroll.jpg',
    caseStudy: 'crunchyroll-case-study.jpg',
    gallery: ['crunchyroll.jpg', 'crunchyroll-case-study.jpg',],
    tags: ['Personalization', 'Information Architecture', 'Streaming UI'],
    stats: [{ label: 'Scroll Time', value: '-40% Reduction' }]
  }
];

export const SKILLS_DATA: SkillData[] = [
  { subject: 'User Empathy', A: 95, fullMark: 100 },
  { subject: 'Accessibility', A: 95, fullMark: 100 }, // Highlighted as her specialty
  { subject: 'Figma', A: 90, fullMark: 100 },
  { subject: 'User Research', A: 85, fullMark: 100 },
  { subject: 'Prototyping', A: 85, fullMark: 100 },
  { subject: 'Visual Design', A: 80, fullMark: 100 },
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "UX/UI Design Mastery Certificate",
    company: "UX Peak",
    period: "2024 - 2025",
    description: "Rigorous training on industry-standard tools and visual design principles, resulting in 3 comprehensive case studies."
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are 'Aloy', the virtual assistant for Ticonna Mckinney, a Junior UX Designer. 
Your goal is to showcase her ability to solve real-world problems and highlight her Google UX Design Professional Certificate.

Ticonna's Projects:
1. YouTube Music Shuffle: Added feature for better user control.
2. Diabetic-Safe Bakery: Focused on accessibility and dietary inclusivity.
3. Crunchyroll Redesign: Reduced scroll fatigue through personalization.

Tone: Professional, empathetic, and user-centric. 
Contact: ticonnam@gmail.com
`;