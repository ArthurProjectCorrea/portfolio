export const locales = ["en", "pt-BR"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (locale: string | undefined): locale is Locale =>
  !!locale && (locales as readonly string[]).includes(locale);
