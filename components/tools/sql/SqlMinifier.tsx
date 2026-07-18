"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";
import { minifySql } from "@/lib/utils/sql-minify";

export default function SqlMinifier() {
  const [input, setInput] = useState(
    "SELECT id, name -- primary columns\nFROM users\nWHERE active = true\n  AND name = 'O''Brien';"
  );

  const minified = useMemo(() => minifySql(input), [input]);

  const beforeBytes = useMemo(() => new Blob([input]).size, [input]);
  const afterBytes = useMemo(() => new Blob([minified]).size, [minified]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Input SQL">
          <TextArea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT * FROM table_name;"
          />
        </Field>
        <Field label="Minified output">
          <TextArea rows={12} value={minified} readOnly placeholder="Minified SQL will appear here" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {minified ? (
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {beforeBytes} bytes &rarr; {afterBytes} bytes
            {beforeBytes > 0 && <> ({Math.round((1 - afterBytes / beforeBytes) * 100)}% smaller)</>}
          </p>
        ) : (
          <span />
        )}
        <CopyButton text={minified} />
      </div>
    </div>
  );
}
