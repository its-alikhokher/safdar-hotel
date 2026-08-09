import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { createRootMetadata } from "@/data/seo";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: "#f4c430",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-PK" data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <MotionProvider />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
