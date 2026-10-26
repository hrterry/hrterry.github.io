import Reveal from "./Reveal";

export default function PageHead({ k, title, lede }: { k: string; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <header className="wrap pb-12 pt-14 md:pb-16 md:pt-24">
      <Reveal><p className="eyebrow">{k}</p></Reveal>
      <Reveal delay={0.05}><h1 className="display mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5.2rem)] leading-[1]">{title}</h1></Reveal>
      {lede && <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{lede}</p></Reveal>}
    </header>
  );
}
