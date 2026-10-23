import markdownItAnchor from "markdown-it-anchor";

const BADGES = {
  confirmed: "Confirmed",
  reported: "Reported",
  rumor: "Rumor",
  unverified: "Unverified — testing",
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function toDate(value) {
  if (value instanceof Date) return value;
  return new Date(value);
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addWatchTarget("src/assets/");

  eleventyConfig.amendLibrary("md", (md) => {
    md.use(markdownItAnchor, { level: [2, 3], tabIndex: false });
  });

  // {% badge "confirmed" %} → status pill. Unknown values fail loudly so typos don't ship.
  eleventyConfig.addShortcode("badge", (status = "unverified") => {
    const key = String(status).toLowerCase();
    if (!BADGES[key]) throw new Error(`Unknown badge status "${status}". Use: ${Object.keys(BADGES).join(", ")}`);
    return `<span class="badge badge--${key}">${BADGES[key]}</span>`;
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
