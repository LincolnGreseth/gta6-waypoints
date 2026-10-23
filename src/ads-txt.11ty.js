// /ads.txt, generated only when site.json → ads.publisherId is set.
export const data = {
  eleventyExcludeFromCollections: true,
  permalink: (data) => (data.site.ads.publisherId ? "/ads.txt" : false),
};

export function render({ site }) {
  const pub = site.ads.publisherId.replace(/^ca-/, "");
  return `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`;
}
