import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools-registry";

export function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  if (!tools.length) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {tools.map((tool) => (
        <Link
          key={tool.slug}
          href={`/tools/${tool.slug}`}
          className="rounded-lg border border-slate-200 p-4 transition-colors hover:border-indigo-300 hover:bg-indigo-50/50 dark:border-slate-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/30"
        >
          <p className="font-medium text-slate-900 dark:text-slate-100">{tool.title}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{tool.shortDescription}</p>
        </Link>
      ))}
    </div>
  );
}
