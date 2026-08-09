import { expect, test, type BrowserContextOptions, type Page } from "playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const viewports = [
  { name: "small phone portrait", width: 320, height: 568 },
  { name: "Android portrait", width: 360, height: 800 },
  { name: "large phone portrait", width: 412, height: 915 },
  { name: "tablet portrait", width: 768, height: 1024 },
  { name: "touch landscape", width: 844, height: 390 },
];

const routes = ["/", "/menu", "/about", "/specialities", "/contact"];

function captureRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

for (const viewport of viewports) {
  test(`${viewport.name} remains usable across every route`, async ({ browser }, testInfo) => {
    const contextOptions: BrowserContextOptions = {
      viewport: { width: viewport.width, height: viewport.height },
      hasTouch: true,
      isMobile: viewport.width < 800,
      reducedMotion: "reduce",
    };
    const context = await browser.newContext(contextOptions);
    const page = await context.newPage();
    const errors = captureRuntimeErrors(page);

    for (const route of routes) {
      const response = await page.goto(route, { waitUntil: "domcontentloaded" });
      expect(response?.ok(), `${route} should return a successful response`).toBeTruthy();
      await expect(page.locator("main h1")).toBeVisible();

      const layout = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const overflowingElements = [...document.querySelectorAll<HTMLElement>("header *, main *, footer *")]
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return !element.closest("[aria-hidden='true']")
              && style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
              && (rect.left < -1 || rect.right > viewportWidth + 1);
          })
          .map((element) => `${element.tagName.toLowerCase()}.${element.className}`);

        const clippedControls = [...document.querySelectorAll<HTMLElement>("a.button, button, [role='tab']")]
          .filter((element) => {
            const style = getComputedStyle(element);
            return style.display !== "none" && style.visibility !== "hidden"
              && (element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1);
          })
          .map((element) => element.textContent?.trim());

        const undersizedTouchTargets = [...document.querySelectorAll<HTMLElement>(
          ".mobile-menu-button, .mobile-nav a, a.button, button[role='tab'], summary, .social-row a, .contact-social a, .footer-links a, .footer-contact a",
        )]
          .filter((element) => {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0
              && (rect.width < 44 || rect.height < 44);
          })
          .map((element) => element.getAttribute("aria-label") ?? element.textContent?.trim());

        return {
          documentOverflow: document.documentElement.scrollWidth > viewportWidth + 1,
          overflowingElements,
          clippedControls,
          undersizedTouchTargets,
        };
      });

      expect(layout.documentOverflow, `${route} should not create horizontal scrolling`).toBe(false);
      expect(layout.overflowingElements, `${route} should keep visible content inside the viewport`).toEqual([]);
      expect(layout.clippedControls, `${route} should keep control labels readable`).toEqual([]);
      if (viewport.width <= 800) {
        expect(layout.undersizedTouchTargets, `${route} should expose 44px primary touch targets`).toEqual([]);
      }
    }

    await page.goto("/");
    if (viewport.width <= 800) {
      const menuButton = page.getByRole("button", { name: "Open menu" });
      await expect(menuButton).toBeVisible();
      await menuButton.click();
      await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(menuButton).toBeFocused();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    }

    await page.goto("/menu");
    await page.getByRole("tab", { name: "Pakistani" }).click();
    await expect(page.getByRole("tabpanel").getByText("Chicken White Handi", { exact: true })).toBeVisible();

    await page.goto("/");
    const firstQuestion = page.locator(".faq-item details").first();
    await firstQuestion.locator("summary").click();
    await expect(firstQuestion.locator("p")).toBeVisible();

    await page.goto("/contact");
    await expect(page.getByRole("link", { name: "Get directions" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Call now" })).toBeVisible();
    expect(errors).toEqual([]);

    if (viewport.width === 320) {
      const screenshotDir = path.join(testInfo.config.rootDir, "..", "test-results", "screenshots");
      await mkdir(screenshotDir, { recursive: true });
      await page.screenshot({ path: path.join(screenshotDir, "contact-small-phone-320.png"), fullPage: true });
    }

    await context.close();
  });
}
