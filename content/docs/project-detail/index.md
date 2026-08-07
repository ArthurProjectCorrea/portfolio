# Project detail module

One public page per project, addressed by its `slug` under the locale segment.
It is the destination of the "View Details" action on every listing card.

## Where it lives

| Path                                                   | Role                                                   |
| ------------------------------------------------------ | ------------------------------------------------------ |
| `app/[lang]/projects/[slug]/page.tsx`                  | Route, static params and per-project metadata.         |
| `app/[lang]/projects/[slug]/not-found.tsx`             | Localized 404 boundary with a way back to the listing. |
| `components/private/project-detail/project-detail.tsx` | The whole page body.                                   |
| `components/shared/project-visual.tsx`                 | 16:9 visual, shared with the projects module.          |
| `lib/projects.ts`                                      | Lookup and neighbour helpers.                          |

## Page anatomy

Breadcrumb (Home / Projects / current) → 16:9 visual with the featured badge
when applicable → `h1` with the project title → lead paragraph
(`description`) → external actions → two columns: body ("About the project",
"Technical highlights") and a sticky fact sheet (completion date, role,
technologies) → footer navigation (previous project / back to listing / next
project).

There is exactly one `h1`; every section title is an `h2`. The fact sheet is a
`<dl>` so label/value pairs are exposed to screen readers.

## Graceful degradation

No project currently has extended content, so the shipped page exercises this
path:

- Without `longDescription`, "About the project" falls back to `description`.
- Without `highlights`, the whole section — heading included — is omitted.
- Without `role`, that fact-sheet row is omitted.
- With a single project registered, both neighbour buttons render visible and
  disabled while "Back to projects" stays active.

## Interface copy

Chrome text comes from the `projectDetail` dictionary key
(`metaTitleTemplate`, `breadcrumbHome`, `breadcrumbProjects`, `back`,
`previous`, `next`, `about`, `highlights`, `factSheet`, `completedAt`, `role`,
`technologies`, `notFound.{title,description}`). The featured badge, the visual
fallback text and the repo/deploy labels are reused from the `projects` key
rather than redeclared.

## Related documents

- [`api.md`](./api.md) — the route, its static params and metadata.
- Shared data shape: [`../projects/types.md`](../projects/types.md).
- Shared helpers: [`../projects/functions.md`](../projects/functions.md).
