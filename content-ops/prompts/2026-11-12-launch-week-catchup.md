# Claude Code prompt: launch-week catch-up (facts, news, socials, design polish, launch-day readiness)

Repo: github.com/LincolnGreseth/gta6-waypoints (local folder: `gta6-site/`)
Git author: Lincoln Greseth (GitHub username: LincolnGreseth). Never "Link".
Written: Thu Nov 12, 2026. GTA 6 launches Thu Nov 19, 2026. Seven days out.

---

You're working in the GTA 6 Waypoints repo (Eleventy 3, Netlify, live at https://gta6waypoints.com). Read `CLAUDE.md`, `docs/STYLE_GUIDE.md`, `docs/SITE_PLAN.md`, `docs/LAUNCH_PLAN.md`, `docs/CONTENT_PIPELINE.md` and `docs/research/CONFIRMED_FACTS.md` before touching anything. Every fact rule, badge rule and fan-site rule in those files applies to this whole job.

## Where things stand

The site hasn't been touched since Oct 29 (`main` = `fe7d074`). The newest news post is Oct 16. In the two weeks since, Rockstar moved the pre-load date, published the file size and frame-rate target, and (per several outlets) put an unlock time on its support page. That means the live site currently states at least one thing that is now **wrong** and labels several things "not announced" that have been announced. Fixing that is the first job. Then: backfill news, wire up the new social accounts, give the whole site a visual clean-up pass, and get it ready to flip into launch mode on Nov 19 without a code change.

Work in the order of the parts below. Part 1 and Part 2 are the only parts that fix live errors, so they ship first.

## Ground rules for this job

1. **Verify before you write.** Everything in the "Leads" tables below came from a web search on Nov 12 and is a lead, not a fact. Open the primary source in a browser (Playwright is fine), read the actual wording, and only then write it with a label. If you can't open the primary source, cite the outlet by name and label it Reported. Never upgrade a label without an official source in hand.
2. **No leaks, ever.** Skip anything sourced to leaked builds, datamines, early retail copies, leaked trophy lists, leaked maps or "insider" review-embargo claims. Early copies are likely to be in the wild this week; none of that goes on the site, including "reportedly leaked" write-ups.
3. **Labels:** Confirmed (Rockstar, Take-Two, a platform holder's own post or store, a ratings board), Reported (named outlet), Rumor (don't publish any this week), Unverified (our own assumption).
4. Source links in every post and on every changed claim. Bump `updated:` on every page you change.
5. Fan site. Footer disclaimer stays on every page. No Rockstar logos, GTA/Pricedown font, official key art or screenshots as branding or OG images.
6. Small descriptive commits. Use the name Lincoln Greseth in commits and PRs.

## Before you start

1. `git status`, `git pull`. If the tree has uncommitted edits you didn't make, leave them alone and only stage your own files.
2. Create branch `launch-week-catchup` from `main`.
3. `npm install`, `npm run build`, `npm run check` for a baseline. Note any existing failures before you change anything.
4. Take baseline Playwright screenshots of the live site at 390×844, 768×1024 and 1440×900 for: home, `/everything-confirmed/`, `/release-date-times/`, `/launch-checklist/`, `/news/`, one news post, `/map/`, `/gear/`, `/faq/`. Save to `raw/qa/2026-11-12/before/` (gitignored).

**Ship in two PRs.** PR 1 = Parts 1–4 (facts, unlock, news, socials); merge to `main` as soon as build, check and a quick visual pass are clean, because it fixes live errors. PR 2 = Parts 5–8 (design, launch readiness, content-ops, docs).

---

## Part 1: Fix what's now wrong or stale (ship first)

### Leads to verify

| # | Lead | Proposed label | Where to verify |
|---|---|---|---|
| 1 | Pre-load opened **Nov 10**, not Nov 12. PS5 at local midnight; Xbox reportedly at 00:00 GMT worldwide (verify the Xbox detail or leave it out). It is live now. | Confirmed | Rockstar Newswire: https://www.rockstargames.com/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10 and https://www.rockstargames.com/newswire/article/89834o94713o21/pre-load-grand-theft-auto-vi-now |
| 2 | Pre-load file needs **up to 212 GB** "depending on your device". Store listings show slightly different numbers (Xbox catalog ~225 GB decimal); only use store numbers if you read them on the store yourself. | Confirmed (Rockstar figure) | Same Nov 3 Newswire post |
| 3 | Code-in-box copies available from retailers **from Nov 12**; codes can be activated and pre-loaded as soon as received. | Confirmed | Both Newswire posts |
| 4 | Game targets **30fps** on PS5 and Xbox Series X\|S; PS5 Pro adds PSSR upscaling and ray-traced shadows. Get the exact wording. | Confirmed | "Pre-Load Grand Theft Auto VI Now" post, Nov 10 |
| 5 | Xbox Cloud Gaming at launch: streams on Xbox One and Series X\|S from **1am ET Nov 19**, game bought separately, cloud version uses Series S settings, cloud playtime purchasable without Game Pass from Nov 11 in supported markets. | Confirmed (Microsoft) | Xbox Wire: https://news.xbox.com/en-us/2026/11/10/grand-theft-auto-6-comes-to-xbox-cloud-gaming-november-19/ |
| 6 | Pre-order bonus (Vintage Vice City Pack + one month of GTA+) applies to pre-orders before **Nov 19, 23:59:59**. Our pages say "buy before November 20". Check that our wording and the "Pre-order bonus cutoff" milestone match the official wording exactly, including time zone. | Confirmed | Xbox Wire post above, Rockstar Support article already cited in `editions.md` |
| 7 | Prices unchanged: $79.99 Standard, $99.99 Ultimate. | Confirmed | Store listings |
| 8 | GTA 6 has "gone gold". | Reported unless Rockstar/Take-Two said it in their own words | Push Square: https://www.pushsquare.com/news/2026/11/gta-6-wont-have-any-last-minute-delays-as-its-officially-gone-gold ; find what it cites |
| 9 | Take-Two fiscal Q2 results (Nov 9) kept Nov 19 and described pre-orders as unprecedented; no pre-order count published. | Confirmed | Take-Two IR release (take2games.com/ir) |

### Files that currently carry the wrong pre-load date or "not announced" file size

A grep on Nov 12 found Nov 12 / "isn't announced" wording in all of these. Fix every one, then grep again for `Nov 12`, `November 12`, `2026-11-12`, `20261112`, `isn't announced`, `not announced` and `hasn't posted` and review each remaining hit by hand (some Nov 12 mentions are still right: that's the code-in-box retail date).

- `src/_data/site.json` → `countdown.milestones` ("Pre-load opens" is dated 2026-11-12), `countdown.note`, `unlock.note`
- `src/_includes/partials/launch-facts.njk` (pre-load and physical rows)
- `src/_includes/partials/launch-checklist-short.njk` (`preload` item)
- `src/gta6-launch-ics.njk` (pre-load VEVENT is `DTSTART 20261112`; it's in the past now, so remove the event or re-date it and add nothing misleading)
- `src/content/launch-checklist.md` (description, lead, FAQ answers, the `space`, `redeem` and `preload` checklist items; the storage item is still badged Unverified and says the size isn't announced)
- `src/content/faq.md` (pre-load answer, physical copy answer, add file size, frame rate, PS5 Pro, Xbox One/cloud answers)
- `src/content/release-date-times.md` (FAQ pre-load answer, key-dates table)
- `src/content/everything-confirmed.md` (FAQ, quick-answers table, "Pre-orders, pre-load and bonuses" section; add performance and file size rows)
- `src/content/editions.md` (lines about Nov 12 pre-load and physical copies)
- `src/content/gear/storage.md` and `src/content/gear/index.md` (the storage page now has a real number to work with: "up to 212 GB"; rewrite the opening answer around it, keep `affiliate: true` and the disclosures)
- `src/content/pc-release.md` (recheck: still no PC announcement? Note that Xbox Cloud Gaming is not a PC release. The CLAUDE.md rule "No cloud gaming affiliate links" stays.)
- `docs/research/CONFIRMED_FACTS.md` (quick-answers table still says "Local midnight, Nov 12, 2026")

Because pre-load is now in the past, rewrite those lines in the present tense ("Pre-load is live. It opened Nov 10.") instead of only swapping the date.

---

## Part 2: Unlock times (the site's main pre-launch feature)

The home page, `/release-date-times/`, the wave, the table, both embeds, the .ics and the Brevo alert schedule all run on `site.json → unlock`, currently `status: "unverified"` with 15 regions assumed at local midnight.

**Lead:** Forbes (Nov 12), Push Square and others report that a Rockstar Support article, updated Nov 3, says the game releases at midnight local time on November 19, 2026, in all regions on PS5 and Xbox Series X|S. Several outlets add that in the US the stores unlock for the whole country at midnight Eastern, so Pacific players start at 9pm on Wed Nov 18. Our own research file already noted the US Xbox Store listing carries `releaseDate: 2026-11-19T05:00:00Z`, which matches midnight ET.

Do this:

1. Open the Rockstar Support article (the one already linked in `editions.md`) and read the exact sentence. Open the US PlayStation Store and Xbox Store listings and read the unlock time shown to a US visitor. Record wording, URLs and the date you read them in `CONFIRMED_FACTS.md`.
2. If Rockstar's wording is there: set `unlock.status` to `"confirmed"`, rewrite `unlock.note`, `unlock.assumption` and `countdown.note`, and replace the Unverified badge on the wave footnote with Confirmed plus the source link.
3. **US regions:** our data has four US rows each at their own local midnight. If the primary sources show one nationwide US unlock at midnight ET, restructure: one unlock moment for the US, displayed in the viewer's own time (so US West reads "Wed 18 Nov, 9:00 PM"). Check Canada, Mexico and Brazil the same way, plus anywhere else a store region spans time zones (Australia, for example). The home copy "New Zealand unlocks first. US West is last, N hours later" is computed from data, so make sure the computed sentence is still true after the change. If the primary sources don't settle the US question, keep the US split labelled Unverified on the page, say exactly what's confirmed and what isn't, and tell me in the final report.
4. Update `scripts/check-unlock.mjs`. It currently enforces "midnight + real offsets while unverified". Give it a confirmed mode that still checks ordering, valid offsets and DST-correct times, and checks that the wave copy matches the data.
5. Follow the CLAUDE.md runbook "When Rockstar or the stores confirm times": the `lead` and FAQ answer on `/release-date-times/`, the unlock answers on `/faq/` and `/launch-checklist/`, `CONFIRMED_FACTS.md`, and regenerate `content-ops/brevo-unlock-alerts.md` with `node scripts/brevo-schedule.mjs .`.
6. Fix the wave footnote that renders "Unlock times shown in your time zone (UTC)" when the zone can't be resolved or JS is off. It should name the real zone or fall back to wording that doesn't claim UTC is the viewer's zone.
7. Add the Xbox Cloud Gaming 1am ET start as a separate, clearly labelled row or note on `/release-date-times/`. Don't mix it into the console unlock wave.
8. Test both embeds (`/embed/countdown/`, `/embed/obs/`) and the .ics against the new data.

---

## Part 3: News backfill (Oct 17 → Nov 12)

Nothing has been posted since Oct 16. Write one post per item in `src/content/news/` using the existing news front matter and the `sources:` list, each with the answer in the first two sentences, a label badge, and links up to the relevant living page. Verify each at the source first. Skip any item you can't source properly and list it in the final report.

| Date | Story | Proposed label | Source to find |
|---|---|---|---|
| Nov 10 | Pre-load is live: 212 GB, 30fps target, PS5 Pro extras, code-in-box timing (the big one; link it from home) | Confirmed | Rockstar Newswire, Nov 10 |
| Nov 10 | Rockstar's "Explore the Grand Theft Auto VI Launch Gallery" post (link to it; don't rehost the images) | Confirmed | Rockstar Newswire, tag VI: https://www.rockstargames.com/newswire?tag=vi |
| Nov 10–11 | GTA 6 on Xbox Cloud Gaming at launch, including Xbox One, from 1am ET | Confirmed (Microsoft) | Xbox Wire |
| Nov 10–11 | Sony and Microsoft each call it the most pre-ordered game on their store | Confirmed as each company's own claim; say it's their claim | Xbox Wire, PlayStation Blog |
| Nov 10 | Gone gold | See Part 1 lead 8 | Push Square and what it cites |
| Nov 9 | Take-Two Q2 results: Nov 19 held, launch-quarter guidance. Update the existing `2026-10-13-take-two-earnings-date.md` post with the outcome and link the new post. | Confirmed | Take-Two IR |
| Nov 9 | "Grand Theft Auto VI: The Festival", Miami, Nov 21, Mana Wynwood (ticket lottery closed Nov 10, so write it as an event, not a how-to-enter) | Confirmed if Rockstar/PlayStation posted it | Rockstar Newswire / PlayStation |
| Nov 3 | Pre-load moved up to Nov 10; up to 212 GB | Confirmed | Rockstar Newswire, Nov 3 |
| Oct 29 | Justice original score album, 30 tracks, Dec 11. Update the existing soundtrack post and `/everything-confirmed/` too. | Confirmed if on Newswire | Rockstar Newswire |
| Oct 29 | Rockstar told Edge the landmass is close to GTA 4, GTA 5 and RDR2 combined | Reported (Edge) | Edge magazine via a named outlet |
| Oct 24 → Nov 4 | Miami turns into Vice City: signage, Burger Shot stands, Miami-Dade marketing package. One roundup post; update the Miami Heat post if details changed (the game is Nov 18). | Reported | Named outlets; county documents if public |
| Ratings | Regional ratings roundup (USK 18, CERO Z, Korea, ESRB M) and any Japan content changes. Update the existing Korea post; only add Japan if a ratings board or Rockstar is the source. | Per source | Ratings boards |

Leave out: Sensor Tower pre-order estimates and Circana purchase-intent stats unless you want one short Reported "by the numbers" post; the Rockstar UK union vote (off-topic for a completion guide); anything about review embargoes; the South Park episode unless a primary source confirms Rockstar's involvement.

After the posts: the home "Latest" block shows the 3 newest (max 4 badges on home still applies; `npm run check` enforces it). Make sure `/news/` reads well with ~18 posts: group by month or add a simple "Launch week" pinned row if it's getting long. Add an RSS feed at `/feed.xml` for news if there isn't one, linked in `<head>`.

Then recheck the living pages against everything above and bring them current: `/everything-confirmed/` (add a dated "What changed since Oct 26" block at the top), `/faq/`, `/editions/`, `/characters/`, `/locations/` (map-size line, Reported), `/pc-release/`. Add a "Recheck, Nov 12, 2026" section to `CONFIRMED_FACTS.md` listing what changed, what was upgraded and why, and what was deliberately left out.

---

## Part 4: Social accounts

Two accounts now exist. Wire them in everywhere the site talks about itself.

- YouTube: `https://www.youtube.com/@GTAwaypoints` (channel name "GTA Waypoints", channel ID `UCuLNWVkYQkxeWg8DG6jiI3g`)
- Facebook Page: `https://www.facebook.com/profile.php?id=61596455823083` (no custom username yet; I'll swap in the short URL when I claim one, so keep it in data only)

1. `src/_data/site.json → social`: set `youtube`, add a `facebook` key with the URL above. Leave `x`, `tiktok`, `instagram`, `discord` empty.
2. `src/_includes/partials/social.njk`: add a Facebook icon and label, drawn in the same simple stroke style as the others (our own SVG, not Facebook's logo file). Icons only render for non-empty URLs; keep that.
3. Footer: the social row currently sits under the meta line. Make it look intentional at 390 and 1440: icons with 44px tap targets, visible focus states.
4. Home: add one quiet "Follow along" line or pair of pill links near the signup (YouTube Shorts + Facebook). No embeds, no third-party scripts, no subscriber counts.
5. `/about/` and `/contact/`: name both accounts with links. `/thanks/` (post-signup): add "Subscribe on YouTube" as the next step.
6. Organization JSON-LD on home (`partials/jsonld.njk`): add both URLs to `sameAs`.
7. Track clicks with the existing GA4 pattern: a `social_click` event with `network`. No new tracking scripts.
8. News posts and guide layout: add a small "Watch the Short" slot driven by an optional `short:` front matter URL, rendered as a plain link (or the existing click-to-load YouTube facade if it's a normal video ID). Nothing renders when `short:` is empty.

---

## Part 5: Visual clean-up pass (make it beautiful)

The Oct 26 redesign set the direction: Midnight theme, one centered hero, generous space, inspired by modern GTA fan-hub layouts. The reference screenshots from that job are in `raw/qa/2026-10-26/reference/` (gitignored; four PNGs at 390 and 1440). Look at them again, and look at the reference site live in Playwright to see how it has evolved for launch week. **Borrow layout, rhythm and restraint only.** Don't copy code, CSS, fonts, wordmark, copy or imagery, and don't name the reference site anywhere in committed files (the repo is public). We must never be mistakable for it or for anything official.

The home page got the redesign; most inner pages only inherited the tokens. This pass brings every template up to the home page's standard.

**Audit first.** Screenshot every built page at 390×844, 768×1024 and 1440×900 into `raw/qa/2026-11-12/after/`. Write the issues you find to `raw/qa/2026-11-12/audit.md` before fixing, so I can see what you saw.

**Known issues to fix (found Nov 12 from the live HTML):**
- The honeypot label text "Leave this empty" is exposed in the signup markup. Make sure it's hidden from sighted users and screen readers (`hidden`/off-screen + `aria-hidden`, `tabindex="-1"`, `autocomplete="off"`) and can't appear in search snippets.
- "Share the countdown" renders a heading with no controls when JS is off. Hide the heading without JS or give it a no-JS fallback (plain share links).
- The status chip text appears twice in the DOM (long + short variants). Make sure only one is announced to screen readers.
- Footer says "Updated Oct 26, 2026" on home; it should reflect the real last content update.
- `/pc-release/` sits in the "Launch" menu group next to console launch pages. Move it to "The game" so the Launch group is only things you do this week.

**Then polish, template by template:**
- **Inner page header block:** consistent kicker → H1 → lead → "Updated" + badge row. Same vertical rhythm on every page. Check H1 wrapping at 390 for the longest titles.
- **Prose pages** (`/everything-confirmed/`, `/faq/`, `/editions/`, `/release-date-times/`): tables that fit phones without horizontal scroll (or scroll inside a clearly bounded container), badge alignment in list items (badges currently lead each bullet; make sure they sit on the text baseline and don't wrap alone onto a line), comfortable link colour and underline treatment, an on-page "Jump to" row for long pages.
- **News index and posts:** dates in JetBrains Mono, hairline dividers, a clear label badge per row, previous/next links on posts, a "Related" row linking to the living page.
- **Hub shells** (`/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, `/vehicles/`, `/money/`, `/heists/`, `/guides/`): right now they're near-identical "opens Nov 19" placeholders. Give each a distinct, honest pre-launch state: what the page will hold on day one, what's confirmed about that topic so far (sourced), the compact countdown, and the unlock-alert signup. No invented collectible names, counts, vehicles or missions.
- **Gear pages:** product rows that read as recommendations, not ads; the disclosure line visible near the top; consistent "(paid link)" styling.
- **Trust pages, 404, `/thanks/`, `/message-sent/`:** same measure, same rhythm, a useful next link on each.
- **Menu:** check the sheet at 360, 390 and 430 with the updated groups; focus trap, Esc and scroll lock still work.
- **OG images:** build a per-section OG image set from `scripts/og/` (home, news, launch, guides, gear) in the Midnight style with our wordmark. 1200×630, no official art. Wire `og_image` defaults by section.
- **Favicons and manifest:** confirm favicon.svg, an apple-touch-icon and a `site.webmanifest` exist and match the theme.

**Guardrails:** stay inside the Midnight tokens and the CLAUDE.md theme rules (one glow, one wavy band, no card grids, no gradient text, no new animation, at most 4 badges on home). No new fonts. No frameworks. CLS 0 on the countdown. Lighthouse mobile 95+ on home, `/everything-confirmed/`, `/release-date-times/` and one news post; report the scores. Run an axe pass and fix anything serious (contrast on `--muted` text at small sizes is the likely one).

---

## Part 6: Launch-day readiness (flip without a deploy)

On Nov 19 I'll be playing with capture on, not editing templates. Everything that says "opens Nov 19" has to change itself.

1. **One launch switch.** Derive a `launched` state from the unlock data: at build time (for no-JS and crawlers) and at runtime (per the viewer's selected region). When it's true: status chip becomes "Guides live" (short: "Live"), menu group label "Guides · open Nov 19" becomes "Guides", hero subline drops "Opening on launch day", the "opens Nov 19" pills on hub shells disappear, the countdown swaps to the existing `liveHeading`/`liveText`/`liveLink`, and the unlock-alert signup becomes a general "new guides" signup (`interest=guides`). All copy for both states lives in `site.json`. Add a `?preview=launched` query flag (and a `LAUNCHED=1` build env) so I can see launch mode today, and screenshot it.
2. **Scheduled rebuild.** Add a Netlify build hook + scheduled function (or document the one-line curl) to rebuild at the first unlock moment and again after the last, so the static HTML flips too. Don't commit the hook URL; read it from an env var and tell me what to set.
3. **Guide skeletons.** Per `LAUNCH_PLAN.md` Phase 1 item 8, pre-write skeletons for the top 25 launch-week questions in `src/content/guides/`: title written for search intent ("GTA 6: How to…", "GTA 6 best…"), description, H1, the section structure, hub link, and `status: unverified`. They must **not** publish: add a `draft: true` front matter flag that excludes a page from the build, the sitemap and every collection unless `DRAFTS=1`. Zero game facts in them; every answer is a TODO for in-game verification. Pick the 25 from real search intent for past Rockstar launches (beginner tips, fast early money, best early cars, how to save, fast travel, switch characters, wanted level, first safehouse, map/collectible categories, trophy roadmap, missable content, settings to change first, performance vs quality mode, and so on) and list them in `content-ops/guide-queue.md` in priority order.
4. **Guide layout check.** Build one fully fake sample guide behind `draft: true` with lorem content to prove the guide template: answer-first lead, "Verified in-game on <date>" line, steps, a screenshot figure with caption (my own gameplay screenshots only), sources, hub link, related guides, optional `short:` slot, HowTo/Article JSON-LD. Screenshot it at 390 and 1440.
5. **Checklist + map components.** `LAUNCH_PLAN.md` items 6 and 7 are still open. Build, locally only and behind `draft: true`: (a) a reusable checklist component (localStorage, progress count, per-category collapse, export/import) driven by a JSON file in `src/_data/`, and (b) the map tool shell that takes a pins JSON (id, category, title, x/y, note, verified date, guide URL) with category filters and found/not-found state. Dummy data only, on a neutral placeholder grid, **not** on any image of the GTA 6 map from trailers, leaks or official art. Vanilla JS, lazy-loaded only on the pages that use them. Document the pin/checklist data format in `docs/CONTENT_PIPELINE.md` so I can add real entries from `findings-log.md` on day one.
6. **Findings workflow.** Add a template block at the top of `content-ops/findings-log.md` (time, what, where, how verified, clip filename, page to update) and an npm script that scaffolds a new guide or news file from the STYLE_GUIDE front matter (`npm run new:guide -- "title"`, `npm run new:news -- "title"`).

---

## Part 7: Shorts scripts and email

`content-ops/shorts/` and `content-ops/emails/` are both empty. Use the script template in `docs/CONTENT_PIPELINE.md` (hook, beats, on-screen text, CTA, title, caption, hashtags). No graphic violence in the first 7 seconds or thumbnails; visuals are my own screen recordings of the site's tools plus official trailer embeds referenced by link, never re-uploaded footage. Every script ends by pointing to the matching page.

Write these to `content-ops/shorts/2026-11-12-<slug>.md`, using only facts you verified in Parts 1–3:

1. "GTA 6 needs up to 212 GB. Check your console tonight." → `/gear/storage/` and `/launch-checklist/`
2. "What time does GTA 6 unlock where you live?" → `/release-date-times/`
3. "Pre-load is live. Three things to do before Nov 19." → `/launch-checklist/`
4. "30fps, and what PS5 Pro adds" → the Nov 10 news post
5. "You can play GTA 6 on an Xbox One. Here's how." → the cloud news post
6. "Standard vs Ultimate: last days for the pre-order bonus" → `/editions/`
7. "Seven days out: everything confirmed in 45 seconds" → `/everything-confirmed/`

And in `content-ops/emails/`:
- `2026-11-12-one-week-out.md`: "Pre-load is live" email to the unlock-alert list (subject, preview text, 120–180 words, one button to `/launch-checklist/`).
- `2026-11-19-its-out.md`: launch-moment email skeleton with the facts left as TODOs.
- `2026-11-26-launch-week-roundup.md`: skeleton only.

Also write `content-ops/social/profile-copy.md` with ready-to-paste profile text for both accounts: a YouTube channel description (with the site link and the fan-site disclaimer), a Facebook Page bio and "About" text, and a pinned-post draft for each. Fan-made, not affiliated with Rockstar Games or Take-Two Interactive, stated plainly in both.

---

## Part 8: Docs and housekeeping

- `CLAUDE.md`: update the countdown/unlock sections for confirmed times and the launch switch; document `draft:`, `short:`, the `facebook` social key, the new npm scripts, the RSS feed, the OG set and the scheduled rebuild. Update the folder layout.
- `docs/LAUNCH_PLAN.md`: tick what's now done, add a dated "Nov 12 status" block, and list what's still open for Phase 1.
- `docs/SITE_PLAN.md` and `docs/STYLE_GUIDE.md`: only where this job changed something (new front matter fields, menu grouping).
- `README.md`: refresh the screenshots in `docs/screenshots/` from the new build, since the repo is public.
- Save this prompt as `content-ops/prompts/2026-11-12-launch-week-catchup.md` if it isn't there already.
- `npm run check`: extend it to fail on (a) any page still containing the old Nov 12 pre-load claim, (b) a `draft: true` page appearing in `_site/` or the sitemap, (c) a social URL in the footer that isn't in `site.json`.

---

## Stop and ask me before

- Changing the US unlock structure if the primary sources conflict with each other.
- Upgrading any label where the only source is a secondary outlet.
- Enabling ads, adding an Amazon tag, or adding any script beyond GA4.
- Deleting any page or changing any existing URL (add redirects in `netlify.toml` if a URL must move).

Everything else: make the call, note it in the report, keep going.

## Definition of done

- `npm run build` and `npm run check` pass. No hit for the old pre-load date anywhere in `_site/`.
- PR 1 merged to `main` and the live site shows: pre-load live since Nov 10, 212 GB, the verified unlock wording with the right badge, news through Nov 12, YouTube and Facebook in the footer.
- PR 2 open (or merged if every check is green) with before/after screenshots at 390 and 1440 for home, one prose page, one hub shell, news index, one news post, and launch mode via `?preview=launched`.
- Lighthouse mobile 95+ on the four pages named above; axe clean of serious issues.
- No draft page reachable on the deployed site.

## Final report (keep it short)

1. What shipped, by part, with the PR links.
2. Every fact you changed: old wording → new wording, label, source URL, date you read it.
3. Leads you could not verify and left out.
4. Decisions you made on my behalf.
5. Lighthouse and axe results.
6. What only I can do (env vars to set, accounts to claim, anything needing my review).
7. Close with three lines: **Publish** (what), **Where** (path or platform), **Next** (one follow-up).
