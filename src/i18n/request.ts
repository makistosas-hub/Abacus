import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./locales";
import type { Locale } from "./locales";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? defaultLocale;
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;

  const messages = await import(`../messages/${resolvedLocale}.json`).then(
    (mod) => mod.default,
  );

  return {
    locale: resolvedLocale,
    messages,
  };
});

