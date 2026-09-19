import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] px-6 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
        {children}
      </div>
    </main>
  );
}
