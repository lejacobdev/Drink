import { NextResponse } from "next/server";
import { appendEntry } from "@/lib/store";

/**
 * Speichert Warteliste-/Newsletter-Adressen als JSON-Zeilen in .data/waitlist.jsonl.
 * Bewusst minimal – vor Livegang durch einen echten Dienst (Newsletter-Tool,
 * Datenbank) ersetzen und Double-Opt-in ergänzen (siehe README-Checkliste).
 */
export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const source = typeof body.source === "string" ? body.source : "unbekannt";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail" }, { status: 400 });
  }

  await appendEntry("waitlist.jsonl", {
    email,
    source,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
