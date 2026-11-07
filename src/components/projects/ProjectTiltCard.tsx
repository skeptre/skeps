"use client";

import Link from "next/link";

import { CardBody, CardContainer, CardItem } from "@/components/aceternity/3d-card";
import TechBadge from "@/components/ui/TechBadge";
import { cn } from "@/lib/utils";

export type ProjectTiltCardProps = {
  /** Small mono line above the title, e.g. "ML evaluation" or "in progress". */
  eyebrow: string;
  /** Colour of the eyebrow: accent for live/in-progress states, muted otherwise. */
  eyebrowTone?: "accent" | "muted";
  title: string;
  description: string;
  href: string;
  /** External links open in a new tab with rel noopener. */
  external?: boolean;
  /** Accessible name for the whole card. Omit to let the card's text be the name. */
  ariaLabel?: string;
  /** Footer call to action, e.g. "View case study →". Rendered as the last text in the card. */
  footer?: string;
  /** Optional stack badges, shown between the description and the footer. */
  stack?: readonly string[];
  /** Resting 3D tilt (the design shows the first card tilted before any hover). */
  resting?: boolean;
  /** Cyan glow shadow and a decorative glow panel under the text (the Relay card). */
  glow?: boolean;
  className?: string;
};

const RESTING_TRANSFORM = "rotateX(6deg) rotateY(-8deg)";

export default function ProjectTiltCard({
  eyebrow,
  eyebrowTone = "muted",
  title,
  description,
  href,
  external = false,
  ariaLabel,
  footer,
  stack,
  resting = false,
  glow = false,
  className,
}: ProjectTiltCardProps) {
  const surface = cn(
    "flex h-full w-full flex-col gap-3 rounded-[20px] border border-border bg-card p-7 text-foreground transition-[border-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "hover:border-primary/40",
    glow && "shadow-[0_40px_80px_-30px_rgba(103,232,249,0.35)]",
    className,
  );

  const content = (
    <>
      <CardItem
        as="span"
        translateZ={20}
        className={cn(
          "font-mono text-[13px]",
          eyebrowTone === "accent" ? "text-primary" : "text-muted-foreground",
        )}
      >
        {eyebrow}
      </CardItem>
      <CardItem
        as="span"
        translateZ={40}
        className="text-[1.375rem] font-semibold leading-tight tracking-[-0.03em] sm:text-[1.5rem]"
      >
        {title}
      </CardItem>
      <CardItem
        as="span"
        translateZ={30}
        className="w-full text-[15px] font-light leading-6 text-muted-foreground"
      >
        {description}
      </CardItem>

      {stack && stack.length > 0 ? (
        <CardItem as="span" translateZ={20} className="mt-1 flex w-full flex-wrap gap-2">
          {stack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </CardItem>
      ) : null}

      {glow ? (
        <CardItem
          as="span"
          translateZ={60}
          aria-hidden="true"
          className="mt-2 block h-[120px] w-full rounded-xl border border-border bg-[radial-gradient(circle_at_30%_40%,rgba(103,232,249,0.25),transparent_55%),#09090B]"
        />
      ) : null}

      {footer ? (
        <CardItem
          as="span"
          translateZ={20}
          className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-primary"
        >
          {footer}
        </CardItem>
      ) : null}
    </>
  );

  return (
    <CardContainer
      containerClassName="h-full items-stretch"
      className="h-full w-full items-stretch"
      restingTransform={resting ? RESTING_TRANSFORM : undefined}
    >
      <CardBody className="h-full w-full">
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            className={surface}
          >
            {content}
          </a>
        ) : (
          <Link href={href} aria-label={ariaLabel} className={surface}>
            {content}
          </Link>
        )}
      </CardBody>
    </CardContainer>
  );
}
