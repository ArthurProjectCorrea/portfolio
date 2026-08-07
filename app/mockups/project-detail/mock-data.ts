// Mocked entries used only by the mockup screens under
// app/mockups/project-detail/**. They mirror the `Project` shape already in
// data/projects.ts (extended by the projects module with `image`/`featured`)
// plus the optional long-form fields a detail page would need.
//
// No real data beyond the first entry, no persistence, no business logic:
// presentational only.

export type MockLocale = "en" | "pt-BR";

export interface MockProjectDetail {
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
  /** Long-form body, one entry per paragraph. Optional: may not exist yet. */
  longDescription?: Record<MockLocale, string[]>;
  /** Short bullet list of what was built/solved. Optional. */
  highlights?: Record<MockLocale, string[]>;
  /** Author's role in the project. Optional. */
  role?: Record<MockLocale, string>;
}

// Only the first entry reflects a real project (this portfolio), and even its
// long-form content is a placeholder proposal, not published copy — whether
// the author wants to write it is an open question (see docs/mockups/
// project-detail.md, Q-002). Every other entry is an explicitly labelled
// example and must never be copied into data/projects.ts.
export const mockProjectDetails: MockProjectDetail[] = [
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
    featured: true,
    role: {
      en: "[DRAFT COPY] Sole author — requirements, design and implementation.",
      "pt-BR":
        "[TEXTO DE RASCUNHO] Autor único — requisitos, design e implementação.",
    },
    longDescription: {
      en: [
        "[DRAFT COPY — pending author approval] The portfolio is built on the Next.js App Router, with every route nested under a locale segment and all interface copy resolved from per-locale dictionaries.",
        "[DRAFT COPY — pending author approval] Each module goes through a documentation-first pipeline: navigable mockup screens first, then a formal requirements specification, and only then implementation.",
      ],
      "pt-BR": [
        "[TEXTO DE RASCUNHO — pendente de aprovação do autor] O portfólio é construído sobre o App Router do Next.js, com todas as rotas sob um segmento de locale e todo o texto de interface resolvido a partir de dicionários por idioma.",
        "[TEXTO DE RASCUNHO — pendente de aprovação do autor] Cada módulo passa por um fluxo orientado a documentação: primeiro as telas de mockup navegáveis, depois a especificação formal de requisitos e só então a implementação.",
      ],
    },
    highlights: {
      en: [
        "[DRAFT] Locale negotiated at the edge, with dictionaries loaded per request.",
        "[DRAFT] Class-based dark mode driven by a single global provider.",
        "[DRAFT] Statically rendered pages, no runtime data fetching.",
      ],
      "pt-BR": [
        "[RASCUNHO] Locale negociado na borda, com dicionários carregados por requisição.",
        "[RASCUNHO] Modo escuro por classe, dirigido por um único provedor global.",
        "[RASCUNHO] Páginas renderizadas estaticamente, sem busca de dados em tempo de requisição.",
      ],
    },
  },
  {
    slug: "example-full",
    title: "[EXEMPLO] Plataforma de Integração de Dados",
    description: {
      en: "[EXAMPLE ENTRY — not real content] Integration platform consolidating catalogs from multiple suppliers into a single normalized feed.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Plataforma de integração que consolida catálogos de múltiplos fornecedores em um feed normalizado único.",
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
    role: {
      en: "[EXAMPLE] Backend lead.",
      "pt-BR": "[EXEMPLO] Responsável pelo backend.",
    },
    longDescription: {
      en: [
        "[EXAMPLE ENTRY — not real content] Deliberately long paragraph used to validate the reading measure of the body column, the vertical rhythm between paragraphs, and the behaviour of the layout when the content column is much taller than the aside.",
        "[EXAMPLE ENTRY — not real content] A second paragraph exists so the spacing between blocks can be judged, and so the aside does not visually collapse against a single short block of text.",
        "[EXAMPLE ENTRY — not real content] A third paragraph pushes the page past the fold on desktop, exercising the sticky behaviour of the aside and the position of the closing navigation.",
      ],
      "pt-BR": [
        "[ENTRADA DE EXEMPLO — conteúdo não real] Parágrafo deliberadamente longo usado para validar a medida de leitura da coluna de conteúdo, o ritmo vertical entre parágrafos e o comportamento do layout quando a coluna de conteúdo é bem mais alta que a coluna lateral.",
        "[ENTRADA DE EXEMPLO — conteúdo não real] Um segundo parágrafo existe para que o espaçamento entre blocos possa ser avaliado e para que a coluna lateral não fique visualmente colada a um único bloco curto de texto.",
        "[ENTRADA DE EXEMPLO — conteúdo não real] Um terceiro parágrafo empurra a página para além da dobra no desktop, exercitando o comportamento fixo da coluna lateral e a posição da navegação de encerramento.",
      ],
    },
    highlights: {
      en: [
        "[EXAMPLE] Normalized ingestion of heterogeneous supplier catalogs.",
        "[EXAMPLE] Queue-based reprocessing of failed batches.",
        "[EXAMPLE] Monorepo shared between API and web client.",
      ],
      "pt-BR": [
        "[EXEMPLO] Ingestão normalizada de catálogos heterogêneos de fornecedores.",
        "[EXEMPLO] Reprocessamento de lotes com falha baseado em fila.",
        "[EXEMPLO] Monorepo compartilhado entre API e cliente web.",
      ],
    },
  },
  {
    slug: "example-minimal",
    title: "[EXEMPLO] Protótipo Sem Conteúdo Estendido",
    description: {
      en: "[EXAMPLE ENTRY — not real content] Project registered with only the facts the grid already shows: no long description, no highlights, no role.",
      "pt-BR":
        "[ENTRADA DE EXEMPLO — conteúdo não real] Projeto cadastrado apenas com os fatos que o grid já exibe: sem descrição longa, sem destaques, sem papel.",
    },
    technologies: ["Laravel", "MySQL"],
    completedAt: "2025-06",
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
    highlights: {
      en: ["[EXAMPLE] Role-based access to operational indicators."],
      "pt-BR": ["[EXEMPLO] Acesso por perfil a indicadores operacionais."],
    },
  },
];

// UI chrome copy is duplicated here only because mockup screens live outside
// the locale segment and have no dictionary. In the real module every string
// below becomes a key in app/[lang]/dictionaries/{en,pt-BR}.json.
export const mockLabels = {
  breadcrumbHome: "Início",
  breadcrumbProjects: "Projetos",
  back: "Voltar para projetos",
  repo: "GitHub",
  live: "Deploy",
  featured: "Destaque",
  completedAt: "Concluído em",
  role: "Papel",
  technologies: "Tecnologias",
  about: "Sobre o projeto",
  highlights: "Destaques técnicos",
  factSheet: "Ficha do projeto",
  imageFallbackAlt: "Prévia indisponível",
  previous: "Projeto anterior",
  next: "Próximo projeto",
  notFoundTitle: "Projeto não encontrado",
  notFoundDescription:
    "O endereço acessado não corresponde a nenhum projeto publicado.",
};
