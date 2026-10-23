// Assumed GTA 6 unlock times by store region. NOT announced by Rockstar or the stores.
// Assumption: local midnight on Nov 19, except the US, which unlocks once at midnight Eastern
// (matches the US Xbox Store listing's releaseDate metadata, 2026-11-19T05:00Z).
// When Rockstar or the stores post real times: set status to "confirmed", fix the times, update sourceUrl.
const DATE = { y: 2026, m: 11, d: 19 };

const meta = {
  status: "unverified",
  updated: "2026-10-23",
  sourceName: "US Xbox Store listing data (releaseDate 2026-11-19T05:00Z)",
  sourceUrl: "https://www.xbox.com/en-US/games/store/grand-theft-auto-vi/9p3h4968grsm",
};

const regions = [
  { id: "nz", name: "New Zealand", tz: "Pacific/Auckland" },
  { id: "au", name: "Australia (Sydney, Melbourne)", tz: "Australia/Sydney" },
  { id: "jp", name: "Japan", tz: "Asia/Tokyo" },
  { id: "kr", name: "South Korea", tz: "Asia/Seoul" },
  { id: "sg", name: "Hong Kong, Singapore, Taiwan", tz: "Asia/Singapore" },
  { id: "in", name: "India", tz: "Asia/Kolkata" },
  { id: "ae", name: "UAE", tz: "Asia/Dubai" },
  { id: "za", name: "South Africa", tz: "Africa/Johannesburg" },
  { id: "eu", name: "Central Europe (Germany, France, Spain)", tz: "Europe/Berlin" },
  { id: "uk", name: "UK and Ireland", tz: "Europe/London" },
  { id: "br", name: "Brazil (São Paulo)", tz: "America/Sao_Paulo" },
  { id: "us-et", name: "US Eastern", tz: "America/New_York", usWide: true },
  { id: "us-ct", name: "US Central", tz: "America/Chicago", usWide: true },
  { id: "us-mt", name: "US Mountain", tz: "America/Denver", usWide: true },
  { id: "us-pt", name: "US Pacific", tz: "America/Los_Angeles", usWide: true },
];

// Offset (ms) of a time zone at a given instant.
function offsetMs(tz, instant) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
      .formatToParts(instant)
      .map((x) => [x.type, x.value])
  );
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - instant;
}
// UTC instant of local midnight on DATE in tz.
function localMidnight(tz) {
  const guess = Date.UTC(DATE.y, DATE.m - 1, DATE.d);
  return guess - offsetMs(tz, guess - offsetMs(tz, guess));
}
const fmt = (tz, t) =>
  new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(t);

const usInstant = localMidnight("America/New_York");
const list = regions
  .map((r) => {
    const t = r.usWide ? usInstant : localMidnight(r.tz);
    return { ...r, utc: new Date(t).toISOString(), local: fmt(r.tz, t) };
  })
  .sort((a, b) => a.utc.localeCompare(b.utc) || a.name.localeCompare(b.name));

const first = Date.parse(list[0].utc);
list.forEach((r) => (r.hoursAfterFirst = Math.round((Date.parse(r.utc) - first) / 36e5)));

export default { meta, regions: list, spanHours: list[list.length - 1].hoursAfterFirst };
