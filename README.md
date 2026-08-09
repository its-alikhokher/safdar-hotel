# Safdar Hotel

Official five-page restaurant website for Safdar Hotel, Takht Bhai. Built with Next.js App Router, TypeScript and responsive CSS.

Viewport motion is isolated in `components/motion/MotionProvider.tsx`, reusable reveal markup lives in `components/motion/Reveal.tsx`, and all animation/hover rules are kept in `app/motion.css`. The system supports touch layouts and respects `prefers-reduced-motion`.

Search, answer-engine and generative-engine discovery are implemented with the Next.js Metadata API, fully static page output, canonical and social metadata, Restaurant/Menu/FAQ/Breadcrumb JSON-LD, `robots.txt`, `sitemap.xml`, a web manifest and `llms.txt`. Hero media uses `next/image`; the shared food image is served as an optimized WebP asset.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm run test:static
npm run test
```

The 53-case Playwright suite runs the site in desktop Chromium and mobile/touch contexts. It covers all routes, navigation, interactive menu tabs, contact actions, image loading, console errors, horizontal overflow, control sizing, browser-extension hydration changes, viewport reveals, reduced-motion behavior, SEO discovery endpoints, structured data, footer credit integrity, lab Core Web Vitals thresholds and visual-review screenshots. Its responsive matrix exercises 320 x 568, 360 x 800, 412 x 915, 768 x 1024 and 844 x 390 layouts. The static suite adds 11 production-output assertions.

Copy the production domain into `SITE_URL` before deployment so canonical URLs, social sharing metadata, the sitemap and JSON-LD use the live origin:

```bash
SITE_URL=https://www.example.com
```

Official Facebook and Instagram links should only be added after the client supplies the exact profile URLs.
