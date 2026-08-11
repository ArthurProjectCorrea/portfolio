"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import {
  Award,
  Briefcase,
  GraduationCap,
  LogOut,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { TimelineEventKind } from "@/lib/timeline";

export interface DisplayTimelineEvent {
  id: string;
  kind: TimelineEventKind;
  title: string;
  subtitle: string;
  /** Already formatted for display (e.g. "Jan 2024"). */
  date: string;
  current: boolean;
  deemphasized?: boolean;
}

const KIND_ICONS: Record<TimelineEventKind, LucideIcon> = {
  "work-start": Briefcase,
  "work-promotion": TrendingUp,
  "work-end": LogOut,
  "education-start": GraduationCap,
  "education-end": Award,
};

const COLUMN_WIDTH = 152;
const COLUMN_GAP = 32;
const SCROLL_STEP = COLUMN_WIDTH + COLUMN_GAP;

interface LifeTimelineLabels {
  current: string;
}

export function LifeTimeline({
  events,
  labels,
}: {
  events: DisplayTimelineEvent[];
  labels: LifeTimelineLabels;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  function updateEdges() {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < maxScrollLeft - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth;
    updateEdges();
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const el = scrollRef.current;
    if (!el) return;
    if (event.key === "ArrowLeft") {
      el.scrollBy({ left: -SCROLL_STEP, behavior: "smooth" });
    } else if (event.key === "ArrowRight") {
      el.scrollBy({ left: SCROLL_STEP, behavior: "smooth" });
    }
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        role="list"
        tabIndex={0}
        onScroll={updateEdges}
        onKeyDown={handleKeyDown}
        style={{
          gridTemplateColumns: `repeat(${events.length}, ${COLUMN_WIDTH}px)`,
          columnGap: `${COLUMN_GAP}px`,
        }}
        className="grid grid-rows-[1fr_auto_auto_1fr] overflow-x-auto px-10 py-10 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        <div
          aria-hidden
          style={{ gridColumn: `1 / ${events.length + 1}`, gridRow: 3 }}
          className="pointer-events-none h-px self-center bg-border"
        />
        {events.map((event, index) => {
          const Icon = KIND_ICONS[event.kind];
          const above = index % 2 === 0;
          const columnStyle: CSSProperties = { gridColumn: index + 1 };
          return (
            <Fragment key={event.id}>
              <div
                style={{ ...columnStyle, gridRow: 1 }}
                className={cn(
                  "flex items-end justify-center pb-2",
                  event.deemphasized && "opacity-60",
                )}
              >
                {above ? <EventCard event={event} labels={labels} /> : null}
              </div>
              <div
                style={{ ...columnStyle, gridRow: 2 }}
                className="flex justify-center pb-1.5"
              >
                <span className="text-[11px] tabular-nums text-muted-foreground">
                  {event.date}
                </span>
              </div>
              <div
                style={{ ...columnStyle, gridRow: 3 }}
                className="flex justify-center"
              >
                <span
                  className={cn(
                    "flex size-6 shrink-0 items-center justify-center rounded-full border-2 border-background bg-card ring-1 ring-border",
                    event.current && "ring-2 ring-primary",
                  )}
                >
                  <Icon className="size-3 text-primary" aria-hidden />
                </span>
              </div>
              <div
                style={{ ...columnStyle, gridRow: 4 }}
                className={cn(
                  "flex items-start justify-center pt-2",
                  event.deemphasized && "opacity-60",
                )}
              >
                {above ? null : <EventCard event={event} labels={labels} />}
              </div>
            </Fragment>
          );
        })}
      </div>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-background to-transparent transition-opacity duration-300",
          canScrollLeft ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-background to-transparent transition-opacity duration-300",
          canScrollRight ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}

function EventCard({
  event,
  labels,
}: {
  event: DisplayTimelineEvent;
  labels: LifeTimelineLabels;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 text-center">
      <span className="font-heading text-xs leading-snug font-semibold text-balance">
        {event.title}
      </span>
      {event.subtitle !== event.title ? (
        <span className="text-[11px] leading-snug text-muted-foreground text-balance">
          {event.subtitle}
        </span>
      ) : null}
      {event.current ? (
        <span className="text-[10px] font-semibold tracking-wide text-primary uppercase">
          {labels.current}
        </span>
      ) : null}
    </div>
  );
}
