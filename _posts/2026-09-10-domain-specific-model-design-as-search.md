---
layout: post
title: Domain-Specific Model Design as a Search Problem
date: 2026-09-10 09:00:00 -0400
description: A position on turning domain-specific model development into structured search, and on the environments, evaluations, and agent systems needed to make that search productive.
tags: domain-models ai-agents automated-research scientific-discovery
categories: research
---

## Abstract

The development of domain-specific models is often described as a sequence of isolated inventions: a new architecture, a better objective, a more appropriate representation, or a carefully designed inductive bias. I increasingly think that this description misses an important change in how research can be conducted. As capable AI systems become able to read papers, modify code, launch experiments, inspect failures, and synthesize results, model development begins to look less like producing one idea at a time and more like searching a structured design space.

This does not make domain expertise less important. It changes where that expertise has the highest leverage. A useful research system still requires humans to define the scientific question, specify what a valid solution must preserve, prepare trustworthy data and evaluation, and decide what constitutes meaningful evidence. Once this substrate exists, a persistent research agent can spend more of its limited reasoning capacity on designing domain-specific methods, comparing hypotheses, and interpreting results, while specialized subagents handle bounded implementation and analysis tasks.

My position is that this human-prepared, search-oriented workflow is a more efficient near-term direction than asking a model to begin from an empty repository and discover everything autonomously. The long-term opportunity is not merely an agent that writes more code. It is a research system that can search broadly without losing scientific coherence.

## Model design is a coupled search space

A domain-specific method is rarely determined by architecture alone. Its behavior is jointly shaped by several choices:

- how the domain object is represented,
- which invariances and constraints are encoded,
- what information is used for conditioning,
- how the objective is constructed,
- which data are sampled and how they are split,
- how optimization is scheduled,
- which metrics determine success,
- and which failure modes are considered unacceptable.

These choices interact. A representation that is effective under one objective may be misleading under another. A metric that works for generic generation may reward biologically invalid outputs. A model improvement on a random split may disappear under a patient-level or study-level split. As a result, the real object of optimization is not a single model but a complete experimental configuration.

This coupled view is consistent with a central observation in Duan et al.'s roadmap for recursive self-improvement: [“architecture search remains expensive”](https://arxiv.org/html/2609.11873#S1.SS1) because a candidate architecture cannot be judged independently of its data, optimization, and hardware regime. Their discussion of [Agentic Neural Architecture Search](https://arxiv.org/abs/2607.07984) illustrates a useful intermediate step: a language-model agent proposes a task-specific seed architecture and a structured search space, while conventional search evaluates bounded combinations. For domain science, I think the search space must be broader still. It should include representations, scientific constraints, data protocols, objectives, and evaluators—not only neural modules.

We can think of research as searching over this coupled space. The search operators are familiar: propose a new component, mutate an existing design, recombine ideas from different methods, run an ablation, reject a failed hypothesis, and allocate more computation to a promising branch. What changes with AI agents is the possible breadth and continuity of this process. A system can explore more combinations than one researcher can implement manually, but only if every experiment returns evidence that can be compared and accumulated.

Search, therefore, is not brute-force hyperparameter tuning. The most valuable search changes the method itself: its representation, objective, conditioning structure, training curriculum, or verification procedure. Domain knowledge defines which transformations are plausible. Empirical feedback determines which branches deserve continued attention.

## A layered view of the research stack

I find it useful to separate the construction of general-purpose intelligence from the construction of domain-specific models. Organizations such as OpenAI and Anthropic work primarily at the upper layer of this stack: they build frontier models with broad knowledge, generalization, reasoning, and tool-use capabilities. These models are not necessarily the final scientific models we want to deploy. They can instead serve as general research engines capable of helping us design those models.

The connection between the two is not automatic. It passes through several layers:

```text
general-purpose frontier models
              ↓
             APIs
              ↓
research harnesses and iterative loops
              ↓
domain-specific models and methods
```

The API layer makes a general model programmable. It allows a research system to request reasoning, code generation, tool use, analysis, and structured decisions repeatedly rather than through isolated conversations. The harness layer then gives those calls continuity. It connects the model to a repository, an experimental environment, datasets, memory, evaluators, compute, and other agents. Most importantly, it closes the loop between a proposed method and evidence from an actual experiment.

The output of this loop can be a much smaller and more specialized model. A spatial-omics model, pathology encoder, RNA generator, or protein design method does not need the breadth of a frontier language model. It needs the right representation, inductive biases, objective, data, and validation for its scientific task. The general model supplies flexible research capability; the harness converts that capability into sustained search; the domain model captures the solution eventually discovered by that search.

This distinction also clarifies why access to a stronger API alone is not sufficient. Better reasoning at the top of the stack expands what is possible, but the harness determines whether that reasoning can accumulate across experiments. If the environment is unreliable, the evaluation is vague, or experimental state is repeatedly lost, improvements in the frontier model will be spent compensating for infrastructure rather than advancing the domain method.

Human scientific judgment cuts across all four layers. Researchers decide which domain problem matters, which evidence is credible, and which constraints must remain invariant. The objective is not to remove the human from the stack. It is to let general models and research loops carry more of the combinatorial search while humans define and revise its scientific direction.

## From bounded search to recursive self-improvement

This stack also suggests a concrete path toward recursive self-improvement (RSI). In [_The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement_](https://arxiv.org/abs/2609.11873), Duan et al. distinguish ordinary optimization from a persistent closed loop in which a system's improvements alter its capacity to produce subsequent improvements. Their roadmap progresses from execution autonomy and strategy autonomy to autonomous experience acquisition, environment adaptation, and finally recursive meta-improvement.

<figure class="research-paper-figure research-paper-figure--wide">
  <a href="{{ '/assets/img/blog/domain-model-search/rsi-autonomy-levels.png' | relative_url }}" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/blog/domain-model-search/rsi-autonomy-levels.png' | relative_url }}" alt="Overview of five recursive self-improvement autonomy levels, from execution autonomy to recursive meta-improvement" loading="lazy">
  </a>
  <figcaption><strong>Five levels of RSI autonomy.</strong> Responsibility expands from executing human-specified updates to improving the mechanisms that govern later improvement. Click to view the original at full resolution. Reproduced unchanged from <a href="https://arxiv.org/html/2609.11873#S0.F1">Duan et al. (2026), Figure 1</a>, licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.</figcaption>
</figure>

The workflow proposed here belongs deliberately near the beginning of that path. A frontier model operating through a research harness can execute experiments, select among research strategies, and accumulate evidence. Humans still define the problem, prepare the first environment, specify scientific constraints, and construct the initial evaluator. This is not yet genuine RSI—and describing it accurately matters. It is a bounded system for improving a domain model under a largely human-specified research contract.

<figure class="research-paper-figure research-paper-figure--wide">
  <a href="{{ '/assets/img/blog/domain-model-search/rsi-loop-patterns.png' | relative_url }}" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/blog/domain-model-search/rsi-loop-patterns.png' | relative_url }}" alt="Comparison of human-controlled and agent-controlled components across five levels of recursive self-improvement" loading="lazy">
  </a>
  <figcaption><strong>Where each improvement loop closes.</strong> The expanding green boundary shows the responsibilities progressively internalized by the AI system, while objectives and critical constraints remain externally governed. Click to enlarge. Reproduced unchanged from <a href="https://arxiv.org/html/2609.11873#S1.F2">Duan et al. (2026), Figure 2</a>, licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.</figcaption>
</figure>

The next step is for the loop to improve more than the domain model. It should learn which hypotheses are worth proposing, how to decompose a scientific question, which experiments are maximally informative, when an evaluator is being exploited, and when the environment or data no longer support the next question. In other words, the present loop searches for a better artifact; a recursively improving loop must also search for a better search process.

This distinction makes domain-specific model design a useful test bed for RSI. The target is concrete enough to evaluate, but difficult enough that progress depends on the interaction of environment, data, model, and scientific judgment. The paper's [Theseus framework](https://arxiv.org/html/2609.11873#S5.SS1) describes these elements as a co-evolving system: environments make actions verifiable, task execution produces evidence, data repair capability gaps, and stronger models expand the range of solvable tasks. I interpret the domain-research harness proposed here as a scientific specialization of that broader loop.

<figure class="research-paper-figure research-paper-figure--wide">
  <a href="{{ '/assets/img/blog/domain-model-search/theseus-coevolution.svg' | relative_url }}" target="_blank" rel="noopener">
    <img src="{{ '/assets/img/blog/domain-model-search/theseus-coevolution.svg' | relative_url }}" alt="Theseus four-stage loop connecting environment reconstruction, capability-gap discovery, data generation, and task-model training" loading="lazy">
  </a>
  <figcaption><strong>Environment–data–model co-evolution.</strong> Theseus turns environment reconstruction, observed capability gaps, targeted data, and model training into successive improvement cycles. Click to enlarge. Reproduced unchanged from <a href="https://arxiv.org/html/2609.11873#S5.F10">Duan et al. (2026), Figure 10</a>, licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a>.</figcaption>
</figure>

## Harnesses are research infrastructure

A harness is sometimes treated as a wrapper around a language model. For research, it should be understood more broadly. It is the infrastructure that connects reasoning to reliable action: repositories, environments, datasets, experiment launchers, evaluators, logs, memory, and rules for deciding what happens next.

Within such a harness, recursive self-improvement can have a practical and limited meaning. It does not need to mean an unconstrained system rewriting itself. It can mean an iterative loop in which the system proposes a method, implements it, receives empirical feedback, updates its explanation of the problem, and uses that explanation to design the next experiment. The object being improved is the research strategy as much as the model.

This loop becomes powerful when combined with broad search. A lead agent can maintain several competing hypotheses, compare evidence across branches, and compose successful components. One subagent might implement a new equivariant layer, another might audit data leakage, a third might analyze per-class failures, and another might reproduce the strongest baseline. Their outputs are not separate answers. They are observations returned to a shared research process.

The bottleneck is that every avoidable infrastructure problem consumes the same finite capacity needed for scientific reasoning. Time spent discovering an undocumented data path, repairing an environment, guessing the intended metric, or reconstructing a previous experiment interrupts the continuity of the search. Better frontier models help, but they do not make ambiguous research substrates free.

## Prepare the substrate before searching

For domain-specific research, four components should be prepared deliberately.

### Environment

The environment should make a valid experiment easy to launch and an invalid one easy to diagnose. Dependencies, hardware assumptions, paths, random seeds, and output locations should be explicit. A fresh agent should be able to run a minimal experiment without reverse-engineering the repository.

### Data

Data should be versioned, documented, and accompanied by fast subsets. Splits must reflect the scientific question rather than convenience. Leakage checks, preprocessing invariants, and dataset statistics should be executable tests, not knowledge that exists only in a researcher's memory.

### Model

The starting model should be a trusted baseline with modular components and stable configuration. The purpose is not to constrain exploration permanently. It is to give search a calibrated origin. Without a reproducible baseline, the system cannot distinguish a new idea from an implementation accident.

### Evaluation

Evaluation should combine the primary objective with domain constraints, diagnostic metrics, and qualitative inspection. A single scalar score is rarely enough. In biological generation, for example, validity, diversity, calibration, structural consistency, and downstream utility may disagree. The evaluator must preserve these disagreements long enough for the research agent to reason about them.

Preparing these components manually may appear to reduce autonomy. In practice, it increases the amount of meaningful autonomy available. The model is no longer forced to spend its attention rebuilding the laboratory before it can conduct an experiment.

## Task definition is the highest-leverage human contribution

The most important input to an automated research system is not a long prompt. It is a well-defined problem.

A research task should specify:

- the scientific object being modeled,
- the decision or prediction the model must support,
- the assumptions that may not be violated,
- the evidence required to claim progress,
- the baselines that must be surpassed,
- and the conditions under which a result should be rejected.

This is particularly important in domain research because an apparently successful result may solve the wrong problem. A model may exploit batch effects, patient identity, simulation artifacts, or an evaluation shortcut. It may optimize a proxy while violating a physical or biological constraint that was never written down. No amount of search compensates for a target that was specified incorrectly.

Humans therefore remain responsible for choosing the coordinate system of the search: what varies, what remains fixed, and what counts as progress. As systems improve, they can help refine these definitions, but they still need an explicit scientific contract against which proposals can be evaluated.

## The minimum test unit

Every hypothesis should have a minimum test unit: the smallest experiment capable of changing our belief about the idea.

A useful minimum test unit might include a small but representative dataset, a short training budget, one or two fixed seeds, a known baseline, an expected directional outcome, and a small set of diagnostic outputs. It should be cheap enough that many bad ideas can fail quickly, but faithful enough that passing it provides real information.

This is different from running a toy example merely because it is inexpensive. The test must preserve the mechanism under investigation. If the hypothesis concerns cross-sample generalization, the minimum unit must contain the relevant distribution shift. If it concerns a structural constraint, the unit must measure violations of that constraint. If it concerns scaling, a tiny experiment may be useful only for checking implementation, not for ranking methods.

Minimal tests make broad search economically possible. They create a multi-fidelity process:

1. reject malformed implementations with unit and invariant tests,
2. reject weak hypotheses with small controlled experiments,
3. compare survivors under a standard intermediate budget,
4. reserve expensive training and comprehensive evaluation for the strongest branches.

At the current level of model capability, this staged process is far more efficient than giving an agent an empty workspace, a large compute budget, and a broad instruction to explore. The latter spends too much capacity deciding what the experiment even is.

## A lead agent should preserve the research thread

Agent systems are most useful when decomposition follows the epistemic structure of research.

The lead agent should maintain the main question, the hypothesis ledger, the experimental history, and the current interpretation of results. It decides which uncertainty matters next. Its role is not to write every training script itself, but to preserve continuity across the search.

Subagents should receive bounded tasks with explicit inputs and outputs. Examples include implementing one model component, checking a dataset assumption, running a predefined experiment, analyzing a failure cluster, or verifying that a claimed improvement survives another seed. Their work should return as structured evidence: code changes, configurations, metrics, plots, failures, and concise conclusions.

This division protects the lead agent's reasoning capacity. Environment debugging, mechanical refactoring, and isolated analyses can be delegated without fragmenting the central scientific argument. The lead agent can then spend longer uninterrupted intervals comparing model designs, explaining unexpected results, and choosing the next branch of search.

The goal is not a crowd of agents producing more activity. It is a coherent research process with parallel execution.

## Why not start from zero?

Fully autonomous exploration from an empty repository is an important long-term benchmark, but it is not always the most productive operating mode today. Starting from zero introduces many degrees of freedom that are unrelated to the scientific contribution: package choice, directory layout, data acquisition, preprocessing, baseline selection, logging, and evaluation conventions.

Frontier models have a limited effective capacity within any research trajectory. Every unresolved setup decision competes with method design and interpretation. Worse, infrastructure mistakes can generate plausible-looking evidence that contaminates later reasoning.

The more effective near-term strategy is to move the boundary of autonomy gradually. Humans prepare a reliable substrate and define the first minimal tests. Agents search within that space, identify its limitations, and propose where the substrate itself should expand. Over time, validated setup decisions can become reusable components of the harness. What begins as manual preparation becomes accumulated research infrastructure.

## Limits of search

Search is useful only when feedback is trustworthy. A large search process can amplify weaknesses in evaluation as easily as it can discover strong methods.

This problem becomes more serious—not less—as the loop becomes recursive. Broader exploration is valuable only when feedback can reliably distinguish candidates. Otherwise, a system may improve its ability to exploit a benchmark, cherry-pick seeds, or rationalize noisy gains rather than improve its scientific method. An RSI-oriented harness therefore needs tests not only for candidate models but also for changes to its own search policy and evaluator.

Several risks deserve particular attention:

- repeated experimentation can overfit a benchmark even without direct gradient optimization;
- correlated agents may repeat the same assumptions while appearing independent;
- proxy metrics can become targets and lose scientific meaning;
- compute-rich search can favor complicated methods whose gains do not reproduce;
- negative results can disappear unless they are recorded explicitly;
- and automated analysis can produce confident narratives for noisy differences.

For these reasons, a research harness needs provenance, held-out evaluation, hypothesis tracking, and mechanisms for preserving failed branches. It should reward simple explanations and reproducible improvements, not only the best number observed during search.

## A research agenda

If domain-specific model design is becoming a search problem, several systems questions become scientific questions in their own right.

This is also the direction I want to pursue in biological AI. Across spatial omics, computational pathology, RNA design, and protein generation, the central difficulty is not simply scaling a generic architecture. Each setting has different objects, constraints, sources of supervision, and definitions of validity. I am interested in research systems that can search over those domain choices while keeping biological assumptions explicit and experimentally testable.

First, we need better languages for describing domain design spaces: which components may be recombined, which invariants must hold, and which priors are scientifically meaningful. Second, we need evaluator stacks that combine fast proxies with expensive, high-fidelity tests without collapsing everything into one misleading score. Third, research memory must preserve not only successful configurations but also negative results, confounders, and changes in interpretation.

We also need adaptive decomposition. The system should learn when a question can be delegated and when it requires the lead agent to integrate evidence directly. Finally, the interface between human judgment and automated search must remain legible. Researchers should be able to see why a branch was selected, which evidence changed the system's belief, and where uncertainty remains.

Beyond improving individual domain models, I want to study how the research loop itself can improve. Can it learn a better proposal distribution from failed experiments? Can it construct new minimum test units when the current evaluator stops being informative? Can it revise its environment, acquire targeted data, and change its agent organization without erasing the assumptions that make results interpretable? These questions connect domain-model search to RSI: the system must turn research experience into durable improvements in how it conducts the next cycle of research.

This transition needs its own safeguards. A self-modification should be accepted only when it improves performance on held-out research problems, preserves provenance, and survives comparison with the previous search process. Otherwise, “improving the improver” can become a self-confirming loop. The scientific analogue of a minimum test unit is therefore also needed at the meta-level: the smallest controlled test that can tell us whether the research system itself has become better.

These capabilities would make harnesses more than productivity software. They would make them instruments for studying how scientific ideas are generated, tested, and revised.

## Conclusion

The future of domain-specific AI may depend less on asking one model for one brilliant architecture and more on building systems that can search through many scientifically meaningful alternatives. Harnesses and coordinated agents can increase the breadth of this search. Their value, however, depends on a carefully prepared environment, trustworthy data, reproducible baselines, and evaluations that reflect the real domain problem.

The central human contribution is to define the question and construct the smallest tests that produce useful evidence. With that foundation, a lead research agent can reason coherently across experiments while subagents handle implementation and analysis. This is not full automation of science. It is a practical starting point from which bounded domain-model search could develop into a more genuine form of recursive improvement: one that improves not only its answers, but also the experimental and reasoning process by which the next answers are found.

## Selected references

- Duan, H. et al. [_The Last AI Built by Humans: Toward Genuine Recursive Self-Improvement_](https://arxiv.org/abs/2609.11873). arXiv, 2026.
- Jeong, S., Kim, M., and Kim, T. [_Agentic Neural Architecture Search_](https://arxiv.org/abs/2607.07984). arXiv, 2026.
