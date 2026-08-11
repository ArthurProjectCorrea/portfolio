import type { Locale } from "@/lib/i18n-config";

export interface Project {
  slug: string;
  name: string;
  /**
   * One-line summary — used on cards and as the detail page's fallback body
   * when no `content/{locale}/projects/{slug}.md` file exists yet for it.
   */
  description: Record<Locale, string>;
  /** Technology ids from data/technologies.ts (the ProjectsTechnologies join). */
  technologyIds: number[];
  /** Set when the source is closed — the GitHub CTA is omitted, not just disabled. */
  private?: boolean;
  repoUrl?: string;
  /** Deploy/live URL. */
  url?: string;
  /**
   * Absolute path of a 16:9 asset under /public/projects. Optional: cards
   * and the detail page fall back to the generated visual when absent. On
   * the detail page this is always the first carousel slide.
   */
  urlCover?: string;
  /**
   * Additional absolute paths under /public/projects shown in the detail
   * page's cover carousel, after `urlCover`. Optional: a single-image
   * project just shows `urlCover` with no carousel controls.
   */
  galleryImages?: string[];
  /**
   * Exact project name as tracked by WakaTime (Settings → Projects). Optional:
   * the coding-time badge is skipped when absent or when the project isn't tracked.
   */
  wakatimeProject?: string;
  /** ISO "yyyy-MM". */
  completedAt: string;
  /** Moves the project to the front of the listing and adds a badge. */
  featured?: boolean;
  /** Short list of technical highlights. Optional: the section is dropped when absent. */
  highlights?: Record<Locale, string[]>;
  /** Author's role in the project. Optional: the fact-sheet row is dropped when absent. */
  role?: Record<Locale, string>;
}

// Add real projects here as they're finished — every metric derived from
// this file (project count) updates on its own, no other file needs
// touching. Keep entries factual: no invented outcomes/metrics.
export const projects: Project[] = [
  {
    slug: "portfolio",
    name: "Arthur.Correa Portfolio",
    description: {
      en: "This site — a Next.js portfolio with full i18n routing, light/dark themes, and live WakaTime coding-time metrics, built through a documentation-first, agent-driven workflow.",
      "pt-BR":
        "Este site — um portfólio em Next.js com roteamento i18n completo, temas claro/escuro e métricas de tempo de código via WakaTime, construído com um fluxo orientado a documentação e agentes.",
    },
    highlights: {
      en: [
        "Hero metrics (projects, technologies, years of experience) computed at build time from the repo's own data files.",
        "Technology badges carry their brand icon and color, and each project shows real coding time pulled live from the WakaTime API.",
        "Full i18n (en/pt-BR): locale-prefixed routing with enforced key parity across dictionaries.",
      ],
      "pt-BR": [
        "Métricas do Hero (projetos, tecnologias, anos de experiência) calculadas a partir dos próprios dados do repositório.",
        "Badges de tecnologia com ícone e cor de marca, e tempo de código real de cada projeto puxado ao vivo da API do WakaTime.",
        "i18n completo (en/pt-BR): rotas prefixadas por locale e paridade de chaves garantida entre os dicionários.",
      ],
    },
    technologyIds: [7, 5, 4, 8, 17, 18, 19, 20, 21],
    repoUrl: "https://github.com/ArthurProjectCorrea/portfolio",
    url: "https://portfolio-tan-two-61.vercel.app/pt-BR",
    urlCover: "/projects/portfolio/hero.png",
    galleryImages: [
      "/projects/portfolio/about.png",
      "/projects/portfolio/skills.png",
      "/projects/portfolio/projects.png",
    ],
    wakatimeProject: "portfolio",
    completedAt: "2026-08",
  },
];
