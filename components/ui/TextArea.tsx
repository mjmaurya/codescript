"use client";

import type { TextareaHTMLAttributes } from "react";

export function TextArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      spellCheck={false}
      className={`w-full rounded-md border border-slate-300 bg-white p-3 font-mono text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 ${className}`}
      {...props}
    />
  );
}
