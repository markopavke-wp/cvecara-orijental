import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { assets } from "@/lib/assets";
import { locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cvećara Novo Groblje",
  description:
    "Orijental Moja Cvećara – radnja na Novom Groblju u Nišu. Program za saučešće, venci, suze i aranžmani. Radno vreme 07–16h.",
};

const shop = locations.find((l) => l.name === "Novo Groblje")!;

export default function NovoGrobljePage() {
  return (
    <>
      <PageHero
        title="Cvećara Novo Groblje"
        subtitle="Dostojanstvena cvetna ponuda uz Novo Groblje u Nišu"
        image={assets.shopNovoGroblje}
        imageAlt="Radnja Orijental Moja Cvećara na Novom Groblju u Nišu"
        tone="bw"
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)]">
                <Image
                  src={assets.shopNovoGroblje}
                  alt="Cvećara Orijental – Novo Groblje"
                  fill
                  sizes="50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-white/10 p-8 md:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Lokacija
                </p>
                <h2 className="display mt-3 text-3xl md:text-4xl">
                  Orijental na Novom Groblju
                </h2>
                <p className="mt-4 leading-relaxed text-[var(--muted)]">
                  Naša radnja na Novom Groblju namenjena je dostojanstvenom
                  oproštaju i sećanju. Tu možete naručiti vence, suze, urne,
                  korpice i bukete od prirodnog ili veštačkog cveća — brzo,
                  pažljivo i sa poštovanjem.
                </p>
                <dl className="mt-8 space-y-4 text-sm">
                  <div>
                    <dt className="text-[var(--muted)]">Adresa</dt>
                    <dd className="mt-1 text-base font-medium">{shop.address}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--muted)]">Telefon</dt>
                    <dd className="mt-1">
                      <a
                        href={`tel:${shop.tel}`}
                        className="text-lg font-semibold text-[var(--accent)]"
                      >
                        {shop.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[var(--muted)]">Radno vreme</dt>
                    <dd className="mt-1 text-base font-medium">{shop.hours}</dd>
                  </div>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`tel:${shop.tel}`} className="btn-primary">
                    Pozovi radnju
                  </a>
                  <Link href="/program-za-saucesce" className="btn-ghost">
                    Program za saučešće
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-10 rounded-[var(--radius-lg)] border border-[var(--border)] bg-white/10 p-8 text-center md:p-10">
              <h3 className="display text-2xl md:text-3xl">
                Uvek blizu kada je najvažnije
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-[var(--muted)]">
                Za hitne narudžbine i savete oko aranžmana za saučešće,
                kontaktirajte nas telefonom ili posetite radnju na Novom
                Groblju. Dostava na groblje je dostupna.
              </p>
              <Link href="/kontakt" className="btn-primary mt-6 inline-flex">
                Svi kontakti
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
