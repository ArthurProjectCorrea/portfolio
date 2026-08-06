// Mocked project entries used only by the mockup screens under
// app/mockups/projects/**. They intentionally mirror the shape proposed for
// the real `Project` interface (data/projects.ts) plus the two fields this
// module would add (`image`, `featured`), so the screens can validate the
// card visual before the ERS formalizes the schema.
//
// No real data, no persistence, no business logic: presentational only.

export type MockLocale = "en" | "pt-BR";

export interface MockProject {
  slug: string;
  title: string;
  description: Record<MockLocale, string>;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  /** ISO "yyyy-MM". */
  completedAt: string;
  /** Absolute path under /public, or undefined to force the fallback visual. */
  image?: string;
  featured?: boolean;
}

// Only the first entry reflects a real project (this portfolio). Every other
// entry is an explicitly labelled placeholder: the real content is an open
// question (see docs/mockups/projects.md, Q-003) and nothing here should be
// copied into data/projects.ts as if it were factual.
export const mockProjects: MockProject[] = [
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
    image: "/globe.svg",
    featured: true,
  },
  {
    slug: "example-no-deploy",
    title: "[EXEMPLO] API de Catálogo",
    description: {
      en: "[EXAMPLE ENTRY — not real content] REST service exposing a product catalog, with paginated listing and role-based access.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Serviço REST que expõe um catálogo de produtos, com listagem paginada e acesso por perfil.",
    },
    technologies: ["Nest.js", "PostgreSQL", "TypeScript"],
    repoUrl: "https://github.com/example/catalog-api",
    completedAt: "2026-04",
    image: undefined,
  },
  {
    slug: "example-no-repo",
    title: "[EXEMPLO] Painel Interno",
    description: {
      en: "[EXAMPLE ENTRY — not real content] Internal dashboard with private source code; only the live deployment is publicly reachable.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Painel interno com código-fonte privado; apenas o deploy publicado é acessível.",
    },
    technologies: ["React", "Vue.js", "Tailwind CSS"],
    liveUrl: "https://example.com/dashboard",
    completedAt: "2026-01",
    image: "/window.svg",
  },
  {
    slug: "example-long-copy",
    title:
      "[EXEMPLO] Plataforma de Integração de Dados com Nome Muito Longo Para Testar Truncamento",
    description: {
      en: "[EXAMPLE ENTRY — not real content] Deliberately long description used to validate the two-to-three line clamp on the card body, making sure overflowing copy never pushes the tech badges or the action row out of alignment across the three grid breakpoints.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Descrição deliberadamente longa usada para validar o recorte de duas a três linhas no corpo do card, garantindo que o texto excedente nunca desalinhe as badges de tecnologia nem a linha de ações nos três breakpoints do grid.",
    },
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Turborepo",
      "Docker",
      "Redis",
    ],
    repoUrl: "https://github.com/example/data-platform",
    liveUrl: "https://example.com/data-platform",
    completedAt: "2025-11",
    image: undefined,
  },
  {
    slug: "example-links-none",
    title: "[EXEMPLO] Protótipo Sem Links Públicos",
    description: {
      en: "[EXAMPLE ENTRY — not real content] Prototype with neither a public repository nor a deployment, used to validate the card with no external CTAs at all.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Protótipo sem repositório público e sem deploy, usado para validar o card sem nenhum CTA externo.",
    },
    technologies: ["Laravel", "MySQL"],
    completedAt: "2025-06",
    image: undefined,
  },
];

// UI chrome copy is duplicated here only because mockup screens live outside
// the locale segment and have no dictionary. In the real module every string
// below becomes a key in app/[lang]/dictionaries/{en,pt-BR}.json.
export const mockLabels = {
  heading: "Projetos",
  subheading: "Seleção de trabalhos e experimentos.",
  details: "Ver Detalhes",
  repo: "GitHub",
  live: "Deploy",
  featured: "Destaque",
  emptyTitle: "Nenhum projeto publicado ainda",
  emptyDescription:
    "Assim que o primeiro projeto for adicionado, ele aparece aqui.",
  imageFallbackAlt: "Prévia indisponível",
};
