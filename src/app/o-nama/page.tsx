import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Stagger } from "@/components/Stagger";
import { assets } from "@/lib/assets";
import { aboutHighlights } from "@/lib/content";

export const metadata: Metadata = {
  title: "O nama",
  description:
    "Orijental Moja Cvećara – porodična tradicija od 1995. godine. Tri lokacije u Nišu: Pevac, Novo Groblje i Trg.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="O nama"
        subtitle="Porodična tradicija i cvetne priče iz Niša"
        image={assets.homeAbout}
        imageAlt="Izložba cveća ispred cvećare Orijental na Pevcu u Nišu"
      />

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Pripremamo se za 30. rođendan sa vama
              </p>
              <p className="mt-3 text-lg text-[var(--muted)] md:text-xl">
                Hvala što ste deo naše priče —{" "}
                <span className="script text-2xl text-[var(--fg)] md:text-3xl">
                  Orijental
                </span>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-12 grid items-center gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <h2 className="display text-3xl md:text-4xl">
                  Porodična tradicija od 1995. godine
                </h2>
                <p className="mt-5 leading-relaxed text-[var(--muted)]">
                  Cvećara Orijental je porodična cvećara sa dugom tradicijom,
                  osnovana 1995. godine od strane porodice Vasić u Nišu. Nalazimo
                  se na tri lokacije: Pevac, Novo groblje i Trg, što nam
                  omogućava da uvek budemo blizu naših klijenata.
                  Specijalizovani smo za cvetne aranžmane visokog kvaliteta. Bilo
                  da vam je potreban cvetni aranžman za posebne događaje ili
                  dostojanstvena ponuda za poslednji oproštaj, Orijental Moja
                  Cvećara je tu da kreira cvetne priče koje osvajaju na prvi
                  pogled.
                </p>
                <Link href="/kontakt" className="btn-primary mt-8 inline-flex">
                  Kontaktirajte nas
                </Link>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={assets.galleryBuketi[3]}
                  alt="Orijental radnja"
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-16 md:mt-20">
            <Reveal variant="mask" feather={28}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                Šta radimo
              </p>
              <h2 className="display mt-2 max-w-xl text-3xl md:text-4xl">
                Od buketa do dostave — sve na jednom mestu
              </h2>
            </Reveal>

            <Stagger
              className="about-highlights mt-8 grid sm:grid-cols-2 lg:grid-cols-4"
              stagger={0.06}
              variant="mask"
            >
              {aboutHighlights.map((item, i) => {
                const n = String(i + 1).padStart(2, "0");
                const inner = (
                  <>
                    <span className="about-highlights__num" aria-hidden>
                      {n}
                    </span>
                    <h3 className="display mt-4 text-[1.35rem] leading-none md:text-[1.45rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                      {item.text}
                    </p>
                    {item.href ? (
                      <span className="about-highlights__more mt-5 inline-flex text-sm font-semibold text-[var(--accent)]">
                        Saznaj više →
                      </span>
                    ) : null}
                  </>
                );

                return item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="about-highlights__item group"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={item.title} className="about-highlights__item">
                    {inner}
                  </div>
                );
              })}
            </Stagger>
          </div>
        </div>
      </section>
    </>
  );
}
