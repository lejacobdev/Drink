import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p
        aria-hidden
        className="font-display leading-none text-salbei"
        style={{ fontSize: "clamp(8rem, 30vw, 24rem)" }}
      >
        404
      </p>
      <h1 className="text-h2 font-display mt-2">Leer.</h1>
      <p className="mt-4 max-w-sm text-muted">
        Wie die Dose nach dem Training. Diese Seite gibt es nicht – aber es gibt
        Wege zurück.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-salbei px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-kohle transition hover:brightness-110"
        >
          Zur Startseite
        </Link>
        <Link
          href="/produkte"
          className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-kreide transition hover:border-salbei hover:text-salbei"
        >
          Sorten ansehen
        </Link>
      </div>
    </div>
  );
}
