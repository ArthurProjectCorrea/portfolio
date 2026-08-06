export interface Skill {
  name: string;
  category: "frontend" | "backend" | "database" | "tooling";
}

// Source: CURRICULUM.md → "Linguagens e Tecnologias". Update here when the
// résumé's stack changes; getTechnologiesCount() derives from this list.
export const skills: Skill[] = [
  { name: "HTML5", category: "frontend" },
  { name: "CSS3", category: "frontend" },
  { name: "JavaScript", category: "frontend" },
  { name: "React", category: "frontend" },
  { name: "Vue.js", category: "frontend" },
  { name: "Next.js", category: "frontend" },
  { name: "Tailwind CSS", category: "frontend" },
  { name: "Node.js", category: "backend" },
  { name: "Laravel", category: "backend" },
  { name: "Adonis.js", category: "backend" },
  { name: "Nest.js", category: "backend" },
  { name: "PostgreSQL", category: "database" },
  { name: "MongoDB", category: "database" },
  { name: "Git", category: "tooling" },
  { name: "Turborepo", category: "tooling" },
];
