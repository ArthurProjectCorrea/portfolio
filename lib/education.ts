import { education, type Education } from "@/data/education";
import type { TimelineEvent } from "@/lib/timeline";

/** In-progress/most-recently-started entries first. */
export function getSortedEducation(): Education[] {
  return [...education].sort((a, b) => b.startDate.localeCompare(a.startDate));
}

/** Education-derived timeline events: one per entry start, plus a completion event when the entry has ended. */
export function getEducationEvents(): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const entry of education) {
    events.push({
      id: `education-${entry.id}-start`,
      date: entry.startDate,
      kind: "education-start",
      title: entry.degree,
      subtitle: entry.institution,
      current: entry.endDate === null,
    });

    if (entry.endDate) {
      events.push({
        id: `education-${entry.id}-end`,
        date: entry.endDate,
        kind: "education-end",
        title: entry.degree,
        subtitle: entry.institution,
        current: false,
      });
    }
  }

  return events;
}
