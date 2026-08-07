export type UtmConfig = {
  source: string;
  medium: string;
};

/** Zentrale UTM-Konfiguration für alle ausgehenden Händler-Links. */
export const utmConfig: UtmConfig = {
  source: "brandsite",
  medium: "retailer_picker",
};

/**
 * Hängt UTM-Parameter an eine Händler-URL an.
 * utm_campaign = Händler-ID, damit sich Traffic pro Händler nachweisen lässt.
 */
export function withUtm(url: string, retailerId: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", utmConfig.source);
    u.searchParams.set("utm_medium", utmConfig.medium);
    u.searchParams.set("utm_campaign", retailerId);
    return u.toString();
  } catch {
    // [PLATZHALTER]-URLs sind keine gültigen URLs – unverändert zurückgeben.
    return url;
  }
}
