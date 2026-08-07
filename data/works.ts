export interface Work {
  id: number;
  /** Identifies the workplace (company/organization name). */
  name: string;
  /** ISO "yyyy-MM". */
  startDate: string;
  /** ISO "yyyy-MM", or null when the role is current. */
  endDate: string | null;
}

// Source: CURRICULUM.md → "Experiência Profissional". Update here when the
// résumé changes; getYearsOfExperience() sums every entry's duration.
export const works: Work[] = [
  {
    id: 1,
    name: "CSF Serviços de Limpeza LTDA",
    startDate: "2025-04",
    endDate: null,
  },
  {
    id: 2,
    name: "Inovatus Sistemas da Informática LTDA",
    startDate: "2025-02",
    endDate: "2025-03",
  },
  {
    id: 3,
    name: "DSS Serviços de Tecnologia da Informação LTDA",
    startDate: "2024-03",
    endDate: "2025-01",
  },
  {
    id: 4,
    name: "HPAR Participações S/A",
    startDate: "2023-11",
    endDate: "2024-01",
  },
  {
    id: 5,
    name: "HPAR Participações S/A",
    startDate: "2022-11",
    endDate: "2023-11",
  },
];
