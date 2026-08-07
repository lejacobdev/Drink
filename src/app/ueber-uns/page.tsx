import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import BuyButton from "@/components/BuyButton";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Warum es VENARO gibt: weil Protein bisher nach Pflicht geschmeckt hat. Die Geschichte hinter der Dose.",
};

export default function UeberUnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Über uns</p>
        <h1 className="text-display font-display">
          Warum es
          <br />
          VENARO gibt.
        </h1>
      </Reveal>

      <div className="mt-14 space-y-10 text-lg leading-relaxed text-kreide/85">
        <Reveal>
          <p>
            Die Idee kam in einer Umkleide. Training vorbei, Hunger da, und zur
            Auswahl standen: ein Shaker mit Klümpchen vom Vortag oder ein
            Energy-Drink mit elf Gramm Zucker pro hundert Milliliter. Beides
            fühlte sich nach Kompromiss an. Beides war einer.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Also haben wir gebaut, was wir selbst kaufen wollten. Einen Drink,
            der die Arbeit nach dem Training erledigt – 20 Gramm Protein, die
            Elektrolyte, die beim Schwitzen rausgehen – und dabei schmeckt wie
            etwas, das man freiwillig trinkt. Kalt, spritzig, aus der Dose.
            Fertig.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Den Namen haben wir uns lange erarbeitet. Er sollte sich nicht nach
            Supplement-Regal anhören und nicht nach Laborprodukt, sondern nach
            etwas, das neben den großen Marken im Kühlregal stehen darf, ohne
            zu schreien. VENARO ist kein Versprechen mit Ausrufezeichen. Es ist
            einfach der Name auf der Dose, die hält, was sie verspricht.
          </p>
        </Reveal>
        <Reveal>
          <p>
            Wir sind ein kleines Team aus Deutschland und wollen dahin, wo du
            sowieso bist: ins Kühlregal deines Supermarkts, nicht in einen
            weiteren Onlineshop mit Rabatt-Countdown. Bis es soweit ist, halten
            wir dich auf dem Laufenden.
          </p>
        </Reveal>
      </div>

      <Reveal className="mt-14 flex flex-wrap gap-3">
        <BuyButton />
        <Link
          href="/produkte"
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-salbei hover:text-salbei"
        >
          Sorten ansehen
        </Link>
      </Reveal>
    </div>
  );
}
