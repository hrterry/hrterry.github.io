import Link from "next/link";
import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Interests from "@/components/Interests";
import Reveal from "@/components/Reveal";
import { listResearch } from "@/lib/content";
import { interests, profile } from "@/lib/data";

export const metadata: Metadata = { title: "Research", description: "Research stories across generative modeling, biological representation learning and scientific foundation models." };

export default function ResearchPage() {
  const items = listResearch();
  return (
    <>
      <PageHead k="Research" title={<>Structure in, <span className="italic text-accent">structure out.</span></>} lede={profile.question} />
      <section className="wrap">
        <ol className="border-t border-line">
          {items.map((r, k) => (
            <Reveal as="li" key={r.slug} delay={k * 0.05}>
              <Link href={`/research/${r.slug}/`} className="group grid gap-3 border-b border-line py-8 md:grid-cols-[5rem_1fr_auto] md:items-baseline md:gap-8">
                <span className="font-mono text-sm text-accent">0{k + 1}</span>
                <span>
                  <span className="display block text-3xl leading-tight transition-colors group-hover:text-accent md:text-4xl">{r.title}</span>
                  <span className="mt-2 block max-w-2xl text-muted">{r.description}</span>
                </span>
                <span className="text-2xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-ink" aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="wrap pt-24">
        <Reveal><p className="eyebrow mb-8">Systems I work on</p></Reveal>
        <Interests items={interests} />
      </section>
    </>
  );
}
