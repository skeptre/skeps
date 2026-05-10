"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

import {
  ABOUT_EMAIL,
  HOMEPAGE_LINKS,
  isExternalHref,
  isFileHref,
  LANDING_INTRO_SESSION_KEY,
  linkMailtoClassName,
  linkTileClassName,
} from "@/components/home/home-constants";
import { LandingReveal } from "@/components/home/motion/LandingReveal";
import {
  bodyFirstVariants,
  bodySecondVariants,
  easePremium,
  footerVariants,
  headingVariants,
  lineRuleVariants,
  linkTileVariants,
  reducedBodyFirstVariants,
  reducedBodySecondVariants,
  reducedFooterVariants,
  reducedHeadingVariants,
  reducedLineVariants,
  reducedLinkTileVariants,
  reducedSubtitleVariants,
  subtitleVariants,
} from "@/components/home/motion/landing-variants";

/** Legacy key — treat as played so returning users are not forced to replay. */
const LEGACY_INTRO_KEY = "home-landing-intro-played";

function introAlreadyPlayed(): boolean {
  try {
    return (
      sessionStorage.getItem(LANDING_INTRO_SESSION_KEY) === "1" ||
      sessionStorage.getItem(LEGACY_INTRO_KEY) === "1"
    );
  } catch {
    return true;
  }
}

function useSessionIntroSkipped() {
  const [skip] = useState(introAlreadyPlayed);
  return skip;
}

function LinksNav() {
  return (
    <nav
      className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-4"
      aria-label="Social and contact links"
    >
      {HOMEPAGE_LINKS.map((link) => {
        const isAnchor = isExternalHref(link.href) || isFileHref(link.href);
        if (isAnchor) {
          return (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel ?? link.label}
              className={linkTileClassName}
            >
              {link.label}
            </a>
          );
        }
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-label={link.ariaLabel ?? link.label}
            className={linkTileClassName}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

function LinksNavAnimated({
  reduceMotion,
  onIntroComplete,
}: {
  reduceMotion: boolean | null;
  onIntroComplete: () => void;
}) {
  const doneRef = useRef(false);

  const onItemComplete = useCallback(
    (index: number) => {
      if (doneRef.current) return;
      if (index !== HOMEPAGE_LINKS.length - 1) return;
      doneRef.current = true;
      onIntroComplete();
    },
    [onIntroComplete],
  );

  return (
    <nav
      className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-4"
      aria-label="Social and contact links"
    >
      {HOMEPAGE_LINKS.map((link, index) => {
        const isAnchor = isExternalHref(link.href) || isFileHref(link.href);
        const variants = reduceMotion ? reducedLinkTileVariants : linkTileVariants;

        const inner = isAnchor ? (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.ariaLabel ?? link.label}
            className={linkTileClassName}
          >
            {link.label}
          </a>
        ) : (
          <Link
            href={link.href}
            aria-label={link.ariaLabel ?? link.label}
            className={linkTileClassName}
          >
            {link.label}
          </Link>
        );

        return (
          <motion.div
            key={link.href}
            className="inline-flex will-change-transform"
            initial="hidden"
            animate="visible"
            variants={variants}
            custom={index}
            onAnimationComplete={() => onItemComplete(index)}
          >
            {inner}
          </motion.div>
        );
      })}
    </nav>
  );
}

function pickVariants(
  reduceMotion: boolean | null,
  full: Variants,
  reduced: Variants,
): Variants {
  return reduceMotion ? reduced : full;
}

export default function HomePageBody() {
  const skipIntro = useSessionIntroSkipped();
  const reduceMotion = useReducedMotion();
  const marked = useRef(false);

  const markIntroComplete = useCallback(() => {
    if (marked.current) return;
    marked.current = true;
    try {
      sessionStorage.setItem(LANDING_INTRO_SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
  }, []);

  if (skipIntro) {
    return (
      <motion.main
        className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50"
        initial={{ opacity: 0.88 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.32, ease: easePremium }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
          <StaticAbout />
          <section
            id="links"
            className="border-t-2 border-zinc-400 py-16 text-center sm:py-20 dark:border-zinc-600"
          >
            <LinksNav />
          </section>
        </div>
      </motion.main>
    );
  }

  const lineV = pickVariants(reduceMotion, lineRuleVariants, reducedLineVariants);
  const headV = pickVariants(
    reduceMotion,
    headingVariants,
    reducedHeadingVariants,
  );
  const subV = pickVariants(
    reduceMotion,
    subtitleVariants,
    reducedSubtitleVariants,
  );
  const footV = pickVariants(
    reduceMotion,
    footerVariants,
    reducedFooterVariants,
  );

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center sm:px-8 sm:py-12 lg:px-10">
        <section id="about" className="py-16 sm:py-20">
          <div className="mx-auto max-w-xl">
            <div className="mx-auto mb-6 flex w-full max-w-[15rem] justify-center sm:mb-7 sm:max-w-[17rem]">
              <motion.div
                className="h-[1px] w-full max-w-full origin-left rounded-full bg-zinc-400 dark:bg-zinc-500"
                style={{ transformOrigin: "left center" }}
                initial="hidden"
                animate="visible"
                variants={lineV}
                aria-hidden
              />
            </div>

            <header className="text-center">
              <motion.h1
                className="text-2xl font-semibold text-zinc-950 sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50"
                initial="hidden"
                animate="visible"
                variants={headV}
              >
                Hi, I&apos;m Ali
              </motion.h1>
              <motion.p
                className="mt-3 text-sm font-medium leading-relaxed text-zinc-500 sm:text-[0.9375rem] dark:text-zinc-400"
                initial="hidden"
                animate="visible"
                variants={subV}
              >
                Graduate Software Engineer
                <span className="text-zinc-300 dark:text-zinc-600"> · </span>
                Manchester, United Kingdom
              </motion.p>
            </header>

            <LandingReveal
              full={bodyFirstVariants}
              reduced={reducedBodyFirstVariants}
              reduceMotion={reduceMotion}
              className="mt-10 text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400"
            >
              <p>
                I&apos;m currently focused on building complete backend systems in Python.
              </p>
            </LandingReveal>

            <LandingReveal
              full={bodySecondVariants}
              reduced={reducedBodySecondVariants}
              reduceMotion={reduceMotion}
              className="mt-5 text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400"
            >
              <p>
                I enjoy debugging complex behaviour, thinking through edge
                cases, and understanding how systems behave under real-world
                constraints.
              </p>
            </LandingReveal>

            <motion.footer
              className="mt-12 border-t-2 border-zinc-300 pt-10 text-center dark:border-zinc-700"
              initial="hidden"
              animate="visible"
              variants={footV}
            >
              <p className="mx-auto max-w-md text-pretty text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
                If you&apos;re hiring for graduate or junior backend roles, feel
                free to reach out at{" "}
                <a href={`mailto:${ABOUT_EMAIL}`} className={linkMailtoClassName}>
                  {ABOUT_EMAIL}
                </a>
                .
              </p>
            </motion.footer>
          </div>
        </section>

        <section
          id="links"
          className="border-t-2 border-zinc-400 py-16 text-center sm:py-20 dark:border-zinc-600"
        >
          <LinksNavAnimated
            reduceMotion={reduceMotion}
            onIntroComplete={markIntroComplete}
          />
        </section>
      </div>
    </main>
  );
}

function StaticAbout() {
  return (
    <section id="about" className="py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.75rem] sm:leading-snug dark:text-zinc-50">
            Hi, I&apos;m Ali
          </h1>
          <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-500 sm:text-[0.9375rem] dark:text-zinc-400">
            Graduate Software Engineer
            <span className="text-zinc-300 dark:text-zinc-600"> · </span>
            Manchester, United Kingdom
          </p>
        </header>

        <div className="mt-10 space-y-5 text-pretty text-left text-[0.9375rem] leading-[1.7] text-zinc-600 sm:text-base sm:leading-[1.75] dark:text-zinc-400">
          <p>
            I build backend systems, API integrations, and structured software
            with a focus on reliability, clarity, and real-world usefulness. My
            work centres on Python, REST APIs, automation, and data handling,
            with a growing interest in secure system design, infrastructure,
            and backend fundamentals.
          </p>
          <p>
            I enjoy debugging complex behaviour, thinking through edge cases,
            and understanding how systems behave under real-world constraints.
          </p>
        </div>

        <footer className="mt-12 border-t-2 border-zinc-300 pt-10 text-center dark:border-zinc-700">
          <p className="mx-auto max-w-md text-pretty text-[0.9375rem] leading-relaxed text-zinc-600 sm:text-base dark:text-zinc-400">
            If you&apos;re hiring for graduate or junior backend roles, feel free
            to reach out at{" "}
            <a href={`mailto:${ABOUT_EMAIL}`} className={linkMailtoClassName}>
              {ABOUT_EMAIL}
            </a>
            .
          </p>
        </footer>
      </div>
    </section>
  );
}
