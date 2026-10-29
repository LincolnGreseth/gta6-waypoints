# Claude Code prompt: homepage redesign (inspired by modern GTA fan-hub layouts), right-side menu, mobile, new news

Repo: github.com/LincolnGreseth/gta6-waypoints (local folder: `gta6-site/`)
Git author: Lincoln Greseth (GitHub username: LincolnGreseth)

---

You're working in the GTA 6 Waypoints repo (Eleventy 3, Netlify). Read `CLAUDE.md`, `docs/STYLE_GUIDE.md`, `docs/SITE_PLAN.md` and `docs/research/CONFIRMED_FACTS.md` first. Every fact, badge and fan-site rule in those files still applies. **The visual rules in the CLAUDE.md "Theme" section are being replaced by this brief.** Part 6 covers updating that section.

## Goal

The homepage is too busy. It has five fact rows, eight launch-day cards, a checklist, a separate calendar block, a signup and news, with status badges on almost every line. Rebuild it with a layout, spacing, type scale and feel inspired by modern GTA fan-hub layouts: a single-purpose, centered hero with generous space. Check your work in Playwright at 1440×900 and 390×844. Every other destination moves into a **Menu dropdown on the right side of the header**, and that header goes on every page.

Copy the **layout and feel only**. Don't copy their code, CSS, font files, wordmark or text. Build it yourself from the screenshots and use our own wordmark and copy, written below. We must never be mistakable for their site or for anything official.

## Before you start

1. Run `git status`. The working tree already has uncommitted edits to `src/content/everything-confirmed.md` and `src/content/release-date-times.md`. **Don't discard, stash or commit them.** Leave them exactly as they are, and only stage files you change yourself.
2. Create the branch `homepage-redesign` from the current HEAD.
3. Run `npm install`, `npm run build` and `npm run check` so you have a baseline.

## Part 1: Page structure (inspired by modern GTA fan-hub layouts, top to bottom)

The homepage should contain only these six blocks, in this order:

### 1. Header (sitewide, `partials/header.njk`)
- **Left:** a wordmark reading `GTA 6 WAYPOINTS` in Oswald 600, uppercase, about 22px, using our existing map-pin glyph. Below it, a tiny tagline `FAN GUIDE` in the accent pink, about 10px with 0.2em letter-spacing.
- **Right:** a status chip (a pill with a 1px hairline border and a small pulsing green dot) that reads `Guides open Nov 19`, followed by a **Menu** button (`Menu` plus a hamburger icon). Under 480px, shorten the chip to `Nov 19` and keep the dot.
- Use a transparent background over the page. The header isn't sticky on the home page. On inner pages, make it sticky with a subtle blurred background.
- Delete the current inline nav row completely.

### 2. Hero (centered)
- **Kicker:** `GTA 6 · THURSDAY 19 NOVEMBER 2026` in pink, 11–12px, uppercase, 0.25em letter-spacing.
- **H1** on two lines in Oswald 600, uppercase, `font-size: clamp(56px, 10vw, 136px)`, line-height about 0.9 and 0.5px letter-spacing. Line 1 is `Completion` in the near-white text colour. Line 2 is `companion.` in the accent pink. Put a visually hidden `GTA 6 ` at the start of the H1 for SEO, and keep `id="home-h1"`.
- **Subline** (Barlow, about 17px, muted, max 46ch, centered): "The GTA 6 map, collectibles, trophies and 100% checklists, verified in-game. Opening on launch day."
- Don't put any badges in the hero.

### 3. Countdown (reuse `partials/countdown.njk`, restyled)
- A small tracked label: `COUNTING DOWN TO THE UNLOCK IN <REGION>`. The region updates when the select changes.
- **Four separate tiles** (Days, Hours, Minutes, Seconds), each about 125×140px on desktop with a 12px radius, a 1px `rgba(255,255,255,.10)` border and a `rgba(255,255,255,.02)` fill, and about 16px gaps. Use tabular monospace digits, about 72px on desktop. The **Seconds digits are pink** and the rest are near-white. Put a tiny uppercase label under each digit.
- Below the tiles, a region **select styled as a pill**, about 280px wide, showing for example `US East · Thu 19 Nov, 00:00` with a chevron. Under it, a muted caption: "Your unlock follows the region of your PlayStation or Xbox account."
- Keep everything the countdown already does: config from `site.json`, no-JS fallback, reserved height (CLS 0), `aria-live` rules and the region logic. **Without JS, the page must never show `--` placeholders.** Show the date line instead, as CLAUDE.md specifies.
- Remove the milestones timeline and the `Unverified — testing` line from the home page. The milestones stay on `/release-date-times/`.

### 4. The midnight wave (reuse `partials/unlock-wave.njk`, restyled)
- A full-width row. On the left, H2 `THE MIDNIGHT WAVE` in Oswald 600, uppercase, about 28px. On the right, one short muted line such as "New Zealand unlocks first. US West is last, N hours later." **Compute N from the unlock data. Don't hardcode it.**
- Below, the SVG wave: a smooth curve across the full width, with a gradient stroke from pink on the left to purple on the right, hollow circle nodes for each region, a filled pink node for the first region, and a ringed node for the viewer's selected region. Label only the first region, the last region and the selected region, each showing its name and time in a small monospace style.
- Below the wave, two lines of 12px muted footnote: "Unlock times shown in your time zone (<tz>)." and "Exact unlock times aren't confirmed yet. We assume local midnight in each store region and will update the moment Rockstar says otherwise." Put **one** `{% badge "unverified" %}` at the start of the second line.
- Add a pill button: `All unlock times and the launch checklist →` linking to `/release-date-times/`.

### 5. Latest (new, small)
This block is our own addition to the layout. Keep it as quiet as the rest of the page.
- H2 `LATEST` in the same style as The Midnight Wave, with an `All news →` text link on the right.
- Show the **3 newest** items from the `news` collection as plain rows, separated by hairline dividers. Each row shows the date (muted, monospace, `Oct 16`), the title as a link, and that post's single status badge on the right. Don't use images or excerpts.

### 6. "Be there on opening day" CTA card + footer
- Put a decorative wavy band behind this section: 3–4 layered SVG wave lines in pink and purple at low opacity, with a soft magenta glow. Make it pure SVG/CSS with no images, and mark it `aria-hidden`.
- On top of the band, a rounded card (about 20px radius, 1px hairline border, translucent dark fill, backdrop blur) with two columns:
  - **Left:** H2 `BE THERE ON OPENING DAY`, then: "One email the moment GTA 6 unlocks in your region, then the day-one guide drop. No spam."
  - **Right:** the email signup from `partials/email-signup.njk`. Use one input and a **pink pill** submit button, `Get the unlock alert`, and keep the honeypot, Brevo/Netlify fallback and privacy link. Below that, two outline pills: `Add to calendar` (opens the existing Google and Apple/Outlook `.ics` options from `launch-actions.njk`) and `Share the countdown` (Web Share API, with copy-link as the fallback).
- **Footer** (sitewide, compacted): one row. On the left, the fan-site disclaimer in 12px muted text ("Fan-made. Not affiliated with Rockstar Games or Take-Two Interactive. All game names and trademarks belong to their owners."). On the right, small links: Privacy, Terms, Disclaimer, About, Contact. Under that, a second tiny row with the affiliate disclosure link, `Updated <date>`, and the "No leaks, ever." tagline. **The disclaimer stays on every page.** Move the other footerNav items (Launch checklist, Countdown widget, Gear, Waypoints Pro) into the menu.

### Remove from the homepage
Remove the "Five things Rockstar has confirmed" list, the "What opens on launch day" card grid, the launch checklist, the standalone calendar block, and the standalone signup above the countdown. Delete `headlineFacts` and `launchDay` from `index.njk` front matter, and stop including `launch-facts.njk` and `launch-checklist-short.njk` on home. Before deleting anything, check that each fact lives on `/everything-confirmed/` and that each launch-day destination is linked from `/guides/` and the menu. Don't delete the partials if other pages use them.

## Part 2: Right-side Menu dropdown (sitewide)

Move nav data into `src/_data/site.json` as `menu` (grouped) and drop the old `nav`/`footerNav` arrays once nothing references them. **Only include pages that exist in `src/content/`**, and check every URL against the build output.

```
Launch
  Everything confirmed      /everything-confirmed/
  Unlock times              /release-date-times/
  Launch checklist          /launch-checklist/
  Editions                  /editions/
  PC release                /pc-release/
Guides · open Nov 19
  Interactive map           /map/
  Collectibles              /collectibles/
  Trophies & Achievements   /trophies/
  100% checklist            /100-percent/
  Vehicles                  /vehicles/
  Money                     /money/
  Heists                    /heists/
  All guides                /guides/
The game
  News                      /news/
  Characters                /characters/
  Locations                 /locations/
  FAQ                       /faq/
More
  Countdown widget          /countdown-widget/
  Gear                      /gear/
  Waypoints Pro             /pro/
```

**Behaviour:**
- Build it on `<details class="menu"><summary>` so it opens without JS, then enhance with `enhance.js`: Esc closes, a click outside closes, the summary gets `aria-expanded`, and focus returns to the button on close.
- **Desktop (≥ 720px):** a dropdown panel anchored under the Menu button, right-aligned, about 380px wide, with max-height 80vh and its own scroll. Use the dark surface, a 1px hairline border, a 16px radius and a soft shadow. Lay the groups out in two columns: Launch and The game on the left, Guides and More on the right. Group labels are tiny uppercase pink text. Links are 15px Barlow with 44px row height, and the current page is marked with `aria-current="page"` and a pink left bar.
- **Mobile (< 720px):** a full-height sheet that slides in from the right at 100vw, with a close button in the top right and one column of groups. Lock body scroll while it's open and trap focus inside it. Under `prefers-reduced-motion`, don't animate it.
- The menu is identical on every page. Add a `.menu` test in the Part 5 checks.

## Part 3: Visual system (replaces the "Miami Vice" theme)

Keep the token **names** in `src/assets/css/tokens.css` and change the values so the site matches the reference.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0D0812` | page background (near-black plum) |
| `--surface` | `#160E1F` | tiles, menu, card |
| `--line` | `rgba(255,255,255,.10)` | hairlines and borders |
| `--text` | `#F4F1F7` | headings and digits |
| `--body` | `#E9E3F0` | body text |
| `--muted` | `#9A90A6` | captions and labels |
| `--accent` | `#EE4B83` | pink: H1 line 2, seconds, primary button, kicker |
| `--accent-2` | `#9B5CF0` | purple: wave gradient end, glows |
| `--live` | `#3DDC84` | status dot only |

- **Background:** `--bg`, with one large soft radial purple glow in the top-right of the hero (about 25% opacity) and the magenta wave band behind the CTA card. Don't add any other decoration.
- **Type:** Oswald 600 for the H1, H2s, wordmark and tile labels, always uppercase. Barlow 400/600 for body and UI text at a 15px base and 1.5 line-height. JetBrains Mono 500 for countdown digits, wave times and news dates, with `font-variant-numeric: tabular-nums`. Self-host all three as woff2 in `src/assets/fonts/` (from `@fontsource/*` or Google Fonts), preload Oswald 600, use `font-display: swap`, and set metric-matched fallbacks so there's no CLS. Remove Kanit and Atkinson Hyperlegible.
- **Layout:** a max-width 1320px container with 74px side padding on desktop and 16px on phones. The hero is centered. Every section below the hero is left-aligned. Use generous vertical rhythm, about 120px between sections on desktop and 72px on mobile.
- **Buttons:** all buttons are pills. The primary is a pink fill with white text. The secondary is a 1px hairline outline with white text. Barlow 600, 14px, 44px minimum height.
- **Badges:** keep the four existing badge styles, recoloured to sit on the new palette: Confirmed is teal, Reported is orange, Rumor is pink with "!", and Unverified is dimmed with a dashed border. **The homepage may show at most 4 badges in total** (1 in the wave footnote and 1 per news row).
- **Inner pages** (hubs, news, guides, everything-confirmed) inherit the new tokens, fonts, header, menu and footer. Restyle them only as far as needed so they don't look broken. Use the same H1 style at a smaller clamp, `clamp(40px, 6vw, 72px)`, and keep the content left-aligned at the 68ch measure.
- **Still banned:** the GTA/Pricedown font, Rockstar logos, official key art as branding, and anything that looks official.

## Part 4: Mobile (most traffic is phones; design 390px first)

- No horizontal scroll at 360, 390 or 430px. Check that `document.documentElement.scrollWidth <= innerWidth` on every page.
- **Hero:** the H1 fits on 2 lines at 390px (about 56–60px). The kicker and subline wrap cleanly.
- **Countdown:** all 4 tiles sit in a single row at 390px. Each tile is `(100% - 3 × 8px) / 4` wide, about 80px, with digits around 36px and labels around 9px.
- **Region select:** full width, at most 360px.
- **Wave:** the SVG scales to the container width with labels for the first, last and selected regions only. Stack the H2 and the right-hand line vertically.
- **Latest rows:** the date sits above the title, and the badge sits inline after the title.
- **CTA card:** stacks to one column. The input and button are full width, and the two outline pills sit side by side, wrapping if needed.
- **Footer:** stacks with the links on their own row.
- All tap targets are at least 44×44px. Body text is never smaller than 15px, and captions are never smaller than 12px.
- **Performance:** Lighthouse mobile 95+ on `/` and one hub page. The homepage ships under 2 KB of JS, excluding the existing countdown and wave scripts. Load no images above the fold. CLS is 0.

## Part 5: New news posts

Add these four posts to `src/content/news/`, using the same front matter shape as `2026-10-15-launch-trailer.md`: `title`, `description`, `date`, `updated: 2026-10-26`, `permalink`, `status`, `crumb`, `h1`, `lead`, `sources`, `related`.

1. **Rule 1:** answer the question in the first two sentences.
2. **Rule 2:** put a badge and an inline source link on every claim.
3. **Rule 3:** before publishing, open every source URL and confirm it loads and says what's written here. If a URL fails, or the source says something different, set that claim to `status: unverified`, add a `TODO:` note, and tell Lincoln. **Never upgrade a label.**
4. **Rule 4:** keep each post short, 150–300 words.

**A. `2026-09-17-gta-6-soundtrack-album.md`**: "GTA 6 soundtrack album: CD and vinyl editions, prices, ship date". `status: confirmed`.
- Confirmed: Rockstar announced *Grand Theft Auto VI: The Album*, a 34-track original soundtrack with Atlantic Records, out November 19 alongside the game. Physical CD $19.98, vinyl $49.98 (two magenta splatter LPs), limited-edition vinyl $124.98 (liquid-filled LPs). The physical editions ship from November 20. Source: [Rockstar Newswire](https://www.rockstargames.com/newswire/article/7599a881942544/announcing-grand-theft-auto-vi-the-album-coming-november-19).
- Reported: six songs are streaming now, and the vinyl variants are retail exclusives with their own posters. Source: [GTA BOOM](https://www.gtaboom.com/rockstar-is-pressing-the-complete-gta-6-soundtrack-to-vinyl-for-125-7c6c).
- Related: `/news/2026-10-08-radio-stations/`, `/everything-confirmed/`.

**B. `2026-10-02-miami-heat-night-in-vice-city.md`**: "GTA 6 x Miami Heat: 'A Night in Vice City' on November 18". `status: reported`.
- Reported (Kotaku): the Miami Heat will host "A Night in Vice City" on November 18, the night before launch, with a GTA 6-inspired court, Vice City uniforms and GTA 6 merch. Kotaku reports that Rockstar is partnering on it. Source: [Kotaku, Oct 2, 2026](https://kotaku.com/gta-6-had-a-really-busy-week-2000739409). Add a TODO to swap in the Miami Heat's own announcement link once it's found.

**C. `2026-10-16-hundreds-of-interiors.md`**: "GTA 6 has 'hundreds' of explorable interiors". `status: reported`.
- Reported (Bloomberg, Jason Schreier, Oct 16): during a studio demo at Rockstar North, Rockstar described "hundreds" of explorable interiors. No exact count was given. Source: [TalkEsport summary of Bloomberg's report](https://www.talkesport.com/news/gta-6-hundreds-of-interiors/). Add a TODO to swap in the Bloomberg URL. Say plainly that Rockstar hasn't published a number.

**D. `2026-10-16-korea-adults-only-rating.md`**: "GTA 6 rated adults-only in South Korea". `status: reported`.
- Reported (Sports Kyunghyang): South Korea's Game Content Rating Board rated GTA 6 adults-only on October 16, 2026. Source: [Sports Kyunghyang](https://sports.khan.co.kr/en/article/202610191644007).
- Confirmed context: the ESRB rating is M (Mature 17+). Source: [ESRB](https://www.esrb.org/ratings/41627/grand-theft-auto-vi/).

**Deliberately left out (don't add):**
- The "review codes sent / Nov 18 review embargo" story. It's a single insider's claim.
- Anything about the August and October leaks, including "ending spoilers".

Our no-leaks rule covers both.

After adding the posts, the homepage "Latest" block should show C, D and the Oct 15 launch trailer post. Sort C and D by date and then title. Make sure `/news/` and the sitemap pick up all four.

## Part 6: Fixes, docs and checks

- **Fix the double-escaped ampersand.** The page `<title>` and the meta and OG tags currently output `&amp;amp;` or a literal `&amp;`. Find where it's double-escaped (likely `page-meta.njk` or `jsonld.njk`) and fix it sitewide.
- **Update the homepage SEO** `description` to fit the new page, 155 characters or fewer. Keep the title, and keep WebSite + Organization JSON-LD on home.
- **Update `CLAUDE.md`:**
  - Replace the "Theme: Miami Vice" section with a short "Theme: Midnight" section summarizing Part 3: tokens, fonts, the uppercase Oswald headings rule (this replaces the old "no ALL CAPS" rule for headings only), the badge limit and the banned list.
  - Update the countdown spec: the home page uses the tile layout without milestones.
  - Update the header and footer descriptions.
  - If `docs/STYLE_GUIDE.md` or `docs/SITE_PLAN.md` describe the old homepage sections or theme, update those lines too.
- **Checks:** run `npm run build` and `npm run check`, and extend `scripts/` checks to cover:
  - Every menu URL resolves to a built page.
  - The homepage has at most 4 `.badge` elements.
  - Every page includes the footer disclaimer.
  - No page outputs `&amp;amp;`.
- **Visual QA:** take Playwright screenshots of `/` at 390×844, 768×1024 and 1440×900, of `/map/` at 390 and 1440 with the menu **open**, and of one news post at 390. Save them to `raw/qa/2026-10-26/` (gitignored). Review them against the spec above and fix any problems in spacing, alignment, type size or tile proportions. In your summary, list anything you left different on purpose.
- **Lighthouse (mobile):** run it on `/` and `/map/` if available locally. Report the scores.

## Part 7: Ship

- **Commits** use the author name Lincoln Greseth. Keep them small and descriptive:
  - `style: midnight theme tokens and fonts`
  - `feat: right-side menu dropdown`
  - `feat: centered countdown homepage`
  - `content: four news posts (Oct 26)`
  - `fix: double-escaped ampersand in meta`
  - `docs: update theme and homepage spec`

  Don't commit the two pre-existing uncommitted files, anything in `raw/`, or secrets.
- **Push** `homepage-redesign` to `origin` (github.com/LincolnGreseth/gta6-waypoints) and open a PR to `main` with `gh pr create`. The PR description should include the screenshots list, the Lighthouse scores, and any TODOs, such as source links to swap in.
- **Don't merge and don't deploy from the CLI.** Post the Netlify deploy preview URL so Lincoln can check it on his phone first.

When you finish, reply with: the PR link, the deploy preview link, the Lighthouse scores, every TODO you left, and any source that failed verification.
