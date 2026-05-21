"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SIZE = 200;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = SIZE / 2 - 8;
const READOUT_H = 62;
const FRICTION = 0.988;
const BOUNCE = 0.72;

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function handXY(angleDeg: number, length: number) {
  const rad = (angleDeg - 90) * (Math.PI / 180);
  const round = (n: number) => Math.round(n * 10000) / 10000;
  return { x: round(CX + length * Math.cos(rad)), y: round(CY + length * Math.sin(rad)) };
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
  const vel = useRef({ x: 0, y: 0 });
  const posRef = useRef(pos);
  const rafRef = useRef<number | null>(null);
  const trail = useRef<{ x: number; y: number; t: number }[]>([]);

  const stopPhysics = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startPhysics = useCallback(() => {
    stopPhysics();
    let last: number | null = null;
    function frame(ts: number) {
      if (last === null) { last = ts; rafRef.current = requestAnimationFrame(frame); return; }
      const dt = Math.min(ts - last, 50);
      last = ts;
      vel.current.x *= FRICTION;
      vel.current.y *= FRICTION;
      let nx = posRef.current.x + vel.current.x * dt;
      let ny = posRef.current.y + vel.current.y * dt;
      const maxX = window.innerWidth - SIZE;
      const maxY = window.innerHeight - SIZE - READOUT_H;
      if (nx < 0) { nx = 0; vel.current.x = Math.abs(vel.current.x) * BOUNCE; }
      else if (nx > maxX) { nx = maxX; vel.current.x = -Math.abs(vel.current.x) * BOUNCE; }
      if (ny < 0) { ny = 0; vel.current.y = Math.abs(vel.current.y) * BOUNCE; }
      else if (ny > maxY) { ny = maxY; vel.current.y = -Math.abs(vel.current.y) * BOUNCE; }
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
      if (Math.abs(vel.current.x) < 0.02 && Math.abs(vel.current.y) < 0.02) {
        rafRef.current = null;
        return;
      }
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
  }, [stopPhysics]);

  // Clock tick
  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  // Cleanup physics on unmount
  useEffect(() => () => stopPhysics(), [stopPhysics]);

  // Mouse drag
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      const nx = Math.max(0, Math.min(window.innerWidth - SIZE, e.clientX - drag.current.ox));
      const ny = Math.max(0, Math.min(window.innerHeight - SIZE - READOUT_H, e.clientY - drag.current.oy));
      trail.current.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      if (trail.current.length > 5) trail.current.shift();
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
    };
    const onUp = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      setIsDragging(false);
      const pts = trail.current;
      if (pts.length >= 2) {
        const a = pts[pts.length - 2];
        const b = pts[pts.length - 1];
        const dt = b.t - a.t;
        if (dt > 0 && dt < 80) {
          vel.current = { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt };
          startPhysics();
        }
      }
      trail.current = [];
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [startPhysics]);

  // Touch drag
  useEffect(() => {
    const onMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      e.preventDefault();
      const t = e.touches[0];
      const nx = Math.max(0, Math.min(window.innerWidth - SIZE, t.clientX - drag.current.ox));
      const ny = Math.max(0, Math.min(window.innerHeight - SIZE - READOUT_H, t.clientY - drag.current.oy));
      trail.current.push({ x: t.clientX, y: t.clientY, t: performance.now() });
      if (trail.current.length > 5) trail.current.shift();
      posRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
    };
    const onEnd = () => {
      if (!drag.current.active) return;
      drag.current.active = false;
      setIsDragging(false);
      const pts = trail.current;
      if (pts.length >= 2) {
        const a = pts[pts.length - 2];
        const b = pts[pts.length - 1];
        const dt = b.t - a.t;
        if (dt > 0 && dt < 80) {
          vel.current = { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt };
          startPhysics();
        }
      }
      trail.current = [];
    };
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", onEnd);
    return () => {
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };
  }, [startPhysics]);

  const onMouseDown = (e: React.MouseEvent) => {
    stopPhysics();
    vel.current = { x: 0, y: 0 };
    trail.current = [];
    drag.current = { active: true, ox: e.clientX - posRef.current.x, oy: e.clientY - posRef.current.y };
    setIsDragging(true);
    e.preventDefault();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    stopPhysics();
    vel.current = { x: 0, y: 0 };
    trail.current = [];
    const t = e.touches[0];
    drag.current = { active: true, ox: t.clientX - posRef.current.x, oy: t.clientY - posRef.current.y };
    setIsDragging(true);
  };

  const hour = handXY(time.h, R * 0.50);
  const minute = handXY(time.m, R * 0.68);
  const secondTip = handXY(time.s, R * 0.82);
  const secondTail = handXY(time.s + 180, R * 0.18);

  return (
    <div
      suppressHydrationWarning
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 40, cursor: isDragging ? "grabbing" : "grab" }}
      className="select-none flex flex-col items-center gap-2"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
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

        {/* 60 tick marks */}
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

        {/* Second hand */}
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
        <p className="mt-0.5 font-mono text-xs text-muted-foreground opacity-60" suppressHydrationWarning>
          {tz}
        </p>
      </div>
    </div>
  );
}
