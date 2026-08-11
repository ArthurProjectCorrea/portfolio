import Image from "next/image";
import { Download, Milestone } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n-config";
import { getLifeTimeline } from "@/lib/timeline";
import { LifeTimeline, type DisplayTimelineEvent } from "./life-timeline";

interface AboutLabels {
  eyebrow: string;
  heading: string;
  bio: string[];
  photoAlt: string;
  cvLabel: string;
  timelineHeading: string;
  present: string;
}

/** Renders "yyyy-MM" as an abbreviated month/year in the route's language. */
function formatMonthYear(yearMonth: string, lang: Locale): string {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(lang, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function AboutSection({
  lang,
  about,
}: {
  lang: Locale;
  about: AboutLabels;
}) {
  const events: DisplayTimelineEvent[] = getLifeTimeline().map((event) => ({
    id: event.id,
    kind: event.kind,
    title: event.title[lang],
    subtitle: event.subtitle,
    date: formatMonthYear(event.date, lang),
    current: event.current,
    deemphasized: event.deemphasized,
  }));
  return (
    <section
      id="about"
      className="scroll-mt-[60px] border-t border-border px-5 py-16 md:scroll-mt-[72px] md:px-10 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
            {about.eyebrow}
          </span>
          <h2 className="font-heading text-[26px] font-bold tracking-tight md:text-[34px]">
            {about.heading}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr] md:items-start md:gap-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[240px]">
            <div
              className="absolute -top-4 -left-4 right-4 bottom-4 border-2 border-primary"
              aria-hidden
            />
            <Image
              src="/photo.svg"
              alt={about.photoAlt}
              width={384}
              height={480}
              className="relative h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="flex flex-col items-start gap-4">
            {about.bio.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[65ch] leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href="/cv-arthur-correa.pdf" download />}
            >
              <Download aria-hidden />
              {about.cvLabel}
            </Button>
          </div>
        </div>

        <div>
          <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
            <Milestone className="size-4 text-primary" aria-hidden />
            {about.timelineHeading}
          </h3>
          <LifeTimeline events={events} labels={{ current: about.present }} />
        </div>
      </div>
    </section>
  );
}
