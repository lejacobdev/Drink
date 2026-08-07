import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export const landingFaq: FaqItem[] = [
  {
    q: "Was genau ist PAKT",
    a: "Ein fertig gemixter Drink aus der Slim-Dose: 20 g Milchprotein und 500 mg Elektrolyte pro 330 ml, ohne Zucker und ohne Koffein. Gedacht für nach dem Training, den Schultag oder dazwischen.",
  },
  {
    q: "Wie viel Protein steckt in einer Dose",
    a: "20 g pro Dose, aus Milchprotein-Isolat. Das entspricht etwa der Menge aus einem klassischen Shake, nur ohne Pulverwolke und Shaker.",
  },
  {
    q: "Ist wirklich kein Zucker drin",
    a: "Pro 100 ml stecken unter 0,5 g Zucker in PAKT, das gilt lebensmittelrechtlich als zuckerfrei. Gesüßt wird mit Steviolglycosiden und Sucralose.",
  },
  {
    q: "Enthält PAKT Koffein",
    a: "Nein. PAKT ist kein Energy-Drink, sondern Regeneration. Du kannst ihn auch abends trinken, ohne bis drei Uhr an die Decke zu starren.",
  },
  {
    q: "Wo kann ich PAKT kaufen",
    a: "Wir bringen PAKT gerade in den Handel. Trag dich auf der Seite Wo kaufen ein, dann sagen wir dir Bescheid, sobald wir bei dir im Regal stehen.",
  },
];

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex items-center justify-between gap-4 py-5 text-left">
            <span className="font-display text-xl uppercase text-kreide md:text-2xl">
              {item.q}
            </span>
            <ChevronDown className="faq-chevron h-5 w-5 shrink-0 text-muted" aria-hidden />
          </summary>
          <p className="max-w-2xl pb-6 text-kreide/80">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
