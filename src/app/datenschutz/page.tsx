import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

/**
 * VORLAGE einer Datenschutzerklärung (DSGVO) für eine reine Marketing-Seite
 * ohne Shop. Alle [PLATZHALTER] füllen und vor Livegang von einer
 * fachkundigen Stelle prüfen lassen – dieser Text ist keine Rechtsberatung.
 */
export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <h1 className="text-h2 font-display">Datenschutzerklärung</h1>

      <div className="mt-10 space-y-10 text-kreide/85">
        <section>
          <h2 className="text-micro mb-3 text-muted">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            [PLATZHALTER: Firmenname, Anschrift, E-Mail, Telefon]
          </p>
          <p className="mt-3">
            Datenschutzbeauftragte Person (falls benannt): [PLATZHALTER oder
            Abschnitt entfernen]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            2. Hosting und Server-Logfiles
          </h2>
          <p>
            Diese Website wird gehostet bei: [PLATZHALTER: Hoster, Anschrift].
            Beim Aufruf der Seiten verarbeitet der Server automatisch
            technische Zugriffsdaten (IP-Adresse, Datum und Uhrzeit, aufgerufene
            Datei, User-Agent, Referrer). Rechtsgrundlage ist Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an einem sicheren, stabilen
            Betrieb). Die Logfiles werden nach [PLATZHALTER: Frist] gelöscht.
            Mit dem Hoster besteht ein Auftragsverarbeitungsvertrag nach Art. 28
            DSGVO. [PLATZHALTER: prüfen und anpassen]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">3. Cookies und Einwilligung</h2>
          <p>
            Diese Website setzt essenzielle Cookies, die für den Betrieb
            erforderlich sind (z. B. das Speichern deiner
            Cookie-Entscheidung). Nicht-essenzielle Cookies und Skripte
            (Statistik, Marketing) werden erst geladen, nachdem du über den
            Cookie-Banner eingewilligt hast (Art. 6 Abs. 1 lit. a DSGVO, § 25
            TDDDG). Du kannst deine Einwilligung jederzeit unter{" "}
            <Link href="/cookie-einstellungen" className="underline hover:text-volt">
              Cookie-Einstellungen
            </Link>{" "}
            ändern oder widerrufen.
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            4. Kontaktformular
          </h2>
          <p>
            Wenn du unser Kontaktformular nutzt, verarbeiten wir die von dir
            angegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht) zur
            Bearbeitung deiner Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1
            lit. b DSGVO (vorvertragliche Kommunikation) bzw. Art. 6 Abs. 1
            lit. f DSGVO. Die Daten werden gelöscht, sobald die Anfrage
            abschließend bearbeitet ist und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen. [PLATZHALTER: Speicherfrist]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            5. Newsletter und Verfügbarkeits-Benachrichtigung
          </h2>
          <p>
            Trägst du deine E-Mail-Adresse in unser Newsletter- oder
            Warteliste-Feld ein, verwenden wir sie, um dich über den
            Marktstart und Neuigkeiten zu informieren. Rechtsgrundlage ist
            deine Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Der Versand
            erfolgt über: [PLATZHALTER: Versanddienstleister oder „eigene
            Systeme“]. Du kannst dich jederzeit abmelden, z. B. über den
            Abmeldelink in jeder E-Mail oder per Nachricht an [PLATZHALTER:
            E-Mail]. [PLATZHALTER: Double-Opt-in-Verfahren beschreiben, sobald
            eingerichtet]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            6. Statistik und Reichweitenmessung
          </h2>
          <p>
            Sofern du eingewilligt hast, verwenden wir
            [PLATZHALTER: Analysedienst, z. B. „keinen Analysedienst“ – Abschnitt
            dann entfernen]. Verarbeitete Daten, Speicherdauer und
            Drittlandtransfer: [PLATZHALTER]. Rechtsgrundlage ist Art. 6 Abs. 1
            lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            7. Links zu Händlern
          </h2>
          <p>
            Unsere Seite verlinkt auf Websites von Handelspartnern. Beim Klick
            wird die Zielseite in einem neuen Tab geöffnet; wir übergeben dabei
            Kampagnenparameter (UTM), aber keine personenbezogenen Daten. Für
            die Datenverarbeitung auf den Händlerseiten sind ausschließlich die
            jeweiligen Anbieter verantwortlich.
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">8. Deine Rechte</h2>
          <p>
            Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
            (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
            (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch gegen
            Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO
            (Art. 21). Erteilte Einwilligungen kannst du jederzeit mit Wirkung
            für die Zukunft widerrufen. Außerdem kannst du dich bei einer
            Datenschutz-Aufsichtsbehörde beschweren, z. B. bei der für
            [PLATZHALTER: Bundesland] zuständigen Behörde.
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">9. Stand</h2>
          <p>
            Stand dieser Datenschutzerklärung: [PLATZHALTER: Datum]. Wir passen
            sie an, sobald sich Technik oder Rechtslage ändern.
          </p>
        </section>
      </div>
    </div>
  );
}
