import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n-config";
import { HeroSection } from "@/components/private/home/hero-section";
import { getDictionary } from "./dictionaries";

export default async function Home() {
  const rawLocale = await lang();
  if (!hasLocale(rawLocale)) notFound();
  const dict = await getDictionary();

  return <HeroSection lang={rawLocale} hero={dict.home.hero} />;
}
