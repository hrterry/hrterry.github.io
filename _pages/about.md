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

<div class="interest-list">
  <span>Generative Models</span>
  <span>Biological Foundation Models</span>
  <span>RNA Design</span>
  <span>Spatial Omics</span>
  <span>Computational Pathology</span>
  <span>Post-training & Inference-time Search</span>
</div>

<div class="interest-visual-grid">
  <article class="interest-visual-card interest-visual-card--gene">
    <header>
      <div>
        <span class="interest-visual-index">01</span>
        <h3>Spatial Omics</h3>
      </div>
      <p>Gene-expression denoising</p>
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
      <div>
        <span class="interest-visual-index">02</span>
        <h3>Computational Pathology</h3>
      </div>
      <p>Foundation-model feature space</p>
    </header>
    <div class="interest-visual-stage pathology-reel" aria-label="COAD TENX111 pathology representations rotating every five seconds">
      <figure>
        <img
          src="{{ '/assets/img/research-interests/pathology/genbio-pathfm.webp' | relative_url }}"
          alt="COAD TENX111 tissue represented by GenBio PathFM PCA colors"
          loading="eager"
        >
      </figure>
      <figure>
        <img
          src="{{ '/assets/img/research-interests/pathology/gigapath.webp' | relative_url }}"
          alt="COAD TENX111 tissue represented by GigaPath PCA colors"
          loading="lazy"
        >
      </figure>
      <figure>
        <img
          src="{{ '/assets/img/research-interests/pathology/uni.webp' | relative_url }}"
          alt="COAD TENX111 tissue represented by UNI PCA colors"
          loading="lazy"
        >
      </figure>
    </div>
  </article>
</div>

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
