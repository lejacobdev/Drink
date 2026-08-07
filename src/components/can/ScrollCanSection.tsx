"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import StaticCan from "@/components/StaticCan";
import { flavours, PRO_DOSE } from "@/lib/flavours";
import { useScrollProgress } from "./useScrollProgress";

const CanStage = dynamic(() => import("./CanStage"), {
  ssr: false,
  loading: () => <StaticFallbackCan />,
});

const flavour = flavours[0];

function StaticFallbackCan() {
  return (
    <div className="flex h-full items-center justify-center">
      <StaticCan flavour={flavour} className="h-[60vh] max-h-[560px] w-auto" />
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const NUMBERS = [
  { value: PRO_DOSE.elektrolyteMg, suffix: " mg", label: "Elektrolyte" },
  { value: PRO_DOSE.zuckerG, suffix: " g", label: "Zucker" },
  { value: PRO_DOSE.kcal, suffix: "", label: "kcal" },
];

const CALLOUTS = [
  { text: "Sofort trinkfertig, kein Mixen", side: "left", top: "22%" },
  { text: "Kalium, Magnesium, Natrium", side: "right", top: "38%" },
  { text: "Null Zucker, echte Frucht", side: "left", top: "58%" },
] as const;

/** Copy-Checkpoints: [Einblenden ab, voll sichtbar bis], danach Ausblenden. */
const PHASES = {
  intro: [0, 0.22],
  callouts: [0.3, 0.52],
  numbers: [0.6, 0.8],
  cta: [0.85, 1],
} as const;

function phaseOpacity(p: number, [start, end]: readonly [number, number]): number {
  const fade = 0.06;
  if (p < start - fade || p > end + fade) return 0;
  if (p < start) return (p - (start - fade)) / fade;
  if (p > end && end < 1) return 1 - (p - end) / fade;
  return 1;
}

/**
 * Apple-artige Scroll-Sequenz: ~400vh Wrapper, sticky 100vh-Bühne,
 * Scrollfortschritt 0–1 treibt Rotation + Copy-Checkpoints.
 * Bei reduced motion oder Perf-Problemen: statische Dose, Copy gestapelt.
 */
export default function ScrollCanSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(wrapperRef);
  const reducedMotion = usePrefersReducedMotion();
  const [perfFailed, setPerfFailed] = useState(false);
  const onPerfFail = useCallback(() => setPerfFailed(true), []);

  const introRef = useRef<HTMLDivElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<Array<HTMLSpanElement | null>>([]);

  // Copy-Überblendungen direkt am DOM, kein setState pro Frame.
  useEffect(() => {
    if (reducedMotion || perfFailed) return;
    const apply = (p: number) => {
      const set = (el: HTMLElement | null, phase: readonly [number, number]) => {
        if (!el) return;
        const o = phaseOpacity(p, phase);
        el.style.opacity = String(o);
        el.style.pointerEvents = o > 0.5 ? "auto" : "none";
      };
      set(introRef.current, PHASES.intro);
      set(calloutsRef.current, PHASES.callouts);
      set(numbersRef.current, PHASES.numbers);
      set(ctaRef.current, PHASES.cta);

      // Zähler laufen mit dem Scrollfortschritt hoch
      const t = Math.min(1, Math.max(0, (p - PHASES.numbers[0]) / 0.14));
      NUMBERS.forEach((n, i) => {
        const el = counterRefs.current[i];
        if (el) el.textContent = Math.round(n.value * t) + n.suffix;
      });
    };
    apply(progress.get());
    return progress.subscribe(apply);
  }, [progress, reducedMotion, perfFailed]);

  const staticMode = reducedMotion || perfFailed;

  if (staticMode) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <StaticCan flavour={flavour} className="mx-auto h-[60vh] max-h-[560px] w-auto" />
          <div className="space-y-10">
            <div>
              <h2 className="font-display text-h2">Eine Dose. Ein Deal.</h2>
              <p className="mt-3 max-w-md text-muted">
                Alles, was dein Training braucht. Nichts, was es bremst.
              </p>
            </div>
            <ul className="space-y-3 text-kreide/90">
              {CALLOUTS.map((c) => (
                <li key={c.text} className="border-l-2 border-sodalith pl-4">{c.text}</li>
              ))}
            </ul>
            <dl className="grid grid-cols-3 gap-6">
              {NUMBERS.map((n) => (
                <div key={n.label}>
                  <dd className="font-display text-4xl text-sodalith">
                    {n.value}
                    {n.suffix}
                  </dd>
                  <dt className="text-micro mt-1 text-muted">{n.label}</dt>
                </div>
              ))}
            </dl>
            <Link
              href="/wo-kaufen"
              className="inline-flex rounded-full bg-sodalith px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110"
            >
              Wo kaufen
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={wrapperRef} className="relative h-[400vh]" aria-label="Die Dose im Detail">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Glow hinter der Dose */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, ${flavour.farbe}26 0%, transparent 65%)`,
          }}
        />
        <div className="absolute inset-0">
          <CanStage progress={progress} flavour={flavour} turns={1.5} onPerfFail={onPerfFail} />
        </div>

        {/* Checkpoint 0.00 – Headline */}
        <div
          ref={introRef}
          className="pointer-events-none absolute inset-x-0 top-[12vh] text-center transition-opacity duration-150"
        >
          <h2 className="font-display text-h2">Eine Dose. Ein Deal.</h2>
          <p className="mt-3 text-muted">Scroll. Wir zeigen dir alles.</p>
        </div>

        {/* Checkpoint 0.30 – Zutaten-Callouts, an der Dose verankert */}
        <div ref={calloutsRef} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150">
          {CALLOUTS.map((c) => (
            <div
              key={c.text}
              className={`absolute hidden max-w-[220px] md:block ${
                c.side === "left" ? "right-[58%] text-right" : "left-[58%] text-left"
              }`}
              style={{ top: c.top }}
            >
              <p className="text-sm font-medium text-kreide">{c.text}</p>
              <div
                aria-hidden
                className={`mt-2 h-px w-24 bg-kreide/40 ${
                  c.side === "left" ? "ml-auto" : ""
                }`}
              />
            </div>
          ))}
          <div className="absolute inset-x-0 bottom-[10vh] text-center md:hidden">
            {CALLOUTS.map((c) => (
              <p key={c.text} className="text-sm text-kreide/90">{c.text}</p>
            ))}
          </div>
        </div>

        {/* Checkpoint 0.60 – Nährwerte zählen hoch */}
        <div
          ref={numbersRef}
          className="pointer-events-none absolute inset-x-0 bottom-[8vh] opacity-0 transition-opacity duration-150"
        >
          <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-6 px-5 text-center">
            {NUMBERS.map((n, i) => (
              <div key={n.label}>
                <dd
                  className="font-display text-4xl text-sodalith md:text-5xl"
                >
                  <span ref={(el) => { counterRefs.current[i] = el; }}>0{n.suffix}</span>
                </dd>
                <dt className="text-micro mt-1 text-muted">{n.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* Checkpoint 0.85 – CTA */}
        <div
          ref={ctaRef}
          className="pointer-events-none absolute inset-x-0 top-[14vh] text-center opacity-0 transition-opacity duration-150"
        >
          <h2 className="font-display text-h2">Überzeugt</h2>
          <Link
            href="/wo-kaufen"
            className="mt-6 inline-flex rounded-full bg-sodalith px-8 py-4 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110"
          >
            Wo kaufen
          </Link>
        </div>
      </div>
    </section>
  );
}
