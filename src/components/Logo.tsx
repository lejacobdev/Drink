import GemIcon from "./GemIcon";
import Wordmark from "./Wordmark";

type Props = {
  className?: string;
  iconClassName?: string;
};

/** Nav-Logo: der Sodalith-Stein neben der Wortmarke. */
export default function Logo({ className = "", iconClassName = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <GemIcon className={`h-7 w-7 shrink-0 ${iconClassName}`} />
      <Wordmark className="text-2xl text-kreide" />
    </span>
  );
}
