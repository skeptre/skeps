"use client";

import { useEffect, useRef, useState } from "react";

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 8;

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function handXY(angleDeg: number, length: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  return { x: CX + length * Math.cos(rad), y: CY + length * Math.sin(rad) };
}

function getTime() {
  const now = new Date();
  const s = now.getSeconds();
  const m = now.getMinutes();
  const h = now.getHours();
  return {
    s: s * 6,
    m: m * 6 + s * 0.1,
    h: (h % 12) * 30 + m * 0.5,
    timeStr: `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
    dateStr: `${String(now.getDate()).padStart(2, "0")} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`,
  };
}

function initPos() {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  return { x: Math.max(16, window.innerWidth - 260), y: 80 };
}

function initTz() {
  if (typeof window === "undefined") return "";
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  } catch {
    return "";
  }
}

export default function AnalogClock() {
  const [time, setTime] = useState(getTime);
  const [pos, setPos] = useState(initPos);
  const [tz] = useState(initTz);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, ox: 0, oy: 0 });

  // Clock tick — setState inside interval callback is a valid subscription
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  // Mouse drag — setState inside event callbacks is valid
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - SIZE - 32, e.clientX - drag.current.ox)),
        y: Math.max(0, Math.min(window.innerHeight - 340, e.clientY - drag.current.oy)),
      });
    };
    const onUp = () => {
      drag.current.active = false;
      setIsDragging(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Touch drag
  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      e.preventDefault();
      const t = e.touches[0];
      setPos({
        x: Math.max(0, Math.min(window.innerWidth - SIZE - 32, t.clientX - drag.current.ox)),
        y: Math.max(0, Math.min(window.innerHeight - 340, t.clientY - drag.current.oy)),
      });
    };
    const onEnd = () => {
      drag.current.active = false;
      setIsDragging(false);
    };
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = { active: true, ox: e.clientX - pos.x, oy: e.clientY - pos.y };
    setIsDragging(true);
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    drag.current = { active: true, ox: t.clientX - pos.x, oy: t.clientY - pos.y };
    setIsDragging(true);
  };

  const hour = handXY(time.h, R * 0.50);
  const minute = handXY(time.m, R * 0.68);
  const secondTip = handXY(time.s, R * 0.82);
  const secondTail = handXY(time.s + 180, R * 0.18);

  return (
    // suppressHydrationWarning handles the server→client position difference
    <div
      suppressHydrationWarning
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 40 }}
      className="select-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div
        className="flex flex-col items-center gap-3 rounded-sm border border-border bg-card/95 p-4 backdrop-blur-sm"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-label={`Analog clock showing ${time.timeStr}`}
          suppressHydrationWarning
        >
          {/* Face */}
          <circle cx={CX} cy={CY} r={R} fill="hsl(0 0% 7%)" stroke="hsl(0 0% 18%)" strokeWidth={1} />

          {/* 60 tick marks — every 5th is an hour mark */}
          {Array.from({ length: 60 }, (_, i) => {
            const isHour = i % 5 === 0;
            const outer = handXY(i * 6, R * 0.92);
            const inner = handXY(i * 6, isHour ? R * 0.77 : R * 0.87);
            return (
              <line
                key={i}
                x1={inner.x} y1={inner.y}
                x2={outer.x} y2={outer.y}
                stroke={isHour ? "hsl(0 0% 45%)" : "hsl(0 0% 22%)"}
                strokeWidth={isHour ? 2 : 1}
                strokeLinecap="round"
              />
            );
          })}

          {/* Hour hand */}
          <line x1={CX} y1={CY} x2={hour.x} y2={hour.y}
            stroke="hsl(0 0% 95%)" strokeWidth={3} strokeLinecap="round"
            suppressHydrationWarning />

          {/* Minute hand */}
          <line x1={CX} y1={CY} x2={minute.x} y2={minute.y}
            stroke="hsl(0 0% 75%)" strokeWidth={2} strokeLinecap="round"
            suppressHydrationWarning />

          {/* Second hand with back tail */}
          <line x1={secondTail.x} y1={secondTail.y} x2={secondTip.x} y2={secondTip.y}
            stroke="hsl(130 100% 50%)" strokeWidth={1.5} strokeLinecap="round"
            suppressHydrationWarning />

          {/* Center cap */}
          <circle cx={CX} cy={CY} r={4} fill="hsl(130 100% 50%)" />
          <circle cx={CX} cy={CY} r={2} fill="hsl(0 0% 7%)" />
        </svg>

        {/* Readout */}
        <div className="text-center" suppressHydrationWarning>
          <p className="font-mono text-sm tabular-nums text-foreground">
            {time.timeStr}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {time.dateStr}
          </p>
          {tz && (
            <p className="mt-0.5 font-mono text-xs text-muted-foreground opacity-60">
              {tz}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
