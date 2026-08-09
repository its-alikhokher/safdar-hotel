import { ArrowRight, Clock3, MapPin, Phone, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaqSection } from "@/components/FaqSection";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { contact } from "@/data/site";
import { homeStructuredData } from "@/data/structuredData";

const specialties = [
  {
    title: "Famous Chapli Kabab",
    copy: "Hand-shaped, richly spiced and seared for crisp edges with a juicy centre.",
    imageClass: "dish-image--chapli",
  },
  {
    title: "Mixed BBQ Platter",
    copy: "A generous charcoal-grilled selection made for sharing around the table.",
    imageClass: "dish-image--bbq",
  },
  {
    title: "Kabuli Mutton Polaw",
    copy: "Fragrant rice layered with tender mutton, carrots and sweet raisins.",
    imageClass: "dish-image--polaw",
  },
];

export default function Home() {
  return (
    <>
      <StructuredData id="safdar-hotel-entities" data={homeStructuredData()} />
      <section className="home-hero">
        <Image
          src="/images/safdar-food-spread.webp"
          alt="Chapli Kabab, Kabuli Polaw, chicken karahi and BBQ at Safdar Hotel"
          fill
          preload
          sizes="100vw"
          className="home-hero__image"
        />
        <div className="home-hero__shade" />
        <Reveal className="container home-hero__content" variant="left">
          <p className="hero-kicker"><span /> Takht Bhai’s taste of tradition</p>
          <h1>Safdar Hotel</h1>
          <p className="hero-tagline">Famous Chapli Kabab <strong>Since 1935</strong></p>
          <p className="hero-copy">From our signature kabab to charcoal BBQ and rich curries, every plate carries a tradition served fresh around the clock.</p>
          <div className="hero-actions">
            <Link className="button button--yellow" href="/menu">Explore menu <ArrowRight size={19} /></Link>
            <Link className="button button--outline-light" href="/contact"><MapPin size={19} /> Find us</Link>
          </div>
        </Reveal>
        <div className="hero-scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <Reveal as="section" className="quick-info" aria-label="Restaurant information">
        <div className="container quick-info__grid">
          <div><Clock3 /><p><strong>Open 24/7</strong><span>Every day, all year</span></p></div>
          <div><MapPin /><p><strong>Main Malakand Road</strong><span>Near Pirano CNG, Takht Bhai</span></p></div>
          <a href={`tel:${contact.phoneHref}`}><Phone /><p><strong>{contact.phoneDisplay}</strong><span>Call for information</span></p></a>
        </div>
      </Reveal>

      <section className="section specialties-preview">
        <div className="container">
          <Reveal className="section-heading section-heading--split">
            <div>
              <p className="eyebrow">From the Safdar kitchen</p>
              <h2>The dishes people come back for</h2>
            </div>
            <p>Time-honoured recipes, honest ingredients and flavour that has made Safdar Hotel a Takht Bhai landmark.</p>
          </Reveal>
          <div className="specialty-grid">
            {specialties.map((item, index) => (
              <Reveal as="article" className="specialty-card" delay={index * 90} key={item.title}>
                <div className={`dish-image ${item.imageClass}`} role="img" aria-label={item.title} />
                <div className="specialty-card__body">
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="center-action"><Link className="text-link" href="/specialities">Discover our specialities <ArrowRight size={18} /></Link></Reveal>
        </div>
      </section>

      <section className="heritage-band">
        <div className="container heritage-grid">
          <Reveal className="heritage-photo" variant="left">
            <Image src="/images/safdar-hotel-storefront.jpg" alt="Safdar Hotel storefront in Takht Bhai" fill sizes="(max-width: 800px) 100vw, 50vw" />
            <div className="heritage-stamp"><strong>91</strong><span>years of<br />tradition</span></div>
          </Reveal>
          <Reveal className="heritage-copy" variant="right" delay={100}>
            <p className="eyebrow">Our story</p>
            <h2>Serving Takht Bhai since 1935</h2>
            <p>Safdar Hotel began with a simple promise: serve honest food with genuine Pashtun hospitality. Generations later, that promise is still at the heart of every meal.</p>
            <div className="value-list">
              <div><Sparkles /><span><strong>Authentic taste</strong>Recipes rooted in local tradition</span></div>
              <div><ShieldCheck /><span><strong>Fresh & hygienic</strong>Care at every stage of preparation</span></div>
              <div><UtensilsCrossed /><span><strong>Warm hospitality</strong>A welcoming table, day or night</span></div>
            </div>
            <Link className="button button--red" href="/about">Read our story <ArrowRight size={19} /></Link>
          </Reveal>
        </div>
      </section>

      <FaqSection />

      <section className="cta-band">
        <Reveal className="container cta-band__inner" variant="scale">
          <div><p className="eyebrow eyebrow--light">Hungry right now?</p><h2>Your Safdar favourite is waiting.</h2></div>
          <div className="cta-band__actions">
            <Link className="button button--yellow" href="/menu">Browse full menu <ArrowRight size={19} /></Link>
            <a className="button button--outline-light" href={`tel:${contact.phoneHref}`}><Phone size={19} /> Call us</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
