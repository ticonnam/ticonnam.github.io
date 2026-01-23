import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight } from 'lucide-react';

const ProjectGallery = ({ project, isOpen, onClose }: { project: any, isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Close on Escape key
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
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
        >
          <motion.div
            layoutId={`card-${project.title}`} // Direct link to the card for morphing
            className="relative w-full max-w-5xl h-[90vh] bg-[#0d0d0d] rounded-3xl border border-white/10 overflow-hidden flex flex-col"
          >
            <motion.div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 z-[1020]" style={{ scaleX }} />

            <div className="p-6 flex justify-between items-center border-b border-white/5 bg-black/20">
              <h3 className="text-xl font-bold">{project.title}</h3>
              <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-red-500/20 transition-all"><X size={20}/></button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8">
              <img
                src={project.images[index]}
                className={`rounded-xl shadow-2xl mx-auto transition-all duration-300 ${isZoomed ? 'w-full' : 'max-h-[70vh] object-contain'}`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {project.images.length > 1 && (
                <div className="flex justify-center gap-12 pt-8">
                  <button onClick={() => setIndex((prev) => (prev - 1 + project.images.length) % project.images.length)} className="text-white/40 hover:text-white flex items-center gap-2"><ChevronLeft size={20}/> Prev</button>
                  <button onClick={() => setIndex((prev) => (prev + 1) % project.images.length)} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-2">Next <ChevronRight size={20}/></button>
                </div>
              )}
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
    { title: "YouTube Music Shuffle", images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"], tech: ["UX", "Accessibility"] },
    { title: "Diabetic-Safe Bakery", images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"], tech: ["UI", "WCAG 2.1"] },
    { title: "Crunchyroll Redesign", images: ["/crunchyroll_redesign.png", "/crunchyroll_redesign_casestudy.jpg"], tech: ["IA", "Research"] }
  ];

  return (
    <div className="py-32 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif text-white mb-16">Selected <span className="italic text-indigo-500">Work</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <motion.div
            key={p.title}
            layoutId={`card-${p.title}`}
            onClick={() => setSelected(p)}
            className="cursor-pointer group bg-white/5 border border-white/5 rounded-[2rem] p-6 hover:bg-white/[0.08] transition-all"
          >
            <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-slate-900">
              <img src={p.images[0]} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
            </div>
            <h3 className="text-2xl font-bold">{p.title}</h3>
            <div className="flex gap-2 mt-4">
              {p.tech.map(t => <span key={t} className="text-[10px] uppercase text-indigo-400 border border-white/10 px-3 py-1 rounded-full font-bold">{t}</span>)}
            </div>
          </motion.div>
        ))}
      </div>
      <ProjectGallery project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default Projects;