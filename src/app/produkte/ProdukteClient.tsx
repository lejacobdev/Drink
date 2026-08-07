"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Reveal from "@/components/Reveal";
import StaticCan from "@/components/StaticCan";
import { flavours } from "@/lib/flavours";

const categories = ["Alle", "Zitrus", "Beere", "Tropisch"] as const;
type Category = (typeof categories)[number];

export default function ProdukteClient() {
  const [filter, setFilter] = useState<Category>("Alle");

  const list = useMemo(
    () => flavours.filter((f) => filter === "Alle" || f.kategorie === filter),
    [filter]
  );

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Produkte</p>
        <h1 className="text-display font-display">Drei Sorten.</h1>
        <p className="mt-4 max-w-md text-lg text-kreide/80">
          Gleicher Deal in jeder Dose: 20 g Protein, 500 mg Elektrolyte, null
          Zucker. Nur der Geschmack streitet.
        </p>
      </Reveal>

      <Reveal delay={120} className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
              filter === c
                ? "border-salbei bg-salbei text-kohle"
                : "border-white/20 text-kreide hover:border-salbei hover:text-salbei"
            }`}
          >
            {c}
          </button>
        ))}
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((f, i) => (
          <Reveal key={f.slug} delay={i * 100}>
            <Link
              href={`/produkt/${f.slug}`}
              className="group block overflow-hidden rounded-card border border-white/10 bg-asphalt transition hover:border-white/30"
            >
              <div
                className="relative flex justify-center px-6 pb-2 pt-8 transition-colors duration-500"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${f.farbe}1f 0%, transparent 70%)`,
                }}
              >
                <StaticCan
                  flavour={f}
                  className="h-72 w-auto transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-1"
                />
              </div>
              <div className="p-6">
                <p className="text-micro mb-2" style={{ color: f.farbe }}>
                  {f.kategorie}
                </p>
                <h2 className="font-display text-3xl uppercase leading-none">{f.name}</h2>
                <p className="mt-2 text-sm text-muted">{f.claim}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
