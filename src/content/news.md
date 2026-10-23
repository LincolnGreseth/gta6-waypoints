---
title: "GTA 6 News: Confirmed Updates, Sourced and Dated"
description: "Every GTA 6 update we've covered, newest first. Each post is labelled Confirmed or Reported, links to its source and shows when we last checked it."
layout: layouts/guide.njk
crumb: "News"
h1: "GTA 6 news"
lead: "Official GTA 6 updates from Rockstar and Take-Two, newest first. Every post is labelled, sourced and dated, and we never cover leaks."
updated: 2026-10-23
---
{%- if collections.news and collections.news.length %}
<ul class="news-list">
  {%- for n in collections.news %}
  <li><time datetime="{{ n.date | isoDate }}">{{ n.date | readableDate }}</time> <a href="{{ n.url }}">{{ n.data.title }}</a> {% if n.data.status %}{% badge n.data.status %}{% endif %}</li>
  {%- endfor %}
</ul>
{%- else %}
<p>No news posts yet. Until the first one, <a href="/everything-confirmed/">everything confirmed about Grand Theft Auto VI</a> has every official fact with its source.</p>
{%- endif %}

Want the full picture in one place? [Everything confirmed about Grand Theft Auto VI](/everything-confirmed/) collects every official fact with its source.
