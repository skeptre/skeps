import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import { BLOG_POSTS } from "../src/data/posts";
import { PROJECTS } from "../src/data/projects";

const firstProject = PROJECTS[0];
const firstPost = BLOG_POSTS[0];

const PAGES = [
  "/",
  "/projects",
  `/projects/${firstProject.slug}`,
  "/blog",
  `/blog/${firstPost.slug}`,
  "/contact",
] as const;

test.describe("route smoke", () => {
  for (const path of PAGES) {
    test(`${path} renders main content`, async ({ page }) => {
      await page.goto(path);
      await expect(page.locator("#main")).toBeVisible();
      await expect(page.getByRole("banner")).toBeVisible();
    });
  }

  test("CV PDF is served", async ({ request }) => {
    const response = await request.get("/M_Ali_2.pdf");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"] ?? "").toMatch(/pdf/i);
  });

  test("home #links anchor navigation", async ({ page }) => {
    await page.goto("/#links");
    const links = page.locator("#links");
    await expect(links).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Social and contact links" }),
    ).toBeVisible();
  });

  test("projects index links to a project case study", async ({ page }) => {
    await page.goto("/projects");
    const caseStudy = page.getByRole("link", { name: "view case study →" }).first();
    await expect(caseStudy).toHaveAttribute(
      "href",
      `/projects/${firstProject.slug}`,
    );
  });

  test("blog index links to a technical note", async ({ page }) => {
    await page.goto("/blog");
    const note = page.getByRole("link", { name: "read note →" }).first();
    await expect(note).toHaveAttribute("href", `/blog/${firstPost.slug}`);
  });
});

test.describe("axe accessibility", () => {
  for (const path of PAGES) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
