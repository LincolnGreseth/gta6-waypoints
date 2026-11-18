# Guide queue: launch week

Priority order for writing up the draft skeletons in `src/content/guides/` once we've verified the answers in-game. Each file has `draft: true`, so it isn't built, listed or in the sitemap until we flip it.

Picked from what people search in the first week of past Rockstar launches (beginner tips, early money, best early cars, saving, wanted levels, trophies and missables, settings, how long to beat). No game facts are in the skeletons; every answer is a TODO.

To publish one: fill every TODO from `findings-log.md`, add `sources:` ("In-game, verified by GTA 6 Waypoints" plus the clip filename), set `status:`, set `verified:` to the date, remove `draft: true`, run `npm run build && npm run check`.

## Launch night: verify these 10 first (re-sorted Nov 18)

These are the questions people search in the first hours, and the ones you can answer in your first session without spoiling the story. Each stays `draft: true` until every TODO is a verified fact.

| # | Guide | Hub | What to capture tonight | File |
|---|---|---|---|---|
| 1 | GTA 6 Beginner Tips: What to Do First | `guides` | Anything you wish you'd known in the first hour; no story beats | `src/content/guides/beginner-tips.md` |
| 2 | GTA 6 Best Settings to Change First | `guides` | Settings menu pages (screenshot each), what you changed and why | `src/content/guides/best-settings.md` |
| 3 | GTA 6: How to Save Your Game | `guides` | Manual save, autosave indicator, where/when saving is allowed | `src/content/guides/how-to-save.md` |
| 4 | GTA 6: How to Make Money Fast Early | `money` | Every early $ source with amount and time taken (clip the payout) | `src/content/guides/fast-money-early.md` |
| 5 | GTA 6 Best Early Cars and Where to Find Them | `vehicles` | Car name, where it spawned, how you got it, rough top speed feel | `src/content/guides/best-early-cars.md` |
| 6 | GTA 6: How to Switch Between Jason and Lucia | `guides` | When switching unlocks (no story detail), the button, any limits | `src/content/guides/switch-characters.md` |
| 7 | GTA 6: How to Lose a Wanted Level Fast | `guides` | What lowered stars, how long it took, what didn't work | `src/content/guides/lose-wanted-level.md` |
| 8 | GTA 6 Fast Travel: How to Get Around Quickly | `guides` | Whether fast travel exists, how it unlocks, cost | `src/content/guides/fast-travel.md` |
| 9 | GTA 6 Safehouses: Where You Live and How to Get More | `guides` | First safehouse area (no map image), what it does (save, wardrobe…) | `src/content/guides/first-safehouse.md` |
| 10 | GTA 6 Graphics Modes on PS5, PS5 Pro and Xbox | `guides` | Which modes exist on your console, menu screenshot, how it feels | `src/content/guides/graphics-modes-ps5-pro.md` |

## After the first 10

| # | Guide | Hub | Search intent | File |
|---|---|---|---|---|
| 11 | GTA 6 Trophy Roadmap: Platinum Guide | `trophies` | trophy roadmap / platinum | `src/content/guides/trophy-roadmap.md` |
| 12 | GTA 6 Missable Trophies and Achievements | `trophies` | missable trophies | `src/content/guides/missable-trophies.md` |
| 13 | GTA 6 Collectibles: Every Type and Count | `collectibles` | collectibles list | `src/content/guides/collectibles-list.md` |
| 14 | GTA 6 Map: Regions and How the Map Works | `map` | map regions / how the map works | `src/content/guides/map-regions.md` |
| 15 | GTA 6 Best Early Weapons and Where to Get Them | `guides` | best early weapons | `src/content/guides/best-weapons-early.md` |
| 16 | GTA 6: How to Steal Cars Quietly | `vehicles` | how to steal cars | `src/content/guides/steal-cars.md` |
| 17 | GTA 6: How to Rob Stores and How Much You Get | `money` | store robberies | `src/content/guides/rob-stores.md` |
| 18 | GTA 6 First Heist Guide: Setup and Payout | `heists` | first heist | `src/content/guides/first-heist.md` |
| 19 | How Long Is GTA 6? Story and 100% Time | `100-percent` | how long to beat | `src/content/guides/how-long-to-beat.md` |
| 20 | GTA 6 100% Completion Requirements | `100-percent` | 100% requirements | `src/content/guides/100-percent-requirements.md` |
| 21 | GTA 6 Cheats: Are There Cheat Codes? | `guides` | cheat codes | `src/content/guides/cheats.md` |
| 22 | GTA 6 Radio: How to Change Stations and Play Podcasts | `guides` | radio and podcasts | `src/content/guides/radio-and-podcasts.md` |
| 23 | GTA 6: How Fitness and Appearance Work | `guides` | fitness / appearance | `src/content/guides/fitness-and-appearance.md` |
| 24 | GTA 6 Side Activities: Every One We've Found | `guides` | side activities | `src/content/guides/side-activities.md` |
| 25 | GTA 6 Phone Guide: Apps and What They Do | `guides` | phone apps | `src/content/guides/phone-guide.md` |

Trophy, collectible and map guides (11–14) are spoiler-adjacent: publish counts and lists only after you've seen them in your own game, never from early-copy or leaked trophy lists.
