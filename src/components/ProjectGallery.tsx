const ProjectGallery = ({ images, isOpen, onClose }: { images: string[], isOpen: boolean, onClose: () => void }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  // Reset states when gallery closes to prevent bugs on next open
  const handleClose = () => {
    setIsZoomed(false);
    setIndex(0);
    onClose();
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents click from bubbling to the zoom container
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
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
          {/* Top Control Bar */}
          <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-[700]">
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

          {/* Navigation Arrows - Forced to top z-index */}
          {!isZoomed && images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between px-8 pointer-events-none">
              <button 
                onClick={prev} 
                className="pointer-events-auto p-4 text-white/20 hover:text-white transition-colors z-[700]"
                aria-label="Previous image"
              >
                <ChevronLeft size={60} strokeWidth={1} />
              </button>
              <button 
                onClick={next} 
                className="pointer-events-auto p-4 text-white/20 hover:text-white transition-colors z-[700]"
                aria-label="Next image"
              >
                <ChevronRight size={60} strokeWidth={1} />
              </button>
            </div>
          )}

          {/* Image Container */}
          <div 
            className={`w-full h-full flex items-center justify-center cursor-pointer ${isZoomed ? 'overflow-y-auto pt-20' : ''}`}
            onClick={() => setIsZoomed(!isZoomed)} // Clicking the background/image toggles zoom
          >
            <motion.div 
              key={index} // Force re-animation on image change
              initial={{ opacity: 0, x: 20 }}
              animate={{ 
                opacity: 1, 
                x: 0, 
                scale: isZoomed ? 1.2 : 1 // Increased zoom scale for better visibility
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="will-change-transform flex items-center justify-center"
            >
              <img 
                src={images[index]} 
                alt="Case Study Detail"
                className={`rounded-xl shadow-2xl transition-all ${
                  isZoomed ? 'w-[95vw] h-auto' : 'max-h-[75vh] w-auto object-contain'
                }`} 
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};