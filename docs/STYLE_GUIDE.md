# Style Guide

## Voice
- Direct, like a friend who already beat the game. Short sentences.
- Answer first, explain second. No "In this guide we will…" intros.
- Use plain numbers ("$48,000 per run, about 12 minutes").
- Never hype unconfirmed things. Rumors are labelled and kept brief.
- The site name is "GTA 6 Waypoints". Use "GTA 6" in titles and "Grand Theft Auto VI" at least once per page.

## Status badges
| Badge | Meaning |
|---|---|
| `confirmed` | Rockstar or Take-Two said it, or verified in-game by us |
| `reported` | Credible outlet, named in sources |
| `rumor` | Unconfirmed; shown with a warning |
| `unverified` | Found but not yet retested |

How to apply them: an official Rockstar, Take-Two, platform-store or ratings-board source is `confirmed`. A secondary outlet clearly reporting an official announcement or store listing is still `confirmed`, but swap in the primary link when you find it. Interview remarks and an outlet's own reporting are `reported`, with the outlet named. Conflicting details stay out until one source settles them.

## Visual theme
Miami Vice, "Ocean Drive at 2 a.m.": flat pastels on violet night. Tokens are in `src/assets/css/tokens.css`, and the full spec (palette, Kanit + Atkinson Hyperlegible, the countdown as the one loud element, what not to copy from Rockstar's branding) is in `CLAUDE.md → Theme`.

## Front matter template
```yaml
---
title: "GTA 6: All Hidden Package Locations & Map"
description: "Every hidden package in GTA 6 with map pins, tips and the reward for collecting them all."
layout: layouts/guide.njk
hub: collectibles
status: confirmed
updated: 2026-11-21
sources:
  - name: "In-game, verified by GTA 6 Waypoints"
  - name: "Rockstar Newswire"
    url: "https://www.rockstargames.com/newswire"
faq:
  - q: "How many hidden packages are in GTA 6?"
    a: "..."
og_image: /assets/og/hidden-packages.webp
---
```

## Page structure (guides)
1. **H1** matching the search query
2. **Answer paragraph** (2 sentences; this is what AI search quotes)
3. Status badge and "Updated" date
4. Main content: table or list first, prose second
5. Map embed or links to `/map/` filters where relevant
6. Tips and missable warnings
7. FAQ block (3–5 questions)
8. Related guides (2–4 internal links)
9. Sources

## Naming
- URLs: lowercase, hyphens, no dates in evergreen URLs (`/money/fastest-early-money/`)
- News URLs: `/news/2026-11-20-day-one-patch/`
- Images: `gta-6-[topic]-[detail].webp` (for example `gta-6-hidden-package-vice-beach.webp`)

## Footer disclaimer (layout, every page)
> GTA 6 Waypoints is an independent fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. Grand Theft Auto and related marks are trademarks of Take-Two Interactive Software, Inc.
