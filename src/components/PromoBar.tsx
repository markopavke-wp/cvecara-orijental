"use client";

import Link from "next/link";
import { useState } from "react";
import { Reveal } from "./Reveal";

type Props = {
  text: string;
  href?: string;
  cta?: string;
};

export function PromoBar({
  text,
  href = "/buketi",
  cta = "Pogledaj",
}: Props) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Reveal className="container-page my-2">
      <div className="promo-bar flex flex-col items-start justify-between gap-4 rounded-[var(--radius)] border border-[rgba(196,30,92,0.16)] px-5 py-4 sm:flex-row sm:items-center">
        <p className="text-sm text-[var(--fg)]/85 md:text-base">{text}</p>
        <div className="flex items-center gap-3">
          <Link href={href} className="btn-primary !px-4 !py-2.5 text-sm">
            {cta}
          </Link>
          <button
            type="button"
            aria-label="Zatvori"
            onClick={() => setVisible(false)}
            className="rounded-lg bg-[var(--accent)]/10 px-3 py-2 text-sm text-[var(--accent-deep)] transition hover:bg-[var(--accent)]/18"
          >
            ✕
          </button>
        </div>
      </div>
    </Reveal>
  );
}
