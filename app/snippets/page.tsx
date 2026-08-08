import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Snippets";
const DESCRIPTION =
  "Ready-to-use code snippets for JavaScript, TypeScript, React, Python, and Bash — copy-paste solutions for the small problems you re-solve on every project.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["code snippets", "javascript snippets", "react hooks", "python one-liners", "bash scripts"],
  alternates: { canonical: `${SITE_URL}/snippets/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/snippets/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function SnippetsPage() {
  return (
    <ComingSoon
      title={TITLE}
      intro="Small, focused, copy-paste-ready code for the problems that come up in almost every project — with an explanation of what each snippet does and why."
      highlights={[
        { title: "JavaScript & TypeScript", description: "Debounce, deep clone, array grouping, and other utilities people rewrite from scratch." },
        { title: "React hooks", description: "useDebounce, useLocalStorage, useClickOutside, and other patterns worth not reinventing." },
        { title: "CSS layout", description: "Centering, sticky footers, grid patterns, and the fixes for the layout bugs everyone hits." },
        { title: "Python", description: "List/dict comprehensions, file handling, and common one-liners with plain-English explanations." },
        { title: "Bash", description: "Loops, argument parsing, and scripting patterns for everyday automation." },
        { title: "SQL", description: "Pagination, upserts, and query templates for problems that come up in almost every schema." },
      ]}
      closing="This section is actively being built. Check back soon, or explore the full tool library in the meantime."
    />
  );
}
