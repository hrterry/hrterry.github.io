import type { Metadata } from "next";
import Link from "next/link";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { profile, publications, repos } from "@/lib/data";

export const metadata: Metadata = { title: "CV" };

function Row({ when, children }: { when: string; children: React.ReactNode }) {
  return (
    <Reveal as="li" className="grid gap-1 border-b border-line py-5 md:grid-cols-[10rem_1fr] md:gap-8">
      <span className="font-mono text-sm text-muted">{when}</span>
      <div>{children}</div>
    </Reveal>
  );
}

export default function CV() {
  return (
    <>
      <PageHead k="Curriculum vitae" title={profile.name} lede={<>{profile.role}, {profile.affiliation}. Contact <a className="text-accent underline underline-offset-4" href={`mailto:${profile.email}`}>{profile.email}</a>.</>} />
      <div className="wrap grid gap-16">
        <section>
          <h2 className="eyebrow mb-4">Education</h2>
          <ul className="border-t border-line">
            <Row when="Expected 2027"><p className="font-medium">Sichuan University</p><p className="text-muted">B.Eng., Biomedical Engineering — Medical Information Engineering</p></Row>
          </ul>
        </section>
        <section>
          <h2 className="eyebrow mb-4">Research</h2>
          <ul className="border-t border-line">
            {profile.mentors.map((m) => (
              <Row key={m.name} when={m.place}><p className="font-medium">Research with <a className="underline decoration-line underline-offset-4 hover:decoration-accent" href={m.url} target="_blank" rel="noopener">{m.name}</a></p><p className="text-muted">Generative models for spatial omics, computational pathology and biological sequence design.</p></Row>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="eyebrow mb-4">Publications</h2>
          <ul className="border-t border-line">
            {publications.map((p) => (
              <Row key={p.key} when={`${p.venue} ${p.year}`}>
                <p className="font-medium">{p.title}</p>
                {p.authors && <p className="mt-1 text-sm text-muted">{p.authors}</p>}
              </Row>
            ))}
          </ul>
          <p className="mt-4 text-sm"><Link href="/publications/" className="text-accent underline underline-offset-4">Publications with figures →</Link></p>
        </section>
        <section>
          <h2 className="eyebrow mb-4">Open source</h2>
          <ul className="border-t border-line">
            {repos.map((r) => (
              <Row key={r.repo} when={r.role === "Lead" ? "Creator" : "Collaborator"}><p className="font-medium"><a className="underline decoration-line underline-offset-4 hover:decoration-accent" href={`https://github.com/${r.repo}`} target="_blank" rel="noopener">{r.name}</a></p><p className="text-muted">{r.tagline}</p></Row>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
