"use client";

import { useRef, type ReactNode } from "react";
import { gsap, maskReveal, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = {
  children: ReactNode;
  className?: string;
  /** CSS selektor unutar wrappera */
  child?: string;
  stagger?: number;
  y?: number;
  /** mask = dijagonalni wipe (default), fade = stari fade-up */
  variant?: "mask" | "fade";
};

/** Stagger reveal za decu unutar kontejnera (ScrollTrigger) */
export function Stagger({
  children,
  className,
  child = ":scope > *",
  stagger = 0.12,
  y = 36,
  variant = "mask",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      const items = el.querySelectorAll(child);
      if (!items.length) return;

      if (variant === "mask") {
        maskReveal(items, {
          feather: 28,
          duration: 1.45,
          stagger,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
        return;
      }

      gsap.set(items, { opacity: 0, y, filter: "blur(6px)" });
      gsap.to(items, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.85,
        stagger,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      });
    },
    { dependencies: [child, stagger, y, variant] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
