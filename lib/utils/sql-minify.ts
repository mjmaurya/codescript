/**
 * Minify a SQL string by collapsing whitespace runs to a single space,
 * while leaving the contents of string/identifier literals and comments
 * untouched. This is a hand-written state machine (not regex-based)
 * because correctly handling escaped quotes (`''`, `""`) alongside
 * multiple comment styles (`--`, `#`, `/* *\/`) at once is not reliably
 * expressible with regular expressions.
 *
 * Recognized regions that are copied through verbatim:
 *  - single-quoted strings: 'it''s a test'   (doubled '' is an escaped quote)
 *  - double-quoted identifiers: "col name"   (doubled "" is an escaped quote)
 *  - backtick-quoted identifiers: `col name` (MySQL-style)
 *  - line comments: -- comment / # comment   (run to end of line)
 *  - block comments: /* comment *\/           (run to closing marker)
 *
 * Everywhere else, runs of whitespace (spaces/tabs/newlines) collapse to
 * a single space, and the whole result is trimmed.
 */
export function minifySql(sql: string): string {
  let out = "";
  let i = 0;
  const n = sql.length;
  let pendingSpace = false;

  const flushSpace = () => {
    if (pendingSpace) {
      if (out.length > 0) out += " ";
      pendingSpace = false;
    }
  };

  while (i < n) {
    const ch = sql[i];
    const next = i + 1 < n ? sql[i + 1] : "";

    // Line comment: -- or #
    if ((ch === "-" && next === "-") || ch === "#") {
      flushSpace();
      const start = i;
      while (i < n && sql[i] !== "\n") i++;
      // Keep the terminating newline itself (if any) as part of the
      // verbatim copy rather than letting it become collapsible
      // whitespace -- otherwise collapsing it away would merge the
      // following line into the comment (e.g. "-- x\nFROM t" would
      // become "-- x FROM t", silently commenting out "FROM t" too).
      if (i < n) i++;
      out += sql.slice(start, i);
      continue;
    }

    // Block comment: /* ... */
    if (ch === "/" && next === "*") {
      flushSpace();
      const start = i;
      i += 2;
      while (i < n && !(sql[i] === "*" && sql[i + 1] === "/")) i++;
      i = Math.min(i + 2, n);
      out += sql.slice(start, i);
      continue;
    }

    // Single-quoted string literal
    if (ch === "'") {
      flushSpace();
      const start = i;
      i++;
      while (i < n) {
        if (sql[i] === "'" && sql[i + 1] === "'") {
          i += 2;
          continue;
        }
        if (sql[i] === "'") {
          i++;
          break;
        }
        i++;
      }
      out += sql.slice(start, i);
      continue;
    }

    // Double-quoted identifier
    if (ch === '"') {
      flushSpace();
      const start = i;
      i++;
      while (i < n) {
        if (sql[i] === '"' && sql[i + 1] === '"') {
          i += 2;
          continue;
        }
        if (sql[i] === '"') {
          i++;
          break;
        }
        i++;
      }
      out += sql.slice(start, i);
      continue;
    }

    // Backtick-quoted identifier
    if (ch === "`") {
      flushSpace();
      const start = i;
      i++;
      while (i < n && sql[i] !== "`") i++;
      i = Math.min(i + 1, n);
      out += sql.slice(start, i);
      continue;
    }

    // Whitespace outside any of the above
    if (ch === " " || ch === "\t" || ch === "\n" || ch === "\r") {
      pendingSpace = true;
      i++;
      continue;
    }

    flushSpace();
    out += ch;
    i++;
  }

  return out.trim();
}
