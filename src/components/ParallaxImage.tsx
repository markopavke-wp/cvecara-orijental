"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Koliko % slika ide u skrolu (veće = jači efekat) */
  amount?: number;
};

export function ParallaxImage({
  src,
  alt,
  sizes = "100vw",
  className = "",
  priority = false,
  amount = 18,
}: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const img = el.querySelector("img");
      if (!img) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        img,
        { yPercent: -amount / 2, scale: 1.12 },
        {
          yPercent: amount / 2,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [src, amount] },
  );

  // Ne forsira `relative` ako caller vec salje `absolute` — inace
  // Tailwind conflict spusti kontejner na height: 0 i fill slika nestane.
  const positioned = /\babsolute\b|\bfixed\b|\brelative\b/.test(className);

  return (
    <div
      ref={root}
      className={`overflow-hidden ${positioned ? className : `relative ${className}`}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover will-change-transform"
      />
    </div>
  );
}
