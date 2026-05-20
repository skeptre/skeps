import Link from "next/link";

import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";

export default function NotFound() {
  return (
    <PageShell>
      <SectionLabel>404</SectionLabel>

      <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
        Page not found.
      </h1>

      <p className="fade-in-up stagger-3 mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
        This route doesn&apos;t exist. Head back home.
      </p>

      <div className="fade-in-up stagger-4 mt-8">
        <Link
          href="/"
          className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          ← /home
        </Link>
      </div>
    </PageShell>
  );
}
