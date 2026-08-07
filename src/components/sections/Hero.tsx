import Link from "next/link";
import Reveal from "@/components/Reveal";
import StaticCan from "@/components/StaticCan";
import BuyButton from "@/components/BuyButton";
import { flavours } from "@/lib/flavours";

const stats = [
  { value: "20 g", label: "Protein" },
  { value: "500 mg", label: "Elektrolyte" },
  { value: "0 g", label: "Zucker" },
  { value: "105", label: "kcal" },
];

export default function Hero() {
  const flavour = flavours[0];
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-24">
      {/* Radialer Glow hinter der Dose */}
      <div
        aria-hidden
        className="absolute right-[8%] top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 animate-pulseGlow rounded-full"
        style={{
          background: `radial-gradient(circle, ${flavour.farbe}2e 0%, transparent 62%)`,
        }}
      />

      {/* Dose rechts */}
      <Reveal
        delay={200}
        className="pointer-events-none absolute right-[4%] top-1/2 hidden -translate-y-1/2 md:block"
      >
        <StaticCan flavour={flavour} className="h-[68vh] max-h-[640px] w-auto" />
      </Reveal>

      <div className="relative mx-auto w-full max-w-[100rem] px-3 md:px-6">
        <Reveal>
          <h1 className="text-display font-display">
            Schmeckt wie
            <br />
            ein Drink.
            <br />
            <span className="text-salbei">Wirkt wie ein Plan.</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 max-w-md px-1 text-lg text-kreide/80 md:px-2">
            Elektrolyte und 20 g Protein, fertig gemixt in der Dose. Kein Pulver,
            kein Shaker, kein Zucker.
          </p>
        </Reveal>

        {/* Dose mobil */}
        <Reveal delay={200} className="mt-8 md:hidden">
          <StaticCan flavour={flavour} className="mx-auto h-[42vh] w-auto" />
        </Reveal>

        <Reveal delay={240} className="mt-8 flex flex-wrap gap-3 px-1 md:px-2">
          <BuyButton />
          <Link
            href="/produkte"
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-salbei hover:text-salbei"
          >
            Sorten ansehen
          </Link>
        </Reveal>

        {/* Stat-Zeile unten */}
        <Reveal delay={320} className="mt-14 border-t border-white/10 py-6 md:mt-20">
          <dl className="grid grid-cols-2 gap-6 px-1 sm:grid-cols-4 md:px-2">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dd className="font-display text-2xl text-kreide">{s.value}</dd>
                <dt className="text-micro text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
