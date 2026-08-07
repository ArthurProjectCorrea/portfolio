# Projects — routes

The module exposes no Server Actions and no route handlers. Its only surface is
one page route.

## `GET /{lang}/projects`

Defined by `app/[lang]/projects/page.tsx`.

- **Inputs**: the `lang` root parameter only. No search parameters, no body.
- **Rendering**: static. The `[lang]` layout's `generateStaticParams` produces
  one prerendered page per locale (`/en/projects`, `/pt-BR/projects`).
- **Output**: the `ProjectsGrid` section with every entry of
  `getSortedProjects()`.
- **Error cases**: an unsupported locale segment resolves to `notFound()` —
  both the page's own `hasLocale` guard and `getDictionary()` enforce it, so the
  response is 404 rather than content in another language.

### `generateMetadata`

Reads `lang` from `props.params` (not from `next/root-params`, which is not
needed here) and returns:

- `title` / `description` from `dict.projects.metaTitle` / `.metaDescription`.
- `alternates.canonical` = `/{lang}/projects`.
- `alternates.languages` = one entry per locale in `lib/i18n-config.ts`.
- `openGraph` with the same title/description, `url` and `type: "website"`.

Relative URLs are resolved against the `metadataBase` declared in
`app/[lang]/layout.tsx`, which reads `siteUrl` from `lib/site-config.ts`
(`NEXT_PUBLIC_SITE_URL`, falling back to `http://localhost:3000`).
