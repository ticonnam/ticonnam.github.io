import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Sub-Component: 90% Zoom Gallery ---
const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const next = () => { setIndex((prev) => (prev + 1) % images.length); setIsZoomed(false); };
  const prev = () => { setIndex((prev) => (prev - 1 + images.length) % images.length); setIsZoomed(false); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden transition-colors duration-500 ${
            isHighContrast ? 'bg-black' : 'bg-[#030303]/98 backdrop-blur-3xl'
          }`}
        >
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[510]">
             <div className="flex items-center gap-6">
                <span className="text-white/40 font-mono text-xs">{index + 1} / {images.length}</span>
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all ${isHighContrast ? 'text-indigo-400' : 'text-white/40 hover:text-white'}`}
                >
                  <Contrast size={14} /> {isHighContrast ? 'Contrast: ON' : 'Contrast: OFF'}
                </button>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={() => setIsZoomed(!isZoomed)} className="p-3 bg-white/5 hover:bg-white/10 text-indigo-400 rounded-full border border-white/10">
                  {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10"><X size={20} /></button>
             </div>
          </div>

          <div className={`w-full h-full flex flex-col items-center ${isZoomed ? 'overflow-y-auto pt-32 pb-20' : 'justify-center'}`}>
            {!isZoomed && (
              <>
                <button onClick={prev} className="fixed left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]"><ChevronLeft size={60} strokeWidth={1} /></button>
                <button onClick={next} className="fixed right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]"><ChevronRight size={60} strokeWidth={1} /></button>
              </>
            )}
            <motion.div
              animate={{ scale: isZoomed ? 0.9 : 1 }}
              className={`flex items-center justify-center transition-all ${isZoomed ? 'w-full' : 'max-h-[85vh]'}`}
            >
              <img src={images[index]} alt="UX Artifact" className={`rounded-xl shadow-2xl ${isZoomed ? 'w-[90%] h-auto' : 'max-h-[80vh] object-contain'}`} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Project Data ---
const projects = [
  {
    title: "YouTube Music Shuffle",
    tagline: "Accessibility & User Control",
    description: "Redesigning the library interface to solve the 'hidden' shuffle-all pain point identified through user research.",
    tech: ["UX Research", "Accessibility"],
    images: ["/youtubeshuffle.jpg", "/yt-music-case-study.jpg"],
    gradient: "from-red-500/20 to-transparent"
  },
  {
    title: "Diabetic-Safe Bakery",
    tagline: "Inclusive E-Commerce",
    description: "Designing a WCAG-compliant ordering system focused on users with specialized dietary needs.",
    tech: ["UI Design", "WCAG 2.1"],
    images: ["/diabeticbakery.jpg", "/diabetic-bakery-case-study.jpg"],
    gradient: "from-emerald-500/20 to-transparent"
  },
  {
    title: "Crunchyroll Redesign",
    tagline: "Personalized Discovery",
    description: "Streamlining the home-to-playback journey to eliminate irrelevant content and reduce scroll fatigue.",
    tech: ["Information Architecture", "Figma"],
    images: ["/crunchyroll.jpg", "/crunchyroll-case-study.jpg"],
    gradient: "from-orange-500/20 to-transparent"
  }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | typeof projects[0]>(null);

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-24">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-none">WORK<span className="text-indigo-500">.</span></h2>
        <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
          Case studies built on the principles of the Google UX Design Professional Certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`group relative bg-white/5 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

            <div className="mb-8 aspect-video rounded-2xl bg-slate-900 overflow-hidden relative z-10">
              <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
              <button
                onClick={() => setSelected(project)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-all"
              >
                <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                  <ZoomIn size={16} /> View Study
                </div>
              </button>
            </div>

            <div className="relative z-10">
              <p className="text-indigo-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-2">{project.tagline}</p>
              <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
              <p className="text-white/40 text-sm mb-8 font-light line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-white/60 uppercase tracking-tighter border border-white/10">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectGallery images={selected?.images || []} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;