"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getConsent, setConsent, loadConsentedScripts } from "@/lib/consent";

/**
 * Consent-first Cookie-Banner: nicht-essenzielle Skripte bleiben blockiert,
 * bis eine Entscheidung getroffen wurde (siehe lib/consent.ts).
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      loadConsentedScripts();
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function decide(statistik: boolean, marketing: boolean) {
    setConsent({ statistik, marketing });
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einwilligung"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-white/10 bg-asphalt/95 p-5 backdrop-blur-md md:inset-x-auto md:bottom-6 md:right-6 md:max-w-md md:rounded-card md:border"
    >
      <p className="text-sm text-kreide">
        Wir nutzen Cookies. Essenzielle laufen immer, alles andere erst, wenn du
        zustimmst. Details in den{" "}
        <Link href="/cookie-einstellungen" className="underline hover:text-volt">
          Cookie-Einstellungen
        </Link>{" "}
        und der{" "}
        <Link href="/datenschutz" className="underline hover:text-volt">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => decide(true, true)}
          className="rounded-full bg-volt px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110"
        >
          Alle akzeptieren
        </button>
        <button
          onClick={() => decide(false, false)}
          className="rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-volt hover:text-volt"
        >
          Nur essenzielle
        </button>
      </div>
    </div>
  );
}
