# About — functions

## `getWorkTimeline(): WorkTimelineEntry[]` (`lib/works.ts`)

Sorts `data/works.ts` most-recent-first by `startDate` and flags internal
promotions: an entry's `promotedFrom` is set when the entry immediately
before it in that order (`sorted[index + 1]`) shares the same `name`
(company). Returns the **full** list — callers that need a capped view (the
about section's experience grid) slice the result themselves, so the
promotion flag is always computed before any display-only cut is applied.

## `getSortedEducation(): Education[]` (`lib/education.ts`)

Sorts `data/education.ts` most-recent-first by `startDate`. No cap — every
entry is returned.

## `formatMonthYear(yearMonth, lang): string` (component-local)

Parses a `"yyyy-MM"` string as a UTC date and formats it as an abbreviated
month + year via `Intl.DateTimeFormat(lang, { month: "short", year:
"numeric", timeZone: "UTC" })`.

## `formatDateRange(startDate, endDate, lang, present): string` (component-local)

Builds a `"{start} – {end}"` string using `formatMonthYear` for both ends,
substituting the translated `present` label when `endDate` is `null`. Shared
by both the experience grid and the education timeline.
