import createMiddleware from "next-intl/middleware";
import { defaultLocale, locales } from "@/i18n/locales";
import { localePrefix } from "@/i18n/routing";

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
});

export const config = {
  matcher: [
    "/",
    `/(?:${locales.join("|")})/:path*`,
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};
