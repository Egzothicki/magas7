import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { LogoMarquee } from "@/components/LogoMarquee";
import { AgentsGrid } from "@/components/AgentsGrid";
import { HowItWorks } from "@/components/HowItWorks";
import { OutcomeMetrics } from "@/components/OutcomeMetrics";
import { PricingTease } from "@/components/PricingTease";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="relative">
        <Hero />
        <LogoMarquee />
        <AgentsGrid />
        <HowItWorks />
        <OutcomeMetrics />
        <PricingTease />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
