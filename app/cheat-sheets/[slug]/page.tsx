import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/constants";
import { getAllCheatSheetSlugs, getCheatSheetBySlug } from "@/lib/cheat-sheets-registry";
import { CheatSheetLayout } from "@/components/cheat-sheet-page/CheatSheetLayout";
import { GitCheatSheet } from "@/components/cheat-sheet-page/GitCheatSheet";
import { AngularCheatSheet } from "@/components/cheat-sheet-page/AngularCheatSheet";

export const dynamic = "force-static";

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllCheatSheetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const sheet = getCheatSheetBySlug(slug);
  if (!sheet) return {};

  const url = `${SITE_URL}/cheat-sheets/${sheet.slug}/`;
  return {
    title: sheet.seoTitle,
    description: sheet.metaDescription,
    keywords: sheet.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: sheet.seoTitle,
      description: sheet.metaDescription,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: sheet.seoTitle,
      description: sheet.metaDescription,
    },
  };
}

export default async function CheatSheetPage({ params }: { params: Params }) {
  const { slug } = await params;
  const sheet = getCheatSheetBySlug(slug);
  if (!sheet) notFound();

  return (
    <CheatSheetLayout sheet={sheet}>
      {sheet.slug === "git" ? <GitCheatSheet /> : null}
      {sheet.slug === "angular" ? <AngularCheatSheet /> : null}
    </CheatSheetLayout>
  );
}
