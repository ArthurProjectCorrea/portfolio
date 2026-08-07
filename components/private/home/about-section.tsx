import Image from "next/image";
import { Briefcase, Download, GraduationCap, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import {
  technologyCategories,
  type TechnologyCategory,
} from "@/data/technologies";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n-config";
import { getSortedEducation } from "@/lib/education";
import { getTechnologiesGroupedByCategory } from "@/lib/technologies";
import { getWorkTimeline } from "@/lib/works";

interface AboutLabels {
  eyebrow: string;
  heading: string;
  bio: string[];
  photoAlt: string;
  cvLabel: string;
  timelineHeading: string;
  /** Template containing a literal "{role}" placeholder. */
  promotedFrom: string;
  present: string;
  educationHeading: string;
  skillsHeading: string;
  skills: {
    categories: Record<TechnologyCategory, string>;
  };
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

function formatDateRange(
  startDate: string,
  endDate: string | null,
  lang: Locale,
  present: string,
): string {
  const start = formatMonthYear(startDate, lang);
  const end = endDate ? formatMonthYear(endDate, lang) : present;
  return `${start} – ${end}`;
}

export function AboutSection({
  lang,
  about,
}: {
  lang: Locale;
  about: AboutLabels;
}) {
  const timeline = getWorkTimeline();
  const educationEntries = getSortedEducation();
  const groupedSkills = getTechnologiesGroupedByCategory();

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

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
              <Briefcase className="size-4 text-primary" aria-hidden />
              {about.timelineHeading}
            </h3>
            <ol className="grid gap-4 md:grid-cols-2">
              {timeline.map((work) => (
                <li key={work.id}>
                  <Card
                    className={cn(work.techRelated === false && "opacity-70")}
                  >
                    <CardContent className="flex flex-col gap-1.5 p-5">
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {formatDateRange(
                          work.startDate,
                          work.endDate,
                          lang,
                          about.present,
                        )}
                      </span>
                      <span className="font-heading text-sm font-semibold">
                        {work.role[lang]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {work.name}
                      </span>
                      {work.promotedFrom ? (
                        <span className="flex items-center gap-1 text-xs font-medium text-primary">
                          <TrendingUp className="size-3" aria-hidden />
                          {about.promotedFrom.replace(
                            "{role}",
                            work.promotedFrom[lang],
                          )}
                        </span>
                      ) : null}
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {work.description[lang]}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground uppercase">
              <GraduationCap className="size-4 text-primary" aria-hidden />
              {about.educationHeading}
            </h3>
            <ul className="flex flex-col gap-4">
              {educationEntries.map((entry) => (
                <li key={entry.id}>
                  <Card>
                    <CardContent className="flex flex-col gap-1.5 p-5">
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {formatDateRange(
                          entry.startDate,
                          entry.endDate,
                          lang,
                          about.present,
                        )}
                      </span>
                      <span className="font-heading text-sm font-semibold">
                        {entry.degree[lang]}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {entry.institution}
                      </span>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {entry.description[lang]}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-semibold tracking-wide text-foreground uppercase">
            {about.skillsHeading}
          </h3>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {technologyCategories.map((category) => (
              <div key={category} className="flex flex-col gap-2.5">
                <span className="text-xs font-medium text-muted-foreground">
                  {about.skills.categories[category]}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {groupedSkills[category].map((technology) => (
                    <TechnologyBadge
                      key={technology.id}
                      technology={technology}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
