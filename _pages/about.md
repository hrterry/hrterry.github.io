---
layout: about
title: home
permalink: /
subtitle: Generative Models for Biological and Scientific Discovery
nav: true
nav_order: 0

profile: false # enable after replacing assets/img/prof_pic.jpg with a real portrait

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

I am a researcher working on **generative models and biological foundation models**, with a particular interest in how models learn, generate, and improve upon complex scientific structures.

My work spans **biological sequence design, spatial omics, and computational pathology**. I study generative modeling from three connected perspectives: how scientific structure should shape generative objectives, what representations these objectives learn across modalities, and how pretrained models can be improved through **post-training and inference-time optimization**.

I am currently an undergraduate at **Sichuan University** and conduct research with [Prof. Rex Ying](https://www.cs.yale.edu/homes/ying-rex/) at Yale University and Prof. Xiao Han at Sichuan University.

## Research

### 01 — Structured Generative Modeling

**How should the structure of scientific data shape the way we build generative models?**

Scientific data live on highly structured spaces. I study how biological constraints, valid supports, and structural verifiers can be incorporated directly into generation rather than repaired after the fact. This direction connects my work on [RNA foundation models]({{ '/research/rna-foundation-models/' | relative_url }}) and [BioFlow]({{ '/research/bioflow/' | relative_url }}).

### 02 — Generative Representation Learning

**What do generative objectives actually teach a model about another modality?**

I study when generative objectives improve representation learning even when stochastic generation itself is unnecessary, and how target-side molecular information is routed into pretrained representations. This question motivates my work on [pathology-to-molecular prediction]({{ '/research/generative-representation-learning/' | relative_url }}) and builds on my earlier work in spatial multi-omics.

### 03 — Post-training Scientific Foundation Models

**How can pretrained scientific models improve through feedback, verification, and task-specific post-training?**

I am interested in reinforcement learning, verifier-guided search, and inference-time optimization for scientific foundation models. The goal is to turn broad pretrained models into systems that can solve precise biological design and prediction problems while preserving diversity and scientific validity.

## Selected Research

- **[Post-training & Searching RNA Foundation Models]({{ '/research/rna-foundation-models/' | relative_url }})** — combining reward-based adaptation with structural feedback for exact RNA design.
- **[Why Does Generative Learning Help Deterministic Prediction?]({{ '/research/generative-representation-learning/' | relative_url }})** — studying how molecular targets reshape pathology representations.
- **[BioFlow]({{ '/research/bioflow/' | relative_url }})** — preserving biologically valid support throughout histology-conditioned generative trajectories.
- **[SpaMV]({{ '/research/spamv/' | relative_url }})** — disentangling shared and modality-specific structure in spatial multi-omics.

## Current Directions

- **Pathology foundation-model post-training.** Adapting pretrained pathology representations toward molecular prediction and clinically meaningful tasks through routing and on-policy distillation.
- **Diversity in scientific generation.** Understanding when generative models collapse from learning biological distributions to a small set of high-probability solutions.
