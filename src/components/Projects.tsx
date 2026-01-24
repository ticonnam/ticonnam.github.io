import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Lightbulb, ZoomIn, X, ChevronLeft, ChevronRight, BookOpen, Maximize2 } from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem: "Users struggled to find the shuffle feature within the complex library navigation.",
      solution: "Implemented a high-visibility 'Shuffle All' trigger at the top level of the library view.",
      impact: "Reduced interaction steps from 4 clicks down to 1."
    },
    images: ["/youtube_thumbnail.jpg", "/youtube_wireframe.jpg", "/public/youtube_music_shuffle_case_study.pdf"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem: "People with dietary restrictions often lack clear nutritional labeling during checkout.",
      solution: "Created an e-commerce flow with mandatory, high-contrast glycemic indicators.",
      impact: "Increased user confidence ratings during prototype testing by 40%."
    },
    images: ["/diabetic_bakery_thumbnail.jpg", "/diabetic_bakery_wireframe.jpg", "/public/diabetic_bakery_case_study.pdf"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem: "Information overload caused high bounce rates on the anime discovery page.",
      solution: "Simplified IA by categorizing shows into mood-based tiers and reducing clutter.",
      impact: "Streamlined the average user journey to 'Start Watching' by 15 seconds."
    },
    images: ["/crunchyroll_redesign_thumbnail.jpg","/crunchyroll_wireframe.jpg", "/public/crunchyroll_homepage_redesign_case_study.pdf"],
    tech: ["IA", "User Testing"]
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<{ projectIdx: number, imgIdx: number } | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!zoomImg) return;
      const currentProject = projects[zoomImg.projectIdx];
      if (e.key === 'ArrowRight') {
        setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx + 1) % currentProject.images.length });
      } else if (e.key === 'ArrowLeft') {
        setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx - 1 + currentProject.images.length) % currentProject.images.length });
      } else if (e.key === 'Escape') {
        setZoomImg(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomImg]);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 italic text-center md:text-left">Case <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Studies.</span></h2>
        <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            className={`flex flex-col border border-white/10 rounded-[2.5rem] overflow-hidden transition-colors duration-500 ${
              expandedIndex === i ? 'bg-white/[0.08] border-indigo-500/40' : 'bg-white/[0.02]'
            }`}
          >
            <div className="p-8">
              <div
                className="aspect-video rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5 relative group cursor-zoom-in"
                onClick={() => setZoomImg({ projectIdx: i, imgIdx: 0 })}
              >
                <img src={p.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Maximize2 size={24} className="text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{p.title}</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.tech.map(t => (
                  <span key={t} className="text-[10px] uppercase text-indigo-400 border border-indigo-400/20 px-3 py-1 rounded-full font-bold">{t}</span>
                ))}
              </div>
              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full py-4 rounded-xl bg-white/5 hover:bg-indigo-500/10 text-white/60 hover:text-indigo-400 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all"
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
                  className="px-8 pb-10 border-t border-white/5 pt-8 bg-black/40"
                >
                  <div className="space-y-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs">
                      <div className="flex items-center gap-2 text-indigo-400 mb-2 font-bold uppercase tracking-widest"><Target size={14}/> Problem</div>
                      <p className="text-white/50">{p.readme.problem}</p>
                    </div>

                    <div className="pt-4">
                       <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-4">Click below to zoom artifacts</p>
                       <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                         {p.images.map((img, idx) => (
                           <div
                            key={idx}
                            onClick={() => setZoomImg({ projectIdx: i, imgIdx: idx })}
                            className="relative group min-w-[180px] h-24 rounded-xl overflow-hidden border border-white/10 cursor-zoom-in flex-shrink-0"
                           >
                             <img src={img} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <ZoomIn size={18} className="text-white" />
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

      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setZoomImg(null)}
          >
            {/* Clickable X Button - Fixes the unclickable issue */}
            <button
              onClick={(e) => { e.stopPropagation(); setZoomImg(null); }}
              className="absolute top-10 right-10 text-white/40 hover:text-white transition-all p-4 z-[100001] cursor-pointer"
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            {/* Navigation Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const p = projects[zoomImg.projectIdx];
                setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx - 1 + p.images.length) % p.images.length });
              }}
              className="absolute left-8 p-4 text-white/20 hover:text-white z-[100001] cursor-pointer"
            >
              <ChevronLeft size={60} strokeWidth={1}/>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const p = projects[zoomImg.projectIdx];
                setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx + 1) % p.images.length });
              }}
              className="absolute right-8 p-4 text-white/20 hover:text-white z-[100001] cursor-pointer"
            >
              <ChevronRight size={60} strokeWidth={1}/>
            </button>

            {/* 85% Locked Viewport Scale */}
            <motion.div
              key={zoomImg.imgIdx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="w-[85vw] h-[85vh] flex items-center justify-center pointer-events-none"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={projects[zoomImg.projectIdx].images[zoomImg.imgIdx]}
                className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 object-contain pointer-events-auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;