import Link from "next/link";
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
import { cn } from "@/lib/utils";

import {
  ProjectCard,
  type ProjectCardLabels,
} from "@/components/private/projects/project-card";

export interface ProjectsSectionLabels extends ProjectCardLabels {
  empty: {
    title: string;
    description: string;
  };
}

/**
 * The project grid shared by the home page (capped, its own full-bleed
 * section, links to the full list), the standalone list page (uncapped,
 * its own section), and the detail page's "more projects" footer (capped,
 * `embedded` so it fits the parent grid column instead of re-centering
 * itself full-width).
 */
export function ProjectsSection({
  projects,
  lang,
  eyebrow,
  heading,
  labels,
  limit,
  viewAllHref,
  viewAllLabel,
  anchor = true,
  embedded = false,
  topPadding = false,
}: {
  projects: Project[];
  lang: Locale;
  eyebrow?: string;
  heading: string;
  labels: ProjectsSectionLabels;
  /** Caps the grid to the N most recent entries — omit to show everything. */
  limit?: number;
  viewAllHref?: string;
  viewAllLabel?: string;
  /** Set false outside the home page, where `id="projects"` would collide. */
  anchor?: boolean;
  /** True when nested inside another layout's own padded container. */
  embedded?: boolean;
  /** True when this is the page's first content, with no section above it to provide spacing. */
  topPadding?: boolean;
}) {
  const visibleProjects = limit ? projects.slice(0, limit) : projects;

  const content = (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div className="flex flex-col gap-2">
          {eyebrow ? (
            <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-heading text-[26px] font-bold tracking-tight md:text-[34px]">
            {heading}
          </h2>
        </div>
        {viewAllHref && viewAllLabel ? (
          <Link
            href={viewAllHref}
            className="text-sm font-medium text-primary hover:underline"
          >
            {viewAllLabel}
          </Link>
        ) : null}
      </div>

      {visibleProjects.length === 0 ? (
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
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              lang={lang}
              labels={labels}
            />
          ))}
        </div>
      )}
    </>
  );

  if (embedded) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <section
      id={anchor ? "projects" : undefined}
      className={cn(
        "flex scroll-mt-[60px] justify-center px-5 pb-16 md:scroll-mt-[72px] md:px-10 md:pb-24",
        topPadding && "pt-16 md:pt-24",
      )}
    >
      <div className="w-full max-w-6xl">{content}</div>
    </section>
  );
}
