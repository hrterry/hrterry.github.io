---
layout: post
title: Configuring AI agents for a big repository
date: 2026-07-06 09:00:00 -0400
description: Notes on stale context, durable repository memory, validated settings, failure cases, and the limits of orchestration harnesses.
tags: ai-agents memory repositories
categories: essays
---

The hardest part of using AI agents on a large repository is usually not code generation. It is state management: what has already been tried, which branch carries the current working version, which failure cases are real, and which settings have already been validated.

When I try to reproduce other methods, the common failure mode is that information does not stay synchronized across sessions or across agents. Time is wasted re-reading work documents, re-summarizing branches, and re-discovering failure cases that were already known. People often ask whether a harness is the answer. My view is that a harness helps, but it is not the core solution.

## The real bottleneck is stale context

A big repo is not hard only because it contains many files. It is hard because the important context changes every day. The agent does not merely need repository content. It needs the current experimental state.

That state usually includes:

- the active branch and why it exists,
- the current working summary,
- known failure cases and dead ends,
- validated settings, paths, commands, and tool choices,
- which results are provisional and which are trusted.

If that information lives only in scattered chat transcripts or in the heads of human collaborators, the next agent session starts too close to zero.

## What helps right now

One system I found useful is simple daily logging. Antonia described a setup where progress is logged in markdown files in a `lab-notes` branch. That is valuable for two reasons. It helps humans look back on experiments, and it also gives the agent a compact memory source.

A practical session-start routine is to have the agent review the last couple of lab notes before touching the code. That already gives much better context than asking it to scan the whole repository again.

Another useful pattern is centralized result templates. If a large experiment needs consistent reporting, have one agent create the template first, then require all later agents to fill it in. A table in markdown is not glamorous, but it acts as a constraint: each new session knows what fields matter and what evidence is still missing.

A minimal repository memory layer can be as boring as this:

    lab-notes/
      2026-07-04.md
      2026-07-05.md
      2026-07-06.md

    agent-state/
      working-summary.md
      failure-cases.md
      validated-settings.md
      result-template.md

This is already enough to avoid a large amount of duplicated summarization work.

## Why harnesses are not the main answer

I have also been interested in harnesses such as Hermes Agent. They are useful for orchestration, but I have become more skeptical that they solve the main problem. One issue is speed: once model loading and framework overhead become noticeable, even a simple prompt feels too heavy.

The deeper issue is prompt injection strategy. Persistent agent systems have to decide how much repository state to inject each time, what to keep in a database, and how to avoid clogging context with stale or low-value memory. This is still active research. The tools are interesting, but they do not remove the design problem.

So if someone asks whether a harness manages the big repo for me, my answer is: only partially. A harness can schedule work and route tasks, but it does not automatically produce the right memory abstraction.

## What should actually be cached

The cache should not be a raw dump of repository documents. That just moves the reading cost from one place to another. The useful cache is a distilled state representation that can become the next agent's real context.

In practice, I want the cache to remember:

- the current goal and stopping condition,
- the last known good configuration,
- the commands or tools that are known to work in this repo,
- the failure cases that should not be retried blindly,
- the conclusion of solved subproblems, not just the raw trace.

That last point matters. Memory should store the conclusion and the setting. If the agent already learned that a certain flag combination, environment assumption, or data path is wrong, the next session should inherit that fact directly instead of rediscovering it.

## The tool layer should remember too

Another weak point in many current systems is that tool memory is left to third-party open-source harnesses. That is a fragile place to keep something so central. If a repo repeatedly uses the same tools, the agent should not have to re-learn them from prompts and skills every time.

If commonly used, repository-specific tools could be integrated more directly into the model product itself, a lot of wasted time would disappear. Right now many agents get trapped in a familiar loop: attempt, fail, escape the loop, rediscover context, try again. Better memory at the model and tool layer would cut that waste sharply.

## Where I think this should go

My current view is that prompt libraries, skills, and harnesses are useful scaffolding, but they are not a satisfying long-term memory solution. The stronger direction is joint optimization:

- structured repository memory that persists across sessions,
- cached conclusions and validated settings instead of raw logs,
- tool-use memory closer to the model rather than bolted on outside,
- user-facing fine-tuning windows for stable, repeated workflows.

I especially think ordinary users should eventually get a practical fine-tuning window for this kind of repeated work. The content worth adapting on is not the entire repository. It is the stable pattern of decisions: which tools are preferred, which settings are canonical, which failure modes are already settled, and what a correct solution looks like in this environment.

## My working rule for big repos

Until those systems become better, I would keep the process simple: write daily logs, maintain one rolling summary, preserve a failure ledger, require structured result tables, and make every session end by updating those artifacts.

That approach is less exciting than a fully autonomous persistent agent, but it is more reliable. For large repositories, reliability comes from making the next session start with the right compressed state, not from making the surrounding framework more elaborate.
