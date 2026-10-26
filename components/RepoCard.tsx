"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Repo } from "@/lib/data";

// Live GitHub stats (stars, forks, last push) with the static values as fallback; a light 3D tilt follows the pointer.
export default function RepoCard({ r, big = false }: { r: Repo; big?: boolean }) {
  const [stats, setStats] = useState<{ stars: number; forks?: number; pushed?: string } | null>(null);
  useEffect(() => {
    let dead = false;
    const key = `gh:${r.repo}`;
    try { const c = JSON.parse(sessionStorage.getItem(key) || "null"); if (c && Date.now() - c.at < 36e5) { setStats(c.v); return; } } catch {}
    fetch(`https://api.github.com/repos/${r.repo}`).then((x) => (x.ok ? x.json() : null)).then((d) => {
      if (dead || !d) return;
      const v = { stars: d.stargazers_count, forks: d.forks_count, pushed: d.pushed_at };
      setStats(v); try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), v })); } catch {}
    }).catch(() => {});
    return () => { dead = true; };
  }, [r.repo]);
  const el = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0.5), my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`), glowY = useTransform(my, (v) => `${v * 100}%`);
  const onMove = (e: React.PointerEvent) => { const b = el.current!.getBoundingClientRect(); mx.set((e.clientX - b.left) / b.width); my.set((e.clientY - b.top) / b.height); };
  const stars = stats?.stars ?? r.stars;
  const days = stats?.pushed ? Math.max(0, Math.round((Date.now() - new Date(stats.pushed).getTime()) / 864e5)) : null;
  return (
    <motion.a ref={el} href={`https://github.com/${r.repo}`} target="_blank" rel="noopener" onPointerMove={onMove} onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card p-6 ${big ? "md:p-8" : ""}`}>
      <motion.span aria-hidden className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: useTransform([glowX, glowY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, color-mix(in srgb, ${r.accent} 16%, transparent), transparent 60%)`) }} />
      <div className="relative flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        <span className="size-2 rounded-full" style={{ background: r.accent }} />
        <span>{r.role === "Lead" ? "Creator" : "Collaborator"}</span>
        <span className="ml-auto normal-case tracking-normal">{r.repo}</span>
      </div>
      <h3 className={`display relative mt-5 ${big ? "text-4xl" : "text-3xl"}`}>{r.name}</h3>
      <p className="relative mt-2 text-[15px] font-medium leading-snug">{r.tagline}</p>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">{r.description}</p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {r.tags.map((t) => <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">{t}</span>)}
      </div>
      <div className="relative mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-6 font-mono text-xs text-muted">
        <span className="flex items-center gap-1.5 text-ink"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6L2.5 9.4l6.6-.8z" /></svg><span className="num">{stars}</span></span>
        <span className="whitespace-nowrap">{r.lang}</span><span className="whitespace-nowrap">{r.license}</span>
        {days != null && <span className="ml-auto whitespace-nowrap">{days === 0 ? "today" : `${days}d ago`}</span>}
        <span className={`${days != null ? "" : "ml-auto"} translate-x-0 transition-transform group-hover:translate-x-1`} aria-hidden>↗</span>
      </div>
    </motion.a>
  );
}
