"use client";

import Image from "next/image";
import { useRef } from "react";
import { brand } from "@/lib/content";
import { gsap, maskReveal, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = {
  title: string;
  subtitle?: string;
  image: string;
  /** Opis pozadinske slike za SEO / a11y */
  imageAlt?: string;
  tone?: "default" | "bw";
  /** Centriran brand ispod naslova (kao na live /kontakt) */
  branded?: boolean;
};

export function PageHero({
  title,
  subtitle,
  image,
  imageAlt,
  tone = "default",
  branded = false,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const bw = tone === "bw";
  const centered = bw || branded;

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.fromTo(
        ".page-hero-media",
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power2.out" },
      );

      maskReveal(".page-hero-copy > *", {
        feather: 32,
        duration: 1.5,
        stagger: 0.14,
        delay: 0.12,
      });

      gsap.to(".page-hero-media", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root },
  );

  const overlay = bw
    ? "bg-gradient-to-t from-black via-black/70 to-black/40"
    : "bg-gradient-to-t from-[rgba(14,20,18,0.88)] via-[rgba(14,20,18,0.4)] to-[rgba(14,20,18,0.25)]";

  return (
    <section
      ref={root}
      className={`relative overflow-hidden ${
        bw ? "min-h-[52svh] md:min-h-[62svh]" : "min-h-[58svh] md:min-h-[68svh]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt ?? `${title} – Orijental moja cvećara, Niš`}
        fill
        priority
        sizes="100vw"
        className="page-hero-media object-cover will-change-transform"
      />
      <div className={`absolute inset-0 ${overlay}`} />

      <div
        className={`relative z-10 flex pb-12 pt-32 md:pb-16 ${
          centered
            ? "min-h-[52svh] items-center justify-center text-center md:min-h-[62svh]"
            : "min-h-[58svh] items-end md:min-h-[68svh]"
        }`}
      >
        <div
          className={`page-hero-copy container-page ${
            centered ? "max-w-4xl" : "max-w-3xl"
          }`}
        >
          {!centered && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
              Orijental moja cvećara
            </p>
          )}
          <h1
            className={`display text-white ${
              centered
                ? "text-[clamp(2.6rem,7vw,4.8rem)]"
                : "text-[clamp(2.8rem,8vw,5.5rem)]"
            }`}
          >
            {title}
          </h1>
          {centered ? (
            <p className="mt-4 display text-2xl font-normal tracking-normal text-white/85 md:text-3xl">
              {brand.name}
              <span className="mt-1 block text-lg font-[family-name:var(--font-body)] font-light md:text-xl">
                {brand.tagline}
              </span>
            </p>
          ) : (
            subtitle && (
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/72 md:text-lg">
                {subtitle}
              </p>
            )
          )}
        </div>
      </div>
    </section>
  );
}
