export type Project = {
  title: string;
  description: string;
  role: string;
  stack: string[];
  github?: string;
  demo?: string;
  impact?: string;
};

// Add your projects here — each entry becomes a card on /projects.
// Example shape (uncomment and fill in):
//
// {
//   title: "Project name",
//   description: "One sentence on the problem this solves.",
//   role: "What you built / your responsibility.",
//   stack: ["Python", "FastAPI", "PostgreSQL"],
//   github: "https://github.com/skeptre/repo",
//   demo: "https://...",
//   impact: "reduced latency 40%",
// },

export const PROJECTS: Project[] = [];
