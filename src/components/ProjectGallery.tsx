import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Contrast } from 'lucide-react';

// --- Sub-Component: 90% Gallery ---
const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Prevent scroll when gallery is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
    setIsZoomed(false);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
    setIsZoomed(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // --- FIX 1: Maximize Z-Index and ensure pointer events are active ---
          className={`fixed inset-0 z-[999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto transition-colors duration-300 ${
            isHighContrast ? 'bg-black' : 'bg-[#030303]/98 backdrop-blur-3xl'
          }`}
          onClick={onClose} // Clicking the background closes the project
        >
          {/* Gallery UI Controls */}
          <div
            className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[1000] pointer-events-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking controls
          >
             <div className="flex items-center gap-6 text-white/40 text-xs font-mono">
                {index + 1} / {images.length}
             </div>
             <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className="text-indigo-400 p-3 hover:bg-white/5 rounded-full transition-all cursor-pointer"
                  title="Toggle High Contrast"
                >
                  <Contrast size={20} />
                </button>
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="text-indigo-400 p-3 hover:bg-white/5 rounded-full transition-all cursor-pointer"
                  title="Toggle Zoom"
                >
                  {isZoomed ? <Minimize2 size={24}/> : <Maximize2 size={24}/>}
                </button>
                <button
                  onClick={onClose}
                  className="text-white p-3 hover:bg-red-500/20 rounded-full transition-all cursor-pointer"
                  title="Close Gallery"
                >
                  <X size={28}/>
                </button>
             </div>
          </div>

          {/* Navigation Arrows */}
          {!isZoomed && (
            <>
              <button
                onClick={prev}
                className="absolute left-8 top-1/2 -translate-y-1/2 z-[1000] p-4 text-white/20 hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={60} strokeWidth={1} />
              </button>
              <button
                onClick={next}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-[1000] p-4 text-white/20 hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight size={60} strokeWidth={1} />
              </button>
            </>
          )}

          {/* Main Artifact Display */}
          <div className={`w-full h-full flex items-center justify-center ${isZoomed ? 'overflow-y-auto pt-20 cursor-zoom-out' : 'cursor-default'}`}>
            <motion.div
              animate={{ scale: isZoomed ? 0.9 : 1 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="transform-gpu pointer-events-none" // Image itself shouldn't block button clicks
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[index]}
                alt="UX Artifact"
                className={`rounded-xl shadow-2xl transition-all duration-500 ${isZoomed ? 'w-[90vw] h-auto' : 'max-h-[80vh] object-contain'}`}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ... (Rest of your projects data and Projects component remain the same)