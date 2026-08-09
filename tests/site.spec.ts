import { expect, test, type Page } from "playwright/test";

const routes = [
  { path: "/", heading: "Safdar Hotel" },
  { path: "/menu", heading: "Our Menu" },
  { path: "/about", heading: "Our Story" },
  { path: "/specialities", heading: "Our Specialities" },
  { path: "/contact", heading: "Visit Safdar Hotel" },
];

function captureRuntimeErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  return errors;
}

for (const route of routes) {
  test(`${route.path} renders complete content without overflow`, async ({ page }) => {
    const errors = captureRuntimeErrors(page);
    const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { level: 1, name: route.heading })).toBeVisible();
    await expect(page).toHaveTitle(/Safdar Hotel/);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(hasHorizontalOverflow).toBe(false);

    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    expect(errors).toEqual([]);
  });
}

test("browser-extension body attributes do not trigger hydration errors", async ({ page }) => {
  const errors = captureRuntimeErrors(page);

  await page.route("**/", async (route) => {
    if (route.request().resourceType() !== "document") {
      await route.fallback();
      return;
    }

    const response = await route.fetch();
    const html = await response.text();
    expect(html).toContain("<body>");
    await route.fulfill({
      response,
      body: html.replace(
        "<body>",
        '<body data-new-gr-c-s-check-loaded="14.1318.0" data-gr-ext-installed="">',
      ),
    });
  });

  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 1, name: "Safdar Hotel" })).toBeVisible();
  await expect(page.locator("body")).toHaveAttribute("data-gr-ext-installed", "");
  await page.waitForTimeout(250);
  expect(errors.filter((error) => /hydrat(?:e|ed|ion)/i.test(error))).toEqual([]);
});

test("reveal motion activates as content enters the viewport", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveClass(/motion-enabled/);
  await expect(page.locator(".home-hero__content")).toHaveClass(/is-revealed/);

  const specialtyCard = page.locator(".specialty-card").first();
  await specialtyCard.scrollIntoViewIfNeeded();
  await expect(specialtyCard).toHaveClass(/is-revealed/);
  await expect(specialtyCard).toHaveAttribute("data-reveal", "up");
});

test("reduced-motion preference reveals content without waiting for animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const revealElements = page.locator("[data-reveal]");
  await expect(revealElements.first()).toHaveClass(/is-revealed/);
  expect(await revealElements.count()).toBeGreaterThan(5);
  expect(await revealElements.evaluateAll((elements) => elements.every((element) => element.classList.contains("is-revealed")))).toBe(true);
});

test("primary home calls to action navigate correctly", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /Explore menu/i }).click();
  await expect(page).toHaveURL(/\/menu$/);
  await expect(page.getByRole("heading", { level: 1, name: "Our Menu" })).toBeVisible();

  await page.goto("/");
  await page.getByRole("link", { name: /Find us/i }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test("header navigation works at the active viewport", async ({ page }, testInfo) => {
  await page.goto("/");
  const isMobile = testInfo.project.name.includes("mobile");

  if (isMobile) {
    const menuButton = page.locator(".mobile-menu-button");
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute("aria-label", "Open menu");
    await menuButton.click();
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await expect(menuButton).toHaveAttribute("aria-label", "Close menu");
    await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: "About" }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" }).click();
  }

  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { level: 1, name: "Our Story" })).toBeVisible();
});

test("menu tabs expose the correct dishes", async ({ page }) => {
  await page.goto("/menu");

  const expectations = [
    { tab: "BBQ", heading: "BBQ", item: "Full Platter" },
    { tab: "Pakistani", heading: "Pakistani", item: "Chicken White Handi" },
    { tab: "Desi", heading: "Desi", item: "Rosh" },
    { tab: /Breakfast/, heading: "Breakfast & Chai", item: "Coffee" },
  ];

  for (const item of expectations) {
    const tab = page.getByRole("tab", { name: item.tab });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true");
    const panel = page.getByRole("tabpanel");
    await expect(panel.getByRole("heading", { level: 2, name: item.heading })).toBeVisible();
    await expect(panel.getByRole("heading", { level: 3, name: item.item })).toBeVisible();
  }
});

test("contact actions and map use the supplied business details", async ({ page }) => {
  await page.goto("/contact");
  await expect(page.locator('a[href="tel:+923459345098"]').first()).toBeVisible();
  await expect(page.locator('a[href="https://wa.me/923459345098"]').first()).toBeAttached();
  await expect(page.locator("iframe[title='Safdar Hotel location on Google Maps']")).toHaveAttribute("src", /google\.com\/maps/);
  await expect(page.locator(".contact-details strong").filter({ hasText: "Near Pirano CNG, Main Malakand Road, Takht Bhai" })).toBeVisible();
});

test("footer developer credit links to Quantum Tech securely", async ({ page }) => {
  await page.goto("/");
  const credit = page.locator(".footer-credit");
  const link = credit.getByRole("link", { name: "Quantum Tech" });

  await expect(credit).toContainText("Developed with");
  await expect(credit.locator("svg")).toHaveCount(1);
  await expect(link).toHaveAttribute("href", "https://www.linkedin.com/in/ali-raza-643520217/");
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noopener/);
  await expect(link).toHaveAttribute("rel", /noreferrer/);
});

test("critical controls fit their labels", async ({ page }) => {
  await page.goto("/");
  const overflowedControls = await page.locator("a.button, button").evaluateAll((controls) =>
    controls
      .filter((control) => {
        const style = getComputedStyle(control);
        const hasText = Boolean(control.textContent?.trim());
        return hasText && style.visibility !== "hidden" && style.display !== "none" && control.scrollWidth > control.clientWidth + 1;
      })
      .map((control) => control.textContent?.trim()),
  );
  expect(overflowedControls).toEqual([]);

  const undersizedIconControls = await page.locator("header button, main button, footer button").evaluateAll((controls) =>
    controls
      .filter((control) => !control.textContent?.trim() && getComputedStyle(control).display !== "none")
      .filter((control) => control.getBoundingClientRect().width < 40 || control.getBoundingClientRect().height < 40)
      .map((control) => control.getAttribute("aria-label")),
  );
  expect(undersizedIconControls).toEqual([]);
});
