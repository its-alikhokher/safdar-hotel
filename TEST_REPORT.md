# Safdar Hotel Test Report

Date: 2026-08-09

## Review 1: Source, content, SEO and responsive structure

Status: Passed

- Checked every internal route, CTA, phone link, WhatsApp link, image reference and map embed.
- Confirmed the four requested menu categories and all 40 supplied menu items are represented.
- Reviewed desktop, tablet and mobile CSS breakpoints for horizontal overflow and fixed-size control risks.
- Confirmed one primary page heading, shared navigation and shared footer on every route.
- Confirmed unique page titles, descriptions, canonical URLs, social metadata and page-level search directives.
- Validated Restaurant, WebSite, WebPage, Menu, FAQ, Breadcrumb, About, Contact and ItemList structured-data graphs without fabricated ratings, prices or social identities.
- Confirmed `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and `llms.txt` expose consistent business facts for search and answer systems.
- Known content dependency: official Facebook and Instagram profile URLs were not supplied by the client.

## Review 2: Compile and production output

Status: Passed

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- `npm run test:static`

The production build statically generated all five pages plus `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and `llms.txt`. The 11-case static-output suite validates titles, descriptions, canonical and social metadata, headings, shared shell, business details, structured-data graphs, all 40 menu items, discovery files and local media budgets.

- The main food asset was reduced from about 2.8 MB to 286 KB WebP while retaining the original source file for reference.
- Hero and page-hero media use `next/image` with stable dimensions, responsive sizes and preload only for above-the-fold imagery.
- The complete menu remains in the server-rendered HTML even when a category tab is inactive.

## Review 3: Runtime and browser verification

Status: Passed

- Local Next.js server confirmed running at `http://127.0.0.1:3000`.
- Playwright ran 53 repeatable cases across desktop Chromium, a 390 x 844 mobile viewport and five dedicated touch layouts.
- Coverage includes all routes, runtime/console errors, image loading, horizontal overflow, CTA navigation, mobile navigation, menu tabs, contact actions, map source, control-label fit, extension-injected body attributes, viewport reveals, reduced-motion behavior, metadata, JSON-LD, discovery endpoints, media budgets, lab Core Web Vitals and six full-page screenshots.
- First pass: 21 passed and 5 failed. Review showed the failures were caused by lazy-image timing and assertions tracking changing labels or development tooling.
- Second pass: 24 passed and 2 failed. Both remaining failures targeted Next.js's development-only toolbar, not Safdar Hotel controls.
- Assertions were corrected to target site-owned controls only, lazy images are scrolled into view before validation, and the Next.js dev indicator is disabled for a clean local preview.
- The Grammarly-style hydration mismatch was reproduced by injecting its two body attributes before React hydration. The targeted desktop/mobile regression passed after scoping `suppressHydrationWarning` to the root body.
- Motion verification caught and corrected a development Strict Mode observer lifecycle bug before completion.
- Targeted SEO suite: 10/10 passed across desktop and mobile.
- Targeted lab performance suite: 4/4 passed across desktop and mobile. LCP stayed at or below 2.5 seconds, CLS at or below 0.1, and the menu interaction painted within the 200 ms good threshold.
- Responsive matrix: 5/5 passed at 320 x 568, 360 x 800, 412 x 915, 768 x 1024 and 844 x 390. Each scenario checks all five routes, visible element bounds, control clipping, 44px primary touch targets, mobile navigation with Escape, menu tabs, FAQ interaction and contact actions.
- Latest verification: all 29 desktop cases and all 24 mobile cases passed. The projects were run separately after the shared development server was externally terminated during the combined run. All 11 production HTML/static assertions also passed.
- The footer credit regression verifies the heart icon, exact Quantum Tech LinkedIn URL, new-tab target and secure link relationship on desktop and mobile.
- All desktop, 390px mobile and 320px small-phone screenshots were manually inspected. They show no hidden sections, horizontal overflow, overlapping content, clipped labels or broken responsive sections.
- The mobile footer was compacted with a two-column quick-link grid, shorter spacing, semantic navigation/address markup and 44px contact targets.
- Google map tiles are external and may remain blank in a network-restricted test environment; the map embed source, address label and directions action passed automated verification.
- Chromium's missing runtime libraries were downloaded and extracted locally under `/tmp`; no operating-system packages were modified.

Lab checks protect the current implementation from obvious regressions. Production field Core Web Vitals still need to be monitored after deployment through real-user data or Google Search Console.

Repeat the complete browser suite with:

```bash
npm run test
```
