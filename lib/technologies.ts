import {
  technologies,
  technologyCategories,
  type Technology,
  type TechnologyCategory,
} from "@/data/technologies";

// Resolves the ProjectsTechnologies join (Project.technologyIds) into the
// canonical Technology records — the single place that reads data/technologies.ts by id.

export function getTechnologiesByIds(ids: number[]): Technology[] {
  const byId = new Map(
    technologies.map((technology) => [technology.id, technology]),
  );
  return ids
    .map((id) => byId.get(id))
    .filter((technology): technology is Technology => technology !== undefined);
}

/** Every technology, grouped by category in the order data/technologies.ts declares (for the about section's skills grid). */
export function getTechnologiesGroupedByCategory(): Record<
  TechnologyCategory,
  Technology[]
> {
  const groups = Object.fromEntries(
    technologyCategories.map((category) => [category, [] as Technology[]]),
  ) as Record<TechnologyCategory, Technology[]>;
  for (const technology of technologies) {
    groups[technology.category].push(technology);
  }
  return groups;
}
