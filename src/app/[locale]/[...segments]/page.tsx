import type { Locale } from "@/i18n/locales";
import { PageView } from "@/components/page/page-view";
import { getAllPageParams, getPageBySegments } from "@/lib/contentlayer";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ locale: string; segments?: string[] }>;
};

export function generateStaticParams() {
  return getAllPageParams()
    .filter(({ segments }) => segments.length > 0)
    .map(({ locale, segments }) => ({
      locale,
      segments,
    }));
}

export default async function LocaleCatchAllPage({ params }: PageProps) {
  const { locale, segments = [] } = await params;
  const page = getPageBySegments(segments, locale as Locale);

  if (!page) {
    notFound();
  }

  return <PageView page={page} />;
}
