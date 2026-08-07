import { NextResponse } from "next/server";
import { appendEntry } from "@/lib/store";

/**
 * Nimmt Kontaktanfragen entgegen und legt sie in .data/kontakt.jsonl ab.
 * Vor Livegang durch E-Mail-Versand oder ein Ticketsystem ersetzen.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const betreff = typeof body.betreff === "string" ? body.betreff.trim() : "";
  const nachricht = typeof body.nachricht === "string" ? body.nachricht.trim() : "";

  if (!name || !betreff || !nachricht || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Unvollständige Angaben" }, { status: 400 });
  }

  await appendEntry("kontakt.jsonl", {
    name,
    email,
    betreff,
    nachricht,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
