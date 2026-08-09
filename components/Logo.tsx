import Image from "next/image";
import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link className={`brand ${light ? "brand--light" : ""}`} href="/" aria-label="Safdar Hotel home">
      <Image src="/logo-mark.svg" alt="" width={54} height={54} />
      <span className="brand__copy">
        <strong>Safdar Hotel</strong>
        <small>Famous Chapli Kabab · Since 1935</small>
      </span>
    </Link>
  );
}
