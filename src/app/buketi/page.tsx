import type { Metadata } from "next";
import { FlowerShowcase } from "@/components/FlowerShowcase";
import { Gallery } from "@/components/Gallery";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHero } from "@/components/PageHero";
import { assets } from "@/lib/assets";
import { buketiOffers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Buketi i aranžmani",
  description:
    "101 ruža, flower box, klasični buketi i aranžmani sa pićem – Orijental Moja Cvećara Niš.",
};

export default function BuketiPage() {
  return (
    <>
      <PageHero
        title="Buketi i aranžmani"
        subtitle="Klasični buketi, flower box, 101 ruža i aranžmani sa pićem"
        image={assets.product.klasicniBuketi}
        imageAlt="Klasični cvetni buket iz cvećare Orijental u Nišu"
      />
      <HowItWorks />
      <FlowerShowcase offers={buketiOffers} />
      <Gallery images={assets.galleryBuketi} />
    </>
  );
}
