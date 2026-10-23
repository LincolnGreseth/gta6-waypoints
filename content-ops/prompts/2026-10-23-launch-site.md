# Claude Code prompt: build and launch GTA 6 Waypoints (Oct 23, 2026)

Supersedes `2026-10-23-build-prelaunch.md`. Paste everything below the line into Claude Code from the `gta6-site/` folder.

---

You're building and launching gta6waypoints.com. Read `CLAUDE.md`, everything in `docs/`, and `docs/research/CONFIRMED_FACTS.md` first. The scaffold (Eleventy config, data files, folders, design tokens) is already in place. Work on a git branch called `launch`, commit after each step, and don't push to `main` or deploy until I say so in step 9.

If you need something from me (an account ID, a login, a DNS change), list it all in one message, then keep working on everything that doesn't need it. Features with a missing ID stay switched off, so the build never breaks.

## 0. Update the plan docs
The monetization plan changed. Update `docs/SITE_PLAN.md`, `docs/LAUNCH_PLAN.md` and `CLAUDE.md` so they agree:
- **Order:** affiliate links from day one → display ads once there's traffic (AdSense first, premium networks later) → a premium tier 6–8 weeks after launch, **only if** the free tools show real repeat use. This replaces "Premium not before February". Keep the note to check Rockstar's stance on paid fan tools before charging.
- **No cloud gaming affiliate links (GeForce Now etc.).** GTA 6 isn't on PC, and Xbox has said it won't stream to PC, so those links would mislead readers.
- **YouTube:** from Feb 1, 2027, Shorts pay requires 10M qualified Shorts views in a rolling 90 days, checked monthly, even for existing Partner Program members. Shorts are a traffic funnel to the site, not a revenue line. Source: https://ppc.land/youtube-cuts-shorts-pay-for-channels-under-10m-views-from-february-2027/
- **Kill test (LAUNCH_PLAN):** on Jan 31, 2027, under ~30k monthly pageviews or 1,000 email subs means scale back to email and Shorts only; over 100k means go all in on the map and premium.

## 1. Repo
`git init` if needed, add `.gitignore` (already there), first commit of the scaffold, then branch `launch`. Run `npm install`.

## 2. Layout foundation
- `src/_includes/layouts/base.njk`, `guide.njk`, `shell.njk` and the partials listed in CLAUDE.md (header, footer with the fan-site disclaimer, breadcrumbs, sources, jsonld, email-signup, ad-slot).
- `src/assets/css/site.css` on top of `tokens.css`, following the Theme section of CLAUDE.md exactly.
- `sitemap.xml`, `robots.txt`, a 404 page, `/thanks/` (the signup confirmation page), our own map-pin favicon (SVG) and a default 1200×630 OG image in our palette. No GTA marks.

## 3. Live countdown
Build it to the "Live countdown" spec in CLAUDE.md: config in `site.json → countdown` (copy the block from the spec, with `sourceUrl` set to the Rockstar press release URL), a partial with `hero` and `compact` sizes, and vanilla JS in `src/assets/js/site.js`. Test it by pointing `target` one minute into the future and confirming the live state appears, then put it back.

## 4. `/everything-confirmed/`
Draft it from `docs/research/CONFIRMED_FACTS.md`, using the STYLE_GUIDE front matter.
- **First, search for anything new since Oct 23, 2026** (unlock times, PC, GTA Online, new trailers, radio reveals, Take-Two's Nov 9 call). Add new facts with labels and sources, and set `updated:` to today.
- Keep every label as researched. Only change one with a new official source, and when you do, swap in the primary link (see "Primary links to swap in" in the research file).
- Open the Trailer 1 and Trailer 2 YouTube IDs to confirm they're right before embedding.
- Every fact gets a `{% badge %}` and an inline source. Two-sentence answer first, a quick-answers table, then sections. Compact countdown near the top. YouTube embeds use the click-to-load facade.
- No leaks and no leak coverage, ever.

## 5. Home `/`
In this order: the countdown hero; a two-sentence value prop ("The GTA 6 completion companion: map, collectibles, trophies and 100% checklists. Fast, verified, no leaks."); five headline facts linking to `/everything-confirmed/`; a "what opens on launch day" list linking to the shells; latest news from the `news` collection (hide the section when it's empty); the email signup. WebSite + Organization JSON-LD.

## 6. The rest of the pre-launch pages
- **Shells** (`shell.njk`, compact countdown, signup, no placeholder data): `/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, `/vehicles/`, `/money/`, `/heists/`, `/guides/`.
- **Claim pages**, drafted only from the research file plus fresh searches, every fact badged and sourced: `/editions/`, `/release-date-times/`, `/pc-release/`, `/locations/`, `/characters/`, `/faq/`, and a `/news/` index.
- **Trust pages:** `/about/`, `/contact/`, `/disclaimer/`, `/terms/`, and `/privacy/`. The privacy page must cover analytics, ads and cookies, the consent banner, affiliate links and the email list. Mark the legal pages `<!-- TODO: Lincoln to review -->` at the top. They're templates, not legal advice.

## 7. Monetization plumbing
**Affiliates (live on day one):**
- `src/_data/affiliates.json`: an array of `{ id, name, merchant, network, url, category, note }`. Put the Amazon Associates tag in `site.json → affiliate.amazonTag`. If it's empty, Amazon links render as plain, untagged links.
- A `{% aff "id" %}text{% endaff %}` paired shortcode that outputs `rel="sponsored nofollow noopener"`, `target="_blank"`, and a visible "(paid link)" after the link text.
- Any page with an affiliate link shows the line "As an Amazon Associate I earn from qualifying purchases." near the first link, plus a general affiliate disclosure. Add the same text to the footer and `/disclaimer/`.
- `/gear/`: "GTA 6: Best Controllers, Headsets & Capture Gear". Only state product facts we can source, and make no claims about GTA 6 hardware needs that Rockstar hasn't confirmed. Leave a stub for a "Do you need more storage for GTA 6?" page with `status: unverified` and a TODO to publish once Rockstar posts the file size.
- Add SteelSeries and Razer entries as `network: "pending"` with empty URLs. I still need to join their programs. Pending links don't render.

**Display ads (switched off until approved):**
- `site.json → ads`: `{ enabled: false, network: "adsense", publisherId: "" }`. Generate `/ads.txt` from it at build time, and only when `publisherId` is set.
- Load the AdSense script only when `enabled` is true. Ad slots keep their reserved height either way.
- Before ads go live, a Google-certified CMP (IAB TCF) is required for EEA/UK/Swiss visitors. Wire in Google's own Privacy & Messaging consent banner, with Consent Mode v2, so it controls both ads and analytics. Source: https://support.google.com/adsense/answer/13554116

**Analytics:**
- GA4 with Consent Mode v2. The measurement ID goes in `site.json → analytics.ga4Id`, and nothing loads if it's empty. Ad networks such as Raptive require GA access, so use GA4.
- Track three custom events: `signup`, `affiliate_click` (with the link id) and `tool_open`.

**Email:** Brevo through `BREVO_FORM_ACTION`, with the Netlify Forms fallback (already specified in CLAUDE.md).

**Premium (validate only, don't build payments yet):**
- Add a `/pro/` waitlist page: "Waypoints Pro: route planner, video timestamps and full databases. Join the waitlist." It uses the same signup partial with a hidden `interest=pro` field. Waitlist size is the go/no-go signal for building Pro.
- Don't add accounts, auth or Stripe now. In `docs/SITE_PLAN.md`, note the planned Pro stack: Stripe Checkout plus Supabase Auth (or Auth0), called from Netlify Functions. Netlify Identity was deprecated in Feb 2025, so don't use it.

## 8. Verify before launch
- `npm run build` passes with no warnings.
- Add `scripts/check-pages.js` (`npm run check`). It fails if any page's title is over 60 characters, its description is over 155, it's missing `updated:` or (on claim pages) `status:`, an affiliate page is missing its disclosure, or the footer disclaimer is missing.
- Check every external link in the claim pages resolves.
- Screenshot `/`, `/everything-confirmed/`, `/map/` and `/gear/` at 390px and 1280px, review them against the Theme spec and fix anything off. There should be no horizontal scroll at 390px.
- Lighthouse on mobile, 95+ in every category, with ads off.
- Then stop and show me the screenshots, the Lighthouse scores, any facts you added or changed, and the list of IDs and logins you still need from me.

## 9. Go live (after I approve)
- Create a private GitHub repo with `gh repo create gta6-waypoints --private`, push, and merge `launch` into `main`.
- Connect Netlify: run `netlify login` and `netlify init`, with build command `npm run build` and publish directory `_site`. Set the env vars (`BREVO_FORM_ACTION`) in Netlify, not in the repo.
- Add the custom domain gta6waypoints.com with a `www` → apex redirect and HTTPS. Tell me exactly which DNS records to set at my registrar, then wait until it resolves.
- Confirm Netlify Forms received a test signup.
- Give me a checklist for my part: submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools, apply to Amazon Associates (it needs 3 qualifying sales within 180 days, or the account closes), and apply for AdSense once there are about 15 solid pages.

Close with **Publish** / **Where** / **Next**.
