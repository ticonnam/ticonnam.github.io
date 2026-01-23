import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type ZoomState = {
  projectIdx: number;
  imgIdx: number;
};

type Project = {
  images: string[];
};

export default function ProjectZoomModal({
  projects,
  zoomImg,
  setZoomImg,
}: {
  projects: Project[];
  zoomImg: ZoomState | null;
  setZoomImg: (v: ZoomState | null) => void;
}) {
  return (
    <AnimatePresence>
      {zoomImg && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* OVERLAY — CLICK TO CLOSE */}
          <div
            className="absolute inset-0"
            onClick={() => setZoomImg(null)}
          />

          {/* CONTENT — STOPS CLICK BUBBLING */}
          <div
            className="relative z-10 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setZoomImg(null)}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition"
            >
              <X size={36} />
            </button>

            {/* LEFT NAV */}
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
              className="absolute left-6 text-white/30 hover:text-white transition"
            >
              <ChevronLeft size={56} />
            </button>

            {/* RIGHT NAV */}
            <button
              onClick={() => {
                const p = projects[zoomImg.projectIdx];
                setZoomImg({
                  ...zoomImg,
                  imgIdx:
                    (zoomImg.imgIdx + 1) % p.images.length,
                });
              }}
              className="absolute right-6 text-white/30 hover:text-white transition"
            >
              <ChevronRight size={56} />
            </button>

            {/* IMAGE */}
            <ZoomableImage
              src={
                projects[zoomImg.projectIdx].images[
                  zoomImg.imgIdx
                ]
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------- */
/* ZOOMABLE IMAGE COMPONENT */
/* ---------------------------------- */

function ZoomableImage({ src }: { src: string }) {
  const [scale, setScale] = useState(1);

  const clamp = (v: number) => Math.min(Math.max(v, 1), 3);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((s) => clamp(s - e.deltaY * 0.001));
  };

  const handleClick = () => {
    setScale((s) => (s > 1 ? 1 : 2));
  };

  return (
    <div
      className="w-[85vw] h-[85vh] flex items-center justify-center"
      onWheel={handleWheel}
    >
      <motion.img
        src={src}
        onClick={handleClick}
        animate={{ scale }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        className={`max-w-full max-h-full object-contain rounded-2xl select-none cursor-${
          scale > 1 ? "zoom-out" : "zoom-in"
        }`}
        draggable={false}
      />
    </div>
  );
}
