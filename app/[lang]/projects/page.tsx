import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import { ProjectsGrid } from "@/components/private/projects/projects-grid";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getSortedProjects } from "@/lib/projects";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/projects">,
): Promise<Metadata> {
  const { lang: locale } = await props.params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary();

  return {
    title: dict.projects.metaTitle,
    description: dict.projects.metaDescription,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: Object.fromEntries(
        locales.map((supported) => [supported, `/${supported}/projects`]),
      ),
    },
    openGraph: {
      title: dict.projects.metaTitle,
      description: dict.projects.metaDescription,
      url: `/${locale}/projects`,
      type: "website",
    },
  };
}

export default async function ProjectsPage() {
  const rawLocale = await lang();
  if (!hasLocale(rawLocale)) notFound();
  const dict = await getDictionary();

  return (
    <ProjectsGrid
      projects={getSortedProjects()}
      lang={rawLocale}
      labels={dict.projects}
    />
  );
}
