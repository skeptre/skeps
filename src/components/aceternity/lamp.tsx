"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type LampContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export function LampContainer({ children, className }: LampContainerProps) {
  const reduce = useReducedMotion();

  // Under reduced motion render the expanded state directly, no transition.
  const grow = (from: HTMLMotionProps<"div">["initial"], to: Record<string, string | number>, delay = 0.3) =>
    reduce
      ? ({ initial: false, animate: to } as const)
      : ({
          initial: from,
          whileInView: to,
          viewport: { once: true },
          transition: { delay, duration: 0.8, ease: "easeInOut" },
        } as const);

  return (
    <div
      className={cn(
        "relative z-0 flex min-h-[32rem] w-full flex-col items-center justify-center overflow-hidden bg-background md:min-h-[36rem]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center"
      >
        <motion.div
          {...grow({ opacity: 0.5, width: "15rem" }, { opacity: 1, width: "30rem" })}
          style={{ backgroundImage: "conic-gradient(from 70deg at center top, #22D3EE, transparent, transparent)" }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-background [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          {...grow({ opacity: 0.5, width: "15rem" }, { opacity: 1, width: "30rem" })}
          style={{ backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #22D3EE)" }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-background [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-background [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-primary-strong opacity-50 blur-3xl" />
        <motion.div
          {...grow({ width: "8rem" }, { width: "16rem" })}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-primary blur-2xl"
        />
        <motion.div
          {...grow({ width: "15rem" }, { width: "30rem" })}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-primary"
        />
        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background" />
      </div>
      <div className="relative z-50 flex -translate-y-40 flex-col items-center px-5 md:-translate-y-56">
        {children}
      </div>
    </div>
  );
}
