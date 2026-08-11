import type { Locale } from "@/lib/i18n-config";

export interface Position {
  id: number;
  /** Role/title held during this period. */
  role: Record<Locale, string>;
  /** 1-2 line summary of the role — reusable content, not rendered by the compact home timeline. */
  description: Record<Locale, string>;
  /** ISO "yyyy-MM". */
  startDate: string;
  /** ISO "yyyy-MM", or null when the position is current. */
  endDate: string | null;
  /**
   * Technology ids from data/technologies.ts actually used in this role (the
   * PositionsTechnologies join). Optional and left unset until confirmed —
   * omit rather than guess; an empty/missing list simply doesn't contribute
   * to that technology's usage-derived skill level.
   */
  technologyIds?: number[];
}

export interface Work {
  id: number;
  /** Identifies the workplace (company/organization name). */
  name: string;
  /** Roles held at this employer, chronological, oldest first. At least one entry. */
  positions: Position[];
  /** False de-emphasizes every event derived from this work in the timeline. Defaults to true. */
  techRelated?: boolean;
}

// Source: CURRICULUM.md → "Experiência Profissional", cross-checked against the
// official Carteira de Trabalho Digital record. Update here when the résumé
// changes; getYearsOfExperience() sums every work's span, and lib/works.ts
// derives the about section's timeline events from positions.
export const works: Work[] = [
  {
    id: 1,
    name: "HPAR Participações S/A",
    positions: [
      {
        id: 1,
        role: {
          en: "Junior IT Assistant",
          "pt-BR": "Assistente de TI Júnior",
        },
        description: {
          en: "Customer service and support, data entry and updates in the company system, and day-to-day support for the team.",
          "pt-BR":
            "Atendimento e suporte ao cliente, cadastro e atualização de dados no sistema e apoio à equipe nas demandas do dia a dia.",
        },
        startDate: "2022-11",
        endDate: "2023-10",
      },
      {
        id: 2,
        role: {
          en: "Junior Programming Assistant",
          "pt-BR": "Assistente de Programação Júnior N1",
        },
        description: {
          en: "Maintained and built websites and applications, tested new software and defined layouts. Wrote technical documentation and built prototypes to validate integrating new data into existing systems.",
          "pt-BR":
            "Manutenção e desenvolvimento de sites e aplicativos, testes de novos softwares e definição de layouts. Documentação técnica e protótipos para validar a integração de novos dados aos sistemas existentes.",
        },
        startDate: "2023-11",
        endDate: "2024-01",
      },
    ],
  },
  {
    id: 2,
    name: "DSS Serviços de Tecnologia da Informação LTDA",
    positions: [
      {
        id: 1,
        role: {
          en: "Alarm System Monitor",
          "pt-BR": "Monitor de Alarme de Sistemas",
        },
        description: {
          en: "Service desk and help desk for software, network and hardware failures, by phone and chat. Network configuration, system installation and technical diagnosis within response deadlines.",
          "pt-BR":
            "Service desk e help desk para falhas de software, rede e hardware, por telefone e chat. Configuração de redes, instalação de sistemas e diagnóstico técnico dentro dos prazos de atendimento.",
        },
        startDate: "2024-03",
        endDate: "2025-01",
      },
    ],
  },
  {
    id: 3,
    name: "Inovatus Sistemas da Informática LTDA",
    positions: [
      {
        id: 1,
        role: {
          en: "Support Trainee",
          "pt-BR": "Trainee TEC Suporte",
        },
        description: {
          en: "Support for the CELK healthcare system and training teams to use it. Worked directly with clients to resolve day-to-day usage problems.",
          "pt-BR":
            "Suporte ao sistema hospitalar CELK e treinamento das equipes para utilizá-lo. Atendimento direto ao cliente na resolução de problemas de uso.",
        },
        startDate: "2025-02",
        endDate: "2025-03",
      },
    ],
  },
  {
    id: 4,
    name: "CSF Serviços de Limpeza LTDA",
    techRelated: false,
    positions: [
      {
        id: 1,
        role: {
          en: "Administrative Assistant",
          "pt-BR": "Auxiliar Administrativo",
        },
        description: {
          en: "Public-facing service at FUNAC, handling attendance records and facial recognition in the SEEU and SAREF systems.",
          "pt-BR":
            "Atendimento ao público na FUNAC, com registro de presença e reconhecimento facial nos sistemas SEEU e SAREF.",
        },
        startDate: "2025-04",
        endDate: "2025-09",
      },
    ],
  },
  {
    id: 5,
    name: "Fundação Nova Chance",
    techRelated: false,
    positions: [
      {
        id: 1,
        role: {
          en: "Post-production Intern",
          "pt-BR": "Estagiário de Pós-produção",
        },
        description: {
          en: "Post-production Intern at Fundação Nova Chance.",
          "pt-BR": "Estagiário de Pós-produção na Fundação Nova Chance.",
        },
        startDate: "2025-09",
        endDate: "2025-12",
      },
    ],
  },
  {
    id: 6,
    name: "Dainai Inteligência Tecnológica LTDA",
    positions: [
      {
        id: 1,
        role: {
          en: "Requirements Analyst I",
          "pt-BR": "Analista de Requisitos I",
        },
        description: {
          en: "Requirements Analyst I at Dainai Inteligência Tecnológica.",
          "pt-BR":
            "Analista de Requisitos I na Dainai Inteligência Tecnológica.",
        },
        startDate: "2026-01",
        endDate: null,
      },
    ],
  },
];
