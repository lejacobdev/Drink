import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { RetailerProvider } from "@/components/retailer/RetailerProvider";
import CookieBanner from "@/components/CookieBanner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VENARO – Elektrolyte und Protein in einer Dose",
    template: "%s – VENARO",
  },
  description:
    "20 g Protein, 500 mg Elektrolyte, null Zucker. Fertig gemixt in der Slim-Dose. Schmeckt wie ein Drink, wirkt wie ein Plan.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${anton.variable} ${inter.variable}`}>
      <body className="grain font-body antialiased">
        <RetailerProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
        </RetailerProvider>
      </body>
    </html>
  );
}
