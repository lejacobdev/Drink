import type { Flavour } from "@/lib/flavours";

type Props = {
  flavour: Flavour;
  className?: string;
};

/**
 * 2D-Dose als SVG – dient als Hero-Visual, statischer Fallback für die
 * 3D-Dose (reduced motion / schwache Geräte) und Produktbild.
 */
export default function StaticCan({ flavour, className = "" }: Props) {
  const gradId = `metal-${flavour.slug}`;
  const shineId = `shine-${flavour.slug}`;
  return (
    <svg
      viewBox="0 0 300 560"
      className={className}
      role="img"
      aria-label={`sodaLYTE Dose ${flavour.name}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a3a40" />
          <stop offset="0.12" stopColor="#c9c9cf" />
          <stop offset="0.25" stopColor="#77777e" />
          <stop offset="0.5" stopColor="#e6e6ea" />
          <stop offset="0.75" stopColor="#6f6f76" />
          <stop offset="0.9" stopColor="#bfbfc6" />
          <stop offset="1" stopColor="#3a3a40" />
        </linearGradient>
        <linearGradient id={shineId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#ffffff" stopOpacity="0.32" />
          <stop offset="0.32" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.68" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="0.82" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Deckel */}
      <ellipse cx="150" cy="52" rx="86" ry="22" fill={`url(#${gradId})`} />
      <ellipse cx="150" cy="50" rx="78" ry="18" fill="#2a2a2e" />
      <ellipse cx="150" cy="48" rx="70" ry="15" fill="#4a4a50" />
      {/* Lasche */}
      <ellipse cx="150" cy="47" rx="22" ry="8" fill="none" stroke="#9a9aa2" strokeWidth="4" />
      <rect x="146" y="36" width="8" height="14" rx="3" fill="#9a9aa2" />

      {/* Körper */}
      <path
        d="M 64 56 L 64 470 Q 64 488 78 496 L 96 508 Q 108 514 150 514 Q 192 514 204 508 L 222 496 Q 236 488 236 470 L 236 56 Q 236 74 150 74 Q 64 74 64 56 Z"
        fill="#101014"
      />

      {/* Flavour-Band unten */}
      <path
        d="M 64 408 L 236 408 L 236 470 Q 236 488 222 496 L 204 508 Q 192 514 150 514 Q 108 514 96 508 L 78 496 Q 64 488 64 470 Z"
        fill={flavour.farbe}
      />
      <text
        x="150"
        y="452"
        textAnchor="middle"
        textLength="152"
        lengthAdjust="spacingAndGlyphs"
        fill="#0B0B0C"
        style={{
          font: "700 16px var(--font-body), system-ui, sans-serif",
          textTransform: "uppercase",
        }}
      >
        {flavour.name.toUpperCase()}
      </text>
      <text
        x="150"
        y="476"
        textAnchor="middle"
        textLength="150"
        lengthAdjust="spacingAndGlyphs"
        fill="#0B0B0C"
        style={{
          font: "600 10px var(--font-body), system-ui, sans-serif",
        }}
      >
        20 G PROTEIN · 0 G ZUCKER
      </text>

      {/* Wortmarke vertikal */}
      <text
        x="158"
        y="240"
        textAnchor="middle"
        textLength="300"
        lengthAdjust="spacingAndGlyphs"
        fill={flavour.farbe}
        transform="rotate(-90 150 240)"
        style={{
          font: "400 78px var(--font-display), Impact, sans-serif",
          letterSpacing: "0.02em",
        }}
      >
        sodaLYTE
      </text>

      {/* Metall-Glanz über allem */}
      <path
        d="M 64 56 L 64 470 Q 64 488 78 496 L 96 508 Q 108 514 150 514 Q 192 514 204 508 L 222 496 Q 236 488 236 470 L 236 56 Q 236 74 150 74 Q 64 74 64 56 Z"
        fill={`url(#${shineId})`}
      />

      {/* Bodenkante */}
      <ellipse cx="150" cy="512" rx="56" ry="8" fill="#1c1c20" />
    </svg>
  );
}
