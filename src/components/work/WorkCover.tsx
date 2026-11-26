import Image from "next/image";

import type { WorkCover as Cover } from "@/data/work";
import { cn } from "@/lib/utils";

/**
 * Cover art for a work card. Real screenshots where we have them; otherwise a
 * small drawn scene that says what the project is at a glance.
 */
export default function WorkCover({ cover, accent, priority }: { cover: Cover; accent: string; priority?: boolean }) {
  switch (cover.kind) {
    case "image":
      return (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 66vw, 100vw"
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            cover.position === "top" ? "object-top" : "object-center",
          )}
        />
      );
    case "browser":
      return <BrowserCover url={cover.url} tone={cover.tone} />;
    case "terminal":
      return <TerminalCover lines={cover.lines} accent={accent} />;
    case "board":
      return <BoardCover />;
    case "lambda":
      return <LambdaCover accent={accent} />;
    case "orbit":
      return <OrbitCover glyph={cover.glyph} accent={accent} />;
  }
}

const TONES = {
  warm: {
    bg: "bg-[linear-gradient(135deg,#2a1d17,#4a3226_55%,#1b1411)]",
    head: "Wedding & couple photography",
    font: "font-serif italic",
    blocks: ["bg-[#c8a68a]/70", "bg-[#8a6a55]/70", "bg-[#e8d5c2]/60"],
  },
  stone: {
    bg: "bg-[linear-gradient(135deg,#1c1b18,#3a362d_60%,#1a1915)]",
    head: "Construction & finitions intérieures",
    font: "font-sans font-semibold tracking-tight",
    blocks: ["bg-[#d6c7a1]/60", "bg-[#8e8467]/60", "bg-[#f3ead3]/50"],
  },
  mono: {
    bg: "bg-[linear-gradient(135deg,#f4f1ea,#e7e2d6)]",
    head: "Digital help for growing businesses.",
    font: "font-sans font-semibold tracking-tight text-black",
    blocks: ["bg-black/80", "bg-black/25", "bg-black/10"],
  },
} as const;

function BrowserCover({ url, tone }: { url: string; tone: keyof typeof TONES }) {
  const t = TONES[tone];
  const dark = tone !== "mono";
  return (
    <div className="absolute inset-0 flex flex-col items-center bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.06),transparent_60%)] px-6 pt-14">
      <div className="flex min-h-0 w-full max-w-[520px] flex-1 translate-y-3 flex-col overflow-hidden rounded-t-xl border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out group-hover:translate-y-0">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#18181b] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md bg-white/5 px-2 py-0.5 text-center font-mono text-[11px] text-zinc-400">
            {url}
          </span>
        </div>
        <div className={cn("relative min-h-0 flex-1 p-5", t.bg)}>
          <p className={cn("max-w-[58%] text-lg leading-tight", t.font, dark && "text-white/90")}>{t.head}</p>
          <div className="mt-4 flex gap-2">
            <span className={cn("h-6 w-20 rounded-full", t.blocks[0])} />
            <span className={cn("h-6 w-14 rounded-full", t.blocks[1])} />
          </div>
          <div className="absolute right-4 bottom-4 grid grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className={cn("size-7 rounded-md", t.blocks[i % 3])} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TerminalCover({ lines, accent }: { lines: string[]; accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center bg-[#08080a] px-5 pt-12 pb-4">
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{ background: `radial-gradient(circle at 85% 15%, ${accent}22, transparent 55%)` }}
      />
      <pre className="relative w-full overflow-hidden font-mono text-[12px] leading-6 text-zinc-400">
        {lines.map((line, i) => (
          <div key={i} className="truncate">
            <span style={{ color: accent }}>❯ </span>
            {colourise(line)}
          </div>
        ))}
        <span className="inline-block h-4 w-2 translate-y-0.5 animate-pulse" style={{ background: accent }} />
      </pre>
    </div>
  );
}

function colourise(line: string) {
  if (line.startsWith("#")) return <span className="text-zinc-600">{line}</span>;
  return line.split(/(✓ ?\d*|✗ ?\d*|→ ?\d{3}|\d+ passed)/).map((part, i) => {
    if (/^✓|passed/.test(part)) return <span key={i} className="text-lime-300">{part}</span>;
    if (/^✗/.test(part)) return <span key={i} className="text-rose-400">{part}</span>;
    if (/^→/.test(part)) return <span key={i} className="text-zinc-200">{part}</span>;
    return <span key={i}>{part}</span>;
  });
}

/** Connect 4 board mid-game with a glowing winning diagonal. */
function BoardCover() {
  const cols = 7;
  const rows = 6;
  // 0 empty, 1 rose, 2 cyan; bottom row last
  const grid = [
    "0000000",
    "0000000",
    "0002000",
    "0021100",
    "0211200",
    "2112110",
  ];
  const win = new Set(["5-0", "4-1", "3-2", "2-3"]);
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-6 bg-[radial-gradient(circle_at_50%_30%,rgba(251,113,133,0.12),transparent_60%),#09090b] px-6">
      <svg viewBox={`0 0 ${cols * 34 + 10} ${rows * 34 + 10}`} className="h-[78%] max-h-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" aria-hidden>
        <rect x="0" y="0" width={cols * 34 + 10} height={rows * 34 + 10} rx="14" fill="#1e3a8a" opacity="0.55" />
        {grid.map((row, r) =>
          row.split("").map((v, c) => {
            const key = `${r}-${c}`;
            const fill = v === "1" ? "#fb7185" : v === "2" ? "#67e8f9" : "#09090b";
            return (
              <circle
                key={key}
                cx={c * 34 + 22}
                cy={r * 34 + 22}
                r="12.5"
                fill={fill}
                stroke={win.has(key) ? "#fff" : "none"}
                strokeWidth={win.has(key) ? 2 : 0}
                style={win.has(key) ? { filter: "drop-shadow(0 0 6px #67e8f9)" } : undefined}
              />
            );
          }),
        )}
      </svg>
      <div className="hidden flex-col gap-2 font-mono text-[12px] sm:flex">
        {["C++", "Haskell", "Prolog"].map((lang, i) => (
          <span
            key={lang}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300 transition-transform duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

function LambdaCover({ accent }: { accent: string }) {
  const bars = [0.25, 0.45, 0.7, 0.95];
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-8 bg-[#09090b]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 35% 50%, ${accent}26, transparent 55%)` }}
      />
      <span
        className="relative font-mono text-[96px] leading-none transition-transform duration-500 group-hover:-rotate-6"
        style={{ color: accent, textShadow: `0 0 40px ${accent}88` }}
        aria-hidden
      >
        λ
      </span>
      <div className="relative flex flex-col gap-2" aria-hidden>
        <span className="font-mono text-[11px] text-zinc-500">p@ssw0rd!2026</span>
        <div className="flex items-end gap-1.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-5 rounded-sm"
              style={{ height: `${h * 56}px`, background: i < 3 ? accent : `${accent}44` }}
            />
          ))}
        </div>
        <span className="font-mono text-[11px] text-zinc-400">strength: good</span>
      </div>
    </div>
  );
}

function OrbitCover({ glyph, accent }: { glyph: string; accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#09090b]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 50%, ${accent}22, transparent 55%)` }}
      />
      {[1, 0.72, 0.46].map((s, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute aspect-square rounded-full border motion-safe:animate-[spin_var(--d)_linear_infinite]"
          style={
            {
              width: `${s * 240}px`,
              borderColor: `${accent}${i === 0 ? "33" : i === 1 ? "55" : "88"}`,
              borderTopColor: accent,
              "--d": `${18 + i * 8}s`,
              animationDirection: i % 2 ? "reverse" : "normal",
            } as React.CSSProperties
          }
        />
      ))}
      <span
        aria-hidden
        className="relative text-[56px] leading-none transition-transform duration-500 group-hover:scale-110"
        style={{ color: accent, textShadow: `0 0 30px ${accent}99` }}
      >
        {glyph}
      </span>
    </div>
  );
}
