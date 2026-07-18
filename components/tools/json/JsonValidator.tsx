"use client";

import { useMemo, useState } from "react";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";

function describeError(input: string, err: unknown): string {
  if (!(err instanceof Error)) return "Invalid JSON.";
  const match = err.message.match(/position (\d+)/);
  if (!match) return err.message;

  const position = Number(match[1]);
  const before = input.slice(0, position);
  const line = (before.match(/\n/g)?.length ?? 0) + 1;
  const lastNewline = before.lastIndexOf("\n");
  const column = position - lastNewline;

  return `${err.message} (line ${line}, column ${column})`;
}

export default function JsonValidator() {
  const [input, setInput] = useState("");

  const { valid, error } = useMemo(() => {
    if (!input.trim()) return { valid: null as boolean | null, error: "" };
    try {
      JSON.parse(input);
      return { valid: true, error: "" };
    } catch (err) {
      return { valid: false, error: describeError(input, err) };
    }
  }, [input]);

  return (
    <div className="space-y-4">
      <Field label="JSON to validate">
        <TextArea
          rows={12}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"hello":"world"}'
        />
      </Field>

      {valid === true && (
        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300">
          Valid JSON
        </p>
      )}

      {valid === false && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          Invalid JSON
        </p>
      )}

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
