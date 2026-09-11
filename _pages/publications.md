---
layout: page
permalink: /publications/
title: Publication
description: Research papers in generative modeling, spatial omics, and computational biology.
nav: true
nav_order: 2
images:
  slider: true
---

<div class="publication-intro">
  <p>
    My work develops machine-learning methods that respect biological structure, from support-preserving generative models for spatial transcriptomics to interpretable integration of spatial multi-omics data.
  </p>
  <p class="publication-slider-hint">
    Figures advance automatically. Use the arrows or dots to explore each paper, and click a figure to inspect it.
  </p>
</div>

<div class="publication-stories">
  <article class="publication-story">
    <div class="publication-copy">
      <div class="publication-label"><span>01</span> Generative biology</div>
      <h2>BioFlow</h2>
      <p class="publication-full-title">
        BioFlow: A Biologically Valid Support-Preserving Flow for Histology-Conditioned Spatial Transcriptomics Prediction
      </p>
      <p class="publication-authors"><strong>Haoran Xu</strong>, Yang Liu, Wei Yuan, Xiao Han<sup>*</sup></p>
      <p class="publication-venue">MICCAI 2026</p>
      <p class="publication-summary">
        A support-preserving flow-matching framework that predicts spatial gene expression from histology while keeping generated values biologically valid. BioFlow improves spatial correlation, training stability, and computational efficiency without relying on post-hoc correction.
      </p>
      <div class="publication-actions">
        <a href="https://github.com/hrterry/BioFLow"><i class="fa-brands fa-github"></i> Code</a>
      </div>
    </div>

    <div class="publication-reel">
      <swiper-container aria-label="BioFlow figures" autoplay-delay="5200" autoplay-disable-on-interaction="false" keyboard="true" loop="true" navigation="true" pagination="true" pagination-clickable="true" pause-on-mouse-enter="true" speed="650">
        <swiper-slide>
          {% include figure.liquid loading="eager" path="assets/img/publications/bioflow/architecture.png" alt="BioFlow architecture and support-preserving flow trajectories" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Architecture &amp; support-preserving flow</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/bioflow/trajectories.png" alt="Comparison of generative trajectories produced by spatial transcriptomics prediction models" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Generative trajectory comparison</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/bioflow/gene-expression.png" alt="Spatial gene expression prediction results across multiple methods" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Spatial gene-expression prediction</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/bioflow/efficiency.png" alt="GPU-hour efficiency and prediction performance comparison" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Performance &amp; efficiency</span>
        </swiper-slide>
      </swiper-container>
    </div>

  </article>

  <article class="publication-story">
    <div class="publication-copy">
      <div class="publication-label"><span>02</span> Spatial multi-omics</div>
      <h2>SpaMV</h2>
      <p class="publication-full-title">
        Interpretable Spatial Multi-Omics Data Integration and Dimensionality Reduction with SpaMV
      </p>
      <p class="publication-authors">Yang Liu, Kexin Ma, <strong>Haoran Xu</strong>, et al.</p>
      <p class="publication-venue">Nature Communications · 2026</p>
      <p class="publication-summary">
        An interpretable multi-view framework that separates shared biological signals from modality-specific information. SpaMV supports spatial-domain discovery, multi-omics topic modeling, and biologically meaningful interpretation across diverse tissue datasets.
      </p>
      <div class="publication-actions">
        <a href="https://www.nature.com/articles/s41467-026-74718-1"><i class="fa-solid fa-arrow-up-right-from-square"></i> Paper</a>
        <a href="https://github.com/ericcombiolab/SpaMV"><i class="fa-brands fa-github"></i> Code</a>
      </div>
    </div>

    <div class="publication-reel">
      <swiper-container aria-label="SpaMV figures" autoplay-delay="5200" autoplay-disable-on-interaction="false" keyboard="true" loop="true" navigation="true" pagination="true" pagination-clickable="true" pause-on-mouse-enter="true" speed="650">
        <swiper-slide>
          {% include figure.liquid loading="eager" path="assets/img/publications/spamv/overview.webp" alt="SpaMV assumptions, model architecture, and applications" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Framework overview</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/simulation.webp" alt="SpaMV simulation benchmarks and recovered shared and private topics" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Simulation study</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/transcriptome-epigenome.webp" alt="Spatial transcriptome and epigenome integration benchmarks" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Transcriptome + epigenome</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/spatial-epigenomics.webp" alt="Spatial epigenomics domains, topics, and associated genes" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Spatial epigenomics</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/transcriptome-metabolome.webp" alt="Transcriptome and metabolome integration in tissue" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Transcriptome + metabolome</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/transcriptome-proteome.webp" alt="Transcriptome and proteome integration and pathway enrichment" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Transcriptome + proteome</span>
        </swiper-slide>
        <swiper-slide>
          {% include figure.liquid path="assets/img/publications/spamv/breast-cancer.webp" alt="SpaMV analysis of spatial breast cancer multi-omics data" class="img-fluid publication-figure" zoomable=true %}
          <span class="publication-caption">Breast-cancer tissue analysis</span>
        </swiper-slide>
      </swiper-container>
    </div>

  </article>
</div>

## Bibliographic records

<div class="publications publication-records">

{% bibliography %}

</div>
