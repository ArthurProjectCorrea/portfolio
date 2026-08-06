export interface ExperienceEntry {
  role: string;
  company: string;
  /** ISO "yyyy-MM". */
  startDate: string;
  /** ISO "yyyy-MM", or null when the role is current. */
  endDate: string | null;
}

// Source: CURRICULUM.md → "Experiência Profissional". Update here when the
// résumé changes; getYearsOfExperience() derives from the earliest startDate.
export const experience: ExperienceEntry[] = [
  {
    role: "Auxiliar Administrativo",
    company: "CSF Serviços de Limpeza LTDA",
    startDate: "2025-04",
    endDate: null,
  },
  {
    role: "Trainee TEC Suporte",
    company: "Inovatus Sistemas da Informática LTDA",
    startDate: "2025-02",
    endDate: "2025-03",
  },
  {
    role: "Monitor de Alarme de Sistemas",
    company: "DSS Serviços de Tecnologia da Informação LTDA",
    startDate: "2024-03",
    endDate: "2025-01",
  },
  {
    role: "Assistente de Programação Júnior N1",
    company: "HPAR Participações S/A",
    startDate: "2023-11",
    endDate: "2024-01",
  },
  {
    role: "Assistente de TI Júnior",
    company: "HPAR Participações S/A",
    startDate: "2022-11",
    endDate: "2023-11",
  },
];
