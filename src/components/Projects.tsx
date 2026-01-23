import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Target,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem: "Users struggled to find the shuffle feature within the complex library navigation.",
      solution: "Implemented a high-visibility 'Shuffle All' trigger at the top level of the library view.",
      impact: "Reduced interaction steps from 4 clicks down to 1."
    },
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
    tech: ["UX Research", "Accessibility"]
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem: "People with dietary restrictions often lack clear nutritional labeling during checkout.",
      solution: "Created an e-commerce flow with mandatory, high-contrast glycemic indicators.",
      impact: "Increased user confidence ratings during prototype testing by 40%."
    },
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
    tech: ["UI Design", "WCAG 2.1"]
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem: "Information overload caused high bounce rates on the anime discovery page.",
      solution: "Simplified IA by categorizing shows into mood-based tiers and reducing clutter.",
      impact: "Streamlined the average user journey to 'Start Watching' by 15 seconds."
    },
    images: ["/crunchyroll_redesign.jpg", "/crunchyroll_redesign_casestudy.jpg"],
    tech: ["IA", "User Testing"]
  }
];

const Projects = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<{ projectIdx: number; imgIdx: number } | null>(null);
  const [scale, setScale] = useState(1);

  /** Keyboard navigation */
  useEffect(() => {
    if (!zoomImg) return;

    const handler = (e: KeyboardEvent) => {
      const p = projects[zoomImg.projectIdx];

      if (e.key === 'Escape') setZoomImg(null);
      if (e.key === 'ArrowRight')
        setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx + 1) % p.images.length });
      if (e.key === 'ArrowLeft')
        setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx - 1 + p.images.length) % p.images.length });
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [zoomImg]);

  /** Reset zoom when image changes */
  useEffect(() => {
    setScale(1);
  }, [zoomImg?.imgIdx]);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-5xl text-white mb-16 font-serif italic">
        Case <span className="text-indigo-400">Studies</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <motion.div key={i} layout className="rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden">
            <div className="p-8">
              <div
                className="aspect-video rounded-2xl overflow-hidden cursor-zoom-in relative group"
                onClick={() => setZoomImg({ projectIdx: i, imgIdx: 0 })}
              >
                <img src={p.images[0]} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Maximize2 className="text-white" />
                </div>
              </div>

              <h3 className="text-white text-2xl mt-6">{p.title}</h3>

              <button
                onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                className="mt-6 w-full py-3 bg-white/10 rounded-xl text-white/60 hover:text-white"
              >
                See Research <ChevronDown className="inline ml-2" />
              </button>
            </div>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="p-8 border-t border-white/10 bg-black/40"
                >
                  <div className="text-xs text-white/60">{p.readme.problem}</div>

                  <div className="flex gap-4 mt-6 overflow-x-auto">
                    {p.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setZoomImg({ projectIdx: i, imgIdx: idx })}
                        className="min-w-[180px] h-24 rounded-xl overflow-hidden cursor-zoom-in"
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ================= ZOOM MODAL ================= */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImg(null)}
          >
            {/* Close */}
            <button
              onClick={(e) => { e.stopPropagation(); setZoomImg(null); }}
              className="absolute top-8 right-8 text-white"
            >
              <X size={40} />
            </button>

            {/* Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const p = projects[zoomImg.projectIdx];
                setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx - 1 + p.images.length) % p.images.length });
              }}
              className="absolute left-6 text-white"
            >
              <ChevronLeft size={60} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                const p = projects[zoomImg.projectIdx];
                setZoomImg({ ...zoomImg, imgIdx: (zoomImg.imgIdx + 1) % p.images.length });
              }}
              className="absolute right-6 text-white"
            >
              <ChevronRight size={60} />
            </button>

            {/* Zoomable Image */}
            <motion.img
              src={projects[zoomImg.projectIdx].images[zoomImg.imgIdx]}
              drag
              dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
              onWheel={(e) =>
                setScale((s) => Math.min(3, Math.max(1, s - e.deltaY * 0.001)))
              }
              style={{ scale }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[85vw] max-h-[85vh] cursor-grab rounded-2xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;