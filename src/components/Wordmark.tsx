export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-none tracking-tight ${className}`}>
      soda<span className="text-sodalith">LYTE</span>
    </span>
  );
}
