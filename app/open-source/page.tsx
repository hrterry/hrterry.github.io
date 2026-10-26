import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import RepoCard from "@/components/RepoCard";
import Reveal from "@/components/Reveal";
import { repos } from "@/lib/data";

export const metadata: Metadata = { title: "Open source", description: "Open-source tools for doing research with AI agents: Zmind+, Zmind and Zotero Paper Coach." };

export default function OpenSource() {
  const [lead, ...rest] = repos;
  return (
    <>
      <PageHead k="Open source" title={<>Tools for research <span className="italic text-accent">with agents.</span></>}
        lede="I build open tools for the way research is changing: supervising many agents at once, thinking on shared canvases, and reading papers with a coach in the margin. Stars and update times below are live from GitHub." />
      <section className="wrap grid gap-6">
        <Reveal className="grid"><RepoCard r={lead} big /></Reveal>
        <div className="grid gap-6 md:grid-cols-2">{rest.map((r, k) => <Reveal key={r.repo} delay={0.06 * (k + 1)} className="flex"><RepoCard r={r} big /></Reveal>)}</div>
      </section>
    </>
  );
}
