"use client";

import { useEffect, useMemo, useState } from "react";

function format24Local(d: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(d);
}

function formatDateLocal(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

function localTimeZoneLabel() {
  try {
    return Intl.DateTimeFormat(undefined, {
      timeZoneName: "short",
    })
      .formatToParts(new Date())
      .find((p) => p.type === "timeZoneName")?.value;
  } catch {
    return "Local";
  }
}

export default function TimeZoneClock() {
  const [now, setNow] = useState(() => new Date());
  /** Avoid SSR/client mismatch on short TZ labels (e.g. GMT+1 vs BST). */
  const [tzShort, setTzShort] = useState("");

  const localTz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setTzShort(localTimeZoneLabel() ?? "");
  }, []);

  const timeStr = format24Local(now, localTz);
  const dateStr = formatDateLocal(now);

  return (
    <div className="mx-auto w-full min-w-0 max-w-[20rem] text-center">
      <div
        className="font-mono text-lg font-semibold tabular-nums tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-xl"
        aria-label={`Local time ${timeStr}${tzShort ? ` ${tzShort}` : ""}`}
      >
        <span>{timeStr}</span>
        {tzShort ? (
          <>
            {" "}
            <span className="whitespace-nowrap align-baseline font-sans text-xs font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
              {tzShort}
            </span>
          </>
        ) : null}
      </div>
      <p className="mt-1.5 text-sm leading-snug text-zinc-600 dark:text-zinc-400">
        {dateStr}
      </p>
    </div>
  );
}
