import type { Locale } from "@/lib/i18n-config";

export type NavSection = "home" | "about" | "skills" | "projects" | "contact";

// Single source of truth for where each nav item points — home-page anchor
// sections share this map instead of every consumer re-typing its own href.
const sectionAnchors: Record<NavSection, string | null> = {
  home: null,
  about: "about",
  skills: "skills",
  projects: "projects",
  contact: "contact",
};

export function getSectionHref(lang: Locale, section: NavSection): string {
  const anchor = sectionAnchors[section];
  return anchor ? `/${lang}#${anchor}` : `/${lang}`;
}
