import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ProjectVisual } from "@/components/shared/project-visual";
import { TechnologyBadge } from "@/components/shared/technology-badge";
import { WakatimeBadge } from "@/components/shared/wakatime-badge";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n-config";
import { getProjectCoverSrc } from "@/lib/projects";
import { getTechnologiesByIds } from "@/lib/technologies";

/** Badges beyond this count are summarised as a "+N" indicator. */
const MAX_VISIBLE_TECHNOLOGIES = 4;

export interface ProjectCardLabels {
  featured: string;
  imageFallbackAlt: string;
  wakatimeLabel: string;
  actions: {
    repo: string;
    live: string;
    details: string;
  };
}

export function ProjectCard({
  project,
  lang,
  labels,
}: {
  project: Project;
  lang: Locale;
  labels: ProjectCardLabels;
}) {
  const technologies = getTechnologiesByIds(project.technologyIds);
  const visibleTechnologies = technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES);
  const overflowCount = technologies.length - visibleTechnologies.length;

  return (
    <Card className="group h-full gap-0 overflow-hidden p-0 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-within:translate-y-0">
      <div className="relative">
        <ProjectVisual
          image={getProjectCoverSrc(project)}
          title={project.name}
          fallbackAlt={labels.imageFallbackAlt}
          featuredLabel={project.featured ? labels.featured : undefined}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        {project.wakatimeProject ? (
          <WakatimeBadge
            project={project.wakatimeProject}
            label={labels.wakatimeLabel}
            className="absolute top-2 right-2 z-10 border-border bg-background/85 backdrop-blur-sm"
          />
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <CardTitle className="line-clamp-2 text-base leading-snug">
            {project.name}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm">
            {project.description[lang]}
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visibleTechnologies.map((technology) => (
            <TechnologyBadge key={technology.id} technology={technology} />
          ))}
          {overflowCount > 0 ? (
            <Badge variant="secondary">{`+${overflowCount}`}</Badge>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t border-border p-5 pt-4">
        <Button
          size="sm"
          nativeButton={false}
          render={<Link href={`/${lang}/projects/${project.slug}`} />}
        >
          {labels.actions.details}
        </Button>

        {project.private ? null : project.repoUrl ? (
          <Button
            size="sm"
            variant="outline"
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
          <Button size="sm" variant="outline" disabled aria-disabled="true">
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
              <a href={project.url} target="_blank" rel="noopener noreferrer" />
            }
          >
            <ExternalLink aria-hidden />
            {labels.actions.live}
          </Button>
        ) : (
          <Button size="sm" variant="outline" disabled aria-disabled="true">
            <ExternalLink aria-hidden />
            {labels.actions.live}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
