import { education, type Education } from "@/data/education";

/** In-progress/most-recently-started entries first. */
export function getSortedEducation(): Education[] {
  return [...education].sort((a, b) => b.startDate.localeCompare(a.startDate));
}
