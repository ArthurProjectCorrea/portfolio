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
  /**
   * Absolute path of a 16:9 asset under /public. No project ships one today —
   * every card and detail page falls back to the generated visual instead.
   */
  image?: string;
  /** Moves the project to the front of the listing and adds a badge. */
  featured?: boolean;
  /**
   * Long-form body for the detail page, one entry per paragraph. Optional:
   * the detail page degrades to `description` when it is absent.
   */
  longDescription?: Record<Locale, string[]>;
  /** Short list of technical highlights. Optional: the section is dropped when absent. */
  highlights?: Record<Locale, string[]>;
  /** Author's role in the project. Optional: the fact-sheet row is dropped when absent. */
  role?: Record<Locale, string>;
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
