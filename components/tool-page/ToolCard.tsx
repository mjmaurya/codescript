import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools-registry";

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-4 transition-colors hover:border-indigo-300 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-700"
    >
      <span className="font-medium text-slate-900 dark:text-slate-100">{tool.title}</span>
      <span className="text-sm text-slate-600 dark:text-slate-400">{tool.shortDescription}</span>
    </Link>
  );
}
