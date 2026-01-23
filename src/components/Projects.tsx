import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

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

  return (
    <div className="py-24 px-6 max-w-5xl mx-auto min-h-screen">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white italic">Case Studies.</h2>
      </div>

      <div className="space-y-4">
        {projects.map((p, i) => (
          <div key={i} className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02]">
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-8 text-left hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-indigo-500 font-mono text-xs">0{i + 1}</span>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
              </div>
              <ChevronDown className={`transition-transform ${expandedIndex === i ? 'rotate-180 text-indigo-400' : 'text-white/20'}`} />
            </button>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-12 border-t border-white/5 pt-8"
                >
                  <p className="text-white/60 mb-8">{p.description}</p>
                  <div className="flex gap-4 overflow-x-auto pb-4">
                    {p.images.map((img, idx) => (
                      <img key={idx} src={img} className="h-64 rounded-xl shadow-lg" loading="lazy" />
                    ))}
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

export default Projects;// deployment-fix
