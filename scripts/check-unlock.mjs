// npm run check:unlock — sanity checks for site.json → unlock.
// 1. Every `at` is a valid ISO time with an offset, and every region status is confirmed|unverified.
// 2. Every region's offset is the real, DST-correct offset of its reference time zone at that instant.
// 3. While the rule is "local-midnight" (assumed while unverified, Rockstar's wording once confirmed),
//    each `at` is midnight on Nov 19, 2026 in its own offset. Set unlock.rule to "fixed" to skip this
//    (for example if Rockstar posts one worldwide instant).
// 4. Confirmed mode: unlock.sourceUrl is set, and any region still marked unverified carries a note.
// 5. The built wave on /release-date-times/ is in the same order as the instants, and the wave copy on
//    the home page and /release-date-times/ names the right first/last regions and hour gap (needs a build).
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
const confirmed = unlock.status === "confirmed";
const midnightRule = (unlock.rule || "local-midnight") === "local-midnight";
const problems = [];
const offsetOf = (at) => { const m = at.match(/([+-])(\d\d):(\d\d)$/); return m ? (m[1] === "-" ? -1 : 1) * (+m[2] * 60 + +m[3]) : null; };
const zoneOffset = (tz, t) => {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(t).map((x) => [x.type, x.value]));
  return Math.round((Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - t) / 60000);
};

if (!["confirmed", "unverified"].includes(unlock.status)) problems.push(`unlock.status "${unlock.status}" must be confirmed or unverified`);
if (confirmed && !unlock.sourceUrl) problems.push("unlock.status is confirmed but unlock.sourceUrl is empty");
const ids = new Set();
for (const r of unlock.regions) {
  if (ids.has(r.id)) problems.push(`${r.id}: duplicate id`);
  ids.add(r.id);
  const t = Date.parse(r.at), off = offsetOf(r.at);
  if (Number.isNaN(t) || off === null) { problems.push(`${r.id}: "${r.at}" is not an ISO time with an offset`); continue; }
  if (off < -12 * 60 || off > 14 * 60) problems.push(`${r.id}: offset ${off} min is outside UTC−12…UTC+14`);
  if (r.status && !["confirmed", "unverified"].includes(r.status)) problems.push(`${r.id}: status "${r.status}" must be confirmed or unverified`);
  if (confirmed && r.status === "unverified" && !r.note) problems.push(`${r.id}: unverified region needs a note saying why`);
  if (!confirmed && r.status === "confirmed") problems.push(`${r.id}: region is confirmed while unlock.status isn't`);
  if (midnightRule && !r.at.startsWith("2026-11-19T00:00:00")) problems.push(`${r.id}: ${r.at} is not local midnight on Nov 19, 2026`);
  const tz = ZONES[r.id];
  if (!tz) problems.push(`${r.id}: no reference time zone in scripts/check-unlock.mjs`);
  else if (zoneOffset(tz, t) !== off) problems.push(`${r.id}: offset ${off} min doesn't match ${tz} on Nov 19, 2026 (${zoneOffset(tz, t)} min)`);
}

const list = [...unlock.regions].map((r, i) => ({ ...r, i, t: Date.parse(r.at) })).sort((a, b) => a.t - b.t || a.i - b.i);
const sorted = list.map((r) => r.id);
const first = list[0], last = list.at(-1);
const span = Math.round(((last.t - first.t) / 36e5) * 10) / 10;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const built = `${root}_site/release-date-times/index.html`;
if (existsSync(built)) {
  const html = readFileSync(built, "utf8");
  const wave = [...html.matchAll(/<li data-wave-id="([^"]+)"/g)].map((m) => m[1]);
  if (wave.length && wave.join() !== sorted.join()) problems.push(`wave order ${wave.join(" > ")} doesn't match instants ${sorted.join(" > ")}`);
  if (!wave.length && !/Everyone unlocks at the same moment/.test(html)) problems.push("no wave found on /release-date-times/");
  if (wave.length && !new RegExp(`${esc(last.name)} unlocks ${span} hours after ${esc(first.name)}`).test(html)) problems.push(`/release-date-times/ wave lead doesn't say "${last.name} unlocks ${span} hours after ${first.name}"`);
  const home = `${root}_site/index.html`;
  if (existsSync(home) && wave.length) {
    const h = readFileSync(home, "utf8");
    if (!new RegExp(`${esc(first.name)} unlocks first\\. ${esc(last.name)} is last, ${span} hours later\\.`).test(h)) problems.push(`home wave copy doesn't say "${first.name} unlocks first. ${last.name} is last, ${span} hours later."`);
  }
} else problems.push("no build found; run npm run build first");

if (problems.length) { console.error("✗ unlock config:\n  " + problems.join("\n  ")); process.exit(1); }
const unv = unlock.regions.filter((r) => r.status === "unverified").map((r) => r.id);
console.log(`✓ ${unlock.regions.length} unlock regions OK (${unlock.status}${unv.length ? `; unverified: ${unv.join(", ")}` : ""}); wave ${sorted[0]} → ${sorted.at(-1)}, ${span}h`);
