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
            </div>
            <div className="space-y-5 text-base leading-7 text-zinc-600">
                <p>
                    This site is in progress.
                </p>
            </div>
        </section>
    );
}