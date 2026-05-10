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

  const localTz = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    [],
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const tzShort = localTimeZoneLabel();

  return (
    <div className="min-w-0 text-left sm:text-center">
      <div className="font-mono text-lg font-semibold tracking-tight text-zinc-950 tabular-nums dark:text-zinc-50 sm:text-xl">
        {format24Local(now, localTz)}
        <span className="ml-2 text-xs font-sans font-medium text-zinc-500 dark:text-zinc-400">
          {tzShort}
        </span>
      </div>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        {formatDateLocal(now)}
      </p>
    </div>
  );
}
