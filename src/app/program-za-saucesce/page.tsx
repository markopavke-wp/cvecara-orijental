import type { Metadata } from "next";
import Link from "next/link";
import { FlowerShowcase } from "@/components/FlowerShowcase";
import { Gallery } from "@/components/Gallery";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { assets } from "@/lib/assets";
import { howStepsSaucesce, saucesceIntro, saucesceOffers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Venac, Suze i Aranžmani za Saučešće",
  description:
    "Venci, suze i aranžmani za saučešće – Orijental Moja Cvećara Niš. Dostava na groblje.",
};

export default function SaucescePage() {
  return (
    <>
      <PageHero
        title="Program za saučešće"
        image={assets.product.saucesce}
        imageAlt="Venac i aranžman za saučešće – Orijental Moja Cvećara Niš"
        tone="bw"
      />
      <HowItWorks
        heading="Na koji način do cveća?"
        steps={howStepsSaucesce}
        tone="bw"
      />
      <section className="section-pad pt-0">
        <div className="container-page">
          <Reveal>
            <div className="max-w-4xl">
              <h2 className="display text-3xl md:text-5xl">{saucesceIntro.title}</h2>
              <p className="mt-5 max-w-3xl leading-relaxed text-[var(--muted)]">
                {saucesceIntro.text}
              </p>
              <Link href="/novo-groblje" className="btn-primary mt-7 inline-flex">
                Cvećara na Novom Groblju
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
      <FlowerShowcase title="U ponudi" offers={saucesceOffers} tone="bw" />
      <Gallery images={assets.gallerySaucesce} title="Galerija" inColor />
    </>
  );
}
