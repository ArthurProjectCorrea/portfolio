import { projects } from "@/data/projects";
import { technologies, type Technology } from "@/data/technologies";
import { works } from "@/data/works";

function parseYearMonth(yearMonth: string): Date {
  const [year, month] = yearMonth.split("-").map(Number);
  return new Date(year, month - 1, 1);
}

// Single source of truth for every derived portfolio metric. Nothing else in
// the app should count projects/technologies/experience by hand — add the
// underlying fact to data/** and read it from here instead.

export function getProjectsCount(): number {
  return projects.length;
}

export function getTechnologiesCount(): number {
  return technologies.length;
}

export function getYearsOfExperience(): number {
  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const totalMs = works.reduce((sum, work) => {
    const start = parseYearMonth(work.startDate);
    const end = work.endDate ? parseYearMonth(work.endDate) : new Date();
    return sum + Math.max(0, end.getTime() - start.getTime());
  }, 0);
  return Math.floor(totalMs / msPerYear);
}

export function getFavoriteTechnologies(): Technology[] {
  return technologies.filter((technology) => technology.favorite);
}
