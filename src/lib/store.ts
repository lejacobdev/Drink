import { appendFile, mkdir } from "fs/promises";
import path from "path";

/**
 * Minimaler Dateispeicher für Formulareinsendungen (Entwicklung/Prototyp).
 * Legt JSON-Zeilen unter .data/ ab – der Ordner ist gitignored.
 *
 * Achtung: Auf Serverless-Hosting (z. B. Vercel) ist das Dateisystem
 * flüchtig. Vor Livegang gegen eine Datenbank oder einen Dienst tauschen.
 */
export async function appendEntry(
  file: string,
  entry: Record<string, unknown>
): Promise<void> {
  const dir = path.join(process.cwd(), ".data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, file), JSON.stringify(entry) + "\n", "utf8");
}
