import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import { cheatSheets } from "@/lib/cheat-sheets-registry";
import { CheatSheetCard } from "@/components/cheat-sheet-page/CheatSheetCard";

const TITLE = "Cheat Sheets";
const DESCRIPTION =
  "Browse concise developer cheat sheets for Git, regex, Docker, SQL, Linux, and other essential tools.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["cheat sheets", "developer cheat sheets", "git cheat sheet", "reference guide"],
  alternates: { canonical: `${SITE_URL}/cheat-sheets/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/cheat-sheets/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function CheatSheetsPage() {
  console.log("cheatSheets", cheatSheets);
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Cheat sheets</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Developer Cheat Sheets</h1>
        <p className="mx-auto max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-400">
          Browse concise reference guides for essential developer tools, workflows, and command-line tasks.
        </p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {cheatSheets.map((sheet) => (
          <CheatSheetCard key={sheet.slug} sheet={sheet} />
        ))}
      </div>
    </div>
  );
}
