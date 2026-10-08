import type { Metadata } from "next";
import { FlowerShowcase } from "@/components/FlowerShowcase";
import { Gallery } from "@/components/Gallery";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { assets } from "@/lib/assets";
import { saksijskoOffers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Saksijsko cveće",
  description:
    "Sobne biljke, biljke za eksterijer, zelenilo za kancelariju i sezonske saksije – Orijental Moja Cvećara Niš.",
};

export default function SaksijskoPage() {
  return (
    <>
      <PageHero
        title="Saksijsko cveće"
        subtitle="Sobne biljke, eksterijer, poslovni prostor i sezonske saksije"
        image={assets.product.saksijsko}
        imageAlt="Saksijsko cveće i sobne biljke u cvećari Orijental"
      />
      <HowItWorks heading="Na koji način do cveća?" />
      <FlowerShowcase offers={saksijskoOffers} />
      <Gallery images={assets.gallerySaksijsko} />
    </>
  );
}
