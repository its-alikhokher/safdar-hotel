import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type RevealElement = "article" | "div" | "section";
type RevealVariant = "left" | "right" | "scale" | "up";

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: RevealElement;
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
}

type RevealStyle = CSSProperties & { "--reveal-delay": string };

export function Reveal({
  as: Element = "div",
  children,
  delay = 0,
  style,
  variant = "up",
  ...props
}: RevealProps) {
  const revealStyle: RevealStyle = {
    ...style,
    "--reveal-delay": `${Math.min(Math.max(delay, 0), 600)}ms`,
  };

  return (
    <Element {...props} data-reveal={variant} style={revealStyle}>
      {children}
    </Element>
  );
}
