import Link from "next/link";
import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="display text-3xl leading-tight md:text-4xl">From noise <span className="italic text-accent">to structure.</span></p>
          <p className="mt-3 max-w-sm text-sm text-muted">Generative models for science, built to respect what biology already knows.</p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Contact</p>
          <ul className="space-y-1.5">
            <li><a className="hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="hover:text-accent" href={profile.github} target="_blank" rel="noopener">github.com/hrterry</a></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Site</p>
          <ul className="grid grid-cols-2 gap-1.5">
            {[["Research", "/research/"], ["Publications", "/publications/"], ["Open source", "/open-source/"], ["Writing", "/blog/"], ["News", "/news/"], ["CV", "/cv/"]].map(([l, h]) => (
              <li key={h}><Link className="hover:text-accent" href={h}>{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="wrap flex flex-wrap justify-between gap-2 pb-10 text-xs text-muted" style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom, 0px))" }}>
        <span>© {new Date().getFullYear()} Haoran Xu</span>
        <span className="font-mono">Built with Next.js · hand-drawn canvas</span>
      </div>
    </footer>
  );
}
