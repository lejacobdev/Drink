"use client";

/**
 * Consent-Verwaltung, Cookie-basiert (bewusst kein localStorage).
 * Nicht-essenzielle Skripte dürfen erst nach Einwilligung geladen werden –
 * dafür gibt es loadConsentedScripts().
 */

export type ConsentCategory = "essenziell" | "statistik" | "marketing";

export type ConsentState = {
  essenziell: true;
  statistik: boolean;
  marketing: boolean;
  timestamp: string;
};

const COOKIE_NAME = "pakt-consent";
const COOKIE_DAYS = 180;

export function getConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((c) => c.startsWith(COOKIE_NAME + "="));
  if (!match) return null;
  try {
    return JSON.parse(decodeURIComponent(match.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

export function setConsent(partial: { statistik: boolean; marketing: boolean }): ConsentState {
  const state: ConsentState = {
    essenziell: true,
    statistik: partial.statistik,
    marketing: partial.marketing,
    timestamp: new Date().toISOString(),
  };
  const expires = new Date(Date.now() + COOKIE_DAYS * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(state)
  )}; expires=${expires}; path=/; SameSite=Lax`;
  loadConsentedScripts();
  return state;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essenziell") return true;
  const state = getConsent();
  return state ? state[category] : false;
}

let loaded = { statistik: false, marketing: false };

/**
 * Lädt Dritt-Skripte erst nach Einwilligung (Consent-first).
 * Hier später z. B. das Analytics-Tag einhängen:
 *
 *   if (hasConsent("statistik") && !loaded.statistik) {
 *     const s = document.createElement("script");
 *     s.src = "[PLATZHALTER: Analytics-Skript-URL]";
 *     document.head.appendChild(s);
 *     loaded.statistik = true;
 *   }
 */
export function loadConsentedScripts(): void {
  if (typeof document === "undefined") return;
  if (hasConsent("statistik") && !loaded.statistik) {
    loaded.statistik = true;
    // [PLATZHALTER] Statistik-Skripte hier laden.
  }
  if (hasConsent("marketing") && !loaded.marketing) {
    loaded.marketing = true;
    // [PLATZHALTER] Marketing-Skripte hier laden.
  }
}
