import Link from "next/link";
import { FiArrowUpRight, FiLock } from "react-icons/fi";

import TechBadge from "@/components/ui/TechBadge";
import type { WorkItem } from "@/data/work";
import { cn } from "@/lib/utils";

import WorkCover from "./WorkCover";

const COVER_HEIGHT: Record<WorkItem["size"], string> = {
  hero: "h-[240px] sm:h-[320px] lg:h-[380px]",
  wide: "h-[220px] sm:h-[260px]",
  tall: "h-[220px] lg:h-auto lg:min-h-[300px] lg:flex-1",
  normal: "h-[190px]",
};

const isExternal = (href: string) => href.startsWith("http");

function SmartLink({
  href,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return isExternal(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} aria-label={ariaLabel}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export default function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const primary = item.links[0];
  const hero = item.size === "hero";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-border bg-card",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1",
        "hover:border-(--accent)/40 hover:shadow-[0_30px_70px_-35px_var(--accent)]",
      )}
      style={{ "--accent": item.accent } as React.CSSProperties}
    >
      <div className={cn("relative w-full overflow-hidden border-b border-border", COVER_HEIGHT[item.size])}>
        <WorkCover cover={item.cover} accent={item.accent} priority={index < 2} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent"
        />
        {item.status ? <StatusPill status={item.status} /> : null}
      </div>

      <div className={cn("flex flex-1 flex-col gap-3 p-6", hero && "sm:p-8")}>
        <div className="flex items-center justify-between gap-3 font-mono text-[12px]">
          <span style={{ color: item.accent }}>{item.kicker}</span>
          <span className="text-muted-foreground">{item.year}</span>
        </div>

        <h2
          className={cn(
            "font-semibold leading-tight tracking-[-0.03em] text-foreground",
            hero ? "text-[1.75rem] sm:text-[2.1rem]" : "text-[1.3rem]",
          )}
        >
          {primary ? (
            <SmartLink href={primary.href} className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline">
              {item.title}
            </SmartLink>
          ) : (
            item.title
          )}
        </h2>

        <p
          className={cn(
            "text-[15px] font-light leading-6 text-muted-foreground",
            !hero && "line-clamp-4",
            hero && "sm:text-[16px] sm:leading-7",
          )}
        >
          {item.blurb}
        </p>

        <div className="mt-1 flex flex-wrap gap-2">
          {item.stack.slice(0, hero ? 6 : 4).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 pt-4">
          {item.links.length === 0 ? (
            <span className="inline-flex items-center gap-1.5 font-mono text-[12px] text-muted-foreground">
              <FiLock size={12} aria-hidden /> {item.note ?? "Code available on request"}
            </span>
          ) : (
            item.links.map((link, i) => (
              <SmartLink
                key={link.label}
                href={link.href}
                ariaLabel={`${link.label}: ${item.title}${isExternal(link.href) ? " (opens in a new tab)" : ""}`}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  i === 0
                    ? "bg-(--accent) text-black hover:brightness-110"
                    : "border border-border text-soft hover:border-(--accent)/60 hover:text-foreground",
                )}
              >
                {link.label}
                {isExternal(link.href) ? <FiArrowUpRight size={13} aria-hidden /> : null}
              </SmartLink>
            ))
          )}
        </div>
      </div>
    </article>
  );
}

function StatusPill({ status }: { status: NonNullable<WorkItem["status"]> }) {
  const tone =
    status === "live"
      ? { dot: "bg-lime-300", text: "text-lime-200" }
      : status === "in progress"
        ? { dot: "bg-amber-300", text: "text-amber-200" }
        : { dot: "bg-zinc-400", text: "text-zinc-300" };
  return (
    <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[11px] backdrop-blur-md">
      <span className="relative flex size-2">
        {status === "live" ? (
          <span className={cn("absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping", tone.dot)} />
        ) : null}
        <span className={cn("relative inline-flex size-2 rounded-full", tone.dot)} />
      </span>
      <span className={tone.text}>{status}</span>
    </span>
  );
}
