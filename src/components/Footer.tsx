"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isBwRoute } from "@/components/BodyTheme";
import { assets } from "@/lib/assets";
import { brand, locations, navLinks, social } from "@/lib/content";

export function Footer() {
  const pathname = usePathname();
  const bw = isBwRoute(pathname);
  const offerItem = navLinks.find(
    (l): l is Extract<(typeof navLinks)[number], { children: unknown }> =>
      "children" in l,
  );
  const offerLinks = offerItem?.children ?? [];

  return (
    <footer
      className={`mt-auto border-t ${
        bw
          ? "border-black bg-black text-white"
          : "site-footer border-[rgba(196,30,92,0.12)] text-[var(--fg)]"
      }`}
    >
      <div className="container-page section-pad !pb-8">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Image
              src={bw ? assets.logoBw : assets.logo}
              alt={brand.fullName}
              width={240}
              height={96}
              className="mb-6 h-20 w-auto object-contain md:h-24"
            />
            <p
              className={`display text-4xl md:text-5xl ${
                bw ? "text-white" : "text-[var(--fg)]"
              }`}
            >
              {brand.name}
            </p>
            <p
              className={`mt-2 text-base font-light ${
                bw ? "text-white/60" : "text-[var(--muted)]"
              }`}
            >
              {brand.tagline} · {brand.city}
            </p>
            <p
              className={`mt-5 max-w-sm text-sm leading-relaxed ${
                bw ? "text-white/55" : "text-[var(--muted)]"
              }`}
            >
              Porodična cvećara sa tradicijom. Tri lokacije u Nišu — uvek blizu
              vas, uz sveže cveće i brzu izradu.
            </p>
          </div>

          <div>
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
                bw ? "text-white/40" : "text-[var(--accent)]"
              }`}
            >
              Navigacija
            </p>
            <ul
              className={`space-y-2.5 text-sm ${
                bw ? "text-white/75" : "text-[var(--fg)]/75"
              }`}
            >
              <li>
                <Link
                  href="/"
                  className={`transition ${
                    bw ? "hover:text-white" : "hover:text-[var(--accent)]"
                  }`}
                >
                  Početna
                </Link>
              </li>
              {offerLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`transition ${
                      bw ? "hover:text-white" : "hover:text-[var(--accent)]"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/novo-groblje"
                  className={`transition ${
                    bw ? "hover:text-white" : "hover:text-[var(--accent)]"
                  }`}
                >
                  Cvećara Novo Groblje
                </Link>
              </li>
              <li>
                <Link
                  href="/o-nama"
                  className={`transition ${
                    bw ? "hover:text-white" : "hover:text-[var(--accent)]"
                  }`}
                >
                  O Nama
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className={`transition ${
                    bw ? "hover:text-white" : "hover:text-[var(--accent)]"
                  }`}
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p
              className={`mb-4 text-xs font-semibold uppercase tracking-[0.2em] ${
                bw ? "text-white/40" : "text-[var(--accent)]"
              }`}
            >
              Lokacije
            </p>
            <ul
              className={`space-y-4 text-sm ${
                bw ? "text-white/70" : "text-[var(--muted)]"
              }`}
            >
              {locations.map((loc) => (
                <li key={loc.name}>
                  <p
                    className={`font-medium ${
                      bw ? "text-white/90" : "text-[var(--fg)]"
                    }`}
                  >
                    {loc.name}
                  </p>
                  <a
                    href={`tel:${loc.tel}`}
                    className={`transition ${
                      bw
                        ? "hover:text-white"
                        : "text-[var(--accent)] hover:text-[var(--accent-deep)]"
                    }`}
                  >
                    {loc.phone}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col gap-3 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between ${
            bw
              ? "border-white/10 text-white/40"
              : "border-[rgba(196,30,92,0.14)] text-[var(--muted)]"
          }`}
        >
          <p>Copyright © {brand.fullName}</p>
          <div className="flex gap-5">
            <a
              href={social.facebook}
              className={`transition ${
                bw ? "hover:text-white" : "hover:text-[var(--accent)]"
              }`}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href={social.instagram}
              className={`transition ${
                bw ? "hover:text-white" : "hover:text-[var(--accent)]"
              }`}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
