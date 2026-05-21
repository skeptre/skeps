/** @type {import('lighthouse').Flags} */
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
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
  },
};
