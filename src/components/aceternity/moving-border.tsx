"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

type MovingBorderButtonProps = {
  as?: React.ElementType;
  borderRadius?: string;
  duration?: number;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, "className" | "children"> & {
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
  };

export function MovingBorderButton({
  as,
  borderRadius = "1rem",
  duration = 3000,
  containerClassName,
  borderClassName,
  className,
  children,
  ...rest
}: MovingBorderButtonProps) {
  const reduce = useReducedMotion();
  const innerRadius = `calc(${borderRadius} * 0.96)`;
  // Server components can't pass a component through `as`, so pick the
  // element from `href`: internal paths get next/link, URLs get <a>.
  const Component: React.ElementType =
    as ?? (rest.href ? (rest.href.startsWith("/") ? Link : "a") : "button");

  return (
    <Component
      className={cn(
        "relative inline-flex overflow-hidden p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        reduce && "bg-primary/60",
        containerClassName,
      )}
      style={{ borderRadius }}
      {...rest}
    >
      {!reduce && (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ borderRadius: innerRadius }}>
          <MovingBorder duration={duration} rx="30%" ry="30%">
            <div
              className={cn(
                "h-20 w-20 bg-[radial-gradient(#67E8F9_40%,transparent_60%)] opacity-[0.9]",
                borderClassName,
              )}
            />
          </MovingBorder>
        </div>
      )}
      <span
        className={cn(
          "relative inline-flex h-[52px] w-full items-center justify-center border border-border/60 bg-background px-6 font-sans text-base font-semibold text-foreground",
          className,
        )}
        style={{ borderRadius: innerRadius }}
      >
        {children}
      </span>
    </Component>
  );
}

function MovingBorder({
  children,
  duration,
  rx,
  ry,
}: {
  children: React.ReactNode;
  duration: number;
  rx?: string;
  ry?: string;
}) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        aria-hidden="true"
        focusable="false"
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>
        {children}
      </motion.div>
    </>
  );
}
