export default function AboutSection() {
    return (
        <section
            id="about"
            className="grid gap-8 border-t border-zinc-200 py-16 lg:grid-cols-[1fr_1.2fr]"
        >
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                    About
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                    What this site is for
                </h2>
            </div>

            <div className="space-y-5 text-base leading-7 text-zinc-600">
                <p>
                    This site acts as the main entry point for my work across software
                    engineering, low-code business systems, automation, AI experiments,
                    and selected personal platforms.
                </p>
                <p>
                    The goal is simple: one clear place where someone can quickly
                    understand what I build, how I think, and where to find the deeper
                    project documentation.
                </p>
            </div>
        </section>
    );
}