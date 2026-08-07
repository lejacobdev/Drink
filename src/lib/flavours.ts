export type FlavourSlug = "limette" | "beere" | "mango";

export type Zutat = {
  name: string;
  /** LMIV: Allergene werden im Zutatenverzeichnis hervorgehoben. */
  allergen?: boolean;
};

export type Naehrwerte = {
  /** Werte pro 100 ml */
  energieKj: number;
  energieKcal: number;
  fett: string;
  gesaettigt: string;
  kohlenhydrate: string;
  zucker: string;
  eiweiss: string;
  salz: string;
  kalium: string;
  kaliumNrv: string;
  magnesium: string;
  magnesiumNrv: string;
};

export type Flavour = {
  slug: FlavourSlug;
  name: string;
  kurzname: string;
  /** Filterkategorie für /produkte */
  kategorie: "Zitrus" | "Beere" | "Tropisch";
  claim: string;
  beschreibung: string;
  /** Akzentfarbe (Hex), gespiegelt in tailwind.config.ts */
  farbe: string;
  /** dunklere Variante für Verläufe */
  farbeDunkel: string;
  zutaten: Zutat[];
  naehrwerte: Naehrwerte;
  nettofuellmenge: string;
  /** UVP pro Dose in Euro – vor Launch bestätigen */
  uvp: number;
  /** PAngV: Grundpreis pro 100 ml in Euro */
  grundpreisPro100ml: number;
};

export const PRO_DOSE = {
  protein: 20,
  elektrolyteMg: 500,
  zuckerG: 0,
  kcal: 105,
  volumenMl: 330,
};

const basisZutaten: Zutat[] = [
  { name: "Wasser" },
  { name: "MILCHEIWEISSISOLAT", allergen: true },
  { name: "Säuerungsmittel: Citronensäure" },
  { name: "Elektrolyte (Kaliumcitrat, Magnesiumcitrat, Natriumchlorid)" },
  { name: "natürliches Aroma" },
  { name: "Süßungsmittel: Steviolglycoside aus Stevia, Sucralose" },
  { name: "Stabilisator: Gellan" },
];

const basisNaehrwerte: Omit<Naehrwerte, "energieKj" | "energieKcal"> = {
  fett: "0,2 g",
  gesaettigt: "0,1 g",
  kohlenhydrate: "0,8 g",
  zucker: "< 0,5 g",
  eiweiss: "6,1 g",
  salz: "0,10 g",
  kalium: "121 mg",
  kaliumNrv: "6 %",
  magnesium: "17 mg",
  magnesiumNrv: "4,5 %",
};

export const flavours: Flavour[] = [
  {
    slug: "limette",
    name: "Limette Zitrone",
    kurzname: "Limette",
    kategorie: "Zitrus",
    claim: "Sauer macht stark.",
    beschreibung:
      "Limette und Zitrone, kalt am besten. Schmeckt nach Sommerpause auf dem Hartplatz, nicht nach Labor.",
    farbe: "#C8FF2E",
    farbeDunkel: "#5A7A00",
    zutaten: [...basisZutaten, { name: "Limettensaftkonzentrat (1 %)" }],
    naehrwerte: { energieKj: 135, energieKcal: 32, ...basisNaehrwerte },
    nettofuellmenge: "330 ml",
    uvp: 2.49,
    grundpreisPro100ml: 0.75,
  },
  {
    slug: "beere",
    name: "Himbeere Blaubeere",
    kurzname: "Beere",
    kategorie: "Beere",
    claim: "Dunkel. Süß. Null Zucker.",
    beschreibung:
      "Himbeere und Blaubeere, rund und dunkel. Die Sorte für alle, die Energy-Drinks süß mögen, aber ohne das Kratzen danach.",
    farbe: "#FF4D8D",
    farbeDunkel: "#7A1039",
    zutaten: [...basisZutaten, { name: "Himbeersaftkonzentrat (1 %)" }],
    naehrwerte: { energieKj: 139, energieKcal: 33, ...basisNaehrwerte },
    nettofuellmenge: "330 ml",
    uvp: 2.49,
    grundpreisPro100ml: 0.75,
  },
  {
    slug: "mango",
    name: "Mango Maracuja",
    kurzname: "Mango",
    kategorie: "Tropisch",
    claim: "Urlaub für die Muskeln.",
    beschreibung:
      "Mango und Maracuja, reif und laut. Der Geschmack, der aus der Kabine eine Strandbar macht.",
    farbe: "#FFA228",
    farbeDunkel: "#8A4D00",
    zutaten: [...basisZutaten, { name: "Mangosaftkonzentrat (1 %)" }],
    naehrwerte: { energieKj: 141, energieKcal: 34, ...basisNaehrwerte },
    nettofuellmenge: "330 ml",
    uvp: 2.49,
    grundpreisPro100ml: 0.75,
  },
];

export function getFlavour(slug: string): Flavour | undefined {
  return flavours.find((f) => f.slug === slug);
}

export function formatEuro(value: number): string {
  return value.toFixed(2).replace(".", ",") + " €";
}
