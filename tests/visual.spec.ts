import { expect, test } from "playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

for (const route of ["home", "menu", "contact"] as const) {
  test(`capture ${route} layout for visual review`, async ({ page }, testInfo) => {
    await page.goto(route === "home" ? "/" : `/${route}`, { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toBeVisible();

    const revealElements = page.locator("[data-reveal]");
    for (let index = 0; index < await revealElements.count(); index += 1) {
      const element = revealElements.nth(index);
      await element.evaluate((node) => node.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(element).toHaveClass(/is-revealed/);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(700);

    const screenshotDir = path.join(testInfo.config.rootDir, "..", "test-results", "screenshots");
    await mkdir(screenshotDir, { recursive: true });
    await page.screenshot({
      path: path.join(screenshotDir, `${route}-${testInfo.project.name}.png`),
      fullPage: true,
    });
  });
}
