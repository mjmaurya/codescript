import Link from "next/link";
import { BLOG_URL, SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/cheat-sheets", label: "Cheat Sheets" },
  { href: "/interview-questions", label: "Interview Questions" },
  { href: "/snippets", label: "Snippets" },
  { href: "/api-directory", label: "API Directory" },
  { href: "/roadmaps", label: "Roadmaps" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-bold text-slate-900 dark:text-slate-100">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-600 dark:text-slate-400">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              {link.label}
            </Link>
          ))}
          <a
            href={BLOG_URL}
            className="hover:text-indigo-600 dark:hover:text-indigo-400"
            rel="noopener"
          >
            Blog
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
