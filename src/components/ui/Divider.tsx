export default function Divider({ label }: { label: string }) {
  return (
    <div className="divider" role="separator" aria-label={label}>
      <span className="font-mono text-xs text-primary" aria-hidden="true">{'//'}</span>
      <span className="font-mono text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" aria-hidden="true" />
    </div>
  );
}
