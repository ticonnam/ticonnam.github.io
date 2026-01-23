import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, ExternalLink, ZoomIn } from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    description: "Improving accessibility for the offline shuffle feature.",
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    description: "Designing an end-to-end accessible ordering system.",
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    description: "Streamlining discovery to reduce cognitive load.",
    images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"],
    tech: ["IA", "User Testing"]
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleProject = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-24 px-6 max-w-5xl mx-auto min-h-screen">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white italic">Case Studies.</h2>
        <p className="text-white/40 text-sm mt-4">Click a project to explore the full research and artifacts.</p>
      </div>

      <div className="space-y-6">
        {projects.map((p, i) => (
          <div
            key={i}
            className={`border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 ${
              expandedIndex === i ? 'bg-white/[0.05] border-indigo-500/30' : 'bg-white/[0.02] hover:bg-white/[0.04]'
            }`}
          >
            {/* Clickable Header */}
            <button
              onClick={() => toggleProject(i)}
              className="w-full flex items-center justify-between p-8 text-left"
            >
              <div className="flex items-center gap-6">
                <span className="text-indigo-500 font-mono text-xs">0{i + 1}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white">{p.title}</h3>
                <div className="hidden md:flex gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="text-[9px] uppercase tracking-tighter text-white/30 border border-white/10 px-2 py-0.5 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className={`p-2 rounded-full bg-white/5 transition-transform duration-300 ${expandedIndex === i ? 'rotate-180 text-indigo-400' : 'text-white/20'}`}>
                <ChevronDown size={20} />
              </div>
            </button>

            {/* Dropdown Content */}
            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <div className="px-8 pb-12 space-y-8 border-t border-white/5 pt-8">
                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-2xl">
                      {p.description}
                    </p>

                    {/* Horizontal Artifact Scroll */}
                    <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
                      {p.images.map((img, imgIdx) => (
                        <div key={imgIdx} className="min-w-[300px] md:min-w-[600px] aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/5 shadow-2xl">
                          <img
                            src={img}
                            alt={`${p.title} artifact ${imgIdx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end">
                       <button className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                          Download PDF Case Study <ExternalLink size={14} />
                       </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;