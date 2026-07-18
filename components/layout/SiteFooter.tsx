import Link from "next/link";
import { BLOG_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/constants";
import { categories } from "@/lib/tools-registry";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{SITE_NAME}</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{SITE_TAGLINE}</p>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/tools#${category.slug}`}
              className="text-sm text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
            >
              {category.label}
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 dark:text-slate-500">
          <a href={BLOG_URL} rel="noopener">Blog</a>
          <Link href="/cheat-sheets">Cheat Sheets</Link>
          <Link href="/interview-questions">Interview Questions</Link>
          <Link href="/snippets">Snippets</Link>
          <Link href="/api-directory">API Directory</Link>
          <Link href="/roadmaps">Roadmaps</Link>
        </div>

        <p className="mt-8 text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} {SITE_NAME}. All tools run locally in your browser.
        </p>
      </div>
    </footer>
  );
}
