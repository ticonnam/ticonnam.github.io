import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Optimized Gallery: Standard CSS & GPU Layers ---
const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, images.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-opacity duration-300 ${
      isHighContrast ? 'bg-black' : 'bg-black/95'
    }`}>
      {/* UI Controls */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[1001]">
        <div className="text-white/40 font-mono text-xs">{index + 1} / {images.length}</div>
        <div className="flex gap-4">
          <button onClick={() => setIsHighContrast(!isHighContrast)} className="text-indigo-400"><Contrast size={20} /></button>
          <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400">{isZoomed ? <Minimize2 size={24}/> : <Maximize2 size={24}/>}</button>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full"><X size={28}/></button>
        </div>
      </div>

      {/* Navigation - Clickable Edges */}
      {!isZoomed && (
        <>
          <button onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-0 inset-y-0 w-24 flex items-center justify-center text-white/20 hover:text-white z-[1001]"><ChevronLeft size={60} /></button>
          <button onClick={() => setIndex((prev) => (prev + 1) % images.length)} className="absolute right-0 inset-y-0 w-24 flex items-center justify-center text-white/20 hover:text-white z-[1001]"><ChevronRight size={60} /></button>
        </>
      )}

      {/* Image Container - GPU Accelerated */}
      <div
        className={`w-full h-full flex items-center justify-center overflow-auto p-4 transition-transform duration-300 ease-out ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        style={{ transform: 'translateZ(0)' }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          key={images[index]}
          src={images[index]}
          alt="UX Artifact"
          className={`rounded-lg shadow-2xl transition-all duration-500 ease-in-out ${
            isZoomed ? 'min-w-[120%] h-auto' : 'max-h-[85vh] max-w-[90vw] object-contain'
          }`}
          style={{ willChange: 'transform, opacity' }}
        />
      </div>
    </div>
  );
};

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
  const [selected, setSelected] = useState<null | any>(null);

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-6">
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">W</span>ork.
        </h2>
        <p className="text-white/50 text-lg italic">Case studies built on the principles of the Google UX Design Professional Certificate.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelected(p)}
            className="group cursor-pointer bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-900 relative">
                <img
                  src={p.images[0]}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl">View Study</div>
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
            <div className="flex gap-2">
                {p.tech.map(t => <span key={t} className="text-[10px] uppercase text-indigo-400 font-bold border border-white/10 px-3 py-1 rounded-full">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      <ProjectGallery images={selected?.images || []} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;