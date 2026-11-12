---
title: "GTA 6 News: Labelled, Sourced and Dated"
description: "Every GTA 6 story we've covered, newest first. Each post is labelled Confirmed, Reported or Rumor, links to its sources and is dated. No leaks, ever."
layout: layouts/guide.njk
crumb: "News"
h1: "GTA 6 news"
lead: "GTA 6 news, newest first. Every post is labelled Confirmed, Reported or Rumor, sourced and dated, and we never cover leaks."
updated: 2026-11-12
---
{%- if collections.news and collections.news.length %}
{%- set pins = [] %}
{%- for n in collections.newsHome %}{% if n.data.pinned %}{% set pins = (pins.push(n), pins) %}{% endif %}{% endfor %}
{%- if pins.length %}
<h2 id="launch-week">Launch week</h2>
<ul class="news-list news-list--pinned">
  {%- for n in pins %}
  <li><time datetime="{{ n.date | isoDate }}">{{ n.date | readableDate }}</time> <a href="{{ n.url }}">{{ n.data.title }}</a> {% if n.data.status %}{% badge n.data.status %}{% endif %}</li>
  {%- endfor %}
</ul>
{%- endif %}
{%- for g in collections.news | byMonth %}
<h2 id="{{ g.id }}">{{ g.label }}</h2>
<ul class="news-list">
  {%- for n in g.posts %}
  <li><time datetime="{{ n.date | isoDate }}">{{ n.date | readableDate }}</time> <a href="{{ n.url }}">{{ n.data.title }}</a> {% if n.data.status %}{% badge n.data.status %}{% endif %}</li>
  {%- endfor %}
</ul>
{%- endfor %}
{%- else %}
<p>No news posts yet. Until the first one, <a href="/everything-confirmed/">everything confirmed about Grand Theft Auto VI</a> has every official fact with its source.</p>
{%- endif %}

Want the full picture in one place? [Everything confirmed about Grand Theft Auto VI](/everything-confirmed/) collects every official fact with its source.
