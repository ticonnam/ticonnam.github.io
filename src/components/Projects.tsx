import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Target,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const projects = [
  {
    title: "YouTube Music Shuffle",
    problem:
      "Users struggled to find the shuffle feature within the complex library navigation.",
    images: [
      "/youtube_music_cover.png",
      "/youtube_music_problem.png",
      "/youtube_music_solution.png",
      "/youtube_music_outcome.png",
    ],
  },
  {
    title: "Diabetic-Safe Bakery",
    problem:
      "People with dietary restrictions often lack clear nutritional labeling during checkout.",
    images: [
      "/diabetic_bakery_cover.png",
      "/diabetic_bakery_problem.png",
      "/diabetic_bakery_solution.png",
      "/diabetic_bakery_outcome.png",
    ],
  },
  {
    title: "Crunchyroll Redesign",
    problem:
      "Information overload caused high bounce rates on the anime discovery page.",
    images: [
      "/crunchyroll_cover.png",
      "/crunchyroll_problem.png",
      "/crunchyroll_solution.png",
      "/crunchyroll_outcome.png",
    ],
  },
];

type ModalState = {
  projectIdx: number;
  imgIdx: number;
};

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);

  // Keyboard nav for modal
  useEffect(() => {
    if (!modal) return;

    const handler = (e: KeyboardEvent) => {
      const imgs = projects[modal.projectIdx].images;

      if (e.key === "Escape") setModal(null);
      if (e.key === "ArrowLeft")
        setModal({
          ...modal,
          imgIdx: (modal.imgIdx - 1 + imgs.length) % imgs.length,
        });
      if (e.key === "ArrowRight")
        setModal({
          ...modal,
          imgIdx: (modal.imgIdx + 1) % imgs.length,
        });
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modal]);

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-5xl font-serif text-white mb-14">
        Case <span className="text-indigo-400 italic">Studies</span>
      </h2>

      {/* Skinny horizontal row */}
      <div className="flex gap-8 overflow-x-auto pb-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            className="min-w-[340px] max-w-[340px] bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden"
          >
            {/* Main preview */}
            <button
              onClick={() => setModal({ projectIdx: i, imgIdx: 0 })}
              className="relative w-full aspect-video overflow-hidden"
              type="button"
            >
              <img
                src={p.images[0]}
                alt={p.title}
                className="w-full h-full object-cover"
              />
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

            {/* Expanded content */}
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

                  <div className="flex gap-3 overflow-x-auto">
                    {p.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          setModal({ projectIdx: i, imgIdx: idx })
                        }
                        className="min-w-[120px] h-20 rounded-lg overflow-hidden border border-white/10"
                        type="button"
                      >
                        <img
                          src={img}
                          alt={`${p.title} page ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* MODAL — NO ZOOM, JUST CLOSE-UP */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <div
              className="absolute inset-0"
              onClick={() => setModal(null)}
            />

            {/* Content */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center px-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setModal(null)}
                className="absolute top-6 right-6 text-white/60 hover:text-white"
                type="button"
              >
                <X size={32} />
              </button>

              {/* Navigation */}
              <button
                onClick={() => {
                  const imgs = projects[modal.projectIdx].images;
                  setModal({
                    ...modal,
                    imgIdx:
                      (modal.imgIdx - 1 + imgs.length) % imgs.length,
                  });
                }}
                className="absolute left-4 text-white/40 hover:text-white"
                type="button"
              >
                <ChevronLeft size={48} />
              </button>

              <button
                onClick={() => {
                  const imgs = projects[modal.projectIdx].images;
                  setModal({
                    ...modal,
                    imgIdx:
                      (modal.imgIdx + 1) % imgs.length,
                  });
                }}
                className="absolute right-4 text-white/40 hover:text-white"
                type="button"
              >
                <ChevronRight size={48} />
              </button>

              {/* IMAGE — DISPLAYED AT ~85% WIDTH, NO SCALING */}
              <img
                src={projects[modal.projectIdx].images[modal.imgIdx]}
                alt="Case study page"
                className="max-w-[85vw] max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
