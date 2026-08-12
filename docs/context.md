# Project Context

This file is the single source of truth for what this project is, who it's for, and what rules follow from that. Every other agent should be able to read this once and stop guessing. Owned and kept current by the `context-keeper` agent.

## Purpose

This is Arthur Correa's personal portfolio: a Next.js site (App Router, TypeScript, i18n-routed `en`/`pt-BR`) whose job is to present his professional profile — work experience, education, skills/technologies, and real shipped projects — to people evaluating him for full-stack developer work, and to give them a way to reach him directly.

Concretely, the site:

- Renders a data-driven hero whose stats (project count, years of experience, technology count) are computed at build/request time straight from `data/projects.ts`, `data/works.ts`, and `data/technologies.ts` — never hand-typed.
- Shows a projects showcase: each project card carries technology badges (brand icon + color) and, where tracked, real coding time pulled live from the WakaTime API. Project detail pages additionally show live GitHub release version and CI status when a `GITHUB_TOKEN` is configured.
- Provides a contact form that emails Arthur directly via Resend.
- Is fully bilingual (`en` default, `pt-BR`) with per-locale dictionaries and locale-prefixed routing (see `ARCHITECTURE.md` for the mechanics — that document owns the _how_, this file owns the _why_ and the resulting rules). The primary audience is Brazilian, not international: the English locale exists mainly as a skill signal (demonstrating real i18n implementation) and, secondarily, to give foreign companies a baseline-accessible read of the site (English as a near-universal fallback) — it is not there because English-speaking readers are the primary target. `en` being the technical default locale (`lib/i18n-config.ts`) is unrelated to audience priority.

There is no persisted domain state or backend "product" beyond this — all portfolio content is mocked/authored directly in `data/`, and the only write path in the whole app is the contact form's outbound email.

## Users / Personas

- **Primary: recruiters and hiring managers**, and more broadly people interested in his projects — evaluating Arthur for full-stack developer roles (front-end + back-end) or just looking into his work. This audience is primarily Brazilian (Arthur is based in Cuiabá, MT, Brazil, and the source curriculum `CURRICULUM.md` is in Portuguese), so `pt-BR` content should be treated as the primary read, not a courtesy translation of an English original. They may not be deeply technical themselves, so project descriptions and highlights need to read clearly without requiring the reader to inspect code. See Purpose above for why the site is still fully bilingual despite the audience being Brazilian-first.
- **Secondary: technical evaluators / peer developers** who go further than a recruiter would — opening linked GitHub repos, live demos, and the per-project coding-time/CI metrics — to assess actual code quality and activity, not just the marketing description.
- **Arthur himself**, as the content owner and sole source of truth for what goes into `data/` and `CURRICULUM.md` — not a "user" of the deployed site in the usual sense, but the person any content or business-rule question ultimately traces back to.

## Business Rules

- **Metrics must be derived, never hand-maintained.** Hero stats (project count, years of experience, technology count) are always computed from the data files in `data/`, not typed in as literals anywhere.
- **Project content must be factual.** Per the explicit authoring note in `data/projects.ts`: add real projects only as they're finished, and never invent outcomes or metrics for them.
- **Coding-time badges are live or absent, never faked.** A project's WakaTime coding-time badge only appears when the project is actually tracked (`wakatimeProject` set and matched on WakaTime) and `WAKATIME_API_KEY` is configured; otherwise it's silently skipped rather than showing a placeholder or stale number.
- **GitHub release/CI status on project detail pages is live or absent**, gated the same way behind `GITHUB_TOKEN` — silently skipped when unset, never faked.
- **Closed-source projects hide the GitHub CTA entirely** (`Project.private`) rather than showing it disabled — the UI never implies a repo link exists when it doesn't.
- **The contact form never trusts client-side validation.** `app/api/contact/route.ts` re-validates name/email/message server-side independently, since the route can be hit directly without going through the form UI.
- **Contact email delivery fails gracefully.** When `RESEND_API_KEY` is unset or delivery fails, the user gets an error state (toast) rather than a false success, and no request is silently dropped without feedback.
- **Contact messages always go to Arthur directly** — the recipient (`arthurdepaulacorrea@hotmail.com`) is fixed in the API route, not configurable per-request; the visitor's own email is set as `replyTo` so Arthur can respond directly.
- **All optional third-party integrations degrade silently, not loudly.** WakaTime, GitHub, and Resend are all optional (per `README.md`'s environment variable table) — their absence must never break a page or show a broken/error UI, only omit the enhancement.

## Open Questions

None currently. (Resolved: primary audience is Brazilian, with English serving as an i18n-skill signal and secondary accessibility fallback — see Purpose and Users/Personas above. Also resolved: no business rules exist beyond those already derived from the code in the Business Rules section above; Arthur confirmed nothing further as of 2026-08-12.) This section should be revisited the next time the user states or implies a rule, persona detail, or purpose nuance that isn't reflected above yet.
