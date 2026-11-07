"use client";

import { useEffect, useRef, useState } from "react";

type Props = { email: string; className?: string };

export default function CopyEmailButton({ email, className }: Props) {
  const [copied, setCopied] = useState(false);
  const fallbackRef = useRef<HTMLSpanElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  function flash() {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2000);
  }

  function selectFallback() {
    const node = fallbackRef.current;
    if (!node) return;
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }

  function handleClick() {
    if (!navigator.clipboard?.writeText) {
      selectFallback();
      return;
    }
    navigator.clipboard.writeText(email).then(flash, selectFallback);
  }

  const base =
    "inline-flex h-12 items-center justify-center rounded-full border border-border bg-secondary/60 px-5 font-mono text-sm text-foreground transition-colors hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className ? `${base} ${className}` : base}
      >
        {copied ? "Copied" : "Copy email"}
      </button>
      <span ref={fallbackRef} className="sr-only select-text">
        {email}
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </>
  );
}
