"use client";

import { JSONPath } from "jsonpath-plus";
import { useMemo, useState } from "react";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

export default function JsonPathTester() {
  const [doc, setDoc] = useState("");
  const [path, setPath] = useState("");

  const { matches, error } = useMemo(() => {
    if (!doc.trim()) return { matches: null as unknown[] | null, error: "" };

    let parsedDoc: unknown;
    try {
      parsedDoc = JSON.parse(doc);
    } catch (err) {
      return { matches: null, error: err instanceof Error ? `JSON error: ${err.message}` : "Invalid JSON." };
    }

    const expression = path.trim() || "$";
    try {
      const result = JSONPath({ path: expression, json: parsedDoc as never });
      return { matches: Array.isArray(result) ? result : [result], error: "" };
    } catch (err) {
      return { matches: null, error: err instanceof Error ? `JSONPath error: ${err.message}` : "Invalid JSONPath expression." };
    }
  }, [doc, path]);

  return (
    <div className="space-y-4">
      <Field label="JSON document">
        <TextArea
          rows={12}
          value={doc}
          onChange={(e) => setDoc(e.target.value)}
          placeholder='{"store":{"book":[{"title":"Book A"},{"title":"Book B"}]}}'
        />
      </Field>

      <Field label="JSONPath expression">
        <Input
          value={path}
          onChange={(e) => setPath(e.target.value)}
          placeholder="$.store.book[*].title"
        />
      </Field>

      <ErrorText>{error}</ErrorText>

      {!error && matches && (
        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-700 dark:text-slate-300">
            {matches.length === 0 ? "No matches" : `${matches.length} match${matches.length === 1 ? "" : "es"}`}
          </p>
          {matches.length > 0 && (
            <ul className="max-h-96 space-y-2 overflow-auto">
              {matches.map((match, index) => (
                <li
                  key={index}
                  className="rounded-md border border-slate-300 bg-white p-3 font-mono text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <pre className="whitespace-pre-wrap break-words">{JSON.stringify(match, null, 2)}</pre>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
