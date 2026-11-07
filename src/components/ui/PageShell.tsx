import type { ReactNode } from "react";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-24 sm:px-8">
        {children}
      </div>
    </main>
  );
}
