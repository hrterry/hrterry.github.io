"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import type { Interest } from "@/lib/data";

const RNA_SEQ = "GGGACUUACGCAAGGUUACGUGCAAUCCGAGAGCUAUGGCCUACGUAA";
const BASE: Record<string, string> = { A: "#137a5c", U: "#6c4fb0", G: "#b85f12", C: "#2768a4" };

// Masked-token discrete diffusion: tokens unmask in a fixed random order, with a few provisional corrections.
function RnaDecode() {
  const [t, setT] = useState(3600);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t0 = performance.now(); const id = setInterval(() => setT((performance.now() - t0) % 5000), 80);
    return () => clearInterval(id);
  }, []);
  const seq = [...RNA_SEQ], n = seq.length;
  const order = seq.map((_, i) => i).sort((a, b) => ((a * 29) % n) - ((b * 29) % n));
  const rank = new Map(order.map((i, p) => [i, p]));
  const corr = new Map<number, [number, number, string]>([[5, [900, 1250, "C"]], [23, [1350, 1700, "A"]], [42, [1800, 2150, "G"]]]);
  return (
    <div className="grid h-full grid-cols-8 content-center gap-1.5 p-5 font-mono text-sm" aria-hidden>
      {seq.map((b, i) => {
        const at = 550 + (rank.get(i)! / (n - 1)) * 2700, c = corr.get(i);
        let v = "×", st = "mask";
        if (c && t >= c[0] && t < c[1]) { v = c[2]; st = "prov"; } else if (t >= at && t < 4600) { v = b; st = "done"; }
        return (
          <span key={i} className="grid aspect-square place-items-center rounded-[5px] transition-all duration-300"
            style={{ background: st === "mask" ? "var(--paper-2)" : st === "prov" ? "transparent" : BASE[v], color: st === "mask" ? "var(--muted)" : st === "prov" ? "var(--rose)" : "#fff",
              outline: st === "prov" ? "1px dashed var(--rose)" : "none", transform: st === "done" ? "scale(1)" : "scale(.92)" }}>{v}</span>
        );
      })}
    </div>
  );
}

function Reel({ frames, alt }: { frames: string[]; alt: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % frames.length), 1250); return () => clearInterval(id);
  }, [frames.length]);
  return (
    <div className="relative h-full w-full">
      {frames.map((f, k) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={f} src={f} alt={k === 0 ? alt : ""} className="absolute inset-0 h-full w-full object-contain p-4 transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0 }} loading="lazy" />
      ))}
      <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-widest text-muted">{["H&E", "PathFM", "GigaPath", "UNI"][i]}</span>
    </div>
  );
}

export default function Interests({ items }: { items: Interest[] }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
      {items.map((it, k) => (
        <motion.article key={it.key} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-6%" }}
          transition={{ duration: 0.6, delay: k * 0.07, ease: [0.2, 0.7, 0.2, 1] }} whileHover={{ y: -4 }} data-reveal
          className={`group flex flex-col overflow-hidden rounded-2xl border border-line bg-card ${k < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}>
          <div className={`relative overflow-hidden bg-[#fbfbf8] ${k < 2 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
            {it.key === "rna" ? <div className="h-full bg-card"><RnaDecode /></div> : it.frames ? <Reel frames={it.frames} alt={it.title} /> : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={it.media} alt={`${it.title}: denoising animation`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1.5 p-5">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-xs text-accent">0{k + 1}</span>
              <h3 className="display text-2xl">{it.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted">{it.blurb}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
