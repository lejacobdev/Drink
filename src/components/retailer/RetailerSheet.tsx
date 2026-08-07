"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import RetailerPicker from "./RetailerPicker";

/**
 * Händler-Auswahl: Modal auf Desktop, Bottom-Sheet auf Mobile.
 * Ersetzt jeden "Kaufen"-Flow – die Seite verkauft nicht direkt.
 */
export default function RetailerSheet({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Wo kaufen"
    >
      <button
        aria-label="Schließen"
        onClick={onClose}
        className="absolute inset-0 bg-kohle/80 backdrop-blur-sm"
      />
      <div className="relative max-h-[85vh] w-full overflow-y-auto rounded-t-card border border-white/10 bg-kohle p-6 sm:max-w-2xl sm:rounded-card sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-h2">Wo kaufen</h2>
            <p className="mt-2 text-sm text-muted">
              sodaLYTE gibt es im Handel, nicht bei uns im Shop.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Schließen"
            className="rounded-full border border-white/15 p-2 text-kreide transition hover:border-sodalith hover:text-sodalith"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <RetailerPicker variant="sheet" />
      </div>
    </div>
  );
}
