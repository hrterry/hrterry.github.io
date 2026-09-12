---
layout: about
title: About
permalink: /
subtitle: Undergraduate Researcher · Sichuan University
nav: false
nav_order: 0

profile:
  align: right
  image: photo.jpg
  image_circular: false
  more_info:

selected_papers: false # rendered explicitly below to control section order and title
social: true # includes social icons at the bottom of the page

announcements:
  enabled: false
  scrollable: false
  limit: 5

latest_posts:
  enabled: false
  scrollable: false
  limit: 3
---

<div class="academic-role">Biomedical Engineering · Medical Information Engineering · Class of 2027</div>

<div class="research-intro" markdown="1">

I am an undergraduate researcher at **Sichuan University**, working on **generative models** for scientific discovery.

My research spans biological sequence design, spatial omics, and computational pathology. I am particularly interested in structured generation, multimodal representation learning, and post-training scientific foundation models with verifiable biological feedback.

I conduct research with [Prof. Rex Ying](https://www.cs.yale.edu/homes/ying-rex/) at Yale University and Prof. Xiao Han at Sichuan University.

</div>

<div class="academic-links">
  <a href="mailto:xhr2023@stu.scu.edu.cn"><i class="fa-solid fa-envelope"></i> Email</a>
  <a href="https://github.com/hrterry" rel="external nofollow noopener" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
  <a href="{{ '/cv/' | relative_url }}"><i class="fa-regular fa-file-lines"></i> CV</a>
</div>

## Research Interests

<div class="interest-visual-grid">
  <article class="interest-visual-card interest-visual-card--generative">
    <header>
      <span class="interest-visual-index">01</span>
      <h3>Generative Models</h3>
    </header>
    <div class="interest-visual-stage">
      <img
        src="{{ '/assets/img/research-interests/generative-models/denoising-5s.gif' | relative_url }}"
        alt="A natural image emerging from noise through a generative denoising process"
        loading="eager"
      >
    </div>
  </article>

  <article class="interest-visual-card interest-visual-card--gene">
    <header>
      <span class="interest-visual-index">02</span>
      <h3>Spatial Omics</h3>
    </header>
    <div class="interest-visual-stage">
      <img
        src="{{ '/assets/img/research-interests/spatial-omics/gene-denoising.gif' | relative_url }}"
        alt="Gene-expression heatmap emerging through a diffusion denoising process"
        loading="eager"
      >
    </div>
  </article>

  <article class="interest-visual-card interest-visual-card--pathology">
    <header>
      <span class="interest-visual-index">03</span>
      <h3>Pathology</h3>
    </header>
    <div class="interest-visual-stage pathology-reel" aria-label="COAD TENX111 histology and pathology representations completing one rotation every five seconds">
      <img
        src="{{ '/assets/img/research-interests/pathology/tenx111-h-and-e.webp' | relative_url }}"
        alt="Low-resolution H&E whole-slide image of COAD TENX111 tissue"
        loading="eager"
      >
      <img
        src="{{ '/assets/img/research-interests/pathology/genbio-pathfm.webp' | relative_url }}"
        alt="COAD TENX111 tissue represented by GenBio PathFM PCA colors"
        loading="eager"
      >
      <img
        src="{{ '/assets/img/research-interests/pathology/gigapath.webp' | relative_url }}"
        alt="COAD TENX111 tissue represented by GigaPath PCA colors"
        loading="eager"
      >
      <img
        src="{{ '/assets/img/research-interests/pathology/uni.webp' | relative_url }}"
        alt="COAD TENX111 tissue represented by UNI PCA colors"
        loading="eager"
      >
    </div>
  </article>

  <article class="interest-visual-card interest-visual-card--rna">
    <header>
      <span class="interest-visual-index">04</span>
      <h3>RNA Design</h3>
    </header>
    <div
      class="interest-visual-stage rna-denoising"
      data-rna-sequence="GGGACUUACGCAAGGUUACGUGCAAUCCGAGAGCUAUGGCCUACGUAA"
      aria-label="Schematic discrete-diffusion decoding from masked tokens to an RNA sequence"
    >
      <div class="rna-token-grid" aria-hidden="true"></div>
    </div>
  </article>

  <article class="interest-visual-card interest-visual-card--protein">
    <header>
      <span class="interest-visual-index">05</span>
      <h3>Protein Generation</h3>
    </header>
    <div class="interest-visual-stage">
      <img
        src="{{ '/assets/img/research-interests/protein-generation/rfdiffusion-denoising.webp' | relative_url }}"
        alt="A protein backbone emerging through the RFdiffusion denoising process"
        loading="eager"
      >
    </div>
  </article>
</div>

<script>
  (() => {
    const root = document.querySelector(".rna-denoising");
    if (!root || root.dataset.initialized === "true") return;
    root.dataset.initialized = "true";

    const sequence = [...root.dataset.rnaSequence];
    const baseColors = {
      A: "#137a5c",
      U: "#6c4fb0",
      G: "#b85f12",
      C: "#2768a4",
    };
    const grid = root.querySelector(".rna-token-grid");
    const fragment = document.createDocumentFragment();
    const tokens = sequence.map((base) => {
      const token = document.createElement("span");
      token.className = "rna-token";
      token.dataset.base = base;
      token.style.setProperty("--rna-base-color", baseColors[base]);
      token.textContent = "×";
      fragment.appendChild(token);
      return token;
    });
    grid.appendChild(fragment);

    const order = sequence.map((_, index) => index).sort((a, b) => ((a * 29) % sequence.length) - ((b * 29) % sequence.length));
    const rank = new Map(order.map((index, position) => [index, position]));
    const corrections = new Map([
      [5, [900, 1250, "C"]],
      [23, [1350, 1700, "A"]],
      [42, [1800, 2150, "G"]],
    ]);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();

    const render = () => {
      const elapsed = reducedMotion ? 3600 : (performance.now() - startedAt) % 5000;

      tokens.forEach((token, index) => {
        const revealAt = 550 + (rank.get(index) / (sequence.length - 1)) * 2700;
        const correction = corrections.get(index);
        let value = "×";
        let state = "";

        if (correction && elapsed >= correction[0] && elapsed < correction[1]) {
          value = correction[2];
          state = "is-provisional";
        } else if (elapsed >= revealAt && elapsed < 4600) {
          value = sequence[index];
          state = "is-decoded";
        }

        if (token.textContent !== value) token.textContent = value;
        token.className = `rna-token ${state}`.trim();
      });
    };

    render();
    if (!reducedMotion) window.setInterval(render, 80);
  })();
</script>

My work asks how scientific structure and biological constraints should shape generative objectives, what cross-modal information these objectives encode, and how pretrained models can be adapted through feedback and verification. A longer account of these questions is available on the [Research page]({{ '/research/' | relative_url }}).

## News

<div class="news-list">
  <div><time datetime="2026-06-13">Jun 13, 2026</time><p><strong>BioFlow</strong> was accepted to MICCAI 2026.</p></div>
  <div><time datetime="2026-05-12">May 12, 2026</time><p><strong>SpaMV</strong> was published in <em>Nature Communications</em>.</p></div>
</div>

## Selected Publication

{% include selected_papers.liquid %}

## My Blog

<div class="home-blog-grid">
  <a href="{{ '/blog/' | relative_url }}">
    <span class="blog-kind">Research</span>
    <strong>Ideas behind the work</strong>
    <p>Longer reflections on generative modeling, biological AI, scientific constraints, and questions emerging from ongoing research.</p>
    <span class="blog-explore">Explore research writing <i class="fa-solid fa-arrow-right-long"></i></span>
  </a>
  <a href="{{ '/blog/' | relative_url }}">
    <span class="blog-kind">Notes</span>
    <strong>Things worth keeping</strong>
    <p>Short records of useful tools, technical workflows, experiments, and occasional thoughts beyond formal research projects.</p>
    <span class="blog-explore">Browse field notes <i class="fa-solid fa-arrow-right-long"></i></span>
  </a>
</div>
