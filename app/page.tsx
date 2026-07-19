import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { InterfacePreview } from "@/components/InterfacePreview";
import { AgentsGrid } from "@/components/AgentsGrid";
import { ToolsGrid } from "@/components/ToolsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { OutcomeMetrics } from "@/components/OutcomeMetrics";
import { Comparison } from "@/components/Comparison";
import { PricingTease } from "@/components/PricingTease";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="relative">
        <Hero />
        <LogoMarquee />
        <InterfacePreview />
        <AgentsGrid />
        <ToolsGrid />
        <HowItWorks />
        <OutcomeMetrics />
        <Comparison />
        <PricingTease />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
