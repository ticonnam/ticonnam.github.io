import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ExternalLink, ArrowRight } from 'lucide-react';

const ProjectGallery = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- God Tier: Scroll Progress Tracking ---
  const { scrollYProgress } = useScroll({
    container: scrollRef,
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleNav = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!isZoomed && project?.images) {
        if (e.key === 'ArrowRight') setIndex((prev) => (prev + 1) % project.images.length);
        if (e.key === 'ArrowLeft') setIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      }
    };
    window.addEventListener('keydown', handleNav);
    return () => window.removeEventListener('keydown', handleNav);
  }, [isOpen, project, isZoomed, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10"
        >
          {/* Backdrop with Immersive Blur */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-2xl" onClick={onClose} />

          {/* Morphing Modal */}
          <motion.div
            layoutId={`project-${project.title}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-full bg-[#0d0d0d] rounded-[2rem] border border-white/10 overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* God Tier Scroll Progress Bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 origin-left z-[1020]"
              style={{ scaleX }}
            />

            {/* Header Controls */}
            <div className="flex justify-between items-center p-6 border-b border-white/5 z-[1010] bg-[#0d0d0d]/80 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                  Artifact {index + 1} / {project.images.length}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 hover:text-white transition-colors">
                  {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onClose} className="p-2 bg-white/5 text-white rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Main Content Area */}
            <div
              ref={scrollRef}
              className={`relative flex-1 overflow-y-auto custom-scrollbar ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
            >
              <div className="min-h-full w-full flex flex-col items-center p-6 md:p-12 space-y-12">
                <motion.img
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  src={project.images[index]}
                  className={`rounded-xl shadow-2xl transition-all duration-500 ${isZoomed ? 'w-full' : 'max-h-[85vh] w-auto object-contain'}`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />

                {/* Navigation Hint */}
                {project.images.length > 1 && (
                  <div className="flex justify-center items-center gap-8 py-8 border-t border-white/5 w-full">
                    <button onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev - 1 + project.images.length) % project.images.length); }} className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                      <ChevronLeft size={16} /> Previous
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setIndex((prev) => (prev + 1) % project.images.length); }} className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                      Next Artifact <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState<null | any>(null);

  const projects = [
    { title: "YouTube Music Shuffle", images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"], tech: ["UX Research", "Accessibility"] },
    { title: "Diabetic-Safe Bakery", images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"], tech: ["UI Design", "WCAG 2.1"] },
    { title: "Crunchyroll Redesign", images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"], tech: ["IA", "User Testing"] }
  ];

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-24">
        <h2 className="text-5xl md:text-7xl font-serif tracking-tight text-white mb-6">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 italic">Work</span>.
        </h2>
        <div className="h-1 w-20 bg-indigo-500 mb-8 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layoutId={`project-${p.title}`}
            onClick={() => setSelected(p)}
            className="group cursor-pointer bg-white/5 border border-white/5 rounded-[2.5rem] p-8 hover:bg-white/[0.08] transition-all duration-500"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-900 relative">
              <img src={p.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-900/40 backdrop-blur-sm">
                <div className="bg-white text-black px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2">
                  View Case Study <ArrowRight size={14} />
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
            <div className="flex gap-2">
              {p.tech.map(t => <span key={t} className="text-[10px] uppercase text-indigo-400 font-bold border border-white/10 px-3 py-1 rounded-full">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectGallery project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;