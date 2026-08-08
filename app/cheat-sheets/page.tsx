import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Cheat Sheets";
const DESCRIPTION =
  "Quick-reference cheat sheets for Git, regex, Docker, SQL, Linux, and other everyday developer tools — condensed to the commands and syntax you actually look up.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["cheat sheet", "git cheat sheet", "regex cheat sheet", "docker commands", "sql syntax", "linux commands"],
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
  return (
    <ComingSoon
      title={TITLE}
      intro="A library of condensed, skimmable references for the commands and syntax developers look up over and over — no ads, no fluff, just the table you need."
      highlights={[
        { title: "Git", description: "Branching, rebasing, stashing, and the recovery commands you forget between incidents." },
        { title: "Regex", description: "Anchors, groups, lookaheads, and flags with side-by-side examples for JS, Python, and PCRE." },
        { title: "Docker & Compose", description: "Container lifecycle, networking, volumes, and the compose.yaml options people copy-paste." },
        { title: "SQL", description: "Joins, window functions, and syntax differences across Postgres, MySQL, and SQLite." },
        { title: "Linux / Bash", description: "File permissions, process management, piping, and shell scripting shortcuts." },
        { title: "HTTP status codes", description: "What each code actually means and when a server should return it." },
      ]}
      closing="This section is actively being built. Check back soon, or explore the full tool library in the meantime."
    />
  );
}
