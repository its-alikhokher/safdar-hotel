import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return (
    <section className="page-hero">
      <Image
        src="/images/safdar-food-spread.webp"
        alt=""
        aria-hidden="true"
        fill
        preload
        sizes="100vw"
        className="page-hero__image"
      />
      <Reveal className="container page-hero__inner" variant="scale">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </Reveal>
    </section>
  );
}
