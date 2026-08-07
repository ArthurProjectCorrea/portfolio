# Project detail — routes

No Server Actions, no route handlers. One dynamic page route.

## `GET /{lang}/projects/{slug}`

Defined by `app/[lang]/projects/[slug]/page.tsx`.

- **Inputs**: the `lang` root parameter and the `slug` route parameter.
- **Rendering**: static. `generateStaticParams` returns `getProjectSlugs()`, and
  the `[lang]` layout contributes the locales, so the build prerenders one page
  per project per locale.
- **Output**: `<ProjectDetail>` with the resolved project, its neighbours from
  `getProjectNeighbors()`, and labels assembled from the `projects` and
  `projectDetail` dictionary keys.
- **Error cases**:
  - unsupported locale → `notFound()` (404, no content in another language);
  - unknown slug → `notFound()` (404, never a redirect to the listing and never
    another project's content).

Both cases render `app/[lang]/projects/[slug]/not-found.tsx`, which shows the
localized "project not found" message and a "back to projects" link. That
boundary falls back to `defaultLocale` for its link when the segment did not
resolve to a supported locale.

### `generateMetadata`

Reads `lang` and `slug` from `props.params`. For an unknown slug it returns an
empty object and lets the page produce the 404. Otherwise:

- `title` = `projectDetail.metaTitleTemplate` with `{project}` replaced by the
  project title — never the listing's generic title.
- `description` = the project's own `description` in the route's locale.
- `alternates.canonical` = `/{lang}/projects/{slug}`.
- `alternates.languages` = the same path under every supported locale.
- `openGraph` = title, description, `url`, `type: "article"` and
  `defaultOgImage` from `lib/site-config.ts` (`/photo.svg`), since no project
  ships an image of its own.

Relative URLs resolve against the `metadataBase` set in `app/[lang]/layout.tsx`.
