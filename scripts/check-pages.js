// npm run check: page-level checks on the built site (_site/). Run after `npm run build`.
// Fails if a page breaks the rules in CLAUDE.md → "Every page must have".
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../_site/", import.meta.url));
const DISCLAIMER =
  "GTA 6 Waypoints is an independent fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive.";
const AMAZON = "As an Amazon Associate I earn from qualifying purchases.";

if (!existsSync(OUT)) {
  console.error("No _site/ folder. Run `npm run build` first.");
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

const problems = [];
const titles = new Map();
const pages = walk(OUT);

for (const file of pages) {
  const html = readFileSync(file, "utf8");
  const where = "/" + relative(OUT, file).replace(/index\.html$/, "");
  const fail = (msg) => problems.push(`${where}: ${msg}`);

  const title = decode((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "").trim();
  const desc = decode((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "").trim();
  if (!title) fail("missing <title>");
  else if (title.length > 60) fail(`title is ${title.length} characters (max 60): "${title}"`);
  if (title) titles.set(title, [...(titles.get(title) || []), where]);
  if (!desc) fail("missing meta description");
  else if (desc.length > 155) fail(`description is ${desc.length} characters (max 155)`);

  if (/data-embed/.test(html)) continue; // widget pages: no header, footer or H1 by design

  if (!/data-updated/.test(html)) fail("missing updated: date (no visible 'Updated' line)");
  if (/data-page-type="claim"/.test(html) && !/<p class="meta">\s*<span class="badge badge--/.test(html))
    fail("claim page missing status: badge");

  if (/data-aff="/.test(html)) {
    if (!/data-aff-disclosure/.test(html)) fail("has affiliate links but no affiliate disclosure (set affiliate: true)");
    if (!html.includes(AMAZON)) fail("has affiliate links but no Amazon Associates statement");
  }

  if (!/data-disclaimer/.test(html) || !html.includes(DISCLAIMER)) fail("footer fan-site disclaimer missing");
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail("must have exactly one <h1>");

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail("invalid JSON-LD"); }
  }
}

for (const [t, where] of titles) if (where.length > 1) problems.push(`duplicate title "${t}" on ${where.join(", ")}`);
for (const f of ["sitemap.xml", "robots.txt"]) if (!existsSync(join(OUT, f))) problems.push(`missing /${f}`);

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) in ${pages.length} pages:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages pass (titles, descriptions, updated, status, disclosures, disclaimer, H1, JSON-LD)`);
