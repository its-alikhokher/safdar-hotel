import type { Metadata } from "next";
import { ArrowRight, Flame, Leaf, Sparkles } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/data/seo";
import { pageStructuredData, specialitiesSchema } from "@/data/structuredData";

const description = "Discover Safdar Hotel's famous Chapli Kabab, BBQ platter, Kabuli Mutton Polaw, Chicken Karahi, Mutton Karahi and traditional Rosh in Takht Bhai.";

export const metadata: Metadata = createPageMetadata({
  title: "Specialities: Chapli Kabab, BBQ & Famous Curries",
  description,
  path: "/specialities",
  keywords: ["best Chapli Kabab Takht Bhai", "Chicken Karahi", "Mutton Karahi", "Kabuli Mutton Polaw", "Rosh"],
});

const dishes = [
  {
    number: "01",
    name: "Famous Chapli Kabab",
    label: "The signature",
    description: "A bold blend of seasoned mince, tomato, coriander and traditional spices, hand-shaped and fried until the edges are crisp and the middle stays juicy.",
    imageClass: "feature-dish__image--chapli",
    details: ["House spice blend", "Prepared fresh", "Best with naan & chutney"],
  },
  {
    number: "02",
    name: "Safdar BBQ Platter",
    label: "From the charcoal grill",
    description: "Chicken tikka, tender boti and seekh kabab brought together over charcoal for a platter of smoke, spice and generous sharing.",
    imageClass: "feature-dish__image--bbq",
    details: ["Charcoal grilled", "Made for sharing", "Served sizzling hot"],
  },
  {
    number: "03",
    name: "Kabuli Mutton Polaw",
    label: "A rice classic",
    description: "Long-grain rice layered with tender mutton, sweet carrots and raisins. Fragrant, balanced and made for a proper family table.",
    imageClass: "feature-dish__image--polaw",
    details: ["Tender mutton", "Fragrant rice", "Carrots & raisins"],
  },
];

export default function SpecialitiesPage() {
  return (
    <>
      <StructuredData
        id="specialities-page-entities"
        data={pageStructuredData({ type: "CollectionPage", path: "/specialities", label: "Specialities", name: "Safdar Hotel Specialities", description, extra: [specialitiesSchema] })}
      />
      <PageHero eyebrow="The flavours we are known for" title="Our Specialities">
        Signature dishes and famous curries prepared with the confidence of a kitchen serving since 1935.
      </PageHero>
      <section className="section signature-section">
        <div className="container">
          <Reveal className="section-heading section-heading--center"><p className="eyebrow">House signatures</p><h2>Start with the classics</h2></Reveal>
          <div className="feature-dishes">
            {dishes.map((dish, index) => (
              <Reveal as="article" className={`feature-dish ${index % 2 ? "feature-dish--reverse" : ""}`} variant={index % 2 ? "right" : "left"} key={dish.name}>
                <div className={`feature-dish__image ${dish.imageClass}`} role="img" aria-label={dish.name}><span>{dish.number}</span></div>
                <div className="feature-dish__copy">
                  <p className="eyebrow">{dish.label}</p>
                  <h2>{dish.name}</h2>
                  <p>{dish.description}</p>
                  <div className="dish-details">{dish.details.map((detail) => <span key={detail}><Sparkles size={16} /> {detail}</span>)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="curries-section">
        <div className="container">
          <Reveal className="section-heading section-heading--split section-heading--light">
            <div><p className="eyebrow eyebrow--light">Famous curries</p><h2>From karahi to Rosh</h2></div>
            <p>Slow cooking, fresh ingredients and the unmistakable aroma of a proper Pakistani kitchen.</p>
          </Reveal>
          <div className="curry-grid">
            <Reveal as="article"><Flame /><span>01</span><h3>Chicken Karahi</h3><p>Fresh tomato, green chilli, ginger and tender chicken cooked fast in the karahi.</p></Reveal>
            <Reveal as="article" delay={90}><Flame /><span>02</span><h3>Mutton Karahi</h3><p>A deeper, richer karahi with tender mutton and a clean Shinwari-style finish.</p></Reveal>
            <Reveal as="article" delay={180}><Leaf /><span>03</span><h3>Traditional Rosh</h3><p>Slow-cooked meat in a light, savoury broth that lets the quality speak for itself.</p></Reveal>
          </div>
          <Reveal className="curries-action"><Link className="button button--yellow" href="/menu">Explore the full menu <ArrowRight size={19} /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
