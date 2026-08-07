import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FaqAccordion, { landingFaq, type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Alle Fragen zu VENARO: Inhaltsstoffe, Wirkung, Verfügbarkeit, Lagerung.",
};

const extraFaq: FaqItem[] = [
  {
    q: "Für wen ist VENARO gedacht",
    a: "Für alle, die trainieren, Sport machen oder einfach mehr Protein wollen, ohne Pulver anzurühren. Kein Nischen-Supplement, sondern ein Drink fürs Kühlregal.",
  },
  {
    q: "Wann trinke ich VENARO am besten",
    a: "Klassisch direkt nach dem Training, wenn Muskeln Protein und der Körper Elektrolyte brauchen. Funktioniert aber genauso in der Mittagspause oder nach dem Radweg zur Uni.",
  },
  {
    q: "Ist VENARO vegan",
    a: "Nein. Wir setzen auf Milchprotein-Isolat, weil es sich am besten löst und komplett schmeckt. Eine pflanzliche Variante prüfen wir.",
  },
  {
    q: "Muss VENARO gekühlt werden",
    a: "Ungeöffnet nein, kühl und dunkel reicht. Kalt schmeckt VENARO allerdings deutlich besser. Geöffnet gehört die Dose in den Kühlschrank und innerhalb von 24 Stunden geleert.",
  },
  {
    q: "Ist VENARO für Schwangere geeignet",
    a: "VENARO enthält kein Koffein und keinen Alkohol. Bei Unsicherheiten gilt trotzdem: kurz mit Ärztin oder Arzt sprechen, das ist keine medizinische Beratung.",
  },
  {
    q: "Was passiert mit der Dose danach",
    a: "Aluminium, gehört in den Pfandkreislauf. 25 Cent Pfand zurück und das Material bleibt im Umlauf.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">FAQ</p>
        <h1 className="text-display font-display">Fragen, Antworten.</h1>
      </Reveal>
      <Reveal delay={120} className="mt-12">
        <FaqAccordion items={[...landingFaq, ...extraFaq]} />
      </Reveal>
    </div>
  );
}
