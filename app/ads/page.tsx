import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { AdIntel } from "./AdIntel";
import { Wand2, LayoutGrid, Users, Gauge, BarChart3, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "Ad Engine — MAGAS7",
  description:
    "Your AI ad team. Spy on every competitor's ads, find the winning angles, and (soon) generate, launch, and scale campaigns across Meta, TikTok & Google.",
};

const SOON = [
  { icon: Wand2, name: "Creative Studio", desc: "Turn a winning angle into on-brand ad creatives, copy, and test variants in every ratio." },
  { icon: Users, name: "Audience Builder", desc: "Custom + lookalike audiences, interest stacks, and exclusion lists — drafted by Scout." },
  { icon: LayoutGrid, name: "Campaign Builder", desc: "Assemble full campaigns: objective → ad sets → ads, with targeting and budget splits." },
  { icon: Gauge, name: "Auto-Optimizer", desc: "Pause losers, scale winners, and catch creative fatigue before it burns spend." },
  { icon: BarChart3, name: "Performance Lens", desc: "Live ROAS / CPA dashboards and multi-touch attribution, briefed weekly by Oracle." },
  { icon: Rocket, name: "One-Click Launch", desc: "Push straight to Meta, TikTok & Google ad accounts once connected via API." },
];

export default function AdsPage() {
  return (
    <>
      <Header />
      <main id="main" className="relative pt-16">
        <Section
          id="ad-intel"
          align="center"
          eyebrow="● Live now · Ad Intelligence"
          title={<>Spy on every competitor's ad. <span className="gradient-text-brand">Steal what works.</span></>}
          subtitle="MAGAS7's first ad tool is live: pull what your competitors are running across Meta, TikTok & Google, see how long each ad has survived, and let Scout surface the angles, hooks, and formats actually winning the niche."
        >
          <AdIntel />
        </Section>

        <Section
          id="ad-tools"
          align="center"
          eyebrow="Shipping next"
          title={<>The rest of the <span className="gradient-text-brand">ad engine.</span></>}
          subtitle="Ad Intel is step one. The agents are being wired into the full paid-ads lifecycle — from creative to launch to live optimization, across every major platform."
        >
          <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOON.map((t) => {
              const Icon = t.icon;
              return (
                <div
                  key={t.name}
                  className="group relative overflow-hidden rounded-xl border border-edge bg-surface/40 p-5 transition-colors hover:border-edge-2"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="inline-flex size-9 items-center justify-center rounded-lg border border-edge bg-void/60 text-mute transition-colors group-hover:text-signal">
                      <Icon className="size-4" />
                    </div>
                    <span className="rounded-full border border-edge bg-void/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-quiet">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="text-[15px] font-medium text-bone">{t.name}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ash">{t.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col items-center gap-4">
            <p className="text-pretty text-center text-sm text-mute">
              Want early access to the ad engine as each tool ships?
            </p>
            <a
              href="/#waitlist"
              className="inline-flex items-center gap-2 rounded-full bg-signal px-5 py-2.5 text-sm font-medium text-void transition-transform hover:scale-[1.02]"
            >
              Join the waitlist
            </a>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
