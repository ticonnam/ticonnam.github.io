import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Sub-Component: ProjectGallery ---
// Integrated here to ensure strict 90% zoom and High Contrast functionality
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[500] transition-colors duration-500 flex flex-col items-center justify-center overflow-hidden ${
            isHighContrast ? 'bg-black' : 'bg-[#0a0c10]/fb backdrop-blur-3xl'
          }`}
        >
          {/* Gallery UI Controls */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[510]">
             <div className="flex items-center gap-6">
                <span className="text-white/50 font-mono text-xs tracking-widest">{index + 1} / {images.length}</span>
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                    isHighContrast ? 'text-indigo-400' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Contrast size={14} /> {isHighContrast ? 'Contrast: ON' : 'Contrast: OFF'}
                </button>
             </div>

             <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-3 bg-white/5 hover:bg-white/10 text-indigo-400 rounded-full border border-white/10 transition-all"
                >
                  {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10">
                  <X size={20} />
                </button>
             </div>
          </div>

          {/* Main Artifact Display */}
          <div className={`w-full h-full flex flex-col items-center ${isZoomed ? 'overflow-y-auto pt-32 pb-20' : 'justify-center overflow-hidden'}`}>
            {!isZoomed && (
              <>
                <button onClick={prev} className="fixed left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]">
                  <ChevronLeft size={60} strokeWidth={1} />
                </button>
                <button onClick={next} className="fixed right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[510]">
                  <ChevronRight size={60} strokeWidth={1} />
                </button>
              </>
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: isZoomed ? 0.9 : 1 }} // Target 90% Scale
              className={`flex items-center justify-center transition-all ${isZoomed ? 'w-full' : 'max-h-[80vh] w-auto'}`}
              onClick={() => !isZoomed && setIsZoomed(true)}
            >
              <img
                src={images[index]}
                alt="UX Case Study Detail"
                className={`rounded-xl transition-all duration-500 ${
                  isZoomed ? 'w-[90%] md:w-[85%] cursor-zoom-out h-auto' : 'max-h-[75vh] object-contain cursor-zoom-in'
                } ${isHighContrast ? 'shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10' : 'shadow-2xl shadow-black/80'}`}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Work Component ---
const projects = [
  {
    title: "YouTube Music Shuffle",
    description: "Improving accessibility for the offline shuffle feature through iterative research and design.",
    tech: ["UX Research", "Figma", "Accessibility"],
    images: ["/yt-music-1.png", "/yt-music-2.png", "/yt-music-3.png"], // Ensure these exist in /public
    link: "#",
    github: "#"
  },
  {
    title: "Crunchyroll Redesign",
    description: "Streamlining the home-to-playback journey to reduce cognitive load.",
    tech: ["UI Design", "Information Architecture"],
    images: ["/crunchyroll-1.png", "/crunchyroll-2.png"],
    link: "#",
    github: "#"
  }
];

const Work = () => {
  const [selectedProject, setSelectedProject] = useState<null | typeof projects[0]>(null);

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col mb-20">
        <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40 mb-6">Selected Works</h2>
        <p className="text-slate-400 max-w-2xl text-lg font-light leading-relaxed">
          Case studies focused on solving user pain points through the lens of the Google UX Design Professional Certificate principles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative bg-[#0d0f14] border border-white/5 rounded-[2rem] overflow-hidden p-8"
          >
            <div className="relative aspect-video rounded-xl overflow-hidden mb-8 bg-slate-900">
               <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
               <button
                 onClick={() => setSelectedProject(project)}
                 className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
               >
                 <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold text-sm">
                   <ZoomIn size={18} /> View Case Study
                 </div>
               </button>
            </div>

            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <p className="text-slate-400 mb-6 font-light leading-relaxed">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map(t => <span key={t} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-indigo-400 font-bold">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectGallery
        images={selectedProject?.images || []}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Work;