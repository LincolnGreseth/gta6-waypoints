// Drop a page anywhere in src/content/ and it gets a clean URL.
// src/content/everything-confirmed.md      -> /everything-confirmed/
// src/content/hubs/map.md                  -> /map/
// src/content/pages/about.md               -> /about/
// src/content/news/2026-10-15-launch-trailer.md -> /news/2026-10-15-launch-trailer/
// A `permalink` in a page's front matter overrides this.
export default {
  permalink(data) {
    const stem = data.page.filePathStem
      .replace(/^\/content/, "")
      .replace(/^\/(hubs|pages)(?=\/)/, "");
    if (stem === "/index") return "/index.html";
    return `${stem.replace(/\/index$/, "")}/index.html`;
  },
};
