import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { assets } from "@/lib/assets";
import { contacts, locations } from "@/lib/content";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte Orijental Moja Cvećara – Pevac, Trg i Novo Groblje. Telefoni i radno vreme.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt"
        image={assets.kontaktHero}
        imageAlt="Cvećara Orijental – kontakt i lokacije u Nišu"
        branded
      />

      <section className="section-pad">
        <div className="container-page">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="display text-3xl uppercase tracking-wide md:text-4xl">
                Orijental Moja Cvećara Kontaktirajte Nas
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                Želite da saznate nešto više o našim ponudama? Imate dodatnih
                pitanja za nas? Pozovite nas!
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {contacts.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.08} variant="scale">
                <a
                  href={`tel:${person.tel}`}
                  className="block rounded-[var(--radius-lg)] border border-[var(--border)] bg-white/70 p-6 text-center transition hover:-translate-y-1"
                >
                  <h3 className="display text-2xl">{person.name}</h3>
                  <p className="mt-3 text-lg font-semibold text-[var(--accent)]">
                    {person.phone}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="display mt-16 text-center text-3xl md:text-4xl">
              Kontaktirajte neku od naših radnji!
            </h2>
          </Reveal>

          <div className="mt-8 space-y-5">
            {locations.map((loc, i) => {
              const bw = loc.tone === "bw";
              return (
                <Reveal key={loc.name} delay={i * 0.08} variant={bw ? "scale" : "fade-up"}>
                  <article
                    className={`overflow-hidden rounded-[0.9rem] border-[5px] md:grid md:grid-cols-2 ${
                      bw
                        ? "border-black bg-[#161414] text-white"
                        : "border-[var(--accent)] bg-[rgba(227,227,218,0.55)]"
                    }`}
                  >
                    <div
                      className={`relative min-h-[220px] md:min-h-[360px] ${
                        bw ? "grayscale" : ""
                      }`}
                    >
                      <Image
                        src={loc.image}
                        alt={`Cvećara ${loc.name}`}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-col p-5 md:p-7 lg:p-8">
                      {loc.maps ? (
                        <a
                          href={loc.maps}
                          target="_blank"
                          rel="noreferrer"
                          className={`display text-xl transition md:text-2xl ${
                            bw
                              ? "text-white hover:text-white/80"
                              : "text-[var(--accent)] hover:opacity-80"
                          }`}
                        >
                          {loc.address}
                        </a>
                      ) : (
                        <h3
                          className={`display text-xl md:text-2xl ${
                            bw ? "text-white" : "text-[var(--accent)]"
                          }`}
                        >
                          {loc.address}
                        </h3>
                      )}

                      <a
                        href={`tel:${loc.tel}`}
                        className={`mt-4 inline-flex items-center gap-3 text-lg font-medium ${
                          bw ? "text-[#f9f9f9]" : "text-[var(--accent)]"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm ${
                            bw
                              ? "bg-white/15 text-white"
                              : "bg-[var(--accent)]/12 text-[var(--accent)]"
                          }`}
                        >
                          ☎
                        </span>
                        {loc.phone}
                      </a>

                      <p
                        className={`mt-3 text-base md:text-lg ${
                          bw ? "text-white/90" : "text-[var(--accent)]"
                        }`}
                      >
                        Radno vreme: {loc.hours}
                      </p>

                      {loc.mapEmbed && (
                        <div
                          className={`mt-5 overflow-hidden rounded-xl border ${
                            bw ? "border-white/15" : "border-[var(--accent)]/25"
                          }`}
                        >
                          <iframe
                            title={`Mapa — ${loc.name}`}
                            src={loc.mapEmbed}
                            className="block h-[200px] w-full md:h-[220px]"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                          />
                        </div>
                      )}

                      {loc.maps && (
                        <a
                          href={loc.maps}
                          target="_blank"
                          rel="noreferrer"
                          className={`mt-3 text-sm font-medium underline-offset-2 transition hover:underline ${
                            bw ? "text-white/70" : "text-[var(--accent)]"
                          }`}
                        >
                          Otvori u Google Maps →
                        </a>
                      )}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
