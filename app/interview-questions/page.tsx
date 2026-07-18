import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/ComingSoon";

export const metadata: Metadata = {
  title: "Interview Questions",
  description: "Curated technical interview questions and answers, organized by topic.",
};

export default function InterviewQuestionsPage() {
  return (
    <ComingSoon
      title="Interview Questions"
      description="Curated technical interview questions and answers, organized by topic, are on the way."
    />
  );
}
