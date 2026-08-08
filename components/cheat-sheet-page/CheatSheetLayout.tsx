import Link from "next/link";
import type { ReactNode } from "react";
import type { CheatSheetDefinition } from "@/lib/cheat-sheets-registry";
import { buildBreadcrumbJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/constants";

export function CheatSheetLayout({ sheet, children }: { sheet: CheatSheetDefinition; children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Cheat Sheets", url: `${SITE_URL}/cheat-sheets/` },
    { name: sheet.title, url: `${SITE_URL}/cheat-sheets/${sheet.slug}/` },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Home
        </Link>
        <span>/</span>
        <Link href="/cheat-sheets" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Cheat Sheets
        </Link>
      </nav>

      <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-slate-100">{sheet.title}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{sheet.metaDescription}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}
