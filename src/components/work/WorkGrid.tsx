"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { WORK, WORK_FILTERS, type WorkCategory, type WorkItem } from "@/data/work";
import { cn } from "@/lib/utils";

import WorkCard from "./WorkCard";

type FilterId = "all" | WorkCategory;

const SPAN: Record<WorkItem["size"], string> = {
  hero: "md:col-span-2 lg:col-span-2 lg:row-span-2",
  wide: "md:col-span-2 lg:col-span-2",
  tall: "lg:row-span-2",
  normal: "",
};

const isFilter = (v: string | null): v is FilterId => !!v && WORK_FILTERS.some((f) => f.id === v);

/**
 * Filterable bento grid. The active filter lives in ?filter= so a recruiter
 * can be sent straight to, say, /projects?filter=ai-data.
 */
export function WorkGridWithParams() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = params.get("filter");
  const filter: FilterId = isFilter(q) ? q : "all";

  const choose = useCallback(
    (id: FilterId) => {
      router.replace(id === "all" ? pathname : `${pathname}?filter=${id}`, { scroll: false });
    },
    [router, pathname],
  );

  return <WorkGrid filter={filter} onChoose={choose} />;
}

/** Server-render fallback before search params are known: everything, no filter. */
export function WorkGridStatic() {
  return <WorkGrid filter="all" onChoose={() => {}} />;
}

function WorkGrid({ filter, onChoose: choose }: { filter: FilterId; onChoose: (id: FilterId) => void }) {
  const reduce = useReducedMotion();

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: WORK.length };
    for (const item of WORK) for (const cat of item.categories) c[cat] = (c[cat] ?? 0) + 1;
    return c;
  }, []);

  const items = useMemo(
    () => (filter === "all" ? WORK : WORK.filter((w) => w.categories.includes(filter))),
    [filter],
  );

  // In a filtered view every card is the same size, so the grid stays tidy.
  const sizeFor = (item: WorkItem): WorkItem["size"] => (filter === "all" ? item.size : "normal");

  return (
    <section aria-labelledby="work-heading" className="mt-12">
      <h2 id="work-heading" className="sr-only">
        All projects
      </h2>

      <div className="sticky top-16 z-30 -mx-6 mb-8 border-b border-border/60 bg-background/80 px-6 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <LayoutGroup id="work-filters">
          <div role="toolbar" aria-label="Filter projects" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            {WORK_FILTERS.map((f) => {
              const active = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(f.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    active ? "text-black" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {active ? (
                    <motion.span
                      layoutId="work-filter-pill"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-full bg-primary"
                    />
                  ) : (
                    <span className="absolute inset-0 rounded-full border border-border" />
                  )}
                  <span className="relative">
                    {f.label}
                    <span className={cn("ml-2 font-mono text-[12px]", active ? "text-black/70" : "text-muted-foreground")}>
                      {counts[f.id] ?? 0}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <p aria-live="polite" className="sr-only">
        Showing {items.length} {items.length === 1 ? "project" : "projects"}
      </p>

      <motion.ul layout={!reduce} className="grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((item, i) => {
            const size = sizeFor(item);
            return (
              <motion.li
                key={item.id}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                transition={{ duration: reduce ? 0 : 0.35, ease: [0.23, 1, 0.32, 1], delay: reduce ? 0 : Math.min(i, 6) * 0.03 }}
                className={cn("list-none", SPAN[size])}
              >
                <WorkCard item={{ ...item, size }} index={i} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
