import Link from "next/link";

export default function HeroSection() {
    return (
        <>
            <header className="flex items-center justify-between border-b border-zinc-200 pb-5">
                <Link
                    href="/"
                    className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-900"
                >
                    aliskeps
                </Link>

                <nav
                    className="hidden gap-6 text-sm text-zinc-600 md:flex"
                    aria-label="Primary navigation"
                >
                    <a href="#projects" className="transition hover:text-zinc-900">
                        Projects
                    </a>
                    <a href="#about" className="transition hover:text-zinc-900">
                        About
                    </a>
                    <a href="#links" className="transition hover:text-zinc-900">
                        Links
                    </a>
                </nav>
            </header>

            <section className="grid gap-10 py-20 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
                <div className="space-y-6">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                        Projects • Experiments • Systems
                    </p>

                    <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
                        Minimal home base for everything I’m building.
                    </h1>

                    <p className="max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
                        Aliskeps is the central hub for my software engineering projects,
                        Power Platform builds, Python systems, Java work, experiments, and
                        selected lifestyle links.
                    </p>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                            href="/projects"
                            className="rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Explore projects
                        </Link>

                        <a
                            href="#links"
                            className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-900 transition hover:border-zinc-900"
                        >
                            View links
                        </a>
                    </div>
                </div>

                <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
                    <p className="text-sm font-medium text-zinc-500">Current focus</p>

                    <div className="mt-5 space-y-4">
                        <div>
                            <p className="text-sm text-zinc-500">Now building</p>
                            <p className="mt-1 text-lg font-medium text-zinc-900">
                                Power Platform portfolio systems
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">Direction</p>
                            <p className="mt-1 text-lg font-medium text-zinc-900">
                                Automation, backend engineering, enterprise tools
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-zinc-500">Base</p>
                            <p className="mt-1 text-lg font-medium text-zinc-900">
                                One home for code, ideas, and proof of work
                            </p>
                        </div>
                    </div>
                </aside>
            </section>
        </>
    );
}