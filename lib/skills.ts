import { projects } from "@/data/projects";
import { works } from "@/data/works";
import {
  technologies,
  technologyCategories,
  type Technology,
  type TechnologyCategory,
} from "@/data/technologies";

const MAX_SKILLS_PER_CATEGORY = 5;
const LEVEL_STEP = 25;

export interface SkillLevel {
  technology: Technology;
  /** How many projects + work positions reference this technology. */
  usageCount: number;
  /** 25/50/75/100 — usage ranked against the category's most-used technology. */
  level: number;
}

function getUsageCounts(): Map<number, number> {
  const counts = new Map<number, number>();
  const increment = (id: number) => counts.set(id, (counts.get(id) ?? 0) + 1);

  for (const project of projects) {
    for (const id of project.technologyIds) increment(id);
  }
  for (const work of works) {
    for (const position of work.positions) {
      for (const id of position.technologyIds ?? []) increment(id);
    }
  }
  return counts;
}

/**
 * Every technology actually used in at least one project or work position,
 * grouped by category and capped to the 5 most-used per category. The level
 * is proven usage, not a self-rated number: the most-used technology in a
 * category is 100%, the rest scaled proportionally to the nearest 25% step
 * (with a 25% floor for anything used at least once).
 */
export function getTopSkillsByCategory(): Record<
  TechnologyCategory,
  SkillLevel[]
> {
  const usageCounts = getUsageCounts();

  return Object.fromEntries(
    technologyCategories.map((category) => {
      const used = technologies
        .filter((technology) => technology.category === category)
        .map((technology) => ({
          technology,
          usageCount: usageCounts.get(technology.id) ?? 0,
        }))
        .filter(({ usageCount }) => usageCount > 0)
        .sort((a, b) => b.usageCount - a.usageCount)
        .slice(0, MAX_SKILLS_PER_CATEGORY);

      const maxUsage = used[0]?.usageCount ?? 0;

      const skills: SkillLevel[] = used.map(({ technology, usageCount }) => ({
        technology,
        usageCount,
        level: Math.max(
          LEVEL_STEP,
          Math.round(((usageCount / maxUsage) * 100) / LEVEL_STEP) * LEVEL_STEP,
        ),
      }));

      return [category, skills];
    }),
  ) as Record<TechnologyCategory, SkillLevel[]>;
}
