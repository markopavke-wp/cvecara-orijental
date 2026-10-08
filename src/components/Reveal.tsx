"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap, maskImageFor, maskReveal, registerGsap, useGSAP } from "@/lib/gsap";

registerGsap();

type RevealVariant = "mask" | "fade-up" | "fade" | "clip" | "scale" | "left" | "right";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  variant?: RevealVariant;
  /** Ako true, animacija prati skrol (scrub) umesto one-shot */
  scrub?: boolean | number;
  feather?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
  variant = "mask",
  scrub = false,
  feather = 30,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        gsap.set(el, { clearProps: "all" });
        return;
      }

      const scrollTrigger = {
        trigger: el,
        start: scrub ? "top 90%" : "top 88%",
        end: scrub ? "top 45%" : undefined,
        scrub: scrub || false,
        once: !scrub,
      };

      if (variant === "mask") {
        maskReveal(el, {
          feather,
          duration: scrub ? 1 : 1.55,
          delay: scrub ? 0 : delay,
          ease: scrub ? "none" : "power1.inOut",
          scrollTrigger,
        });
        return;
      }

      const from: gsap.TweenVars = { opacity: 0 };
      const to: gsap.TweenVars = {
        opacity: 1,
        duration: scrub ? 1 : 0.95,
        delay: scrub ? 0 : delay,
        ease: scrub ? "none" : "power3.out",
        scrollTrigger,
      };

      switch (variant) {
        case "fade":
          break;
        case "clip":
          from.clipPath = "inset(12% 12% 12% 12% round 24px)";
          from.scale = 1.06;
          to.clipPath = "inset(0% 0% 0% 0% round 0px)";
          to.scale = 1;
          to.duration = scrub ? 1 : 1.15;
          break;
        case "scale":
          from.scale = 0.92;
          to.scale = 1;
          break;
        case "left":
          from.x = -48;
          to.x = 0;
          break;
        case "right":
          from.x = 48;
          to.x = 0;
          break;
        default:
          from.y = y;
          from.filter = "blur(8px)";
          to.y = 0;
          to.filter = "blur(0px)";
      }

      gsap.fromTo(el, from, to);
    },
    { dependencies: [delay, y, variant, scrub, feather] },
  );

  const pendingMask: CSSProperties | undefined =
    variant === "mask"
      ? {
          // @ts-expect-error CSS custom property
          "--mask-reveal": -feather,
          maskImage: maskImageFor(feather),
          WebkitMaskImage: maskImageFor(feather),
        }
      : undefined;

  return (
    <div ref={ref} className={`reveal-item ${className ?? ""}`} style={pendingMask}>
      {children}
    </div>
  );
}
