import { Check, Minus, X } from "lucide-react";
import Reveal from "@/components/Reveal";

type Cell = { kind: "yes" | "no" | "mid"; text: string };

const rows: { label: string; pakt: Cell; shake: Cell; energy: Cell }[] = [
  {
    label: "Protein",
    pakt: { kind: "yes", text: "20 g, trinkfertig" },
    shake: { kind: "mid", text: "20–30 g, erst mixen" },
    energy: { kind: "no", text: "0 g" },
  },
  {
    label: "Elektrolyte",
    pakt: { kind: "yes", text: "Kalium, Magnesium, Natrium" },
    shake: { kind: "no", text: "kaum" },
    energy: { kind: "mid", text: "wenn, dann homöopathisch" },
  },
  {
    label: "Zucker",
    pakt: { kind: "yes", text: "0 g" },
    shake: { kind: "mid", text: "je nach Pulver" },
    energy: { kind: "no", text: "bis 11 g pro 100 ml" },
  },
  {
    label: "Kalorien pro Portion",
    pakt: { kind: "yes", text: "105 kcal" },
    shake: { kind: "mid", text: "150–250 kcal" },
    energy: { kind: "no", text: "ca. 230 kcal" },
  },
  {
    label: "Geschmack",
    pakt: { kind: "yes", text: "Drink, kein Kompromiss" },
    shake: { kind: "no", text: "sandiger Vanille-Frust" },
    energy: { kind: "mid", text: "süß bis betäubend" },
  },
  {
    label: "Shaker nötig",
    pakt: { kind: "yes", text: "nein" },
    shake: { kind: "no", text: "ja, und er müffelt" },
    energy: { kind: "yes", text: "nein" },
  },
];

function CellIcon({ kind }: { kind: Cell["kind"] }) {
  if (kind === "yes") return <Check className="h-4 w-4 shrink-0 text-sodalith" aria-hidden />;
  if (kind === "no") return <X className="h-4 w-4 shrink-0 text-beere" aria-hidden />;
  return <Minus className="h-4 w-4 shrink-0 text-muted" aria-hidden />;
}

export default function ComparisonTable() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Der Vergleich</p>
        <h2 className="text-h2 font-display">
          Kein Shake.
          <br />
          Kein Energy.
        </h2>
      </Reveal>

      <Reveal delay={120} className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-white/15">
              <th className="py-4 pr-4 font-normal text-muted"> </th>
              <th className="px-4 py-4">
                <span className="font-display text-xl text-sodalith">sodaLYTE</span>
              </th>
              <th className="px-4 py-4 font-medium text-kreide/80">Protein-Shake</th>
              <th className="px-4 py-4 font-medium text-kreide/80">Energy-Drink</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-white/5">
                <th scope="row" className="py-4 pr-4 font-medium text-kreide">
                  {row.label}
                </th>
                {[row.pakt, row.shake, row.energy].map((cell, i) => (
                  <td key={i} className={`px-4 py-4 ${i === 0 ? "bg-white/[0.03]" : ""}`}>
                    <span className="flex items-center gap-2 text-kreide/80">
                      <CellIcon kind={cell.kind} />
                      {cell.text}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
      <p className="mt-4 text-xs text-muted">
        Vergleichswerte: marktübliche Produkte, Stand der Rezepturen 2026. Zucker unter
        0,5 g pro 100 ml gilt lebensmittelrechtlich als zuckerfrei.
      </p>
    </section>
  );
}
