"use client";

/**
 * Formular-Versand für den statischen GitHub-Pages-Export.
 *
 * GitHub Pages liefert nur statische Dateien aus – es gibt keinen Server, der
 * /api/* Routen ausführen könnte. Formulare senden deshalb direkt an einen
 * extern konfigurierten Endpoint (z. B. Formspree, Getform, Basin), dessen
 * URL beim Build als Umgebungsvariable gesetzt wird:
 *
 *   NEXT_PUBLIC_KONTAKT_ENDPOINT=https://formspree.io/f/[PLATZHALTER]
 *   NEXT_PUBLIC_WAITLIST_ENDPOINT=https://formspree.io/f/[PLATZHALTER]
 *
 * Ist keine der beiden gesetzt, geben die Formulare offen zu, dass sie noch
 * nicht verbunden sind, statt Daten stillschweigend zu verwerfen.
 */

export type FormResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "network" };

async function submit(
  endpoint: string | undefined,
  data: Record<string, string>
): Promise<FormResult> {
  if (!endpoint) return { ok: false, reason: "not_configured" };
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Formular-Endpoint antwortete mit ${res.status}`);
    return { ok: true };
  } catch {
    return { ok: false, reason: "network" };
  }
}

export function submitKontakt(data: Record<string, string>): Promise<FormResult> {
  return submit(process.env.NEXT_PUBLIC_KONTAKT_ENDPOINT, data);
}

export function submitWaitlist(data: Record<string, string>): Promise<FormResult> {
  return submit(process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT, data);
}
