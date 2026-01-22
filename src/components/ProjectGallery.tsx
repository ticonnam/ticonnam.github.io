import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

interface GalleryProps {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
}

const ProjectGallery: React.FC<GalleryProps> = ({ images, isOpen, onClose }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIndex(0);
      setIsZoomed(false);
      setIsHighContrast(false);
    }
  }, [isOpen]);

  const next = () => { setIndex((prev) => (prev + 1) % images.length); setIsZoomed(false); };
  const prev = () => { setIndex((prev) => (prev - 1 + images.length) % images.length); setIsZoomed(false); };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[300] transition-colors duration-500 flex flex-col items-center justify-center overflow-hidden ${
            isHighContrast ? 'bg-black' : 'bg-[#0a0c10]/fb backdrop-blur-3xl'
          }`}
        >
          {/* Top Interface */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[310]">
             <div className="flex items-center gap-6">
                <span className="text-white/50 font-mono text-xs tracking-widest">{index + 1} / {images.length}</span>
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className={`flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                    isHighContrast ? 'text-indigo-400' : 'text-slate-500 hover:text-white'
                  }`}
                >
                  <Contrast size={14} /> {isHighContrast ? 'High Contrast: On' : 'High Contrast: Off'}
                </button>
             </div>

             <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-3 bg-white/5 hover:bg-white/10 text-indigo-400 rounded-full border border-white/10 transition-all"
                  title="90% Scale View"
                >
                  {isZoomed ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </button>
                <button onClick={onClose} className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-full border border-white/10">
                  <X size={20} />
                </button>
             </div>
          </div>

          {/* Main Stage */}
          <div className={`w-full h-full flex flex-col items-center ${isZoomed ? 'overflow-y-auto overflow-x-hidden pt-32 pb-20' : 'justify-center overflow-hidden'}`}>

            {!isZoomed && (
              <>
                <button onClick={prev} className="fixed left-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[310]">
                  <ChevronLeft size={60} strokeWidth={1} />
                </button>
                <button onClick={next} className="fixed right-8 top-1/2 -translate-y-1/2 p-4 text-white/20 hover:text-white transition-colors z-[310]">
                  <ChevronRight size={60} strokeWidth={1} />
                </button>
              </>
            )}

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 0.9 : 1,
              }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className={`flex items-center justify-center transition-all ${isZoomed ? 'w-full' : 'max-h-[80vh] w-auto'}`}
              onClick={() => !isZoomed && setIsZoomed(true)}
            >
              <img
                src={images[index]}
                alt="UX Research Case Study"
                className={`rounded-xl transition-all duration-500 ${
                  isZoomed ? 'w-[90%] md:w-[85%] cursor-zoom-out h-auto' : 'max-h-[75vh] object-contain cursor-zoom-in'
                } ${isHighContrast ? 'shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10' : 'shadow-2xl shadow-black/80'}`}
              />
            </motion.div>
          </div>

          {/* Bottom Indicators */}
          {!isZoomed && (
            <div className="absolute bottom-10 flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setIndex(i)} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-indigo-500' : 'w-2 bg-white/10'}`} />
                ))}
              </div>
              <p className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.3em]">Artifact Reading View</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectGallery;