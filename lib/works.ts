import type { Locale } from "@/lib/i18n-config";
import { works, type Work } from "@/data/works";

export interface WorkTimelineEntry extends Work {
  /** Role held immediately before this one at the same company — set only when this entry is an internal promotion. */
  promotedFrom?: Record<Locale, string>;
}

/** Experience timeline, most recent first. Flags internal promotions between consecutive entries at the same company. */
export function getWorkTimeline(): WorkTimelineEntry[] {
  const sorted = [...works].sort((a, b) =>
    b.startDate.localeCompare(a.startDate),
  );
  return sorted.map((work, index) => {
    const previous = sorted[index + 1];
    const promotedFrom =
      previous && previous.name === work.name ? previous.role : undefined;
    return { ...work, promotedFrom };
  });
}
