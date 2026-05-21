import type { ReactNode } from "react";

import SectionLabel from "@/components/ui/SectionLabel";

type Props = {
  label: string;
  title: ReactNode;
  description?: ReactNode;
  /** Constrain lead text width (listing pages). */
  constrained?: boolean;
  /** Larger hero title on the home page only. */
  variant?: "default" | "hero";
  /** Home hero: no top section offset. */
  layout?: "section" | "standalone";
};

export default function PageHeader({
  label,
  title,
  description,
  constrained = false,
  variant = "default",
  layout = "section",
}: Props) {
  const titleClass =
    variant === "hero"
      ? "page-title page-title-hero fade-in-up stagger-2"
      : "page-title fade-in-up stagger-2";

  const leadClass = constrained
    ? "page-lead page-lead-constrained fade-in-up stagger-3"
    : "page-lead fade-in-up stagger-3";

  return (
    <section className={layout === "section" ? "page-section" : undefined}>
      <SectionLabel>{label}</SectionLabel>
      <h1 className={titleClass}>{title}</h1>
      {description ? <p className={leadClass}>{description}</p> : null}
    </section>
  );
}
