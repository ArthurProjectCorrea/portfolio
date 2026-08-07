# Projects — functions

All of these live in `lib/projects.ts` and read `data/projects.ts` directly.
They are synchronous and side-effect free; nothing in the app should re-sort or
re-scan the project list by hand.

## `assertUniqueSlugs(entries: Project[]): void`

Module-private. Throws on the first repeated `slug`. It is called once at module
import time, so a duplicate fails `next build` instead of silently shadowing one
of the two detail pages that would share the address.

## `getSortedProjects(): Project[]`

Returns a copy of the list ordered featured-first, then by `completedAt`
descending (string comparison works because the format is `yyyy-MM`). This is
the single ordering used by both the listing and the neighbour navigation.

## `getProjectSlugs(): string[]`

Slugs in declaration order. Used by the detail route's `generateStaticParams`.

## `getProjectBySlug(slug: string): Project | undefined`

Exact match. `undefined` is what makes the detail page call `notFound()`.

## `getProjectNeighbors(slug: string): ProjectNeighbors`

Position of the project in `getSortedProjects()`, returning the entries before
and after it. Either side is `undefined` at the ends of the sequence, and both
are `undefined` when only one project exists — which is the current state.

## `formatCompletedAt(completedAt, lang)`

Private to `components/private/project-detail/project-detail.tsx`. Parses
`yyyy-MM` as a UTC date and formats it as a long month plus year with
`Intl.DateTimeFormat` in the route's locale (e.g. "August 2026" /
"agosto de 2026").
