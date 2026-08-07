import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectVisual } from "@/components/shared/project-visual";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import { WakatimeBadge } from "@/components/shared/wakatime-badge";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n-config";
import { getTechnologiesByIds } from "@/lib/technologies";
import { getProjectCoverSrc, type ProjectNeighbors } from "@/lib/projects";

export interface ProjectDetailLabels {
  /** Reused from the projects module, per RN-008 of the detail ERS. */
  featured: string;
  imageFallbackAlt: string;
  wakatimeLabel: string;
  actions: {
    repo: string;
    live: string;
  };
  breadcrumbHome: string;
  breadcrumbProjects: string;
  back: string;
  previous: string;
  next: string;
  about: string;
  highlights: string;
  factSheet: string;
  completedAt: string;
  role: string;
  technologies: string;
}

/** Renders "yyyy-MM" as a month/year in the route's language. */
function formatCompletedAt(completedAt: string, lang: Locale): string {
  const [year, month] = completedAt.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, 1));
  return new Intl.DateTimeFormat(lang, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function ProjectDetail({
  project,
  neighbors,
  lang,
  labels,
}: {
  project: Project;
  neighbors: ProjectNeighbors;
  lang: Locale;
  labels: ProjectDetailLabels;
}) {
  const paragraphs = project.longDescription?.[lang];
  const highlights = project.highlights?.[lang];
  const { previous, next } = neighbors;

  return (
    <article className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:px-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={`/${lang}`} />}>
              {labels.breadcrumbHome}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href={`/${lang}#projects`} />}>
              {labels.breadcrumbProjects}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{project.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ProjectVisual
        image={getProjectCoverSrc(project)}
        title={project.name}
        fallbackAlt={labels.imageFallbackAlt}
        featuredLabel={project.featured ? labels.featured : undefined}
        className="rounded-lg border border-border"
        iconClassName="size-8"
        badgeClassName="top-3 left-3"
        sizes="(min-width: 1200px) 1200px, 100vw"
      />

      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="max-w-[68ch] text-lg text-muted-foreground">
          {project.description[lang]}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.private ? null : project.repoUrl ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <SiGithub aria-hidden />
              {labels.actions.repo}
            </Button>
          ) : (
            <Button disabled aria-disabled="true">
              <SiGithub aria-hidden />
              {labels.actions.repo}
            </Button>
          )}

          {project.url ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <ExternalLink aria-hidden />
              {labels.actions.live}
            </Button>
          ) : (
            <Button variant="outline" disabled aria-disabled="true">
              <ExternalLink aria-hidden />
              {labels.actions.live}
            </Button>
          )}
        </div>
      </header>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">{labels.about}</h2>
            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="max-w-[68ch] leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="max-w-[68ch] leading-relaxed text-muted-foreground">
                {project.description[lang]}
              </p>
            )}
          </section>

          {highlights && highlights.length > 0 ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{labels.highlights}</h2>
              <ul className="flex max-w-[68ch] list-disc flex-col gap-2 pl-5 text-muted-foreground">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-4 p-5">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                {labels.factSheet}
              </h2>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">
                    {labels.completedAt}
                  </dt>
                  <dd>{formatCompletedAt(project.completedAt, lang)}</dd>
                </div>
                {project.role ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">{labels.role}</dt>
                    <dd>{project.role[lang]}</dd>
                  </div>
                ) : null}
                {project.wakatimeProject ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">
                      {labels.wakatimeLabel}
                    </dt>
                    <dd>
                      <WakatimeBadge
                        project={project.wakatimeProject}
                        label={labels.wakatimeLabel}
                      />
                    </dd>
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <dt className="text-muted-foreground">
                    {labels.technologies}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {getTechnologiesByIds(project.technologyIds).map(
                      (technology) => (
                        <TechnologyBadge
                          key={technology.id}
                          technology={technology}
                        />
                      ),
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Separator />

      <nav className="flex flex-wrap items-center justify-between gap-3">
        {previous ? (
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/${lang}/projects/${previous.slug}`} />}
          >
            <ArrowLeft aria-hidden />
            {previous.name}
          </Button>
        ) : (
          <Button variant="ghost" disabled aria-disabled="true">
            <ArrowLeft aria-hidden />
            {labels.previous}
          </Button>
        )}

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href={`/${lang}#projects`} />}
        >
          {labels.back}
        </Button>

        {next ? (
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/${lang}/projects/${next.slug}`} />}
          >
            {next.name}
            <ArrowRight aria-hidden />
          </Button>
        ) : (
          <Button variant="ghost" disabled aria-disabled="true">
            {labels.next}
            <ArrowRight aria-hidden />
          </Button>
        )}
      </nav>
    </article>
  );
}
