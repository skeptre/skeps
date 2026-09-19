import { defineCloudflareConfig } from "@opennextjs/cloudflare";

const cloudflareConfig = defineCloudflareConfig();

export default {
  ...cloudflareConfig,
  // Workers Builds is configured to call `npm run build`.
  // Keep the underlying Next.js build separate to avoid OpenNext recursively
  // invoking itself when it prepares the Worker artifact.
  buildCommand: "npm run build:next",
};
