"use client";

import Image from "next/image";
import { assets } from "@/lib/assets";
import { social } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Stagger } from "./Stagger";

const previews = assets.galleryBuketi.slice(0, 6);

export function SocialFollow() {
  return (
    <section className="section-pad-sm pt-0 pb-10 md:pb-14">
      <div className="container-page">
        <Reveal variant="mask" feather={28}>
          <div className="social-follow overflow-hidden rounded-[var(--radius-lg)] border border-[rgba(196,30,92,0.14)]">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <Stagger
                className="grid grid-cols-3 gap-1.5 p-1.5 sm:gap-2 sm:p-2"
                stagger={0.06}
                variant="mask"
              >
                {previews.map((src, i) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden rounded-xl ${
                      i === 0 || i === 5 ? "aspect-[4/5]" : "aspect-square"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Buket sa društvenih mreža ${i + 1}`}
                      fill
                      sizes="(max-width:1024px) 33vw, 18vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </Stagger>

              <div className="flex flex-col justify-center px-7 py-8 md:px-12 md:py-10">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Društvene mreže
                </p>
                <h2 className="display max-w-md text-[clamp(2rem,4vw,3.2rem)] text-[var(--fg)]">
                  Pogledajte naše bukete na Instagramu i Facebooku
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  Svaki dan objavljujemo nove aranžmane i sveže ideje. Pratite
                  nas i inspirišite se za sledeći buket.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <InstagramIcon />
                    Instagram
                  </a>
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-ghost inline-flex items-center gap-2"
                  >
                    <FacebookIcon />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14.5 8.5V6.8c0-.7.5-1.3 1.2-1.3H17V3h-2.1C12.6 3 11 4.6 11 6.9v1.6H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
    </svg>
  );
}
