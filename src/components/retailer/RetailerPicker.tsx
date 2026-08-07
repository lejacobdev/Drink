"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Clock, ExternalLink } from "lucide-react";
import {
  retailers,
  retailerTypeLabel,
  liveRetailers,
  type Retailer,
} from "@/lib/retailers";
import { filterByPlz, isValidPlz } from "@/lib/plz";
import { withUtm } from "@/lib/utm";
import { track } from "@/lib/analytics";
import { submitWaitlist } from "@/lib/forms";

/**
 * Einzige erlaubte localStorage-Nutzung der Seite:
 * merkt sich den zuletzt gewählten Händler.
 */
const LAST_RETAILER_KEY = "sodalyte-last-retailer";

function readLastRetailer(): string | null {
  try {
    return localStorage.getItem(LAST_RETAILER_KEY);
  } catch {
    return null;
  }
}

function writeLastRetailer(id: string): void {
  try {
    localStorage.setItem(LAST_RETAILER_KEY, id);
  } catch {
    // Storage nicht verfügbar – Feature stillschweigend auslassen.
  }
}

function RetailerCard({
  retailer,
  isLast,
  onPick,
}: {
  retailer: Retailer;
  isLast: boolean;
  onPick: (r: Retailer) => void;
}) {
  const bald = retailer.status === "bald";
  const inner = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-xl uppercase leading-none">
          {retailer.name}
        </span>
        {!bald && <ExternalLink className="h-4 w-4 shrink-0 text-muted" aria-hidden />}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-muted">
          {retailerTypeLabel[retailer.type]}
        </span>
        {bald ? (
          <span className="flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-muted">
            <Clock className="h-3 w-3" aria-hidden /> bald verfügbar
          </span>
        ) : (
          <span className="rounded-full bg-sodalith/15 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-sodalith">
            verfügbar
          </span>
        )}
        {isLast && (
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-widest text-kreide">
            Zuletzt gekauft hier
          </span>
        )}
      </div>
    </>
  );

  if (bald) {
    return (
      <div
        aria-disabled
        className="rounded-card border border-white/5 bg-asphalt/60 p-5 opacity-45"
      >
        {inner}
      </div>
    );
  }

  return (
    <a
      href={withUtm(retailer.url, retailer.id)}
      target="_blank"
      rel="noopener"
      onClick={() => onPick(retailer)}
      className="block rounded-card border border-white/10 bg-asphalt p-5 transition hover:border-sodalith hover:bg-asphalt/80"
    >
      {inner}
    </a>
  );
}

function WaitlistForm({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error" | "unconfigured">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    const result = await submitWaitlist({ email, source });
    if (result.ok) {
      track({ name: "waitlist_signup", props: { source } });
      setState("done");
    } else if (result.reason === "not_configured") {
      setState("unconfigured");
    } else {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="rounded-card border border-sodalith/30 bg-sodalith/10 p-4 text-sm text-kreide">
        Steht. Wir melden uns, sobald sodaLYTE bei dir im Regal steht.
      </p>
    );
  }

  if (state === "unconfigured") {
    return (
      <p className="rounded-card border border-white/15 bg-asphalt p-4 text-sm text-kreide/80">
        Formular noch nicht verbunden. Schreib uns direkt an
        [PLATZHALTER: kontakt@deine-domain.de].
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor={`waitlist-${source}`} className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id={`waitlist-${source}`}
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="deine@mail.de"
        className="w-full rounded-full border border-white/15 bg-kohle px-5 py-3 text-sm text-kreide placeholder:text-muted focus:border-sodalith focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="shrink-0 rounded-full bg-sodalith px-6 py-3 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110 disabled:opacity-60"
      >
        {state === "busy" ? "Moment" : "Bescheid sagen"}
      </button>
      {state === "error" && (
        <p className="text-sm text-beere sm:self-center">
          Hat nicht geklappt. Versuch es nochmal.
        </p>
      )}
    </form>
  );
}

/**
 * Kernstück des Händler-Pickers. Wird im Sheet (Modal/Bottom-Sheet) und
 * auf /wo-kaufen als Vollseite verwendet.
 *
 * Sind alle Händler 'bald', erscheint automatisch der Waitlist-Zustand.
 * Sobald ein Händler auf 'live' wechselt, zeigt sich das normale Grid –
 * ohne weitere Codeänderung.
 */
export default function RetailerPicker({ variant }: { variant: "sheet" | "page" }) {
  const [plz, setPlz] = useState("");
  const [lastRetailer, setLastRetailer] = useState<string | null>(null);

  useEffect(() => {
    setLastRetailer(readLastRetailer());
  }, []);

  const anyLive = liveRetailers().length > 0;

  const filtered = useMemo(() => {
    const list = filterByPlz(retailers, plz);
    // Zuletzt gewählten Händler zuerst, dann live vor bald.
    return [...list].sort((a, b) => {
      if (a.id === lastRetailer) return -1;
      if (b.id === lastRetailer) return 1;
      if (a.status !== b.status) return a.status === "live" ? -1 : 1;
      return 0;
    });
  }, [plz, lastRetailer]);

  function handlePick(r: Retailer) {
    writeLastRetailer(r.id);
    setLastRetailer(r.id);
    track({
      name: "retailer_click",
      props: { retailer: r.id, type: r.type, url: r.url },
    });
  }

  return (
    <div>
      {!anyLive && (
        <div className="mb-8">
          <p className="mb-4 text-base text-kreide">
            Wir sagen dir Bescheid, sobald wir bei dir im Regal stehen.
          </p>
          <WaitlistForm source={variant === "sheet" ? "retailer_sheet" : "wo_kaufen"} />
        </div>
      )}

      <div className="mb-6 flex items-center gap-3">
        <MapPin className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        <label htmlFor={`plz-${variant}`} className="sr-only">
          Postleitzahl
        </label>
        <input
          id={`plz-${variant}`}
          inputMode="numeric"
          maxLength={5}
          value={plz}
          onChange={(e) => setPlz(e.target.value.replace(/\D/g, ""))}
          placeholder="PLZ eingeben, Händler in deiner Nähe sehen"
          className="w-full rounded-full border border-white/15 bg-kohle px-5 py-3 text-sm text-kreide placeholder:text-muted focus:border-sodalith focus:outline-none"
        />
      </div>
      {isValidPlz(plz) && (
        <p className="mb-4 text-xs uppercase tracking-widest text-muted">
          Händler für PLZ {plz}
        </p>
      )}
      {!anyLive && (
        <p className="mb-4 text-xs uppercase tracking-widest text-muted">
          Bald hier erhältlich
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((r) => (
          <RetailerCard
            key={r.id}
            retailer={r}
            isLast={r.id === lastRetailer && r.status === "live"}
            onPick={handlePick}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          Für diese PLZ haben wir noch nichts. Trag dich oben ein, wir arbeiten dran.
        </p>
      )}
    </div>
  );
}
