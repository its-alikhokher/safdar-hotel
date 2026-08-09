import type { Metadata } from "next";

const configuredSiteUrl = process.env.SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteUrl = configuredSiteUrl.replace(/\/$/, "");

export const siteConfig = {
  name: "Safdar Hotel",
  title: "Safdar Hotel Takht Bhai | Famous Chapli Kabab Since 1935",
  description: "Safdar Hotel in Takht Bhai serves famous Chapli Kabab, BBQ, Kabuli Polaw, Pakistani curries and desi breakfast 24 hours a day, 7 days a week.",
  locale: "en_PK",
  language: "en-PK",
  region: "PK-KP",
  placeName: "Takht Bhai",
  image: "/images/safdar-hotel-og.jpg",
  imageAlt: "Safdar Hotel Chapli Kabab, BBQ, curry and Kabuli Polaw",
};

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords: string[];
};

const baseKeywords = [
  "Safdar Hotel",
  "Safdar Hotel Takht Bhai",
  "Famous Chapli Kabab",
  "Takht Bhai restaurant",
  "Main Malakand Road food",
  "24 hour restaurant Takht Bhai",
];

const socialImage = {
  url: absoluteUrl(siteConfig.image),
  width: 1200,
  height: 630,
  alt: siteConfig.imageAlt,
};

export function createPageMetadata({ title, description, path, keywords }: PageMetadataOptions): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    alternates: {
      canonical: path,
      languages: {
        "en-PK": path,
        "x-default": path,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage.url],
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteConfig.name,
    title: {
      default: siteConfig.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: baseKeywords,
    authors: [{ name: siteConfig.name, url: "/about" }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: "Restaurant",
    referrer: "origin-when-cross-origin",
    alternates: {
      canonical: "/",
      languages: {
        "en-PK": "/",
        "x-default": "/",
      },
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: siteConfig.title,
      description: siteConfig.description,
      url: "/",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.title,
      description: siteConfig.description,
      images: [socialImage.url],
    },
    icons: {
      icon: [{ url: "/logo-mark.svg", type: "image/svg+xml" }],
      shortcut: "/logo-mark.svg",
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    appleWebApp: {
      capable: true,
      title: siteConfig.name,
      statusBarStyle: "black-translucent",
    },
    other: {
      "geo.region": siteConfig.region,
      "geo.placename": siteConfig.placeName,
    },
  };
}
