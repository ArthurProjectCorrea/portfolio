# Architecture

This document describes the technical architecture and conventions of this repository. It is intentionally agnostic to business rules, product features, and organizational context — it should read the same regardless of what the product does or who maintains it.

This file is a living document. It is kept in sync with the codebase by the `architecture-doc-keeper` agent (see [`.claude/agents/architecture-doc-keeper.md`](.claude/agents/architecture-doc-keeper.md)) and should never describe anything the code doesn't actually do.

## Stack

- **Framework**: Next.js, App Router
- **Language**: TypeScript
- **UI**: React (Server Components by default; Client Components only where interactivity requires it)
- **Component primitives**: shadcn/ui, generated via its CLI on top of Base UI, with Lucide as the icon set. Generated primitives are vendored into `components/ui/` and are not hand-edited — changes to them go through the shadcn CLI (add/diff), not manual patches. Because of that, `components/ui/**` and the CLI-generated `hooks/use-mobile.ts` are excluded from ESLint.
- **Styling**: Tailwind CSS. Dark mode is class-based (`.dark` variable overrides in `app/globals.css`) and driven at runtime by `next-themes`, mounted once via a global provider.
- **Linting / Formatting**: ESLint + Prettier, enforced on commit via Husky + lint-staged

## Routing & Rendering

- All routes live under the App Router (`app/`) file-convention system.
- Edge-level request handling (redirects, rewrites, header/cookie logic that must run before a route renders) belongs in `proxy.ts` at the repository root — never in ad-hoc per-route logic. Keep its matcher narrow (exclude framework internals, API routes, and static files) so it doesn't intercept requests it has no business handling.
- Server Components are the default. Reach for a Client Component only when the code needs browser APIs, state, or event handlers — mark the boundary explicitly and keep it as low in the tree as possible.

## Internationalization (i18n)

Internationalization is a first-class architectural concern, not an afterthought bolted onto individual pages.

### Routing

- Every route is nested under a locale segment (e.g. `app/[lang]/...`). There is no product route that renders without a resolved locale.
- `proxy.ts` negotiates the locale for unprefixed requests (e.g. via the `Accept-Language` header) and redirects to the locale-prefixed path. It never renders content itself — it only decides which locale segment a request should land on.
- The list of supported locales and the default locale are declared in exactly one place (a shared config module imported by both the proxy and the app layer). Nothing else hardcodes a locale list — every consumer imports from that single source of truth.

### Locale access

- Components read the current locale through the framework's root-parameter mechanism rather than prop-drilling a `lang` / `locale` value through every layer.
- Any shared utility that needs the locale (data fetching, caching, formatting) calls the same root-parameter getter directly instead of accepting it as an argument passed down from the page.
- Root-parameter getters only work in Server Components. A Client Component that needs locale-resolved content (e.g. translated labels) receives it as a prop from its nearest Server Component ancestor instead of resolving it itself.

### Content

- Every piece of user-facing text is a key in a per-locale dictionary, never a string literal inside a component or page.
- Each supported locale has exactly one dictionary file, and all dictionary files share the same key structure. Adding a new user-facing string means adding the key to **every** locale's dictionary in the same change — a dictionary is never allowed to drift out of sync with the others.
- Dictionaries are loaded lazily, scoped to the resolved locale — a request for one locale must not pull another locale's translations into the response.
- If a locale can't be resolved to a known dictionary, the route responds with "not found" rather than silently falling back to a different locale's content.
- **Narrow exception**: a structured, per-entity data record defined under `data/` may hold its own localized text as a field typed `Record<Locale, string>` (or `Record<Locale, string[]>`) instead of a dictionary key. This is only for fields that belong to one specific entity instance and have no other source of truth — such as a catalog entity's own description — where the type system itself already guarantees every locale is present for that entry, so the drift a dictionary enforces against can't occur. It does not extend to freestanding UI copy (headings, labels, button/nav/empty-state text, and the like): anything not tied to a specific data entity still belongs in the dictionaries, with no exception.

## Naming Conventions

- **English only, everywhere internal**: file names, folder names, functions, variables, types, classes, code comments, and any other text that lives inside the repository and isn't shown to an end user.
- **One narrow exception**: the _values_ inside locale dictionary files — the translated strings themselves, written in their target locale's language.
- **Casing**:
  - Files and folders: `kebab-case` (e.g. `user-profile.ts`), except framework-mandated file-convention names (`layout.tsx`, `page.tsx`, dynamic segment folders like `[lang]`).
  - Variables and functions: `camelCase`.
  - Types, interfaces, and React components: `PascalCase`.
  - True global constants: `UPPER_SNAKE_CASE` is acceptable; otherwise prefer `camelCase`.

## Directory Structure

A generic layout — actual subfolders under each of these will grow with the product, but the top-level shape should hold:

| Path                    | Purpose                                                                        |
| ----------------------- | ------------------------------------------------------------------------------ |
| `app/[locale-segment]/` | Routes, root layout, and per-locale dictionaries                               |
| `components/ui/`        | shadcn/ui primitives — CLI-generated and vendored, never hand-edited           |
| `components/shared/`    | Custom components reused across more than one module/page                      |
| `components/global/`    | App-wide context providers (theming and the like), not visible UI on their own |
| `components/private/`   | Components scoped to a single module/page, one subfolder per module            |
| `hooks/`                | Custom React hooks, alongside any CLI-generated ones                           |
| `lib/`                  | Shared, framework-agnostic configuration and utilities (e.g. the locale list)  |
| `data/`                 | Structured, per-entity data records — see the locale-field exception above     |
| `proxy.ts`              | Edge-level routing logic that runs before any route renders                    |
| `public/`               | Static assets served as-is                                                     |

The `module-implementer` agent (see [`.claude/agents/module-implementer.md`](.claude/agents/module-implementer.md)) implements modules by investigating the existing code plus whatever prototype or functional explanation the user supplies directly in conversation, proposing a plan, and stopping for explicit approval before writing code.

Business- and domain-specific folders (features, services, data models, and so on) are expected to grow inside this shape over time. This document tracks the shape itself, not what fills it.

## Tooling & Enforcement

- ESLint and Prettier define the code style; both run automatically on staged files via a Husky pre-commit hook (`lint-staged`).
- Architecture compliance (naming language, i18n usage, i18n sync across locales) is reviewed by the `architecture-compliance-reviewer` agent (see [`.claude/agents/architecture-compliance-reviewer.md`](.claude/agents/architecture-compliance-reviewer.md)), not enforced by a lint rule — treat its findings the way you'd treat a human reviewer's.

## Keeping This Document Honest

- Update this file only to reflect what the code actually does. Don't document an intended future pattern before it exists.
- Never introduce a project name, organization name, client name, or business/domain detail into this file. If a section can't be written without naming something specific to the product, it belongs in a different document, not here.
