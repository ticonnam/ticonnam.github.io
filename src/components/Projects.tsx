import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight } from 'lucide-react';

// --- Simplified High-Performance Gallery ---
const ProjectGallery = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          // PERF: Fixed position outside the card flow prevents layout shift lag
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
        >
          <div className="relative w-full max-w-6xl h-full flex flex-col bg-[#050505] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">

            {/* Minimal Header */}
            <div className="p-6 flex justify-between items-center border-b border-white/5">
              <h3 className="text-white font-bold">{project.title}</h3>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 hover:text-white transition-colors">
                  {isZoomed ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
                </button>
                <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white">
                  <X size={20}/>
                </button>
              </div>
            </div>

            {/* Artifact Container */}
            <div className={`flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
              <img
                src={project.images[index]}
                alt="Case Study Detail"
                className={`rounded-lg transition-all duration-300 shadow-2xl ${isZoomed ? 'w-full' : 'max-h-[75vh] object-contain'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {project.images.length > 1 && (
                <div className="flex gap-8 py-10">
                  <button onClick={() => setIndex((prev) => (prev - 1 + project.images.length) % project.images.length)} className="text-white/40 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                    <ChevronLeft size={16}/> Prev
                  </button>
                  <button onClick={() => setIndex((prev) => (prev + 1) % project.images.length)} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                    Next <ChevronRight size={16}/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const projects = [
  { title: "YouTube Music Shuffle", images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"], tech: ["UX", "Accessibility"] },
  { title: "Diabetic-Safe Bakery", images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"], tech: ["UI", "WCAG 2.1"] },
  { title: "Crunchyroll Redesign", images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"], tech: ["IA", "Research"] }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | any>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4 italic">Case Studies.</h2>
        <div className="h-1 w-12 bg-indigo-500 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelected(p)}
            className="group cursor-pointer space-y-6 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.05] transition-all duration-300"
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={p.images[0]}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{p.title}</h3>
              <div className="flex gap-2 mt-3">
                {p.tech.map(t => <span key={t} className="text-[9px] uppercase tracking-tighter text-indigo-400 border border-indigo-400/20 px-2 py-0.5 rounded-full">{t}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ProjectGallery project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;