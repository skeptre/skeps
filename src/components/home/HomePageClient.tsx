"use client";

import dynamic from "next/dynamic";

const HomePageBody = dynamic(() => import("./HomePageBody"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      <div
        className="mx-auto min-h-[min(85vh,56rem)] max-w-6xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10"
        aria-hidden
      />
    </main>
  ),
});

export default function HomePageClient() {
  return <HomePageBody />;
}
