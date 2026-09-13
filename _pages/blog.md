---
layout: page
permalink: /blog/
title: Blog
description: Research positions, technical workflows, and notes on AI for science.
nav: true
nav_order: 3
---

<div class="blog-intro">
  <p>
    Research positions, questions behind ongoing work, practical workflows, and methods worth preserving beyond a single project.
  </p>
  <span>{{ site.posts | size }} essays and notes</span>
</div>

<div class="writing-list">
  {% for post in site.posts %}
    <article class="writing-entry">
      <a href="{{ post.url | relative_url }}" aria-label="Read {{ post.title }}">
        <div class="writing-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %d, %Y" }}</time>
          <span>{{ post.categories | first | replace: "-", " " }}</span>
        </div>
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
        <span class="writing-read">Read note <i class="fa-solid fa-arrow-right-long"></i></span>
      </a>
    </article>
  {% endfor %}
</div>
