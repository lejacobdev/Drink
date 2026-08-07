import type { Metadata } from "next";
import RetailerPicker from "@/components/retailer/RetailerPicker";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Wo kaufen",
  description:
    "Hier findest du PAKT im Handel. PLZ eingeben, Händler in der Nähe sehen oder Bescheid bekommen, sobald wir bei dir im Regal stehen.",
};

export default function WoKaufenPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Wo kaufen</p>
        <h1 className="text-display font-display">Ab ins Regal.</h1>
        <p className="mt-4 max-w-lg text-lg text-kreide/80">
          PAKT verkauft nicht direkt. Du bekommst uns da, wo du sowieso einkaufst
          – im Supermarkt, in der Drogerie oder per Lieferdienst.
        </p>
      </Reveal>
      <Reveal delay={150} className="mt-12">
        <RetailerPicker variant="page" />
      </Reveal>
    </div>
  );
}
