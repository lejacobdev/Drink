"use client";

import { hasConsent } from "./consent";

/**
 * Schlanker, austauschbarer Analytics-Helper.
 * Alle Events laufen hier durch – Provider wechseln heißt: nur diese Datei ändern.
 *
 * Aktuell: pusht in window.dataLayer (falls vorhanden, z. B. GTM) und loggt im Dev-Modus.
 * Events werden nur gesendet, wenn Statistik-Consent vorliegt (Cookie-Banner).
 */

export type AnalyticsEvent =
  | { name: "retailer_click"; props: { retailer: string; type: string; url: string } }
  | { name: "waitlist_signup"; props: { source: string } }
  | { name: "flavour_switch"; props: { flavour: string } };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  if (!hasConsent("statistik")) return;

  const payload = { event: event.name, ...event.props };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(payload);
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", payload);
  }
}
