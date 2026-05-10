import type { Variants } from "framer-motion";

/** Premium ease — smooth deceleration, no bounce. */
export const easePremium = [0.22, 1, 0.36, 1] as const;

const BLUR_IN = "blur(10px)";
const BLUR_OUT = "blur(0px)";
const Y_SHIFT = 22;
const Y_HEADING = 26;

/** Stagger timings (seconds) — spaced so each stage reads clearly. */
export const landingDelays = {
  /** Decorative rule */
  line: 0,
  heading: 0.12,
  subtitle: 0.4,
  bodyFirst: 0.62,
  bodySecond: 0.86,
  footer: 1.08,
  /** First link tile */
  linkBase: 1.34,
} as const;

const REVEAL_DURATION = 0.72;
const LINK_DURATION = 0.52;
const LINK_STAGGER = 0.082;
const LINE_DURATION = 0.4;

export function createRevealBlock(delay: number, y = Y_SHIFT): Variants {
  return {
    hidden: {
      opacity: 0,
      y,
      filter: BLUR_IN,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: BLUR_OUT,
      transition: {
        duration: REVEAL_DURATION,
        ease: easePremium,
        delay,
      },
    },
  };
}

/** Heading: slightly stronger vertical travel + subtle letter-spacing settle. */
export function createHeadingReveal(delay: number): Variants {
  return {
    hidden: {
      opacity: 0,
      y: Y_HEADING,
      filter: BLUR_IN,
      letterSpacing: "0.04em",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: BLUR_OUT,
      letterSpacing: "-0.02em",
      transition: {
        duration: REVEAL_DURATION,
        ease: easePremium,
        delay,
      },
    },
  };
}

export const lineRuleVariants: Variants = {
  hidden: { scaleX: 0, opacity: 1 },
  visible: {
    scaleX: 1,
    transition: { duration: LINE_DURATION, ease: easePremium, delay: landingDelays.line },
  },
};

export const headingVariants = createHeadingReveal(landingDelays.heading);
export const subtitleVariants = createRevealBlock(landingDelays.subtitle, 20);
export const bodyFirstVariants = createRevealBlock(landingDelays.bodyFirst);
export const bodySecondVariants = createRevealBlock(landingDelays.bodySecond);
export const footerVariants = createRevealBlock(landingDelays.footer, 18);

/** Link tiles: fade up + slight scale — staggered only via `custom` index. */
export const linkTileVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    scale: 0.98,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: LINK_DURATION,
      ease: easePremium,
      delay: landingDelays.linkBase + i * LINK_STAGGER,
    },
  }),
};

// ---------------------------------------------------------------------------
// Reduced motion: opacity only, same staging delays, no blur / y / scale.
// ---------------------------------------------------------------------------

const REDUCED_DURATION = 0.26;

export function reducedFadeAt(delay: number): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: REDUCED_DURATION,
        ease: "easeOut",
        delay,
      },
    },
  };
}

export const reducedLineVariants = reducedFadeAt(landingDelays.line);

export const reducedHeadingVariants = reducedFadeAt(landingDelays.heading);
export const reducedSubtitleVariants = reducedFadeAt(landingDelays.subtitle);
export const reducedBodyFirstVariants = reducedFadeAt(landingDelays.bodyFirst);
export const reducedBodySecondVariants = reducedFadeAt(landingDelays.bodySecond);
export const reducedFooterVariants = reducedFadeAt(landingDelays.footer);

export const reducedLinkTileVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      duration: REDUCED_DURATION,
      ease: "easeOut",
      delay: landingDelays.linkBase + i * LINK_STAGGER,
    },
  }),
};
