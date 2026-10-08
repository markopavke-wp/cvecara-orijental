import Link from "next/link";
import { Reveal } from "./Reveal";
import { howSteps, type HowStep } from "@/lib/content";

type Props = {
  heading?: string;
  steps?: HowStep[];
  /** Crno-beli paneli kao na live /program-za-saucesce */
  tone?: "default" | "bw";
};

export function HowItWorks({
  heading = "Na koji način do buketa?",
  steps = howSteps,
  tone = "default",
}: Props) {
  const bw = tone === "bw";

  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <h2 className="display text-4xl md:text-5xl">{heading}</h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} variant="scale">
              <div
                className={`relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-7 ${
                  bw
                    ? "bw-panel"
                    : "border border-[var(--border)] bg-white/55"
                }`}
              >
                <span
                  className={`display absolute -right-1 -top-3 text-7xl ${
                    bw ? "text-white/15" : "text-[var(--accent)]/15"
                  }`}
                >
                  {i + 1}
                </span>
                <h3 className="relative display text-2xl">{step.title}</h3>
                <p
                  className={`relative mt-3 flex-1 text-sm leading-relaxed ${
                    bw ? "text-white/70" : "text-[var(--muted)]"
                  }`}
                >
                  {step.text}
                </p>
                {step.cta && (
                  <Link
                    href={step.cta.href}
                    className={
                      bw
                        ? "bw-cta relative mt-6 self-start"
                        : "relative mt-5 inline-flex text-sm font-semibold text-[var(--accent)]"
                    }
                  >
                    {step.cta.label}
                    {!bw && " →"}
                  </Link>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
