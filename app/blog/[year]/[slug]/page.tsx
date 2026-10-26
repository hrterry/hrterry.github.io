import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, listPosts } from "@/lib/content";
import ReadingProgress from "@/components/ReadingProgress";

export function generateStaticParams() { return listPosts().map((p) => ({ year: p.year, slug: p.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ year: string; slug: string }> }): Promise<Metadata> {
  const { year, slug } = await params; const p = await getPost(year, slug);
  return p ? { title: p.title, description: p.description, openGraph: { title: p.title, description: p.description, type: "article" } } : {};
}

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ year: string; slug: string }> }) {
  const { year, slug } = await params; const p = await getPost(year, slug);
  if (!p) notFound();
  const all = listPosts(); const i = all.findIndex((x) => x.slug === p.slug);
  const newer = all[i - 1], older = all[i + 1];
  return (
    <article>
      <ReadingProgress />
      <header className="wrap pb-10 pt-14 md:pt-24">
        <Link href="/blog/" className="eyebrow hover:text-ink">← Writing</Link>
        <h1 className="display mt-6 max-w-4xl text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.04]">{p.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">{p.description}</p>
        <p className="mt-6 font-mono text-xs text-muted"><time dateTime={p.date}>{fmt(p.date)}</time> · {p.minutes} min read{p.tags.length ? ` · ${p.tags.join(" · ")}` : ""}</p>
      </header>
      <div className="wrap"><div className="prose border-t border-line pt-10" dangerouslySetInnerHTML={{ __html: p.html }} /></div>
      <nav className="wrap mt-20 grid gap-4 md:grid-cols-2" aria-label="More writing">
        {older && <Link href={`/blog/${older.year}/${older.slug}/`} className="group rounded-2xl border border-line bg-card p-6"><p className="eyebrow">Previous</p><p className="display mt-2 text-2xl group-hover:text-accent">{older.title}</p></Link>}
        {newer && <Link href={`/blog/${newer.year}/${newer.slug}/`} className="group rounded-2xl border border-line bg-card p-6 md:col-start-2 md:text-right"><p className="eyebrow">Next</p><p className="display mt-2 text-2xl group-hover:text-accent">{newer.title}</p></Link>}
      </nav>
    </article>
  );
}
