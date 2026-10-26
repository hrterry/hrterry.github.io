"use client";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Auto-advancing figure carousel with arrows, dots, swipe and a click-to-zoom lightbox.
export default function FigureReel({ figures, label }: { figures: { src: string; caption: string }[]; label: string }) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const [zoom, setZoom] = useState(false);
  const go = useCallback((d: number) => { setDir(d); setI((x) => (x + d + figures.length) % figures.length); }, [figures.length]);
  useEffect(() => {
    if (paused || zoom || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), 5200); return () => clearInterval(id);
  }, [paused, zoom, go]);
  useEffect(() => {
    if (!zoom) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(false); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [zoom, go]);
  const f = figures[i];
  return (
    <figure className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} aria-roledescription="carousel" aria-label={label}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-white">
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.button key={f.src} type="button" onClick={() => setZoom(true)} aria-label={`Enlarge: ${f.caption}`}
            custom={dir} initial={{ opacity: 0, x: dir * 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: dir * -40 }} transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
            drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 50) go(info.offset.x < 0 ? 1 : -1); }}
            className="absolute inset-0 cursor-zoom-in p-3 md:p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={f.src} alt={f.caption} className="pointer-events-none h-full w-full object-contain" loading="lazy" draggable={false} />
          </motion.button>
        </AnimatePresence>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous figure" className="grid size-8 place-items-center rounded-full bg-white/90 text-[#0d1b1a] shadow-sm backdrop-blur hover:bg-white">‹</button>
          <div className="flex gap-1.5">
            {figures.map((x, k) => (
              <button key={x.src} type="button" onClick={() => { setDir(k > i ? 1 : -1); setI(k); }} aria-label={`Figure ${k + 1}: ${x.caption}`} aria-current={k === i}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-6 bg-[#0d1b1a]" : "w-1.5 bg-[#0d1b1a]/25"}`} />
            ))}
          </div>
          <button type="button" onClick={() => go(1)} aria-label="Next figure" className="grid size-8 place-items-center rounded-full bg-white/90 text-[#0d1b1a] shadow-sm backdrop-blur hover:bg-white">›</button>
        </div>
      </div>
      <figcaption className="mt-2.5 flex justify-between font-mono text-xs text-muted"><span>{f.caption}</span><span className="num">{i + 1} / {figures.length}</span></figcaption>
      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(false)} role="dialog" aria-label={f.caption}
            className="fixed inset-0 z-[90] grid cursor-zoom-out place-items-center bg-[#050a0a]/90 p-4 md:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img initial={{ scale: 0.96 }} animate={{ scale: 1 }} src={f.src} alt={f.caption} className="max-h-full max-w-full rounded-lg bg-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
