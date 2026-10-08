"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { assets } from "@/lib/assets";
import { brand, navLinks } from "@/lib/content";
import { isBwRoute } from "@/components/BodyTheme";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [mobileOfferOpen, setMobileOfferOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const bw = isBwRoute(pathname);
  const logoSrc = bw ? assets.logoBw : assets.logo;
  const isHome = pathname === "/";
  const onHero = isHome && !scrolled && !open;
  const lightNav = onHero || bw;
  const solidBar = bw || !isHome || scrolled || open;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openOffer = () => {
    clearCloseTimer();
    setOfferOpen(true);
  };

  const scheduleCloseOffer = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOfferOpen(false), 180);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOfferOpen(false);
    setMobileOfferOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!offerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOfferOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      if (!offerRef.current?.contains(e.target as Node)) setOfferOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onPointer);
    };
  }, [offerOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-all duration-300 ${
          bw
            ? "border-b border-white/10 bg-black"
            : solidBar
              ? "border-b border-[var(--border)] bg-[rgba(238,241,242,0.92)] backdrop-blur-xl"
              : "bg-transparent"
        }`}
      >
        <div
          className={`container-page flex items-center justify-between gap-4 transition-all duration-300 ${
            solidBar ? "py-3" : "py-5"
          }`}
        >
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src={logoSrc}
              alt={`${brand.fullName} logo`}
              width={160}
              height={64}
              className={`h-14 w-auto object-contain transition md:h-16 ${
                onHero && !bw ? "brightness-110" : ""
              }`}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              if ("children" in link && link.children) {
                const childActive = link.children.some((c) => pathname === c.href);
                return (
                  <div
                    key={link.label}
                    ref={offerRef}
                    className="relative"
                    onMouseEnter={openOffer}
                    onMouseLeave={scheduleCloseOffer}
                  >
                    <button
                      type="button"
                      aria-expanded={offerOpen}
                      aria-haspopup="menu"
                      onClick={() => setOfferOpen((v) => !v)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                        childActive || offerOpen
                          ? lightNav
                            ? "text-white"
                            : "text-[var(--accent)]"
                          : lightNav
                            ? "text-white/80 hover:text-white"
                            : "text-[var(--fg)]/75 hover:text-[var(--fg)]"
                      }`}
                    >
                      {link.label}
                      <svg
                        aria-hidden
                        viewBox="0 0 12 12"
                        className={`h-3 w-3 transition-transform duration-200 ${
                          offerOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <path d="M2.5 4.5 6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {/* Panel — bez praznine između dugmeta i menija (pt bridge) */}
                    <div
                      role="menu"
                      className={`absolute left-1/2 top-full z-50 w-[240px] -translate-x-1/2 pt-2 transition-[opacity,transform,visibility] duration-200 ease-out ${
                        offerOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-1 pointer-events-none opacity-0"
                      }`}
                    >
                      <div
                        className={`overflow-hidden rounded-2xl p-1.5 shadow-[0_18px_40px_rgba(14,20,18,0.14)] ${
                          bw
                            ? "border border-white/15 bg-black"
                            : "border border-[rgba(196,30,92,0.12)] bg-white/95 backdrop-blur-xl"
                        }`}
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            className={`block rounded-xl px-3.5 py-2.5 text-sm transition ${
                              bw
                                ? pathname === child.href
                                  ? "bg-white/10 font-semibold text-white"
                                  : "text-white/80 hover:bg-white/10 hover:text-white"
                                : pathname === child.href
                                  ? "bg-[var(--accent)]/10 font-semibold text-[var(--accent)]"
                                  : "text-[var(--fg)]/85 hover:bg-[var(--accent)]/8 hover:text-[var(--fg)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                    pathname === link.href
                      ? lightNav
                        ? "text-white"
                        : "text-[var(--accent)]"
                      : lightNav
                        ? "text-white/80 hover:text-white"
                        : "text-[var(--fg)]/75 hover:text-[var(--fg)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/kontakt"
              className={`btn-primary hidden !px-4 !py-2.5 text-sm md:inline-flex ${
                onHero && !bw
                  ? "!bg-white !text-[var(--fg)] hover:!bg-white/90"
                  : bw
                    ? "!bg-white !text-black hover:!bg-white/90"
                    : ""
              }`}
            >
              Kontakt
            </Link>
            <button
              type="button"
              aria-label={open ? "Zatvori meni" : "Otvori meni"}
              className={`rounded-lg p-2.5 lg:hidden ${
                lightNav
                  ? "bg-white/10 text-white"
                  : "surface text-[var(--fg)]"
              }`}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full bg-current transition ${
                    open ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] h-0.5 w-full bg-current transition ${
                    open ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] h-0.5 w-full bg-current transition ${
                    open ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {open && (
          <div className="container-page pb-4 lg:hidden">
            <div
              className={`rounded-xl p-3 ${
                bw ? "border border-white/15 bg-black" : "surface-strong"
              }`}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  if ("children" in link && link.children) {
                    return (
                      <div key={link.label}>
                        <button
                          type="button"
                          aria-expanded={mobileOfferOpen}
                          onClick={() => setMobileOfferOpen((v) => !v)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm font-medium ${
                            bw
                              ? "text-white/90 hover:bg-white/10"
                              : "hover:bg-black/5"
                          }`}
                        >
                          {link.label}
                          <svg
                            aria-hidden
                            viewBox="0 0 12 12"
                            className={`h-3.5 w-3.5 transition-transform duration-200 ${
                              mobileOfferOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          >
                            <path
                              d="M2.5 4.5 6 8l3.5-3.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-250 ease-out ${
                            mobileOfferOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div
                              className={`mb-1 ml-2 flex flex-col gap-0.5 border-l pl-3 ${
                                bw ? "border-white/15" : "border-[var(--border)]"
                              }`}
                            >
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                                    bw
                                      ? pathname === child.href
                                        ? "bg-white/10 text-white"
                                        : "text-white/80"
                                      : pathname === child.href
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--fg)]/80"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`rounded-lg px-3 py-3 text-sm font-medium ${
                        bw
                          ? "text-white/90 hover:bg-white/10"
                          : "hover:bg-black/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
