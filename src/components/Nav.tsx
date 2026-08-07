"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";
import BuyButton from "./BuyButton";

const links = [
  { href: "/produkte", label: "Produkte" },
  { href: "/wo-kaufen", label: "Wo kaufen" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-colors ${
        scrolled || mobileOpen
          ? "border-b border-white/10 bg-kohle/85 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" aria-label="VENARO Startseite" onClick={() => setMobileOpen(false)}>
          <Wordmark className="text-2xl text-kreide" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Hauptnavigation">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-widest text-kreide/80 transition hover:text-salbei"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <BuyButton className="!px-5 !py-2.5" />
        </div>

        <button
          className="md:hidden"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          className="flex flex-col gap-1 border-t border-white/10 px-5 pb-6 pt-4 md:hidden"
          aria-label="Mobile Navigation"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 font-display text-3xl uppercase text-kreide transition hover:text-salbei"
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3" onClick={() => setMobileOpen(false)}>
            <BuyButton className="w-full" />
          </div>
        </nav>
      )}
    </header>
  );
}
