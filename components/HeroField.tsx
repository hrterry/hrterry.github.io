"use client";
import { useEffect, useRef, useState } from "react";

/* A particle field that repeatedly "denoises" from Gaussian noise into one of five research motifs
   (two-moons data, a spatial-transcriptomics spot map, an H&E tissue section, an RNA stem-loop, an alpha helix).
   Particles flee the pointer. Pauses off-screen; static under prefers-reduced-motion. */

type Pt = { x: number; y: number; c: string; s: number };
type Motif = { key: string; label: string; note: string; build: (n: number, ctx: BuildCtx) => Pt[] };
type BuildCtx = { col: (v: string) => string; img: ImageData | null };

const HOLD = 2600, FLOW = 1900, MELT = 700;
const rnd = (() => { let s = 12345; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
const gauss = () => { let u = 0, v = 0; while (!u) u = rnd(); while (!v) v = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const lerpHex = (a: string, b: string, t: number) => {
  const p = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
  const A = p(a), B = p(b); return `rgb(${A.map((x, i) => Math.round(x + (B[i] - x) * t)).join(",")})`;
};
const toHex = (c: string) => {
  if (c.startsWith("#") && c.length === 7) return c;
  const m = c.match(/\d+/g); if (!m) return "#0a7a68";
  return "#" + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, "0")).join("");
};

const MOTIFS: Motif[] = [
  {
    key: "generative", label: "Generative models", note: "noise → data manifold",
    build: (n, { col }) => Array.from({ length: n }, (_, i) => {
      const k = i % 2, a = rnd() * Math.PI, r = 0.21 + gauss() * 0.018;
      const x = k ? 0.5 - 0.105 + r * Math.cos(a) : 0.5 + 0.105 - r * Math.cos(a);
      const y = k ? 0.53 - r * Math.sin(a) * 0.95 : 0.47 + r * Math.sin(a) * 0.95;
      return { x, y, c: k ? col("--accent") : col("--violet"), s: 1.5 };
    }),
  },
  {
    key: "omics", label: "Spatial omics", note: "a gene, spot by spot",
    build: (n, { col }) => {
      const pts: Pt[] = []; const step = 0.024, lo = toHex(col("--paper-2")), mid = toHex(col("--accent")), hi = toHex(col("--amber"));
      for (let gy = 0.12; gy < 0.9; gy += step * 0.866) for (let gx = 0.1; gx < 0.9; gx += step) {
        const x = gx + ((Math.round(gy / (step * 0.866)) % 2) * step) / 2, y = gy;
        const dx = (x - 0.5) / 0.37, dy = (y - 0.52) / 0.33, rr = dx * dx + dy * dy + 0.12 * Math.sin(7 * x) * Math.cos(5 * y);
        if (rr > 1) continue;
        const e = Math.exp(-((x - 0.38) ** 2 + (y - 0.4) ** 2) / 0.012) + 0.8 * Math.exp(-((x - 0.63) ** 2 + (y - 0.62) ** 2) / 0.02) + 0.35 * Math.exp(-((x - 0.62) ** 2 + (y - 0.32) ** 2) / 0.006);
        const v = Math.min(1, e);
        pts.push({ x, y, c: v < 0.5 ? lerpHex(lo, mid, v * 2) : lerpHex(mid, hi, (v - 0.5) * 2), s: 3.1 });
      }
      return Array.from({ length: n }, (_, i) => pts[i % pts.length]);
    },
  },
  {
    key: "pathology", label: "Computational pathology", note: "an H&E section",
    build: (n, { img, col }) => {
      if (!img) return MOTIFS[0].build(n, { col, img });
      const { width: W, height: H, data } = img; const pts: Pt[] = []; let guard = 0;
      const sc = Math.min(0.8 / W, 0.82 / H), ox = 0.5 - (W * sc) / 2, oy = 0.5 - (H * sc) / 2;
      while (pts.length < n && guard++ < n * 60) {
        const px = Math.floor(rnd() * W), py = Math.floor(rnd() * H), k = (py * W + px) * 4;
        const r = data[k], g = data[k + 1], b = data[k + 2], a = data[k + 3];
        if (a < 200 || r + g + b > 650) continue;
        pts.push({ x: ox + px * sc, y: oy + py * sc, c: `rgb(${r},${g},${b})`, s: 2.3 });
      }
      return pts.length ? Array.from({ length: n }, (_, i) => pts[i % pts.length]) : MOTIFS[0].build(n, { col, img });
    },
  },
  {
    key: "rna", label: "RNA design", note: "a stem-loop, base by base",
    build: (n) => {
      const BASE = ["#137a5c", "#6c4fb0", "#b85f12", "#2768a4"]; const pts: Pt[] = [];
      const L = 26;
      for (let i = 0; i < L; i++) { const y = 0.82 - i * 0.021; pts.push({ x: 0.455, y, c: BASE[i % 4], s: 4 }); pts.push({ x: 0.545, y, c: BASE[(i + 2) % 4], s: 4 }); }
      for (let i = 0; i <= 18; i++) { const a = Math.PI + (i / 18) * Math.PI; pts.push({ x: 0.5 + 0.075 * Math.cos(a), y: 0.255 + 0.075 * Math.sin(a), c: BASE[i % 4], s: 4 }); }
      for (let i = 0; i < 9; i++) pts.push({ x: 0.43 - i * 0.03, y: 0.84 + Math.sin(i) * 0.01, c: BASE[i % 4], s: 4 });
      const out: Pt[] = [];
      for (let i = 0; i < n; i++) { const p = pts[i % pts.length]; out.push({ ...p, x: p.x + gauss() * 0.005, y: p.y + gauss() * 0.005, s: i < pts.length ? 4 : 1.2 }); }
      return out;
    },
  },
  {
    key: "protein", label: "Protein generation", note: "an α-helix backbone",
    build: (n, { col }) => {
      const a = toHex(col("--violet")), b = toHex(col("--rose"));
      return Array.from({ length: n }, () => {
        const t = rnd(), th = t * Math.PI * 2 * 3.4, R = 0.16, tube = 0.016;
        const z = Math.cos(th), ox = gauss() * tube, oy = gauss() * tube;
        return { x: 0.15 + t * 0.7 + 0.035 * Math.sin(th) + ox, y: 0.5 + Math.sin(th) * R * 0.92 + oy, c: lerpHex(a, b, (z + 1) / 2), s: 1.1 + (z + 1) * 1.15 };
      });
    },
  },
];

export default function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [cur, setCur] = useState(0);
  const tLabel = useRef<HTMLSpanElement>(null);
  const tBar = useRef<HTMLSpanElement>(null);
  const jump = useRef<number | null>(null);

  useEffect(() => {
    const cv = ref.current!; const ctx = cv.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1, N = 0, raf = 0, visible = true;
    let targets: Pt[][] = []; let img: ImageData | null = null;
    let noise: { x: number; y: number }[] = [];
    let px = new Float32Array(0), py = new Float32Array(0), vx = new Float32Array(0), vy = new Float32Array(0), delay = new Float32Array(0);
    let idx = MOTIFS.length - 1, nxt = 0, phase: "hold" | "melt" | "flow" = "flow", t0 = performance.now();
    const pointer = { x: -9, y: -9, on: false };
    let shownRef = -1;
    const css = getComputedStyle(document.documentElement);
    const col = (v: string) => css.getPropertyValue(v).trim() || "#0a7a68";

    const build = () => { targets = MOTIFS.map((m) => m.build(N, { col: (v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim(), img })); };
    const size = () => {
      const r = cv.getBoundingClientRect(); dpr = Math.min(2, devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const n = Math.round(Math.min(2600, Math.max(900, (W * H) / 150)));
      if (n !== N) {
        N = n; noise = Array.from({ length: N }, () => ({ x: 0.5 + gauss() * 0.17, y: 0.5 + gauss() * 0.17 }));
        px = new Float32Array(N); py = new Float32Array(N); vx = new Float32Array(N); vy = new Float32Array(N); delay = new Float32Array(N);
        for (let i = 0; i < N; i++) { px[i] = noise[i].x; py[i] = noise[i].y; delay[i] = rnd() * 0.35; }
        build();
      }
    };
    const loadImg = () => {
      const im = new Image(); im.src = "/assets/img/research-interests/pathology/tenx111-h-and-e.webp";
      im.onload = () => { const c = document.createElement("canvas"); c.width = im.width; c.height = im.height; const x = c.getContext("2d")!; x.drawImage(im, 0, 0); try { img = x.getImageData(0, 0, im.width, im.height); build(); } catch {} };
    };
    const ease = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      if (jump.current != null) {
        const j = jump.current; jump.current = null;
        if (reduce) { idx = j; nxt = (j + 1) % MOTIFS.length; phase = "hold"; for (let i = 0; i < N; i++) { px[i] = targets[idx][i].x; py[i] = targets[idx][i].y; } }
        else if (phase === "hold") { nxt = j; phase = "melt"; t0 = now; }
        else { nxt = j; }
      }
      const el = now - t0;
      if (!reduce) {
        if (phase === "hold" && el > HOLD) { phase = "melt"; t0 = now; }
        else if (phase === "melt" && el > MELT) { phase = "flow"; t0 = now; }
        else if (phase === "flow" && el > FLOW + 350) { phase = "hold"; t0 = now; idx = nxt; nxt = (idx + 1) % MOTIFS.length; }
      }
      const tgt = targets[phase === "flow" ? nxt : idx] || targets[0];
      let tt = 0;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
      const S = Math.min(W, H), ox = (W - S) / 2, oy = (H - S) / 2;
      const mx = (pointer.x - ox) / S, my = (pointer.y - oy) / S;
      for (let i = 0; i < N; i++) {
        let gx: number, gy: number;
        const T = tgt[i];
        if (phase === "flow") {
          const u = Math.min(1, Math.max(0, (el / FLOW - delay[i]) / (1 - 0.35))), e = ease(u);
          gx = noise[i].x + (T.x - noise[i].x) * e; gy = noise[i].y + (T.y - noise[i].y) * e;
          if (i === 0) tt = 1 - Math.min(1, el / FLOW);
        } else if (phase === "melt") {
          const u = ease(Math.min(1, el / MELT)), C = targets[idx][i];
          gx = C.x + (noise[i].x - C.x) * u; gy = C.y + (noise[i].y - C.y) * u;
          if (i === 0) tt = Math.min(1, el / MELT);
        } else {
          const C = targets[idx][i]; const w = reduce ? 0 : 0.0016;
          gx = C.x + Math.sin(now / 900 + i) * w; gy = C.y + Math.cos(now / 1100 + i * 1.3) * w;
        }
        // spring toward the scheduled position + pointer repulsion
        let ax = (gx - px[i]) * 0.16, ay = (gy - py[i]) * 0.16;
        if (pointer.on) { const dx = px[i] - mx, dy = py[i] - my, d2 = dx * dx + dy * dy; if (d2 < 0.012) { const f = (0.012 - d2) * 2.4; ax += dx * f / (Math.sqrt(d2) + 1e-3); ay += dy * f / (Math.sqrt(d2) + 1e-3); } }
        vx[i] = (vx[i] + ax) * 0.62; vy[i] = (vy[i] + ay) * 0.62; px[i] += vx[i]; py[i] += vy[i];
        const P = phase === "flow" ? tgt[i] : targets[idx][i];
        const blend = phase === "hold" ? 1 : phase === "flow" ? Math.min(1, el / FLOW) : 1 - Math.min(1, el / MELT);
        const r = (0.9 + (P.s - 0.9) * blend) * (S / 520);
        ctx.globalAlpha = 0.35 + 0.65 * blend; ctx.fillStyle = blend < 0.15 ? col("--muted") : P.c;
        ctx.fillRect(ox + px[i] * S - r / 2, oy + py[i] * S - r / 2, r, r);
      }
      ctx.globalAlpha = 1;
      const tv = phase === "hold" ? 0 : tt, shown = phase === "hold" ? idx : nxt;
      if (tLabel.current) tLabel.current.textContent = `t = ${tv.toFixed(2)}`;
      if (tBar.current) tBar.current.style.width = `${(1 - tv) * 100}%`;
      if (shown !== shownRef) { shownRef = shown; setCur(shown); }
    };

    size(); loadImg();
    if (reduce) { idx = 0; nxt = 1; phase = "hold"; for (let i = 0; i < N; i++) { px[i] = targets[idx][i].x; py[i] = targets[idx][i].y; } }
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(size); ro.observe(cv);
    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }); io.observe(cv);
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top; pointer.on = true; };
    const leave = () => { pointer.on = false; };
    const vis = () => { visible = !document.hidden; };
    const theme = () => build();
    cv.addEventListener("pointermove", move); cv.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", vis); window.addEventListener("themechange", theme);
    const mq = matchMedia("(prefers-color-scheme: dark)"); mq.addEventListener("change", theme);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); cv.removeEventListener("pointermove", move); cv.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", vis); window.removeEventListener("themechange", theme); mq.removeEventListener("change", theme); };
  }, []);

  return (
    <div className="relative">
      <canvas ref={ref} className="block aspect-square w-full touch-none" role="img"
        aria-label={`Particles denoising from random noise into ${MOTIFS[cur].label.toLowerCase()}: ${MOTIFS[cur].note}`} />
      <div className="pointer-events-none absolute left-0 top-0 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
        <span ref={tLabel} className="num">t = 1.00</span>
        <span className="h-px w-16 overflow-hidden bg-line"><span ref={tBar} className="block h-full bg-accent" style={{ width: "0%" }} /></span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label="Choose a research motif">
        {MOTIFS.map((m, i) => (
          <button key={m.key} type="button" onClick={() => { jump.current = i; }} aria-pressed={i === cur}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${i === cur ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink"}`}>
            {m.label}
          </button>
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">{MOTIFS[cur].note} · move your cursor through it</p>
    </div>
  );
}
