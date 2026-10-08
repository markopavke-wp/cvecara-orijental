import Link from "next/link";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { OfferCard } from "@/components/OfferCard";
import { ParallaxImage } from "@/components/ParallaxImage";
import { PromoBar } from "@/components/PromoBar";
import { Reveal } from "@/components/Reveal";
import { SocialFollow } from "@/components/SocialFollow";
import { Stagger } from "@/components/Stagger";
import { assets } from "@/lib/assets";
import { homeOffers } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />

      <PromoBar text="Potreban vam je buket za Dan zaljubljenih ili 8. mart? Pogledaj našu ponudu" />

      <section className="section-pad mesh-bg">
        <div className="container-page relative z-10">
          <Reveal variant="fade-up">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
              Kod nas u ponudi
            </p>
            <h2 className="display max-w-2xl text-4xl md:text-5xl">
              Cvetne priče za svaku priliku
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
            {homeOffers.map((offer, i) => (
              <OfferCard key={offer.title} {...offer} index={i} staggerChild />
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-pad pt-0">
        <div className="container-page grid gap-4 md:grid-cols-2">
          <Reveal variant="mask" feather={28}>
            <Link
              href="/buketi"
              className="group relative block h-[360px] overflow-hidden rounded-[var(--radius-lg)] md:h-[420px]"
            >
              <ParallaxImage
                src={assets.homeSplitRight}
                alt="Cvetni buketi i aranžmani"
                sizes="50vw"
                className="absolute inset-0 size-full"
                amount={14}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,20,18,0.85)] via-[rgba(14,20,18,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                <h2 className="display text-3xl text-white md:text-4xl">
                  Cvetni buketi i aranžmani za svaku priliku
                </h2>
                <span className="mt-4 inline-flex text-sm font-semibold text-[var(--accent-soft)] transition group-hover:gap-2">
                  Saznaj više →
                </span>
              </div>
            </Link>
          </Reveal>
          <Reveal variant="mask" feather={28} delay={0.1}>
            <Link
              href="/program-za-saucesce"
              className="group relative block h-[360px] overflow-hidden rounded-[var(--radius-lg)] md:h-[420px]"
            >
              <ParallaxImage
                src={assets.homeSplitLeft}
                alt="Cveće za poslednji oproštaj"
                sizes="50vw"
                className="absolute inset-0 size-full"
                amount={14}
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,20,18,0.85)] via-[rgba(14,20,18,0.25)] to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                <h2 className="display text-3xl text-white md:text-4xl">
                  Cveće za poslednji oproštaj
                </h2>
                <span className="mt-4 inline-flex text-sm font-semibold text-white/70 transition group-hover:gap-2">
                  Saznaj više →
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section id="o_nama" className="section-pad pt-0">
        <div className="container-page">
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-white/55 md:grid md:grid-cols-2">
            <Reveal variant="left" className="p-8 md:p-12">
              <h2 className="display text-4xl md:text-5xl">O Nama</h2>
              <p className="mt-5 leading-relaxed text-[var(--muted)]">
                &quot;Orijental Moja Cvećara&quot; je porodična cvećara sa dugom
                tradicijom, osnovana 2005. godine od strane porodice Vasić. Sa
                sedištem u Nišu, nalazimo se na tri ključne lokacije: Pevac, Novo
                groblje i Trg, čime smo uvek blizu naših klijenata. Pored
                pažljivo odabranih cvetnih aranžmana, delom se bavimo i
                sopstvenom proizvodnjom cveća, što nam omogućava da pružimo
                najviši kvalitet i svežinu u svakom buketu. Bilo da tražite
                savršene cvetne kreacije za posebne prilike ili dostojanstvenu
                ponudu za poslednji oproštaj, uvek smo tu da stvorimo cvetne
                priče koje osvajaju na prvi pogled.
              </p>
              <Link href="/o-nama" className="btn-primary mt-8 inline-flex">
                Više o nama
              </Link>
            </Reveal>
            <Reveal variant="right" className="relative min-h-[280px]">
              <ParallaxImage
                src={assets.homeAbout}
                alt="Izložba cveća ispred cvećare Orijental na Pevcu"
                sizes="50vw"
                className="absolute inset-0 h-full min-h-[280px]"
                amount={16}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <PromoBar text="Potreban ti je buket za iznenađenje? Pogledaj našu ponudu" />

      <section className="pt-0 pb-0">
        <div className="container-page">
          <Reveal variant="mask" feather={28}>
            <div className="contact-cta rounded-[var(--radius-lg)] border border-[rgba(196,30,92,0.14)] px-7 py-8 text-center md:px-12 md:py-10">
              <h2 className="display text-4xl text-[var(--fg)] md:text-5xl">Kontakt</h2>
              <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
                Posetite nas na jednoj od naših lokacija u Nišu ili nas pozovite
                direktno. Uvek smo tu da vam pomognemo u odabiru savršenog cveća.
              </p>
              <Link href="/kontakt" className="btn-primary mt-6 inline-flex">
                Kontakt
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Gallery
        images={assets.galleryBuketi.slice(0, 4)}
        title="Iz naše radnje"
        className="!pt-8 !pb-6"
      />

      <SocialFollow />
    </>
  );
}
