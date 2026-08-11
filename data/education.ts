import type { Locale } from "@/lib/i18n-config";

export interface Education {
  id: number;
  degree: Record<Locale, string>;
  institution: string;
  /** ISO "yyyy-MM". */
  startDate: string;
  /** ISO "yyyy-MM", or null when still in progress. */
  endDate: string | null;
  description: Record<Locale, string>;
}

// Source: CURRICULUM.md → "Educação".
export const education: Education[] = [
  {
    id: 1,
    degree: {
      en: "Postgraduate Certificate in Full Stack Web Development",
      "pt-BR": "Pós-graduação Lato Sensu em Desenvolvimento Web Full Stack",
    },
    institution: "Universidade Pitágoras Unopar Anhanguera",
    startDate: "2025-07",
    endDate: "2026-05",
    description: {
      en: "Online graduate program (360h) in web system patterns, architectures and technologies, covering big data, cloud computing and DevOps culture.",
      "pt-BR":
        "Pós-graduação EAD (360h) em padrões, arquiteturas e tecnologias para sistemas web, incluindo big data, computação em nuvem e cultura DevOps.",
    },
  },
  {
    id: 2,
    degree: {
      en: "Associate Degree in Systems Analysis and Development",
      "pt-BR": "Tecnologia em Análise e Desenvolvimento de Sistemas",
    },
    institution: "UNIVAG",
    startDate: "2021-01",
    endDate: "2023-04",
    description: {
      en: "Grounding in programming, databases, software engineering and networking, with hands-on front-end, back-end and agile practice.",
      "pt-BR":
        "Base em programação, banco de dados, engenharia de software e redes, com prática em front-end, back-end e metodologias ágeis.",
    },
  },
];
