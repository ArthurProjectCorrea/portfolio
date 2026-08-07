# Contributing

Thanks for taking the time to contribute. This guide covers how to get the project running locally, the conventions your changes are expected to follow, and how changes get committed.

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app reloads as you edit files.

## Before You Open a Change

Read [`ARCHITECTURE.md`](ARCHITECTURE.md) first. It defines the rules your change is expected to follow:

- **Naming**: everything internal (files, folders, functions, variables, comments) is English-only.
- **User-facing text**: never a hardcoded string — always a key added to **every** locale's dictionary in the same change, except a narrow, type-enforced exception for per-entity data records (see `ARCHITECTURE.md`).
- **Structure**: routes under the locale segment, shared config/utilities under `lib/`, edge-level routing logic in `proxy.ts`.

If a change introduces a new structural pattern (new top-level convention, new tooling, a new routing or i18n mechanism), expect `ARCHITECTURE.md` to be updated alongside it — this is largely automated (see [Keeping Docs in Sync](#keeping-docs-in-sync) below), but flag it if you notice the document falling behind.

## Code Quality

- **Lint**: `npm run lint`
- **Format**: `npm run format`

Both also run automatically on staged files via a Husky pre-commit hook — a commit will fail if it doesn't pass. Don't bypass this hook.

CI (`.github/workflows/ci.yml`) re-runs lint and format checking, plus `npm run build`, on every push and pull request against the default branch — treat these as required gates, not optional ones.

Unlike that gate, `.github/workflows/wakatime-sync.yml` is optional: for every commit in a push whose message references an issue (`#N`), it looks up that exact commit's own coding time via WakaTime's per-commit API, then updates whatever GitHub Project v2 item(s) that issue is already linked to — no separate "which project" configuration; the issue is the source of truth, and issues not yet added to a project are just skipped. It accumulates "Time Spent" (safe across multiple pushes/days, since each commit hash is looked up exactly once ever), sets "Start Date" only the first time, and always advances "End Date" to the latest commit. It silently no-ops unless `WAKATIME_API_KEY` and `GH_PROJECT_TOKEN` are configured under repo Settings → Secrets and variables → Actions, so it's safe to leave unconfigured in a fork or clone. See `.github/scripts/sync-wakatime.mjs` for the full configuration surface, including optional field-name/project-name variables.

## Commit Conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>
```

Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Write the description in the imperative, present tense ("add" not "added"), under 72 characters.

**Keep commits scoped to one concern.** A single change that touches product code, tooling/config, and documentation should generally become separate commits — one for the module(s) affected, one for infrastructure/tooling, one for documentation — rather than one commit mixing all three. If you're not committing by hand, the repository's `workflow` agent applies this splitting automatically when asked to commit.

Never commit secrets (`.env`, credentials, private keys, tokens).

Commit types and scopes aren't just cosmetic history: they directly drive the automated release described below, so get them right.

## Releases

Releases are fully automated and run only on push to the default branch (`.github/workflows/release.yml`), after that workflow's own lint and build gate passes. The workflow invokes `semantic-release` (configured in `.releaserc.json`), which:

- Determines whether a release is needed, and its version bump, from the Conventional Commit types merged since the last release.
- Generates release notes and updates `CHANGELOG.md` from those same commit messages.
- Bumps the version in `package.json` (the package is not published to a registry).
- Commits the version bump and changelog back to the default branch and publishes a GitHub Release.

Never bump the version in `package.json` or hand-edit `CHANGELOG.md` — both are owned by this process. The `release` npm script exists for that workflow to call; it needs a `GITHUB_TOKEN` and isn't meant to be run locally.

## Pull Requests

- Branch from the default branch.
- Keep the PR focused on one concern; split unrelated changes into separate PRs.
- `npm run lint`, `npm run format -- --check`, and `npm run build` are enforced by CI on every PR — make sure they pass locally before requesting review so you're not waiting on CI to find out.
- Describe _why_ the change is needed, not just what changed — the diff already shows the what.

## Keeping Docs in Sync

[`ARCHITECTURE.md`](ARCHITECTURE.md) and this file are maintained by the repository's `architecture-doc-keeper` agent as the codebase evolves — they should always describe what the code actually does, not an aspiration. If you notice either document is stale or inaccurate, that's worth flagging or fixing in the same spirit: keep it factual, and keep it free of project-specific business details (`ARCHITECTURE.md` in particular is intentionally agnostic to product/business context).
