import { expect, test } from "playwright/test";

type LabVitals = {
  cls: number;
  lcp: number;
};

declare global {
  interface Window {
    __safdarLabVitals: LabVitals;
  }
}

test("home keeps lab LCP and CLS within Core Web Vitals thresholds", async ({ page }) => {
  await page.addInitScript(() => {
    const vitals = { cls: 0, lcp: 0 };
    Object.defineProperty(window, "__safdarLabVitals", { value: vitals });

    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
        if (!shift.hadRecentInput) vitals.cls += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const latest = entries.at(-1);
      if (latest) vitals.lcp = latest.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Safdar Hotel" })).toBeVisible();
  await page.waitForTimeout(500);

  const vitals = await page.evaluate(() => window.__safdarLabVitals);
  expect(vitals.lcp).toBeGreaterThan(0);
  expect(vitals.lcp).toBeLessThanOrEqual(2_500);
  expect(vitals.cls).toBeLessThanOrEqual(0.1);
});

test("menu category interaction paints within the INP good threshold", async ({ page }) => {
  await page.goto("/menu");

  const duration = await page.evaluate(async () => {
    const button = document.querySelector<HTMLButtonElement>("#tab-pakistani");
    if (!button) throw new Error("Pakistani menu tab was not found");

    const start = performance.now();
    button.click();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
    return performance.now() - start;
  });

  await expect(page.getByRole("tabpanel").getByRole("heading", { level: 2, name: "Pakistani" })).toBeVisible();
  expect(duration).toBeLessThanOrEqual(200);
});
