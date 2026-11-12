# Findings Log

Newest first. One block per find, logged the moment it happens (capture running). Full workflow in `docs/CONTENT_PIPELINE.md`, section 2.

## Template (copy this block to the top of "Log")

```markdown
### YYYY-MM-DD HH:MM (your time zone) — <what, in a few words>
- **What:** <the finding, one or two sentences; exact names, numbers, $ amounts>
- **Where:** <region / landmark / mission; map x,y if you noted it>
- **How verified:** <seen once | repeated N times | on a second save | on both PS5 and Xbox>
- **Clip:** raw/clips/<YYYY-MM-DD_HHMM_slug>.mp4 (screenshot: raw/shots/<file>.png)
- **Page to update:** /<url>/ (or "new guide: <title>")
- **Status to use:** confirmed (we saw it) | unverified (seen once, needs a retest)
- **Done:** [ ] page updated  [ ] map pin / checklist entry  [ ] Short
```

New page from a finding: `npm run new:guide -- "GTA 6: How to …"` (add `--hub money` etc.) or `npm run new:news -- "Headline"`.

## Log
