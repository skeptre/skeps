"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type FlipWordsProps = {
  words: string[];
  duration?: number;
  className?: string;
};

export function FlipWords({ words, duration = 3000, className }: FlipWordsProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const count = words.length;

  useEffect(() => {
    if (count < 2) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), duration);
    return () => window.clearInterval(id);
  }, [count, duration]);

  const current = words[index % Math.max(count, 1)] ?? "";

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      <span aria-hidden="true">
        {reduce ? (
          <span className="inline-block">{current}</span>
        ) : (
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={current}
              className="relative z-10 inline-block text-left"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{
                opacity: 0,
                y: -40,
                x: 40,
                filter: "blur(8px)",
                scale: 2,
                position: "absolute",
              }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {current.split(" ").map((word, wi) => (
                <motion.span
                  key={`${word}-${wi}`}
                  className="inline-block whitespace-nowrap"
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: wi * 0.3, duration: 0.3 }}
                >
                  {word.split("").map((letter, li) => (
                    <motion.span
                      key={`${word}-${wi}-${li}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: wi * 0.3 + li * 0.05, duration: 0.2 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <span className="inline-block">&nbsp;</span>
                </motion.span>
              ))}
            </motion.span>
          </AnimatePresence>
        )}
      </span>
    </span>
  );
}
