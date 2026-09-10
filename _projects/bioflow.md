---
layout: page
title: Structure-Preserving Generative Modeling for Spatial Omics
description: BioFlow keeps histology-conditioned gene-expression trajectories within biologically valid support.
permalink: /research/bioflow/
importance: 3
related_publications: false
---

## When Biological Data Do Not Live in Euclidean Space

Spatial transcriptomics prediction from histology is commonly formulated with diffusion or flow-matching models. Standard generative trajectories, however, evolve in unconstrained real-valued space and can produce negative gene-expression values that are biologically invalid.

### BioFlow

BioFlow incorporates non-negative support directly into the generative dynamics. A reparameterized velocity field preserves valid expression values throughout the probability path instead of repairing invalid outputs afterward.

### Why It Matters

The project asks a broader modeling question: if scientific observations live on a constrained space, should those constraints be part of the model's geometry? Encoding valid support into the generation process improves both scientific consistency and computational efficiency.

### Resources

- [Code](https://github.com/hrterry/BioFLow)
- [Project page](https://hrterry.github.io/BioFLow/)

BioFlow was published at **MICCAI 2026**. The complete citation will be added to the Publications page once its public bibliographic record is available.
