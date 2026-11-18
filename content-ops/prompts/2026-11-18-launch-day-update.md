# Claude Code prompt: launch-day update (Nov 18 → Nov 19)

Repo: github.com/LincolnGreseth/gta6-waypoints (local folder: `gta6-site/`)
Git author: Lincoln Greseth (GitHub username: LincolnGreseth). Never "Link".
Written: Wed Nov 18, 2026, 12:30pm ET. GTA 6 is already unlocking: New Zealand went live at 11:00 UTC today. The US unlocks at midnight ET tonight (9pm PT).

---

You're working in the GTA 6 Waypoints repo (Eleventy 3, Netlify, live at https://gta6waypoints.com). Read `CLAUDE.md`, `docs/STYLE_GUIDE.md`, `docs/LAUNCH_PLAN.md`, `docs/CONTENT_PIPELINE.md`, `docs/research/CONFIRMED_FACTS.md` and the final report of the Nov 12 job (`content-ops/prompts/2026-11-12-launch-week-catchup.md`) before touching anything. Every fact, badge and fan-site rule in those files applies.

## Where things stand

The live `/news/` shows posts through Nov 12 (pre-load, 212 GB, cloud, ratings, Festival, Take-Two Q2). Nothing has been posted since. The game is now rolling out region by region, so the site has to flip from countdown mode to launch mode today, and the email list needs its "it's out" send. I'll be playing with capture on tonight, so after this job the site should run itself through launch.

Work in the order below. Part 1 is the only one that has to ship before midnight ET.

## Ground rules

1. **Verify before you write.** The leads table came from a web search at noon on Nov 18. Open the primary source (Playwright is fine), read the actual wording, then write it with a label. If you can only find an outlet, name it and label Reported.
2. **No leaks, no spoilers.** Early copies, street-date breaks and NZ-timezone players are all posting footage and story details today. None of it goes on the site: no story beats, no mission names, no endings, no collectible counts, no map images, no trophy lists, no "reportedly leaked" write-ups. Anything about gameplay content waits until I verify it in-game.
3. **No "play early" how-tos.** Don't write a VPN / region-switch / "New Zealand trick" guide or link to one. It risks account action against readers. If the unlock page needs to mention it, one neutral line: other regions unlock earlier because of time zones; changing your console region can break store terms.
4. Labels: Confirmed, Reported (named outlet), Rumor (don't publish today), Unverified — testing.
5. Source links on every post and every changed claim. Bump `updated:` on every page you touch.
6. Fan site. Footer disclaimer on every page. No Rockstar logos, Pricedown font, key art or official screenshots as branding or OG images.
7. Small descriptive commits as Lincoln Greseth.

## Before you start

1. `git status`, `git pull`. Leave uncommitted edits you didn't make alone.
2. Check what landed from the Nov 12 job: is PR 2 (launch switch, `?preview=launched`, scheduled rebuild, guide skeletons, `draft:` flag, findings template, `new:guide` script) merged? List what's in and what isn't. If PR 2 is still open and green, merge it first. If it's not built, Part 1 below has a minimum fallback.
3. Branch `launch-day` from `main`. `npm install && npm run build && npm run check` for a baseline.

---

## Part 1: Launch mode (ship before 11pm ET tonight)

1. **If the launch switch exists:** confirm it flips correctly per region with the real unlock data. Load the site with `?preview=launched` and with the region set to New Zealand (already live) and US East (not yet). NZ should show launch state now; US should still count down. Screenshot both at 390 and 1440.
2. **If it doesn't exist (fallback):** don't build the whole thing. Add one `launched` boolean in `site.json` plus the `liveHeading` / `liveText` / `liveLink` copy, wire the countdown and status chip to it, and I'll flip it with a one-line commit at midnight ET. Tell me exactly which line.
3. **Scheduled rebuild:** make sure a Netlify build fires at 05:00 UTC Nov 19 (midnight ET) and again at 07:00 UTC (after the last US/Latin America windows), so static HTML for no-JS visitors and crawlers flips. Read the build hook from an env var; tell me what to set if it isn't set. Check with the Netlify CLI or dashboard that it's actually scheduled, not only committed.
4. **Unlock page:** `/release-date-times/` gets a "Live now in:" line computed from the data (regions whose unlock has passed), above the wave. Keep the Xbox Cloud Gaming 1am ET row separate.
5. **Home:** the hero's job flips from "when does it unlock" to "start here". After launch the primary CTA goes to `/launch-checklist/` → renamed in copy (not URL) to "First hour checklist" if that page has been updated for post-launch use; otherwise to `/guides/`. Max 4 badges on home still applies.
6. Deploy, then check the live site from a US-East and NZ region setting.

---

## Part 2: News (Nov 13 → today)

One post per item in `src/content/news/`, answer in the first two sentences, label badge, sources, links up to the living page. Verify first; skip and list anything you can't source.

| Date | Lead | Proposed label | Verify at |
|---|---|---|---|
| Nov 18 | **GTA 6 is out in New Zealand**: the rollout started at midnight NZDT (11:00 UTC Nov 18, 6am ET), region by region through Nov 19. Pin this one to the top of `/news/` and link it from home. | Confirmed if Rockstar or a store page states the local-midnight rollout; outlets (VideoCardz reported NZ live) = Reported | Rockstar Support release-time article (already cited in `editions.md`), Rockstar Newswire, Rockstar socials |
| Nov 18 | **US unlock is midnight ET for the whole country** (9pm PT Wed). Our Nov 12 job may have settled this; if `unlock.status` is already confirmed, just reference it. | Confirmed only from the US PS Store / Xbox Store page or Rockstar | US store listings |
| Nov 18 | **Reviews are in.** Reviews were reported to lift today. If they're published: one post with the Metacritic and OpenCritic aggregates and links to 4–6 named outlets' reviews. No pull-quotes over one short line per outlet, no spoilers from reviews. If the aggregate isn't settled yet, give the count and say it's still filling in. | Reported (aggregate sites + named outlets) | metacritic.com, opencritic.com |
| Nov 13 | **Pre-launch update 1.002.000** rolled out on PS5 (≈1 GB, mandatory, staggered 50/50), with Xbox reportedly the same day. Rockstar published no patch notes. | Reported (KeenGamer, VICE) | Rockstar Support / Newswire for notes; if none, say so |
| Nov 16–17 | **Second update 01.002.001.** Same treatment; combine with the above into one "GTA 6 updates before launch: what to install" post if that reads better. | Reported (Esquire India, TechJuice) | Same |
| Nov 13–18 | **Physical copies / code-in-box problems.** Gameranx headline says some physical buyers say codes are missing from boxes. Only post if Rockstar Support or a retailer has addressed it; then make it a practical "if your code is missing" post. | Reported | Rockstar Support |
| — | **GTA Online at launch.** Check whether Rockstar has said anything official about online at launch. If it has, one post. If only outlets, skip. | Confirmed / skip | Rockstar Newswire, Support |
| — | **Anything new on the Newswire tag VI since Nov 12** (launch-day post, launch trailer, GTA+ launch perks, PS5/Xbox Wire launch posts). | Confirmed | https://www.rockstargames.com/newswire?tag=vi, Xbox Wire, PlayStation Blog |

Skip: early-access / NZ-trick stories, store user-rating stories (PS Store 5/5 "reviews"), Sensor Tower or sales-estimate stories, anything sourced to leakers.

Then update the living pages: `/everything-confirmed/` ("What changed since Nov 12" block at top), `/faq/` (is it out yet in my region, do I need the update, where are the patch notes), `/launch-checklist/` (install latest update item), `/pc-release/` (recheck: still no PC announcement?). Add "Recheck, Nov 18, 2026" to `CONFIRMED_FACTS.md`.

---

## Part 3: Newsletter (Brevo)

We have real subscribers now. Don't send anything; write drafts I'll paste into Brevo and send myself.

1. `content-ops/emails/2026-11-18-its-out.md`: subject (≤45 chars), preview text, 120–180 words. Lead: it's live now in NZ/Australia, it unlocks in the US at midnight ET tonight, link to `/release-date-times/` for their region. Second beat: install the latest update before midnight. Third: what the site will publish in the first 72 hours (guides as we verify them in-game) and a "Watch the Shorts" link to https://www.youtube.com/@GTAwaypoints. One primary button. Plain, no hype, no spoilers. Footer: fan-site disclaimer and unsubscribe line.
2. Check `content-ops/brevo-unlock-alerts.md` against today's data. If the region alert schedule is wrong or stale, regenerate it and tell me which scheduled sends to fix in Brevo.
3. Update `2026-11-26-launch-week-roundup.md` skeleton with the sections it'll need.
4. Confirm the signup form still posts to the right Brevo list and the double opt-in / welcome email links to live pages. Report the form endpoint you tested (submit only with a test address like `test+waypoints@` on a domain I own; ask me if unsure).

---

## Part 4: Shorts and Facebook posts

Use the template in `docs/CONTENT_PIPELINE.md`. Visuals = my own gameplay capture and screen recordings of the site. No graphic violence in the first 7 seconds or thumbnails. No spoilers. Every script ends pointing at a page.

Write to `content-ops/shorts/2026-11-18-<slug>.md`:

1. "GTA 6 is out. Here's exactly when it unlocks for you" → `/release-date-times/`
2. "Install this before you play GTA 6 tonight" (updates + 212 GB) → `/launch-checklist/`
3. "GTA 6 reviews: the score in 30 seconds" (only if Part 2 sourced it) → the reviews post
4. Three launch-night templates with blanks for me to fill after playing: "First thing to do in GTA 6", "Fastest early money I found", "Best early car I found". Each with hook, beat slots, on-screen text, CTA to `/guides/`, and a note: publish only after I verify.

Also `content-ops/social/2026-11-18-facebook.md`: three Facebook Page posts (launch-night "it's out" post, a "what time does it unlock" post with the link, and a "drop your first-hour clip in the comments" engagement post). Short, link in each, disclaimer on the first.

---

## Part 5: Day-one guide pipeline

Tonight's findings need to turn into pages fast.

1. Confirm `npm run new:guide -- "title"` and `npm run new:news -- "title"` work. If missing, add them (scaffold from STYLE_GUIDE front matter, `status: unverified`, `draft: true`).
2. Make sure `content-ops/findings-log.md` has the template block at the top and a `## 2026-11-19` heading ready.
3. Re-sort `content-ops/guide-queue.md` for launch night: the first 10 guides I should verify first (beginner tips, settings to change first, how to save, fast early money, best early car, switching characters, wanted level, fast travel, first safehouse, performance vs quality mode). Each skeleton stays `draft: true` until I fill in verified facts.
4. Add a `## Clip naming` section to `docs/CONTENT_PIPELINE.md`: `raw/2026-11-19/clip-###.mp4`, logged in findings with timestamp, so OpusClip / CapCut exports map back to findings.

---

## Stop and ask me before

- Sending any email or scheduling any Brevo campaign.
- Upgrading a label where the only source is an outlet.
- Publishing anything about gameplay content (story, missions, collectibles, map) that I haven't verified.
- Deleting a page or changing a URL.
- Adding scripts beyond GA4, enabling ads or adding an Amazon tag.

## Definition of done

- Before 11pm ET: launch mode verified (or the fallback flip line ready), scheduled rebuilds confirmed, NZ-is-live post and any verified Nov 13–18 posts live.
- `npm run build` and `npm run check` pass; no spoiler or leak content anywhere.
- Email draft, Shorts scripts and Facebook posts in `content-ops/`.

## Final report (short)

1. What shipped, with PR links and the live URLs.
2. Every fact changed: old → new, label, source URL, date read.
3. Leads left out and why.
4. What only I can do tonight (env vars, Brevo send, flip line, posts), in time order.
5. Close with: **Publish** (what), **Where** (path/platform), **Next** (one follow-up).

Save this prompt as `content-ops/prompts/2026-11-18-launch-day-update.md`.
