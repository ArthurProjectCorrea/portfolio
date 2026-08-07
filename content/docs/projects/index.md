# Projects module

Public listing of every project declared in `data/projects.ts`, rendered as a
responsive grid under the locale segment.

## Where it lives

| Path                                            | Role                                                                |
| ----------------------------------------------- | ------------------------------------------------------------------- |
| `app/[lang]/projects/page.tsx`                  | Route and metadata for the listing.                                 |
| `components/private/projects/projects-grid.tsx` | Section header, responsive grid, empty state.                       |
| `components/private/projects/project-card.tsx`  | One project card: visual, title, description, badges, actions.      |
| `components/shared/project-visual.tsx`          | 16:9 visual with generated fallback, shared with the detail module. |
| `lib/projects.ts`                               | Ordering, lookup and neighbour helpers over `data/projects.ts`.     |
| `data/projects.ts`                              | The only source of project facts.                                   |

## Behaviour

- The grid renders one column below 768px, two up to 1023px and three from
  1024px, capped at 1200px wide with a 2rem gap.
- Projects are ordered featured-first, then by `completedAt` descending
  (`getSortedProjects`).
- No project ships an image asset, so every card renders the generated
  gradient + icon fallback from `ProjectVisual`.
- Up to four technology badges are shown; the rest collapse into a `+N` badge.
- "View Details" always links to `/{lang}/projects/{slug}`, which the
  project-detail module statically generates for every project.
- "GitHub" and "Deploy" open in a new tab with `rel="noopener noreferrer"`, and
  render as visible-but-disabled buttons when the project has no such URL.
- Pointer hover and keyboard focus (`focus-within`) both lift the card and fade
  in a dark overlay; `motion-reduce` variants suppress the movement.
- With no projects declared, the grid is replaced by an `Empty` block while the
  section heading stays visible.

## Interface copy

Every string comes from the `projects` key of
`app/[lang]/dictionaries/{en,pt-BR}.json`: `heading`, `subheading`,
`metaTitle`, `metaDescription`, `featured`, `actions.{repo,live,details}`,
`imageFallbackAlt` and `empty.{title,description}`.

## Related documents

- [`api.md`](./api.md) — the route and its metadata.
- [`types.md`](./types.md) — the `Project` shape.
- [`functions.md`](./functions.md) — helpers in `lib/projects.ts`.
- Project detail module: [`../project-detail/index.md`](../project-detail/index.md).
