export interface Technology {
  id: number;
  name: string;
  /** Shown in the hero's featured stack when true. */
  favorite?: boolean;
  /** Brand accent hex, used to color the technology's badge. Omit when there's no single representative brand color. */
  color?: string;
}

// Source: CURRICULUM.md → "Linguagens e Tecnologias" + "Frameworks", plus any
// stack used by a shipped project (see data/projects.ts, referenced via
// Project.technologyIds). Update here when experience changes;
// getTechnologiesCount() and the hero's featured stack both derive from this
// list.
export const technologies: Technology[] = [
  { id: 1, name: "HTML5", color: "#E34F26" },
  { id: 2, name: "CSS3", color: "#1572B6" },
  { id: 3, name: "JavaScript", color: "#F7DF1E" },
  { id: 4, name: "TypeScript", favorite: true, color: "#3178C6" },
  { id: 5, name: "React", favorite: true, color: "#61DAFB" },
  { id: 6, name: "Vue.js", color: "#42B883" },
  { id: 7, name: "Next.js" },
  { id: 8, name: "Tailwind CSS", color: "#38BDF8" },
  { id: 9, name: "Node.js", favorite: true, color: "#3C873A" },
  { id: 10, name: "Laravel", color: "#FF2D20" },
  { id: 11, name: "Adonis.js", color: "#5A45FF" },
  { id: 12, name: "Nest.js", color: "#E0234E" },
  { id: 13, name: "PostgreSQL", color: "#4169E1" },
  { id: 14, name: "MongoDB", color: "#47A248" },
  { id: 15, name: "Git", color: "#F05032" },
  { id: 16, name: "Turborepo" },
];
