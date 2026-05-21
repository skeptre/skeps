import type { IconType } from "react-icons";

import { TECH_ICON_MAP } from "@/lib/tech-icons";

export default function TechBadge({ name }: { name: string }) {
  const Icon = TECH_ICON_MAP[name] as IconType | undefined;
  return (
    <span className={`inline-flex items-center rounded-sm border border-border bg-secondary px-2.5 py-1 font-mono text-xs text-muted-foreground${Icon ? " gap-1.5" : ""}`}>
      {Icon && <Icon size={12} aria-hidden />}
      {name}
    </span>
  );
}
