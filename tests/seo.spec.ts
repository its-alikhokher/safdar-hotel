import { expect, test } from "playwright/test";

const siteUrl = (process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const routes = ["/", "/menu", "/about", "/specialities", "/contact"];

test("all pages expose canonical search and social metadata", async ({ page }) => {
  for (const path of routes) {
    await page.goto(path);
    const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /^.{80,170}$/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /Safdar Hotel/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", `${siteUrl}/images/safdar-hotel-og.jpg`);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator("h1")).toHaveCount(1);

    if (path !== "/") {
      await expect(page.getByRole("navigation", { name: "Breadcrumb" }).getByRole("link", { name: "Home" })).toBeVisible();
    }
  }
});

test("structured data exposes accurate restaurant and page entities", async ({ page }) => {
  await page.goto("/");
  const homeData = JSON.parse(await page.locator("#safdar-hotel-entities").textContent() ?? "{}");
  const homeTypes = homeData["@graph"].map((item: { "@type": string }) => item["@type"]);
  expect(homeTypes).toEqual(["Restaurant", "WebSite", "WebPage", "FAQPage"]);
  const restaurant = homeData["@graph"].find((item: { "@type": string }) => item["@type"] === "Restaurant");
  expect(restaurant.telephone).toBe("+923459345098");
  expect(restaurant.address.addressLocality).toBe("Takht Bhai");
  expect(restaurant.openingHours).toBe("Mo-Su 00:00-23:59");

  await page.goto("/menu");
  const menuData = JSON.parse(await page.locator("#menu-page-entities").textContent() ?? "{}");
  const menuTypes = menuData["@graph"].map((item: { "@type": string }) => item["@type"]);
  expect(menuTypes).toEqual(["CollectionPage", "BreadcrumbList", "Menu"]);
  const menu = menuData["@graph"].find((item: { "@type": string }) => item["@type"] === "Menu");
  expect(menu.hasMenuSection).toHaveLength(4);
});

test("answer-focused FAQ and the complete menu remain crawlable", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Before you visit Safdar Hotel" })).toBeVisible();
  const questions = page.locator(".faq-item details");
  await expect(questions).toHaveCount(5);
  await questions.first().locator("summary").click();
  await expect(questions.first().locator("p")).toContainText("Main Malakand Road");

  await page.goto("/menu");
  await expect(page.getByRole("tabpanel", { includeHidden: true })).toHaveCount(4);
  await expect(page.getByText("Chicken White Handi", { exact: true })).toBeAttached();
  await expect(page.getByText("Rosh", { exact: true })).toBeAttached();
  await expect(page.getByText("Kashmiri Tea", { exact: true })).toBeAttached();
  await expect(page.getByText("Roghani Naan", { exact: true })).toBeAttached();
});

test("robots, sitemap, manifest and llms discovery endpoints are valid", async ({ request }) => {
  const [robotsResponse, sitemapResponse, manifestResponse, llmsResponse] = await Promise.all([
    request.get("/robots.txt"),
    request.get("/sitemap.xml"),
    request.get("/manifest.webmanifest"),
    request.get("/llms.txt"),
  ]);

  for (const response of [robotsResponse, sitemapResponse, manifestResponse, llmsResponse]) expect(response.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(`${siteUrl}/sitemap.xml`);
  expect((await sitemapResponse.text()).match(/<loc>/g)).toHaveLength(5);
  expect((await manifestResponse.json()).icons).toHaveLength(2);
  expect(await llmsResponse.text()).toContain("## Canonical business facts");
});

test("optimized hero media is preloaded and raw payloads stay small", async ({ page, request }) => {
  await page.goto("/");
  await expect(page.locator('link[rel="preload"][as="image"]')).toBeAttached();
  const hero = page.locator(".home-hero__image");
  await expect(hero).toHaveAttribute("src", /safdar-food-spread\.webp/);

  const webp = await request.get("/images/safdar-food-spread.webp");
  const socialImage = await request.get("/images/safdar-hotel-og.jpg");
  expect((await webp.body()).byteLength).toBeLessThanOrEqual(350_000);
  expect((await socialImage.body()).byteLength).toBeLessThanOrEqual(250_000);
});
