import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // --- Keyboard Support & Accessibility ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (!isZoomed) {
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, index]);

  const handleClose = () => {
    setIsZoomed(false);
    setIndex(0);
    onClose();
  };

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[600] flex flex-col items-center justify-center overflow-hidden transition-colors duration-300 ${
            isHighContrast ? 'bg-black' : 'bg-[#030303]/fb' 
          }`}
          style={{ transform: 'translateZ(0)' }}
        >
          {/* Top UI Layer */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[800]">
             <div className="flex items-center gap-6 text-white/40 text-xs font-mono">
                {index + 1} / {images.length}
             </div>
             <div className="flex items-center gap-4">
                <button onClick={() => setIsHighContrast(!isHighContrast)} className="text-indigo-400 p-2"><Contrast size={18} /></button>
                <button onClick={() => setIsZoomed(!isZoomed)} className="text-indigo-400 p-2">
                  {isZoomed ? <Minimize2 size={22}/> : <Maximize2 size={22}/>}
                </button>
                <button onClick={handleClose} className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"><X size={24}/></button>
             </div>
          </div>

          {/* Navigation Layer - Higher Z-Index than Image */}
          {!isZoomed && images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-8 pointer-events-none z-[750]">
              <button
                onClick={prev}
                className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all transform hover:scale-110"
              >
                <ChevronLeft size={60} strokeWidth={1} />
              </button>
              <button
                onClick={next}
                className="pointer-events-auto p-4 text-white/20 hover:text-white transition-all transform hover:scale-110"
              >
                <ChevronRight size={60} strokeWidth={1} />
              </button>
            </div>
          )}

          {/* Main Content Area */}
          <div
            className={`w-full h-full flex items-center justify-center cursor-pointer ${isZoomed ? 'overflow-auto py-20' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{
                opacity: 1,
                scale: isZoomed ? 1.15 : 1
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="will-change-transform flex items-center justify-center"
            >
              <img
                src={images[index]}
                alt="UX Artifact"
                className={`rounded-xl shadow-2xl transition-all duration-300 ${
                  isZoomed ? 'w-[92vw] h-auto cursor-zoom-out' : 'max-h-[80vh] w-auto object-contain cursor-zoom-in'
                }`}
                onClick={(e) => isZoomed && e.stopPropagation()} // Allow scrolling when zoomed
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};