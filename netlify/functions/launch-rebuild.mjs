// Scheduled rebuilds around the GTA 6 unlock, so the static HTML flips to launch mode by itself
// (src/_data/launch.js decides at build time; site.js already flips each viewer at their own unlock).
//
// Runs at the first unlock (New Zealand, 11:00 UTC Nov 18), at US East midnight (05:00 UTC Nov 19)
// and after the last region (US West, 08:00 UTC Nov 19), plus a check every hour on those two days.
// Netlify cron is UTC and has no year, so the function only fires the hook inside the 2026 window.
//
// Set LAUNCH_BUILD_HOOK_URL in Netlify (Project configuration → Build & deploy → Build hooks → Add
// build hook, then Environment variables). Never commit the hook URL.
const WINDOW = [Date.parse("2026-11-18T10:55:00Z"), Date.parse("2026-11-19T12:00:00Z")];
const FIRE_AT = ["2026-11-18T11", "2026-11-19T05", "2026-11-19T08"]; // UTC hours that trigger a rebuild

export default async () => {
  const now = new Date();
  const hour = now.toISOString().slice(0, 13);
  if (now < WINDOW[0] || now > WINDOW[1] || !FIRE_AT.includes(hour)) return new Response("outside launch window", { status: 200 });
  const hook = process.env.LAUNCH_BUILD_HOOK_URL;
  if (!hook) return new Response("LAUNCH_BUILD_HOOK_URL not set", { status: 200 });
  const res = await fetch(hook, { method: "POST" });
  console.log(`launch-rebuild ${hour}: build hook → ${res.status}`);
  return new Response(`rebuild requested (${res.status})`, { status: 200 });
};

export const config = { schedule: "1 * 18,19 11 *" };
