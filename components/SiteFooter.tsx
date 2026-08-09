import { Clock3, Heart, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { contact, navLinks } from "@/data/site";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/motion/Reveal";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Reveal className="container footer-grid">
        <div className="footer-brand">
          <Logo light />
          <p>Authentic taste, warm hospitality and the famous Chapli Kabab tradition of Takht Bhai since 1935.</p>
          <div className="social-row">
            <a href={`https://wa.me/${contact.phoneHref.replace("+", "")}`} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={20} /></a>
          </div>
        </div>
        <nav aria-label="Footer navigation">
          <h2>Quick links</h2>
          <div className="footer-links">
            {navLinks.map((link) => <Link href={link.href} key={link.href}>{link.label}</Link>)}
          </div>
        </nav>
        <address className="footer-visit">
          <h2>Visit us</h2>
          <div className="footer-contact">
            <p><MapPin size={19} /> <span>{contact.address}</span></p>
            <a href={`tel:${contact.phoneHref}`}><Phone size={19} /> {contact.phoneDisplay}</a>
            <p><Clock3 size={19} /> <strong>Open 24/7</strong></p>
          </div>
        </address>
      </Reveal>
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Safdar Hotel. All Rights Reserved.</p>
          <p className="footer-credit">
            Developed with <Heart aria-hidden="true" size={12} /> by
            <a href="https://www.linkedin.com/in/ali-raza-643520217/" target="_blank" rel="noopener noreferrer">Quantum Tech</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
