import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

import { PROJECTS } from "../src/data/projects";

const PAGES = ["/", "/projects", "/contact"] as const;

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

  test("projects TOC scrolls to a project section", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto("/projects");

    const target = PROJECTS[1] ?? PROJECTS[0];
    const jump = page.getByRole("button", {
      name: `Go to ${target.title}`,
    });
    await expect(jump).toBeVisible();

    await jump.click();
    await expect(page.locator(`#${target.slug}`)).toBeInViewport();
  });
});

test.describe("axe accessibility", () => {
  for (const path of PAGES) {
    test(`${path} has no axe violations`, async ({ page }) => {
      // The UI deliberately fades content in. Axe can otherwise sample a
      // partially transparent animation frame and report false contrast
      // failures. The site already supports prefers-reduced-motion, so audit
      // that stable rendered state.
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
