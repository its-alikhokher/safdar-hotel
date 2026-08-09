import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Safdar Hotel - Famous Chapli Kabab",
    short_name: "Safdar Hotel",
    description: "Safdar Hotel in Takht Bhai, open 24/7 and serving famous Chapli Kabab since 1935.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#f4c430",
    orientation: "portrait-primary",
    lang: "en-PK",
    dir: "ltr",
    categories: ["food", "restaurant", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcuts: [
      { name: "Explore menu", short_name: "Menu", url: "/menu" },
      { name: "Contact and directions", short_name: "Contact", url: "/contact" },
    ],
  };
}
