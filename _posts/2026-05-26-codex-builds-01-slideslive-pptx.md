---
layout: post
title: Rebuilding a hidden SlidesLive deck into a PPTX with Codex
date: 2026-05-26 09:00:00 -0400
description: Discovering a hidden slide manifest, rebuilding a deck, merging reveal frames, and preserving the workflow as a reusable skill.
tags: codex automation presentations
categories: research-workflows
---

This is the first post in a small series on using Codex to finish concrete tasks and preserve the resulting workflow as reusable skills. The task this time was simple to state: download a SlidesLive deck from a page that does not provide a download button.

The interesting part was not merely getting the file. It was turning a one-off exploration into a repeatable pattern: inspect the player, identify the hidden slide manifest, reconstruct the image URLs, rebuild a PPTX, compress incremental reveal frames, and save the whole method as a Codex skill.

## The target

The input was a public SlidesLive talk page:

    https://slideslive.com/38935785/offline-reinforcement-learning-from-algorithms-to-practical-challenges

The desired output had four parts:

- a local PPTX that can be opened normally,
- high-resolution slide images,
- a compact version that removes incremental reveal frames,
- a reusable skill so the next deck does not require fresh exploration.

## Finding the hidden manifest

The ordinary SlidesLive page did not expose a download link, but the embedded player page did reveal what the browser preloads:

    https://slideslive.com/embed/presentation/38935785

Inside the embed HTML, the key asset was:

    https://s.slideslive.com/38935785/v7/slides.json?1650711788

This `slides.json` file lists the image slide names and timestamps. A typical entry looks like this:

    {
      "type": "image",
      "image": {
        "name": "6fbe2879-a5e1-4be8-8b66-5a850adfea6e__0-0002"
      },
      "time": 0
    }

The same page also exposes player configuration:

    gon.hosts.slideslive_on_the_fly_resized_slides_host = "slideslive-slides.b-cdn.net"
    gon.use_bunny_cdn_for_player_image_slides = true

That was enough to stop guessing. The deck was being served as images, and the player script showed how to reconstruct the URLs.

## Reconstructing image URLs

The Bunny CDN URL pattern is:

    https://{slide_host}/{presentation_id}/slides/original/{image.name}.png?class={quality}

For example:

    https://slideslive-slides.b-cdn.net/38935785/slides/original/6fbe2879-a5e1-4be8-8b66-5a850adfea6e__0-0002.png?class=2160

One small but important detail: although the manifest mentions `big` and `medium`, the CDN accepted numeric classes such as `540`, `1080`, and `2160`. Requesting `class=big` returned a 403.

## Rebuilding the PPTX

Once the slide images were downloaded, rebuilding the deck was straightforward. Each image became a full-slide background in a widescreen PPTX:

    const pptx = new PptxGenJS();
    pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333333, height: 7.5 });
    pptx.layout = "CUSTOM_WIDE";

    for (const file of slideImages) {
      const slide = pptx.addSlide();
      slide.background = { color: "FFFFFF" };
      slide.addImage({ path: file, x: 0, y: 0, w: 13.333333, h: 7.5 });
    }

The resulting PPTX is visually faithful, but the text is not editable: SlidesLive exposes rasterized slide images, not the original PowerPoint source file.

## Merging reveal frames

Lecture slides often advance in small increments: one bullet appears, then another formula, then an annotation. A raw export preserves every frame, but a reader usually wants the final, information-complete page.

The merge pass compares adjacent images at a lower resolution and classifies changed pixels as:

- `added`: a previously blank region now contains content,
- `removed`: content disappeared into a blank region,
- `modified`: non-blank content changed color or shape.

If the difference is mostly additive, with little removal or modification, the earlier frame is dropped and the later frame is kept. In this deck, the raw scrape produced 637 image frames. The compact version kept 97 slides.

## The reusable skill

The workflow is now packaged as a Codex skill called `slideslive-pptx`.

It includes:

- the discovery path for SlidesLive embed pages,
- the hidden `slides.json` manifest pattern,
- the CDN URL reconstruction rule,
- a script for rebuilding PPTX files,
- a script for merging incremental reveal frames.

That is the core pattern I want this series to capture: use Codex to solve the immediate task, then preserve the useful path so the next attempt starts from a better place.
