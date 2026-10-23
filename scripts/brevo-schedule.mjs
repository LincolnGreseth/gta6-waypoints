// Writes content-ops/brevo-unlock-alerts.md from site.json → unlock. Usage: node scripts/brevo-schedule.mjs .
import { readFileSync, writeFileSync } from "node:fs";
const repo = process.argv[2];
const s = JSON.parse(readFileSync(`${repo}/src/_data/site.json`, "utf8"));
const rows = s.unlock.regions.map((r) => ({ ...r, t: Date.parse(r.at) })).sort((a, b) => a.t - b.t);
const f = (t, tz) => new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(t);
const utc = (t) => new Date(t).toISOString().slice(0, 16).replace("T", " ") + " UTC";
const first = rows[0], last = rows[rows.length - 1];
const table = rows.map((r, i) => `| ${i + 1} | \`REGION = ${r.id}\` | ${r.name} | ${utc(r.t)} | ${f(r.t, "America/New_York")} ET |`).join("\n");

const doc = `# Brevo: region unlock alerts

How to send one email to each store region at its unlock time on November 18–19, 2026. Every signup on the site already sends \`REGION\` (a region id like \`us-west\`, or \`local\` for "my time zone") and \`INTEREST\` (\`unlock-alert\`, or \`pro\` from the waitlist).

> The send times below come from \`src/_data/site.json → unlock\` and are **assumed**: local midnight in each store region (status: ${s.unlock.status}). If Rockstar or the stores post official times, update \`site.json\` first, regenerate this table, then reschedule. Never send an "it's unlocked" email for a time that hasn't been confirmed.

## 1. Create the contact attributes (once)
1. Brevo → **Contacts → Settings → Contact attributes → Add a new attribute**.
2. Add \`REGION\`, type **Text**.
3. Add \`INTEREST\`, type **Text**.

## 2. Create the signup form and connect the site
1. Brevo → **Contacts → Forms → Create a subscription form**, on the list you want (for example "GTA 6 Waypoints").
2. In the form builder, add the \`REGION\` and \`INTEREST\` attributes as fields (they can be hidden). Brevo only saves attributes that exist in the form.
3. Turn on **double opt-in** (recommended for EU/UK visitors) and set the final confirmation redirect to \`https://gta6waypoints.com/thanks/\`.
4. **Share → Embed → HTML code**. Copy only the form's \`action\` URL (it looks like \`https://….sibforms.com/serve/…\`).
5. Netlify → gta6-waypoints → **Project configuration → Environment variables → Add** \`BREVO_FORM_ACTION\` with that URL, then **Deploys → Trigger deploy**. The site switches from Netlify Forms to Brevo by itself.
6. Move anyone who signed up before the switch: Netlify → **Forms → signup → Download CSV**, then Brevo → **Contacts → Import**, mapping \`email\` → EMAIL, \`region\` → REGION, \`interest\` → INTEREST. Skip the \`launch-test@example.com\` test row.

## 3. Create the segments
Brevo → **Contacts → Segments → Create a segment**, one per row in the table below: \`REGION\` **is equal to** the id, **and** \`INTEREST\` **is equal to** \`unlock-alert\`. Name them \`Unlock: <region>\`.

Also create \`Unlock: my time zone\` with \`REGION = local\`. Those people didn't pick a store, so send theirs with the **first** wave (${first.name}) using the "unlocking around the world" version of the email.

## 4. Schedule 16 campaigns
Brevo → **Campaigns → Create an email campaign**, one per segment, scheduled at the times below. Brevo schedules in your account's time zone, so the ET column is there for you. Check the account time zone under **Account → Settings** first.

| # | Segment | Store region | Send at (UTC) | Send at (ET) |
|---|---|---|---|---|
${table}
| – | \`REGION = local\` | My time zone | ${utc(first.t)} | ${f(first.t, "America/New_York")} ET |

Check your plan's daily sending limit before launch week. Brevo's free plan has had a low daily cap (300 emails a day when this was written), and launch day could need more.

## 5. Email template
Subject: \`GTA 6 should be unlocking in your region now\` (switch to "is unlocking" only once times are confirmed)

Preheader: \`Your store region's unlock time is here. Here's where to start.\`

\`\`\`
GTA 6 should be unlocking now for the [REGION NAME] store.

We expected Grand Theft Auto VI to unlock at local midnight in your store region.
Rockstar hadn't posted official unlock times when we scheduled this, so if it isn't
live yet, give it a few minutes and check our unlock times page:
https://gta6waypoints.com/release-date-times/

Launch date source (Rockstar press release):
https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi

Where to start:
- The map (pins go up as we verify them): https://gta6waypoints.com/map/
- Collectibles: https://gta6waypoints.com/collectibles/
- 100% checklist: https://gta6waypoints.com/100-percent/

The day-one guide drop follows later today.

GTA 6 Waypoints is an independent fan site, not affiliated with Rockstar Games or Take-Two Interactive.
\`\`\`

Each campaign goes to one region, so type the region name in place of \`[REGION NAME]\`.

For the \`local\` segment, replace the first paragraph with: "GTA 6 is starting to unlock around the world. ${first.name} goes first and ${last.name} last. Find your time: https://gta6waypoints.com/release-date-times/"

Regenerate this file with \`node scripts/brevo-schedule.mjs .\` whenever the times in \`site.json\` change.
`;
writeFileSync(`${repo}/content-ops/brevo-unlock-alerts.md`, doc);
console.log(rows.length, "regions written");
