"use client";

import Link from "next/link";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import StaticCan from "@/components/StaticCan";
import { flavours } from "@/lib/flavours";
import { track } from "@/lib/analytics";

/**
 * Flavour-Umschalter: Klick animiert Akzentfarbe, Dose und Headline
 * über eine CSS-Variable auf Sektionsebene.
 */
export default function FlavourSwitcher() {
  const [active, setActive] = useState(0);
  const flavour = flavours[active];

  function switchTo(i: number) {
    setActive(i);
    track({ name: "flavour_switch", props: { flavour: flavours[i].slug } });
  }

  return (
    <section
      className="accent-transition relative overflow-hidden py-24 md:py-40"
      style={{ "--accent": flavour.farbe } as React.CSSProperties}
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500"
        style={{
          background: `radial-gradient(circle, ${flavour.farbe}24 0%, transparent 62%)`,
        }}
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-micro mb-4 text-muted">Drei Sorten, ein Versprechen</p>
          <h2
            key={flavour.slug}
            className="text-h2 font-display transition-colors duration-500"
            style={{ color: flavour.farbe }}
          >
            {flavour.name}
          </h2>
          <p className="mt-3 max-w-md text-muted">{flavour.claim}</p>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <div key={`can-${flavour.slug}`} className="can-in mx-auto">
            <StaticCan flavour={flavour} className="h-[52vh] max-h-[520px] w-auto" />
          </div>

          <div>
            <div className="flex flex-col gap-3" role="tablist" aria-label="Sorte wählen">
              {flavours.map((f, i) => (
                <button
                  key={f.slug}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => switchTo(i)}
                  className={`group flex items-center justify-between rounded-card border p-5 text-left transition-all duration-300 ${
                    i === active
                      ? "border-white/30 bg-asphalt"
                      : "border-white/10 bg-transparent hover:border-white/25"
                  }`}
                >
                  <span>
                    <span className="block font-display text-2xl uppercase leading-none">
                      {f.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">{f.claim}</span>
                  </span>
                  <span
                    aria-hidden
                    className="h-4 w-4 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: f.farbe }}
                  />
                </button>
              ))}
            </div>
            <Link
              href={`/produkt/${flavour.slug}`}
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-wide underline-offset-4 transition hover:underline"
              style={{ color: flavour.farbe }}
            >
              Alles über {flavour.kurzname}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
