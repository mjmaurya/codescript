import Link from "next/link";
import { categories, getToolsByCategory } from "@/lib/tools-registry";
import { ToolCard } from "@/components/tool-page/ToolCard";
import { SITE_TAGLINE } from "@/lib/constants";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd()) }}
      />
      <section className="mb-14 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-slate-100">
          Developer tools that just work.
        </h1>
        <p className="mt-3 text-lg text-slate-600 dark:text-slate-400">{SITE_TAGLINE}</p>
        <Link
          href="/tools"
          className="mt-6 inline-flex rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Browse all tools
        </Link>
      </section>

      {categories.map((category) => {
        const categoryTools = getToolsByCategory(category.slug);
        if (!categoryTools.length) return null;
        return (
          <section key={category.slug} id={category.slug} className="mb-12 scroll-mt-20">
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
