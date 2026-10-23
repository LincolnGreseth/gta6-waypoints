# Claude Code prompt: build the pre-launch site (Oct 23, 2026)

Paste everything below the line into Claude Code from the repo root.

---

Read `CLAUDE.md`, everything in `docs/`, and `docs/research/CONFIRMED_FACTS.md` before writing anything. The scaffold (config, data, folders, design tokens) is already in place. Build the pre-launch site on top of it in this order, committing after each step on a branch called `prelaunch-build`.

**1. Layout foundation**
- `src/_includes/layouts/base.njk`, `guide.njk` and `shell.njk`, plus the partials listed in CLAUDE.md: header, footer with the fan-site disclaimer, breadcrumbs, sources, jsonld, email-signup (Brevo env var with Netlify Forms fallback) and ad-slot (off).
- `src/assets/css/site.css`, built on `tokens.css` and following the Theme section of CLAUDE.md exactly: Miami Vice pastels, Kanit italic and Atkinson Hyperlegible, flat colour, nothing that could pass for Rockstar branding.
- `sitemap.xml`, `robots.txt`, a 404 page, our own map-pin favicon (SVG) and a default 1200×630 OG image in our palette (no GTA marks).

**2. Live countdown**
Build it to the "Live countdown" spec in CLAUDE.md: config in `site.json → countdown` (copy the block from the spec), a partial with `hero` and `compact` sizes, and vanilla JS in `src/assets/js/site.js`. It must work without JS (clock hidden, date line intact), never announce every second to screen readers, swap to the live state at zero, mark milestones past or today, cause no layout shift, and respect reduced motion. Test it by temporarily pointing `target` a minute into the future and confirming the live state appears, then put it back.

**3. `/everything-confirmed/`**
Draft `src/content/everything-confirmed.md` from `docs/research/CONFIRMED_FACTS.md`, with front matter from `docs/STYLE_GUIDE.md` (`layout: layouts/guide.njk`, `status: confirmed`, `updated:` today, a full `sources:` list and the `faq:` seeds).
- Before drafting, **search for anything new since Oct 23, 2026**: unlock times, PC, GTA Online, new trailers, radio reveals, Take-Two's Nov 9 call. Add new facts with labels and sources, and bump `updated:`.
- Keep every label exactly as researched. Only change one if you find a new official source, and when you do, swap the secondary link for the primary one (the list is under "Primary links to swap in").
- Open the Trailer 1 and Trailer 2 YouTube IDs to confirm they're right before embedding.
- Every fact gets a `{% badge %}` and an inline source link. Two-sentence answer first, then a quick-answers table, then sections. Put the compact countdown near the top. Use click-to-load facades for the YouTube embeds.
- No leaks and no leak coverage, ever.

**4. Home page `/`**
The hero is the countdown. Below it, in order: a two-sentence value prop ("the GTA 6 completion companion: map, collectibles, trophies, 100%; fast, verified, no leaks"), five headline facts linking to `/everything-confirmed/`, a "what opens on launch day" list linking to the shells, latest news from the `news` collection (hide the section if it's empty), and the email signup. Add WebSite + Organization JSON-LD.

**5. Verify before you stop**
- `npm run build` passes with no warnings.
- Write a small script that fails if any page's title is over 60 characters, its description is over 155, or it's missing `updated:`, `status:` (on claim pages) or the footer disclaimer.
- Check every external source link in `/everything-confirmed/` resolves.
- Screenshot `/` and `/everything-confirmed/` at 390px and 1280px wide, review them against the Theme spec, and fix anything off. There should be no horizontal scroll at 390px.
- Run Lighthouse on mobile; aim for 95+ in every category.

Then stop and show me the screenshots, the Lighthouse scores and a list of any facts you changed or added. **Don't deploy and don't push to `main`.**

**6. After I approve:** shell pages for `/map/`, `/collectibles/`, `/trophies/`, `/100-percent/`, `/vehicles/`, `/money/`, `/heists/` and `/guides/` (shell layout, compact countdown, signup, no placeholder data). Then `/editions/`, `/release-date-times/`, `/pc-release/`, `/locations/`, `/characters/` and `/faq/`, drafted from the same research file. Then the trust pages.

Close with **Publish** / **Where** / **Next**.
