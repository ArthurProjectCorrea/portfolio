import type { Metadata } from "next";
import { lang } from "next/root-params";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/private/project-detail/project-detail";
import { hasLocale, locales } from "@/lib/i18n-config";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects";
import { defaultOgImage } from "@/lib/site-config";
import { getDictionary } from "../../dictionaries";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/[lang]/projects/[slug]">,
): Promise<Metadata> {
  const { lang: locale, slug } = await props.params;
  if (!hasLocale(locale)) notFound();

  const project = getProjectBySlug(slug);
  if (!project) return {};

  const dict = await getDictionary();
  const title = dict.projectDetail.metaTitleTemplate.replace(
    "{project}",
    project.name,
  );
  const description = project.description[locale];

  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}/projects/${project.slug}`,
      languages: Object.fromEntries(
        locales.map((supported) => [
          supported,
          `/${supported}/projects/${project.slug}`,
        ]),
      ),
    },
    openGraph: {
      title,
      description,
      url: `/${locale}/projects/${project.slug}`,
      type: "article",
      images: [defaultOgImage],
    },
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/[lang]/projects/[slug]">,
) {
  const rawLocale = await lang();
  if (!hasLocale(rawLocale)) notFound();

  const { slug } = await props.params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const dict = await getDictionary();

  return (
    <ProjectDetail
      project={project}
      lang={rawLocale}
      labels={{
        featured: dict.projects.featured,
        imageFallbackAlt: dict.projects.imageFallbackAlt,
        wakatimeLabel: dict.projects.wakatimeLabel,
        actions: {
          repo: dict.projects.actions.repo,
          live: dict.projects.actions.live,
          details: dict.projects.actions.details,
        },
        empty: dict.projects.empty,
        breadcrumbHome: dict.projectDetail.breadcrumbHome,
        breadcrumbProjects: dict.projectDetail.breadcrumbProjects,
        highlights: dict.projectDetail.highlights,
        infoCard: dict.projectDetail.infoCard,
        completedAt: dict.projectDetail.completedAt,
        role: dict.projectDetail.role,
        version: dict.projectDetail.version,
        status: dict.projectDetail.status,
        technologies: dict.projectDetail.technologies,
        recentProjects: dict.projectDetail.recentProjects,
      }}
    />
  );
}
