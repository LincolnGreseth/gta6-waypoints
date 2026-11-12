# Content Pipeline

One input should produce three outputs: **site update → Shorts → email (if big).**

## 1. Intake: where new info comes from
**Pre-launch (monitor daily)**
- Rockstar Newswire and Rockstar's official socials → `Confirmed`
- Take-Two investor releases and earnings calls → `Confirmed`
- PlayStation / Xbox store listings → `Confirmed`
- Established outlets (IGN, GameSpot, Eurogamer, Dexerto, etc.) → `Reported`, naming the outlet
- Leakers and social posts → `Rumor` at most, and only if they're the story. **Never leaked material itself.**

**Post-launch**
- Lincoln's own play → `Confirmed` once verified in-game
- Patch notes → `Confirmed`
- Community discoveries → `Unverified — testing` until reproduced

## 2. Findings log
Everything found in-game goes into `content-ops/findings-log.md`, newest first:

```
## 2026-11-19 21:40
- What: [collectible / vehicle / money method / tip]
- Where: [region, landmark, map coords if we have them]
- How: [steps to get it]
- Numbers: [$ amount, time, count]
- Clip: raw/2026-11-19/clip-014.mp4  (timestamp 02:13)
- Verified: yes / needs retest
- Page: /collectibles/xxx/   Short: yes / no
```

## 3. Turn findings into content
| Input | Site output | Shorts | Email |
|---|---|---|---|
| Rockstar announcement | Update `/everything-confirmed/` + news post | 1–2 (reaction, breakdown) | If major |
| New confirmed detail | Living page update | 1 | Weekly roundup |
| Launch-week finding | Guide page or map pin | 1–3 | Day-one / weekly |
| Patch | News post + update affected guides | 1 ("what changed") | Weekly |

## 4. Shorts script template
Save as `content-ops/shorts/YYYY-MM-DD-slug.md`:

```
# [Working title]
Page: /path/          Status: Confirmed / Reported / Rumor
Length: 20–40s

HOOK (0–2s, spoken + on-screen):
[Question or surprising fact; no graphic violence in first 7s]

BEATS:
1. [shot]  — VO: "..."   — Text: "..."
2. ...
3. ...

PAYOFF / ANSWER:

CTA: "Full map and list at gta6waypoints.com" (on-screen + pinned comment)

TITLE: GTA 6: [specific hook] (under 60 chars)
CAPTION: [1 line] + link
HASHTAGS: #GTA6 #GTAVI #Leonida + 1–2 topic-specific
THUMBNAIL/COVER: [frame], no gore, no Rockstar logo
SOURCES: [links]
```

## 5. Shorts rules
- "GTA 6" goes in the title, caption and on-screen text every time, so the algorithm groups us with other GTA 6 content.
- Commentary or analysis on everything. Never repost trailer clips without adding something.
- No graphic violence in the first 7 seconds or in thumbnails. No shock-value kill compilations.
- Cross-post the same edit to YouTube Shorts, TikTok and Instagram Reels without watermarks.
- Pin a comment with the page link.

## 6. Checklist data (checklist tool)
`src/_data/<name>.json`, rendered with `{% set cl = <name> %}{% include "partials/checklist-tool.njk" %}` (example: `checklistDemo.json`, page `/tools/checklist-demo/`, draft):
```json
{
  "id": "hidden-packages",                 // localStorage key wp-cl-<id>; never change once live
  "title": "GTA 6 hidden packages checklist",
  "categories": [
    { "id": "vice-city", "name": "Vice City",
      "items": [ { "id": "hp-001", "label": "Behind the lifeguard tower", "note": "Missable? no", "guide": "/collectibles/hidden-packages/#hp-001" } ] }
  ]
}
```
Item and category `id`s are permanent (they're what visitors' saved ticks point at). Add new items at the end; never reuse an id. Progress export/import is JSON `{ checklist, exported, items: [ids] }`.

## 7. Map pin data (map tool)
`src/_data/<name>.json`, rendered with `{% set pins = <name> %}{% include "partials/map-tool.njk" %}` (example: `pinsDemo.json`, page `/tools/map-demo/`, draft):
```json
{
  "id": "leonida",                          // localStorage key wp-map-<id>
  "categories": [ { "id": "collectible", "name": "Collectibles", "color": "#EE4B83" } ],
  "pins": [ { "id": "hp-001", "category": "collectible", "title": "Hidden package 1",
              "x": 42.5, "y": 61.0, "note": "On the roof, climb the ladder at the back.",
              "verified": "2026-11-19", "guide": "/collectibles/hidden-packages/#hp-001" } ]
}
```
`x`/`y` are percentages (0–100) of the plot. The plot is a neutral grid; never put pins on an image of the GTA 6 map from trailers, leaks or official art. From day one: copy each finding from `findings-log.md` (where + how verified) into a pin, with `verified` set to the date we checked it. Pins with no `verified` date shouldn't go live.

## 8. Publishing checklist (site)
- [ ] Answer in the first two sentences
- [ ] Status badge, `updated:` date, sources
- [ ] Linked up to its hub and across to 2+ related pages
- [ ] Title and meta lengths OK
- [ ] Images compressed WebP with alt text
- [ ] Deployed → request indexing in Search Console
