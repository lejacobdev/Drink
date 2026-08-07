import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import StaticCan from "@/components/StaticCan";
import BuyButton from "@/components/BuyButton";
import { flavours, getFlavour, formatEuro, PRO_DOSE } from "@/lib/flavours";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return flavours.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const flavour = getFlavour(params.slug);
  if (!flavour) return {};
  return {
    title: `${flavour.name}`,
    description: `VENARO ${flavour.name}: ${flavour.claim} 20 g Protein und 500 mg Elektrolyte pro Dose, null Zucker.`,
  };
}

export default function ProduktPage({ params }: Props) {
  const flavour = getFlavour(params.slug);
  if (!flavour) notFound();

  const n = flavour.naehrwerte;
  const naehrwertRows: Array<[string, string]> = [
    ["Energie", `${n.energieKj} kJ / ${n.energieKcal} kcal`],
    ["Fett", n.fett],
    ["– davon gesättigte Fettsäuren", n.gesaettigt],
    ["Kohlenhydrate", n.kohlenhydrate],
    ["– davon Zucker", n.zucker],
    ["Eiweiß", n.eiweiss],
    ["Salz", n.salz],
    ["Kalium", `${n.kalium} (${n.kaliumNrv} NRV*)`],
    ["Magnesium", `${n.magnesium} (${n.magnesiumNrv} NRV*)`],
  ];

  return (
    <div className="pt-16">
      {/* Produkt-Hero */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${flavour.farbe}1c 0%, transparent 65%)`,
        }}
      >
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <Reveal>
            <StaticCan flavour={flavour} className="mx-auto h-[55vh] max-h-[560px] w-auto" />
          </Reveal>
          <div>
            <Reveal>
              <p className="text-micro mb-4" style={{ color: flavour.farbe }}>
                {flavour.kategorie} · {flavour.nettofuellmenge}
              </p>
              <h1 className="text-display font-display" style={{ color: flavour.farbe }}>
                {flavour.name}
              </h1>
              <p className="mt-4 max-w-md text-lg text-kreide/80">{flavour.beschreibung}</p>
            </Reveal>
            <Reveal delay={120} className="mt-8 flex flex-wrap items-center gap-4">
              <BuyButton />
              <div className="text-sm text-muted">
                <p>
                  UVP {formatEuro(flavour.uvp)} · Grundpreis{" "}
                  {formatEuro(flavour.grundpreisPro100ml)} / 100 ml
                </p>
              </div>
            </Reveal>
            <Reveal delay={200} className="mt-10 grid max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                [`${PRO_DOSE.protein} g`, "Protein"],
                [`${PRO_DOSE.elektrolyteMg} mg`, "Elektrolyte"],
                [`${PRO_DOSE.zuckerG} g`, "Zucker"],
                [`${PRO_DOSE.kcal}`, "kcal"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-kreide">{v}</p>
                  <p className="text-micro mt-1 text-muted">{l}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* LMIV-Pflichtangaben */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal>
          <h2 className="text-h2 font-display">Was drin ist. Komplett.</h2>
          <p className="mt-3 max-w-lg text-muted">
            Volle Deklaration nach Lebensmittelinformationsverordnung. Keine
            Sternchen-Tricks, ein Sternchen nur für die Referenzmenge.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal delay={100}>
            <h3 className="text-micro mb-4 text-muted">Zutatenverzeichnis</h3>
            <p className="max-w-xl leading-relaxed text-kreide/90">
              {flavour.zutaten.map((z, i) => (
                <span key={z.name}>
                  {z.allergen ? (
                    <strong className="font-bold text-kreide">{z.name}</strong>
                  ) : (
                    z.name
                  )}
                  {i < flavour.zutaten.length - 1 ? ", " : "."}
                </span>
              ))}
            </p>
            <p className="mt-4 text-sm text-muted">
              Allergene sind <strong className="text-kreide">hervorgehoben</strong>.
              Enthält <strong className="text-kreide">Milch</strong> und daraus
              gewonnene Erzeugnisse.
            </p>

            <div className="mt-10 space-y-3 text-sm text-kreide/90">
              <p>
                <span className="text-muted">Nettofüllmenge:</span>{" "}
                {flavour.nettofuellmenge}
              </p>
              <p>
                <span className="text-muted">Grundpreis (PAngV):</span>{" "}
                {formatEuro(flavour.grundpreisPro100ml)} / 100 ml bei UVP{" "}
                {formatEuro(flavour.uvp)} pro Dose
              </p>
              <p>
                <span className="text-muted">Aufbewahrung:</span> Kühl und dunkel
                lagern, geöffnet im Kühlschrank aufbewahren und innerhalb von 24
                Stunden verbrauchen.
              </p>
              <p>
                <span className="text-muted">Hersteller:</span> [PLATZHALTER:
                Firmenname und Anschrift des Lebensmittelunternehmers]
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <h3 className="text-micro mb-4 text-muted">Nährwerte pro 100 ml</h3>
            <table className="w-full border-collapse text-sm">
              <tbody>
                {naehrwertRows.map(([label, value]) => (
                  <tr key={label} className="border-b border-white/10">
                    <th scope="row" className="py-3 pr-4 text-left font-normal text-kreide/90">
                      {label}
                    </th>
                    <td className="py-3 text-right text-kreide">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-xs text-muted">
              *NRV: Referenzmenge für die tägliche Zufuhr nach LMIV. Eine Dose
              enthält {PRO_DOSE.volumenMl} ml.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Andere Sorten */}
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <Reveal>
          <h2 className="font-display text-3xl uppercase">Auch im Regal</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {flavours
            .filter((f) => f.slug !== flavour.slug)
            .map((f, i) => (
              <Reveal key={f.slug} delay={i * 100}>
                <Link
                  href={`/produkt/${f.slug}`}
                  className="flex items-center gap-5 rounded-card border border-white/10 bg-asphalt p-5 transition hover:border-white/30"
                >
                  <StaticCan flavour={f} className="h-28 w-auto" />
                  <span>
                    <span className="block font-display text-2xl uppercase leading-none">
                      {f.name}
                    </span>
                    <span className="mt-1.5 block text-sm text-muted">{f.claim}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
        </div>
      </section>
    </div>
  );
}
