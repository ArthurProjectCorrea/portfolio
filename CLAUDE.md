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

## Custom Agents in This Repository

This repo defines five custom subagents under `.claude/agents/`, each with its own trigger conditions in its frontmatter `description`. This is a personal portfolio with no persisted domain state or business rules — all data is mocked directly in `data/` — so there is deliberately **no requirements-documentation (ERS) step and no generated technical knowledge base**: implementation works straight from the code and whatever prototype/functional explanation the user gives in conversation.

**Documentation-integrity agents** — invoke proactively per their own descriptions, don't wait to be asked:

- `architecture-doc-keeper` — keeps `ARCHITECTURE.md` and `CONTRIBUTING.md` truthful after structural/tooling/workflow changes.
- `architecture-compliance-reviewer` — reviews naming-language and i18n compliance after naming/file/dictionary changes.

**Implementation and delivery**:

1. `module-implementer` — implements features/components directly from the existing code plus whatever prototype/functional explanation the user gave for a screen (read via the `DesignSync` tool when a Claude Design project is involved). Proposes an implementation plan and stops for explicit user approval before writing code. Never ships temporary workarounds; always asks before adding a new dependency. Also owns post-launch bug fixes/config adjustments.
2. `workflow` — the only agent that commits. Splits pending changes into Conventional Commits (infrastructure / one commit per module / documentation). Invoke it **only** when the user explicitly asks to commit — never on your own initiative, per this repo's git-safety rules.

**Content authoring**:

- `marketing-copywriter` — writes recruiter-facing marketing copy (headlines, bios, experience/skill framing, project blurbs, CTAs), sourced strictly from `CURRICULUM.md` and any project facts supplied in conversation. Produces ready-to-paste key/value pairs for every locale dictionary under `app/[lang]/dictionaries/*.json`. Use for page/section copy; not for component structure or layout — that's `module-implementer`'s job.
