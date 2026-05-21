"use client";

import { useEffect, useState } from "react";

function tick() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
}

export default function NavClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setTime(tick()));
    const id = setInterval(() => setTime(tick()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono text-xs tabular-nums text-muted-foreground">
      {time}
    </span>
  );
}
