import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/data/seo";

const lastModified = new Date("2026-08-09T00:00:00+05:00");
const foodImage = absoluteUrl("/images/safdar-food-spread.webp");
const storefrontImage = absoluteUrl("/images/safdar-hotel-storefront.jpg");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [foodImage, storefrontImage],
    },
    {
      url: absoluteUrl("/menu"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [foodImage],
    },
    {
      url: absoluteUrl("/specialities"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
      images: [foodImage],
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
      images: [storefrontImage],
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [foodImage],
    },
  ];
}
