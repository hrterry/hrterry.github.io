import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { news } from "@/lib/data";

export const metadata: Metadata = { title: "News" };
const fmt = (d: string) => new Date(d + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function News() {
  return (
    <>
      <PageHead k="News" title={<>What&apos;s <span className="italic text-accent">new.</span></>} />
      <section className="wrap">
        <ol className="border-t border-line">
          {news.map((n, k) => (
            <Reveal as="li" key={n.date} delay={k * 0.04} className="grid gap-2 border-b border-line py-7 md:grid-cols-[12rem_1fr] md:gap-8">
              <time className="font-mono text-sm text-muted" dateTime={n.date}>{fmt(n.date)}</time>
              <p className="text-lg leading-relaxed [&_a]:underline [&_a]:decoration-line [&_a]:underline-offset-4 hover:[&_a]:decoration-accent" dangerouslySetInnerHTML={{ __html: n.html }} />
            </Reveal>
          ))}
        </ol>
      </section>
    </>
  );
}
