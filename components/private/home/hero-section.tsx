import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n-config";
import {
  getProjectsCount,
  getTechnologiesCount,
  getYearsOfExperience,
} from "@/lib/site-stats";

interface HeroLabels {
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

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:justify-between md:px-8">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 md:items-start md:text-left">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {hero.title}
          </h1>
          <p className="text-lg text-muted-foreground sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="#projects" />}
            >
              {hero.ctaProjects}
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href={`/${lang}/contact`} />}
            >
              {hero.ctaContact}
            </Button>
          </div>

          <dl className="mt-6 grid w-full max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 md:items-start"
              >
                <dd className="text-2xl font-bold tabular-nums">
                  {stat.value}
                </dd>
                <dt className="text-xs text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <Image
          src="/photo.svg"
          alt={hero.photoAlt}
          width={384}
          height={683}
          priority
          className="hidden aspect-[768/1364] w-64 shrink-0 rounded-md object-cover md:block"
        />
      </div>
    </section>
  );
}
