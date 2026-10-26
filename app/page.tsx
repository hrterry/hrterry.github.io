import Link from "next/link";
import HeroField from "@/components/HeroField";
import Interests from "@/components/Interests";
import FigureReel from "@/components/FigureReel";
import RepoCard from "@/components/RepoCard";
import Reveal from "@/components/Reveal";
import { profile, interests, publications, repos, news } from "@/lib/data";
import { listPosts } from "@/lib/content";

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

function SectionHead({ k, title, href, cta }: { k: string; title: string; href?: string; cta?: string }) {
  return (
    <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6 md:mb-12">
      <div>
        <p className="eyebrow mb-3">{k}</p>
        <h2 className="display text-4xl leading-[1.05] md:text-6xl">{title}</h2>
      </div>
      {href && <Link href={href} className="group inline-flex items-center gap-2 text-sm text-muted hover:text-ink">{cta}<span className="transition-transform group-hover:translate-x-1">→</span></Link>}
    </Reveal>
  );
}

export default function Home() {
  const posts = listPosts().slice(0, 3);
  const [neurips, bioflow, spamv] = publications;
  return (
    <>
      {/* Hero */}
      <section className="wrap grid items-center gap-10 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pb-24 md:pt-16">
        <div>
          <p className="eyebrow">{profile.role} · {profile.affiliation}</p>
          <h1 className="display mt-6 text-[clamp(3rem,7.4vw,6.4rem)] leading-[0.95]">
            Generative models<br />for scientific <span className="italic text-accent">discovery.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">{profile.intro}</p>
          <p className="mt-5 text-sm text-muted">
            Research with {profile.mentors.map((m, i) => (
              <span key={m.name}>{i > 0 && " and "}<a href={m.url} target="_blank" rel="noopener" className="text-ink underline decoration-line underline-offset-4 hover:decoration-accent">{m.name}</a> ({m.place})</span>
            ))}.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href={`mailto:${profile.email}`} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:opacity-85">Get in touch</a>
            <a href={profile.github} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-ink">GitHub</a>
            <Link href="/cv/" className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-ink">CV</Link>
          </div>
        </div>
        <HeroField />
      </section>

      {/* Highlights ticker */}
      <section aria-label="Recent highlights" className="border-y border-line bg-paper-2/60">
        <div className="wrap grid divide-line py-5 sm:grid-cols-3 sm:divide-x">
          {[["NeurIPS 2026", "Flow matching for deterministic prediction"], ["MICCAI 2026", "BioFlow"], ["Nature Communications 2026", "SpaMV"]].map(([v, t]) => (
            <div key={v} className="py-2 sm:px-6 first:sm:pl-0">
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{v}</p>
              <p className="mt-1 text-sm">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="wrap grid gap-10 py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-16 md:py-32">
        <Reveal>
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-line">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={profile.photo} alt="Portrait of Haron Xu" className="aspect-[3/4] w-full object-cover" loading="lazy" />
          </div>
        </Reveal>
        <div>
          <Reveal><p className="eyebrow mb-6">About</p></Reveal>
          <Reveal delay={0.05}>
            <p className="display text-3xl leading-snug md:text-[2.6rem] md:leading-[1.2]">
              {profile.question.split(",")[0]},<span className="text-muted">{profile.question.slice(profile.question.indexOf(",") + 1)}</span>
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 text-[15px] leading-relaxed text-muted md:grid-cols-2">
            {profile.bio.map((b, i) => <Reveal key={i} delay={0.1 + i * 0.05}><p>{b}</p></Reveal>)}
          </div>
          <Reveal delay={0.2} className="mt-8"><p className="text-sm">{profile.program}</p></Reveal>
        </div>
      </section>

      {/* Research */}
      <section className="wrap pb-24 md:pb-32">
        <SectionHead k="Research interests" title="Five systems, one question." href="/research/" cta="Read the research stories" />
        <Interests items={interests} />
      </section>

      {/* Publications */}
      <section className="wrap pb-24 md:pb-32">
        <SectionHead k="Selected publications" title="Published work." href="/publications/" cta="All publications" />
        <Reveal className="mb-6 grid gap-6 rounded-2xl border border-line bg-card p-6 md:grid-cols-[auto_1fr] md:p-10">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">{neurips.venue} {neurips.year}</div>
          <div>
            <h3 className="display text-3xl leading-tight md:text-4xl">{neurips.title}</h3>
            <p className="mt-4 max-w-3xl text-muted">{neurips.summary}</p>
            <div className="mt-5 flex gap-3">{neurips.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener" className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-ink">{l.label} ↗</a>)}</div>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          {[bioflow, spamv].map((p, k) => (
            <Reveal key={p.key} delay={k * 0.08} className="flex flex-col rounded-2xl border border-line bg-card p-5 md:p-7">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">{p.venue} {p.year}</span>
                <span className="font-mono text-xs text-muted">{p.label}</span>
              </div>
              <h3 className="display mt-3 text-4xl">{p.short}</h3>
              <p className="mt-2 text-sm text-muted">{p.title}</p>
              <div className="mt-5">{p.figures && <FigureReel figures={p.figures} label={`${p.short} figures`} />}</div>
              <div className="mt-4 flex flex-wrap gap-2">{p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener" className="rounded-full border border-line px-3.5 py-1 text-sm hover:border-ink">{l.label} ↗</a>)}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Open source */}
      <section className="wrap pb-24 md:pb-32">
        <SectionHead k="Open source" title="Tools for research with agents." href="/open-source/" cta="All projects" />
        <div className="grid gap-5 md:grid-cols-3">
          {repos.map((r, k) => <Reveal key={r.repo} delay={k * 0.07} className="flex"><RepoCard r={r} /></Reveal>)}
        </div>
      </section>

      {/* News + writing */}
      <section className="wrap grid gap-14 pb-12 lg:grid-cols-2">
        <div>
          <SectionHead k="News" title="Recently." href="/news/" cta="All news" />
          <ol className="relative border-l border-line pl-6">
            {news.map((n, k) => (
              <Reveal as="li" key={n.date} delay={k * 0.05} className="relative pb-7 last:pb-0">
                <span className="absolute -left-[29px] top-1.5 size-2.5 rounded-full border-2 border-paper bg-accent" />
                <time className="font-mono text-xs text-muted" dateTime={n.date}>{fmt(n.date)}</time>
                <p className="mt-1 leading-relaxed [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 hover:[&_a]:decoration-accent" dangerouslySetInnerHTML={{ __html: n.html }} />
              </Reveal>
            ))}
          </ol>
        </div>
        <div>
          <SectionHead k="Writing" title="Notes & essays." href="/blog/" cta="All writing" />
          <div className="divide-y divide-line">
            {posts.map((p, k) => (
              <Reveal key={p.slug} delay={k * 0.06}>
                <Link href={`/blog/${p.year}/${p.slug}/`} className="group block py-5 first:pt-0">
                  <p className="font-mono text-xs text-muted">{fmt(p.date)} · {p.minutes} min read</p>
                  <h3 className="display mt-1.5 text-2xl leading-snug transition-colors group-hover:text-accent">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-2 text-sm text-muted">{p.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
