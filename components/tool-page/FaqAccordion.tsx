"use client";

import { useState } from "react";
import type { ToolFaq } from "@/lib/tools-registry";

export function FaqAccordion({ faqs }: { faqs: ToolFaq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs.length) return null;

  return (
    <div className="divide-y divide-slate-200 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-slate-900 dark:text-slate-100"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.question}</span>
              <span className="shrink-0 text-slate-400">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
