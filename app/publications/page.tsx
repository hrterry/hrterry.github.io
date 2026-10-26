import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import FigureReel from "@/components/FigureReel";
import Reveal from "@/components/Reveal";
import { publications } from "@/lib/data";

export const metadata: Metadata = { title: "Publications", description: "Papers in generative modeling, spatial omics and computational biology." };

export default function Publications() {
  return (
    <>
      <PageHead k="Publications" title={<>Papers, <span className="italic text-accent">figure by figure.</span></>}
        lede="Machine-learning methods that respect biological structure: what generative objectives teach multimodal models, support-preserving flows for spatial transcriptomics, and interpretable integration of spatial multi-omics." />
      <div className="wrap space-y-24 md:space-y-32">
        {publications.map((p, k) => (
          <Reveal as="article" key={p.key} className="grid gap-8 border-t border-line pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-14">
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
                <span className="text-accent">0{k + 1}</span><span className="text-muted">{p.label}</span>
              </div>
              <h2 className="display mt-5 text-5xl leading-none md:text-6xl">{p.short}</h2>
              <p className="mt-4 text-lg leading-snug">{p.title}</p>
              {p.authors && <p className="mt-3 text-sm text-muted" dangerouslySetInnerHTML={{ __html: p.authors.replace("Haoran Xu", '<b class="text-ink">Haoran Xu</b>') }} />}
              <p className="mt-3 inline-block rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">{p.venue} · {p.year}</p>
              <p className="mt-6 leading-relaxed text-muted">{p.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">{p.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noopener" className="rounded-full border border-line px-4 py-1.5 text-sm hover:border-ink">{l.label} ↗</a>)}</div>
            </div>
            <div>{p.figures ? <FigureReel figures={p.figures} label={`${p.short} figures`} /> : (
              <div className="grid aspect-[16/10] place-items-center rounded-2xl border border-dashed border-line bg-card p-8 text-center">
                <p className="display max-w-md text-2xl text-muted">Figures will appear here with the camera-ready version.</p>
              </div>
            )}</div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
