"use client";

import { Clock3, MapPin, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, navLinks } from "@/data/site";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const open = openPath === pathname;

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenPath(null);
      menuButtonRef.current?.focus();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span><Clock3 size={16} /><span className="utility-hours-long">Open 24 hours, 7 days</span><span className="utility-hours-short">Open 24/7</span></span>
          <span className="utility-address"><MapPin size={16} /> {contact.address}</span>
          <a href={`tel:${contact.phoneHref}`}><Phone size={16} /> {contact.phoneDisplay}</a>
        </div>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <Logo />
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} href={link.href} key={link.href}>{link.label}</Link>;
            })}
          </nav>
          <Link className="button button--dark header-cta" href="/menu">View menu</Link>
          <button
            ref={menuButtonRef}
            className="icon-button mobile-menu-button"
            onClick={() => setOpenPath(open ? null : pathname)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        <nav className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} id="mobile-nav" aria-label="Mobile navigation">
          <div className="container">
            {navLinks.map((link) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} href={link.href} key={link.href} onClick={() => setOpenPath(null)}>{link.label}</Link>;
            })}
            <a href={`tel:${contact.phoneHref}`}><Phone size={18} /> Call {contact.phoneDisplay}</a>
          </div>
        </nav>
      </header>
    </>
  );
}
