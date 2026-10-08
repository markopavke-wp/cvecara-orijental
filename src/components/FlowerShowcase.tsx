"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { OfferBlock } from "@/lib/content";
import { gsap, maskReveal, registerGsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

registerGsap();

type Props = {
  title?: string;
  offers: OfferBlock[];
  tone?: "default" | "bw";
};

export function FlowerShowcase({
  title = "U ponudi",
  offers,
  tone = "default",
}: Props) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mobileStrip = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const bw = tone === "bw";
  const activeOffer = offers[active] ?? offers[0];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useGSAP(
    () => {
      const copy = root.current?.querySelector<HTMLElement>(
        isDesktop ? ".flower-copy-desktop" : ".flower-copy-mobile",
      );
      if (!copy) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(copy, { clearProps: "all" });
        return;
      }
      maskReveal(copy, { feather: 24, duration: 0.85 });
    },
    { scope: root, dependencies: [activeOffer.title, isDesktop] },
  );

  useGSAP(
    () => {
      const section = root.current;
      const strip = track.current;
      const mStrip = mobileStrip.current;
      if (!section || offers.length < 1) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!strip) return;
        const cards = gsap.utils.toArray<HTMLElement>(".flower-card", strip);

        const paint = (progressIndex: number) => {
          cards.forEach((card, i) => {
            const dist = Math.abs(progressIndex - i);
            gsap.set(card, {
              scale: gsap.utils.clamp(0.84, 1, 1 - dist * 0.12),
              rotateY: (i - progressIndex) * -18,
              rotateX: 8,
              y: dist * 14,
              opacity: gsap.utils.clamp(0.45, 1, 1 - dist * 0.3),
              zIndex: Math.round(40 - dist * 8),
              transformPerspective: 1200,
              x: 0,
            });
          });
        };

        if (reduce || offers.length === 1) {
          paint(0);
          return;
        }

        const steps = offers.length - 1;
        const getStep = () => {
          const a = cards[0];
          const b = cards[1];
          if (!a || !b) return a?.offsetWidth ?? 300;
          return b.offsetLeft - a.offsetLeft;
        };

        paint(0);
        gsap.set(strip, { clearProps: "x" });

        const tween = gsap.to(strip, {
          x: () => -getStep() * steps,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${Math.max(window.innerHeight * steps * 0.85, 900)}`,
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress * steps;
              const idx = Math.round(p);
              setActive((prev) => (prev === idx ? prev : idx));
              paint(p);
            },
          },
        });

        triggerRef.current = tween.scrollTrigger ?? null;

        return () => {
          triggerRef.current = null;
        };
      });

      mm.add("(max-width: 1023px)", () => {
        if (!mStrip) return;

        gsap.set(strip, { clearProps: "transform" });
        gsap.set(".flower-card", { clearProps: "all" });

        if (reduce || offers.length === 1) {
          gsap.set(mStrip, { x: 0 });
          return;
        }

        const steps = offers.length - 1;
        const slideWidth = () =>
          (mStrip.children[0] as HTMLElement | undefined)?.offsetWidth ?? 0;

        const tween = gsap.to(mStrip, {
          x: () => -slideWidth() * steps,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * steps * 0.9}`,
            pin: true,
            scrub: 0.55,
            snap: {
              snapTo: 1 / steps,
              duration: { min: 0.12, max: 0.35 },
              ease: "power1.inOut",
            },
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * steps);
              setActive((prev) => (prev === idx ? prev : idx));
            },
          },
        });

        triggerRef.current = tween.scrollTrigger ?? null;

        return () => {
          triggerRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [offers.length] },
  );

  const goTo = (index: number) => {
    const next = Math.max(0, Math.min(offers.length - 1, index));
    const st = triggerRef.current;
    if (!st || offers.length <= 1) {
      setActive(next);
      return;
    }
    const progress = next / (offers.length - 1);
    window.scrollTo({
      top: st.start + (st.end - st.start) * progress,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={root}
      className={`relative overflow-hidden ${bw ? "bg-white text-black" : ""}`}
    >
      {/* Desktop: full-viewport pin carousel */}
      <div className="hidden min-h-[100svh] flex-col justify-center py-24 lg:flex">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.2fr)]">
          <OfferCopy
            title={title}
            offer={activeOffer}
            offers={offers}
            active={active}
            bw={bw}
            goTo={goTo}
          />

          <div className="relative z-10 min-h-[520px] overflow-hidden">
            <div
              aria-hidden
              className={`pointer-events-none absolute inset-[12%] rounded-[2rem] blur-3xl ${
                bw ? "bg-black/5" : "bg-[var(--accent)]/10"
              }`}
            />
            <div
              ref={track}
              className="relative flex h-full items-center gap-7 will-change-transform"
              style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
            >
              {offers.map((offer, i) => (
                <OfferCard
                  key={offer.title}
                  offer={offer}
                  active={i === active}
                  bw={bw}
                  onSelect={() => goTo(i)}
                  className="flower-card w-[300px]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: one-viewport pin + scroll-driven offers */}
      <div className="flex h-[100svh] flex-col justify-center lg:hidden">
        <div className="container-page flex max-h-[100svh] flex-col py-4">
          <p
            className={`mb-2 shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.2em] ${
              bw ? "text-black/45" : "text-[var(--accent)]"
            }`}
          >
            {title}
          </p>

          <div className="relative min-h-0 w-full shrink overflow-hidden rounded-[1rem]">
            <div ref={mobileStrip} className="flex will-change-transform">
              {offers.map((offer) => (
                <div
                  key={offer.title}
                  className="relative h-[min(34svh,220px)] w-full shrink-0"
                >
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1023px) 100vw, 0px"
                    className={`object-cover ${bw ? "grayscale" : ""}`}
                    priority={offer.title === offers[0]?.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 px-3.5 pb-3 text-sm font-semibold text-white">
                    {offer.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2.5 flex shrink-0 items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {offers.map((offer, i) => (
                <button
                  key={offer.title}
                  type="button"
                  aria-label={offer.title}
                  onClick={() => goTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active
                      ? bw
                        ? "w-5 bg-black"
                        : "w-5 bg-[var(--accent)]"
                      : bw
                        ? "w-1.5 bg-black/25"
                        : "w-1.5 bg-[var(--fg)]/20"
                  }`}
                />
              ))}
            </div>
            <span
              className={`text-[0.6rem] uppercase tracking-[0.16em] ${
                bw ? "text-black/40" : "text-[var(--muted)]"
              }`}
            >
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(offers.length).padStart(2, "0")}
            </span>
          </div>

          <div key={activeOffer.title} className="flower-copy-mobile mt-3 min-h-0 shrink">
            <h2 className="display text-[clamp(1.45rem,6.5vw,1.95rem)] leading-[1.1]">
              {activeOffer.title}
            </h2>
            <p
              className={`mt-1.5 line-clamp-2 text-[0.8rem] leading-snug ${
                bw ? "text-black/65" : "text-[var(--muted)]"
              }`}
            >
              {activeOffer.intro}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {activeOffer.points.slice(0, 2).map((point) => (
                <li
                  key={point}
                  className={`flex gap-2 text-[0.78rem] leading-snug ${
                    bw ? "text-black/80" : "text-[var(--fg)]/90"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded text-[0.6rem] ${
                      bw
                        ? "bg-black text-white"
                        : "bg-[var(--accent)]/12 text-[var(--accent)]"
                    }`}
                  >
                    ✓
                  </span>
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/kontakt"
              className={
                bw
                  ? "bw-cta mt-3 inline-flex px-4 py-2.5 text-xs uppercase tracking-wide"
                  : "btn-primary mt-3 inline-flex px-4 py-2.5 text-xs"
              }
            >
              Kontaktirajte nas
            </Link>
          </div>

          <p
            aria-hidden
            className={`mt-auto pt-2 text-center text-[0.55rem] uppercase tracking-[0.18em] ${
              bw ? "text-black/30" : "text-[var(--muted)]/70"
            }`}
          >
            Skroluj za sledeću
          </p>
        </div>
      </div>
    </section>
  );
}

function OfferCopy({
  title,
  offer,
  offers,
  active,
  bw,
  goTo,
}: {
  title: string;
  offer: OfferBlock;
  offers: OfferBlock[];
  active: number;
  bw: boolean;
  goTo: (i: number) => void;
}) {
  return (
    <div className="relative z-20 max-w-xl">
      <p
        className={`mb-2 text-xs font-semibold uppercase tracking-[0.2em] ${
          bw ? "text-black/45" : "text-[var(--accent)]"
        }`}
      >
        {title}
      </p>

      <div key={offer.title} className="flower-copy-desktop">
        <h2 className="display text-[clamp(2.1rem,4.5vw,3.5rem)]">{offer.title}</h2>
        <p
          className={`mt-4 text-sm leading-relaxed md:text-base ${
            bw ? "text-black/65" : "text-[var(--muted)]"
          }`}
        >
          {offer.intro}
        </p>
        <ul className="mt-6 space-y-3">
          {offer.points.slice(0, 4).map((point) => (
            <li
              key={point}
              className={`flex gap-3 text-sm leading-relaxed ${
                bw ? "text-black/80" : "text-[var(--fg)]/90"
              }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs ${
                  bw
                    ? "bg-black text-white"
                    : "bg-[var(--accent)]/12 text-[var(--accent)]"
                }`}
              >
                ✓
              </span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
        <Link
          href="/kontakt"
          className={
            bw
              ? "bw-cta mt-8 inline-flex uppercase tracking-wide"
              : "btn-primary mt-8 inline-flex"
          }
        >
          Kontaktirajte nas
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {offers.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={item.title}
            onClick={() => goTo(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === active
                ? bw
                  ? "w-8 bg-black"
                  : "w-8 bg-[var(--accent)]"
                : bw
                  ? "w-2.5 bg-black/25"
                  : "w-2.5 bg-[var(--fg)]/20"
            }`}
          />
        ))}
        <span
          className={`ml-1 text-xs uppercase tracking-[0.18em] ${
            bw ? "text-black/40" : "text-[var(--muted)]"
          }`}
        >
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(offers.length).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}

function OfferCard({
  offer,
  active,
  bw,
  onSelect,
  className,
}: {
  offer: OfferBlock;
  active: boolean;
  bw: boolean;
  onSelect: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative aspect-[3/4] shrink-0 origin-center ${className ?? ""}`}
      style={{ transformStyle: "preserve-3d" }}
      aria-current={active}
    >
      <span
        className={`absolute inset-0 overflow-hidden rounded-[1.4rem] border shadow-[0_28px_60px_rgba(14,20,18,0.18)] transition duration-500 ${
          bw ? "border-black/15 bg-[#111]" : "border-white/80 bg-white"
        } ${active ? "ring-2 ring-[var(--accent)]/35" : ""}`}
      >
        <span
          aria-hidden
          className={`absolute inset-x-0 top-0 z-10 h-3 ${
            bw
              ? "bg-gradient-to-b from-white/20 to-transparent"
              : "bg-gradient-to-b from-white to-transparent"
          }`}
        />
        <Image
          src={offer.image}
          alt={offer.title}
          fill
          sizes="300px"
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            bw ? "grayscale" : ""
          }`}
        />
        <span className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/70 via-black/25 to-transparent px-4 pb-5 pt-16">
          <span className="block text-left text-sm font-semibold leading-snug text-white md:text-base">
            {offer.title}
          </span>
        </span>
      </span>
    </button>
  );
}
