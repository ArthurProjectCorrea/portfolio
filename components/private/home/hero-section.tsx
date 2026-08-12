import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import type { Locale } from "@/lib/i18n-config";
import { getSectionHref } from "@/lib/nav-links";
import {
  getFavoriteTechnologies,
  getProjectsCount,
  getTechnologiesCount,
  getYearsOfExperience,
} from "@/lib/site-stats";

interface HeroLabels {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaProjects: string;
  ctaContact: string;
  photoAlt: string;
  stats: {
    projects: string;
    years: string;
    technologies: string;
  };
}

export function HeroSection({
  lang,
  hero,
}: {
  lang: Locale;
  hero: HeroLabels;
}) {
  const stats = [
    { value: `${getProjectsCount()}`, label: hero.stats.projects },
    { value: `${getYearsOfExperience()}+`, label: hero.stats.years },
    { value: `${getTechnologiesCount()}+`, label: hero.stats.technologies },
  ];
  const favoriteTechnologies = getFavoriteTechnologies();

  return (
    <section
      id="home"
      className="relative scroll-mt-[60px] overflow-hidden px-5 py-12 md:scroll-mt-[72px] md:px-10 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="flex flex-1 flex-col items-start gap-6 text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
            {hero.eyebrow}
          </span>
          <h1 className="font-heading text-[38px] leading-[1.05] font-bold tracking-tight md:text-[64px]">
            {hero.title}
          </h1>
          <div className="flex flex-col gap-3">
            <p className="max-w-[480px] text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              {hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {favoriteTechnologies.map((technology) => (
                <TechnologyBadge
                  key={technology.id}
                  technology={technology}
                  className="text-[11px] tracking-wide"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3.5">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={getSectionHref(lang, "projects")} />}
            >
              {hero.ctaProjects}
              <ArrowRight className="transition-transform group-hover/button:animate-pulse" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={getSectionHref(lang, "contact")} />}
            >
              {hero.ctaContact}
            </Button>
          </div>

          <dl className="flex flex-col gap-4 md:flex-row md:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-baseline gap-2.5 md:flex-col md:items-start md:gap-1 md:border-l md:border-border md:pl-5"
              >
                <dd className="text-2xl font-bold tabular-nums">
                  {stat.value}
                </dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative hidden aspect-[4/5] w-full max-w-sm shrink-0 md:block">
          <div
            className="absolute -top-5 -left-5 right-5 bottom-5 border-2 border-primary"
            aria-hidden
          />
          <Image
            src="/photo.svg"
            alt={hero.photoAlt}
            width={384}
            height={683}
            priority
            className="relative h-full w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
