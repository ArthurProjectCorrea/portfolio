import { works } from "@/data/works";
import type { TimelineEvent } from "@/lib/timeline";

/** Work-derived timeline events: one per position start (flagging promotions), plus a departure event when a work has ended. */
export function getWorkEvents(): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  for (const work of works) {
    work.positions.forEach((position, index) => {
      events.push({
        id: `work-${work.id}-position-${position.id}-start`,
        date: position.startDate,
        kind: index === 0 ? "work-start" : "work-promotion",
        title: position.role,
        subtitle: work.name,
        current: position.endDate === null,
        deemphasized: work.techRelated === false,
      });
    });

    const lastPosition = work.positions[work.positions.length - 1];
    if (lastPosition.endDate) {
      events.push({
        id: `work-${work.id}-end`,
        date: lastPosition.endDate,
        kind: "work-end",
        title: { en: work.name, "pt-BR": work.name },
        subtitle: work.name,
        current: false,
        deemphasized: work.techRelated === false,
      });
    }
  }

  return events;
}
