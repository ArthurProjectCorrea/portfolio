import type { Locale } from "@/lib/i18n-config";
import { getEducationEvents } from "@/lib/education";
import { getWorkEvents } from "@/lib/works";

export type TimelineEventKind =
  | "work-start"
  | "work-promotion"
  | "work-end"
  | "education-start"
  | "education-end";

export interface TimelineEvent {
  id: string;
  /** ISO "yyyy-MM". */
  date: string;
  kind: TimelineEventKind;
  title: Record<Locale, string>;
  /** Company name or institution — plain string in both source models. */
  subtitle: string;
  /** True for the single open-ended (endDate === null) event, if any. */
  current: boolean;
  /** De-emphasizes the event — carries Work.techRelated === false through. */
  deemphasized?: boolean;
}

/** Unified, chronological (oldest first) feed of work and education milestones for the about section's timeline. */
export function getLifeTimeline(): TimelineEvent[] {
  return [...getWorkEvents(), ...getEducationEvents()].sort((a, b) =>
    a.date.localeCompare(b.date),
  );
}
