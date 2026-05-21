"use client";

import { useEffect, useRef, useState } from "react";

type TocProject = { slug: string; title: string };

export default function ProjectsTOC({ projects }: { projects: TocProject[] }) {
  const [active, setActive] = useState(() => projects[0]?.slug ?? "");
  const [expanded, setExpanded] = useState(false);
  const intersecting = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ids = projects.map((p) => p.slug);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) intersecting.current.add(target.id);
          else intersecting.current.delete(target.id);
        });
        const hit = ids.find((id) => intersecting.current.has(id));
        if (hit) setActive(hit);
      },
      { rootMargin: "-80px 0px 0px 0px", threshold: 0 }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [projects]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: el.getBoundingClientRect().top + window.scrollY - 96,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex"
      aria-label="Jump to project"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {projects.map((project) => {
        const id = project.slug;
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => jump(id)}
            className="group flex items-center gap-3 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label={`Go to ${project.title}`}
          >
            {/* Label — clipped to zero width when collapsed */}
            <div
              className={`overflow-hidden whitespace-nowrap ui-transition ${
                expanded ? "max-w-[200px]" : "max-w-0"
              }`}
            >
              <span
                className={`block truncate pr-1 font-mono text-xs transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {project.title}
              </span>
            </div>

            {/* Indicator line */}
            <span
              className={`block h-[2px] rounded-full ui-transition ${
                isActive
                  ? "w-6 bg-primary"
                  : "w-4 bg-border group-hover:w-5 group-hover:bg-muted-foreground"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
