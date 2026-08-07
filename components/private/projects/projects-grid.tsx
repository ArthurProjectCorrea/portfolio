import { FolderGit2 } from "lucide-react";

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import type { Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n-config";

import { ProjectCard, type ProjectCardLabels } from "./project-card";

export interface ProjectsGridLabels extends ProjectCardLabels {
  heading: string;
  subheading: string;
  empty: {
    title: string;
    description: string;
  };
}

export function ProjectsGrid({
  projects,
  lang,
  labels,
}: {
  projects: Project[];
  lang: Locale;
  labels: ProjectsGridLabels;
}) {
  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:px-8">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{labels.heading}</h1>
        <p className="text-muted-foreground">{labels.subheading}</p>
      </header>

      {projects.length === 0 ? (
        <Empty className="border border-border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderGit2 />
            </EmptyMedia>
            <EmptyTitle>{labels.empty.title}</EmptyTitle>
            <EmptyDescription>{labels.empty.description}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              labels={labels}
            />
          ))}
        </div>
      )}
    </section>
  );
}
