export default function Divider({ label }: { label: string }) {
  return (
    <div className="divider">
      <span className="font-mono text-xs text-primary">{'//'}</span>
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}
