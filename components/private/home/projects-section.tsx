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

import {
  ProjectCard,
  type ProjectCardLabels,
} from "@/components/private/projects/project-card";

export interface ProjectsSectionLabels extends ProjectCardLabels {
  eyebrow: string;
  heading: string;
  empty: {
    title: string;
    description: string;
  };
}

export function ProjectsSection({
  projects,
  lang,
  labels,
}: {
  projects: Project[];
  lang: Locale;
  labels: ProjectsSectionLabels;
}) {
  return (
    <section
      id="projects"
      className="flex scroll-mt-[60px] justify-center px-5 pb-16 md:scroll-mt-[72px] md:px-10 md:pb-24"
    >
      <div className="w-full max-w-6xl">
        <div className="mb-7 flex flex-col gap-2 md:mb-10">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
            {labels.eyebrow}
          </span>
          <h2 className="font-heading text-[26px] font-bold tracking-tight md:text-[34px]">
            {labels.heading}
          </h2>
        </div>

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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
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
      </div>
    </section>
  );
}
