"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

let effectsRegistered = false;

/** CSS mask formula — animira se preko --mask-reveal (−feather → 100) */
export function maskImageFor(feather = 30) {
  return `linear-gradient(to bottom right, #000 calc(var(--mask-reveal) * 1%), transparent calc((var(--mask-reveal) + ${feather}) * 1%))`;
}

function applyMaskVar(el: Element, value: number, feather: number) {
  const node = el as HTMLElement;
  node.style.setProperty("--mask-reveal", String(value));
  const mask = maskImageFor(feather);
  node.style.maskImage = mask;
  node.style.webkitMaskImage = mask;
}

/** Pripremi element za mask-wipe (sakriven) */
export function prepMask(targets: gsap.TweenTarget, feather = 30) {
  gsap.utils.toArray<Element>(targets).forEach((el) => {
    applyMaskVar(el, -feather, feather);
  });
}

type MaskRevealConfig = {
  feather?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  ease?: string;
  scrollTrigger?: gsap.TweenVars["scrollTrigger"];
};

/**
 * Dijagonalni mask-wipe kao na seewhateyesee.org.
 * Animira proxy broj (GSAP), pa piše --mask-reveal — pouzdanije od direktnog CSS-var tweena.
 */
export function maskReveal(
  targets: gsap.TweenTarget,
  {
    feather = 30,
    duration = 1.5,
    delay = 0,
    stagger = 0,
    ease = "power1.inOut",
    scrollTrigger,
  }: MaskRevealConfig = {},
) {
  const els = gsap.utils.toArray<Element>(targets);
  if (!els.length) return gsap.timeline();

  prepMask(els, feather);

  const tl = gsap.timeline({ delay, scrollTrigger });

  els.forEach((el, i) => {
    const state = { v: -feather };
    tl.to(
      state,
      {
        v: 100,
        duration,
        ease,
        onUpdate: () => applyMaskVar(el, state.v, feather),
      },
      i * stagger,
    );
  });

  return tl;
}

export function registerGsap() {
  if (effectsRegistered || typeof window === "undefined") return;
  effectsRegistered = true;

  gsap.registerEffect({
    name: "maskReveal",
    effect(targets: gsap.TweenTarget, config: Record<string, unknown>) {
      return maskReveal(targets, {
        feather: Number(config.feather ?? 30),
        duration: Number(config.duration ?? 1.5),
        delay: Number(config.delay ?? 0),
        stagger: Number(config.stagger ?? 0),
        ease: String(config.ease ?? "power1.inOut"),
      });
    },
    defaults: {
      duration: 1.5,
      feather: 30,
      stagger: 0,
      ease: "power1.inOut",
    },
    extendTimeline: true,
  });
}

export { gsap, ScrollTrigger, useGSAP };
