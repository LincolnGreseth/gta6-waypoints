# Launch Plan

**Key dates**
- **Nov 19, 2026:** GTA 6 launches (PS5 and Xbox Series X|S)
- **Dec 31, 2026 – Jan 14, 2027:** Waypoints Pro go/no-go (6–8 weeks after launch), based on repeat use of the free tools and the `/pro/` waitlist
- **Jan 31, 2027:** Kill test (below)
- **Feb 1, 2027:** YouTube Shorts revenue sharing starts requiring 10M qualified Shorts views in a rolling 90 days, checked monthly, even for existing Partner Program members ([PPC Land](https://ppc.land/youtube-cuts-shorts-pay-for-channels-under-10m-views-from-february-2027/)). Shorts are a traffic funnel to the site, not a revenue line.

**Monetization order:** affiliate links from day one → display ads once there's traffic (AdSense first, premium networks later) → Waypoints Pro 6–8 weeks after launch, only if the free tools show real repeat use. Check Rockstar's stance on paid fan tools before charging. No cloud gaming affiliate links. Full detail in `SITE_PLAN.md → Monetization`.

## Kill test: Jan 31, 2027
| Result | Call |
|---|---|
| Under ~30k monthly pageviews **or** under 1,000 email subs | Scale back to email and Shorts only |
| Between the two | Keep going as planned; re-check Feb 28 |
| Over 100k monthly pageviews | Go all in on the map and Pro |

## Phase 0 — Foundation (Oct 23 – Oct 26)
- [x] Register domain(s): gta6waypoints.com (plus gta6trophies.com as backup)
- [ ] Claim matching handles: YouTube, TikTok, Instagram, X
- [x] Repo + 11ty skeleton + Netlify deploy + custom domain + HTTPS (Oct 23: private repo LincolnGreseth/gta6-waypoints, Netlify project gta6-waypoints)
- [x] Layout with footer disclaimer, status badges, ad-slot partial (off), email partial
- [ ] Brevo list and signup form; welcome email ("You're on the day-one list")
- [ ] Google Search Console + Bing Webmaster + analytics
- [x] Trust pages: about, contact, privacy, terms, disclaimer (legal pages await Lincoln's review)

## Phase 1 — Pre-launch content (Oct 27 – Nov 18)
**Site** (in this order):
1. [x] Home with email capture and live countdown (spec in `CLAUDE.md → Live countdown`)
2. [x] `/everything-confirmed/` (living page; research in `docs/research/CONFIRMED_FACTS.md`)
3. [x] `/editions/`, `/release-date-times/`, `/pc-release/`
4. [x] `/locations/`, `/characters/`, `/faq/`
5. [x] Shells for `/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, `/vehicles/`, `/money/`, `/heists/`, `/guides/`
6. [ ] Map tool built and tested with dummy data **locally only**, ready to accept real pins on day 1
7. [ ] Vehicle database and checklist components built the same way
8. [ ] Pre-write launch-week guide skeletons (H1, intent, structure) for the top 25 expected questions

**Shorts:** 1–2 per day, every day, cross-posted to all three platforms (pipeline in `CONTENT_PIPELINE.md`). Every description points to the matching page.

**Gear:** capture setup tested, CapCut templates saved, `raw/` folder structure ready.

## Phase 2 — Launch week (Nov 19 – Nov 26)
- Play with capture always on. Log every finding in `content-ops/findings-log.md` as it happens.
- Twice-daily publishing loop: findings → pages → Shorts → request indexing.
- Priority pages: beginner tips, fastest early money, best early cars, collectible categories (now that real names are known), map pins.
- Day-one email drop to the list, then a "launch week roundup" email on Nov 26.

## Phase 3 — Completion grind (Nov 27 – Jan 31)
- Fill collectibles, trophies and 100% systematically, one category at a time.
- Vehicle database to full coverage.
- Weekly email: what's new on the site.
- Shorts: keep daily. Judge them by clicks to the site, not by Shorts revenue.
- Apply for AdSense once about 15 solid pages are live. Turn on the Google consent banner (CMP), then switch ads on.
- Amazon Associates needs 3 qualifying sales within 180 days of signup or the account closes. Watch it.
- Dec 31 – Jan 14: Pro go/no-go. If yes, build on the stack in `SITE_PLAN.md` (Stripe Checkout + Supabase Auth via Netlify Functions).

## Phase 4 — After Feb 1
- Act on the kill test. Decide on interactive map v2 and a GTA Online section.
- Prune or merge thin pages; refresh living pages.

## Weekly scorecard (every Sunday)
| Metric | Where |
|---|---|
| Organic sessions, top pages | Analytics / Search Console |
| New pages published | Repo |
| Email subscribers | Brevo |
| Qualified Shorts views (90-day) and subs | YouTube Studio |
| Best and worst Short of the week, and why | Notes |
