"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ErrorText, Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

const FALLBACK_TIMEZONES = [
  "UTC",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Shanghai",
  "Australia/Sydney",
];

function getSupportedTimeZones(): string[] {
  try {
    if (typeof Intl.supportedValuesOf === "function") {
      const zones = Intl.supportedValuesOf("timeZone");
      if (zones.length > 0) return zones;
    }
  } catch {
    // fall through to fallback list
  }
  return FALLBACK_TIMEZONES;
}

function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

function formatDateTimeLocal(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/**
 * Interpret the components of a `datetime-local` string (which carry no
 * timezone of their own) as wall-clock time *in* `timeZone`, and return
 * the corresponding UTC instant. Uses the standard round-trip trick:
 * treat the components as UTC first, see how that instant renders in the
 * target zone, then correct by the observed offset.
 */
function zonedDateTimeToUtc(dateTimeLocal: string, timeZone: string): Date | null {
  const match = dateTimeLocal.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (!match) return null;
  const [, y, mo, d, h, mi, s] = match;
  const asUtcMs = Date.UTC(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s ?? "0"));
  if (Number.isNaN(asUtcMs)) return null;

  const asUtcDate = new Date(asUtcMs);
  const tzString = asUtcDate.toLocaleString("en-US", { timeZone });
  const utcString = asUtcDate.toLocaleString("en-US", { timeZone: "UTC" });
  const offset = new Date(utcString).getTime() - new Date(tzString).getTime();

  return new Date(asUtcMs + offset);
}

export default function TimestampConverter() {
  const timeZones = useMemo(getSupportedTimeZones, []);
  const defaultTimeZone = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
      return "UTC";
    }
  }, []);

  const [timeZone, setTimeZone] = useState(defaultTimeZone);
  const [unixInput, setUnixInput] = useState(String(Math.floor(Date.now() / 1000)));
  const [dtLocal, setDtLocal] = useState(() => formatDateTimeLocal(new Date()));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // --- Unix -> human ---
  const { humanDate, humanError } = useMemo(() => {
    const trimmed = unixInput.trim();
    if (!trimmed) return { humanDate: "", humanError: "" };
    if (!/^-?\d+$/.test(trimmed)) {
      return { humanDate: "", humanError: "Enter a whole number (Unix timestamp)." };
    }
    const digitCount = trimmed.replace("-", "").length;
    const ms = digitCount <= 10 ? Number(trimmed) * 1000 : Number(trimmed);
    const date = new Date(ms);
    if (Number.isNaN(date.getTime())) {
      return { humanDate: "", humanError: "That number doesn't map to a valid date." };
    }
    try {
      const formatted = new Intl.DateTimeFormat(undefined, {
        timeZone,
        dateStyle: "full",
        timeStyle: "long",
      }).format(date);
      return { humanDate: `${formatted}\n${date.toISOString()}`, humanError: "" };
    } catch {
      return { humanDate: "", humanError: "Unable to format this date for the selected timezone." };
    }
  }, [unixInput, timeZone]);

  // --- Human -> Unix ---
  const { unixSeconds, unixMillis, humanToUnixError } = useMemo(() => {
    if (!dtLocal) return { unixSeconds: "", unixMillis: "", humanToUnixError: "" };
    const utcDate = zonedDateTimeToUtc(dtLocal, timeZone);
    if (!utcDate || Number.isNaN(utcDate.getTime())) {
      return { unixSeconds: "", unixMillis: "", humanToUnixError: "Invalid date/time." };
    }
    return {
      unixSeconds: String(Math.floor(utcDate.getTime() / 1000)),
      unixMillis: String(utcDate.getTime()),
      humanToUnixError: "",
    };
  }, [dtLocal, timeZone]);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Current Unix timestamp:{" "}
        <span className="font-mono font-medium text-slate-800 dark:text-slate-200">
          {Math.floor(now / 1000)}
        </span>{" "}
        seconds &middot;{" "}
        <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{now}</span> ms
      </div>

      <Field label="Timezone (applies to both conversions below)" className="max-w-sm">
        <Select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
          {timeZones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </Select>
      </Field>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Unix timestamp &rarr; date</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Unix timestamp (seconds or milliseconds)">
            <Input
              value={unixInput}
              onChange={(e) => setUnixInput(e.target.value)}
              placeholder="1700000000"
              inputMode="numeric"
            />
          </Field>
          <Field label="Human-readable date">
            <div className="min-h-[2.5rem] whitespace-pre-wrap rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
              {humanDate || "—"}
            </div>
          </Field>
        </div>
        <ErrorText>{humanError}</ErrorText>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Date &rarr; Unix timestamp</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="Date and time">
            <input
              type="datetime-local"
              value={dtLocal}
              onChange={(e) => setDtLocal(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Field label="Seconds">
              <div className="flex items-center gap-2">
                <div className="flex-1 truncate rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  {unixSeconds || "—"}
                </div>
                <CopyButton text={unixSeconds} />
              </div>
            </Field>
            <Field label="Milliseconds">
              <div className="flex items-center gap-2">
                <div className="flex-1 truncate rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
                  {unixMillis || "—"}
                </div>
                <CopyButton text={unixMillis} />
              </div>
            </Field>
          </div>
        </div>
        <ErrorText>{humanToUnixError}</ErrorText>
      </div>
    </div>
  );
}
