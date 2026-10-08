import type { Metadata } from "next";
import { FlowerShowcase } from "@/components/FlowerShowcase";
import { Gallery } from "@/components/Gallery";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { assets } from "@/lib/assets";
import { rezanoOffers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Rezano cveće",
  description:
    "Ruže, lale, ljiljani i egzotično rezano cveće – orhideje, anthurium, protea, strelitzia. Orijental Moja Cvećara Niš.",
};

export default function RezanoPage() {
  return (
    <>
      <PageHero
        title="Rezano cveće"
        subtitle="Ruže, lale, ljiljani i egzotični cvetovi"
        image={assets.product.ruze}
        imageAlt="Sveže rezane ruže – Orijental Moja Cvećara Niš"
      />
      <HowItWorks heading="Na koji način do cveća?" />
      <FlowerShowcase offers={rezanoOffers} />
      <Gallery images={assets.galleryRezano} />
    </>
  );
}
