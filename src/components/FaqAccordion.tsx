import { ChevronDown } from "lucide-react";

export type FaqItem = { q: string; a: string };

export const landingFaq: FaqItem[] = [
  {
    q: "Was genau ist sodaLYTE",
    a: "Ein fertig gemixter Drink aus der Slim-Dose: 500 mg Elektrolyte pro 330 ml, ohne Zucker und ohne Koffein. Gedacht für nach dem Training, den Schultag oder dazwischen.",
  },
  {
    q: "Ist sodaLYTE eine Limonade oder ein Sprudel",
    a: "Nein. sodaLYTE ist still, ohne Kohlensäure. Der Name kommt vom Mineral Sodalith – ein Stein mit viel Natrium – plus „LYTE“ für Elektrolyte, nicht von Soda-Wasser.",
  },
  {
    q: "Ist wirklich kein Zucker drin",
    a: "Pro 100 ml stecken unter 0,5 g Zucker in sodaLYTE, das gilt lebensmittelrechtlich als zuckerfrei. Gesüßt wird mit Steviolglycosiden und Sucralose.",
  },
  {
    q: "Enthält sodaLYTE Koffein",
    a: "Nein. sodaLYTE ist kein Energy-Drink, sondern Regeneration. Du kannst ihn auch abends trinken, ohne bis drei Uhr an die Decke zu starren.",
  },
  {
    q: "Wo kann ich sodaLYTE kaufen",
    a: "Wir bringen sodaLYTE gerade in den Handel. Trag dich auf der Seite Wo kaufen ein, dann sagen wir dir Bescheid, sobald wir bei dir im Regal stehen.",
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
