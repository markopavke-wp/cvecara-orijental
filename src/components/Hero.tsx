"use client";

import Link from "next/link";
import { useRef } from "react";
import { assets } from "@/lib/assets";
import { brand } from "@/lib/content";
import { gsap, maskImageFor, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

function wipe(
  tl: gsap.core.Timeline,
  el: Element,
  feather: number,
  duration: number,
  at: number,
) {
  const node = el as HTMLElement;
  const state = { v: -feather };
  const paint = () => {
    node.style.setProperty("--mask-reveal", String(state.v));
    const mask = maskImageFor(feather);
    node.style.maskImage = mask;
    node.style.webkitMaskImage = mask;
  };
  paint();
  tl.to(state, { v: 100, duration, ease: "power1.inOut", onUpdate: paint }, at);
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(
          [".hero-brand", ".hero-tag", ".hero-line", ".hero-cta", ".hero-scroll"],
          { clearProps: "all", opacity: 1, y: 0, yPercent: 0 },
        );
        return;
      }

      const brandEl = root.current?.querySelector(".hero-brand");
      const tagEl = root.current?.querySelector(".hero-tag");
      const lineEl = root.current?.querySelector(".hero-line");
      if (!brandEl || !tagEl || !lineEl) return;

      const tl = gsap.timeline();

      tl.fromTo(
        ".hero-video",
        { scale: 1.12 },
        { scale: 1, duration: 2.2, ease: "power2.out" },
        0,
      );

      wipe(tl, brandEl, 34, 1.85, 0.2);
      wipe(tl, tagEl, 34, 1.45, 0.55);
      wipe(tl, lineEl, 34, 1.35, 0.8);

      tl.fromTo(
        ".hero-cta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out" },
        1.15,
      ).fromTo(
        ".hero-scroll",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out" },
        1.4,
      );

      gsap.to(".hero-video", {
        yPercent: 12,
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

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden">
      <video
        className="hero-video absolute inset-0 h-full w-full object-cover will-change-transform"
        autoPlay
        muted
        loop
        playsInline
        poster={assets.heroPoster}
      >
        <source src={assets.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,20,18,0.35)_0%,rgba(14,20,18,0.15)_40%,rgba(14,20,18,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(196,30,92,0.18),transparent_45%)]" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-28 md:pb-16">
        <div className="container-page w-full">
          <h1 className="hero-brand max-w-5xl text-white">
            <span className="hero-brand-name">{brand.name}</span>
            <span className="hero-brand-rest">{brand.tagline}</span>
          </h1>

          <p className="hero-tag mt-3 max-w-xl text-sm font-light tracking-[0.18em] text-white/70 md:text-base">
            {brand.city}
          </p>

          <p className="hero-line mt-4 max-w-md text-sm text-white/70 md:text-base">
            Cvetna magija za svaki trenutak
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/buketi" className="hero-cta btn-primary">
              Pogledaj ponudu
            </Link>
            <Link
              href="/kontakt"
              className="hero-cta btn-ghost !border-white/25 !text-white hover:!bg-white/15"
            >
              Kontaktirajte nas
            </Link>
          </div>

          <div className="hero-scroll mt-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
            <span className="h-px w-10 bg-white/35" />
            Skroluj
          </div>
        </div>
      </div>
    </section>
  );
}
