# Research: Everything Confirmed About GTA 6

Researched **Oct 23, 2026** for `/everything-confirmed/`. This is source material for Claude Code to draft the page from, not the page itself.

## News facts added Oct 26, 2026 (homepage redesign)
Each was opened and checked on Oct 26. Labels as briefed; nothing upgraded.

- **[Confirmed]** *Grand Theft Auto VI: The Album*: announced Sep 17, 2026, 34 original tracks, made with Atlantic Records, out Nov 19 with the game; official-store exclusives are liquid-filled vinyl, splatter vinyl and a CD. [Rockstar Newswire](https://www.rockstargames.com/newswire/article/7599a881942544/announcing-grand-theft-auto-vi-the-album-coming-november-19)
- **[Confirmed]** Official album store (linked from the Rockstar post): CD $19.98; vinyl $49.98 (two transparent magenta discs with blue splatter); limited-edition vinyl $124.98 (two transparent magenta discs filled with blue liquid, sold out on Oct 26); physical editions ship Nov 20, 2026. [gtavi-thealbum.com](https://www.gtavi-thealbum.com/)
- **[Reported]** Six songs are streaming now and retail vinyl variants come with their own posters. [GTA BOOM](https://www.gtaboom.com/rockstar-is-pressing-the-complete-gta-6-soundtrack-to-vinyl-for-125-7c6c) *(Note: Rockstar's own post also says the first six singles are "available today", so the streaming line could be upgraded with that link. Left Reported pending Lincoln.)*
- **[Reported]** The Miami Heat host "A Night in Vice City" on Nov 18, 2026, the night before launch: GTA 6-inspired court, Vice City uniforms, GTA 6 merch; Kotaku reports Rockstar is partnering. [Kotaku, Oct 2](https://kotaku.com/gta-6-had-a-really-busy-week-2000739409) The Heat's own pages confirm the event (Nov 18, 7 p.m. ET, Kaseya Center) but don't name Rockstar: [nba.com/heat](https://www.nba.com/heat/uniforms/2627-heat-vice-city-uniform-collection), [@MiamiHEAT](https://x.com/MiamiHEAT/status/2106039997480697918). Label stays Reported pending Lincoln.
- **[Reported]** Rockstar described "hundreds" of explorable interiors at a Rockstar North studio demo attended by Bloomberg's Jason Schreier (Oct 16). No number published. [TalkEsport summary](https://www.talkesport.com/news/gta-6-hundreds-of-interiors/) TODO: swap in the Bloomberg URL.
- **[Reported]** South Korea's Game Content Rating Board rated GTA 6 adults-only on Oct 16, 2026. [Sports Kyunghyang](https://sports.khan.co.kr/en/article/202610191644007)
- Left out on purpose: the "review codes sent / Nov 18 review embargo" claim (single insider) and anything from the August and October leaks.

## Recheck, Oct 26, 2026 (Claude Code)
- Rockstar Newswire checked in a browser: no new Grand Theft Auto VI posts since the Oct 15 launch trailer. Nothing new on unlock times, PC, GTA Online, file size or trailers.
- Ignored: a "leaked" review-embargo date (Nov 18) and dozens of unofficial "unlock time" sites. No leaks, no unofficial times.
- Primary links swapped in: Extended Look premiere times (Rockstar Newswire, Aug 6, 2026: Netflix 3 p.m. ET, YouTube and the GTA VI site 9 p.m. ET, Aug 27) and The Album (Rockstar Newswire, Sep 17, 2026: 34 original tracks, Nov 19, vinyl and CD sets).
- Added: the first delay was announced May 2, 2025 (Rockstar Newswire: https://www.rockstargames.com/newswire/article/258aa538o412ok/grand-theft-auto-vi-is-now-coming-may-26-2026).

## Recheck, Oct 23, 2026 (Claude Code)
- No new official announcements Oct 20–23 on unlock times, PC, GTA Online, trailers, radio or file size. The latest official post is still the Oct 15 launch trailer.
- Changed with a new official source: Nov 9 earnings call (Reported → Confirmed, Take-Two IR); PS5 Pro Enhanced moved out of "Not confirmed" (PlayStation Store).
- Corrected: radio reveal date (Oct 8) and host names (on-air names are Rockstar's; real identities are Reported).
- Added: Justice score, The Album, podcasts, Aug 7 reaffirmation, single-player wording on both stores, GamesBeat PC report (Reported).
- Primary links swapped in: characters and regions, radio, Take-Two May release, Goodtime State collection. The pre-order press release is also hosted by Take-Two: https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi
- Still no primary link for the Extended Look premiere times (Kotaku stays).
- Trailer IDs verified via YouTube oEmbed: all four are correct and published by Rockstar Games.

## Unlock times (assumed, Oct 23)
- Not announced. The site shows **assumed** times from `site.json → unlock`: local midnight on Nov 19 in each of 15 store regions (New Zealand first, US West last, 21 hours later). Labelled Unverified. *(Changed Oct 23 from "US nationwide at midnight Eastern" to per-zone local midnight, per Lincoln's launch-week spec.)*
- A data point that points the other way for the US, checked in a browser Oct 23: the US Xbox Store listing's page data has `releaseDate: 2026-11-19T05:00:00Z` for the Standard and Ultimate editions. Store metadata, not an announcement. https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9p3h4968grsm
- Config: `src/_data/site.json → unlock`. Check with `node scripts/check-unlock.mjs`.

## How the labels were applied
- **Confirmed**: Rockstar, Take-Two, a platform store or a ratings board said it (press release, Newswire, Rockstar Support, official video, ESRB). Where only a secondary outlet was readable but it clearly reports an official Rockstar announcement or listing, it's still Confirmed, but the primary link should be swapped in when found (see "Primary links to swap in" below).
- **Reported**: comes from interviews or from an outlet's own reporting. The outlet is named. Don't upgrade these without an official Rockstar post.
- **Rumor**: none included on purpose.
- **Leaks**: excluded completely. Coverage of the August and October 2026 leaks was deliberately left out, including the "Rockstar responds to leak" angle.
- Conflicting details were left out rather than guessed. Example: recaps disagree on the wanted-level star count.

## Before publishing, re-check
- Anything that changes weekly: unlock times, PC news, GTA Online, new trailers or radio reveals.
- Take-Two's Nov 9 earnings call could add new official info.
- ~~The Trailer 1 and Trailer 2 YouTube IDs came from memory.~~ Verified Oct 23 via YouTube oEmbed: `QdBZY2fkU-0` = "Grand Theft Auto VI Trailer 1", `VQRLujxTm3c` = "Grand Theft Auto VI Trailer 2", both published by Rockstar Games. Also verified: `tJbzMqJGH4k` (An Extended Look), `rz1B4B2yBZY` (Launch Trailer).

## Primary links to swap in
These facts are labelled Confirmed but are currently cited to a secondary outlet:
- Supporting characters and the six regions: GamesRadar+ → Rockstar's GTA VI site (rockstargames.com/VI). Couldn't be fetched from the research environment.
- Radio stations (Oct 9): DJ Mag → Rockstar Newswire post.
- ~~Extended Look premiere times~~ Swapped Oct 26 for Rockstar's Aug 6 Newswire post: https://www.rockstargames.com/newswire/article/9k2kaa1o3297k9/grand-theft-auto-vi-an-extended-look
- Goodtime State – Vice City Collection: Gfinity → Rockstar Store listing.
- Take-Two's May 2026 reaffirmation: Screen Rant → Take-Two IR release (take2games.com/ir).

## Quick answers

| Question | Answer | Status |
|---|---|---|
| Release date | Thursday, Nov 19, 2026 | **[Confirmed]** |
| Platforms | PS5, Xbox Series X\|S | **[Confirmed]** |
| Price | $79.99 Standard, $99.99 Ultimate | **[Confirmed]** |
| Pre-load | Local midnight, Nov 12, 2026 | **[Confirmed]** |
| Physical disc | No. The box holds a download code | **[Confirmed]** |
| Pre-order bonus | Vintage Vice City Pack, plus a month of GTA+ on digital | **[Confirmed]** |
| Protagonists | Jason Duval and Lucia Caminos | **[Confirmed]** |
| ESRB rating | M (Mature 17+) | **[Confirmed]** |
| PC version | Not announced | **[Confirmed]** |
| GTA Online at launch | Not announced | **[Confirmed]** |

## Release date and platforms

- **[Confirmed]** GTA 6 launches **November 19, 2026** on **PlayStation 5** and **Xbox Series X|S**. [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** The date has moved twice: from the original fall 2025 window to May 26, 2026, then to November 19, 2026. Rockstar said the extra time was to finish the game "with the level of polish you have come to expect and deserve." [Rockstar Newswire](https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026), [Variety](https://variety.com/2025/gaming/news/gta-6-release-delayed-november-2026-1236571679/)
- **[Confirmed]** Take-Two reaffirmed the November 19 date in its May 2026 earnings report. [Take-Two IR, May 21, 2026](https://www.take2games.com/ir/news/take-two-interactive-software-inc-reports-results-fourth-2) *(primary link swapped in Oct 23)*
- **[Confirmed]** Rockstar's official platform page lists only PS5 and Xbox Series X|S. There's no PS4 or Xbox One version listed, and the PlayStation Store FAQ says the game is not playable on PS4. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions), [PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/)
- **[Confirmed]** Take-Two reports its fiscal Q2 2027 results on Monday, November 9, 2026, after US markets close, with a call at 4:30 p.m. ET. That's the last scheduled investor update before launch. [Take-Two IR](https://www.take2games.com/ir/news/take-two-interactive-software-inc-report-second-quarter-fiscal-8) *(upgraded Oct 23 from Reported: official Take-Two release, Oct 13, 2026)*
- **[Confirmed]** Take-Two also reaffirmed November 19 in its August 7, 2026 first-quarter results. [Take-Two IR](https://www.take2games.com/ir/news/take-two-interactive-software-inc-reports-results-fiscal-first-6)
- **[Confirmed]** The PlayStation Store lists GTA 6 as **PS5 Pro Enhanced**. *(The quoted "PS5 and PS5 Pro on November 19" FAQ line could not be found on the page on Oct 23; removed.)* Sony hasn't said what the enhancements are. [PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/)
- **[Confirmed]** The Xbox Store listing carries the "Optimized for Xbox Series X|S" tag. [Xbox Store](https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9p3h4968grsm)

Unlock times by region haven't been announced. We'll post them on [the release date page](/release-date-times/) as soon as Rockstar or the stores do.

## Price and editions

- **[Confirmed]** **Standard Edition: $79.99.** **Ultimate Edition: $99.99.** [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** The Ultimate Edition adds 16 bonus items, including vehicles, weapons, outfits and mod shops. Rockstar names the '95 Grotti Cheetah and the Rideout Customs Mod Shop as examples. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** Standard owners can buy the Ultimate Edition Upgrade separately at any time on the PlayStation Store or Microsoft Store. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** There's no physical Ultimate Edition. Physical Standard owners can add the upgrade digitally. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** Physical copies contain a download code. "A disc will not be included in the box." [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)

Full breakdown and which one to buy: [GTA 6 editions compared](/editions/).

## Pre-orders, pre-load and bonuses

- **[Confirmed]** Pre-orders opened at midnight local time on **June 25, 2026** on the PlayStation Store, Microsoft Store, Rockstar Games Store and retailers. [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** **Vintage Vice City Pack:** included with pre-orders and purchases of either edition made before **November 20, 2026**. It has a '55 Vapid Stanier Sedan and garage, outfits and hairstyles, and an exclusive weapon pattern. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** Digital pre-orders include **one free month of GTA+**, redeemable right away. It covers GTA Online perks and the GTA+ Games Library, which includes GTA V. On PlayStation it must be claimed by March 31, 2027 ([PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/), checked in a browser Oct 23). Physical pre-orders get the game code and the Vintage Vice City Pack but not the GTA+ month ([Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions), checked Oct 23). [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** **Pre-load starts at local midnight on November 12, 2026.** Codes redeemed before launch can pre-load from that point too. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** Physical copies ship and are available for store pickup from November 12. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Confirmed]** PlayStation codes are region-locked; Xbox codes aren't. Rockstar recommends buying from a retailer in the same country as your console account. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)

## Story and characters

- **[Confirmed]** You play as **Jason Duval** and **Lucia Caminos**. In Rockstar's words, "an easy score goes wrong" and the pair end up in a criminal conspiracy that stretches across the state of Leonida. [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** Supporting characters profiled on Rockstar's GTA VI site: Cal Hampton, Boobie Ike, Dre'Quan Priest, Real Dimez (Bae-Luxe and Roxy), Raul Bautista and Brian Heder. [Rockstar: Only in Leonida](https://www.rockstargames.com/VI/only-in-leonida) *(primary link swapped in Oct 23)*
- **[Confirmed]** You can switch between Jason and Lucia, as shown in the Extended Look. [Official video](https://www.youtube.com/watch?v=tJbzMqJGH4k), [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/)
- **[Confirmed]** The October 15 launch trailer shows Lucia wearing a monitoring ankle bracelet and Jason talking about life after the military. [Launch trailer](https://www.rockstargames.com/videos/76orsa95), [gHacks](https://www.ghacks.net/2026/10/16/rockstar-releases-the-gta-6-launch-trailer-ahead-of-the-november-19-console-release/)

Character profiles: [GTA 6 characters](/characters/).

## Setting: Vice City and Leonida

- **[Confirmed]** The game is set in the fictional US state of **Leonida**, centred on **Vice City**. [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- **[Confirmed]** Regions Rockstar has shown: **Vice City**, the **Leonida Keys**, **Grassrivers**, **Port Gellhorn**, **Ambrosia** and **Mount Kalaga National Park**. [Rockstar: Only in Leonida](https://www.rockstargames.com/VI/only-in-leonida) *(primary link swapped in Oct 23)*
- **[Reported]** Game Informer's September 29 cover story, built on developer interviews, says Rockstar aimed to recreate Florida's ecology and culture as closely as it could. [Game Informer](https://gameinformer.com/digital-issue/2026/09/29/the-grand-theft-auto-vi-digital-issue-is-now-live)

Rockstar hasn't published a full map or an official map size. Region guide: [GTA 6 locations](/locations/).

## Gameplay Rockstar has shown

Everything in this first list appears in Rockstar's own videos: the 26-minute Extended Look (August 27) and the launch trailer (October 15).

- **[Confirmed]** The Extended Look premiered on Netflix on August 27, 2026 at 3 p.m. ET, then on Rockstar's YouTube channel at 9 p.m. ET. [Rockstar Newswire, Aug 6](https://www.rockstargames.com/newswire/article/9k2kaa1o3297k9/grand-theft-auto-vi-an-extended-look)
- **[Confirmed]** Cover-based shooting, with peek-and-shoot behind walls. [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/), [Red Bull](https://www.redbull.com/int-en/gta-6-extended-look-everything-revealed)
- **[Confirmed]** Car and dirt-bike racing. [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/), [Red Bull](https://www.redbull.com/int-en/gta-6-extended-look-everything-revealed)
- **[Confirmed]** Robbing convenience stores, gas stations and phone shops. [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/)
- **[Confirmed]** Two ways to steal a car: quietly with a shim, or fast and loud by smashing the window. [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/)
- **[Confirmed]** Side activities on screen: kayaking, parasailing, basketball, scuba diving and a bench-press gym minigame. [SVG](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/), [Red Bull](https://www.redbull.com/int-en/gta-6-extended-look-everything-revealed)

These come from interviews with Rockstar staff. They're solid, but we're labelling them Reported until we see them in an official Rockstar post.

- **[Reported]** Diet, exercise and sleep change how Jason and Lucia look. Rockstar to Dazed, August 2026. [GamesRadar+](https://www.gamesradar.com/gta-6-guide/)
- **[Reported]** More activities named in Game Informer's cover story: zoo visits, off-road racing, wrestling, pool and mini-golf. [GamesRadar+](https://www.gamesradar.com/gta-6-guide/)
- **[Reported]** An expanded weather system and a dedicated team writing pedestrian dialogue. Game Informer, September 2026. [GamesRadar+](https://www.gamesradar.com/gta-6-guide/)
- **[Reported]** No microtransactions and no generative AI in the single-player game, per Rockstar North co-studio head Rob Nelson on the Kinda Funny Gamescast. [Stevivor](https://stevivor.com/news/rockstar-confirms-gta-6-launches-without-microtransactions/)

## Music and radio

*Corrected Oct 23: the reveal was October 8, not October 9, and Rockstar's own text uses on-air host names. The real artists behind them come from outlet reporting, so they're Reported.*

- **[Confirmed]** Rockstar revealed the first six radio stations and their on-air hosts on **October 8, 2026**. [Rockstar: Music of GTA VI](https://www.rockstargames.com/VI/music), [Rockstar Newswire](https://www.rockstargames.com/newswire/article/o3982oa93a23k4/the-music-of-grand-theft-auto-vi-in-game-radio-stations)

| Station | Sound | On-air hosts (Confirmed) | Reported as (DJ Mag) |
|---|---|---|---|
| Cocoteo FM | Latin | El Martillo and La Gata | Conflicting reports, left out |
| AfroBank FM | Afrobeat, amapiano, 3-step | Burna and Palmsy | Burna Boy, Palms Trax |
| The Chamber 106.6 | Classic metal | DJ Kerry and DJ Tom | Kerry King, Tom Araya |
| Flash FM | Pop | Robyn and Alex | Robyn, Alex Consani |
| Dirty South Classics | Regional rap and hip-hop | Trick and Trina | Trick Daddy, Trina |
| Back Country Radio | Country | MW and Delta Dawne | Morgan Wallen, Lana Del Rey |

- **[Confirmed]** Podcasts are on demand for the first time in the series, and you can listen to radio and podcasts on foot through headphones or earbuds connected to the in-game phone. Rockstar says the full lineup runs "from Classic Rock to Talk Radio"; those stations aren't named yet. [Rockstar: Music of GTA VI](https://www.rockstargames.com/VI/music), [Game Informer](https://gameinformer.com/2026/10/08/you-can-preview-6-of-the-radio-stations-in-grand-theft-auto-vi-right-now-plus-new)
- **[Confirmed]** **Justice** composed the official score. Their single "Flower in a Hurricane" (with Tame Impala, SZA, and King Gizzard & The Lizard Wizard) debuted with the October 15 launch trailer. [Rockstar: Music of GTA VI](https://www.rockstargames.com/VI/music)
- **[Confirmed]** **Grand Theft Auto VI: The Album** has 34 original tracks and releases November 19 on digital, CD and vinyl. Announced September 17, 2026. [Rockstar: Music of GTA VI](https://www.rockstargames.com/VI/music), [Rockstar Newswire, Sep 17](https://www.rockstargames.com/newswire/article/7599a881942544/announcing-grand-theft-auto-vi-the-album-coming-november-19)

## Age ratings

- **[Confirmed]** **ESRB: M (Mature 17+)** for Blood and Gore, Intense Violence, Mature Humor, Nudity, Strong Language, Strong Sexual Content, and Use of Drugs and Alcohol. Interactive element: In-Game Purchases. [ESRB](https://www.esrb.org/ratings/41627/grand-theft-auto-vi/)
- **[Reported]** South Korea's Game Content Rating Board gave it an adults-only rating on October 16, 2026. [Sports Kyunghyang](https://sports.khan.co.kr/en/article/202610191644007)

## GTA Online

- **[Confirmed]** Rockstar's pre-order press release describes GTA 6 as "a single-player experience." It doesn't mention an online mode. The PlayStation Store FAQ says the same ("a single-player experience"), and the Xbox Store lists "Single player". [PlayStation](https://www.playstation.com/en-us/games/grand-theft-auto-vi/), [Rockstar press release](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi), [GamesRadar+](https://www.gamesradar.com/games/grand-theft-auto/gta-6-online-looks-unlikely-for-launch-as-rockstar-refers-to-the-game-as-a-single-player-experience/)
- **[Confirmed]** The ESRB listing includes In-Game Purchases. Rockstar hasn't said what those will be. [ESRB](https://www.esrb.org/ratings/41627/grand-theft-auto-vi/)

Rockstar hasn't announced when, or in what form, online play arrives.

## PC version

- **[Confirmed]** No PC version has been announced. Rockstar's platform page covers PS5 and Xbox Series X|S only. [Rockstar Support](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- **[Reported]** Take-Two CEO Strauss Zelnick told Bloomberg in May 2026 that "Rockstar always starts on console." [TechRadar](https://www.techradar.com/gaming/take-two-ceo-says-gta-6-isnt-coming-to-pc-day-one-because-console-players-are-the-core-consumer-but-the-real-reason-is-obvious)
- **[Reported]** Xbox chief strategy officer Matthew Ball posted on October 7 that GTA 6 "will not be streaming exclusively or to PC." [Dexerto](https://www.dexerto.com/gta/xbox-confirms-gta-6-wont-stream-on-pc-3416221/)

- **[Reported]** GamesBeat reported on October 13, citing four anonymous sources, that a PC version is planned for early 2027. Rockstar didn't comment. Single-sourced. [Dexerto, summarising GamesBeat](https://www.dexerto.com/gta/gta-6-releasing-on-pc-much-earlier-than-expected-report-3418569/)

We track every official PC statement on [the PC release page](/pc-release/).

## Trailers and official videos

**Launch Trailer** (October 15, 2026)

- YouTube ID `rz1B4B2yBZY`: https://www.youtube.com/watch?v=rz1B4B2yBZY

**An Extended Look** (August 27, 2026, about 26 minutes of gameplay)

- YouTube ID `tJbzMqJGH4k`: https://www.youtube.com/watch?v=tJbzMqJGH4k

**Trailer 2** (May 6, 2025)

- YouTube ID `VQRLujxTm3c`: https://www.youtube.com/watch?v=VQRLujxTm3c

**Trailer 1** (December 5, 2023)

- YouTube ID `QdBZY2fkU-0`: https://www.youtube.com/watch?v=QdBZY2fkU-0

## Merch and collector's items

- **[Confirmed]** **The Goodtime State – Vice City Collection** is a $399.99 merch set on the Rockstar Store. It does **not** include the game ("sold separately"). It ships from November 19 and includes a Macca the Gator figure, Oakley Frogskins sunglasses, a New Era hat, a Leonida Keys crossbody bag and smaller items. [Rockstar Store](https://store.rockstargames.com/merchandise/gtavi-goodtime-state-vice-city-collection) *(primary link swapped in Oct 23; UK price not verified, removed)*

## Not confirmed yet

Rockstar hasn't announced any of these. If you see them stated as fact elsewhere, check the source.

- Regional unlock times for November 19
- A PC version or PC release date
- GTA Online for GTA 6: what it is or when it launches
- Map size or a full official map
- Playtime and number of story missions
- What the PS5 Pro enhancements are (the PS Store lists the game as PS5 Pro Enhanced)
- File size or required storage (a widely shared "676.7 GB" figure is not official)
- The full voice cast and the complete radio station list (six of the stations are named)

## FAQ seeds (sourced answers)
- **When does GTA 6 come out?** Grand Theft Auto VI launches on Thursday, November 19, 2026 on PS5 and Xbox Series X|S. Rockstar confirmed the date in November 2025 and repeated it in the June 2026 pre-order announcement.
- **How much does GTA 6 cost?** The Standard Edition is $79.99 and the Ultimate Edition is $99.99 in the US, per Rockstar's June 24, 2026 press release.
- **When can I pre-load GTA 6?** Digital pre-load starts at local midnight on November 12, 2026, one week before launch. Physical copies, which contain a download code rather than a disc, are available from November 12 too.
- **Is GTA 6 coming to PC?** Rockstar hasn't announced a PC version. Its official platform page lists only PS5 and Xbox Series X|S, and Xbox has said the game won't stream to PC at launch.
- **Does GTA 6 have GTA Online at launch?** Rockstar hasn't announced an online mode for launch. Its press release describes GTA 6 as a single-player experience.

## Draft SEO fields (checked against length limits)
- title: "GTA 6: Everything Confirmed So Far" (34 chars)
- description: "Every official GTA 6 fact in one place: Nov 19 release, $79.99 price, editions, pre-load, characters, regions, rating and PC status. Sourced and dated." (151 chars)

## Sources
1. [Rockstar Games press release: pre-orders, price and editions (Jun 24, 2026; Take-Two IR copy. The Business Wire copy blocks browsers)](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
2. [Rockstar Newswire: Pre-order Grand Theft Auto VI on June 25](https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25)
3. [Rockstar Support: Grand Theft Auto VI platforms, editions and versions (updated Aug 18, 2026)](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
4. [Rockstar Newswire: Grand Theft Auto VI is now set to launch November 19, 2026](https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026)
5. [Variety: GTA 6 release delayed to November 2026](https://variety.com/2025/gaming/news/gta-6-release-delayed-november-2026-1236571679/)
6. [Forbes: GTA 6 release date and everything confirmed (May 12, 2026)](https://www.forbes.com/sites/brianmazique/2026/05/12/grand-theft-auto-6-release-date-and-everything-confirmed/)
7. [Screen Rant: GTA 6 release date update in Take-Two's May 2026 earnings](https://screenrant.com/gta-6-release-date-update-earnings-call-may-2026/)
8. [ESRB: Grand Theft Auto VI rating](https://www.esrb.org/ratings/41627/grand-theft-auto-vi/)
9. [Rockstar Games: Grand Theft Auto VI Launch Trailer](https://www.rockstargames.com/videos/76orsa95)
10. [Rockstar Games on YouTube: Grand Theft Auto VI, An Extended Look](https://www.youtube.com/watch?v=tJbzMqJGH4k)
11. [Kotaku: Extended Look premieres on Netflix Aug 27](https://kotaku.com/gta-6-extended-look-will-premier-exclusively-on-netflix-as-fans-beg-for-trailer-3-2000722148)
12. [SVG: What Rockstar showed in the Extended Look](https://www.svg.com/2246094/gta-6-extended-look-gameplay-rockstar-confirmed/)
13. [Red Bull: GTA 6 Extended Look, everything revealed](https://www.redbull.com/int-en/gta-6-extended-look-everything-revealed)
14. [gHacks: Rockstar releases the GTA 6 launch trailer (Oct 16, 2026)](https://www.ghacks.net/2026/10/16/rockstar-releases-the-gta-6-launch-trailer-ahead-of-the-november-19-console-release/)
15. [GamesRadar+: GTA 6, everything we know (updated Oct 15, 2026)](https://www.gamesradar.com/gta-6-guide/)
16. [GamesRadar+: Rockstar calls GTA 6 a single-player experience](https://www.gamesradar.com/games/grand-theft-auto/gta-6-online-looks-unlikely-for-launch-as-rockstar-refers-to-the-game-as-a-single-player-experience/)
17. [DJ Mag: Rockstar reveals GTA 6 radio stations and hosts (Oct 9, 2026)](https://djmag.com/news/gta-6-radio-stations-be-hosted-robyn-palms-trax-bad-bunny-more)
18. [Gfinity: The Goodtime State – Vice City Collection](https://www.gfinityesports.com/article/everything-included-in-gta-6-the-goodtime-state-vice-city-collection)
19. [Game Informer: The Grand Theft Auto VI digital issue (Sep 29, 2026)](https://gameinformer.com/digital-issue/2026/09/29/the-grand-theft-auto-vi-digital-issue-is-now-live)
20. [Stevivor: Rockstar says GTA 6 single-player has no microtransactions](https://stevivor.com/news/rockstar-confirms-gta-6-launches-without-microtransactions/)
21. [TechRadar: Zelnick on console-first launch (Bloomberg interview, May 2026)](https://www.techradar.com/gaming/take-two-ceo-says-gta-6-isnt-coming-to-pc-day-one-because-console-players-are-the-core-consumer-but-the-real-reason-is-obvious)
22. [Dexerto: Xbox says GTA 6 won't stream to PC (Oct 7, 2026)](https://www.dexerto.com/gta/xbox-confirms-gta-6-wont-stream-on-pc-3416221/)
23. [Sports Kyunghyang: GTA 6 gets adults-only rating in Korea (Oct 19, 2026)](https://sports.khan.co.kr/en/article/202610191644007)
24. [GTA BOOM: Take-Two sets Nov 9 earnings call](https://www.gtaboom.com/the-final-take-two-investor-update-before-gta-6-is-set-for-november-9-40ac)
