import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard support for professional navigation
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
    <div className="fixed inset-0 z-[999] bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-200">
      {/* Sleek Minimal Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[1010]">
        <span className="text-white/40 font-mono text-xs uppercase tracking-widest">{index + 1} / {images.length}</span>
        <div className="flex gap-4">
          <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 hover:text-white transition-colors">
            {isZoomed ? <Minimize2 size={20}/> : <Maximize2 size={20}/>}
          </button>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X size={24}/>
          </button>
        </div>
      </div>

      {/* Navigation - Hidden on Zoom */}
      {!isZoomed && images.length > 1 && (
        <>
          <button onClick={() => setIndex((prev) => (prev - 1 + images.length) % images.length)} className="absolute left-4 p-4 text-white/20 hover:text-white z-[1010] transition-colors"><ChevronLeft size={48} strokeWidth={1} /></button>
          <button onClick={() => setIndex((prev) => (prev + 1) % images.length)} className="absolute right-4 p-4 text-white/20 hover:text-white z-[1010] transition-colors"><ChevronRight size={48} strokeWidth={1} /></button>
        </>
      )}

      {/* Hardware-Accelerated Viewer */}
      <div 
        className={`w-full h-full flex items-center justify-center p-4 transition-transform duration-300 ${isZoomed ? 'overflow-auto cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => setIsZoomed(!isZoomed)}
        style={{ transform: 'translateZ(0)' }} 
      >
        <img 
          key={images[index]}
          src={images[index]} 
          alt="Case Study Detail"
          className={`rounded shadow-2xl transition-all duration-300 ease-out ${
            isZoomed ? 'min-w-[110%] h-auto' : 'max-h-[85vh] max-w-[90vw] object-contain'
          }`}
          style={{ willChange: 'transform' }}
        />
      </div>
    </div>
  );
};

const projects = [
  { 
    title: "YouTube Music Shuffle", 
    description: "Accessibility optimization for the offline shuffle feature.", 
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"], 
    tech: ["UX Research", "Accessibility"] 
  },
  { 
    title: "Diabetic-Safe Bakery", 
    description: "End-to-end accessible commerce platform.", 
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"], 
    tech: ["UI Design", "WCAG 2.1"] 
  },
  { 
    title: "Crunchyroll Redesign", 
    description: "Information architecture to reduce cognitive load.", 
    images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"], 
    tech: ["IA", "User Testing"] 
  }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | any>(null);

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto min-h-screen">
      <div className="mb-20">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">Case Studies.</h2>
        <p className="text-white/40 text-lg font-light max-w-lg leading-relaxed">
          Applied UX methodology focused on accessibility and user empathy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {projects.map((p, i) => (
          <div 
            key={i} 
            onClick={() => setSelected(p)}
            className="group cursor-pointer space-y-6"
          >
            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-900 border border-white/5 transition-all duration-500 group-hover:border-indigo-500/30">
                <img 
                  src={p.images[0]} 
                  loading="lazy"
                  alt={p.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105" 
                />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{p.title}</h3>
              <p className="text-white/40 text-sm font-light mt-2 leading-relaxed">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
      <ProjectGallery images={selected?.images || []} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;