# About — types

## `Work` (`data/works.ts`)

```ts
interface Work {
  id: number;
  name: string; // Company/organization name — not translated.
  role: Record<Locale, string>;
  description: Record<Locale, string>; // 1-2 line role summary.
  startDate: string; // "yyyy-MM"
  endDate: string | null; // null = current position
  techRelated?: boolean; // false de-emphasizes the entry; defaults to true
}
```

## `WorkTimelineEntry` (`lib/works.ts`)

```ts
interface WorkTimelineEntry extends Work {
  promotedFrom?: Record<Locale, string>; // role held immediately before this one at the same company
}
```

Produced only by `getWorkTimeline()`; never persisted or hand-authored.

## `Education` (`data/education.ts`)

```ts
interface Education {
  id: number;
  degree: Record<Locale, string>;
  institution: string; // Not translated.
  startDate: string; // "yyyy-MM"
  endDate: string | null; // null = in progress
  description: Record<Locale, string>;
}
```

## `AboutLabels` (`components/private/home/about-section.tsx`)

Local prop type — the `home.about` slice of a locale dictionary. See
[`index.md`](./index.md#interface-copy) for the key list.
