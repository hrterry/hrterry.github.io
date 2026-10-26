# Agent notes

- Plain Next.js 16 App Router site with `output: "export"` (see `next.config.ts`); no server features (no API routes, no server actions, no image optimisation).
- Content lives in `lib/data.ts`, `content/posts/*.md`, `content/research/*.md`; keep URLs stable (`/blog/YYYY/slug/`, `/research/slug/`, `/publications/`, `/cv/`).
- Styling: Tailwind v4 utilities + CSS variables in `app/globals.css`; every colour comes from a token, light and dark.
- Check: `npm run build` must pass (type-check included). Deploy happens in CI on push to `main`.
