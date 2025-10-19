import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import { defaultLocale, locales } from "./locales";

export const pathnames = {
  "/": "/",
  "/teams": "/teams",
  "/enterprise": "/enterprise",
  "/features": "/features",
  "/research": "/research",
  "/pricing": "/pricing",
  "/faq": "/faq",
  "/trial": "/trial",
  "/privacy": "/privacy",
  "/terms": "/terms",
  "/blog": "/blog",
  "/status": "/status",
} as const;

export const localePrefix = "always";

export type AppPathname = keyof typeof pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix,
    pathnames,
    defaultLocale,
  });

