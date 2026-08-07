import { Retailer } from "./retailers";

/**
 * Mock-PLZ-Lookup: filtert Händler über 2-stellige PLZ-Präfixe.
 * Später gegen echte Standortdaten (API oder statische Liste) austauschen –
 * nur diese Datei anfassen, die Aufrufer bleiben gleich.
 */
export function isValidPlz(plz: string): boolean {
  return /^\d{5}$/.test(plz.trim());
}

export function filterByPlz(list: Retailer[], plz: string): Retailer[] {
  if (!isValidPlz(plz)) return list;
  const prefix = plz.trim().slice(0, 2);
  return list.filter((r) => !r.regions || r.regions.includes(prefix));
}
