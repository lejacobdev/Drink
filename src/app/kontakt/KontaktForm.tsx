"use client";

import { useState } from "react";
import { submitKontakt } from "@/lib/forms";

const inputClasses =
  "w-full rounded-card border border-white/15 bg-asphalt px-5 py-3.5 text-sm text-kreide placeholder:text-muted focus:border-sodalith focus:outline-none";

export default function KontaktForm() {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error" | "unconfigured">(
    "idle"
  );

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("busy");
    const data = new FormData(e.currentTarget);
    const result = await submitKontakt({
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      betreff: String(data.get("betreff") ?? ""),
      nachricht: String(data.get("nachricht") ?? ""),
    });
    if (result.ok) setState("done");
    else if (result.reason === "not_configured") setState("unconfigured");
    else setState("error");
  }

  if (state === "done") {
    return (
      <div className="rounded-card border border-sodalith/30 bg-sodalith/10 p-8">
        <p className="font-display text-2xl uppercase text-kreide">Angekommen.</p>
        <p className="mt-2 text-kreide/80">
          Wir melden uns, meistens innerhalb von zwei Werktagen.
        </p>
      </div>
    );
  }

  if (state === "unconfigured") {
    return (
      <div className="rounded-card border border-white/15 bg-asphalt p-8">
        <p className="font-display text-2xl uppercase text-kreide">Noch nicht verbunden.</p>
        <p className="mt-2 text-kreide/80">
          Dieses Formular braucht einen externen Formular-Dienst (die Seite ist
          statisch, ohne eigenen Server). Bis das eingerichtet ist, schreib uns
          direkt an [PLATZHALTER: kontakt@deine-domain.de].
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-micro mb-2 block text-muted">
            Name
          </label>
          <input id="name" name="name" required className={inputClasses} placeholder="Dein Name" />
        </div>
        <div>
          <label htmlFor="email" className="text-micro mb-2 block text-muted">
            E-Mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClasses}
            placeholder="deine@mail.de"
          />
        </div>
      </div>
      <div>
        <label htmlFor="betreff" className="text-micro mb-2 block text-muted">
          Betreff
        </label>
        <input
          id="betreff"
          name="betreff"
          required
          className={inputClasses}
          placeholder="Worum geht es"
        />
      </div>
      <div>
        <label htmlFor="nachricht" className="text-micro mb-2 block text-muted">
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          required
          rows={6}
          className={inputClasses}
          placeholder="Deine Nachricht"
        />
      </div>
      <button
        type="submit"
        disabled={state === "busy"}
        className="rounded-full bg-sodalith px-8 py-4 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110 disabled:opacity-60"
      >
        {state === "busy" ? "Sendet" : "Abschicken"}
      </button>
      {state === "error" && (
        <p className="text-sm text-beere">Hat nicht geklappt. Versuch es nochmal.</p>
      )}
    </form>
  );
}
