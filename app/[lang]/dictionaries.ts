import { lang } from "next/root-params";
import { notFound } from "next/navigation";
import { hasLocale, type Locale } from "@/lib/i18n-config";
import type enDictionary from "./dictionaries/en.json";

type Dictionary = typeof enDictionary;

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  "pt-BR": () =>
    import("./dictionaries/pt-BR.json").then((module) => module.default),
} satisfies Record<Locale, () => Promise<Dictionary>>;

export const getDictionary = async () => {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale]();
};
