import type { Metadata } from "next";
import { Clock3, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { StructuredData } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/data/seo";
import { contact } from "@/data/site";
import { pageStructuredData } from "@/data/structuredData";

const description = "Find Safdar Hotel near Pirano CNG on Main Malakand Road, Takht Bhai. Open 24/7. Call 0345 9345098 for prices, availability and directions.";

export const metadata: Metadata = createPageMetadata({
  title: "Contact, 24/7 Opening Hours & Location",
  description,
  path: "/contact",
  keywords: ["Safdar Hotel contact", "Safdar Hotel location", "Pirano CNG restaurant", "Main Malakand Road", "0345 9345098"],
});

export default function ContactPage() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`;

  return (
    <>
      <StructuredData
        id="contact-page-entities"
        data={pageStructuredData({ type: "ContactPage", path: "/contact", label: "Contact", name: "Contact Safdar Hotel", description })}
      />
      <PageHero eyebrow="Here whenever hunger calls" title="Visit Safdar Hotel">
        Find us on Main Malakand Road in Takht Bhai. Our doors and kitchen are open around the clock.
      </PageHero>
      <section className="section contact-section">
        <div className="container contact-layout">
          <Reveal className="contact-copy" variant="left">
            <p className="eyebrow">Contact & location</p>
            <h2>Come share a table with us</h2>
            <p>Whether it’s breakfast before the road, a family lunch or a late-night karahi, Safdar Hotel is ready to serve.</p>
            <div className="contact-details">
              <div><span><MapPin /></span><p><small>Our address</small><strong>{contact.address}</strong></p></div>
              <div><span><Clock3 /></span><p><small>Opening hours</small><strong>Open 24 hours · 7 days a week</strong></p></div>
              <div><span><Phone /></span><p><small>Call us</small><a href={`tel:${contact.phoneHref}`}>{contact.phoneDisplay}</a></p></div>
            </div>
            <div className="contact-actions">
              <a className="button button--red" href={directionsUrl} target="_blank" rel="noreferrer"><Navigation size={19} /> Get directions</a>
              <a className="button button--outline-dark" href={`tel:${contact.phoneHref}`}><Phone size={19} /> Call now</a>
            </div>
            <div className="contact-social">
              <p>Message Safdar Hotel</p>
              <div>
                <a href={`https://wa.me/${contact.phoneHref.replace("+", "")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
              </div>
            </div>
          </Reveal>
          <Reveal className="map-wrap" variant="right" delay={100}>
            <iframe
              src={mapUrl}
              title="Safdar Hotel location on Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="map-caption"><MapPin size={18} /><span>Near Pirano CNG · Main Malakand Road</span></div>
          </Reveal>
        </div>
      </section>
      <Reveal as="section" className="contact-closing" variant="scale">
        <div className="contact-closing__image" aria-hidden="true" />
        <div className="container contact-closing__content">
          <p className="eyebrow eyebrow--light">Since 1935</p>
          <h2>The grill is hot.<br />The table is ready.</h2>
          <a className="button button--yellow" href={`tel:${contact.phoneHref}`}><Phone size={19} /> {contact.phoneDisplay}</a>
        </div>
      </Reveal>
    </>
  );
}
