
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import BackLink from "@/components/ui/BackLink";
import PageHeader from "@/components/ui/PageHeader";
import PageShell from "@/components/ui/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <BackLink />

      <PageHeader
        label="404"
        title="Page not found."
        description="This route doesn't exist. Head back home."
        constrained
      />

      <div className="mt-10">
        <MovingBorderButton href="/" borderRadius="14px">
          Back home
        </MovingBorderButton>
      </div>
    </PageShell>
  );
}
