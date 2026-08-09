"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealSelector = "[data-reveal]";

export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pendingElements = new Set<HTMLElement>();
    const registeredElements = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let animationFrame = 0;

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-revealed");
      pendingElements.delete(element);
      observer?.unobserve(element);
    };

    const revealVisibleElements = () => {
      animationFrame = 0;
      for (const element of pendingElements) {
        if (!element.isConnected) {
          pendingElements.delete(element);
          continue;
        }
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) reveal(element);
      }
    };

    const scheduleViewportCheck = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(revealVisibleElements);
    };

    if (!reduceMotion && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          }
        },
        { rootMargin: "0px 0px -8%", threshold: 0.12 },
      );
    }

    const register = (parent: ParentNode) => {
      const elements: HTMLElement[] = [];
      if (parent instanceof HTMLElement && parent.matches(revealSelector)) elements.push(parent);
      elements.push(...parent.querySelectorAll<HTMLElement>(revealSelector));

      for (const element of elements) {
        if (registeredElements.has(element)) continue;
        registeredElements.add(element);
        const bounds = element.getBoundingClientRect();
        const isInInitialViewport = bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0;
        if (observer && !isInInitialViewport) {
          pendingElements.add(element);
          observer.observe(element);
        } else {
          reveal(element);
        }
      }
    };

    register(document);
    root.classList.add("motion-enabled");

    window.addEventListener("scroll", scheduleViewportCheck, { passive: true });
    window.addEventListener("resize", scheduleViewportCheck, { passive: true });

    return () => {
      observer?.disconnect();
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleViewportCheck);
      window.removeEventListener("resize", scheduleViewportCheck);
      root.classList.remove("motion-enabled");
    };
  }, [pathname]);

  return null;
}
