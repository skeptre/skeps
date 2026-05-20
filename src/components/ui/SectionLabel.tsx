export default function SectionLabel({ children }: { children: string }) {
  return (
    <p className="fade-in-up stagger-1 mb-6 inline-flex items-center gap-1 font-mono text-xs text-primary">
      <span className="text-muted-foreground">{'/*'}</span>
      {children}
      <span className="text-muted-foreground">{'*/'}</span>
    </p>
  );
}
