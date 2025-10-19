import { allPages, type Page } from "contentlayer/generated";
import type { Locale } from "@/i18n/locales";

export const HOMEPAGE_SLUG = "home";

export function getPageBySlug(slug: string, locale: Locale): Page | undefined {
  return allPages.find(
    (page) => page.slug === slug && page.locale === locale,
  );
}

export function getPageByRoute(route: string, locale: Locale): Page | undefined {
  if (route === "/" && locale === "lt") {
    return getPageBySlug(HOMEPAGE_SLUG, locale);
  }

  const normalizedRoute = route.replace(/^\/+|\/+$/g, "");
  const slug = normalizedRoute.length === 0 ? HOMEPAGE_SLUG : normalizedRoute;

  return getPageBySlug(slug, locale);
}

export function getLocalizedPages(slug: string) {
  return allPages.filter((page) => page.slug === slug);
}

export function getPageBySegments(
  segments: string[] | undefined,
  locale: Locale,
): Page | undefined {
  if (!segments || segments.length === 0) {
    return getPageBySlug(HOMEPAGE_SLUG, locale);
  }

  const slug = segments.join("/");
  return getPageBySlug(slug, locale);
}

export function getAllPageParams() {
  return allPages.map((page) => ({
    locale: page.locale,
    segments: page.slug === HOMEPAGE_SLUG ? [] : page.slug.split("/"),
  }));
}

