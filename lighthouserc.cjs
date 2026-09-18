module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:3001/",
        "http://127.0.0.1:3001/projects",
        "http://127.0.0.1:3001/contact",
      ],
      startServerCommand: "npm run start -- -p 3001 -H 127.0.0.1",
      startServerReadyPattern: "127.0.0.1:3001",
      numberOfRuns: 1,
      settings: {
        // GitHub Actions can background the headless renderer between
        // sequential URL audits. That can pause the site's entry animation
        // before first contentful paint and produce a spurious NO_FCP.
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
