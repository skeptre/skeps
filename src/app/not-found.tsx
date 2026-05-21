import PageShell from "@/components/ui/PageShell";
import SectionLabel from "@/components/ui/SectionLabel";
import BackLink from "@/components/ui/BackLink";

export default function NotFound() {
  return (
    <PageShell>
      <BackLink />

      <section className="mt-12">
        <SectionLabel>404</SectionLabel>

        <h1 className="fade-in-up stagger-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Page not found.
        </h1>

        <p className="fade-in-up stagger-3 mt-6 max-w-sm text-base leading-relaxed text-muted-foreground">
          This route doesn&apos;t exist. Head back home.
        </p>
      </section>
    </PageShell>
  );
}
