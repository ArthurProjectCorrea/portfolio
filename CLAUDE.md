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

This repo defines seven custom subagents under `.claude/agents/`, each with its own trigger conditions in its frontmatter `description`. Three groups:

**Documentation-integrity agents** — invoke proactively per their own descriptions, don't wait to be asked:

- `architecture-doc-keeper` — keeps `ARCHITECTURE.md` and `CONTRIBUTING.md` truthful after structural/tooling/workflow changes.
- `architecture-compliance-reviewer` — reviews naming-language and i18n compliance after naming/file/dictionary changes.
- `knowledge-base-keeper` — keeps `content/docs/**` (technical docs of _implemented_ code) in sync after `module-implementer` finishes, or after any fix/refactor touching a documented API/type/function/queue.

**Feature-delivery pipeline** — sequential, for building or fixing a module:

1. `requirements-analyst` — produces `docs/ers/<module>.md` (formal requirements). Also owns the living `docs/INFRA.md`. Only this agent edits `docs/ers/**` and `docs/INFRA.md`; it applies a strict versioning protocol to ERS documents specifically (see the agent file for the committed-vs-uncommitted state machine). There is no mockup-building step: interface/prototype validation now happens externally (e.g. Claude Design), and the user hands the prototype plus a functional explanation directly in conversation — only the pointed, business-rule-relevant details from it go into the ERS (Section 8.1), with the prototype reference recorded in Section 10.
2. `module-implementer` — hard-gated: won't implement a module until its ERS exists. Investigates it plus `docs/INFRA.md` and whatever prototype/functional explanation the user gave for the module's screens (read via the `DesignSync` tool when a Claude Design project is involved), then either escalates inadequate documentation via a transient `docs/gaps/<module>.md` handed back to `requirements-analyst`, or proposes an implementation plan and stops for explicit user approval before writing code. Never ships temporary workarounds; always asks before adding a new dependency. On completion, writes `content/docs/<module>/`. Also owns post-launch bug fixes/config adjustments, escalating to `requirements-analyst` whenever a fix would change a documented business rule rather than patching silently.
3. `workflow` — the only agent that commits. Splits pending changes into Conventional Commits (infrastructure / one commit per module / documentation). Invoke it **only** when the user explicitly asks to commit — never on your own initiative, per this repo's git-safety rules.

**Content authoring**:

- `marketing-copywriter` — writes recruiter-facing marketing copy (headlines, bios, experience/skill framing, project blurbs, CTAs), sourced strictly from `CURRICULUM.md` and any project facts supplied in conversation. Produces ready-to-paste key/value pairs for every locale dictionary under `app/[lang]/dictionaries/*.json`. Use for page/section copy; not for component structure or layout — that's `module-implementer`'s job.

**A recurring naming gotcha**: `docs/` (ERS, `docs/INFRA.md`, `docs/gaps/`) is Portuguese prose by deliberate convention — a documented exception to the repo's English-only rule. `content/docs/` (the technical knowledge base) is a _different, similarly-named_ directory and stays English throughout, prose included. Don't conflate the two — see `ARCHITECTURE.md`'s Naming Conventions section for the full rule.
