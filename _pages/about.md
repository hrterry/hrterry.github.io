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

selected_papers: true # includes a list of papers marked as "selected={true}"
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

My work asks how scientific structure and biological constraints should shape generative objectives, what cross-modal information these objectives encode, and how pretrained models can be adapted through feedback and verification. A longer account of these questions is available on the [Research page]({{ '/research/' | relative_url }}).

## News

<div class="news-list">
  <div><time>2026</time><p><strong>SpaMV</strong> was published in <em>Nature Communications</em>.</p></div>
  <div><time>2026</time><p><strong>BioFlow</strong> was accepted to MICCAI 2026.</p></div>
  <div><time>2026</time><p>Started research on verifier-guided post-training and inference-time scaling for exact RNA inverse design.</p></div>
</div>

## Selected Work

<div class="selected-work">
  <a href="{{ '/research/rna-foundation-models/' | relative_url }}">
    <span class="work-status">ICLR 2027 submission</span>
    <strong>Post-training and Searching RNA Foundation Models</strong>
    <p>Verifier-guided inference-time scaling for exact and diverse RNA design.</p>
  </a>
  <a href="{{ '/research/generative-representation-learning/' | relative_url }}">
    <span class="work-status">NeurIPS 2026</span>
    <strong>When Does Generative Learning Help Deterministic Prediction?</strong>
    <p>Understanding target-side information routing in pathology-to-molecular prediction.</p>
  </a>
  <a href="{{ '/research/bioflow/' | relative_url }}">
    <span class="work-status">MICCAI 2026</span>
    <strong>BioFlow</strong>
    <p>Biologically valid support-preserving flow matching for spatial transcriptomics.</p>
  </a>
  <a href="{{ '/research/spamv/' | relative_url }}">
    <span class="work-status">Nature Communications 2026</span>
    <strong>SpaMV</strong>
    <p>Interpretable shared and modality-specific representations for spatial multi-omics.</p>
  </a>
</div>
