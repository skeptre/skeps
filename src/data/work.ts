/**
 * Everything shown on /projects: case studies, client work, SkepsLabs
 * experiments and university projects. Case-study pages still come from
 * PROJECTS (src/data/projects.ts); entries here link to them by slug.
 */

export type WorkCategory = "ai-data" | "backend" | "web-mobile" | "client" | "lab" | "university";

export const WORK_FILTERS: { id: "all" | WorkCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai-data", label: "AI & Data" },
  { id: "backend", label: "Backend" },
  { id: "web-mobile", label: "Web & Mobile" },
  { id: "client", label: "Client work" },
  { id: "lab", label: "SkepsLabs" },
  { id: "university", label: "University" },
];

/** Cover art: a real image, or a drawn illustration that fits the project. */
export type WorkCover =
  | { kind: "image"; src: string; alt: string; position?: string }
  | { kind: "browser"; url: string; tone: "warm" | "stone" | "mono" }
  | { kind: "terminal"; lines: string[] }
  | { kind: "board" }
  | { kind: "lambda" }
  | { kind: "orbit"; glyph: string };

export type WorkLink = { label: "Case study" | "Live" | "Demo" | "Code"; href: string };

export type WorkItem = {
  id: string;
  title: string;
  blurb: string;
  categories: WorkCategory[];
  /** Short mono line on the card, e.g. "data engineering" or "live · client". */
  kicker: string;
  status?: "live" | "in progress" | "private";
  year: string;
  stack: string[];
  cover: WorkCover;
  /** Bento footprint on large screens. */
  size: "hero" | "wide" | "tall" | "normal";
  /** Accent colour for glow and kicker. */
  accent: string;
  /** Shown instead of links when there is nothing public to open. */
  note?: string;
  links: WorkLink[];
};

const CYAN = "#67e8f9";
const LIME = "#bef264";
const VIOLET = "#a78bfa";
const AMBER = "#fbbf24";
const ROSE = "#fb7185";

export const WORK: WorkItem[] = [
  {
    id: "retail-ops",
    title: "Retail & Operations Intelligence Platform",
    blurb:
      "A batch ELT pipeline that moves 50,000 transactions for 10 stores through bronze, silver and gold PostgreSQL schemas, with retries, a quarantine table and quality gates, served through FastAPI.",
    categories: ["ai-data", "backend"],
    kicker: "data engineering",
    year: "2026",
    stack: ["Python", "PostgreSQL", "Prefect", "FastAPI", "Docker Compose"],
    cover: {
      kind: "image",
      src: "/projects/retail-ops-platform/retail-ops-architecture.webp",
      alt: "Architecture diagram of the Retail Ops medallion pipeline",
    },
    size: "hero",
    accent: CYAN,
    links: [
      { label: "Case study", href: "/projects/retail-operations-intelligence-platform" },
      { label: "Code", href: "https://github.com/skeptre/retail-ops-platform" },
    ],
  },
  {
    id: "llm-benchmark",
    title: "LLM Benchmarking for Financial Sentiment",
    blurb:
      "My final-year project: a harness comparing GPT-4o and Gemini 2.5 Flash on financial sentiment with standardised prompts, response validation and McNemar significance testing.",
    categories: ["ai-data", "university"],
    kicker: "ml evaluation",
    year: "2026",
    stack: ["Python", "OpenAI API", "Gemini API", "Pandas", "Scikit-learn"],
    cover: {
      kind: "image",
      src: "/projects/llm-benchmarking-framework/llm-benchmark-overview.png",
      alt: "Charts comparing GPT-4o and Gemini results",
      position: "top",
    },
    size: "tall",
    accent: VIOLET,
    links: [{ label: "Case study", href: "/projects/llm-benchmarking-framework-for-financial-sentiment-analysis" }],
  },
  {
    id: "activity-tracker",
    title: "Activity Tracker",
    blurb:
      "Cross-platform step tracker redesigned in 2026: three animated activity rings, live workout timer, leaderboard podium and a one-tap demo that runs in the browser.",
    categories: ["web-mobile", "university"],
    kicker: "mobile · react native",
    status: "live",
    year: "2025 → 2026",
    stack: ["React Native", "Expo", "TypeScript", "MobX"],
    cover: {
      kind: "image",
      src: "/projects/activity-tracker/cover.jpg",
      alt: "Three screens of the Activity Tracker app: rings, workouts and leaderboard",
    },
    size: "wide",
    accent: LIME,
    links: [
      { label: "Demo", href: "https://activity-tracker.aliskepss.workers.dev" },
      { label: "Case study", href: "/projects/activity-tracker-mobile" },
      { label: "Code", href: "https://github.com/skeptre/activity-tracker-frontend/tree/redesign-2026" },
    ],
  },
  {
    id: "relay",
    title: "Relay",
    blurb:
      "Open-source webhook relay that takes delivery off the critical path: accept an event once, deliver it reliably, and show exactly what happened.",
    categories: ["backend"],
    kicker: "open source",
    status: "in progress",
    year: "2026",
    stack: ["C#", "ASP.NET Core", "PostgreSQL", "React"],
    cover: {
      kind: "terminal",
      lines: ["# phase 0: foundations", "POST /hooks/stripe  → 202 stored", "deliver  try 1  ✗ 503", "deliver  try 2  ✓ 200"],
    },
    size: "tall",
    accent: CYAN,
    links: [{ label: "Code", href: "https://github.com/skeptre/relay" }],
  },
  {
    id: "solance",
    title: "SOLANCE",
    blurb:
      "B2B site for a Paris construction and interior-finishing firm, built around one goal: architects and contractors submitting tenders with their files.",
    categories: ["client", "web-mobile"],
    kicker: "client · construction",
    status: "live",
    year: "2026",
    stack: ["Astro", "TypeScript", "Cloudflare Workers"],
    cover: { kind: "browser", url: "solanceparis.fr", tone: "stone" },
    size: "normal",
    accent: AMBER,
    links: [{ label: "Live", href: "https://solanceparis.fr" }],
  },
  {
    id: "sana",
    title: "Sana Wajid Photography",
    blurb:
      "Portfolio for a Manchester wedding photographer: cinematic layout, validated contact form with Resend, structured data and local SEO.",
    categories: ["client", "web-mobile"],
    kicker: "client · photography",
    status: "live",
    year: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Resend"],
    cover: { kind: "browser", url: "sanawjd.com", tone: "warm" },
    size: "normal",
    accent: ROSE,
    links: [
      { label: "Live", href: "https://sanawjd.com" },
      { label: "Case study", href: "/projects/sana-wajid-photography" },
    ],
  },
  {
    id: "virezio",
    title: "Virezio",
    blurb:
      "The two-person agency I run: the agency site, free lead-capture tools (website check, invoice and quote generators) and an internal quote builder behind Cloudflare Access.",
    categories: ["client", "web-mobile"],
    kicker: "agency · since 2026",
    status: "live",
    year: "2026",
    stack: ["TypeScript", "Cloudflare Workers", "Cloudflare Access"],
    cover: { kind: "browser", url: "virezio.com", tone: "mono" },
    size: "wide",
    accent: "#e4e4e7",
    links: [{ label: "Live", href: "https://virezio.com" }],
  },
  {
    id: "calisthenics",
    title: "Calisthenics Guide",
    blurb:
      "Installable beginner's guide with a rotatable 3D body, a full skill tree and onboarding that builds your path from the equipment you have.",
    categories: ["lab", "web-mobile"],
    kicker: "skepslabs · pwa",
    status: "live",
    year: "2026",
    stack: ["3D web", "PWA", "Cloudflare Workers"],
    cover: { kind: "orbit", glyph: "◎" },
    size: "tall",
    accent: LIME,
    links: [{ label: "Live", href: "https://skepslabs.com/calisthenics" }],
  },
  {
    id: "ticket-api",
    title: "Support Ticket API",
    blurb:
      "Ten-endpoint FastAPI service with JWT login, owner-only ticket access, Alembic migrations and 18 pytest tests on an isolated database.",
    categories: ["backend"],
    kicker: "backend · api",
    year: "2026",
    stack: ["Python", "FastAPI", "SQLAlchemy", "pytest"],
    cover: {
      kind: "terminal",
      lines: ["POST /auth/login  → 200  jwt", "GET  /tickets     → 200  [3]", "GET  /tickets/9   → 403  not owner", "pytest  18 passed"],
    },
    size: "normal",
    accent: CYAN,
    links: [
      { label: "Case study", href: "/projects/support-ticket-management-api" },
      { label: "Code", href: "https://github.com/skeptre/ticket-api" },
    ],
  },
  {
    id: "menagerie",
    title: "Menagerie",
    blurb: "A 3D animal museum you walk through in the browser: a playful experiment in real-time 3D on the web.",
    categories: ["lab"],
    kicker: "skepslabs · 3d",
    status: "live",
    year: "2026",
    stack: ["3D web", "Cloudflare Workers"],
    cover: { kind: "orbit", glyph: "✦" },
    size: "normal",
    accent: AMBER,
    links: [{ label: "Live", href: "https://skepslabs.com/menagerie" }],
  },
  {
    id: "connect4",
    title: "Connect 4 Plus",
    blurb:
      "One game, three paradigms: the same Connect 4 variant written in C++ (object-oriented), Haskell (functional) and Prolog (logic), comparing how each models the board and checks for a win.",
    categories: ["university"],
    kicker: "programming languages",
    year: "2026",
    stack: ["C++", "Haskell", "Prolog"],
    cover: { kind: "board" },
    size: "wide",
    accent: ROSE,
    links: [],
  },
  {
    id: "activity-api",
    title: "Activity Tracker API",
    blurb: "The team's Express and SQLite backend for workouts, weight and goals, with Joi validation and Swagger docs.",
    categories: ["backend", "university"],
    kicker: "team project · api",
    year: "2025",
    stack: ["Node.js", "Express.js", "SQLite3", "Swagger/OpenAPI"],
    cover: {
      kind: "terminal",
      lines: ["GET  /api/activity/workouts", "→ 200  [{ id: 4, type: 'run' }]", "GET  /docs  → Swagger UI"],
    },
    size: "normal",
    accent: LIME,
    links: [
      { label: "Case study", href: "/projects/activity-tracker-api" },
      { label: "Code", href: "https://github.com/skeptre/activity-tracker-backend" },
    ],
  },
  {
    id: "password-lambda",
    title: "Password-strength Checker",
    blurb: "A serverless Java function that scores password strength, plus a supporting web app deployed to a cloud VM on Tomcat and SQL.",
    categories: ["university", "backend"],
    kicker: "cloud computing",
    year: "2026",
    stack: ["Java", "Serverless", "Tomcat", "SQL"],
    cover: { kind: "lambda" },
    size: "normal",
    accent: VIOLET,
    links: [],
  },
  {
    id: "library",
    title: "Skeps Library",
    blurb: "A 3D shelf of the books, sources and notes behind my journey, browsed like a real library.",
    categories: ["lab"],
    kicker: "skepslabs · 3d",
    status: "private",
    year: "2026",
    stack: ["3D web"],
    cover: { kind: "orbit", glyph: "❦" },
    size: "wide",
    accent: VIOLET,
    links: [],
    note: "Password-protected for now",
  },
];
