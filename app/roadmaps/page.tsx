import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Roadmaps",
  description: "Step-by-step learning roadmaps for developers.",
};

export default function RoadmapsPage() {
  return (
    <ComingSoon
      title="Roadmaps"
      description="Step-by-step learning roadmaps for developers are on the way."
    />
  );
}
