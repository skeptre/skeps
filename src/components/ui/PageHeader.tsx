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
      ? "text-[clamp(3rem,7.4vw,7rem)] leading-[0.98]"
      : "text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02]";

  return (
    <section className={layout === "section" ? "page-section" : undefined}>
      <SectionLabel>{label}</SectionLabel>
      <h1
        className={`font-sans font-semibold tracking-[-0.05em] text-foreground ${titleClass}`}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={`mt-6 text-[19px] font-light leading-relaxed text-muted-foreground${
            constrained ? " max-w-[36rem]" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </section>
  );
}
