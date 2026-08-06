import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";

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
  const names = new Set<string>();
  for (const skill of skills) names.add(skill.name.toLowerCase());
  for (const project of projects) {
    for (const technology of project.technologies) {
      names.add(technology.toLowerCase());
    }
  }
  return names.size;
}

export function getYearsOfExperience(): number {
  const earliestStart = experience.reduce<Date>((earliest, entry) => {
    const start = parseYearMonth(entry.startDate);
    return start < earliest ? start : earliest;
  }, new Date());

  const msPerYear = 365.25 * 24 * 60 * 60 * 1000;
  return Math.floor((Date.now() - earliestStart.getTime()) / msPerYear);
}
