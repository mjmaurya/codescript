import Link from "next/link";
import type { ReactNode } from "react";
import type { ToolDefinition } from "@/lib/tools-registry";
import { getCategoryBySlug, getRelatedTools } from "@/lib/tools-registry";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildToolJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";
import { FaqAccordion } from "./FaqAccordion";
import { RelatedTools } from "./RelatedTools";
import { RelatedReading, type RelatedReadingItem } from "./RelatedReading";

export function ToolLayout({
  tool,
  children,
  relatedReading = [],
}: {
  tool: ToolDefinition;
  children: ReactNode;
  relatedReading?: RelatedReadingItem[];
}) {
  const category = getCategoryBySlug(tool.category);
  const related = getRelatedTools(tool);
  const faqJsonLd = buildFaqJsonLd(tool);
  const toolJsonLd = buildToolJsonLd(tool);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Tools", url: `${SITE_URL}/tools/` },
    ...(category ? [{ name: category.label, url: `${SITE_URL}/tools/#${category.slug}` }] : []),
    { name: tool.title, url: `${SITE_URL}/tools/${tool.slug}/` },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </Link>
        <span>/</span>
        <Link href="/tools" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Tools
        </Link>
        {category && (
          <>
            <span>/</span>
            <span>{category.label}</span>
          </>
        )}
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">
        {tool.title}
      </h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{tool.shortDescription}</p>

      <div className="mt-6">{children}</div>

      <section className="mt-12 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">What it does</h2>
        <p className="text-slate-600 dark:text-slate-400">{tool.whatItDoes}</p>
      </section>

      {tool.commonErrors && tool.commonErrors.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Common errors</h2>
          <ul className="space-y-3">
            {tool.commonErrors.map((error) => (
              <li key={error.title}>
                <p className="font-medium text-slate-800 dark:text-slate-200">{error.title}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{error.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {tool.examples && tool.examples.length > 0 && (
        <section className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Examples</h2>
          {tool.examples.map((example) => (
            <div key={example.label} className="space-y-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{example.label}</p>
              <pre className="overflow-x-auto rounded-md bg-slate-100 p-3 text-xs text-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {example.input}
              </pre>
              {example.output && (
                <>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Result</p>
                  <pre className="overflow-x-auto rounded-md bg-slate-100 p-3 text-xs text-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    {example.output}
                  </pre>
                </>
              )}
              {example.note && <p className="text-sm text-slate-500 dark:text-slate-400">{example.note}</p>}
            </div>
          ))}
        </section>
      )}

      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">FAQ</h2>
        <FaqAccordion faqs={tool.faqs} />
      </section>

      {related.length > 0 && (
        <section className="mt-10 space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Related tools</h2>
          <RelatedTools tools={related} />
        </section>
      )}

      {relatedReading.length > 0 && (
        <section className="mt-10">
          <RelatedReading items={relatedReading} />
        </section>
      )}
    </div>
  );
}
