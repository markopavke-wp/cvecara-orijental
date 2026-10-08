"use client";

import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { gsap, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type GalleryProps = {
  images: readonly string[];
  title?: string;
  /** Na crno-belim stranicama, prikaži galeriju u boji */
  inColor?: boolean;
  className?: string;
};

export function Gallery({
  images,
  title = "Galerija",
  inColor = false,
  className = "",
}: GalleryProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.utils.toArray<HTMLElement>(".gallery-item img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root, dependencies: [images] },
  );

  return (
    <section
      ref={root}
      className={`section-pad-sm ${inColor ? "gallery-in-color" : ""} ${className}`}
    >
      <div className="container-page">
        <Reveal>
          <h2 className="display mb-5 text-4xl md:text-5xl">{title}</h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {images.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 0.05}
              className={i % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""}
            >
              <div className="gallery-item relative aspect-square overflow-hidden rounded-[var(--radius)] border border-[var(--border)] transition duration-500 hover:scale-[1.015]">
                <Image
                  src={src}
                  alt={`${title} ${i + 1}`}
                  fill
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="object-cover will-change-transform"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
