type Props = {
  className?: string;
};

/**
 * Sodalith als Wortmarken-Symbol: drei Facetten (hell/mittel/dunkel) für
 * die Schliff-Optik, zwei feine Adern für die charakteristische weiße
 * Calcit-Maserung des Minerals. Handgebaut statt Icon-Set, damit die Marke
 * nicht wie jede andere App mit demselben Bibliotheks-Glyphen aussieht.
 */
export default function GemIcon({ className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="sodaLYTE Stein"
    >
      <polygon
        points="10,22 20,12 32,58"
        className="fill-sodalith-hell"
      />
      <polygon
        points="20,12 44,12 32,58"
        className="fill-sodalith"
      />
      <polygon
        points="44,12 54,22 32,58"
        className="fill-sodalith-dunkel"
      />
      <polygon
        points="20,12 44,12 54,22 32,58 10,22"
        fill="none"
        stroke="#1B2A42"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <polyline
        points="15,26 24,23 22,34 29,40"
        fill="none"
        stroke="#F2F0E9"
        strokeOpacity="0.55"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="37,19 41,27 38,33"
        fill="none"
        stroke="#F2F0E9"
        strokeOpacity="0.4"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 16 L47.6 19.2 L50.8 20.8 L47.6 22.4 L46 25.6 L44.4 22.4 L41.2 20.8 L44.4 19.2 Z"
        className="fill-kreide"
        opacity="0.85"
      />
    </svg>
  );
}
