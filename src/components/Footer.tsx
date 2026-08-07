"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";
import { submitWaitlist } from "@/lib/forms";

const cols: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Marke",
    links: [
      { href: "/produkte", label: "Produkte" },
      { href: "/wo-kaufen", label: "Wo kaufen" },
      { href: "/ueber-uns", label: "Über uns" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Kontakt",
    links: [{ href: "/kontakt", label: "Schreib uns" }],
  },
  {
    title: "Rechtliches",
    links: [
      { href: "/impressum", label: "Impressum" },
      { href: "/datenschutz", label: "Datenschutz" },
      { href: "/cookie-einstellungen", label: "Cookie-Einstellungen" },
    ],
  },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error" | "unconfigured">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    const result = await submitWaitlist({ email, source: "footer_newsletter" });
    if (result.ok) {
      track({ name: "waitlist_signup", props: { source: "footer_newsletter" } });
      setState("done");
    } else if (result.reason === "not_configured") {
      setState("unconfigured");
    } else {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="text-sm text-salbei">Steht. Du hörst von uns.</p>;
  }

  if (state === "unconfigured") {
    return (
      <p className="max-w-sm text-sm text-muted">
        Formular noch nicht verbunden. Schreib uns an [PLATZHALTER:
        kontakt@deine-domain.de].
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="flex max-w-sm gap-2">
      <label htmlFor="footer-newsletter" className="sr-only">
        E-Mail-Adresse
      </label>
      <input
        id="footer-newsletter"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="deine@mail.de"
        className="w-full rounded-full border border-white/15 bg-asphalt px-5 py-3 text-sm text-kreide placeholder:text-muted focus:border-salbei focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="shrink-0 rounded-full bg-salbei px-5 py-3 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110 disabled:opacity-60"
      >
        Los
      </button>
      {state === "error" && <p className="self-center text-sm text-beere">Nochmal.</p>}
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-kohle">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-micro mb-4 text-muted">Neues zuerst</p>
            <p className="mb-4 text-sm text-kreide/80">
              Launch-Termine, neue Sorten, Regal-News. Kein Spam.
            </p>
            <NewsletterForm />
          </div>
          {cols.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="text-micro mb-4 text-muted">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-kreide/80 transition hover:text-salbei"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="mt-12 text-xs text-muted">
          © {new Date().getFullYear()} [PLATZHALTER: Firmenname]. Alle Rechte vorbehalten.
        </p>
      </div>

      {/* Wortmarke riesig über die volle Breite */}
      <div aria-hidden className="select-none px-1 pb-2">
        <p
          className="font-display text-center uppercase leading-[0.8] text-salbei"
          style={{ fontSize: "clamp(6rem, 24vw, 24rem)", letterSpacing: "0.02em" }}
        >
          VENARO
        </p>
      </div>
    </footer>
  );
}
