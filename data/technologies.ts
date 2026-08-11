/** Display order for any grouped-by-category rendering (e.g. the skills section). */
export const technologyCategories = [
  "frontend",
  "backend",
  "database",
  "devops",
  "tools",
  "ai",
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
  /**
   * Export name from `@icons-pack/react-simple-icons` (e.g. "SiHtml5"),
   * resolved dynamically by components/shared/technology-icon.tsx. Omit when
   * the library has no matching brand icon — the badge/skill card then
   * renders without one.
   */
  iconName?: string;
}

// Source: CURRICULUM.md → "Linguagens e Tecnologias" + "Frameworks", plus any
// stack used by a shipped project (see data/projects.ts, referenced via
// Project.technologyIds). Update here when experience changes;
// getTechnologiesCount() and the hero's featured stack both derive from this
// list.
export const technologies: Technology[] = [
  {
    id: 1,
    name: "HTML5",
    category: "frontend",
    color: "#E34F26",
    iconName: "SiHtml5",
  },
  {
    id: 2,
    name: "CSS3",
    category: "frontend",
    color: "#1572B6",
    iconName: "SiCss",
  },
  {
    id: 3,
    name: "JavaScript",
    category: "frontend",
    color: "#F7DF1E",
    iconName: "SiJavascript",
  },
  {
    id: 4,
    name: "TypeScript",
    category: "frontend",
    favorite: true,
    color: "#3178C6",
    iconName: "SiTypescript",
  },
  {
    id: 5,
    name: "React",
    category: "frontend",
    favorite: true,
    color: "#61DAFB",
    iconName: "SiReact",
  },
  {
    id: 6,
    name: "Vue.js",
    category: "frontend",
    color: "#42B883",
    iconName: "SiVuedotjs",
  },
  {
    id: 7,
    name: "Next.js",
    category: "frontend",
    iconName: "SiNextdotjs",
  },
  {
    id: 8,
    name: "Tailwind CSS",
    category: "frontend",
    color: "#38BDF8",
    iconName: "SiTailwindcss",
  },
  {
    id: 9,
    name: "Node.js",
    category: "backend",
    favorite: true,
    color: "#3C873A",
    iconName: "SiNodedotjs",
  },
  {
    id: 10,
    name: "Laravel",
    category: "backend",
    color: "#FF2D20",
    iconName: "SiLaravel",
  },
  {
    id: 11,
    name: "Adonis.js",
    category: "backend",
    color: "#5A45FF",
    iconName: "SiAdonisjs",
  },
  {
    id: 12,
    name: "Nest.js",
    category: "backend",
    color: "#E0234E",
    iconName: "SiNestjs",
  },
  {
    id: 13,
    name: "PostgreSQL",
    category: "database",
    color: "#4169E1",
    iconName: "SiPostgresql",
  },
  {
    id: 14,
    name: "MongoDB",
    category: "database",
    color: "#47A248",
    iconName: "SiMongodb",
  },
  {
    id: 15,
    name: "Git",
    category: "tools",
    color: "#F05032",
    iconName: "SiGit",
  },
  {
    id: 16,
    name: "Turborepo",
    category: "tools",
    iconName: "SiTurborepo",
  },
  {
    id: 17,
    name: "Claude",
    category: "ai",
    color: "#D97757",
    iconName: "SiClaude",
  },
  {
    id: 18,
    name: "VS Code",
    category: "tools",
    color: "#007ACC",
  },
];
