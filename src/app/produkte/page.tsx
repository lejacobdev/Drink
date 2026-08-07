import type { Metadata } from "next";
import ProdukteClient from "./ProdukteClient";

export const metadata: Metadata = {
  title: "Produkte",
  description:
    "Alle VENARO Sorten: Limette Zitrone, Himbeere Blaubeere, Mango Maracuja. 20 g Protein, 500 mg Elektrolyte, null Zucker.",
};

export default function ProduktePage() {
  return <ProdukteClient />;
}
