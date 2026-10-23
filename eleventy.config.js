import { readFileSync } from "node:fs";
import markdownItAnchor from "markdown-it-anchor";
import { minify } from "terser";
import { writeFileSync } from "node:fs";

const BADGES = {
  confirmed: "Confirmed",
  reported: "Reported",
  rumor: "Rumor",
  unverified: "Unverified — testing",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const readJson = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), "utf8"));

function toDate(value) {
  if (value instanceof Date) return value;
  return new Date(value);
}

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/assets/img/favicon.svg": "favicon.svg" });
  eleventyConfig.addWatchTarget("src/assets/");

  // Minify the two small scripts after each build (passthrough copies them as written).
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    for (const f of ["site.js", "enhance.js"]) {
      const path = `${dir.output}/assets/js/${f}`;
      const { code } = await minify(readFileSync(path, "utf8"), { compress: true, mangle: true });
      writeFileSync(path, code);
    }
  });

  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, {
      level: [2, 3],
      tabIndex: false,
      slugify: (s) => s.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-"),
    });
    // Wide tables scroll inside their own box, never the page.
    md.renderer.rules.table_open = () => '<div class="table-wrap"><table>\n';
    md.renderer.rules.table_close = () => "</table></div>\n";
  });

  // {% badge "confirmed" %} → status pill. Unknown values fail loudly so typos don't ship.
  eleventyConfig.addShortcode("badge", (status = "unverified") => {
    const key = String(status).toLowerCase();
    if (!BADGES[key]) throw new Error(`Unknown badge status "${status}". Use: ${Object.keys(BADGES).join(", ")}`);
    return `<span class="badge badge--${key}">${BADGES[key]}</span>`;
  });

  // {% aff "id" %}link text{% endaff %} → sponsored link + visible "(paid link)".
  // Pending programs or empty URLs render the text only, never a dead link.
  eleventyConfig.addPairedShortcode("aff", (content, id) => {
    const affiliates = readJson("./src/_data/affiliates.json");
    const site = readJson("./src/_data/site.json");
    const a = affiliates.find((x) => x.id === id);
    if (!a) throw new Error(`Unknown affiliate id "${id}". Add it to src/_data/affiliates.json.`);
    if (a.network === "pending" || !a.url) return content;
    let href = a.url;
    if (a.network === "amazon" && site.affiliate?.amazonTag) {
      const u = new URL(a.url);
      u.searchParams.set("tag", site.affiliate.amazonTag);
      href = u.href;
    }
    return `<a href="${escapeHtml(href)}" rel="sponsored nofollow noopener" target="_blank" data-aff="${escapeHtml(id)}">${content}</a> <span class="paid">(paid link)</span>`;
  });

  // {% youtube "id", "Title" %} → click-to-load facade. No iframe or YouTube thumbnail until clicked.
  eleventyConfig.addShortcode("youtube", (id, title) => {
    const t = escapeHtml(title);
    return `<a class="yt" href="https://www.youtube.com/watch?v=${escapeHtml(id)}" data-yt="${escapeHtml(id)}" data-title="${t}"><span class="yt__play" aria-hidden="true"></span><span class="yt__title">${t}</span><span class="yt__meta">Plays from YouTube (youtube-nocookie.com) when you click</span></a>`;
  });

  // "Oct 23, 2026" (dates in front matter are UTC midnight, so format in UTC).
  eleventyConfig.addFilter("readableDate", (value) => {
    const d = toDate(value);
    return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (value) => toDate(value).toISOString().slice(0, 10));
  eleventyConfig.addFilter("absUrl", (path, base) => new URL(path, base).href);
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Breadcrumb trail from the URL. Ancestors use their page's `crumb` (or title).
  eleventyConfig.addFilter("crumbs", (url, all, selfName) => {
    const trail = [{ name: "Home", url: "/" }];
    if (!url || url === "/") return trail;
    const parts = url.split("/").filter(Boolean);
    let path = "/";
    parts.forEach((part, i) => {
      path += part + "/";
      const isSelf = i === parts.length - 1;
      if (isSelf) return trail.push({ name: selfName, url: path });
      const hit = (all || []).find((p) => p.url === path);
      if (hit) trail.push({ name: hit.data.crumb || hit.data.title, url: path });
    });
    return trail;
  });

  // Inline the CSS into <head>: no render-blocking stylesheet request (Lighthouse).
  eleventyConfig.addShortcode("inlineCss", () => {
    const css = ["tokens.css", "site.css"]
      .map((f) => readFileSync(new URL(`./src/assets/css/${f}`, import.meta.url), "utf8"))
      .join("\n");
    return css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{};,>])\s*/g, "$1")
      .replace(/;}/g, "}")
      .trim();
  });

  // JSON-LD graph for a page. `o` comes from partials/jsonld.njk.
  eleventyConfig.addFilter("jsonld", (o) => {
    const abs = (p) => new URL(p, o.siteUrl).href;
    const org = { "@type": "Organization", "@id": abs("/#org"), name: o.siteName, url: abs("/"), logo: abs("/favicon.svg") };
    const graph = [];
    if (o.home) {
      graph.push({ "@type": "WebSite", "@id": abs("/#website"), name: o.siteName, url: abs("/"), description: o.description, inLanguage: "en", publisher: { "@id": org["@id"] } });
      graph.push(org);
    }
    if (o.crumbs && o.crumbs.length > 1) {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: o.crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(c.url) })),
      });
    }
    if (o.article) {
      const iso = (d) => (d ? toDate(d).toISOString().slice(0, 10) : undefined);
      graph.push({
        "@type": o.article === "news" ? "NewsArticle" : "Article",
        headline: o.title,
        description: o.description,
        url: abs(o.url),
        mainEntityOfPage: abs(o.url),
        image: abs(o.image),
        datePublished: iso(o.published || o.updated),
        dateModified: iso(o.updated),
        author: { "@type": "Organization", name: o.siteName, url: abs("/") },
        publisher: { "@type": "Organization", name: o.siteName, logo: { "@type": "ImageObject", url: abs("/favicon.svg") } },
      });
    }
    if (o.faq && o.faq.length) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: o.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      });
    }
    return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  });

  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByGlob("src/content/news/*.md").sort((a, b) => b.date - a.date)
  );
  eleventyConfig.addCollection("sitemap", (api) =>
    api.getAll().filter((p) => p.url && !p.data.noindex && !p.url.endsWith(".xml") && !p.url.endsWith(".txt"))
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
