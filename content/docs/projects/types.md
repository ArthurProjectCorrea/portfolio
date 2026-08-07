# Projects — types

## `Project` (`data/projects.ts`)

The single shape describing a project. It is consumed by the listing, the
detail page and `lib/site-stats.ts`, so no existing field may be renamed.

| Field             | Type                       | Required | Notes                                                               |
| ----------------- | -------------------------- | -------- | ------------------------------------------------------------------- |
| `slug`            | `string`                   | yes      | kebab-case, stable, unique. Addresses `/{lang}/projects/{slug}`.    |
| `title`           | `string`                   | yes      | Proper name, not translated.                                        |
| `description`     | `Record<Locale, string>`   | yes      | Card copy, page lead, and metadata description.                     |
| `technologies`    | `string[]`                 | yes      | Also feeds `getTechnologiesCount()`.                                |
| `repoUrl`         | `string`                   | no       | Absent → the GitHub action renders disabled.                        |
| `liveUrl`         | `string`                   | no       | Absent → the Deploy action renders disabled.                        |
| `completedAt`     | `string`                   | yes      | `yyyy-MM`. Sort key, and shown on the detail fact sheet.            |
| `image`           | `string`                   | no       | Absolute path under `/public`. Unused today — the fallback renders. |
| `featured`        | `boolean`                  | no       | Sorts first and adds the featured badge.                            |
| `longDescription` | `Record<Locale, string[]>` | no       | Detail-page body, one entry per paragraph.                          |
| `highlights`      | `Record<Locale, string[]>` | no       | Detail-page bullet list; the section disappears when absent.        |
| `role`            | `Record<Locale, string>`   | no       | Detail-page fact-sheet row; the row disappears when absent.         |

`Locale` comes from `lib/i18n-config.ts`, so `Record<Locale, …>` makes a
partially translated entry a type error — every localized field must exist in
every supported language or in none.

## Component label types

- `ProjectCardLabels` (`components/private/projects/project-card.tsx`) —
  `featured`, `imageFallbackAlt`, `actions.{repo,live,details}`.
- `ProjectsGridLabels` (`components/private/projects/projects-grid.tsx`) —
  extends `ProjectCardLabels` with `heading`, `subheading` and
  `empty.{title,description}`. Both are satisfied by the `projects` dictionary
  slice as-is.
- `ProjectNeighbors` (`lib/projects.ts`) — `{ previous?: Project; next?: Project }`.
