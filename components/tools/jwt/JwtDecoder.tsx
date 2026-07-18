"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { TextArea } from "@/components/ui/TextArea";
import { decodeJwt } from "@/lib/utils/jwt";

const SAMPLE =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

const DATE_CLAIMS = ["exp", "iat", "nbf"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default function JwtDecoder() {
  const [token, setToken] = useState("");

  const { header, payload, error } = useMemo(() => {
    if (!token.trim()) return { header: "", payload: "", error: "" };
    try {
      const decoded = decodeJwt(token);
      return {
        header: JSON.stringify(decoded.header, null, 2),
        payload: JSON.stringify(decoded.payload, null, 2),
        error: "",
      };
    } catch (err) {
      return {
        header: "",
        payload: "",
        error: err instanceof Error ? err.message : "Could not decode this token.",
      };
    }
  }, [token]);

  const dateClaims = useMemo(() => {
    if (!token.trim() || error) return [];
    try {
      const { payload } = decodeJwt(token);
      if (!isRecord(payload)) return [];
      const now = Date.now() / 1000;
      return DATE_CLAIMS.filter((claim) => typeof payload[claim] === "number").map((claim) => {
        const value = payload[claim] as number;
        return {
          claim,
          value,
          date: new Date(value * 1000).toLocaleString(),
          expired: claim === "exp" && value < now,
        };
      });
    } catch {
      return [];
    }
  }, [token, error]);

  return (
    <div className="space-y-4">
      <Field label="JWT">
        <TextArea
          rows={4}
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder={SAMPLE}
        />
      </Field>

      <ErrorText>{error}</ErrorText>

      {dateClaims.length > 0 && (
        <div className="flex flex-wrap gap-3 text-sm">
          {dateClaims.map(({ claim, date, expired }) => (
            <span
              key={claim}
              className={`rounded-md border px-3 py-1.5 ${
                expired
                  ? "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
                  : "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <span className="font-mono font-medium">{claim}</span>: {date}
              {expired && " (Expired)"}
            </span>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Header">
          <TextArea rows={10} value={header} readOnly placeholder="Decoded header will appear here" />
        </Field>
        <Field label="Payload">
          <TextArea rows={10} value={payload} readOnly placeholder="Decoded payload will appear here" />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <CopyButton text={header} className="w-auto" />
        <span className="text-xs text-slate-500 dark:text-slate-400">Copy header</span>
        <CopyButton text={payload} className="w-auto" />
        <span className="text-xs text-slate-500 dark:text-slate-400">Copy payload</span>
      </div>
    </div>
  );
}
