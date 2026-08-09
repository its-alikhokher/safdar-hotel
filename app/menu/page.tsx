import type { Metadata } from "next";
import { ArrowRight, Clock3, Users } from "lucide-react";
import Link from "next/link";
import { MenuTabs } from "@/components/MenuTabs";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/data/seo";
import { menuSchema, pageStructuredData } from "@/data/structuredData";

const description = "Explore Safdar Hotel's complete BBQ, Pakistani, Desi and breakfast menu, including Chapli Kabab, platters, karahi, Rosh, naan and chai.";

export const metadata: Metadata = createPageMetadata({
  title: "Menu: BBQ, Karahi, Chapli Kabab & Breakfast",
  description,
  path: "/menu",
  keywords: ["Safdar Hotel menu", "Chapli Kabab menu", "BBQ platter Takht Bhai", "Karahi Takht Bhai", "desi breakfast"],
});

const deals = [
  { name: "Chapli Kabab Meal", serves: "A satisfying solo meal", items: "Chapli Kabab · Fresh naan · Raita · Salad" },
  { name: "BBQ Gathering", serves: "Ideal for sharing", items: "Mixed platter · Roghani naan · Raita · Salad" },
  { name: "Safdar Family Table", serves: "A complete family spread", items: "Karahi · Kabuli Polaw · Chapli Kabab · Naan" },
];

export default function MenuPage() {
  return (
    <>
      <StructuredData
        id="menu-page-entities"
        data={pageStructuredData({ type: "CollectionPage", path: "/menu", label: "Menu", name: "Safdar Hotel Menu", description, extra: [menuSchema] })}
      />
      <PageHero eyebrow="Freshly prepared · Open 24/7" title="Our Menu">
        From the grill to the karahi, explore the flavours that have kept Takht Bhai coming back since 1935.
      </PageHero>
      <section className="section menu-section">
        <div className="container">
          <Reveal className="section-heading section-heading--center">
            <p className="eyebrow">Find your favourite</p>
            <h2>Explore by category</h2>
            <p>Choose a category below to see what’s cooking.</p>
          </Reveal>
          <Reveal variant="scale"><MenuTabs /></Reveal>
        </div>
      </section>
      <section className="section deals-section">
        <div className="container">
          <Reveal className="section-heading section-heading--split">
            <div><p className="eyebrow">House combinations</p><h2>Made for every appetite</h2></div>
            <p>Pair our most-loved dishes for a quick meal, a shared platter or a complete family table.</p>
          </Reveal>
          <div className="deals-grid">
            {deals.map((deal, index) => (
              <Reveal as="article" className="deal-card" delay={index * 90} key={deal.name}>
                <span className="deal-card__number">0{index + 1}</span>
                <Users size={24} />
                <p>{deal.serves}</p>
                <h3>{deal.name}</h3>
                <div className="deal-card__items">{deal.items}</div>
                <Link href="/contact">Ask about this deal <ArrowRight size={17} /></Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="availability-strip"><Clock3 /><p><strong>Everything, any time.</strong> Breakfast, BBQ and curries are served 24 hours a day.</p></Reveal>
        </div>
      </section>
    </>
  );
}
