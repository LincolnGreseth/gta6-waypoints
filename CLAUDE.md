# CLAUDE.md — GTA 6 Waypoints site

Instructions for Claude Code in this repo. The business context, fact rules and brand rules are in `docs/` and `PROJECT_INSTRUCTIONS.md`. Read those before writing content.

## Stack
- **Eleventy (11ty) 3**: static site, Markdown content, Nunjucks layouts, ESM config (`eleventy.config.js`)
- **Netlify**: deploys on push to `main`; branches get deploy previews (`netlify.toml`)
- No frameworks. Vanilla JS only where a feature needs it (countdown, map, checklists). Speed is the ranking advantage.

## Folder layout
```
gta6-site/
├── CLAUDE.md                  ← this file
├── PROJECT_INSTRUCTIONS.md    ← Claude Project custom instructions
├── eleventy.config.js         ← badge shortcode, date filters, collections (news, sitemap)
├── netlify.toml, package.json, .env.example
├── docs/                      ← plans; read before content work
│   ├── SITE_PLAN.md, CONTENT_PIPELINE.md, LAUNCH_PLAN.md, STYLE_GUIDE.md
│   └── research/
│       └── CONFIRMED_FACTS.md ← labelled, sourced facts (Oct 23, 2026) for /everything-confirmed/
├── src/
│   ├── _data/
│   │   ├── site.json          ← name, url, nav, countdown, unlock (15 store regions), ads, analytics, affiliate tag, social
│   │   ├── affiliates.json    ← affiliate links used by {% aff %}
│   │   └── env.js             ← build-time env (BREVO_FORM_ACTION)
│   ├── _includes/
│   │   ├── layouts/           ← base.njk, guide.njk, shell.njk
│   │   └── partials/          ← header, menu, footer, countdown, unlock-wave, email-signup, ad-slot, sources, breadcrumbs, jsonld
│   ├── content/               ← every page lives here; URLs come from content.11tydata.js
│   │   ├── *.md               ← top-level pages: everything-confirmed.md → /everything-confirmed/
│   │   ├── hubs/              ← pillar pages; the folder name is dropped: hubs/map.md → /map/
│   │   ├── pages/             ← trust pages; the folder name is dropped: pages/about.md → /about/
│   │   ├── news/              ← dated updates: news/2026-10-15-launch-trailer.md → /news/2026-10-15-launch-trailer/
│   │   └── guides/            ← evergreen how-to pages → /guides/<slug>/
│   └── assets/
│       ├── css/tokens.css     ← Midnight design tokens + self-hosted @font-face (source of truth for colour and type)
│       ├── fonts/             ← Oswald 600, Barlow 400/600, JetBrains Mono 500 (woff2, OFL)
│       ├── js/                ← site.js (region state, countdown, wave), enhance.js (menu, share, signup; ≤2 KB), extras.js (YouTube, table, checklist, embed promo; only where used); minified at build
│       ├── img/, og/          ← compressed WebP; OG images 1200×630
├── scripts/                   ← check-pages.js + check-unlock.mjs (npm run check), brevo-schedule.mjs, og/ (OG image source HTML)
├── content-ops/
│   ├── findings-log.md        ← in-game discoveries, newest first
│   ├── shorts/                ← Shorts scripts: YYYY-MM-DD-slug.md
│   ├── emails/                ← newsletter drafts
│   └── prompts/               ← saved Claude Code prompts
└── raw/                       ← clips and screenshots (gitignored)
```

## Commands
- `npm install`, then `npm run dev` (eleventy --serve) for local dev
- `npm run build`: build to `_site/`
- `npm run check`: page checks (title/description length, `updated:`, `status:`, disclosures, footer disclaimer). Run after every build.
- Deploy: push to `main`. Don't deploy from the CLI unless asked.

## Already wired in the scaffold
- `{% badge "confirmed" %}` shortcode outputs `<span class="badge badge--confirmed">Confirmed</span>`. Valid values: `confirmed`, `reported`, `rumor`, `unverified`. Unknown values fail the build on purpose.
- Filters: `readableDate` ("Oct 23, 2026", UTC), `isoDate`, `absUrl`, `json`, `limit`.
- Collections: `news` (newest first) and `sitemap` (every page without `noindex`).
- Clean URLs for everything in `src/content/` (see the folder layout above). Front matter `permalink` overrides.

## Live countdown (feature spec)
The home page hero is a live countdown to GTA 6's launch. It's how we build momentum before Nov 19.

**Config:** `src/_data/site.json → countdown`. Changing the date, copy or milestones should never need a code change.
```json
"countdown": {
  "enabled": true,
  "heading": "GTA 6 launches in",
  "target": "2026-11-19T00:00:00",
  "mode": "local",
  "dateText": "Thursday, November 19, 2026",
  "platforms": "PS5 and Xbox Series X|S",
  "note": "Rockstar hasn't posted regional unlock times yet, so this counts down to midnight where you are.",
  "status": "confirmed",
  "sourceUrl": "<Rockstar press release URL from docs/research/CONFIRMED_FACTS.md>",
  "liveHeading": "GTA 6 is out",
  "liveText": "Guides go up as we verify them in-game.",
  "liveLink": { "text": "Open the map", "url": "/map/" },
  "milestones": [
    { "date": "2026-11-09", "label": "Take-Two earnings call", "status": "confirmed" },
    { "date": "2026-11-12", "label": "Pre-load opens", "status": "confirmed" },
    { "date": "2026-11-19", "label": "Launch day", "status": "confirmed" },
    { "date": "2026-11-20", "label": "Pre-order bonus cutoff", "status": "confirmed" }
  ]
}
```
- `mode: "local"` counts to that wall-clock time in the viewer's own timezone. Once Rockstar or the stores publish unlock times, switch to `mode: "fixed"` with an absolute time and offset (for example `2026-11-19T00:00:00-05:00`), and update `note`.
- To count down to the site's own go-live instead, change `target`, `heading` and `milestones` only.

**Partial:** `src/_includes/partials/countdown.njk`, with two sizes:
- `home` (default): centered label "Counting down to the unlock in <region>", four tiles (Days, Hours, Minutes, Seconds; Seconds in pink), the region select as a pill and its caption. No milestones and no badges on the home page.
- `compact`: smaller tiles, left-aligned, with the unlock line (`unverified` badge) and the confirmed date line. Used on shells, `/everything-confirmed/`, `/release-date-times/` and `/launch-checklist/`. Milestones live in the key-dates table on `/release-date-times/`.

**Behaviour** (`src/assets/js/site.js`, vanilla, deferred):
- Days, hours, minutes and seconds in tiles, updating every second, all padded to two digits. Digits start empty (never `--`); tile size is fixed, so nothing shifts (CLS 0). JetBrains Mono, tabular numerals.
- Without JS, the tiles and region select stay hidden and the date line reads instead. Never ship a frozen build-time number.
- Accessibility: `role="timer"` and `aria-live="off"` on the tiles, plus a visually hidden summary that updates once a minute.
- At zero: hide the tiles, swap in `liveHeading`, `liveText` and the `liveLink` button.
- No animation on the countdown.

## Theme: Midnight
Reference layout: a single-purpose, centered hero like gta6intel.com. We copy the layout and feel only, never their code, wordmark or words, and must never be mistakable for them or for anything official.
- **Tokens** (`src/assets/css/tokens.css`): `--bg #0D0812`, `--surface #160E1F`, `--line rgba(255,255,255,.10)`, `--text #F4F1F7`, `--body #E9E3F0`, `--muted #9A90A6`, `--accent #EE4B83` (pink), `--accent-2 #9B5CF0` (purple), `--live #3DDC84` (status dot only), plus `--teal`/`--orange` for badges. Old Miami Vice names are aliases.
- **Type:** Oswald 600 for H1, H2s, the wordmark and tile labels, **always uppercase** (this replaces the old "no ALL CAPS" rule for headings only; body copy stays sentence case). Barlow 400/600 for body and UI (15px base, 1.5 line-height; prose 16px). JetBrains Mono 500 with tabular numerals for countdown digits, wave times and news dates. All self-hosted woff2 with metric-matched fallbacks; Oswald and Barlow 400 preloaded.
- **Layout:** 1320px content at 74px side padding on desktop (40px tablet, 16px phones). Home hero centered; everything below left-aligned. About 120px between home sections on desktop, 72px on phones. Inner pages: H1 `clamp(40px, 6vw, 72px)`, content at the 68ch measure.
- **Decoration:** one soft purple radial glow top-right of the home page and the wavy band behind the home CTA card. Nothing else. No card grids, gradients on text, or extra animation.
- **Buttons** are pills: primary pink fill, secondary 1px hairline outline. 44px minimum tap targets.
- **Badges:** Confirmed teal, Reported orange, Rumor pink with "!", Unverified dimmed with a dashed border. **The home page shows at most 4 badges** (the wave footnote plus one per Latest row); `npm run check` enforces it.
- **Header (every page):** wordmark "GTA 6 Waypoints" (Oswald, uppercase) with our map pin and a "Fan guide" tagline; on the right a status chip with a pulsing green dot ("Guides open Nov 19", "Nov 19" under 480px) and the Menu button. Transparent on home, sticky with a blurred background on inner pages.
- **Menu:** `site.json → menu` (four groups, two columns). `<details>` so it works without JS; `enhance.js` adds Esc, outside click, `aria-expanded`, focus return, focus trap and scroll lock. Desktop: 400px dropdown under the button. Under 720px: a full-height sheet with the button turning into Close. Only pages that exist go in the menu; `npm run check` fails on a menu URL with no built page.
- **Footer (every page):** one row with the fan-site disclaimer (`site.json → disclaimer`) and Privacy, Terms, Disclaimer, About, Contact; a second row with the affiliate disclosure link, "Updated <date>" and "No leaks, ever." Never remove the disclaimer.
- **Banned:** the GTA/Pricedown font, Rockstar logos, official key art as branding, anything that could pass for Rockstar or another fan site.

## Every page must have
- A unique `title` (60 characters or fewer) and `description` (155 or fewer) in front matter
- One H1, with the direct answer in the first two sentences
- `updated:` date in front matter, shown on the page as "Updated Mon D, YYYY"
- `status:` set to `confirmed`, `reported`, `rumor` or `unverified` for any page with game claims, rendered as a badge
- A `sources:` list for any news or claim page, and inline source links on each claim
- An Open Graph image (`og_image`, or the site default)
- BreadcrumbList JSON-LD on every page; Article or NewsArticle on news and living pages (`dateModified` = `updated`); FAQPage when `faq:` is present; WebSite + Organization on home
- The footer fan-site disclaimer, which comes from the layout. Never remove it.

## Technical requirements
- Lighthouse 95+ on mobile. Images are WebP, lazy-loaded, with explicit width and height.
- `sitemap.xml` and `robots.txt` are generated at build time from the `sitemap` collection.
- YouTube embeds use a click-to-load facade (`youtube-nocookie.com`). Don't load iframes or official thumbnails on page load.
- Ad slots are partials (`{% include "partials/ad-slot.njk" %}`) with reserved height. Off by default; turn on with `site.json → ads.enabled`.
- Email signup is a partial. It posts to Brevo when the `BREVO_FORM_ACTION` env var is set (exposed as `env.brevoAction`). Otherwise it falls back to Netlify Forms (`data-netlify`, honeypot) so signups are captured from day one. Never commit the list ID.
- Internal links: every guide links up to its hub, and every hub links down to its guides.

## Launch-week tools
- **Store-region unlock times** live in `site.json → unlock` (`status`, `note`, 15 `regions` with ISO `at` times including the offset, DST-correct for Nov 19, 2026). Currently **assumed**: local midnight in each store region, `status: "unverified"`. `npm run check` runs `scripts/check-unlock.mjs` (midnight + real offsets while unverified, wave order matches the build).
- **When Rockstar or the stores confirm times:** edit only `at`, `status` and `note` in `site.json`, then by hand: the `lead` and FAQ answer on `/release-date-times/`, the "What time does GTA 6 unlock?" answers on `/faq/` and `/launch-checklist/`, `docs/research/CONFIRMED_FACTS.md`, and regenerate `content-ops/brevo-unlock-alerts.md` (`node scripts/brevo-schedule.mjs .`). A single worldwide time (every `at` equal) collapses the wave to "Everyone unlocks at the same moment".
- **Region state** (`site.js`, inlined as `#wp-unlock`): saved choice → else the viewer's UTC offset on Nov 19 matched to a region → else "Midnight in your time zone". Every `[data-region-select]` stays in sync; other components listen for the `wp:region` event (`enhance.js`). The countdown counts to the selected region's `at`.
- **Partials:** `countdown.njk` (home/compact), `unlock-wave.njk` (home SVG curve / full list), `unlock-table.njk` (store time + UTC at build time, "Your time" by JS, tap a row to set region), `launch-checklist-short.njk`, `launch-facts.njk`, `embed-promo.njk`, `launch-actions.njk` (calendar + share).
- **Embeds:** `/embed/countdown/` (`?region=`, `&theme=dark|transparent`, `&size=compact|wide`; old `bg=`/`size=sm|lg` still work) and `/embed/obs/` (1920×1080, transparent). Standalone pages with inline CSS/JS from `partials/embed-clock-js.njk`, no site.js, no analytics, under 15 KB. The credit link can't be turned off. Only `/embed/*` may be framed (`netlify.toml` headers).
- **Unlock alert signup** (`email-signup.njk`): region select by default (`signup.region: "select"|"hidden"|"none"`), pre-filled from the picker. Brevo gets `REGION` + `INTEREST`; Netlify Forms gets `region` + `interest`. Sending runbook: `content-ops/brevo-unlock-alerts.md`. One signup per page.
- **Launch checklist** (`/launch-checklist/`, plus the short version on home and the pillar page) saves ticks in localStorage. FAQPage markup must match the visible questions; `npm run check` enforces it. Google rarely shows FAQ rich results for gaming sites, so the markup is for machines, not a SERP feature.

## Monetization
Order (details in `docs/SITE_PLAN.md → Monetization`): affiliate links from day one → display ads once there's traffic (AdSense first, premium networks later) → Waypoints Pro 6–8 weeks after launch, only if the free tools show real repeat use. Check Rockstar's stance on paid fan tools before charging. YouTube Shorts are a traffic funnel, not revenue (10M qualified views / 90 days needed from Feb 1, 2027).

- **Affiliates:** `src/_data/affiliates.json` (`id, name, merchant, network, url, category, note`). Use `{% aff "id" %}text{% endaff %}`; it adds `rel="sponsored nofollow noopener"`, `target="_blank"` and a visible "(paid link)". Amazon URLs get `site.json → affiliate.amazonTag` appended when set, and render untagged when it's empty. `network: "pending"` or an empty `url` renders plain text, never a link. Any page with an affiliate link sets `affiliate: true` in front matter, which shows the Amazon Associates line and general disclosure near the top. No cloud gaming links (GeForce Now etc.): GTA 6 isn't on PC.
- **Ads:** `site.json → ads` (`enabled`, `network`, `publisherId`). The AdSense script loads only when `enabled` is true; `/ads.txt` is generated only when `publisherId` is set. Before enabling, Google's Privacy & Messaging CMP (IAB TCF) must be published in AdSense for EEA/UK/Swiss visitors.
- **Analytics:** GA4 via `site.json → analytics.ga4Id`; nothing loads when empty. Consent Mode v2 defaults are set before the tag (ads and analytics denied in the EEA/UK/CH until the CMP grants them). Custom events: `signup`, `affiliate_click` (`link_id`), `tool_open`, plus `share` and `add_to_calendar`.
- **Pro:** `/pro/` is a waitlist only (signup partial with `interest=pro`). No accounts, auth or Stripe until the go/no-go. Planned stack: Stripe Checkout + Supabase Auth (or Auth0) via Netlify Functions. Never Netlify Identity (deprecated Feb 2025).

## Don'ts
- Don't invent game facts to fill a page. Use `status: unverified` and a TODO.
- Don't upgrade a Reported fact to Confirmed without a new official source. Never include leaked material.
- Don't use Rockstar logos, the GTA font, or official art as site branding.
- Don't add tracking scripts beyond analytics without asking.
- Don't commit anything in `raw/` or any secrets.

## Commits
Small and descriptive: `content: add GTA 6 editions comparison`, `feat: live launch countdown`.

GitHub: LincolnGreseth (Lincoln Greseth). Remote: github.com/LincolnGreseth/<repo>.
Use 'Lincoln Greseth' in commits, PRs and author fields. Never 'Link.'
