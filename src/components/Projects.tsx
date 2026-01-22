import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Sub-Component: 90% Gallery ---
const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${isHighContrast ? 'bg-black' : 'bg-[#030303]/98 backdrop-blur-3xl'}`}
        >
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[510]">
             <div className="flex items-center gap-6 text-white/40 text-xs font-mono">{index + 1} / {images.length}</div>
             <div className="flex items-center gap-4">
                <button onClick={() => setIsHighContrast(!isHighContrast)} className="text-indigo-400 p-2"><Contrast size={18} /></button>
                <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 p-2">{isZoomed ? <Minimize2 size={22}/> : <Maximize2 size={22}/>}</button>
                <button onClick={onClose} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24}/></button>
             </div>
          </div>
          <div className={`w-full h-full flex items-center justify-center ${isZoomed ? 'overflow-y-auto pt-20' : ''}`}>
            <motion.div animate={{ scale: isZoomed ? 0.9 : 1 }} transition={{ type: "spring", stiffness: 250, damping: 25 }}>
              <img src={images[index]} alt="Case Study Artifact" className={`rounded-xl shadow-2xl ${isZoomed ? 'w-[90vw] h-auto cursor-zoom-out' : 'max-h-[80vh] object-contain cursor-zoom-in'}`} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const projects = [
  {
    title: "YouTube Music Shuffle",
    description: "Improving accessibility for the offline shuffle feature.",
    images: ["/youtubeshuffle.jpg", "/yt-music-case-study.jpg"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    description: "Designing an end-to-end accessible ordering system.",
    images: ["/diabeticbakery.jpg", "/diabetic-bakery-case-study.jpg"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    description: "Streamlining discovery to reduce cognitive load.",
    images: ["/crunchyroll.jpg", "/crunchyroll-case-study.jpg"],
    tech: ["IA", "User Testing"]
  }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | any>(null);

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-6">
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">W</span>ork.
        </h2>
        <div className="h-1 w-20 bg-indigo-500 mb-8 rounded-full" />
        <p className="text-white/50 text-lg font-light italic">Case studies built on the principles of the Google UX Design Professional Certificate.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div key={i} onClick={() => setSelected(p)} className="cursor-pointer group relative bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all duration-500">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-900">
                <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
            </div>
            <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
            <div className="flex gap-2 flex-wrap">
                {p.tech.map(t => <span key={t} className="text-[10px] uppercase tracking-tighter text-indigo-400 font-bold border border-white/10 px-3 py-1 rounded-full">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <ProjectGallery images={selected?.images || []} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;