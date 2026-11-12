// Scaffold a guide or news post with the STYLE_GUIDE front matter.
//   npm run new:guide -- "GTA 6: How to Lose a Wanted Level" [--hub money]
//   npm run new:news  -- "Rockstar posts the day-one patch notes"
// Guides start as draft: true (never built until you remove it). News gets today's date in the filename.
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const [kind, ...rest] = process.argv.slice(2);
const hubIdx = rest.indexOf("--hub");
const hub = hubIdx >= 0 ? rest.splice(hubIdx, 2)[1] : "guides";
const title = rest.join(" ").trim();
if (!["guide", "news"].includes(kind) || !title) {
  console.error('Usage: npm run new:guide -- "Title" [--hub money]  |  npm run new:news -- "Title"');
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const slug = title.toLowerCase().replace(/^gta 6:?\s*/, "").replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const q = (s) => JSON.stringify(s);
const warn = title.length > 60 ? `  # TODO: title is ${title.length} chars; keep it ≤ 60\n` : "";

let path, body;
if (kind === "guide") {
  path = `${root}src/content/guides/${slug}.md`;
  body = `---
title: ${q(title)}
${warn}description: "TODO: ≤155 characters, the answer in plain words."
layout: layouts/guide.njk
draft: true
hub: ${hub}
status: unverified
claim: true
article: true
updated: ${today}
verified: ""
permalink: /guides/${slug}/
crumb: ${q(title.replace(/^GTA 6:?\s*/, "").slice(0, 40))}
h1: ${q(title)}
lead: "TODO: the direct answer in two sentences. Use Grand Theft Auto VI once on the page."
short: ""
steps: []
sources:
  - name: "In-game, verified by GTA 6 Waypoints (clip: raw/clips/TODO.mp4)"
related: []
---
{# Fill from content-ops/findings-log.md. Remove draft: true and set verified: when it's checked in-game. #}

## TODO: main content (table or list first, prose second)

## Tips and missable warnings
`;
} else {
  path = `${root}src/content/news/${today}-${slug}.md`;
  body = `---
title: ${q(title)}
${warn}description: "TODO: ≤155 characters, the answer in plain words."
date: ${today}
updated: ${today}
permalink: /news/${today}-${slug}/
status: unverified
crumb: ${q(title.slice(0, 40))}
h1: ${q(title)}
lead: "TODO: the answer in the first two sentences, with the label in mind (Confirmed = Rockstar, Take-Two, a platform holder or ratings board)."
short: ""
sources:
  - name: "TODO: primary source name (date)"
    url: "https://"
related:
  - text: "Everything confirmed about GTA 6"
    url: "/everything-confirmed/"
---
## The details

- {% badge "unverified" %} TODO ([Source](https://))
`;
}
if (existsSync(path)) { console.error(`Already exists: ${path}`); process.exit(1); }
writeFileSync(path, body);
console.log(`Created ${path.replace(root, "")}`);
