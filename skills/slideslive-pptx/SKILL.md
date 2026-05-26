---
name: slideslive-pptx
description: Download SlidesLive presentations that do not expose a download button, reconstruct them as PPTX from hidden slide images, and optionally merge incremental reveal frames so only final/additive slides remain. Use when the user asks to scrape, download, save, rebuild, or compress PPT/PPTX/slides from a slideslive.com URL.
metadata:
  short-description: Rebuild and merge SlidesLive decks
---

# SlidesLive PPTX

Use this skill for SlidesLive pages where the UI has no download button.

## Workflow

1. Fetch the embed page:
   `https://slideslive.com/embed/presentation/{presentation_id}`
2. Extract:
   - `https://s.slideslive.com/{presentation_id}/v*/slides.json?...`
   - `gon.hosts.slideslive_on_the_fly_resized_slides_host`, usually `slideslive-slides.b-cdn.net`
   - `gon.use_bunny_cdn_for_player_image_slides`
3. Fetch `slides.json`.
4. If the deck uses image slides, reconstruct URLs with the player rule:
   - Bunny CDN: `https://{slide_host}/{presentation_id}/slides/original/{image.name}{ext}?class={quality}`
   - Prefer `quality=2160`; if blocked or huge, use `1080`.
   - Do not use `class=big`; the player maps to numeric classes.
   - Default `ext` is `.png` unless `image.extname` exists.
5. Download slide images.
6. Build a PPTX with one full-slide image per page.
7. If asked to remove incremental animation/reveal frames, run the merge script on the downloaded images.

## Scripts

Copy or adapt these bundled scripts into the working directory:

- `scripts/rebuild_slideslive_pptx.mjs`: download image slides and create a PPTX.
- `scripts/merge_reveal_frames.mjs`: remove adjacent additive/duplicate frames and create a compact PPTX plus CSV report.

The scripts expect bundled workspace Node dependencies. If package resolution fails, use `load_workspace_dependencies` and point imports to the pnpm package paths for `pptxgenjs` and `sharp`.

## Notes

- The reconstructed PPTX preserves visual content but text is not editable because SlidesLive exposes raster slide images, not the source `.pptx`.
- For long decks, rerunning the rebuild script should skip existing images.
- If a CDN request returns 403, verify the quality class is numeric (`2160`, `1080`, `540`) and include a SlidesLive `Referer` plus browser `User-Agent`.
