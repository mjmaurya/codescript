import type { Metadata } from "next";
import { categories, getToolsByCategory, tools } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tool-page/ToolCard";
import { buildBreadcrumbJsonLd, buildToolsItemListJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

const TITLE = "All Developer Tools";
const DESCRIPTION = "Browse every free developer tool on CodeScript, grouped by category.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/tools/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tools/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ToolsIndexPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools/` },
  ]);
  const itemListJsonLd = buildToolsItemListJsonLd(tools);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">All Tools</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">
        Every tool runs entirely in your browser — nothing you paste in is ever uploaded.
      </p>

      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.slug);
        if (!categoryTools.length) return null;
        return (
          <section key={category.slug} id={category.slug} className="mt-10 scroll-mt-20">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{category.label}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{category.description}</p>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {categoryTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
