import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Interview Questions";
const DESCRIPTION =
  "Curated technical interview questions and answers for JavaScript, data structures, system design, and SQL — organized by topic and difficulty.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["interview questions", "javascript interview questions", "system design interview", "sql interview questions", "coding interview prep"],
  alternates: { canonical: `${SITE_URL}/interview-questions/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/interview-questions/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function InterviewQuestionsPage() {
  return (
    <ComingSoon
      title={TITLE}
      intro="Real interview questions with worked answers, organized by topic and difficulty, so you can practice the areas you're weakest in instead of scrolling an unsorted list."
      highlights={[
        { title: "JavaScript & TypeScript", description: "Closures, event loop, prototypes, and typing questions that come up in almost every frontend interview." },
        { title: "Data structures & algorithms", description: "The problems that repeat across interviews, with a plain-English explanation of the approach." },
        { title: "System design", description: "Common prompts — design a URL shortener, a rate limiter, a chat app — with the tradeoffs interviewers look for." },
        { title: "React & frontend", description: "Rendering behavior, hooks pitfalls, and performance questions specific to building UI." },
        { title: "SQL & databases", description: "Query writing, indexing, and normalization questions with sample schemas." },
        { title: "Behavioral", description: "Framing past work using structured formats like STAR, with example answers." },
      ]}
      closing="This section is actively being built. Check back soon, or explore the full tool library in the meantime."
    />
  );
}
