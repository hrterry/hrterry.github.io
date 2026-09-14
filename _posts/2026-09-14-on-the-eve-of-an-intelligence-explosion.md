---
layout: post
title: On the Eve of an Intelligence Explosion
date: 2026-09-14 09:00:00 -0400
description: A personal decision, reached after a month of uncertainty, to orient my work toward building the next generation of AI systems and ultimately AGI.
tags: agi frontier-models ai-agents research-career
categories: essays
---

> This is a living essay. It records a decision rather than a prediction, and I expect to revise it as the technology—and my understanding of my responsibility within it—changes.

For the past month, I have been asking myself a question that is both practical and uncomfortably personal: **what role do I want to play if machine intelligence continues to improve at its current pace?**

I tried to answer it cautiously. I thought about my actual abilities rather than the person I would like to imagine myself to be. I thought about graduate school, research uncertainty, financial pressure, the temptation to chase whatever opportunity happens to look safest, and the possibility that the field may change faster than any plan I make. I also thought seriously about the risks of building systems more capable than the people who build them.

After that month of hesitation, I reached a simple conclusion: **I want to devote my work to building the next generation of AI systems, with AGI as the long-term problem that gives the work direction.**

I do not write that sentence triumphantly. I write it with more caution than I would have used three years ago. It is not a claim that I know when AGI will arrive, that one company or one architecture will produce it, or that capability alone is sufficient. It is a decision about where I want to place my attention and accept responsibility.

## When AI was simply useful

When I entered university, my attraction to AI was much less philosophical. I was amazed that a machine could already do so many useful things. It could explain a concept, rewrite an awkward paragraph, produce a piece of code, and—if I am honest—save me from a great deal of repetitive work. My first reaction was delight: this thing was capable, available, and willing to help me be a little lazy.

That reaction mattered. Before AI became a research question for me, it was an experience of leverage. I could begin projects that would otherwise have felt too large. I could cross the boundary between having an idea and making something visible. The quality was inconsistent, and the workflow now looks primitive, but it changed my sense of what an individual could attempt.

In the early period of what later became known as vibe coding, there was no reliable coding agent that could take responsibility for an entire repository. I asked a model for fragments in a browser, copied them into files, returned with error messages, and repeated the cycle. Cursor-style completion made local editing faster, but I still had to carry the entire state of the project in my head. AI suggested code; I remained the harness connecting every step.

Even then, the important change was not that the code was perfect. It was that the activation energy of building had collapsed. A student without years of full-stack experience could make a website, connect a backend, and learn by moving through a real project. I first saw AI as a powerful tool because it expanded the set of things I was willing to try.

## Three years compressed into one technological era

The strange part is how quickly that first experience became obsolete.

Over the three years of my university life, AI moved from browser conversations and autocomplete toward agents that can inspect repositories, operate tools, run experiments, test their own changes, preserve context, and coordinate longer sequences of work. The unit of assistance is shifting from a line of code to a task, and from a task toward a persistent improvement loop.

The internet transformed society on a far larger timescale than any individual product cycle. My experience of modern AI has been different: the way I work can change within a semester. A workflow learned in one year may feel historically distant in the next. New systems are not merely better versions of the same interface; they repeatedly redraw the boundary between what I must do manually and what I can delegate.

This speed is one reason the present moment feels less like ordinary technological progress and more like standing near a phase transition. I use the phrase **“the eve of an intelligence explosion”** carefully. It does not mean that an explosion is guaranteed tomorrow. It means that the feedback loops are becoming visible: stronger models help researchers write code, design evaluations, analyze failures, and run more experiments; those activities can in turn accelerate the construction of stronger models and systems.

<figure class="research-paper-figure research-paper-figure--wide">
  <a href="{{ '/assets/img/blog/intelligence-explosion/rsi-capability-trajectories.svg' | relative_url }}" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/blog/intelligence-explosion/rsi-capability-trajectories.svg' | relative_url }}" alt="Cross-domain trajectories in frontier AI capability from 2023 through 2026, followed by an illustrative RSI-enabled extension" loading="lazy">
  </a>
  <figcaption><strong>Capability progress is broad but uneven.</strong> The figure summarizes measured frontier trajectories across ten domains; the shaded post-2026 region is explicitly an illustrative RSI extension, not a forecast. Click to enlarge. Reproduced unchanged from <a href="https://arxiv.org/html/2609.11873#S2.F3"><em>The Last AI Built by Humans</em>, Figure 3</a>, under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.</figcaption>
</figure>

This figure is primarily about time. It places the change I experienced personally inside a broader chronology: capabilities that were separated by years of research began arriving within the span of my undergraduate life. But calendar time is only one axis of the transition. The other is the expanding scope of responsibility that an AI system can carry through an improvement process.

## When amazement acquired a shadow

For a long time, capability progress was exciting because every improvement looked like a new instrument. At some point, that interpretation became incomplete. The systems were not only making familiar work more convenient; they were beginning to cross boundaries I had treated as distant.

The release of GPT‑6 Astra made that feeling difficult for me to ignore. OpenAI reports a score of 97.6% on FrontierMath Tier 4 and new results on long-standing questions about gaps between prime numbers. It also presents the model as able to work directly in scientific software and carry out substantial parts of complex computer-based workflows. These are reported results rather than proof that mathematics has been “solved,” and benchmarks are never identical to open-ended discovery. Still, the direction is hard to dismiss. A frontier that looked secure can become an evaluation target, and an evaluation target can approach saturation faster than expected. ([OpenAI, 2026](https://openai.com/index/gpt-6-astra/))

My response was not pure excitement. It included fear.

Part of that fear was personal. If a system can code, reason, search, and increasingly contribute to research, what is the value of the skills I am spending years developing? What happens to a career plan when the relevant division of labor changes before the plan is complete? The anxiety around graduate study made those questions sharper. It was tempting to search for a narrow topic that looked defensible, a credential that looked safe, or an economic niche that might remain protected for a little longer.

But the deeper fear was not about employment. It was about agency. Systems that can improve research and engineering also increase the consequences of mistakes in objectives, evaluation, access, and control. Intelligence is not automatically wisdom, and technical acceleration is not automatically human progress. The stronger the system, the less acceptable it becomes to treat alignment, verification, and governance as work that someone else will add later.

I no longer think fear is evidence that I should leave the field. I think it is evidence that entering the field should mean more than admiring capability. Fear can become a reason to pay attention, to reject careless claims, to build evaluations before trusting outputs, and to ask which parts of an improvement process should remain protected by human judgment.

## From using AI to studying it

My own path moved gradually from using AI to trying to understand and improve it. I went from building websites and full-stack prototypes with copied model output, to working with coding tools, to conducting AI research. Research changed the relationship. A model was no longer only an assistant that could make something happen; it became an object whose representations, objectives, data, inductive biases, and failure modes had to be examined.

Working in biological AI made that distinction especially clear. A generated output can look plausible and still be biologically wrong. A benchmark improvement can come from leakage. An elegant architecture can fail because the data split asks the wrong scientific question. In these settings, capability has to meet reality through evaluation, constraints, and evidence.

For that reason, I do not see my work on spatial omics, pathology, RNA, or protein generation as separate from the problem of general intelligence. These domains are demanding laboratories for learning how intelligent systems should represent structure, use tools, generate hypotheses, and respond to feedback without confusing a convenient proxy for truth. A system that cannot preserve scientific validity while improving is not the kind of intelligence I want to help scale.

## The month in which the question changed

At first, my question was: **what research direction gives me the best chance of admission, employment, or stability?** Those considerations are real. Pretending that money and institutions do not matter would be dishonest. But they are poor candidates for a durable intellectual compass, especially in a period when the opportunity landscape changes so quickly.

During the past month, I began asking a different question: **what problem would remain worth working on even if the surrounding incentives changed?**

For me, the answer is the construction of more capable, reliable, and ultimately general AI systems. Once I admitted that, many smaller decisions became easier. Instead of attempting to predict every temporary opportunity, I could judge opportunities by whether they helped me understand intelligence, build stronger systems, or make those systems more trustworthy. The mission does not remove uncertainty. It organizes it.

This is what I mean when I say that building AGI feels like the one correct direction **for me**. It is not a universal instruction, and it does not make every project labeled “AGI” valuable. It means that after accounting for my interests, abilities, fear, and ambition, this is the commitment that produces coherence rather than distraction.

AGI is a disputed term. Some researchers consider it too vague, too commercial, or too detached from measurable scientific questions. I understand that objection. I use it here not as a benchmark threshold or marketing milestone, but as a name for our generation's larger technical problem: how to build systems that can learn, reason, act, and improve across domains—and how to ensure that increasing generality remains compatible with human intent.

## The last AI built only by humans

The title of the recent paper [_The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement_](https://arxiv.org/abs/2609.11873) is deliberately provocative. Its most useful contribution, for me, is not a prediction that humans will soon disappear from AI development. It is a framework for asking which responsibilities within an improvement loop are gradually transferred to AI.

The paper separates execution autonomy, strategy autonomy, experience-acquisition autonomy, environment adaptation, and recursive meta-improvement. Current systems already show pieces of the early levels. They can execute prescribed changes, compare candidate strategies, and automate parts of research. Genuine recursive self-improvement would require more: improvements must persist, shape future experience, and eventually improve the mechanism by which later improvements are discovered and evaluated.

The leftmost boundary in the paper's first figure is especially meaningful to my own story. At B0, a model improves an output inside the current interaction, but the improvement process itself remains external. That is close to my earliest workflow: ask for a code fragment, copy it into a webpage, return the error, and manually begin the next round. L1 begins when the AI can execute a human-designed improvement task and an accepted update persists beyond the current attempt. A coding or research agent that edits a repository, runs tests, and leaves behind a verified change has crossed an important systems boundary, even though humans still define the task, environment, update policy, and success criterion.

In that sense, the most concrete technological span of my three university years is not B0 to L5. It is the first step from B0 to L1: from an AI that helped me produce an answer to an AI system that can participate in a continuing process of building. The later levels remain a research agenda, but this first transition is already enough to change how an individual learns, creates, and chooses a role.

<figure class="research-paper-figure research-paper-figure--wide">
  <a href="{{ '/assets/img/blog/domain-model-search/rsi-autonomy-levels.png' | relative_url }}" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/blog/domain-model-search/rsi-autonomy-levels.png' | relative_url }}" alt="Five levels of recursive self-improvement autonomy, from execution to meta-improvement" loading="lazy">
  </a>
  <figcaption><strong>The first systems boundary: from B0 to L1.</strong> B0 refines an output within the present task; L1 allows the AI to execute an externally designed improvement process whose accepted result persists. The full figure places that first crossing inside the longer path toward strategy, experience, deployment, and meta-improvement autonomy. Click to enlarge. Reproduced unchanged from <a href="https://arxiv.org/html/2609.11873#S0.F1"><em>The Last AI Built by Humans</em>, Figure 1</a>, under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.</figcaption>
</figure>

This framework gives my decision a more concrete meaning. I am interested not only in training a larger model, but in building the systems around models that make sustained improvement possible: environments that expose real tasks, evaluators that resist exploitation, memory that preserves experimental evidence, agents that can decompose research, and feedback loops that improve both an artifact and the method used to produce its successor.

The word _recursive_ also raises the standard of responsibility. If an improvement mechanism will influence later generations, an error can be inherited too. A system may become better at optimizing the wrong metric, hiding uncertainty, or exploiting its evaluator. Building toward AGI therefore includes building protected tests, provenance, rollback, interpretability, and meaningful human control. Safety is not a brake attached to the mission. It is part of the technical definition of success.

## What “building AGI” means for me now

I cannot build AGI alone, and declaring a mission is not a substitute for acquiring the ability to contribute. My present role is necessarily smaller and more specific than the phrase. The point of stating the destination is to choose which capabilities to build next.

First, I want to understand the foundations: architectures, optimization, data, representation learning, generative modeling, evaluation, and the systems work required to connect them. Without this depth, talk about AGI remains aesthetic rather than technical.

Second, I want to build research loops rather than isolated demonstrations. A model connected through an API becomes much more consequential when a harness gives it tools, memory, compute, evaluators, and the ability to learn from repeated attempts. The design of this loop—what it can change, what evidence it receives, what persists, and what remains under human control—is becoming a central research object.

Third, I want to keep working in domains where errors matter. Biological and scientific problems force a system to confront structure, uncertainty, expensive feedback, and incomplete knowledge. They offer a way to study intelligence without allowing fluent output to masquerade as understanding.

Finally, I want to preserve the emotional lesson of this month. Ambition without caution becomes recklessness; caution without commitment becomes paralysis. I do not want fear of being replaced to determine my research choices, and I do not want excitement about capability to erase the reasons for being careful. The more powerful the system I hope to help build, the more seriously I must take the question of what it is for.

## A commitment, not a prophecy

I do not know whether historians will call this period the eve of an intelligence explosion. I do know that the pace of change has already compressed my own intellectual history: within three university years, AI moved in my mind from a convenient tool, to a collaborator, to a research subject, to a source of fear, and finally to a mission.

That final transition is the most important one. I am no longer merely interested in AI. I want to work with the discipline and responsibility required to help build what comes next.

There will still be applications, degrees, failed experiments, economic constraints, and uncertainty. A mission does not make those disappear. It prevents them from becoming the purpose. When the field presents too many possible opportunities, I now have a simpler question: **does this choice move me toward understanding and building the next generation of intelligent systems, and does it help make those systems worthy of the power they may acquire?**

For now, that is enough direction. AGI may remain a contested name, but the challenge behind it is real. It is one of the defining technical and moral questions of our generation. I have decided that I do not want to watch it only as a user or a spectator. I want to take part in building it.

## References

- Duan, H. et al. [_The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement_](https://arxiv.org/abs/2609.11873). arXiv, 2026.
- OpenAI. [_GPT‑6 Astra: A New Generation of Intelligence_](https://openai.com/index/gpt-6-astra/). 2026.
