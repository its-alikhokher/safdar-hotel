import { ChevronDown } from "lucide-react";
import { faqItems } from "@/data/faqs";
import { Reveal } from "@/components/motion/Reveal";

export function FaqSection() {
  return (
    <section className="section faq-section" aria-labelledby="faq-heading">
      <div className="container faq-layout">
        <Reveal className="faq-intro" variant="left">
          <p className="eyebrow">Useful answers</p>
          <h2 id="faq-heading">Before you visit Safdar Hotel</h2>
          <p>Location, opening hours, menu highlights and direct contact details for planning your visit.</p>
        </Reveal>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <Reveal as="article" className="faq-item" delay={index * 65} key={item.question}>
              <details>
                <summary>
                  <span>{item.question}</span>
                  <ChevronDown aria-hidden="true" size={20} />
                </summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
