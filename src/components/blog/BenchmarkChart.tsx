type Row = {
  label: string;
  unit: string;
  max: number;
  gpt: number;
  gemini: number;
  format: (n: number) => string;
  note?: string;
};

const GPT_COLOR = "#67E8F9";
const GEMINI_COLOR = "#F2A93B";

const ROWS: Row[] = [
  {
    label: "Accuracy",
    unit: "%",
    max: 100,
    gpt: 80.39,
    gemini: 9.8,
    format: (n) => `${n.toFixed(2)}%`,
  },
  {
    label: "Macro F1",
    unit: "%",
    max: 100,
    gpt: 80.22,
    gemini: 17.24,
    format: (n) => `${n.toFixed(2)}%`,
  },
  {
    label: "Q&A correct",
    unit: "of 12",
    max: 12,
    gpt: 11,
    gemini: 7,
    format: (n) => `${n} / 12`,
  },
  {
    label: "Mean latency",
    unit: "s",
    max: 1,
    gpt: 0.865,
    gemini: 0.722,
    format: (n) => `${n.toFixed(3)} s`,
    note: "lower is better",
  },
];

const W = 640;
const LABEL_W = 150;
const BAR_X = LABEL_W;
const BAR_W = 380;
const BAR_H = 14;
const GROUP_H = 64;
const TOP = 8;
const H = TOP + ROWS.length * GROUP_H;

const ARIA = ROWS.map(
  (r) => `${r.label}: GPT-4o ${r.format(r.gpt)}, Gemini 2.5 Flash ${r.format(r.gemini)}`,
).join("; ");

export default function BenchmarkChart() {
  return (
    <figure className="my-10 rounded-[14px] border border-border bg-card p-5">
      <ul
        aria-label="Legend"
        className="mb-4 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-mono text-sm text-foreground"
      >
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-3 w-3 rounded-sm"
            style={{ background: GPT_COLOR }}
          />
          GPT-4o
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-3 w-3 rounded-sm"
            style={{ background: GEMINI_COLOR }}
          />
          Gemini 2.5 Flash
        </li>
      </ul>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Headline results. ${ARIA}. Latency: lower is better.`}
        style={{ fontVariantNumeric: "tabular-nums", display: "block" }}
      >
        {ROWS.map((row, i) => {
          const y = TOP + i * GROUP_H;
          const bars = [
            { name: "GPT-4o", value: row.gpt, color: GPT_COLOR, dy: 0 },
            { name: "Gemini 2.5 Flash", value: row.gemini, color: GEMINI_COLOR, dy: BAR_H + 6 },
          ];
          return (
            <g key={row.label}>
              <text x={0} y={y + 14} fill="#F4F4F5" fontSize={14} fontWeight={600}>
                {row.label}
              </text>
              <text x={0} y={y + 32} fill="#A1A1AA" fontSize={12}>
                {row.note ? `${row.unit} · ${row.note}` : row.unit === "%" ? "%" : row.unit}
              </text>
              <rect
                x={BAR_X}
                y={y + 2}
                width={BAR_W}
                height={BAR_H * 2 + 6}
                rx={4}
                fill="#18181B"
              />
              {bars.map((bar) => (
                <g key={bar.name}>
                  <rect
                    x={BAR_X}
                    y={y + 2 + bar.dy}
                    width={Math.max(2, (bar.value / row.max) * BAR_W)}
                    height={BAR_H}
                    rx={4}
                    fill={bar.color}
                  />
                  <text
                    x={BAR_X + BAR_W + 12}
                    y={y + 2 + bar.dy + BAR_H - 2}
                    fill="#F4F4F5"
                    fontSize={13}
                  >
                    {row.format(bar.value)}
                  </text>
                </g>
              ))}
            </g>
          );
        })}
      </svg>

      <p className="mt-2 font-mono text-xs text-muted-foreground">
        Percent rows are scaled to 100, Q&amp;A to 12, latency to 1 s.
      </p>

      <figcaption className="mt-3 text-sm leading-[1.6] text-muted-foreground">
        Figure 1. Headline results on the 51-sample sentiment benchmark and the 12-question Q&amp;A
        set.
      </figcaption>
    </figure>
  );
}
