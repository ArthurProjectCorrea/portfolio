import type { Locale } from "@/lib/i18n-config";

export interface Work {
  id: number;
  /** Identifies the workplace (company/organization name). */
  name: string;
  /** Role/title held during this period. */
  role: Record<Locale, string>;
  /** 1-2 line summary of the role, for the about section's experience timeline. */
  description: Record<Locale, string>;
  /** ISO "yyyy-MM". */
  startDate: string;
  /** ISO "yyyy-MM", or null when the role is current. */
  endDate: string | null;
  /** False de-emphasizes the entry in the timeline — set for roles unrelated to software/IT. Defaults to true. */
  techRelated?: boolean;
}

// Source: CURRICULUM.md → "Experiência Profissional". Update here when the
// résumé changes; getYearsOfExperience() sums every entry's duration, and
// lib/works.ts derives the about section's timeline (most recent first,
// flagging internal promotions between consecutive same-company entries).
export const works: Work[] = [
  {
    id: 1,
    name: "CSF Serviços de Limpeza LTDA",
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
    endDate: null,
    techRelated: false,
  },
  {
    id: 2,
    name: "Inovatus Sistemas da Informática LTDA",
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
  {
    id: 3,
    name: "DSS Serviços de Tecnologia da Informação LTDA",
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
  {
    id: 4,
    name: "HPAR Participações S/A",
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
  {
    id: 5,
    name: "HPAR Participações S/A",
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
    endDate: "2023-11",
  },
];
