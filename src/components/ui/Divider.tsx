export default function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-8">
      <span className="font-mono text-xs text-primary">//</span>
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
