import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./Reveal";

type OfferCardProps = {
  title: string;
  text: string;
  href: string;
  image: string;
  index?: number;
  /** Kada je parent Stagger, ne dupliraj Reveal */
  staggerChild?: boolean;
};

export function OfferCard({
  title,
  text,
  href,
  image,
  index = 0,
  staggerChild = false,
}: OfferCardProps) {
  const card = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-white/55 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(14,20,18,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(14,20,18,0.55)] to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="display text-2xl text-[var(--fg)] md:text-[1.7rem]">{title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
          {text}
        </p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] transition group-hover:gap-3"
        >
          Saznaj više
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );

  if (staggerChild) {
    return <div className="h-full">{card}</div>;
  }

  return (
    <Reveal delay={index * 0.08} className="h-full">
      {card}
    </Reveal>
  );
}
