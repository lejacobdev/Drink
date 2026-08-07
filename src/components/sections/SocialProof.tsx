import Reveal from "@/components/Reveal";

const testimonials = [
  {
    quote:
      "Nach dem Training direkt aus dem Kühlschrank. Ich vermisse meinen Shaker exakt null.",
    name: "Lena, 19",
    context: "Leichtathletik, Abi-Jahrgang",
  },
  {
    quote:
      "Schmeckt wie was, das man freiwillig trinkt. Bei Proteinzeug ist das leider selten.",
    name: "Malik, 22",
    context: "Gym, Lehramtsstudium",
  },
  {
    quote:
      "Limette nach dem Fußball, Beere in der Bib. Ich hab ein System, okay.",
    name: "Jonas, 24",
    context: "Kreisliga, Maschinenbau",
  },
];

const marqueeItems = [
  "Kein Pulver",
  "Kein Shaker",
  "Kein Zucker",
  "20 g Protein",
  "500 mg Elektrolyte",
  "105 kcal",
  "Aus dem Kühlregal",
];

export default function SocialProof() {
  return (
    <section className="overflow-hidden py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <p className="text-micro mb-4 text-muted">Stimmen</p>
          <h2 className="text-h2 font-display">Erst probiert, dann geblieben.</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <figure className="flex h-full flex-col justify-between rounded-card border border-white/10 bg-asphalt p-6">
                <blockquote className="text-lg leading-snug text-kreide">
                  „{t.quote}“
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-semibold text-kreide">{t.name}</p>
                  <p className="text-sm text-muted">{t.context}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Laufband */}
      <div aria-hidden className="mt-16 flex overflow-hidden border-y border-white/10 py-5">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className="font-display text-2xl uppercase text-kreide/70">{item}</span>
              <span className="h-2 w-2 rounded-full bg-sodalith" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
