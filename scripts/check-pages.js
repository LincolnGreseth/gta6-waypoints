// npm run check: page-level checks on the built site (_site/). Run after `npm run build`.
// Fails if a page breaks the rules in CLAUDE.md → "Every page must have".
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../_site/", import.meta.url));
const site = JSON.parse(readFileSync(fileURLToPath(new URL("../src/_data/site.json", import.meta.url)), "utf8"));
const DISCLAIMER = site.disclaimer;
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

  if (!/data-disclaimer/.test(html) || !decode(html).includes(DISCLAIMER)) fail("footer fan-site disclaimer missing");
  if (!/class="menu"/.test(html)) fail("header menu missing");
  if (html.includes("&amp;amp;")) fail("double-escaped ampersand (&amp;amp;)");
  if (where === "/") {
    const badges = (html.match(/class="badge badge--/g) || []).length;
    if (badges > 4) fail(`homepage shows ${badges} badges (max 4)`);
  }
  if ((html.match(/<h1[\s>]/g) || []).length !== 1) fail("must have exactly one <h1>");

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let ld;
    try { ld = JSON.parse(m[1]); } catch { fail("invalid JSON-LD"); continue; }
    // FAQPage must match the questions people can see, both ways.
    const faq = (ld["@graph"] || []).find((g) => g["@type"] === "FAQPage");
    if (faq) {
      const marked = new Set(faq.mainEntity.map((q) => q.name.trim()));
      const main = html.split('<main')[1] || "";
      const visible = [...main.matchAll(/<h[23][^>]*>([\s\S]*?)<\/h[23]>/g)]
        .map((h) => decode(h[1].replace(/<[^>]+>/g, "")).trim())
        .filter((t) => t.endsWith("?"));
      for (const q of visible) if (!marked.has(q)) fail(`question on page but not in FAQPage JSON-LD: "${q}"`);
      for (const q of marked) if (!visible.includes(q)) fail(`FAQPage question not visible on page: "${q}"`);
    }
  }
}

for (const [t, where] of titles) if (where.length > 1) problems.push(`duplicate title "${t}" on ${where.join(", ")}`);
for (const f of ["sitemap.xml", "robots.txt"]) if (!existsSync(join(OUT, f))) problems.push(`missing /${f}`);
// Every menu and footer link resolves to a built page.
for (const item of [...site.menu.flatMap((g) => g.items), ...site.footerLinks]) {
  const file = join(OUT, item.url.replace(/^\//, ""), "index.html");
  if (!existsSync(file)) problems.push(`menu/footer link ${item.url} has no built page`);
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s) in ${pages.length} pages:\n  ` + problems.join("\n  "));
  process.exit(1);
}
console.log(`✓ ${pages.length} pages pass (titles, descriptions, updated, status, disclosures, disclaimer, menu, H1, JSON-LD, FAQ, home badges ≤4, no &amp;amp;); ${site.menu.flatMap((g) => g.items).length} menu links resolve`);
