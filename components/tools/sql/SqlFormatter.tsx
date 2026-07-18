"use client";

import { useMemo, useState } from "react";
import { format, type SqlLanguage } from "sql-formatter";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Select } from "@/components/ui/Select";
import { TextArea } from "@/components/ui/TextArea";

const DIALECTS: { value: SqlLanguage; label: string }[] = [
  { value: "sql", label: "Standard SQL" },
  { value: "mysql", label: "MySQL" },
  { value: "postgresql", label: "PostgreSQL" },
  { value: "tsql", label: "T-SQL (SQL Server)" },
  { value: "bigquery", label: "BigQuery" },
  { value: "sqlite", label: "SQLite" },
];

export default function SqlFormatter() {
  const [input, setInput] = useState("SELECT id, name, created_at FROM users WHERE active = true ORDER BY created_at DESC;");
  const [dialect, setDialect] = useState<SqlLanguage>("sql");

  const { formatted, error } = useMemo(() => {
    if (!input.trim()) return { formatted: "", error: "" };
    try {
      return { formatted: format(input, { language: dialect }), error: "" };
    } catch (err) {
      return { formatted: "", error: err instanceof Error ? err.message : "Unable to format this SQL." };
    }
  }, [input, dialect]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Raw SQL">
          <TextArea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM table_name;"
          />
        </Field>
        <Field label="Formatted SQL">
          <TextArea rows={12} value={formatted} readOnly placeholder="Formatted SQL will appear here" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Field label="Dialect" className="w-48">
          <Select value={dialect} onChange={(e) => setDialect(e.target.value as SqlLanguage)}>
            {DIALECTS.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </Select>
        </Field>
        <div className="pt-6">
          <CopyButton text={formatted} />
        </div>
      </div>

      <ErrorText>{error}</ErrorText>
    </div>
  );
}
