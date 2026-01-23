import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Target,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
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
      <h2 className="text-5xl font-serif text-white mb-12">Case Studies</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            className="rounded-[2.5rem] bg-white/[0.04] border border-white/10 overflow-hidden"
          >
            <div className="p-8">
              {/* HERO IMAGE */}
              <div
                className="aspect-video rounded-2xl overflow-hidden mb-6 relative group cursor-zoom-in"
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
                className="flex items-center gap-2 text-indigo-400"
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
                  className="px-8 pb-8 text-white/70"
                >
                  <p className="mb-6">{p.readme.problem}</p>

                  <div className="flex gap-4 overflow-x-auto">
                    {p.images.map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() =>
                          setZoomImg({ projectIdx: i, imgIdx: idx })
                        }
                        className="min-w-[160px] h-24 rounded-xl overflow-hidden cursor-zoom-in relative"
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

      {/* ✅ ZOOM MODAL — THIS WAS MISSING */}
      <ZoomModal
        zoomImg={zoomImg}
        setZoomImg={setZoomImg}
        projects={projects}
      />
    </div>
  );
}

/* -------------------------------- */
/* ZOOM MODAL */
/* -------------------------------- */

function ZoomModal({
  zoomImg,
  setZoomImg,
  projects,
}: {
  zoomImg: ZoomState | null;
  setZoomImg: (v: ZoomState | null) => void;
  projects: typeof projects;
}) {
  const [scale, setScale] = useState(1);

  const clamp = (v: number) => Math.min(Math.max(v, 1), 3);

  if (!zoomImg) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
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
          <button
            onClick={() => setZoomImg(null)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={36} />
          </button>

          <motion.img
            src={projects[zoomImg.projectIdx].images[zoomImg.imgIdx]}
            onWheel={(e) =>
              setScale((s) => clamp(s - e.deltaY * 0.001))
            }
            onClick={() => setScale(scale > 1 ? 1 : 2)}
            animate={{ scale }}
            className="max-w-[85vw] max-h-[85vh] object-contain rounded-2xl cursor-zoom-in"
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
