# sodaLYTE – Markenseite

Elektrolyte + 20 g Protein, fertig gemixt in der Slim-Dose. Diese Repo enthält die
komplette Markenseite: Next.js (App Router) + TypeScript + Tailwind, dunkles
Design mit gedämpfter Farbpalette, scrollgetriebene 3D-Dose, Händler-Picker statt
Shop. Die Seite wird als statischer Export gebaut und direkt über GitHub Pages
gehostet – es läuft kein eigener Server.

## Setup

```bash
npm install
npm run dev      # Entwicklung: http://localhost:3000
npm run build    # statischer Export nach ./out
npm start        # baut ./out lokal aus (npx serve) zum Gegenprüfen vor dem Push
```

Node 18.17+ (getestet mit Node 22). Beim ersten Build lädt `next/font` die
Google Fonts (Anton, Inter) – dafür ist einmalig Internet nötig.

## Struktur

```
src/
  app/                    Seiten (App Router), rein statisch
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
    forms.ts              Formular-Versand an einen externen Endpoint
.github/workflows/deploy.yml   baut den Export und deployt ihn auf GitHub Pages
```

## Hosting auf GitHub Pages

Die Seite läuft als `output: "export"` (siehe `next.config.mjs`) – `next build`
erzeugt einen komplett statischen Ordner `./out`, den GitHub Pages direkt
ausliefern kann. Einmalig einrichten:

1. **Push auf `main`.** Der Workflow `.github/workflows/deploy.yml` baut bei
   jedem Push auf `main` (oder manuell über "Run workflow") automatisch und
   deployt nach GitHub Pages.
2. **Pages-Quelle umstellen.** Einmalig unter *Settings → Pages → Source* auf
   **"GitHub Actions"** stellen (statt "Deploy from a branch"). Das kann nur
   im Repo selbst gemacht werden, nicht per Code.
3. **URL.** Die Seite landet unter `https://<user>.github.io/<repo-name>/`.
   `next.config.mjs` erkennt beim Bauen in der Action automatisch den
   Repo-Namen (`GITHUB_REPOSITORY`) und setzt den passenden `basePath` – lokal
   bleibt er leer. Bei einer eigenen Domain später `NEXT_BASE_PATH=""` als
   Workflow-Env setzen und eine `CNAME`-Datei in `public/` ablegen.

`public/.nojekyll` ist bereits vorhanden – ohne die Datei ignoriert GitHubs
Jekyll-Build den `_next/`-Ordner (Unterstrich-Präfix) und die Seite lädt kein
CSS/JS.

## Formulare: Kontakt, Warteliste, Newsletter

Eine statische Seite hat keinen Server, der `/api/*`-Routen ausführen könnte.
Alle drei Formulare (Kontakt, Wo-kaufen-Warteliste, Footer-Newsletter) senden
deshalb per `fetch` direkt an einen extern konfigurierten Endpoint
(`src/lib/forms.ts`) – z. B. [Formspree](https://formspree.io),
[Getform](https://getform.io) oder [Basin](https://usebasin.com):

```bash
NEXT_PUBLIC_KONTAKT_ENDPOINT=https://formspree.io/f/[PLATZHALTER]
NEXT_PUBLIC_WAITLIST_ENDPOINT=https://formspree.io/f/[PLATZHALTER]
```

Lokal in `.env.local` setzen, im Workflow als Repository-Secrets unter
*Settings → Secrets and variables → Actions* hinterlegen (der Workflow liest
sie bereits ein). Ohne gesetzten Endpoint zeigen die Formulare ehrlich einen
"noch nicht verbunden"-Hinweis statt Daten stillschweigend zu verwerfen.

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

## Farbsystem

Gedämpfte, erdige Palette statt greller Neonfarben – Basis fast schwarz, ein
ruhiger Sodalith-Blau-Akzent (passend zum Logo-Stein), drei gedeckte
Sortenfarben:

| Token             | Hex       | Verwendung                              |
| ------------------ | --------- | ---------------------------------------- |
| `kohle`            | `#0B0B0C` | Hintergrund                              |
| `asphalt`          | `#17171A` | Karten, sekundäre Flächen                |
| `kreide`           | `#F2F0E9` | Fließtext, Überschriften auf Dunkel      |
| `sodalith`         | `#6C89BF` | primärer Akzent, CTAs, Links, Logo-Stein |
| `sodalith-hell`    | `#9AAED9` | helle Facette im Logo-Stein              |
| `sodalith-dunkel`  | `#34517F` | dunkle Facette im Logo-Stein             |
| `beere`            | `#C98FA0` | Sorte Himbeere Blaubeere                 |
| `mango`            | `#D3A06C` | Sorte Mango Maracuja                     |
| `muted`            | `#8B8B92` | sekundärer Text                          |

Limette Zitrone hat keinen eigenen Tailwind-Token, sondern nur einen Hex-Wert
in `src/lib/flavours.ts` (`#B9C08A`), da Sortenfarben dort zentral gepflegt
werden.

## Logo

Der Sodalith-Stein (`src/components/GemIcon.tsx`) ist handgebaute Inline-SVG,
kein Icon-Set-Glyph: drei Facetten in hell/mittel/dunkel für die Schliff-Optik,
zwei feine helle Adern für die Calcit-Maserung des echten Minerals. Die
Wortmarke (`src/components/Wordmark.tsx`) ist bewusst in gemischter
Groß-/Kleinschreibung gesetzt ("soda" + `LYTE`) – Klassen mit
`uppercase`/`text-transform` dürfen nicht auf die Wortmarke angewendet werden,
sonst geht die Stilisierung verloren (siehe die Korrektur dazu in
`ComparisonTable.tsx`). `src/components/Logo.tsx` kombiniert Stein und
Wortmarke für die Nav; im Footer läuft die Wortmarke riesig und zweifarbig
über die volle Breite.

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

**Markenrecht – vor allem anderen klären:**
- [ ] Der Name "sodaLYTE" wurde bewusst trotz zweier bekannter Risiken gewählt und ist NICHT rechtlich geprüft: (1) mögliche Verwechslungsgefahr mit SodaStream-Marken ("SODA" + Zusatz in Klasse 32, SodaStream ist bekannt für aktive Markenüberwachung); (2) das Wort "soda" kann als irreführend gelten, falls das Produkt nicht kohlensäurehaltig ist (Art. 7 LMIV, § 5 UWG). Vor Druck von Verpackung/Etiketten: Markenrecherche bei DPMA (register.dpma.de), EUIPO TMview und WIPO Global Brand Database in Klasse 32/5, plus Prüfung durch eine Markenanwältin/einen Markenanwalt.
- [ ] Falls das Produkt tatsächlich kohlensäurehaltig ist: den Hinweis "still, ohne Kohlensäure" auf `/ueber-uns` und in der FAQ entfernen bzw. anpassen.

**Rechtlich (bitte anwaltlich prüfen lassen – die Seiten sind Vorlagen):**
- [ ] `/impressum`: alle `[PLATZHALTER]` (Firma, Vertretung, Register, USt-ID, MStV-Verantwortliche)
- [ ] `/datenschutz`: Verantwortlicher, Hoster (jetzt GitHub Pages), Speicherfristen, Formular-Dienst, Analysedienst, Stand-Datum
- [ ] `/cookie-einstellungen`: eingesetzte Dienste in den Kategorietexten benennen
- [ ] Cookie-Banner: bleibt korrekt, solange keine Dritt-Skripte eingebunden sind; neue Skripte nur über `loadConsentedScripts()` in `src/lib/consent.ts` einhängen
- [ ] LMIV-Angaben in `src/lib/flavours.ts` gegen die echte Rezeptur prüfen (Zutatenreihenfolge, Nährwerte, Allergene, NRV-Prozente), Hersteller-Platzhalter auf der Produktseite füllen
- [ ] UVP und Grundpreis (PAngV) mit den echten Preisen ersetzen
- [ ] Health-Claims prüfen lassen (aktuell bewusst zurückhaltend formuliert)

**Inhaltlich/technisch:**
- [ ] Formular-Dienst wählen (Formspree o. ä.) und `NEXT_PUBLIC_KONTAKT_ENDPOINT` / `NEXT_PUBLIC_WAITLIST_ENDPOINT` als Repository-Secrets setzen
- [ ] Pages-Quelle im Repo einmalig auf "GitHub Actions" stellen (*Settings → Pages*)
- [ ] Händler-URLs in `src/lib/retailers.ts` eintragen (aktuell `[PLATZHALTER]`), erst dann `status: "live"`
- [ ] Händler-Logos nur mit schriftlicher Freigabe verwenden (bis dahin: Typo-Wortmarken, bereits so gebaut)
- [ ] Testimonials sind Beispieltexte – durch echte, freigegebene Zitate ersetzen
- [ ] Kontakt-E-Mail-Platzhalter auf `/kontakt`, im Footer und in den Formular-Fallbacks füllen
- [ ] Analytics-Dienst wählen und in `src/lib/analytics.ts` + Consent-Texten verdrahten
- [ ] Echte Produktfotos/3D-Label finalisieren (Label entsteht aktuell zur Laufzeit als CanvasTexture)
- [ ] OG-Images, Favicon, `robots.txt`/`sitemap.xml` ergänzen
- [ ] Bei eigener Domain: `NEXT_BASE_PATH=""` im Workflow setzen und `CNAME`-Datei in `public/` anlegen
- [ ] Pfandlogo/Pflichtkennzeichnung der Dose mit dem Abfüller klären
