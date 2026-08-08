import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Roadmaps";
const DESCRIPTION =
  "Step-by-step learning roadmaps for frontend, backend, DevOps, and full-stack development — a clear order to learn things in, without the overwhelm.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["developer roadmap", "frontend roadmap", "backend roadmap", "devops roadmap", "learn to code path"],
  alternates: { canonical: `${SITE_URL}/roadmaps/` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/roadmaps/`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RoadmapsPage() {
  return (
    <ComingSoon
      title={TITLE}
      intro="Structured, opinionated learning paths that answer the question every self-taught developer asks: what should I learn next, and in what order?"
      highlights={[
        { title: "Frontend developer", description: "HTML/CSS fundamentals through modern frameworks, state management, and build tooling." },
        { title: "Backend developer", description: "APIs, databases, authentication, caching, and the tradeoffs behind each choice." },
        { title: "Full-stack developer", description: "How frontend and backend roadmaps combine, plus where to draw the line early on." },
        { title: "DevOps", description: "CI/CD, containers, orchestration, and infrastructure-as-code, roughly in the order teams adopt them." },
        { title: "System design", description: "Scaling, load balancing, caching layers, and the concepts interviewers actually probe for." },
        { title: "Data structures & algorithms", description: "The subset that shows up in real interviews, ordered by how often it's asked." },
      ]}
      closing="This section is actively being built. Check back soon, or explore the full tool library in the meantime."
    />
  );
}
