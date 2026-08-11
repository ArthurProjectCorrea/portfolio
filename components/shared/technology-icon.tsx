import type { ComponentType, ReactNode } from "react";
import * as SimpleIcons from "@icons-pack/react-simple-icons";
import type { Technology } from "@/data/technologies";

/**
 * Resolves Technology.iconName against the installed icon package by name,
 * so a new technology only ever needs a data/technologies.ts entry — never a
 * code change here. Safe to do server-side (no "use client" in this file or
 * its callers): the icon renders to static SVG markup, so this costs nothing
 * in the client bundle.
 */
export function renderTechnologyIcon(technology: Technology): ReactNode {
  if (!technology.iconName) return null;
  const icons = SimpleIcons as unknown as Record<
    string,
    ComponentType<{ color?: string }>
  >;
  const Icon = icons[technology.iconName];
  return Icon ? <Icon color={technology.color} /> : null;
}
