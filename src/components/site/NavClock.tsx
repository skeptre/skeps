"use client";

import { useEffect, useState } from "react";

const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function tick() {
  const now = new Date();
  const hh   = String(now.getHours()).padStart(2, "0");
  const mm   = String(now.getMinutes()).padStart(2, "0");
  const ss   = String(now.getSeconds()).padStart(2, "0");
  const day  = DAYS[now.getDay()];
  const date = String(now.getDate()).padStart(2, "0");
  const mon  = MONTHS[now.getMonth()];
  const yr   = now.getFullYear();
  return { time: `${hh}:${mm}:${ss}`, date: `${day} ${date} ${mon} ${yr}` };
}

export default function NavClock() {
  const [display, setDisplay] = useState<{ time: string; date: string } | null>(null);

  useEffect(() => {
    requestAnimationFrame(() => setDisplay(tick()));
    const id = setInterval(() => setDisplay(tick()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!display) return null;

  return (
    <div className="flex flex-col items-end">
      <span className="font-mono text-xs tabular-nums text-muted-foreground">
        {display.time}
      </span>
      <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
        {display.date}
      </span>
    </div>
  );
}
