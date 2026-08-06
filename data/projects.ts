import type { Locale } from "@/lib/i18n-config";

export interface Project {
  slug: string;
  title: string;
  description: Record<Locale, string>;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** ISO "yyyy-MM". */
  completedAt: string;
}

// Add real projects here as they're finished — every metric derived from
// this file (project count, technology count) updates on its own, no other
// file needs touching. Keep entries factual: no invented outcomes/metrics.
export const projects: Project[] = [
  {
    slug: "portfolio",
    title: "Arthur.Correa Portfolio",
    description: {
      en: "This site — a Next.js portfolio with i18n routing, dark mode, and a documentation-first workflow.",
      "pt-BR":
        "Este site — um portfólio em Next.js com roteamento i18n, modo escuro e um fluxo orientado a documentação.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    repoUrl: "https://github.com/ArthurProjectCorrea/portfolio",
    completedAt: "2026-08",
  },
];
