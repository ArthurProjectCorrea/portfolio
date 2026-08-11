import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { AboutSection } from "@/components/private/home/about-section";
import { HeroSection } from "@/components/private/home/hero-section";
import { SkillsSection } from "@/components/private/home/skills-section";
import { ProjectsSection } from "@/components/private/home/projects-section";
import { ContactSection } from "@/components/private/home/contact-section";
import { getSortedProjects } from "@/lib/projects";
import { getDictionary } from "./dictionaries";

export default async function Home() {
  const rawLocale = await lang();
  if (!hasLocale(rawLocale)) notFound();
  const dict = await getDictionary();

  return (
    <>
      <HeroSection lang={rawLocale} hero={dict.home.hero} />
      <AboutSection lang={rawLocale} about={dict.home.about} />
      <SkillsSection skills={dict.home.skills} />
      <ProjectsSection
        projects={getSortedProjects()}
        lang={rawLocale}
        eyebrow={dict.projects.eyebrow}
        heading={dict.projects.heading}
        labels={dict.projects}
        limit={4}
        viewAllHref={`/${rawLocale}/projects`}
        viewAllLabel={dict.projects.viewAll}
      />
      <ContactSection contact={dict.home.contact} />
    </>
  );
}
