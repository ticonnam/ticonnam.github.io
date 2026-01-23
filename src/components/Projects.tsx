import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Target,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Contrast,
} from "lucide-react";

const projects = [
  {
    title: "YouTube Music Shuffle",
    readme: {
      problem:
        "Users struggled to find the shuffle feature within the complex library navigation.",
    },
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
    tech: ["UX Research", "Accessibility"],
  },
  {
    title: "Diabetic-Safe Bakery",
    readme: {
      problem:
        "People with dietary restrictions often lack clear nutritional labeling during checkout.",
    },
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
    tech: ["UI Design", "WCAG 2.1"],
  },
  {
    title: "Crunchyroll Redesign",
    readme: {
      problem:
        "Information overload caused high bounce rates on the anime discovery page.",
    },
    images: [
      "/crunchyroll_redesign.jpg",
      "/crunchyroll_redesign_casestudy.jpg",
    ],
    tech: ["IA", "User Testing"],
  },
];

type ZoomState = {
  projectIdx: number;
  imgIdx: number;
};

export default function Projects() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [zoomImg, setZoomImg] = useState<ZoomState | null>(null);

  return (
    <div className="py-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h2 className="text-5xl font-serif text-white mb-16">
        Case <span className="text-indigo-400 italic">Studies</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            className="flex flex-col max-h-[460px] bg-white/[0.04] border border-white/10 rounded-[2.5rem] overflow-hidden"
          >
            <div className="p-8">
              {/* IMAGE PREVIEW */}
              <div
                className="aspect-video max-h-[220px] rounded-2xl overflow-hidden mb-6 bg-slate-900 border border-white/5 relative group cursor-zoom-in"
                onClick={() => setZoomImg({ projectIdx: i, imgIdx: 0 })}
              >
                <img
                  src={p.images[0]}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <Maximize2 className="text-white" />
                </div>
              </div>

              <h3 className="text-2xl text-white mb-4">{p.title}</h3>

              <button
                onClick={() =>
                  setExpandedIndex(expandedIndex === i ? null : i)
                }
                className="flex items-center gap-2 text-indigo-400 text-sm font-semibold"
              >
                View Research <ChevronDown />
              </button>
            </div>

            <AnimatePresence>
              {expandedIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-8 pb-8 text-white/60 border-t border-white/10 bg-black/40"
                >
                  <div className="flex items-center gap-2 text-indigo-400 uppercase tracking-widest text-[10px] mb-3 font-bold">
                    <Target size={14} /> Problem
                  </div>
                  <p className="mb-6">{p.readme.problem}</p>

                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-bold">
                    Click to zoom artifacts
                  </p>

                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {p.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setZoomImg({ projectIdx: i, imgIdx: idx })
                        }
                        className="relative min-w-[160px] h-24 rounded-xl overflow-hidden cursor-zoom-in border border-white/10"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
                          <ZoomIn className="text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ZOOM MODAL */}
      <ZoomModal
        zoomImg={zoomImg}
        setZoomImg={setZoomImg}
        projects={projects}
      />
    </div>
  );
}

/* ---------------- ZOOM MODAL ---------------- */

function ZoomModal({
  zoomImg,
  setZoomImg,
  projects,
}: {
  zoomImg: ZoomState | null;
  setZoomImg: (v: ZoomState | null) => void;
  projects: typeof projects;
}) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (!zoomImg) setIsZoomed(false);
  }, [zoomImg]);

  if (!zoomImg) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
      >
        {/* OVERLAY */}
        <div
          className="absolute inset-0"
          onClick={() => setZoomImg(null)}
        />

        {/* CONTENT */}
        <div
          className="relative z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={() => setZoomImg(null)}
            className="absolute top-6 right-6 text-white/40 hover:text-white"
          >
            <X size={36} />
          </button>

          {/* ZOOM TOGGLE */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute top-6 left-6 text-white/40 hover:text-white"
          >
            <Contrast size={20} />
          </button>

          {/* NAV */}
          <button
            onClick={() => {
              const p = projects[zoomImg.projectIdx];
              setZoomImg({
                ...zoomImg,
                imgIdx:
                  (zoomImg.imgIdx - 1 + p.images.length) %
                  p.images.length,
              });
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
          >
            <ChevronLeft size={60} />
          </button>

          <button
            onClick={() => {
              const p = projects[zoomImg.projectIdx];
              setZoomImg({
                ...zoomImg,
                imgIdx:
                  (zoomImg.imgIdx + 1) % p.images.length,
              });
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
          >
            <ChevronRight size={60} />
          </button>

          {/* IMAGE */}
          <motion.img
            key={zoomImg.imgIdx}
            src={projects[zoomImg.projectIdx].images[zoomImg.imgIdx]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: isZoomed ? 1.1 : 1,
            }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 140, damping: 20 }}
            className="max-w-[85vw] max-h-[85vh] rounded-2xl shadow-2xl object-contain cursor-zoom-in"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
