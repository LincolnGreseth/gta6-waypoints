// Renders the per-section OG images from scripts/og/section.html into src/assets/og/.
// Needs Playwright (not a site dependency): `npx -y playwright@1.56.1 install chromium` once, then
//   node scripts/og/render.mjs
// Sections and copy live here; which pages use which image is site.json → ogBySection.
import { fileURLToPath, pathToFileURL } from "node:url";
const { chromium } = await import("playwright");
const here = fileURLToPath(new URL(".", import.meta.url));
const root = fileURLToPath(new URL("../..", import.meta.url));
const SECTIONS = {
  news: { k: "GTA 6 news · labelled and sourced", l1: "Every story,", l2: "sourced." },
  launch: { k: "GTA 6 · Thursday 19 November 2026", l1: "Unlock times", l2: "& checklist." },
  guides: { k: "GTA 6 guides · verified in-game", l1: "Verified", l2: "in-game." },
  gear: { k: "GTA 6 gear · storage, pads, capture", l1: "Ready", l2: "to play." },
};
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [name, s] of Object.entries(SECTIONS)) {
  const url = pathToFileURL(`${here}section.html`).href + "?" + new URLSearchParams(s);
  await page.goto(url);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${root}src/assets/og/${name}.png` });
  console.log(`src/assets/og/${name}.png`);
}
await browser.close();
