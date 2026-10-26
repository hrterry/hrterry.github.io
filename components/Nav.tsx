"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/research/", label: "Research" },
  { href: "/publications/", label: "Publications" },
  { href: "/open-source/", label: "Open source" },
  { href: "/blog/", label: "Writing" },
  { href: "/cv/", label: "CV" },
];

export default function Nav() {
  const path = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  const active = (h: string) => path.startsWith(h);

  return (
    <header className={`sticky top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ${scrolled ? "border-b border-line bg-paper/80 backdrop-blur-xl" : "border-b border-transparent"}`} style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}>
      <div className="wrap flex h-16 items-center gap-6">
        <Link href="/" className="group flex items-center gap-2.5 font-medium tracking-tight">
          <span aria-hidden className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-ink text-[11px] font-semibold text-paper">
            <span className="absolute inset-0 bg-[conic-gradient(from_210deg,var(--accent),var(--amber),var(--rose),var(--violet),var(--accent))] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative">HX</span>
          </span>
          <span>Haron Xu</span>
        </Link>
        <nav aria-label="Main" className="ml-auto hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${active(l.href) ? "text-paper" : "text-muted hover:text-ink"}`}>
              {active(l.href) && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <ThemeToggle />
          <button type="button" className="grid size-9 place-items-center rounded-full border border-line md:hidden" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-px w-4 bg-ink transition ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-4 bg-ink transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-4 bg-ink transition ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Main (mobile)" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-line bg-paper md:hidden">
            <div className="wrap flex flex-col py-3">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className={`py-2.5 text-lg ${active(l.href) ? "text-accent" : "text-ink"}`}>{l.label}</Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
