import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getResearch, listResearch } from "@/lib/content";
import Reveal from "@/components/Reveal";

export function generateStaticParams() { return listResearch().map((r) => ({ slug: r.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = await getResearch((await params).slug);
  return r ? { title: r.title, description: r.description } : {};
}

export default async function ResearchStory({ params }: { params: Promise<{ slug: string }> }) {
  const r = await getResearch((await params).slug);
  if (!r) notFound();
  const all = listResearch(); const i = all.findIndex((x) => x.slug === r.slug); const next = all[(i + 1) % all.length];
  return (
    <article>
      <header className="wrap pb-10 pt-14 md:pt-24">
        <Reveal><Link href="/research/" className="eyebrow hover:text-ink">← Research</Link></Reveal>
        <Reveal delay={0.05}><h1 className="display mt-6 max-w-4xl text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[1.02]">{r.title}</h1></Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-muted">{r.description}</p></Reveal>
      </header>
      <div className="wrap"><div className="prose border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: r.html }} /></div>
      <nav className="wrap mt-20">
        <Link href={`/research/${next.slug}/`} className="group block rounded-2xl border border-line bg-card p-7 md:p-10">
          <p className="eyebrow">Next story</p>
          <p className="display mt-3 text-3xl transition-colors group-hover:text-accent md:text-4xl">{next.title} →</p>
        </Link>
      </nav>
    </article>
  );
}
