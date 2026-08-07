import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import FaqAccordion, { landingFaq, type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Alle Fragen zu sodaLYTE: Inhaltsstoffe, Wirkung, Verfügbarkeit, Lagerung.",
};

const extraFaq: FaqItem[] = [
  {
    q: "Für wen ist sodaLYTE gedacht",
    a: "Für alle, die trainieren, Sport machen oder einfach einen Elektrolyte-Drink wollen, der schmeckt. Kein Nischen-Supplement, sondern ein Drink fürs Kühlregal.",
  },
  {
    q: "Wann trinke ich sodaLYTE am besten",
    a: "Klassisch direkt nach dem Training, wenn der Körper Elektrolyte braucht. Funktioniert aber genauso in der Mittagspause oder nach dem Radweg zur Uni.",
  },
  {
    q: "Ist sodaLYTE vegan",
    a: "Ja. Ohne Milchprotein sind alle Zutaten pflanzlichen oder mineralischen Ursprungs.",
  },
  {
    q: "Muss sodaLYTE gekühlt werden",
    a: "Ungeöffnet nein, kühl und dunkel reicht. Kalt schmeckt sodaLYTE allerdings deutlich besser. Geöffnet gehört die Dose in den Kühlschrank und innerhalb von 24 Stunden geleert.",
  },
  {
    q: "Ist sodaLYTE für Schwangere geeignet",
    a: "sodaLYTE enthält kein Koffein und keinen Alkohol. Bei Unsicherheiten gilt trotzdem: kurz mit Ärztin oder Arzt sprechen, das ist keine medizinische Beratung.",
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
