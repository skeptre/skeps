"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const BEAM_COUNT = 50;
const maxPathsOnMobile = 12;
const MOBILE_QUERY = "(max-width: 767px)";

function subscribeMobile(cb: () => void) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getMobile = () => window.matchMedia(MOBILE_QUERY).matches;
// Server snapshot is mobile: first paint renders the small set, desktop upgrades after hydration.
const getServerMobile = () => true;

// Deterministic Aceternity-style path set: 50 curved beams offset step by step.
const PATHS: string[] = Array.from({ length: BEAM_COUNT }, (_, i) => {
  const a = 380 - i * 5;
  const b = 189 + i * 6;
  return `M-${a} -${b}C-${a} -${b} -${312 - i * 5} ${216 - i * 6} ${152 - i * 5} ${343 - i * 6}C${616 - i * 5} ${470 - i * 6} ${684 - i * 5} ${875 - i * 6} ${684 - i * 5} ${875 - i * 6}`;
});

// Seeded from the index so server and client render identically.
const TIMINGS = Array.from({ length: BEAM_COUNT }, (_, i) => ({
  duration: 10 + ((i * 7) % 11),
  delay: (i * 3) % 10,
  y2: 93 + ((i * 5) % 8),
}));

export function BackgroundBeams({
  className,
  count = BEAM_COUNT,
}: {
  className?: string;
  count?: number;
}) {
  const reduce = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { amount: 0.1 });
  const isMobile = useSyncExternalStore(
    subscribeMobile,
    getMobile,
    getServerMobile,
  );
  const n = Math.min(
    count,
    BEAM_COUNT,
    isMobile ? maxPathsOnMobile : BEAM_COUNT,
  );
  const paths = PATHS.slice(0, n);
  const timings = TIMINGS.slice(0, n);
  const animate = !reduce && inView;
  const uid = useId().replace(/:/g, "");
  const radialId = `beams-radial-${uid}`;

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <svg
        ref={svgRef}
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        {paths.map((d, i) => (
          <path
            key={`base-${i}`}
            d={d}
            stroke={`url(#${radialId})`}
            strokeOpacity="0.25"
            strokeWidth="0.5"
          />
        ))}
        {!reduce &&
          paths.map((d, i) => (
            <path
              key={`beam-${i}`}
              d={d}
              stroke={`url(#${uid}-grad-${i})`}
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
          ))}
        <defs>
          {!reduce &&
            timings.map((t, i) =>
              animate ? (
                <motion.linearGradient
                  key={`grad-${i}`}
                  id={`${uid}-grad-${i}`}
                  gradientUnits="userSpaceOnUse"
                  initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
                  animate={{
                    x1: ["0%", "100%"],
                    x2: ["0%", "95%"],
                    y1: ["0%", "100%"],
                    y2: ["0%", `${t.y2}%`],
                  }}
                  transition={{
                    duration: t.duration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: t.delay,
                  }}
                >
                  <stop stopColor="#67E8F9" stopOpacity="0" />
                  <stop stopColor="#67E8F9" />
                  <stop offset="32.5%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                </motion.linearGradient>
              ) : (
                <linearGradient
                  key={`grad-${i}`}
                  id={`${uid}-grad-${i}`}
                  gradientUnits="userSpaceOnUse"
                  x1="0%"
                  x2="0%"
                  y1="0%"
                  y2="0%"
                >
                  <stop stopColor="#67E8F9" stopOpacity="0" />
                  <stop stopColor="#67E8F9" />
                  <stop offset="32.5%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
                </linearGradient>
              ),
            )}
          <radialGradient
            id={radialId}
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
          >
            <stop offset="0.0666667" stopColor="#d4d4d8" />
            <stop offset="0.243243" stopColor="#67E8F9" />
            <stop offset="0.43594" stopColor="#67E8F9" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
