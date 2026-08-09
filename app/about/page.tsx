import type { Metadata } from "next";
import { HeartHandshake, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/data/seo";
import { pageStructuredData } from "@/data/structuredData";

const description = "Discover Safdar Hotel's Takht Bhai heritage, Chapli Kabab tradition, founder's message and commitment to authentic food and hygiene since 1935.";

export const metadata: Metadata = createPageMetadata({
  title: "About Our Heritage Since 1935",
  description,
  path: "/about",
  keywords: ["Safdar Hotel history", "restaurant since 1935", "Pashtun hospitality", "Takht Bhai heritage"],
});

export default function AboutPage() {
  return (
    <>
      <StructuredData
        id="about-page-entities"
        data={pageStructuredData({ type: "AboutPage", path: "/about", label: "About", name: "About Safdar Hotel", description })}
      />
      <PageHero eyebrow="A Takht Bhai tradition" title="Our Story">
        More than a restaurant, Safdar Hotel is a table shared across generations.
      </PageHero>
      <section className="section about-intro">
        <div className="container about-grid">
          <Reveal className="about-image" variant="left">
            <Image src="/images/safdar-hotel-storefront.jpg" alt="The Safdar Hotel building and signboard" fill sizes="(max-width: 800px) 100vw, 48vw" />
            <div className="since-plaque"><span>Since</span><strong>1935</strong><small>Takht Bhai</small></div>
          </Reveal>
          <Reveal className="about-copy" variant="right" delay={100}>
            <p className="eyebrow">Our heritage</p>
            <h2>Built on flavour. Remembered for hospitality.</h2>
            <p>Safdar Hotel’s story began in 1935 with local recipes, careful cooking and a belief that every guest should leave satisfied. That simple approach turned a roadside hotel into a familiar name for travellers, families and the people of Takht Bhai.</p>
            <p>Today, our famous Chapli Kabab remains at the centre of the table, joined by charcoal BBQ, Kabuli Polaw, traditional karahis, Rosh and the everyday desi dishes our guests know by heart.</p>
            <div className="about-stat-row">
              <div><strong>91</strong><span>Years in business</span></div>
              <div><strong>24/7</strong><span>Open every day</span></div>
              <div><strong>4</strong><span>Menu collections</span></div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="founder-section">
        <Reveal className="container founder-grid" variant="scale">
          <div className="founder-mark">“</div>
          <blockquote>
            <p>Our name is carried by every plate we serve. We prepare food the way we would for our own family: with care, honest ingredients and respect for the traditions handed down to us.</p>
            <footer><strong>Founder’s message</strong><span>The Safdar Hotel family</span></footer>
          </blockquote>
        </Reveal>
      </section>
      <section className="section values-section">
        <div className="container">
          <Reveal className="section-heading section-heading--center"><p className="eyebrow">What guides us</p><h2>Values you can taste</h2></Reveal>
          <div className="values-grid">
            <Reveal as="article"><Sparkles /><h3>Authentic flavour</h3><p>We stay close to the spices, methods and generous servings that define our region.</p></Reveal>
            <Reveal as="article" delay={70}><ShieldCheck /><h3>Clean & careful</h3><p>Hygiene and freshness are treated as part of the recipe, from kitchen to table.</p></Reveal>
            <Reveal as="article" delay={140}><UtensilsCrossed /><h3>Cooked to order</h3><p>Our grill, karahi and breads are prepared fresh for the experience they deserve.</p></Reveal>
            <Reveal as="article" delay={210}><HeartHandshake /><h3>Pashtun hospitality</h3><p>Every guest is welcomed with respect, warmth and a table worth returning to.</p></Reveal>
          </div>
          <Reveal className="center-action"><Link className="button button--red" href="/specialities">See our signature dishes</Link></Reveal>
        </div>
      </section>
    </>
  );
}
