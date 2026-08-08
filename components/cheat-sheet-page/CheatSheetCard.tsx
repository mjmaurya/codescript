import Link from "next/link";
import type { CheatSheetDefinition } from "@/lib/cheat-sheets-registry";

export function CheatSheetCard({ sheet }: { sheet: CheatSheetDefinition }) {
  return (
    <Link
      href={`/cheat-sheets/${sheet.slug}/`}
      className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
    >
      <span className="font-medium text-slate-900 dark:text-slate-100">{sheet.title}</span>
      <span className="text-sm text-slate-600 dark:text-slate-400">{sheet.shortDescription}</span>
    </Link>
  );
}
