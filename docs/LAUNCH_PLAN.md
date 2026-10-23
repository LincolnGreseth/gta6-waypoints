# Launch Plan

**Key dates**
- **Nov 19, 2026:** GTA 6 launches (PS5 and Xbox Series X|S)
- **Feb 1, 2027:** YouTube Partner Program entry bar doubles for new applicants (20M Shorts views / 90 days, up from 10M). Getting accepted before then is the YouTube goal.

## Phase 0 — Foundation (Oct 23 – Oct 26)
- [ ] Register domain(s): gta6waypoints.com (plus a backup)
- [ ] Claim matching handles: YouTube, TikTok, Instagram, X
- [ ] Repo + 11ty skeleton + Netlify deploy + custom domain + HTTPS
- [ ] Layout with footer disclaimer, status badges, ad-slot partial (off), email partial
- [ ] Brevo list and signup form; welcome email ("You're on the day-one list")
- [ ] Google Search Console + Bing Webmaster + analytics
- [ ] Trust pages: about, contact, privacy, terms, disclaimer

## Phase 1 — Pre-launch content (Oct 27 – Nov 18)
**Site** (in this order):
1. [ ] Home with email capture and live countdown (spec in `CLAUDE.md → Live countdown`)
2. [ ] `/everything-confirmed/` (living page; research in `docs/research/CONFIRMED_FACTS.md`)
3. [ ] `/editions/`, `/release-date-times/`, `/pc-release/`
4. [ ] `/locations/`, `/characters/`, `/faq/`
5. [ ] Shells for `/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, `/vehicles/`, `/money/`, `/heists/`, `/guides/`
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
- Shorts: keep daily. Track qualified Shorts views every week against the 10M / 90-day bar.
- Apply for AdSense once about 15 solid pages are live. Switch ads on.

## Phase 4 — After Feb 1
- Review traffic; decide on premium tools, interactive map v2, GTA Online section.
- Prune or merge thin pages; refresh living pages.

## Weekly scorecard (every Sunday)
| Metric | Where |
|---|---|
| Organic sessions, top pages | Analytics / Search Console |
| New pages published | Repo |
| Email subscribers | Brevo |
| Qualified Shorts views (90-day) and subs | YouTube Studio |
| Best and worst Short of the week, and why | Notes |
