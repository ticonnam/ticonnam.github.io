import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';

const ProjectGallery = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-200">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#050505] rounded-3xl border border-white/10 overflow-hidden flex flex-col shadow-2xl">

        {/* Sleek Header */}
        <div className="p-4 flex justify-between items-center border-b border-white/5 bg-black/40">
          <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{index + 1} / {project.images.length}</span>
          <div className="flex items-center gap-3">
            <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 hover:text-white p-2">
              {isZoomed ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
            </button>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 text-white transition-all">
              <X size={18}/>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-10 flex flex-col items-center ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          <img
            key={project.images[index]}
            src={project.images[index]}
            alt="Case Study"
            className={`rounded-lg transition-transform duration-300 shadow-2xl ${isZoomed ? 'w-full scale-110' : 'max-h-[70vh] object-contain'}`}
            style={{ willChange: 'transform' }} // Pre-optimizes for GPU
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {project.images.length > 1 && (
            <div className="flex gap-10 py-10 mt-auto">
              <button onClick={() => setIndex((prev) => (prev - 1 + project.images.length) % project.images.length)} className="text-white/30 hover:text-white flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <ChevronLeft size={16}/> Prev
              </button>
              <button onClick={() => setIndex((prev) => (prev + 1) % project.images.length)} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                Next <ChevronRight size={16}/>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const projects = [
  { title: "YouTube Music Shuffle", images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"], tech: ["UX Research", "Accessibility"] },
  { title: "Diabetic-Safe Bakery", images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"], tech: ["UI Design", "WCAG 2.1"] },
  { title: "Crunchyroll Redesign", images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"], tech: ["IA", "Research"] }
];

const Projects = () => {
  const [selected, setSelected] = useState<null | any>(null);

  return (
    <div className="py-24 px-6 max-w-6xl mx-auto">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-serif text-white italic">Case Studies.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelected(p)}
            className="group cursor-pointer bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] hover:bg-white/[0.07] transition-all duration-300"
          >
            <div className="aspect-video rounded-xl overflow-hidden bg-slate-900 border border-white/5 mb-6">
                <img
                  src={p.images[0]}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 transform-gpu"
                />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">{p.title}</h3>
            <div className="flex gap-2 mt-3">
              {p.tech.map(t => <span key={t} className="text-[9px] uppercase tracking-tighter text-indigo-400 font-bold border border-indigo-500/10 px-2 py-0.5 rounded-full">{t}</span>)}
            </div>
          </div>
        ))}
      </div>
      <ProjectGallery project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;