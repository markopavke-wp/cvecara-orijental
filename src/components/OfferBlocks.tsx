import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";
import type { OfferBlock } from "@/lib/content";

type Props = {
  title?: string;
  offers: OfferBlock[];
  tone?: "default" | "bw";
};

export function OfferBlocks({ title = "U ponudi", offers, tone = "default" }: Props) {
  const bw = tone === "bw";

  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          {bw ? (
            <h2 className="display text-4xl uppercase tracking-[0.04em] md:text-5xl">
              {title}
            </h2>
          ) : (
            <>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {title}
              </p>
              <h2 className="display text-4xl md:text-5xl">Šta možete naći kod nas</h2>
            </>
          )}
        </Reveal>

        <div className="mt-12 space-y-10 md:space-y-16">
          {offers.map((offer, i) => {
            const reverse = i % 2 === 1;
            return (
              <Reveal
                key={offer.title}
                delay={0.04}
                variant={reverse ? "right" : "left"}
              >
                <article
                  className={`overflow-hidden rounded-[var(--radius-lg)] md:grid md:grid-cols-2 ${
                    bw
                      ? "border border-black/10"
                      : "border border-[var(--border)] bg-white/50"
                  } ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
                >
                  <div className="relative min-h-[280px] md:min-h-[420px]">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent md:hidden" />
                  </div>

                  <div
                    className={`flex flex-col p-6 md:p-8 lg:p-10 ${
                      bw ? "bw-panel" : ""
                    }`}
                  >
                    <p
                      className={`mb-3 text-sm leading-relaxed ${
                        bw ? "text-white/70" : "text-[var(--muted)]"
                      }`}
                    >
                      {offer.intro}
                    </p>
                    <h3 className="display text-3xl md:text-4xl">{offer.title}</h3>
                    <ul className="mt-5 flex-1 space-y-3">
                      {offer.points.map((point) => (
                        <li
                          key={point}
                          className={`flex gap-3 text-sm leading-relaxed ${
                            bw ? "text-white/85" : "text-[var(--fg)]/90"
                          }`}
                        >
                          <span
                            aria-hidden
                            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-xs ${
                              bw
                                ? "bg-white/15 text-white"
                                : "bg-[var(--accent)]/12 text-[var(--accent)]"
                            }`}
                          >
                            ✓
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/kontakt"
                      className={
                        bw
                          ? "bw-cta mt-7 inline-flex self-start uppercase tracking-wide"
                          : "btn-primary mt-7 inline-flex self-start"
                      }
                    >
                      {bw ? "Kontaktirajte nas" : "Kontaktirajte nas"}
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
