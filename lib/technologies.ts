import { technologies, type Technology } from "@/data/technologies";

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
