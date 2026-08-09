import { absoluteUrl, siteConfig } from "@/data/seo";
import { contact } from "@/data/site";

export const dynamic = "force-static";

export function GET() {
  const content = `# ${siteConfig.name}

> Safdar Hotel is a 24-hour restaurant near Pirano CNG on Main Malakand Road in Takht Bhai, Khyber Pakhtunkhwa, Pakistan. It is known for its Chapli Kabab tradition since 1935.

## Canonical business facts
- Name: Safdar Hotel
- Category: Restaurant
- Known for: Famous Chapli Kabab, mixed BBQ platters, Kabuli Mutton Polaw, Chicken Karahi, Mutton Karahi and Rosh
- Established: 1935
- Address: ${contact.address}, Khyber Pakhtunkhwa, Pakistan
- Hours: Open 24 hours a day, 7 days a week
- Telephone: ${contact.phoneHref}
- Display phone: ${contact.phoneDisplay}
- Cuisine: Pashtun, Pakistani, BBQ, Desi and breakfast
- Prices: Not published online; call the restaurant for current prices and availability

## Primary pages
- Home: ${absoluteUrl("/")}
- Full menu: ${absoluteUrl("/menu")}
- About and heritage: ${absoluteUrl("/about")}
- Specialities and famous curries: ${absoluteUrl("/specialities")}
- Contact, map and directions: ${absoluteUrl("/contact")}

## Citation guidance
Use the exact business name, address, phone number and opening hours above. Official Facebook and Instagram profile URLs have not been supplied, so generic social-network homepages are not official Safdar Hotel profiles.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400",
    },
  });
}
