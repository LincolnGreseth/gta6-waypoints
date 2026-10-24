// npm run check:unlock — sanity checks for site.json → unlock.
// 1. Every `at` is a valid ISO time with an offset.
// 2. While times are assumed (status != "confirmed"): each `at` is midnight on Nov 19, 2026 in its own
//    offset, and that offset is the real, DST-correct offset of the region's main time zone on that date.
// 3. The built wave on /release-date-times/ is in the same order as the instants (needs `npm run build`).
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { unlock } = JSON.parse(readFileSync(`${root}src/_data/site.json`, "utf8"));
const ZONES = {
  nz: "Pacific/Auckland", "au-east": "Australia/Sydney", "jp-kr": "Asia/Tokyo", "cn-hk-tw": "Asia/Shanghai",
  sea: "Asia/Bangkok", in: "Asia/Kolkata", gulf: "Asia/Dubai", "eu-east": "Europe/Bucharest", "eu-cent": "Europe/Berlin",
  "uk-ie": "Europe/London", br: "America/Sao_Paulo", "us-east": "America/New_York", "us-cent": "America/Chicago",
  "us-mtn": "America/Denver", "us-west": "America/Los_Angeles",
};
const problems = [];
const offsetOf = (at) => { const m = at.match(/([+-])(\d\d):(\d\d)$/); return m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +m[3]) : null; };
const zoneOffset = (tz, t) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(t).map((x) => [x.type, x.value]));
  return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - t) / 60000);
};

for (const r of unlock.regions) {
  const t = Date.parse(r.at), off = offsetOf(r.at);
  if (Number.isNaN(t) || off === null) { problems.push(`${r.id}: "${r.at}" is not an ISO time with an offset`); continue; }
  if (unlock.status !== "confirmed") {
    if (!r.at.startsWith("2026-11-19T00:00:00")) problems.push(`${r.id}: ${r.at} is not local midnight on Nov 19, 2026`);
    const tz = ZONES[r.id];
    if (!tz) problems.push(`${r.id}: no reference time zone in scripts/check-unlock.mjs`);
    else if (zoneOffset(tz, t) !== off) problems.push(`${r.id}: offset ${off} min doesn't match ${tz} on Nov 19, 2026 (${zoneOffset(tz, t)} min)`);
  }
}

const sorted = [...unlock.regions].map((r, i) => ({ ...r, i, t: Date.parse(r.at) })).sort((a, b) => a.t - b.t || a.i - b.i).map((r) => r.id);
const built = `${root}_site/release-date-times/index.html`;
if (existsSync(built)) {
  const html = readFileSync(built, "utf8");
  const wave = [...html.matchAll(/<li data-wave-id="([^"]+)"/g)].map((m) => m[1]);
  if (wave.length && wave.join() !== sorted.join()) problems.push(`wave order ${wave.join(" > ")} doesn't match instants ${sorted.join(" > ")}`);
  if (!wave.length && !/Everyone unlocks at the same moment/.test(html)) problems.push("no wave found on /release-date-times/");
} else problems.push("no build found; run npm run build first");

if (problems.length) { console.error("✗ unlock config:\n  " + problems.join("\n  ")); process.exit(1); }
console.log(`✓ ${unlock.regions.length} unlock regions OK (${unlock.status}); wave order ${sorted[0]} → ${sorted.at(-1)}`);
