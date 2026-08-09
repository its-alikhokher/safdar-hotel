import { faqItems } from "@/data/faqs";
import { contact, menuCategories } from "@/data/site";
import { absoluteUrl, siteConfig } from "@/data/seo";

type JsonLd = Record<string, unknown>;

const restaurantId = `${absoluteUrl("/")}#restaurant`;
const websiteId = `${absoluteUrl("/")}#website`;

const address = {
  "@type": "PostalAddress",
  streetAddress: "Near Pirano CNG, Main Malakand Road",
  addressLocality: "Takht Bhai",
  addressRegion: "Khyber Pakhtunkhwa",
  addressCountry: "PK",
};

export const restaurantSchema: JsonLd = {
  "@type": "Restaurant",
  "@id": restaurantId,
  name: siteConfig.name,
  alternateName: "Safdar Hotel Famous Chapli Kabab",
  description: siteConfig.description,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/logo-mark.svg"),
  image: [absoluteUrl(siteConfig.image), absoluteUrl("/images/safdar-hotel-storefront.jpg")],
  telephone: contact.phoneHref,
  foundingDate: "1935",
  slogan: "Famous Chapli Kabab Since 1935",
  servesCuisine: ["Pashtun", "Pakistani", "Barbecue", "Desi", "Breakfast"],
  address,
  areaServed: {
    "@type": "City",
    name: "Takht Bhai",
  },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`,
  hasMenu: absoluteUrl("/menu"),
  openingHours: "Mo-Su 00:00-23:59",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
};

export const websiteSchema: JsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl("/"),
  name: siteConfig.name,
  alternateName: "Safdar Hotel Takht Bhai",
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  publisher: { "@id": restaurantId },
};

const homePageSchema: JsonLd = {
  "@type": "WebPage",
  "@id": `${absoluteUrl("/")}#webpage`,
  url: absoluteUrl("/"),
  name: siteConfig.title,
  description: siteConfig.description,
  inLanguage: siteConfig.language,
  isPartOf: { "@id": websiteId },
  about: { "@id": restaurantId },
  mainEntity: { "@id": restaurantId },
  hasPart: { "@id": `${absoluteUrl("/")}#frequently-asked-questions` },
};

export const faqSchema: JsonLd = {
  "@type": "FAQPage",
  "@id": `${absoluteUrl("/")}#frequently-asked-questions`,
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export const menuSchema: JsonLd = {
  "@type": "Menu",
  "@id": `${absoluteUrl("/menu")}#menu`,
  name: "Safdar Hotel Menu",
  description: "BBQ, Pakistani, Desi and breakfast dishes served at Safdar Hotel in Takht Bhai.",
  url: absoluteUrl("/menu"),
  inLanguage: siteConfig.language,
  provider: { "@id": restaurantId },
  hasMenuSection: menuCategories.map((category) => ({
    "@type": "MenuSection",
    name: category.label,
    description: category.intro,
    hasMenuItem: category.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.note,
    })),
  })),
};

const specialityNames = [
  "Famous Chapli Kabab",
  "Safdar BBQ Platter",
  "Kabuli Mutton Polaw",
  "Chicken Karahi",
  "Mutton Karahi",
  "Traditional Rosh",
];

export const specialitiesSchema: JsonLd = {
  "@type": "ItemList",
  "@id": `${absoluteUrl("/specialities")}#signature-dishes`,
  name: "Safdar Hotel Specialities and Famous Curries",
  numberOfItems: specialityNames.length,
  itemListElement: specialityNames.map((name, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
  })),
};

function breadcrumbSchema(path: string, label: string): JsonLd {
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(path)}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: absoluteUrl(path),
      },
    ],
  };
}

function webPageSchema(type: string, path: string, name: string, description: string, mainEntityId?: unknown): JsonLd {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name,
    description,
    inLanguage: siteConfig.language,
    isPartOf: { "@id": websiteId },
    about: { "@id": restaurantId },
    ...(typeof mainEntityId === "string" ? { mainEntity: { "@id": mainEntityId } } : {}),
    breadcrumb: { "@id": `${absoluteUrl(path)}#breadcrumb` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.image),
      width: 1200,
      height: 630,
    },
  };
}

export function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [restaurantSchema, websiteSchema, homePageSchema, faqSchema],
  };
}

export function pageStructuredData(options: {
  type?: "AboutPage" | "CollectionPage" | "ContactPage" | "WebPage";
  path: string;
  label: string;
  name: string;
  description: string;
  extra?: JsonLd[];
}) {
  const mainEntityId = options.extra?.[0]?.["@id"];

  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageSchema(options.type ?? "WebPage", options.path, options.name, options.description, mainEntityId),
      breadcrumbSchema(options.path, options.label),
      ...(options.extra ?? []),
    ],
  };
}
