import type { Metadata } from "next";
import CookieSettings from "./CookieSettings";

export const metadata: Metadata = {
  title: "Cookie-Einstellungen",
  robots: { index: false },
};

export default function CookieEinstellungenPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <h1 className="text-h2 font-display">Cookie-Einstellungen</h1>
      <p className="mt-4 max-w-lg text-kreide/80">
        Hier entscheidest du, was diese Seite darf. Essenzielle Cookies laufen
        immer, alles andere nur mit deinem Okay. Deine Wahl gilt 180 Tage und
        lässt sich hier jederzeit ändern.
      </p>
      <CookieSettings />
    </div>
  );
}
