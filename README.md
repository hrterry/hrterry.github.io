# Haron Xu — research homepage

Source for [hrterry.github.io](https://hrterry.github.io). Next.js (App Router, static export) + TypeScript + Tailwind CSS + Motion.

## Edit content

| What | Where |
|---|---|
| Profile, research interests, publications, open-source projects, news | `lib/data.ts` |
| Blog posts | `content/posts/YYYY-MM-DD-slug.md` (front matter: `title`, `description`, `tags`, `categories`) → `/blog/YYYY/slug/` |
| Research stories | `content/research/<slug>.md` → `/research/<slug>/` |
| Images and files | `public/assets/...` → served at `/assets/...` |
| Colours and type | `app/globals.css` (design tokens at the top) |
| Hero animation | `components/HeroField.tsx` |

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `./out` to the `gh-pages` branch served by GitHub Pages.
