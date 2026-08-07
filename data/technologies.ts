/** Display order for any grouped-by-category rendering (e.g. the about section's skills grid). */
export const technologyCategories = [
  "frontend",
  "backend",
  "database",
  "tools",
] as const;

export type TechnologyCategory = (typeof technologyCategories)[number];

export interface Technology {
  id: number;
  name: string;
  category: TechnologyCategory;
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
  { id: 1, name: "HTML5", category: "frontend", color: "#E34F26" },
  { id: 2, name: "CSS3", category: "frontend", color: "#1572B6" },
  { id: 3, name: "JavaScript", category: "frontend", color: "#F7DF1E" },
  {
    id: 4,
    name: "TypeScript",
    category: "frontend",
    favorite: true,
    color: "#3178C6",
  },
  {
    id: 5,
    name: "React",
    category: "frontend",
    favorite: true,
    color: "#61DAFB",
  },
  { id: 6, name: "Vue.js", category: "frontend", color: "#42B883" },
  { id: 7, name: "Next.js", category: "frontend" },
  { id: 8, name: "Tailwind CSS", category: "frontend", color: "#38BDF8" },
  {
    id: 9,
    name: "Node.js",
    category: "backend",
    favorite: true,
    color: "#3C873A",
  },
  { id: 10, name: "Laravel", category: "backend", color: "#FF2D20" },
  { id: 11, name: "Adonis.js", category: "backend", color: "#5A45FF" },
  { id: 12, name: "Nest.js", category: "backend", color: "#E0234E" },
  { id: 13, name: "PostgreSQL", category: "database", color: "#4169E1" },
  { id: 14, name: "MongoDB", category: "database", color: "#47A248" },
  { id: 15, name: "Git", category: "tools", color: "#F05032" },
  { id: 16, name: "Turborepo", category: "tools" },
];
