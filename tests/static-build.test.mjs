import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import path from "node:path";

const root = process.cwd();
const routes = [
  { file: "index.html", path: "", title: "Safdar Hotel Takht Bhai | Famous Chapli Kabab Since 1935", heading: "Safdar Hotel" },
  { file: "menu.html", path: "/menu", title: "Menu: BBQ, Karahi, Chapli Kabab &amp; Breakfast | Safdar Hotel", heading: "Our Menu" },
  { file: "about.html", path: "/about", title: "About Our Heritage Since 1935 | Safdar Hotel", heading: "Our Story" },
  { file: "specialities.html", path: "/specialities", title: "Specialities: Chapli Kabab, BBQ &amp; Famous Curries | Safdar Hotel", heading: "Our Specialities" },
  { file: "contact.html", path: "/contact", title: "Contact, 24/7 Opening Hours &amp; Location | Safdar Hotel", heading: "Visit Safdar Hotel" },
];

for (const route of routes) {
  test(`${route.file} contains the required page shell and content`, () => {
    const outputPath = path.join(root, ".next", "server", "app", route.file);
    assert.equal(existsSync(outputPath), true, `${outputPath} was not generated`);
    const html = readFileSync(outputPath, "utf8");

    assert.match(html, new RegExp(`<title>${route.title}</title>`));
    assert.match(html, new RegExp(`<h1[^>]*>${route.heading}</h1>`));
    assert.match(html, /<meta name="description" content="[^"]{80,170}"\/>/);
    assert.match(html, new RegExp(`<link rel="canonical" href="http://localhost:3000${route.path}"\\/>`));
    assert.match(html, /<meta name="robots" content="index, follow"\/>/);
    assert.match(html, /<meta property="og:title" content="[^"]+"\/>/);
    assert.match(html, /<meta property="og:image" content="http:\/\/localhost:3000\/images\/safdar-hotel-og\.jpg"\/>/);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"\/>/);
    assert.match(html, /aria-label="Primary navigation"/);
    assert.match(html, /<footer class="site-footer">/);
    assert.match(html, /0345 9345098/);
    assert.match(html, /Open 24\/7/);
    assert.match(html, /Near Pirano CNG/);
  });
}

test("home output includes valid restaurant structured data", () => {
  const html = readFileSync(path.join(root, ".next", "server", "app", "index.html"), "utf8");
  const jsonLd = extractJsonLd(html);
  const graph = jsonLd.flatMap((item) => item["@graph"] ?? []);
  const restaurant = graph.find((item) => item["@type"] === "Restaurant");

  assert.ok(restaurant, "Restaurant schema is missing");
  assert.equal(restaurant.name, "Safdar Hotel");
  assert.equal(restaurant.telephone, "+923459345098");
  assert.equal(restaurant.openingHours, "Mo-Su 00:00-23:59");
  assert.equal(restaurant.address.addressLocality, "Takht Bhai");
  assert.deepEqual(graph.map((item) => item["@type"]), ["Restaurant", "WebSite", "WebPage", "FAQPage"]);
});

test("inner pages include page-specific structured data and breadcrumbs", () => {
  const expectedTypes = {
    "menu.html": ["CollectionPage", "BreadcrumbList", "Menu"],
    "about.html": ["AboutPage", "BreadcrumbList"],
    "specialities.html": ["CollectionPage", "BreadcrumbList", "ItemList"],
    "contact.html": ["ContactPage", "BreadcrumbList"],
  };

  for (const [file, types] of Object.entries(expectedTypes)) {
    const html = readFileSync(path.join(root, ".next", "server", "app", file), "utf8");
    const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? []);
    assert.deepEqual(graph.map((item) => item["@type"]), types, `${file} schema types do not match`);
  }
});

test("all menu categories and dishes are present in server-rendered HTML", () => {
  const html = readFileSync(path.join(root, ".next", "server", "app", "menu.html"), "utf8");
  const graph = extractJsonLd(html).flatMap((item) => item["@graph"] ?? []);
  const menu = graph.find((item) => item["@type"] === "Menu");

  assert.ok(menu, "Menu schema is missing");
  assert.equal(menu.hasMenuSection.length, 4);
  assert.equal(menu.hasMenuSection.flatMap((section) => section.hasMenuItem).length, 40);
  for (const category of menu.hasMenuSection) {
    assert.ok(html.includes(category.name.replace("&", "&amp;")), `${category.name} is missing from menu HTML`);
    for (const item of category.hasMenuItem) assert.ok(html.includes(item.name), `${item.name} is missing from menu HTML`);
  }
});

test("search discovery and answer-engine files are generated", () => {
  const appOutput = path.join(root, ".next", "server", "app");
  const robots = readFileSync(path.join(appOutput, "robots.txt.body"), "utf8");
  const sitemap = readFileSync(path.join(appOutput, "sitemap.xml.body"), "utf8");
  const manifest = JSON.parse(readFileSync(path.join(appOutput, "manifest.webmanifest.body"), "utf8"));
  const llms = readFileSync(path.join(appOutput, "llms.txt.body"), "utf8");

  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: http:\/\/localhost:3000\/sitemap\.xml/);
  assert.equal((sitemap.match(/<loc>http:\/\/localhost:3000/g) ?? []).length, 5);
  assert.match(sitemap, /safdar-food-spread\.webp/);
  assert.equal(manifest.name, "Safdar Hotel - Famous Chapli Kabab");
  assert.equal(manifest.icons.length, 2);
  assert.match(llms, /## Canonical business facts/);
  assert.match(llms, /Telephone: \+923459345098/);
});

test("optimized public media stays within performance budgets", () => {
  const budgets = [
    ["public/images/safdar-food-spread.webp", 350_000],
    ["public/images/safdar-hotel-og.jpg", 250_000],
    ["public/images/safdar-hotel-storefront.jpg", 180_000],
    ["public/icon-512.png", 60_000],
  ];

  for (const [asset, budget] of budgets) {
    const size = readFileSync(path.join(root, asset)).byteLength;
    assert.ok(size <= budget, `${asset} is ${size} bytes, over the ${budget}-byte budget`);
  }
});

test("all required local visual assets exist", () => {
  for (const asset of [
    "public/logo-mark.svg",
    "public/images/safdar-food-spread.webp",
    "public/images/safdar-hotel-og.jpg",
    "public/images/safdar-hotel-storefront.jpg",
    "public/apple-touch-icon.png",
    "public/icon-192.png",
    "public/icon-512.png",
  ]) {
    assert.equal(existsSync(path.join(root, asset)), true, `${asset} is missing`);
  }
});

function extractJsonLd(html) {
  return [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
}
