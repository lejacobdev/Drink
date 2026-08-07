import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false },
};

/**
 * VORLAGE nach § 5 DDG / § 18 MStV.
 * Alle [PLATZHALTER] mit echten Firmendaten füllen und vor Livegang
 * rechtlich prüfen lassen. Keine Angabe hier ist erfunden.
 */
export default function ImpressumPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 pb-24 pt-32 md:px-8 md:pt-40">
      <h1 className="text-h2 font-display">Impressum</h1>

      <div className="mt-10 space-y-8 text-kreide/85">
        <section>
          <h2 className="text-micro mb-3 text-muted">Angaben gemäß § 5 DDG</h2>
          <p>
            [PLATZHALTER: Firmenname und Rechtsform, z. B. Muster GmbH]
            <br />
            [PLATZHALTER: Straße und Hausnummer]
            <br />
            [PLATZHALTER: PLZ und Ort]
            <br />
            Deutschland
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">Vertreten durch</h2>
          <p>[PLATZHALTER: Geschäftsführung / vertretungsberechtigte Person]</p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">Kontakt</h2>
          <p>
            Telefon: [PLATZHALTER]
            <br />
            E-Mail: [PLATZHALTER]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister
            <br />
            Registergericht: [PLATZHALTER]
            <br />
            Registernummer: [PLATZHALTER]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
            <br />
            [PLATZHALTER]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">
            Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
          </h2>
          <p>
            [PLATZHALTER: Name]
            <br />
            [PLATZHALTER: Anschrift]
          </p>
        </section>

        <section>
          <h2 className="text-micro mb-3 text-muted">Streitschlichtung</h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
            teilzunehmen. [PLATZHALTER: Absatz anpassen, falls doch eine
            Teilnahmepflicht oder -bereitschaft besteht]
          </p>
        </section>
      </div>
    </div>
  );
}
