import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast, ArrowRight } from 'lucide-react';

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
            isHighContrast ? 'bg-black' : 'bg-[#030303]/95 backdrop-blur-2xl'
          }`}
        >
          {/* Controls Overlay */}
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

          {/* Main Artifact View */}
          <div className={`w-full h-full flex flex-col items-center ${isZoomed ? 'overflow-y-auto pt-32 pb-20' : 'justify-center'}`}>
            {!isZoomed && (
              <>
                <button onClick={prev} className="fixed left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]"><ChevronLeft size={60} strokeWidth={1} /></button>
                <button onClick={next} className="fixed right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]"><ChevronRight size={60} strokeWidth={1} /></button>
              </>
            )}
            <motion.div
              animate={{ scale: isZoomed ? 0.9 : 1 }}
              className={`flex items-center justify-center transition-all ${isZoomed ? 'w-full' : 'max-h-[80vh]'}`}
            >
              <img src={images[index]} alt="UX Artifact" className={`rounded-xl shadow-2xl ${isZoomed ? 'w-[90%] h-auto' : 'max-h-[75vh] object-contain'}`} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Projects Component ---
const projects = [
  {
    title: "YouTube Music Shuffle",
    role: "Lead UX Researcher & Designer",
    description: "Improving accessibility for the offline shuffle feature through iterative research and high-fidelity prototyping.",
    tech: ["UX Research", "Figma", "Accessibility"],
    images: ["youtubeshuffle.jpg", "yt-music-casestudy.jpg"],
  },
  {
    title: "Diabetic-Safe Bakery",
    role: "Product Designer",
    description: "Designing an end-to-end accessible ordering system focused on WCAG compliance for specialized dietary needs.",
    tech: ["UI Design", "WCAG 2.1", "Prototyping"],
    images: ["image_66818e.png"], // Add bakery artifacts here
  },
  {
    title: "Crunchyroll Redesign",
    role: "UX/UI Designer",
    description: "Streamlining information architecture to reduce cognitive load in the anime discovery journey.",
    tech: ["Information Architecture", "User Testing"],
    images: ["crunchyroll-1.png"], // Add crunchyroll artifacts here
  }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | typeof projects[0]>(null);

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-20">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">SELECTED<br/><span className="text-indigo-500">WORKS</span></h2>
        <p className="text-white/40 max-w-xl text-lg font-light leading-relaxed">
          Showcasing empathy-driven design solutions developed during the Google UX Design Professional Certificate program.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.08] transition-all duration-500"
          >
            <div className="mb-8 aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden relative">
              <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" />
              <button
                onClick={() => setSelected(project)}
                className="absolute inset-0 flex items-center justify-center bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-all"
              >
                <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-xl">
                  <ZoomIn size={16} /> Open Study
                </div>
              </button>
            </div>

            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-white/40 text-sm mb-6 font-light leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-indigo-400 uppercase tracking-tighter border border-white/10">{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectGallery
        images={selected?.images || []}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default Projects;