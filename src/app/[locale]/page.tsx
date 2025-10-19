import type { Locale } from "@/i18n/locales";
import { PageView } from "@/components/page/page-view";
import { getPageBySlug, HOMEPAGE_SLUG } from "@/lib/contentlayer";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: PageProps) {
  const { locale } = await params;
  const page = getPageBySlug(HOMEPAGE_SLUG, locale as Locale);

  if (!page) {
    notFound();
  }

  return <PageView page={page} />;
}
