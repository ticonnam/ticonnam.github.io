import React, { useState, useEffect } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Optimized Gallery: Compositor-Only Layering ---
const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Keyboard Support: Accessible & Fast
  useEffect(() => {
    if (!isOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isZoomed) {
        if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % images.length);
        if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, images.length, isZoomed, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex flex-col items-center justify-center transition-opacity duration-300 ${
        isHighContrast ? 'bg-black' : 'bg-black/95'
      }`}
      style={{ transform: 'translateZ(0)' }} // Forces Compositor Layer
    >
      {/* UI Controls - Higher Z-Index */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[1010]">
        <div className="text-white/40 font-mono text-xs">{index + 1} / {images.length}</div>
        <div className="flex gap-4">
          <button onClick={() => setIsHighContrast(!isHighContrast)} className="text-indigo-400 p-2"><Contrast size={20} /></button>
          <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 p-2">{isZoomed ? <Minimize2 size={24}/> : <Maximize2 size={24}/>}</button>
          <button onClick={onClose} className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"><X size={28}/></button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {!isZoomed && images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev - 1 + images.length) % images.length); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[1010] transition-colors"
          >
            <ChevronLeft size={60} strokeWidth={1} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev + 1) % images.length); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white z-[1010] transition-colors"
          >
            <ChevronRight size={60} strokeWidth={1} />
          </button>
        </>
      )}

      {/* Hardware-Accelerated Artifact Viewer */}
      <div
        className={`w-full h-full flex items-center justify-center overflow-auto p-4 ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
          key={`${index}-${isZoomed}`}
          src={images[index]}
          alt="UX Research Artifact"
          className={`rounded-lg shadow-2xl transition-all duration-300 ease-out will-change-transform ${
            isZoomed ? 'min-w-[110%] h-auto' : 'max-h-[85vh] max-w-[90vw] object-contain'
          }`}
          style={{ transform: 'translateZ(0)' }}
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
    <div className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-6">
          Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">W</span>ork.
        </h2>
        <div className="h-1 w-20 bg-indigo-500 mb-8 rounded-full" />
        <p className="text-white/50 text-lg font-light italic">
          Case studies built on the principles of the Google UX Design Professional Certificate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div
            key={i}
            className="group relative bg-white/5 p-8 rounded-[2.5rem] border border-white/5 hover:bg-white/[0.08] transition-all duration-500 transform-gpu will-change-transform"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-900 relative">
                {/* INP FIX: will-change and transform-gpu prevent Main Thread blocking during hover */}
                <img
                  src={p.images[0]}
                  loading="lazy"
                  alt={p.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 transform-gpu will-change-[opacity,transform]"
                />

                {/* Dedicated Interaction Layer */}
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected(p); }}
                  className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white text-black px-6 py-3 rounded-full flex items-center gap-2 font-bold text-xs uppercase tracking-widest shadow-xl pointer-events-none">
                    <ZoomIn size={16} /> View Study
                  </div>
                </button>
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