"use client";

import { useEffect, useRef, useState } from "react";

import { PROJECTS } from "@/data/projects";
import { slugify } from "@/lib/slugify";

export default function ProjectsTOC() {
  const [active, setActive] = useState(() => slugify(PROJECTS[0]?.title ?? ""));
  const [expanded, setExpanded] = useState(false);
  const intersecting = useRef<Set<string>>(new Set());

  useEffect(() => {
    const ids = PROJECTS.map((p) => slugify(p.title));

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
  }, []);

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
      {PROJECTS.map((project) => {
        const id = slugify(project.title);
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => jump(id)}
            className="group flex items-center gap-3"
            aria-label={`Go to ${project.title}`}
          >
            {/* Label — clipped to zero width when collapsed */}
            <div
              className={`overflow-hidden whitespace-nowrap transition-all duration-200 ease-in-out ${
                expanded ? "max-w-[220px]" : "max-w-0"
              }`}
            >
              <span
                className={`block pr-1 font-mono text-xs transition-colors ${
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
              className={`block h-[2px] rounded-full transition-all duration-200 ${
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
