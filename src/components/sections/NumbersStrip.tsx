"use client";

import { useEffect, useRef } from "react";
import { PRO_DOSE } from "@/lib/flavours";

const numbers = [
  { value: PRO_DOSE.elektrolyteMg, suffix: " mg", label: "Elektrolyte" },
  { value: PRO_DOSE.zuckerG, suffix: " g", label: "Zucker" },
  { value: PRO_DOSE.kcal, suffix: "", label: "kcal pro Dose" },
];

/** Zählt die drei Kennzahlen hoch, sobald die Leiste sichtbar wird. */
export default function NumbersStrip() {
  const rootRef = useRef<HTMLDivElement>(null);
  const valueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const started = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1200;
        const t0 = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          numbers.forEach((n, i) => {
            const span = valueRefs.current[i];
            if (span) span.textContent = Math.round(n.value * eased) + n.suffix;
          });
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="border-y border-white/10 bg-asphalt/60">
      <div
        ref={rootRef}
        className="mx-auto grid max-w-7xl grid-cols-3 gap-x-6 gap-y-10 px-5 py-16 md:px-8 md:py-20"
      >
        {numbers.map((n, i) => (
          <div key={n.label} className="text-center">
            <p className="font-display text-5xl text-sodalith md:text-6xl">
              <span ref={(el) => { valueRefs.current[i] = el; }}>0{n.suffix}</span>
            </p>
            <p className="text-micro mt-2 text-muted">{n.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
