import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Lightbulb, ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, MousePointer2, FileText } from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem: "Users struggled to find the shuffle feature within the complex library navigation.",
      solution: "Implemented a high-visibility 'Shuffle All' trigger at the top level of the library view.",
      impact: "Reduced interaction steps from 4 clicks down to 1."
    },
    images: ["/youtube_thumbnail.jpg", "/youtube_wireframe.jpg"],
    pdfLink: "/youtube_music_shuffle_case_study.pdf",
    tech: ["UX Research", "Visibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem: "People with dietary restrictions often lack clear nutritional labeling during checkout.",
      solution: "Created an e-commerce flow with mandatory, high-contrast glycemic indicators.",
      impact: "Increased user confidence ratings during prototype testing by 40%."
    },
    images: ["/diabetic_bakery_thumbnail.jpg", "/diabetic_bakery_wireframe.jpg"],
    pdfLink: "/diabetic_bakery_case_study.pdf",
    tech: ["Inclusive Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem: "Information overload caused high bounce rates on the anime discovery page.",
      solution: "Simplified IA by categorizing shows into mood-based tiers and reducing clutter.",
      impact: "Streamlined the average user journey to 'Start Watching' by 15 seconds."
    },
    images: ["/crunchyroll_redesign_thumbnail.jpg", "/crunchyroll_wireframe.jpg"],
    pdfLink: "/crunchyroll_homepage_redesign_case_study.pdf",
    tech: ["IA", "Personalization"]
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
      {/* Typography perfectly matched to Hero Section */}
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 italic text-center md:text-left">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Work.</span>
        </h2>
        <div className="h-1 w-20 bg-indigo-500 rounded-full mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            className={`flex flex-col border border-white/10 rounded-[3.5rem] overflow-hidden transition-all duration-700 shadow-2xl group ${
              expandedIndex === i ? 'bg-white/[0.08] border-indigo-500/40' : 'bg-white/[0.02]'
            }`}
          >
            <div className="p-10">
              <h3 className="text-3xl font-bold text-white mb-4 tracking-tight uppercase italic">{p.title}</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {p.tech.map(t => (
                  <span key={t} className="text-[10px] uppercase tracking-[0.25em] text-indigo-400 border border-indigo-400/30 px-4 py-1.5 rounded-full font-bold bg-indigo-500/10">{t}</span>
                ))}
              </div>

              {/* Multi-Image Scroll Area */}
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/60 h-[500px] relative mb-8 group/artifact">
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar scroll-smooth">
                  {p.images.map((img, idx) => (
                    <div key={idx} className="relative cursor-zoom-in" onClick={() => setZoomImg({ projectIdx: i, imgIdx: idx })}>
                      <img src={img} className="w-full h-auto object-top grayscale hover:grayscale-0 transition-all duration-700 border-b border-white/5 last:border-0" />
                      <div className="absolute inset-0 bg-indigo-500/20 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                         <Maximize2 size={32} className="text-white drop-shadow-2xl" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 flex items-center gap-2 pointer-events-none opacity-100 group-hover/artifact:opacity-0 transition-opacity">
                  <MousePointer2 className="text-indigo-400 animate-pulse" size={12} />
                  <span className="text-[9px] text-white font-bold uppercase tracking-widest">Scroll Process</span>
                </div>
              </div>

              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-indigo-500/10 text-white/60 hover:text-indigo-400 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest transition-all mb-4"
              >
                {expandedIndex === i ? 'Hide Brief' : 'Read Brief'}
                <ChevronDown className={`transition-transform duration-300 ${expandedIndex === i ? 'rotate-180' : ''}`} size={16} />
              </button>

              <AnimatePresence>
                {expandedIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="space-y-6 pb-4 overflow-hidden">
                    <div className="flex gap-4">
                      <Target className="text-indigo-500 shrink-0" size={20} />
                      <p className="text-white/60 text-xs leading-relaxed font-medium">{p.readme.problem}</p>
                    </div>
                    <div className="flex gap-4">
                      <Lightbulb className="text-indigo-500 shrink-0" size={20} />
                      <p className="text-white/60 text-xs leading-relaxed font-medium">{p.readme.solution}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View Full PDF Primary Action */}
            <div className="px-10 pb-10 mt-auto">
              <a href={p.pdfLink} target="_blank" rel="noopener noreferrer" className="w-full py-5 rounded-2xl bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] hover:bg-indigo-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 text-center">
                <FileText size={16} /> Full Case Study PDF
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 85% Locked Zoom Modal */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex items-center justify-center" onClick={() => setZoomImg(null)}>
            <button onClick={(e) => { e.stopPropagation(); setZoomImg(null); }} className="absolute top-10 right-10 text-white/40 hover:text-white p-4 z-[100001] cursor-pointer"><X size={40} strokeWidth={1.5} /></button>
            <button onClick={(e) => { e.stopPropagation(); const p = projects[zoomImg.projectIdx]; setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx - 1 + p.images.length) % p.images.length }); }} className="absolute left-8 p-4 text-white/20 hover:text-white z-[100001] cursor-pointer"><ChevronLeft size={60} strokeWidth={1}/></button>
            <button onClick={(e) => { e.stopPropagation(); const p = projects[zoomImg.projectIdx]; setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx + 1) % p.images.length }); }} className="absolute right-8 p-4 text-white/20 hover:text-white z-[100001] cursor-pointer"><ChevronRight size={60} strokeWidth={1}/></button>
            <motion.div key={zoomImg.imgIdx} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="w-[85vw] h-[85vh] flex items-center justify-center pointer-events-none" onClick={(e) => e.stopPropagation()}>
              <img src={projects[zoomImg.projectIdx].images[zoomImg.imgIdx]} className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 object-contain pointer-events-auto" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;