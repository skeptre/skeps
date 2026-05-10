"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type LandingRevealProps = {
  children: ReactNode;
  full: Variants;
  reduced: Variants;
  reduceMotion: boolean | null;
  className?: string;
};

/**
 * Staged landing reveal. Pair with objects from `landing-variants.ts`.
 * Uses reduced variants when `reduceMotion` is true (opacity-only).
 */
export function LandingReveal({
  children,
  full,
  reduced,
  reduceMotion,
  className,
}: LandingRevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={reduceMotion ? reduced : full}
    >
      {children}
    </motion.div>
  );
}
