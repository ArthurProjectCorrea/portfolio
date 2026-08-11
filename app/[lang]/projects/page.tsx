import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n-config";
import { ProjectsSection } from "@/components/private/home/projects-section";
import { getSortedProjects } from "@/lib/projects";
import { getDictionary } from "../dictionaries";

export async function generateMetadata(
  props: PageProps<"/[lang]/projects">,
): Promise<Metadata> {
  const { lang: locale } = await props.params;
  if (!hasLocale(locale)) notFound();

  const dict = await getDictionary();

  return {
    title: dict.projectsPage.metaTitle,
    description: dict.projectsPage.metaDescription,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: Object.fromEntries(
        locales.map((supported) => [supported, `/${supported}/projects`]),
      ),
    },
  };
}

export default async function ProjectsPage() {
  const rawLocale = await lang();
  if (!hasLocale(rawLocale)) notFound();
  const dict = await getDictionary();

  return (
    <ProjectsSection
      projects={getSortedProjects()}
      lang={rawLocale}
      eyebrow={dict.projectsPage.eyebrow}
      heading={dict.projectsPage.heading}
      labels={dict.projects}
      anchor={false}
      topPadding
    />
  );
}
