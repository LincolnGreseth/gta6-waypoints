// Build-time launch state, derived from site.json → unlock. No code change needed on Nov 19:
//   launched = LAUNCHED=1 env, or the build runs after the first region unlocks (New Zealand).
// The runtime state (per viewer's region, plus ?preview=launched) is handled in site.js.
// All copy for both states lives in site.json → launchCopy.
import { readFileSync } from "node:fs";

export default function () {
  const site = JSON.parse(readFileSync(new URL("./site.json", import.meta.url), "utf8"));
  const times = site.unlock.regions.map((r) => Date.parse(r.at));
  const firstAt = Math.min(...times), lastAt = Math.max(...times);
  const forced = process.env.LAUNCHED === "1";
  const launched = forced || Date.now() >= firstAt;
  return {
    launched,
    forced,
    firstAt: new Date(firstAt).toISOString(),
    lastAt: new Date(lastAt).toISOString(),
    copy: launched ? site.launchCopy.live : site.launchCopy.pre,
  };
}
