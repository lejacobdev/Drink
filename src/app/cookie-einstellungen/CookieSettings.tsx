"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

type Category = {
  key: "essenziell" | "statistik" | "marketing";
  title: string;
  description: string;
  locked?: boolean;
};

const categories: Category[] = [
  {
    key: "essenziell",
    title: "Essenziell",
    description:
      "Nötig für den Betrieb der Seite, z. B. das Speichern dieser Cookie-Entscheidung. Lässt sich nicht abschalten.",
    locked: true,
  },
  {
    key: "statistik",
    title: "Statistik",
    description:
      "Hilft uns zu verstehen, wie die Seite genutzt wird, inklusive der Frage, wie viele Leute wir zu Händlern schicken. [PLATZHALTER: eingesetzten Dienst benennen]",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Ermöglicht Kampagnen-Tracking und Retargeting. Aktuell setzen wir keine Marketing-Cookies ein. [PLATZHALTER: anpassen, sobald sich das ändert]",
  },
];

export default function CookieSettings() {
  const [statistik, setStatistik] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const consent = getConsent();
    if (consent) {
      setStatistik(consent.statistik);
      setMarketing(consent.marketing);
    }
  }, []);

  const values: Record<Category["key"], boolean> = {
    essenziell: true,
    statistik,
    marketing,
  };
  const setters: Record<"statistik" | "marketing", (v: boolean) => void> = {
    statistik: setStatistik,
    marketing: setMarketing,
  };

  function save(s: boolean, m: boolean) {
    setStatistik(s);
    setMarketing(m);
    setConsent({ statistik: s, marketing: m });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="mt-10">
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className="flex items-start justify-between gap-6 rounded-card border border-white/10 bg-asphalt p-6"
          >
            <div>
              <h2 className="font-display text-xl uppercase text-kreide">{cat.title}</h2>
              <p className="mt-1.5 text-sm text-muted">{cat.description}</p>
            </div>
            <label className="relative inline-flex shrink-0 cursor-pointer items-center">
              <span className="sr-only">{cat.title} erlauben</span>
              <input
                type="checkbox"
                className="peer sr-only"
                checked={values[cat.key]}
                disabled={cat.locked}
                onChange={(e) =>
                  !cat.locked &&
                  setters[cat.key as "statistik" | "marketing"](e.target.checked)
                }
              />
              <span className="h-7 w-12 rounded-full bg-white/15 transition peer-checked:bg-sodalith peer-disabled:opacity-50" />
              <span className="absolute left-1 h-5 w-5 rounded-full bg-kreide transition peer-checked:translate-x-5 peer-checked:bg-kohle" />
            </label>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button
          onClick={() => save(statistik, marketing)}
          className="rounded-full bg-sodalith px-6 py-3 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110"
        >
          Auswahl speichern
        </button>
        <button
          onClick={() => save(true, true)}
          className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-sodalith hover:text-sodalith"
        >
          Alle akzeptieren
        </button>
        <button
          onClick={() => save(false, false)}
          className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-sodalith hover:text-sodalith"
        >
          Alle ablehnen
        </button>
      </div>
      {saved && <p className="mt-4 text-sm text-sodalith">Gespeichert.</p>}
    </div>
  );
}
