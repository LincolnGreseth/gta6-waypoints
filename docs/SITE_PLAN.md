# Site Plan — GTA 6 Waypoints

## Positioning
**The GTA 6 completion companion: collectibles, trophies, 100% map. Fast, verified, no leaks.**

IGN and Fandom will cover everything, slowly and with heavy pages. We win on three things:
1. **Speed:** answers live within hours of launch-week discoveries.
2. **Trust:** every claim carries a Confirmed / Reported / Rumor / Unverified badge and an "Updated" date.
3. **Tools:** an interactive map, completion checklists and a vehicle database, which give people a reason to come back.

## Audience by phase
- **Pre-launch (now → Nov 18):** fans hungry for anything: what's confirmed, editions, unlock times, regions.
- **Launch → week 4:** new players stuck on "how do I / where is / best way to".
- **Month 2 onward:** completionists (collectibles, trophies, 100%) and money grinders. This is the long tail that pays for the site.

## Sitemap
Use trailing slashes everywhere (11ty default). Pick one URL per topic and mention synonyms in the H1 and copy instead of making a second page.

### Live before launch (pages that can rank now)
| URL | What it is |
|---|---|
| `/` | Value prop, countdown, latest confirmed news, featured guides, email capture ("Get the day-one guide drop") |
| `/everything-confirmed/` | Living page: every confirmed fact with source and date. The pre-launch traffic magnet. |
| `/release-date-times/` | Date, plus unlock and preload times by region once Rockstar or the stores post them |
| `/editions/` | Standard vs Ultimate: contents and who should buy which |
| `/pc-release/` | Official statements only, kept updated |
| `/locations/` | Regions revealed by Rockstar (Vice City, Leonida Keys, Grassrivers, Port Gellhorn, etc.), each cited to official material |
| `/characters/` | Jason Duval, Lucia Caminos, and officially revealed NPCs. Short; becomes an entity hub post-launch. |
| `/news/` | Updates with status badges. This is the freshness signal. |
| `/faq/` | Real questions people are asking now, answered and sourced |
| `/about/`, `/contact/`, `/privacy/`, `/terms/`, `/disclaimer/` | Trust pages. The disclaimer states no affiliation with Rockstar or Take-Two. |

### Built before launch as shells, filled with real data after Nov 19
These go live as a single "launching Nov 19, sign up for the drop" page each. No placeholder data and no guessed category pages.

| URL | What it becomes |
|---|---|
| `/map/` | **Main asset.** Leonida map with filterable pins: collectibles, vehicles, points of interest, heists. Search, clusters, click-to-detail. Pins come from our own play only. |
| `/collectibles/` | Hub: every category, with counts and completion %. |
| `/collectibles/[real-category]/` | Created only once the real in-game names are known. Each has a table, map links, tips and difficulty. |
| `/trophies/` | Full list with rarity, unlock conditions, missable warnings, Platinum roadmap and a progress tracker. Use "Trophies & Achievements" in the H1 to cover Xbox. |
| `/100-percent/` | Master checklist linking every category, with estimated time and recommended order. Highest-intent page. |
| `/vehicles/` | Filterable database (data in `src/_data/vehicles.json`): stats, locations, how to get, prices. |
| `/money/` | Early-, mid- and late-game methods with verified $ per hour numbers. |
| `/heists/` | Setup, approaches, rewards, related collectibles. Individual pages once real. |
| `/guides/` | Hub for every how-to and "best of" page. Replaces a separate blog. |

### Later (only if the numbers justify it)
- `/search/` — Pagefind (free, static, built for 11ty). No Algolia needed.
- Premium tier (route optimizer, video timestamps, extra tools). **Not before February.** Decide based on traffic and on how Rockstar treats commercial fan tools.

## Page requirements (SEO and AI search)
- H1 matches search intent ("GTA 6 Hidden Packages: All Locations & Map").
- The first paragraph answers the question outright. AI Overviews, ChatGPT and Perplexity quote that paragraph.
- A visible "Updated" date and status badge, plus sources on any claim page.
- Unique title (60 characters or fewer), meta description (155 or fewer), canonical tag, descriptive image filenames and alt text.
- Internal links in a mesh: map ↔ collectible ↔ trophy ↔ 100%, and every guide up to its hub.
- Entity consistency: "GTA 6" and "Grand Theft Auto VI", Leonida, Vice City, Jason Duval, Lucia Caminos.
- XML sitemap and robots.txt submitted to Google Search Console and Bing Webmaster at launch.

### Structured data (JSON-LD), used correctly
| Schema | Use on | Note |
|---|---|---|
| WebSite + Organization | Home | Skip SearchAction; Google retired the sitelinks search box. |
| BreadcrumbList | Every page | Still shows in results |
| Article / NewsArticle | News, living pages | `dateModified` must be the real update date |
| ItemList | Collectibles, trophies, vehicles, hubs | |
| FAQPage | FAQ, end-of-guide FAQ blocks | Helps machines read the page. Google rarely shows FAQ rich results for gaming sites. |
| HowTo | Money and step guides | Fine as markup. Google no longer shows HowTo rich results. |
| ~~Place / GeoCoordinates~~ | **Don't use** | GeoCoordinates means real latitude/longitude. Fictional Leonida pins would be invalid markup. Use ItemList instead. |

## Monetization (in order)
1. **Email list from day 1.** Brevo, with "day-one guide drop" as the lead magnet. This is the asset we own.
2. **Affiliate links.** Capture cards, controllers, headsets, console bundles over the holidays. Contextual links on relevant guides only.
3. **Display ads.** Apply for AdSense once there are about 15 solid pages. Move to a premium network once traffic qualifies (check current thresholds at the time).
4. **YouTube.** Shorts drive site traffic and the site drives long-form views. The Partner Program target is in `LAUNCH_PLAN.md`.
5. **Sponsorships** from gaming brands once traffic is consistent.

No selling of anything that uses GTA trademarks.

## KPIs
| Window | Target |
|---|---|
| Pre-launch | Pre-launch pages indexed, 500+ email subs, Shorts posting daily |
| Launch week | Pages for the top 25 launch questions live within 72 hours; map has first 100 verified pins |
| Through Jan 31 | Organic sessions up week over week; Shorts tracking toward the 10M-view YPP bar |
