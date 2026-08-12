# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@ARCHITECTURE.md
@CONTRIBUTING.md

## Quick Start

```bash
npm install
npm run dev
```

Full command list, code-quality gates, and the release process are in `CONTRIBUTING.md` (imported above) — don't restate them here.

There is no automated test suite (no `test` script, no test framework configured) — don't go looking for one.

### Environment Variables

All optional; each feature degrades silently (not an error) when its variable is unset. Add them to `.env.local`:

| Variable           | Powers                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------------- |
| `WAKATIME_API_KEY` | Per-project coding-time badges                                                               |
| `GITHUB_TOKEN`     | Project detail page's release version and CI status (fine-grained PAT with repo read access) |
| `RESEND_API_KEY`   | Contact form email delivery                                                                  |

## Custom Agents in This Repository

This repo defines subagents under `.claude/agents/`, each with its own trigger conditions in its frontmatter `description`. Most are **generic**: their behavior is derived entirely from whatever repository they're pointed at (this file, the project's own docs, its own code), so the same agent file should work unmodified in another repository. The exception is a small set of **private** agents built for this specific project's needs, which are explicitly allowed to reference this project's own facts/rules directly — currently just `marketing-copywriter`. When editing any agent, preserve that boundary: generic agents stay portable; only private agents encode project specifics.

**Where project-specific knowledge lives**, so the generic agents never have to hardcode it:

- Business/product context (purpose, users/personas, business rules) — `docs/context.md`, owned by the `context` agent.
- Structural conventions — `ARCHITECTURE.md` / `CONTRIBUTING.md`, owned by the `architecture` agent.
- Marketing/biographical fact — `CURRICULUM.md`, owned by `marketing-copywriter`.

**Documentation, compliance & structure** — invoke proactively per its own description, don't wait to be asked:

- `architecture` — keeps `ARCHITECTURE.md`/`CONTRIBUTING.md` truthful, reviews naming/i18n compliance, and — when consulted by `module-implementer` or `ui-ux` — advises exactly where new files/components belong and what to name them before they're created, so nothing needs reshuffling after the fact.

**Context** — invoke proactively whenever new product context surfaces in conversation:

- `context` — captures and maintains this project's purpose, users/personas, and business rules in `docs/context.md`. `module-implementer` and `ui-ux` consult it before planning/building so neither drifts from the project's real purpose or its users' real capabilities.

**Implementation and delivery**, in the order they act on a typical feature:

1. `module-implementer` — gathers whatever the user supplies in conversation, studies the existing structure, consults `context` for purpose/personas before proposing a plan that names the concrete technologies it'll use or introduce. **Stops for explicit approval before writing anything.** Once approved, consults `architecture` for exact naming/placement, then builds the backend/data/logic itself while orchestrating `ui-ux` for any user-facing surface. Never ships a temporary workaround; always asks before adding a new dependency. Also owns bug fixes/config adjustments to existing work.
2. `ui-ux` — builds the interface layer `module-implementer` hands off to it: reuses this project's own components first, then its component toolkit (shadcn/ui via the `shadcn` Skill) where configured, hand-builds only what's left over. Consults `context` for audience and `architecture` for placement.
3. _(manual step, not an agent)_ — after implementation, expect a round of user-driven correction/adjustment (UI polish, behavior tweaks) before anything is committed.
4. `code-review` — the gate immediately before a commit: runs build/lint/type-check, then reviews the diff for structural scalability (data defined in one place, the change fits the existing structure, evolving data stays localized to one place instead of rippling across the codebase). Review only — never edits, never commits.
5. `workflow` — the only agent that commits. Commits everything pending as a single Conventional Commit, picking the strongest applicable type (`feat` > `fix` > `refactor` > everything else) rather than splitting by concern. Invoke it **only** when the user explicitly asks to commit — never on your own initiative, per this repo's git-safety rules.

**If `workflow` isn't available as an invokable subagent in a given environment** (Agent-tool registration can be session-dependent), commit directly instead of skipping the step — but still follow `.claude/agents/workflow.md`'s rules exactly, especially its Step 0: once an issue number is established for the commit run, append `(#N)` to the subject line of **every** commit created in that run — not only the one whose content is most directly related to the issue — and add a `Closes: #N` line to the body of only the one commit that actually finishes the issue. `.github/workflows/wakatime-sync.yml` only logs coding time against an issue for commits that reference it; a commit missing `(#N)` isn't wrong syntactically, it just silently loses its time tracking, so never leave it off by default once an issue is in play for the run.

**Content authoring**:

- `marketing-copywriter` — _(private agent)_ writes recruiter-facing marketing copy (headlines, bios, experience/skill framing, project blurbs, CTAs), sourced strictly from `CURRICULUM.md` and any project facts supplied in conversation. Produces ready-to-paste key/value pairs for every locale dictionary under `app/[lang]/dictionaries/*.json`. Use for page/section copy; not for component structure or layout — that's `ui-ux`'s job.
