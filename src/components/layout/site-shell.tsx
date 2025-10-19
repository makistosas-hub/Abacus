import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link, type AppPathname } from "@/i18n/routing";

type PrimaryNavKey =
  | "home"
  | "features"
  | "research"
  | "teams"
  | "enterprise"
  | "pricing"
  | "faq";

const primaryNav: ReadonlyArray<{ key: PrimaryNavKey; href: AppPathname }> = [
  { key: "home", href: "/" },
  { key: "features", href: "/features" },
  { key: "research", href: "/research" },
  { key: "teams", href: "/teams" },
  { key: "enterprise", href: "/enterprise" },
  { key: "pricing", href: "/pricing" },
  { key: "faq", href: "/faq" },
] as const;

export default async function SiteShell({
  children,
}: {
  children: ReactNode;
}) {
  const tNav = await getTranslations("nav");
  const tCta = await getTranslations("cta");

  return (
    <div className="relative flex min-h-screen flex-col bg-surface text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-elevated/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-8 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="text-lg">UseMe Labs</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium sm:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="transition hover:text-primary"
              >
                {tNav(item.key)}
              </Link>
            ))}
          </nav>
          <Link
            href="/trial"
            className="hidden rounded-full bg-gradient-to-r from-[#7C4DFF] via-[#00BFA6] to-[#00E5FF] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-16px_rgba(124,77,255,0.75)] transition hover:shadow-[0_16px_40px_-16px_rgba(0,229,255,0.55)] sm:inline-flex"
          >
            {tCta("requestTrial")}
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/50">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="font-semibold text-foreground">UseMe Labs</span>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-primary">
                {tNav("privacy")}
              </Link>
              <Link href="/terms" className="hover:text-primary">
                {tNav("terms")}
              </Link>
            </div>
          </div>
          <p>{`\u00A9 ${new Date().getFullYear()} UseMe Labs. All rights reserved.`}</p>
        </div>
      </footer>
    </div>
  );
}


