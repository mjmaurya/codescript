"use client";

import { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";

const CHARSETS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  digits: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
} as const;

type CharsetKey = keyof typeof CHARSETS;

const OPTIONS: { key: CharsetKey; label: string }[] = [
  { key: "lowercase", label: "Lowercase (a-z)" },
  { key: "uppercase", label: "Uppercase (A-Z)" },
  { key: "digits", label: "Digits (0-9)" },
  { key: "symbols", label: "Symbols (!@#$...)" },
];

function generatePassword(length: number, charset: string): string {
  const randomValues = crypto.getRandomValues(new Uint32Array(length));
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }
  return password;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [sets, setSets] = useState<Record<CharsetKey, boolean>>({
    lowercase: true,
    uppercase: true,
    digits: true,
    symbols: false,
  });
  const [password, setPassword] = useState("");
  const idPrefix = useId();

  const activeKeys = OPTIONS.map((o) => o.key).filter((key) => sets[key]);
  const charset = activeKeys.map((key) => CHARSETS[key]).join("");
  const error = charset.length === 0 ? "Select at least one character set." : "";
  const entropy = charset.length > 0 ? Math.round(length * Math.log2(charset.length)) : 0;

  function handleToggle(key: CharsetKey) {
    setSets((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      const stillHasOne = OPTIONS.some((o) => next[o.key]);
      return stillHasOne ? next : prev;
    });
  }

  function handleGenerate() {
    if (charset.length === 0) return;
    setPassword(generatePassword(length, charset));
  }

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label={`Length (${length})`}>
          <input
            type="range"
            min={8}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </Field>
        <Field label="Or enter exact length">
          <Input
            type="number"
            min={8}
            max={64}
            value={length}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (!Number.isNaN(value)) setLength(Math.min(64, Math.max(8, value)));
            }}
          />
        </Field>
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {OPTIONS.map(({ key, label }) => (
          <label key={key} htmlFor={`${idPrefix}-${key}`} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
              id={`${idPrefix}-${key}`}
              type="checkbox"
              checked={sets[key]}
              onChange={() => handleToggle(key)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-700"
            />
            {label}
          </label>
        ))}
      </div>

      <ErrorText>{error}</ErrorText>

      <Button type="button" onClick={handleGenerate} disabled={!!error}>
        Generate
      </Button>

      <Field label="Generated password">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            readOnly
            value={password}
            placeholder="Click Generate"
            className="w-full min-w-0 flex-1 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <CopyButton text={password} className="shrink-0" />
        </div>
      </Field>

      {password && (
        <p className="text-xs text-slate-500 dark:text-slate-400">≈{entropy} bits of entropy</p>
      )}
    </div>
  );
}
