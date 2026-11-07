import type { Metadata } from "next";
import Link from "next/link";

import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";
import { SITE } from "@/config/site";
import { NOW_UPDATED } from "@/data/now";
import { RELAY } from "@/data/relay";

export const metadata: Metadata = {
  title: "Now",
  description: `What ${SITE.name} is working on and learning at the moment. Updated by hand.`,
  alternates: { canonical: `${SITE.url}/now` },
};


type Item = {
  eyebrow: string;
  title: string;
  body: string;
  link?: { href: string; label: string; external?: boolean; ariaLabel?: string };
};

const ITEMS: Item[] = [
  {
    eyebrow: "Building",
    title: RELAY.title,
    body: "An open-source webhook relay. It accepts the event once, delivers it reliably, and shows exactly what happened.",
    link: {
      href: RELAY.github,
      label: "View on GitHub →",
      external: true,
      ariaLabel: RELAY.ariaLabel,
    },
  },
  {
    eyebrow: "Learning: transformers",
    title: "Vision transformers and nanoGPT",
    body: "Training small vision transformers and nanoGPT-style language models from scratch, to understand attention, training loops and evaluation. I started with no prior ML background in September 2026.",
  },
  {
    eyebrow: "Learning: data structures & algorithms",
    title: "DSA in Python, then in C",
    body: "Practising DSA problems in Python, then solving each one again in C to understand what happens under the hood: memory and pointers.",
  },
  {
    eyebrow: "Learning: cybersecurity",
    title: "Security fundamentals",
    body: "Studying security fundamentals and practising in a Kali Linux lab VM.",
  },
  {
    eyebrow: "Writing",
    title: "Engineering notes",
    body: "Writing engineering notes on this site.",
    link: { href: "/blog", label: "Read the notes →" },
  },
];

const linkClass =
  "mt-auto rounded font-mono text-sm text-primary hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function NowPage() {
  return (
    <PageShell>
      <BackLink />

      <PageHeader
        label="Now"
        title="What I'm working on and learning"
        description={
          <>
            Updated by hand. <time dateTime={NOW_UPDATED}>{`Last updated ${NOW_UPDATED}`}</time>
          </>
        }
        constrained
      />

      <ul className="mt-14 grid gap-5 md:grid-cols-2">
        {ITEMS.map((item) => (
          <li
            key={item.eyebrow}
            className="flex flex-col gap-3 rounded-[20px] border border-border bg-card p-7 transition-colors hover:border-primary/40"
          >
            <p className="font-mono text-[13px] text-primary">{item.eyebrow}</p>
            <h2 className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em] text-foreground">
              {item.title}
            </h2>
            <p className="text-[15px] font-light leading-6 text-muted-foreground">{item.body}</p>
            {item.link ? (
              item.link.external ? (
                <a
                  href={item.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.link.ariaLabel}
                  className={linkClass}
                >
                  {item.link.label}
                </a>
              ) : (
                <Link href={item.link.href} className={linkClass}>
                  {item.link.label}
                </Link>
              )
            ) : null}
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
