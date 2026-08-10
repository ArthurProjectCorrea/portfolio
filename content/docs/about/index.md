# About module

Home-page section presenting the author: portrait, biography, CV download, a
work-experience grid capped at the four most recent positions, an academic
education vertical timeline, and technologies grouped by category. Entirely
static and server-rendered — no client state, no external requests.

## Where it lives

| Path                                        | Role                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `components/private/home/about-section.tsx` | The section itself: layout, date formatting, promotion badge, timeline. |
| `lib/works.ts`                              | Sorts work experience and flags internal promotions.                    |
| `lib/education.ts`                          | Sorts education entries.                                                |
| `lib/technologies.ts`                       | Groups technologies by category (shared with the projects module).      |
| `data/works.ts`                             | Work experience facts, also the source of `getYearsOfExperience()`.     |
| `data/education.ts`                         | Education facts.                                                        |
| `data/technologies.ts`                      | Technology catalog and category list.                                   |

## Behaviour

- Experience and education render as two independent, full-width stacked
  blocks (each with its own heading), not side-by-side columns — matching
  the approved interface prototype.
- **Experience grid** — `getWorkTimeline()` returns every entry, most recent
  first, with promotions already flagged; the component then takes only the
  first `FEATURED_WORK_COUNT` (4) via `.slice(0, 4)`. The cut is
  display-only: the full list still feeds `getYearsOfExperience()` on the
  hero section, since that reads `data/works.ts` directly.
- Because the promotion is computed over the complete sorted list _before_
  the slice, a promotion badge on an included entry stays correct even when
  the entry that triggered it (the same-company predecessor) has been cut —
  see `HPAR Participações S/A`'s two consecutive entries in `data/works.ts`
  for a live example.
- The grid uses a fixed, asymmetric 12-column layout on desktop
  (`WORK_GRID_SPANS`, one span per position: 7/5/5/7 columns) matching the
  approved interface prototype, collapsing to a single column below the
  `md` breakpoint. It is not responsive to how many entries are shown beyond
  4 — with fewer than 4 entries, the trailing spans are simply unused.
- Entries with `techRelated: false` render at reduced opacity
  (`opacity-70`) without being removed or reordered.
- **Education timeline** — `getSortedEducation()` returns every entry
  (no cap), most recent first. Entries alternate sides of a central vertical
  axis on desktop (even index left, odd index right) and stack in a single
  column with the axis pinned to the left edge below `md`. The axis element
  is `aria-hidden` — purely decorative, never announced by assistive tech.
- Date ranges (`formatDateRange` / `formatMonthYear`) render as abbreviated
  month + year in the route's locale via `Intl.DateTimeFormat`, substituting
  the translated "present" label whenever `endDate` is `null`.
- Technologies render grouped by `technologyCategories`, skipping the
  category header only implicitly — every declared category is expected to
  have at least one technology in `data/technologies.ts`.

## Interface copy

Every string comes from the `home.about` key of
`app/[lang]/dictionaries/{en,pt-BR}.json`: `eyebrow`, `heading`, `bio`,
`photoAlt`, `cvLabel`, `timelineHeading`, `promotedFrom` (contains a literal
`{role}` placeholder), `present`, `educationHeading`, `skillsHeading` and
`skills.categories.{frontend,backend,database,tools}`.

## Related documents

- [`functions.md`](./functions.md) — `getWorkTimeline`, `getSortedEducation`
  and the component's own date-formatting helpers.
- [`types.md`](./types.md) — the `Work` and `Education` shapes.
- Requirements: `docs/ers/about.md` (Portuguese, per this repo's ERS
  convention).
