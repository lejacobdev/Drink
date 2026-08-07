# PAKT – Markenseite

Elektrolyte + 20 g Protein, fertig gemixt in der Slim-Dose. Diese Repo enthält die
komplette Markenseite: Next.js (App Router) + TypeScript + Tailwind, dunkles
High-Energy-Design, scrollgetriebene 3D-Dose, Händler-Picker statt Shop.

## Setup

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
npm start        # Produktions-Server
```

Node 18.17+ (getestet mit Node 22). Beim ersten Build lädt `next/font` die
Google Fonts (Anton, Inter) – dafür ist einmalig Internet nötig.

## Struktur

```
src/
  app/                    Seiten (App Router) + API-Routen
    api/waitlist          speichert Warteliste-Mails in .data/waitlist.jsonl
    api/kontakt           speichert Kontaktanfragen in .data/kontakt.jsonl
  components/
    can/                  Scroll-3D-Dose (Treiber + Renderer, entkoppelt)
    retailer/             Händler-Picker (Sheet, Karten, Waitlist)
    sections/             Landingpage-Sektionen
  lib/
    flavours.ts           Sorten inkl. kompletter LMIV-Daten
    retailers.ts          Händler-Konfiguration (einzige Stelle zum Pflegen)
    utm.ts                UTM-Parameter für ausgehende Händler-Links
    analytics.ts          austauschbarer Analytics-Helper (eine Datei)
    consent.ts            Consent-first Cookie-Logik
    plz.ts                Mock-PLZ-Filter (austauschbar)
```

## Händler pflegen

Alles in `src/lib/retailers.ts`. Einen Händler live schalten:

```ts
{ id: "rewe", name: "REWE", type: "filiale", status: "live", url: "https://…" }
```

Sobald mindestens ein Händler `status: "live"` hat, wechselt der Picker
automatisch vom Warteliste-Zustand zum klickbaren Grid – ohne weitere
Codeänderung. `regions` (2-stellige PLZ-Präfixe) steuert den PLZ-Filter;
fehlt das Feld, gilt der Händler bundesweit. Der echte Standort-Lookup wird
später nur in `src/lib/plz.ts` ausgetauscht.

Ausgehende Links erhalten automatisch
`utm_source=brandsite&utm_medium=retailer_picker&utm_campaign=<händler-id>`
(`src/lib/utm.ts`) und feuern ein `retailer_click`-Event über
`src/lib/analytics.ts` – damit lässt sich Händlern zeigen, wie viel Traffic
die Seite schickt.

## 3D-Dose gegen Bildsequenz tauschen

Der Scroll-Treiber und der Renderer sind getrennt:

- `src/components/can/useScrollProgress.ts` misst den Fortschritt 0–1 durch
  den 400vh-Wrapper und meldet ihn per Subscription (kein setState pro Frame).
- `src/components/can/CanStage.tsx` ist der austauschbare Renderer
  (`<CanStage progress={p} … />`, aktuell react-three-fiber).
- `src/components/can/ScrollCanSection.tsx` besitzt Layout und
  Copy-Checkpoints und bleibt beim Tausch unangetastet.

So läuft der Tausch auf einen vorgerenderten Bildsequenz-Scrubber:

1. **Frames rendern:** 120 Frames einer 360°-Rotation (bei 540° Scrollweg
   entsprechend 180 Frames), WebP, 1200×1600 px, transparenter Hintergrund.
2. **Benennung:** `public/can-seq/<flavour>/frame-000.webp` bis
   `frame-119.webp` (dreistellig, nullgefüllt).
3. **Preloading:** Beim Mount alle Frames über `new Image()` laden und in
   einem Array halten; erst rendern, wenn ~20 % geladen sind, Rest im
   Hintergrund nachziehen.
4. **Renderer:** Neue Komponente `ImageSequenceStage.tsx` mit derselben
   Prop-Signatur (`progress`, `flavour`): ein `<canvas>`, in der
   Subscription `frame = Math.round(p * (frames - 1))` und per
   `drawImage` zeichnen – nur wenn sich der Frame-Index ändert.
5. **Einbau:** In `ScrollCanSection.tsx` den dynamischen Import von
   `CanStage` auf `ImageSequenceStage` zeigen lassen. Layout, Checkpoints,
   Fallbacks: unverändert.

## Performance-Verhalten der 3D-Dose

- `frameloop="demand"` + `invalidate()`, Rotation über Refs gedämpft
- Scroll-Treiber pausiert per IntersectionObserver außerhalb des Viewports
- `dpr` auf 1.5 gedeckelt, unter 768 px halbierte Geometrie-Segmente
- Dynamischer Import mit `ssr: false` und statischem SVG-Fallback (blockt LCP nicht)
- `prefers-reduced-motion`: statische Dose, Copy gestapelt
- Frametime-Budget: reißt ein mobiles Gerät wiederholt 34 ms, wechselt die
  Sektion selbstständig auf den statischen Fallback

## Vor dem Livegang ausfüllen / prüfen lassen

**Rechtlich (bitte anwaltlich prüfen lassen – die Seiten sind Vorlagen):**
- [ ] `/impressum`: alle `[PLATZHALTER]` (Firma, Vertretung, Register, USt-ID, MStV-Verantwortliche)
- [ ] `/datenschutz`: Verantwortlicher, Hoster, Speicherfristen, Newsletter-Dienst inkl. Double-Opt-in, Analysedienst, Stand-Datum
- [ ] `/cookie-einstellungen`: eingesetzte Dienste in den Kategorietexten benennen
- [ ] Cookie-Banner: bleibt korrekt, solange keine Dritt-Skripte eingebunden sind; neue Skripte nur über `loadConsentedScripts()` in `src/lib/consent.ts` einhängen
- [ ] LMIV-Angaben in `src/lib/flavours.ts` gegen die echte Rezeptur prüfen (Zutatenreihenfolge, Nährwerte, Allergene, NRV-Prozente), Hersteller-Platzhalter auf der Produktseite füllen
- [ ] UVP und Grundpreis (PAngV) mit den echten Preisen ersetzen
- [ ] Health-Claims prüfen lassen (aktuell bewusst zurückhaltend formuliert)

**Inhaltlich/technisch:**
- [ ] Händler-URLs in `src/lib/retailers.ts` eintragen (aktuell `[PLATZHALTER]`), erst dann `status: "live"`
- [ ] Händler-Logos nur mit schriftlicher Freigabe verwenden (bis dahin: Typo-Wortmarken, bereits so gebaut)
- [ ] Testimonials sind Beispieltexte – durch echte, freigegebene Zitate ersetzen
- [ ] `/api/waitlist` und `/api/kontakt` speichern nur in `.data/` (auf Serverless flüchtig) – an Newsletter-Tool/CRM bzw. E-Mail anbinden
- [ ] Kontakt-E-Mail-Platzhalter auf `/kontakt` füllen
- [ ] Analytics-Dienst wählen und in `src/lib/analytics.ts` + Consent-Texten verdrahten
- [ ] Echte Produktfotos/3D-Label finalisieren (Label entsteht aktuell zur Laufzeit als CanvasTexture)
- [ ] OG-Images, Favicon, `robots.txt`/`sitemap.xml` ergänzen
- [ ] Pfandlogo/Pflichtkennzeichnung der Dose mit dem Abfüller klären
