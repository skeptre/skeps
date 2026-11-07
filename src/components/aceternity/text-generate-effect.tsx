import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Word = { text: string; className?: string };

type TextGenerateEffectProps = {
  words: Word[];
  className?: string;
  filter?: boolean;
  duration?: number;
};

// CSS-driven reveal: the animation starts on first paint, no hydration needed.
export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.45,
}: TextGenerateEffectProps) {
  return (
    <span className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word.text}-${i}`}>
          <span
            className={cn(
              "inline-block",
              filter ? "animate-word-in" : "animate-word-in-plain",
              word.className,
            )}
            style={{ animationDelay: `${i * 80}ms`, animationDuration: `${duration}s` }}
          >
            {word.text}
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
