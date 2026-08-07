"use client";

import { useRetailerSheet } from "@/components/retailer/RetailerProvider";

type Props = {
  children?: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

/** Jeder Kauf-CTA der Seite öffnet das Händler-Sheet – nie einen Warenkorb. */
export default function BuyButton({
  children = "Wo kaufen",
  variant = "primary",
  className = "",
}: Props) {
  const { open } = useRetailerSheet();
  const base =
    "inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-wide transition";
  const styles =
    variant === "primary"
      ? "bg-volt text-kohle hover:brightness-110"
      : "border border-white/25 text-kreide hover:border-volt hover:text-volt";
  return (
    <button onClick={open} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
