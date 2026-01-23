import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Lightbulb, ZoomIn, X } from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem: "Users struggled to find the shuffle feature within the complex library navigation.",
      solution: "Implemented a high-visibility 'Shuffle All' trigger at the top level.",
      impact: "Reduced interaction steps from 4 clicks down to 1."
    },
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem: "Lack of clear nutritional labeling during checkout for dietary restrictions.",
      solution: "Created an e-commerce flow with mandatory high-contrast glycemic indicators.",
      impact: "Increased user confidence ratings during testing by 40%."
    },
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem: "Information overload caused high bounce rates on discovery pages.",
      solution: "Simplified IA by categorizing shows into mood-based tiers.",
      impact: "Streamlined the average user journey by 15 seconds."
    },
    images: ["/crunchyroll_redesign.jpg", "/crunchyroll_redesign_casestudy.jpg"],
    tech: ["IA", "User Testing"]
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<string | null>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 italic">Case Studies.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: expandedIndex === i ? 1.02 : 1 // Subtle "grow" effect
            }}
            className={`flex flex-col border border-white/10 rounded-[2rem] overflow-hidden transition-colors duration-500 ${
              expandedIndex === i ? 'bg-white/[0.08] border-indigo-500/40 shadow-[0_0_30px_rgba(79,70,229,0.15)]' : 'bg-white/[0.02]'
            }`}
          >
            <div className="p-8">
              <div className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5">
                <img src={p.images[0]} className="w-full h-full object-cover opacity-60" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map(t => (
                  <span key={t} className="text-[9px] uppercase tracking-tighter text-indigo-400 border border-indigo-400/20 px-2 py-0.5 rounded-full font-bold">{t}</span>
                ))}
              </div>
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-500/10 text-white/60 hover:text-indigo-400 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
              >
                {expandedIndex === i ? 'Hide Details' : 'See Research'}
                <ChevronDown className={`transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`} size={16} />
              </button>
            </div>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-8 border-t border-white/5 pt-6 bg-black/40"
                >
                  <div className="space-y-6">
                    <div>
                       <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-[10px] uppercase tracking-widest"><Target size={12}/> Problem</div>
                       <p className="text-white/50 text-xs leading-relaxed">{p.readme.problem}</p>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold text-[10px] uppercase tracking-widest"><Lightbulb size={12}/> Solution</div>
                       <p className="text-white/50 text-xs leading-relaxed">{p.readme.solution}</p>
                    </div>

                    <div className="pt-4">
                       <p className="text-[9px] text-white/20 uppercase tracking-widest font-bold mb-3">Click artifact to zoom</p>
                       <div className="flex gap-3 overflow-x-auto pb-4 custom-scrollbar">
                         {p.images.map((img, idx) => (
                           <div
                            key={idx}
                            onClick={() => setZoomImg(img)}
                            className="relative group min-w-[120px] h-20 rounded-lg overflow-hidden border border-white/10 cursor-zoom-in"
                           >
                             <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                             <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <ZoomIn size={14} className="text-white" />
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* --- God Tier Zoom Overlay --- */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-20"
            onClick={() => setZoomImg(null)}
          >
            <button className="absolute top-10 right-10 text-white/40 hover:text-white"><X size={32}/></button>
            <motion.img
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              src={zoomImg}
              className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;