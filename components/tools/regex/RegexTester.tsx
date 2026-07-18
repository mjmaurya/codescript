"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { TextArea } from "@/components/ui/TextArea";

const FLAGS: { flag: string; label: string; description: string }[] = [
  { flag: "g", label: "g", description: "Global — find all matches" },
  { flag: "i", label: "i", description: "Case-insensitive" },
  { flag: "m", label: "m", description: "Multiline — ^ and $ match line boundaries" },
  { flag: "s", label: "s", description: "Dot all — . matches newlines" },
  { flag: "u", label: "u", description: "Unicode — full unicode matching" },
  { flag: "y", label: "y", description: "Sticky — match starting at lastIndex only" },
];

type MatchInfo = {
  match: string;
  index: number;
  groups: { key: string; value: string | undefined }[];
};

export default function RegexTester() {
  const [pattern, setPattern] = useState("\\d+");
  const [testString, setTestString] = useState("Order #1234 shipped on 2024-01-05, invoice #5678.");
  const [activeFlags, setActiveFlags] = useState<Set<string>>(new Set(["g"]));

  function toggleFlag(flag: string) {
    setActiveFlags((prev) => {
      const next = new Set(prev);
      if (next.has(flag)) next.delete(flag);
      else next.add(flag);
      return next;
    });
  }

  const flagsString = FLAGS.map((f) => f.flag)
    .filter((f) => activeFlags.has(f))
    .join("");

  const { error, segments, matches } = useMemo((): {
    error: string;
    segments: ReactNode[];
    matches: MatchInfo[];
  } => {
    if (!pattern) return { error: "", segments: [testString], matches: [] };

    // matchAll requires the "g" flag; add it internally for the matching
    // pass even if the user didn't select it, but keep their other flags.
    const matchAllFlags = flagsString.includes("g") ? flagsString : flagsString + "g";

    try {
      const regex = new RegExp(pattern, matchAllFlags);
      const all = Array.from(testString.matchAll(regex));

      const foundMatches: MatchInfo[] = all.map((m) => {
        const groups: { key: string; value: string | undefined }[] = [];
        for (let i = 1; i < m.length; i++) {
          groups.push({ key: String(i), value: m[i] });
        }
        if (m.groups) {
          for (const [name, value] of Object.entries(m.groups)) {
            groups.push({ key: name, value });
          }
        }
        return { match: m[0], index: m.index ?? 0, groups };
      });

      const nodes: ReactNode[] = [];
      let cursor = 0;
      all.forEach((m, i) => {
        const start = m.index ?? 0;
        const end = start + m[0].length;
        if (start > cursor) nodes.push(testString.slice(cursor, start));
        nodes.push(
          <mark key={`m-${i}-${start}`} className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-900/60">
            {m[0].length > 0 ? m[0] : "​"}
          </mark>
        );
        cursor = Math.max(end, cursor);
        // Guard against zero-length matches causing an infinite-looking loop visually.
        if (m[0].length === 0) cursor = end;
      });
      if (cursor < testString.length) nodes.push(testString.slice(cursor));

      return { error: "", segments: nodes.length > 0 ? nodes : [testString], matches: foundMatches };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Invalid regular expression.",
        segments: [testString],
        matches: [],
      };
    }
  }, [pattern, testString, flagsString]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Pattern (without slashes)">
          <Input
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="\\d+"
            className="font-mono"
          />
        </Field>
        <Field label="Flags">
          <div className="flex flex-wrap gap-2 pt-1">
            {FLAGS.map(({ flag, label }) => {
              const active = activeFlags.has(flag);
              return (
                <button
                  key={flag}
                  type="button"
                  onClick={() => toggleFlag(flag)}
                  aria-pressed={active}
                  title={FLAGS.find((f) => f.flag === flag)?.description}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm font-mono font-medium transition-colors ${
                    active
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>

      <Field label="Test string">
        <TextArea rows={6} value={testString} onChange={(e) => setTestString(e.target.value)} />
      </Field>

      <ErrorText>{error}</ErrorText>

      <Field label="Highlighted matches">
        <div className="w-full rounded-md border border-slate-300 bg-white p-3 font-mono text-sm whitespace-pre-wrap break-words text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
          {segments}
        </div>
      </Field>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Matches ({matches.length})
        </p>
        {matches.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No matches.</p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-slate-300 dark:border-slate-700">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                <tr>
                  <th className="px-3 py-2 font-medium">#</th>
                  <th className="px-3 py-2 font-medium">Match</th>
                  <th className="px-3 py-2 font-medium">Index</th>
                  <th className="px-3 py-2 font-medium">Groups</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {matches.map((m, i) => (
                  <tr key={i} className="align-top text-slate-800 dark:text-slate-200">
                    <td className="px-3 py-2 font-mono">{i + 1}</td>
                    <td className="px-3 py-2 font-mono break-all">{m.match || "∅"}</td>
                    <td className="px-3 py-2 font-mono">{m.index}</td>
                    <td className="px-3 py-2 font-mono">
                      {m.groups.length === 0 ? (
                        <span className="text-slate-400 dark:text-slate-500">—</span>
                      ) : (
                        <ul className="space-y-0.5">
                          {m.groups.map((g) => (
                            <li key={g.key} className="break-all">
                              <span className="text-slate-500 dark:text-slate-400">{g.key}:</span>{" "}
                              {g.value ?? <span className="text-slate-400 dark:text-slate-500">undefined</span>}
                            </li>
                          ))}
                        </ul>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <p className="mb-2 font-medium text-slate-700 dark:text-slate-300">Flags cheat sheet</p>
        <ul className="grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2">
          <li><span className="font-mono font-medium">g</span> — global: find all matches, not just the first</li>
          <li><span className="font-mono font-medium">i</span> — case-insensitive matching</li>
          <li><span className="font-mono font-medium">m</span> — multiline: ^ and $ match start/end of each line</li>
          <li><span className="font-mono font-medium">s</span> — dotAll: . also matches newline characters</li>
          <li><span className="font-mono font-medium">u</span> — unicode: enables full unicode-aware matching</li>
          <li><span className="font-mono font-medium">y</span> — sticky: matches only from lastIndex position</li>
        </ul>
      </div>
    </div>
  );
}
