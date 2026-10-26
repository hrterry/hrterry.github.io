import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { listPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Writing", description: "Research essays and field notes on generative modeling, AI agents and scientific discovery." };

const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const KIND: Record<string, string> = { research: "Research", essays: "Essay", "research-workflows": "Workflow", "quick-notes": "Note" };

export default function Blog() {
  const posts = listPosts();
  return (
    <>
      <PageHead k="Writing" title={<>Ideas behind <span className="italic text-accent">the work.</span></>}
        lede="Longer reflections on generative modeling, biological AI and the future of research, alongside short notes on tools and workflows worth keeping." />
      <section className="wrap">
        <ol className="border-t border-line">
          {posts.map((p, k) => (
            <Reveal as="li" key={p.slug} delay={Math.min(k, 6) * 0.04}>
              <Link href={`/blog/${p.year}/${p.slug}/`} className="group grid gap-2 border-b border-line py-7 md:grid-cols-[9rem_1fr_7rem] md:gap-8">
                <span className="font-mono text-xs text-muted md:pt-2"><time dateTime={p.date}>{fmt(p.date)}</time></span>
                <span>
                  <span className="display block text-2xl leading-snug transition-colors group-hover:text-accent md:text-3xl">{p.title}</span>
                  <span className="mt-2 block max-w-2xl text-muted">{p.description}</span>
                </span>
                <span className="font-mono text-xs text-muted md:pt-2 md:text-right">{KIND[p.category] ?? "Note"} · {p.minutes} min</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
