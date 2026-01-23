import React, { useEffect, useState } from "react";
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
    images: ["/youtube_shuffle_all.jpg", "/youtube-shuffle-all_casestudy.jpg"],
  },
  {
    title: "Diabetic-Safe Bakery",
    problem:
      "People with dietary restrictions often lack clear nutritional labeling during checkout.",
    images: ["/diabetic_bakery.jpg", "/diabetic-bakery_casestudy.jpg"],
  },
  {
    title: "Crunchyroll Redesign",
    problem:
      "Information overload caused high bounce rates on the anime discovery page.",
    images: [
      "/crunchyroll_redesign.jpg",
      "/crunchyroll-redesign_casestudy.jpg",
    ],
  },
];

type ZoomState = { projectIdx: number; imgIdx: number };

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  const [zoom, setZoom] = useState<ZoomState | null>(null);

  // ESC closes modal + arrows navigate
  useEffect(() => {
    if (!zoom) return;

    const handler = (e: KeyboardEvent) => {
      const imgs = projects[zoom.projectIdx].images;

      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowLeft")
        setZoom({
          ...zoom,
          imgIdx: (zoom.imgIdx - 1 + imgs.length) % imgs.length,
        });
      if (e.key === "ArrowRight")
        setZoom({ ...zoom, imgIdx: (zoom.imgIdx + 1) % imgs.length });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [zoom]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif text-white mb-14">
        Case <span className="text-indigo-400 italic">Studies</span>
      </h2>

      {/* Skinny projects, same row */}
      <div className="flex gap-8 overflow-x-auto pb-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            layout
            className="min-w-[340px] max-w-[340px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden"
          >
            {/* Main clickable image */}
            <button
              onClick={() => setZoom({ projectIdx: i, imgIdx: 0 })}
              className="relative w-full aspect-video overflow-hidden group"
              aria-label={`Open ${p.title} case study`}
              type="button"
            >
              <img
                src={p.images[0]}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                alt={p.title}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                <ZoomIn className="text-white" />
              </div>
            </button>

            <div className="p-6">
              <h3 className="text-xl text-white mb-4">{p.title}</h3>

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex items-center gap-2 text-indigo-400 text-sm font-semibold"
                type="button"
              >
                View Case Study <ChevronDown />
              </button>
            </div>

            {/* Expandable content */}
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

                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-bold">
                    Click to zoom artifacts
                  </p>

                  <div className="flex gap-3">
                    {p.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setZoom({ projectIdx: i, imgIdx: idx })}
                        className="relative w-28 h-16 rounded-lg overflow-hidden border border-white/10"
                        aria-label={`Open artifact ${idx + 1}`}
                        type="button"
                      >
                        <img
                          src={img}
                          className="w-full h-full object-cover"
                          alt={`${p.title} artifact ${idx + 1}`}
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

/* ---------------- ZOOM MODAL (REAL ZOOM + PAN + WORKING BUTTONS) ---------------- */

function ZoomModal({
  zoom,
  setZoom,
}: {
  zoom: ZoomState | null;
  setZoom: (v: ZoomState | null) => void;
}) {
  const DEFAULT_SCALE = 1.85; // ✅ “zoom in around 85%”
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Reset when modal opens or image changes
  useEffect(() => {
    if (!zoom) return;
    setScale(DEFAULT_SCALE);
    setPos({ x: 0, y: 0 });
  }, [zoom?.projectIdx, zoom?.imgIdx]);

  if (!zoom) return null;

  const imgs = projects[zoom.projectIdx].images;
  const clamp = (v: number) => Math.min(Math.max(v, 1), 4);

  const zoomIn = () => setScale((s) => clamp(Number((s + 0.25).toFixed(2))));
  const zoomOut = () => setScale((s) => clamp(Number((s - 0.25).toFixed(2))));
  const reset = () => {
    setScale(DEFAULT_SCALE);
    setPos({ x: 0, y: 0 });
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const next = clamp(Number((scale - e.deltaY * 0.001).toFixed(2)));
    setScale(next);
    if (next <= 1) setPos({ x: 0, y: 0 });
  };

  const goPrev = () =>
    setZoom({
      ...zoom,
      imgIdx: (zoom.imgIdx - 1 + imgs.length) % imgs.length,
    });

  const goNext = () =>
    setZoom({
      ...zoom,
      imgIdx: (zoom.imgIdx + 1) % imgs.length,
    });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* ✅ Overlay is explicitly BELOW the UI */}
        <div
          className="absolute inset-0 z-0"
          onClick={() => setZoom(null)}
        />

        {/* ✅ UI/content is ABOVE overlay and can receive clicks */}
        <div
          className="relative z-10 w-[92vw] h-[92vh] flex items-center justify-center pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ✅ Top bar - fully clickable */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
            <div className="text-white/60 text-xs font-mono">
              Zoom: {Math.round(scale * 100)}%
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomOut();
                }}
                className="px-3 py-2 rounded-lg bg-white/5 text-white/80 hover:text-white hover:bg-white/10"
                type="button"
              >
                −
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  zoomIn();
                }}
                className="px-3 py-2 rounded-lg bg-white/5 text-white/80 hover:text-white hover:bg-white/10"
                type="button"
              >
                +
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  reset();
                }}
                className="px-3 py-2 rounded-lg bg-white/5 text-white/80 hover:text-white hover:bg-white/10"
                type="button"
              >
                Reset
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoom(null);
                }}
                className="px-3 py-2 rounded-lg bg-white/5 text-white/80 hover:text-white hover:bg-white/10"
                aria-label="Close"
                type="button"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ✅ Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white px-3 py-3 pointer-events-auto"
            aria-label="Previous"
            type="button"
          >
            <ChevronLeft size={52} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 text-white/30 hover:text-white px-3 py-3 pointer-events-auto"
            aria-label="Next"
            type="button"
          >
            <ChevronRight size={52} />
          </button>

          {/* Viewport */}
          <div
            className="w-full h-full flex items-center justify-center overflow-hidden z-10"
            onWheel={handleWheel}
          >
            <motion.img
              key={`${zoom.projectIdx}-${zoom.imgIdx}`}
              src={imgs[zoom.imgIdx]}
              alt="Case study"
              draggable={false}
              className="select-none max-w-none max-h-none rounded-2xl shadow-2xl pointer-events-auto"
              style={{
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${scale})`,
                cursor: scale > 1 ? "grab" : "zoom-in",
              }}
              onMouseDown={(e) => {
                if (scale <= 1) return;
                e.preventDefault();

                const start = { x: e.clientX, y: e.clientY };
                const startPos = { ...pos };

                const onMove = (ev: MouseEvent) => {
                  setPos({
                    x: startPos.x + (ev.clientX - start.x),
                    y: startPos.y + (ev.clientY - start.y),
                  });
                };

                const onUp = () => {
                  window.removeEventListener("mousemove", onMove);
                  window.removeEventListener("mouseup", onUp);
                };

                window.addEventListener("mousemove", onMove);
                window.addEventListener("mouseup", onUp);
              }}
              onDoubleClick={() => {
                if (scale <= 1.05) setScale(DEFAULT_SCALE);
                else reset();
              }}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/30 text-[10px] font-mono z-30 pointer-events-none">
            Wheel to zoom • Drag to pan • Double-click to toggle zoom
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
