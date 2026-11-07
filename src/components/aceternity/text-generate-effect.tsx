"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Word = { text: string; className?: string };

type TextGenerateEffectProps = {
  words: Word[];
  className?: string;
  filter?: boolean;
  duration?: number;
};

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const reduce = useReducedMotion();

  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word.text}-${i}`}>
          {reduce ? (
            <span className={cn("inline-block", word.className)}>{word.text}</span>
          ) : (
            <motion.span
              className={cn("inline-block", word.className)}
              initial={{ opacity: 0, filter: filter ? "blur(10px)" : "none" }}
              animate={{ opacity: 1, filter: filter ? "blur(0px)" : "none" }}
              transition={{ duration, delay: i * 0.2, ease: "easeOut" }}
            >
              {word.text}
            </motion.span>
          )}
          {" "}
        </Fragment>
      ))}
    </span>
  );
}
