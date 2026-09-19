const auditPath = process.env.LIGHTHOUSE_PATH ?? "/";
const auditUrl = new URL(auditPath, "http://127.0.0.1:3001").toString();

module.exports = {
  ci: {
    collect: {
      url: [auditUrl],
      startServerCommand: "npm run start -- -p 3001 -H 127.0.0.1",
      startServerReadyPattern: "127.0.0.1:3001",
      numberOfRuns: 1,
      settings: {
        // Keep headless rendering active and deterministic on GitHub-hosted
        // runners. Each route is also isolated into its own CI job.
        chromeFlags:
          "--no-sandbox --disable-dev-shm-usage --disable-backgrounding-occluded-windows --disable-renderer-backgrounding --disable-background-timer-throttling",
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
};
