import Link from "next/link";
import Hero from "@/components/sections/Hero";
import ScrollCanSection from "@/components/can/ScrollCanSection";
import FlavourSwitcher from "@/components/sections/FlavourSwitcher";
import WasIstDrin from "@/components/sections/WasIstDrin";
import NumbersStrip from "@/components/sections/NumbersStrip";
import ComparisonTable from "@/components/sections/ComparisonTable";
import SocialProof from "@/components/sections/SocialProof";
import FaqAccordion, { landingFaq } from "@/components/FaqAccordion";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <ScrollCanSection />
      <FlavourSwitcher />
      <WasIstDrin />
      <NumbersStrip />
      <ComparisonTable />
      <SocialProof />
      <section className="mx-auto max-w-4xl px-5 py-24 md:px-8 md:py-40">
        <Reveal>
          <p className="text-micro mb-4 text-muted">FAQ</p>
          <h2 className="text-h2 font-display">Kurz beantwortet.</h2>
        </Reveal>
        <Reveal delay={120} className="mt-10">
          <FaqAccordion items={landingFaq} />
        </Reveal>
        <Reveal delay={200} className="mt-8">
          <Link
            href="/faq"
            className="text-sm font-semibold uppercase tracking-wide text-salbei underline-offset-4 hover:underline"
          >
            Alle Fragen ansehen
          </Link>
        </Reveal>
      </section>
    </>
  );
}
