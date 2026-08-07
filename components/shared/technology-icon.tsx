import type { ReactNode } from "react";
import {
  SiAdonisjs,
  SiCss,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTurborepo,
  SiTypescript,
  SiVuedotjs,
} from "@icons-pack/react-simple-icons";

/** Keyed by Technology.id from data/technologies.ts. */
export function renderTechnologyIcon(id: number, color?: string): ReactNode {
  switch (id) {
    case 1:
      return <SiHtml5 color={color} />;
    case 2:
      return <SiCss color={color} />;
    case 3:
      return <SiJavascript color={color} />;
    case 4:
      return <SiTypescript color={color} />;
    case 5:
      return <SiReact color={color} />;
    case 6:
      return <SiVuedotjs color={color} />;
    case 7:
      return <SiNextdotjs color={color} />;
    case 8:
      return <SiTailwindcss color={color} />;
    case 9:
      return <SiNodedotjs color={color} />;
    case 10:
      return <SiLaravel color={color} />;
    case 11:
      return <SiAdonisjs color={color} />;
    case 12:
      return <SiNestjs color={color} />;
    case 13:
      return <SiPostgresql color={color} />;
    case 14:
      return <SiMongodb color={color} />;
    case 15:
      return <SiGit color={color} />;
    case 16:
      return <SiTurborepo color={color} />;
    default:
      return null;
  }
}
