export type RetailerType = "online" | "filiale" | "lieferdienst";
export type RetailerStatus = "live" | "bald";

export type Retailer = {
  id: string;
  name: string;
  type: RetailerType;
  status: RetailerStatus;
  /** Ziel-URL. [PLATZHALTER] bis der Händler live ist – keine URLs erfinden. */
  url: string;
  /** Optional: Muster für eine Produktsuche beim Händler, {query} wird ersetzt. */
  searchUrlPattern?: string;
  /** Optional: PLZ-Präfixe (2-stellig), in denen der Händler Filialen hat. Fehlt das Feld, gilt: bundesweit. */
  regions?: string[];
};

export const retailers: Retailer[] = [
  { id: "rewe", name: "REWE", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "edeka", name: "Edeka", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "penny", name: "Penny", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "netto", name: "Netto", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "kaufland", name: "Kaufland", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  {
    id: "getraenke-hoffmann",
    name: "Getränke Hoffmann",
    type: "filiale",
    status: "bald",
    url: "[PLATZHALTER]",
    regions: ["10", "12", "13", "14", "15", "16", "17", "20", "21", "22", "23", "24"],
  },
  {
    id: "trinkgut",
    name: "Trinkgut",
    type: "filiale",
    status: "bald",
    url: "[PLATZHALTER]",
    regions: ["40", "41", "42", "44", "45", "46", "47", "50", "51", "52"],
  },
  { id: "dm", name: "dm", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "rossmann", name: "Rossmann", type: "filiale", status: "bald", url: "[PLATZHALTER]" },
  { id: "flink", name: "Flink", type: "lieferdienst", status: "bald", url: "[PLATZHALTER]" },
  { id: "amazon", name: "Amazon", type: "online", status: "bald", url: "[PLATZHALTER]" },
];

export const retailerTypeLabel: Record<RetailerType, string> = {
  online: "Online",
  filiale: "Filiale",
  lieferdienst: "Lieferdienst",
};

export function liveRetailers(): Retailer[] {
  return retailers.filter((r) => r.status === "live");
}
