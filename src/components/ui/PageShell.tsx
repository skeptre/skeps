import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-8 py-20">{children}</div>
    </main>
  );
}
