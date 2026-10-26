---
title: "GTA 6 News: Labelled, Sourced and Dated"
description: "Every GTA 6 story we've covered, newest first. Each post is labelled Confirmed, Reported or Rumor, links to its sources and is dated. No leaks, ever."
layout: layouts/guide.njk
crumb: "News"
h1: "GTA 6 news"
lead: "GTA 6 news, newest first. Every post is labelled Confirmed, Reported or Rumor, sourced and dated, and we never cover leaks."
updated: 2026-10-26
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
