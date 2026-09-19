export default function SectionLabel({
  children,
  animate = true,
}: {
  children: string;
  animate?: boolean;
}) {
  const className = animate
    ? "fade-in-up stagger-1 mb-6 inline-flex items-center gap-1 font-mono text-xs text-primary"
    : "mb-5 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-primary";

  return (
    <p className={className}>
      <span className="text-muted-foreground">{'/*'}</span>
      {children}
      <span className="text-muted-foreground">{'*/'}</span>
    </p>
  );
}
