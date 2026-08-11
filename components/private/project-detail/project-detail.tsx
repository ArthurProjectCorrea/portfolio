import type { ComponentType } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import { WakatimeBadge } from "@/components/shared/wakatime-badge";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n-config";
import { getTechnologiesByIds } from "@/lib/technologies";
import { getSortedProjects } from "@/lib/projects";
import {
  getLatestReleaseTag,
  getLatestWorkflowRunStatus,
  parseGithubRepo,
  type WorkflowRunStatus,
} from "@/lib/github";
import {
  ProjectsSection,
  type ProjectsSectionLabels,
} from "@/components/private/home/projects-section";
import { ProjectCoverCarousel } from "./project-cover-carousel";

export interface ProjectDetailLabels extends ProjectsSectionLabels {
  breadcrumbHome: string;
  breadcrumbProjects: string;
  highlights: string;
  infoCard: string;
  completedAt: string;
  role: string;
  version: string;
  status: Record<WorkflowRunStatus, string> & { heading: string };
  technologies: string;
  recentProjects: { heading: string; viewAll: string };
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

/** Reads the MDX narrative for this project/locale — absent until authored, never fatal. */
async function loadProjectBody(
  lang: Locale,
  slug: string,
): Promise<ComponentType | null> {
  try {
    const mod = (await import(`@/content/${lang}/projects/${slug}.md`)) as {
      default: ComponentType;
    };
    return mod.default;
  } catch {
    return null;
  }
}

const statusBadgeVariant: Record<
  WorkflowRunStatus,
  "default" | "destructive" | "secondary"
> = {
  success: "default",
  failure: "destructive",
  pending: "secondary",
};

export async function ProjectDetail({
  project,
  lang,
  labels,
}: {
  project: Project;
  lang: Locale;
  labels: ProjectDetailLabels;
}) {
  const highlights = project.highlights?.[lang];
  const coverImages = [
    project.urlCover,
    ...(project.galleryImages ?? []),
  ].filter((image): image is string => Boolean(image));

  const Body = await loadProjectBody(lang, project.slug);

  const repoRef = project.repoUrl ? parseGithubRepo(project.repoUrl) : null;
  const [version, status] = repoRef
    ? await Promise.all([
        getLatestReleaseTag(repoRef),
        getLatestWorkflowRunStatus(repoRef),
      ])
    : [null, null];

  const recentProjects = getSortedProjects()
    .filter((entry) => entry.slug !== project.slug)
    .slice(0, 4);

  return (
    <article className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-4">
          <ProjectCoverCarousel
            images={coverImages}
            title={project.name}
            fallbackAlt={labels.imageFallbackAlt}
            featuredLabel={project.featured ? labels.featured : undefined}
          />
        </div>

        <div className="flex flex-col gap-4 lg:col-span-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/${lang}`} />}>
                  {labels.breadcrumbHome}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href={`/${lang}/projects`} />}>
                  {labels.breadcrumbProjects}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{project.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-3">
          <section className="flex flex-col gap-3">
            {Body ? (
              <Body />
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

        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card>
            <CardContent className="flex flex-col gap-4 p-5">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                {labels.infoCard}
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
                {version ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">{labels.version}</dt>
                    <dd>
                      <Badge variant="outline">{version}</Badge>
                    </dd>
                  </div>
                ) : null}
                {status ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">
                      {labels.status.heading}
                    </dt>
                    <dd>
                      <Badge variant={statusBadgeVariant[status]}>
                        {labels.status[status]}
                      </Badge>
                    </dd>
                  </div>
                ) : null}
              </dl>

              <div className="flex flex-wrap gap-2 pt-1">
                {project.private ? null : project.repoUrl ? (
                  <Button
                    size="sm"
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
                  <Button size="sm" disabled aria-disabled="true">
                    <SiGithub aria-hidden />
                    {labels.actions.repo}
                  </Button>
                )}

                {project.url ? (
                  <Button
                    size="sm"
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
                  <Button
                    size="sm"
                    variant="outline"
                    disabled
                    aria-disabled="true"
                  >
                    <ExternalLink aria-hidden />
                    {labels.actions.live}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col gap-3 p-5">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                {labels.technologies}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {getTechnologiesByIds(project.technologyIds).map(
                  (technology) => (
                    <TechnologyBadge
                      key={technology.id}
                      technology={technology}
                    />
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4">
          <ProjectsSection
            projects={recentProjects}
            lang={lang}
            heading={labels.recentProjects.heading}
            labels={labels}
            limit={4}
            viewAllHref={`/${lang}/projects`}
            viewAllLabel={labels.recentProjects.viewAll}
            anchor={false}
            embedded
          />
        </div>
      </div>
    </article>
  );
}
