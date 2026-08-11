import { projects, type Project } from "@/data/projects";

// Single source of truth for how projects are ordered and looked up, so the
// product never presents two different orderings for the same set.

function assertUniqueSlugs(entries: Project[]): void {
  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      throw new Error(
        `Duplicate project slug "${entry.slug}" in data/projects.ts — slugs address detail pages and must be unique.`,
      );
    }
    seen.add(entry.slug);
  }
}

// Runs on import, so a duplicate fails the build instead of silently
// shadowing one of the two detail pages.
assertUniqueSlugs(projects);

/** Featured projects first, then most recently completed first. */
export function getSortedProjects(): Project[] {
  return [...projects].sort((a, b) => {
    const featuredDelta =
      Number(b.featured ?? false) - Number(a.featured ?? false);
    if (featuredDelta !== 0) return featuredDelta;
    return b.completedAt.localeCompare(a.completedAt);
  });
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * The image a card/detail page should render. Falls back to the generated
 * placeholder when the project has no manually-set cover under /public.
 */
export function getProjectCoverSrc(project: Project): string | undefined {
  return project.urlCover;
}
