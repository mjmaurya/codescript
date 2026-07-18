"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

function tokenize(input: string): string[] {
  if (!input.trim()) return [];
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function toCamelCase(words: string[]): string {
  return words
    .map((word, i) => (i === 0 ? word : capitalize(word)))
    .join("");
}

function toPascalCase(words: string[]): string {
  return words.map(capitalize).join("");
}

function toSnakeCase(words: string[]): string {
  return words.join("_");
}

function toKebabCase(words: string[]): string {
  return words.join("-");
}

function toConstantCase(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join("_");
}

function toTitleCase(words: string[]): string {
  return words.map(capitalize).join(" ");
}

const ROWS: { label: string; convert: (words: string[]) => string }[] = [
  { label: "camelCase", convert: toCamelCase },
  { label: "PascalCase", convert: toPascalCase },
  { label: "snake_case", convert: toSnakeCase },
  { label: "kebab-case", convert: toKebabCase },
  { label: "CONSTANT_CASE", convert: toConstantCase },
  { label: "Title Case", convert: toTitleCase },
];

export default function CaseConverter() {
  const [input, setInput] = useState("");

  const words = useMemo(() => tokenize(input), [input]);

  const results = useMemo(
    () => ROWS.map((row) => ({ label: row.label, value: row.convert(words) })),
    [words]
  );

  return (
    <div className="space-y-4">
      <Field label="Input text">
        <TextArea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g. myVariableName or Hello World"
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {results.map((result) => (
          <Field key={result.label} label={result.label}>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={result.value}
                placeholder="Result will appear here"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
              <CopyButton text={result.value} />
            </div>
          </Field>
        ))}
      </div>
    </div>
  );
}
