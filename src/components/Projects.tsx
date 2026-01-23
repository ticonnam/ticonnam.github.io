import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Target,
  ZoomIn,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    title: "YouTube Music Shuffle",
    problem:
      "Users struggled to find the shuffle feature within the complex library navigation.",
    images: ["/youtube_shuffle_all.jpg", "/youtube_shuffle_all_casestudy.png"],
  },
  {
    title: "Diabetic-Safe Bakery",
    problem:
      "People with dietary restrictions lacked clear nutritional labeling.",
    images: ["/diabetic_bakery.jpg", "/diabetic_bakery_casestudy.jpg"],
  },
  {
    title: "Crunchyroll Redesign",
    problem:
      "Information overload caused high bounce rates on anime discovery.",
    images: [
      "/crunchyroll_redesign.jpg",
      "/crunchyroll_redesign_casestudy.jpg",
    ],
  },
];

type ZoomState = { projectIdx: number; imgIdx: number };

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState<ZoomState | null>(null);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif text-white mb-14">
        Case <span className="text-indigo-400 italic">Studies</span>
      </h2>

      {/* SKINNY ROW */}
      <div className="flex gap-8 overflow-x-auto pb-4">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            layout
            className="min-w-[360px] max-w-[360px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden"
          >
            {/* IMAGE (CLICKABLE) */}
            <button
              onClick={() => setZoom({ projectIdx: i, imgIdx: 0 })}
              className="relative w-full aspect-video overflow-hidden group"
            >
              <img
                src={p.images[0]}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <ZoomIn className="text-white" />
              </div>
            </button>

            <div className="p-6">
              <h3 className="text-xl text-white mb-4">{p.title}</h3>

              {/* CLICKABLE TOGGLE */}
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center gap-2 text-indigo-400 text-sm font-semibold"
              >
                View Case Study <ChevronDown />
              </button>
            </div>

            {/* EXPANDABLE CONTENT */}
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6 text-white/70 border-t border-white/10 bg-black/40"
                >
                  <div className="flex items-center gap-2 text-indigo-400 uppercase text-[10px] mb-2 font-bold">
                    <Target size={14} /> Problem
                  </div>
                  <p className="mb-4">{p.problem}</p>

                  <div className="flex gap-3">
                    {p.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setZoom({ projectIdx: i, imgIdx: idx })}
                        className="relative w-28 h-16 rounded-lg overflow-hidden border border-white/10"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center">
                          <ZoomIn className="text-white" size={14} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <ZoomModal zoom={zoom} setZoom={setZoom} />
    </section>
  );
}

/* ---------------- ZOOM MODAL ---------------- */

function ZoomModal({
  zoom,
  setZoom,
}: {
  zoom: ZoomState | null;
  setZoom: (v: ZoomState | null) => void;
}) {
  if (!zoom) return null;

  const imgs = projects[zoom.projectIdx].images;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setZoom(null)}
      >
        <div
          className="relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setZoom(null)}
            className="absolute top-4 right-4 text-white/40 hover:text-white"
          >
            <X size={32} />
          </button>

          <button
            onClick={() =>
              setZoom({
                ...zoom,
                imgIdx: (zoom.imgIdx - 1 + imgs.length) % imgs.length,
              })
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
          >
            <ChevronLeft size={48} />
          </button>

          <button
            onClick={() =>
              setZoom({
                ...zoom,
                imgIdx: (zoom.imgIdx + 1) % imgs.length,
              })
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
          >
            <ChevronRight size={48} />
          </button>

          <motion.img
            src={imgs[zoom.imgIdx]}
            className="max-w-[80vw] max-h-[80vh] rounded-2xl object-contain"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}