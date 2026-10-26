import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] place-content-center py-24 text-center">
      <p className="eyebrow">404 · t = 1.00</p>
      <h1 className="display mt-5 text-6xl md:text-7xl">Still pure noise.</h1>
      <p className="mx-auto mt-5 max-w-md text-muted">This page never denoised into anything. The homepage did.</p>
      <p className="mt-8"><Link href="/" className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper">Back to the homepage</Link></p>
    </section>
  );
}
