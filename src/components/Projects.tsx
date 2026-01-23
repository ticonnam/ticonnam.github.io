import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, BookOpen, Target, Lightbulb } from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem: "Users struggled to find the shuffle feature within the complex library navigation.",
      solution: "Implemented a high-visibility 'Shuffle All' trigger at the top level of the library view.",
      impact: "Reduced interaction steps from 4 clicks down to 1."
    },
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem: "People with dietary restrictions often lack clear nutritional labeling during checkout.",
      solution: "Created an end-to-end e-commerce flow with mandatory, high-contrast glycemic indicators.",
      impact: "Increased user confidence ratings during prototype testing by 40%."
    },
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem: "Information overload caused high bounce rates on the anime discovery page.",
      solution: "Simplified the IA by categorizing shows into 'Mood-Based' tiers and reducing redundant imagery.",
      impact: "Streamlined the average user journey to 'Start Watching' by 15 seconds."
    },
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
          <div key={i} className="border border-white/10 rounded-3xl overflow-hidden bg-white/[0.02] transition-all duration-300">
            <button
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              className="w-full flex items-center justify-between p-8 text-left hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex items-center gap-6">
                <span className="text-indigo-500 font-mono text-xs">0{i + 1}</span>
                <h3 className="text-xl font-bold text-white">{p.title}</h3>
              </div>
              <ChevronDown className={`transition-transform duration-300 ${expandedIndex === i ? 'rotate-180 text-indigo-400' : 'text-white/20'}`} />
            </button>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="px-8 pb-12 border-t border-white/5 pt-8"
                >
                  {/* README Section */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-indigo-400 mb-3 font-bold text-[10px] uppercase tracking-widest">
                        <Target size={14} /> The Problem
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{p.readme.problem}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-indigo-400 mb-3 font-bold text-[10px] uppercase tracking-widest">
                        <Lightbulb size={14} /> The Solution
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{p.readme.solution}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-2 text-indigo-400 mb-3 font-bold text-[10px] uppercase tracking-widest">
                        <BookOpen size={14} /> The Result
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{p.readme.impact}</p>
                    </div>
                  </div>

                  {/* Artifacts Gallery */}
                  <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                    {p.images.map((img, idx) => (
                      <img key={idx} src={img} className="h-80 rounded-xl shadow-2xl border border-white/10" loading="lazy" alt={`${p.title} artifact`} />
                    ))}
                  </div>

                  <div className="mt-8 flex justify-end">
                    <button className="text-white/40 hover:text-indigo-400 flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors">
                      View Full PDF <ExternalLink size={14} />
                    </button>
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