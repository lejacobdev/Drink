export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display uppercase leading-none tracking-tight ${className}`}
    >
      PAKT
    </span>
  );
}
