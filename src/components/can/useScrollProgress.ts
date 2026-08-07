"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

export type ScrollProgress = {
  /** aktueller Fortschritt 0–1 */
  get(): number;
  /** wird bei Änderungen aufgerufen; gibt eine Unsubscribe-Funktion zurück */
  subscribe(fn: (p: number) => void): () => void;
};

/**
 * Scroll-Treiber, bewusst vom Renderer getrennt:
 * misst den Fortschritt (0–1) eines hohen Wrappers mit sticky Stage
 * und meldet ihn per Subscription – ohne setState pro Frame.
 *
 * Der Renderer (<CanStage progress={p} />) ist austauschbar: dieselbe
 * ScrollProgress-Quelle kann später einen Bildsequenz-Scrubber treiben
 * (siehe README, Abschnitt "3D gegen Bildsequenz tauschen").
 */
export function useScrollProgress(ref: RefObject<HTMLElement>): ScrollProgress {
  const valueRef = useRef(0);
  const subscribersRef = useRef(new Set<(p: number) => void>());

  const store = useMemo<ScrollProgress>(
    () => ({
      get: () => valueRef.current,
      subscribe: (fn) => {
        subscribersRef.current.add(fn);
        return () => subscribersRef.current.delete(fn);
      },
    }),
    []
  );

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let inView = true;
    let ticking = false;

    const measure = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -rect.top / total));
      if (Math.abs(p - valueRef.current) < 0.0005) return;
      valueRef.current = p;
      subscribersRef.current.forEach((fn) => fn(p));
    };

    const onScroll = () => {
      // Pausiert, wenn die Sektion außerhalb des Viewports liegt.
      if (!inView || ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) onScroll();
      },
      { rootMargin: "10% 0px 10% 0px" }
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);

  return store;
}
