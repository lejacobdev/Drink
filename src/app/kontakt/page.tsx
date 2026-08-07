import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import KontaktForm from "./KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Schreib dem sodaLYTE Team – Fragen, Feedback, Handel und Presse.",
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Kontakt</p>
        <h1 className="text-display font-display">Sag was.</h1>
        <p className="mt-4 max-w-lg text-lg text-kreide/80">
          Feedback zur Dose, Fragen zum Produkt oder du willst sodaLYTE ins Regal
          holen – schreib uns, wir lesen alles.
        </p>
      </Reveal>
      <Reveal delay={150} className="mt-12">
        <KontaktForm />
      </Reveal>
      <Reveal delay={220} className="mt-10 text-sm text-muted">
        <p>Händler- und Presseanfragen: [PLATZHALTER: handel@deine-domain.de]</p>
      </Reveal>
    </div>
  );
}
