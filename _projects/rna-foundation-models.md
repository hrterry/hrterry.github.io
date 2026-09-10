---
layout: page
title: Post-training & Searching RNA Foundation Models
description: Diagnosing diversity collapse and using structural feedback to turn pretrained RNA generation into exact design.
permalink: /research/rna-foundation-models/
importance: 1
related_publications: false
---

## Learning to Search Beyond a Generative RNA Model

Pretrained RNA foundation models can generate plausible sequences, but scientific design asks for something more demanding: sequences that satisfy an exact target structure while remaining diverse and biologically meaningful.

### The Problem

Reward-based post-training can improve structural success while collapsing a broad generative distribution into a small set of high-probability solutions. This project studies that tension between **optimization**, **diversity**, and **biological validity**.

### From Post-training to Structured Search

I investigate reinforcement-learning post-training together with verifier-guided inference. A fold-back verifier compares each generated sequence with the target structure, identifies missing and spurious base pairs, and turns those errors into structured feedback for the next search step.

### Broader Lesson

Scientific foundation models should not be treated as one-shot generators. Their pretrained representations can serve as a proposal mechanism inside a feedback loop that reasons over domain constraints at inference time.

_Manuscript, code, figures, and complete collaborator information will be added when they are ready for public release._
