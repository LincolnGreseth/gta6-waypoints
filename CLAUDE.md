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
│   │   ├── site.json          ← name, url, nav, countdown, ads, analytics, affiliate tag
│   │   ├── affiliates.json    ← affiliate links used by {% aff %}
│   │   └── env.js             ← build-time env (BREVO_FORM_ACTION)
│   ├── _includes/
│   │   ├── layouts/           ← base.njk, guide.njk, shell.njk
│   │   └── partials/          ← header, footer, countdown, email-signup, ad-slot, sources, breadcrumbs, jsonld
│   ├── content/               ← every page lives here; URLs come from content.11tydata.js
│   │   ├── *.md               ← top-level pages: everything-confirmed.md → /everything-confirmed/
│   │   ├── hubs/              ← pillar pages; the folder name is dropped: hubs/map.md → /map/
│   │   ├── pages/             ← trust pages; the folder name is dropped: pages/about.md → /about/
│   │   ├── news/              ← dated updates: news/2026-10-15-launch-trailer.md → /news/2026-10-15-launch-trailer/
│   │   └── guides/            ← evergreen how-to pages → /guides/<slug>/
│   └── assets/
│       ├── css/tokens.css     ← Miami Vice design tokens (source of truth for colour and type)
│       ├── js/                ← site.js (countdown), enhance.js (YouTube facade + analytics events); minified at build
│       ├── img/, og/          ← compressed WebP; OG images 1200×630
├── scripts/                   ← check-pages.js (npm run check), og/ (OG image source HTML)
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
    { "date": "2026-11-09", "label": "Take-Two earnings call", "status": "reported" },
    { "date": "2026-11-12", "label": "Pre-load opens", "status": "confirmed" },
    { "date": "2026-11-19", "label": "Launch day", "status": "confirmed" },
    { "date": "2026-11-20", "label": "Pre-order bonus cutoff", "status": "confirmed" }
  ]
}
```
- `mode: "local"` counts to that wall-clock time in the viewer's own timezone. Once Rockstar or the stores publish unlock times, switch to `mode: "fixed"` with an absolute time and offset (for example `2026-11-19T00:00:00-05:00`), and update `note`.
- To count down to the site's own go-live instead, change `target`, `heading` and `milestones` only.

**Partial:** `src/_includes/partials/countdown.njk`, with two sizes:
- `hero` (default): big digits plus the milestones timeline. Used on `/`.
- `compact`: one block, no milestones. Used on shell pages (`/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, and so on) and at the top of `/everything-confirmed/`.

**Behaviour** (`src/assets/js/site.js`, vanilla, deferred, under 2 KB minified):
- Days, hours, minutes and seconds, updating every second. Pad hours, minutes and seconds to two digits.
- Without JS, the clock stays hidden and the date line ("Thursday, November 19, 2026 on PS5 and Xbox Series X|S" plus a status badge) still reads correctly. Never ship a frozen build-time number.
- Accessibility: `role="timer"` and `aria-live="off"` on the clock, plus a visually hidden summary that updates once a minute. Never announce every second.
- At zero: hide the clock, swap in `liveHeading`, `liveText` and the `liveLink` button.
- Milestones: add `is-past` after the day ends and `is-today` on the day, using the viewer's local date.
- Reserve the clock's height so nothing shifts on load (CLS 0). Use tabular numerals.
- Motion: one neon "sign switching on" flicker on load, nothing else. Disable it under `prefers-reduced-motion`.

## Theme: Miami Vice ("Ocean Drive at 2 a.m.")
Tokens live in `src/assets/css/tokens.css`. Build `site.css` on top of them.
- **Palette:** Night Drive `#170A2E` background, Dusk `#2A1450` surfaces, Flamingo `#FF3D8B` primary, Biscayne `#22E0D0` secondary, Sunset `#FF9A3C` accent, Foam `#FDF3EA` text. Dark theme only.
- **Type:** Kanit italic (600/800) for headings, the wordmark and the countdown digits. Atkinson Hyperlegible for body. Load both from Google Fonts with `display=swap` and preconnect.
- **The one loud element** is the countdown. Make it an Art Deco hotel sign: Flamingo digits with the `--neon` glow, next to Biscayne and Flamingo "fin" stripes that get narrower (vertical on desktop, horizontal above the clock on mobile). Keep everything else quiet: left-aligned, 68ch measure, hairline dividers, fact rows instead of a card grid.
- **Badges** are pills. Confirmed is Biscayne, Reported is Sunset, Rumor is Flamingo with a "!", and Unverified is dimmed with a dashed border.
- **Don't** use the GTA/Pricedown font, gradient numerals, a pink-to-orange sunset-gradient logo, official key art, or anything that could pass for Rockstar branding. Flat colour keeps us clearly a fan site. Also avoid sentence-level ALL CAPS labels and decorative numbering.
- The wordmark is "GTA 6 Waypoints" in Kanit italic, with our own map-pin glyph.

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

## Monetization
Order (details in `docs/SITE_PLAN.md → Monetization`): affiliate links from day one → display ads once there's traffic (AdSense first, premium networks later) → Waypoints Pro 6–8 weeks after launch, only if the free tools show real repeat use. Check Rockstar's stance on paid fan tools before charging. YouTube Shorts are a traffic funnel, not revenue (10M qualified views / 90 days needed from Feb 1, 2027).

- **Affiliates:** `src/_data/affiliates.json` (`id, name, merchant, network, url, category, note`). Use `{% aff "id" %}text{% endaff %}`; it adds `rel="sponsored nofollow noopener"`, `target="_blank"` and a visible "(paid link)". Amazon URLs get `site.json → affiliate.amazonTag` appended when set, and render untagged when it's empty. `network: "pending"` or an empty `url` renders plain text, never a link. Any page with an affiliate link sets `affiliate: true` in front matter, which shows the Amazon Associates line and general disclosure near the top. No cloud gaming links (GeForce Now etc.): GTA 6 isn't on PC.
- **Ads:** `site.json → ads` (`enabled`, `network`, `publisherId`). The AdSense script loads only when `enabled` is true; `/ads.txt` is generated only when `publisherId` is set. Before enabling, Google's Privacy & Messaging CMP (IAB TCF) must be published in AdSense for EEA/UK/Swiss visitors.
- **Analytics:** GA4 via `site.json → analytics.ga4Id`; nothing loads when empty. Consent Mode v2 defaults are set before the tag (ads and analytics denied in the EEA/UK/CH until the CMP grants them). Custom events: `signup`, `affiliate_click` (`link_id`), `tool_open`.
- **Pro:** `/pro/` is a waitlist only (signup partial with `interest=pro`). No accounts, auth or Stripe until the go/no-go. Planned stack: Stripe Checkout + Supabase Auth (or Auth0) via Netlify Functions. Never Netlify Identity (deprecated Feb 2025).

## Don'ts
- Don't invent game facts to fill a page. Use `status: unverified` and a TODO.
- Don't upgrade a Reported fact to Confirmed without a new official source. Never include leaked material.
- Don't use Rockstar logos, the GTA font, or official art as site branding.
- Don't add tracking scripts beyond analytics without asking.
- Don't commit anything in `raw/` or any secrets.

## Commits
Small and descriptive: `content: add GTA 6 editions comparison`, `feat: live launch countdown`.
