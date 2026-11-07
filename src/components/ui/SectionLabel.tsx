export default function SectionLabel({
  children,
}: {
  children: string;
  /** Kept for source compatibility; labels render visible at rest. */
  animate?: boolean;
}) {
  return (
    <p className="mb-5 font-mono text-[15px] text-primary">{children}</p>
  );
}
