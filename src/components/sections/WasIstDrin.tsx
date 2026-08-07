import Reveal from "@/components/Reveal";
import StaticCan from "@/components/StaticCan";
import { flavours } from "@/lib/flavours";

const calloutsLeft = [
  {
    title: "20 g Protein",
    text: "Milchprotein-Isolat, gelöst statt gepulvert.",
  },
  {
    title: "500 mg Elektrolyte",
    text: "Kalium, Magnesium und Natrium in Citratform.",
  },
];

const calloutsRight = [
  {
    title: "0 g Zucker",
    text: "Gesüßt mit Stevia, unter 0,5 g Zucker pro 100 ml.",
  },
  {
    title: "Echte Frucht",
    text: "Ein Prozent Saftkonzentrat, kein Farbstoff nötig.",
  },
];

function Callout({
  title,
  text,
  align,
  delay,
}: {
  title: string;
  text: string;
  align: "left" | "right";
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={align === "right" ? "md:text-right" : ""}>
      <div
        className={`border-sodalith py-1 ${
          align === "right" ? "md:border-r-2 md:pr-5" : "md:border-l-2 md:pl-5"
        } border-l-2 pl-5 md:border-l-0 md:pl-0`}
      >
        <h3 className="font-display text-xl uppercase text-kreide">{title}</h3>
        <p className="mt-1.5 text-sm text-muted">{text}</p>
      </div>
      {/* dünne Verbindungslinie zur Dose */}
      <div
        aria-hidden
        className={`mt-3 hidden h-px w-full bg-gradient-to-r md:block ${
          align === "right"
            ? "from-transparent to-kreide/30"
            : "from-kreide/30 to-transparent"
        }`}
      />
    </Reveal>
  );
}

export default function WasIstDrin() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-40">
      <Reveal>
        <p className="text-micro mb-4 text-muted">Was ist drin</p>
        <h2 className="text-h2 font-display">
          Kurze Liste.
          <br />
          Lange Wirkung.
        </h2>
      </Reveal>

      <div className="mt-14 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
        <div className="order-2 space-y-12 md:order-1">
          {calloutsLeft.map((c, i) => (
            <Callout key={c.title} {...c} align="right" delay={i * 120} />
          ))}
        </div>
        <Reveal className="order-1 md:order-2" delay={60}>
          <StaticCan
            flavour={flavours[0]}
            className="mx-auto h-[48vh] max-h-[480px] w-auto"
          />
        </Reveal>
        <div className="order-3 space-y-12">
          {calloutsRight.map((c, i) => (
            <Callout key={c.title} {...c} align="left" delay={i * 120 + 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
