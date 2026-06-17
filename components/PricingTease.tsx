"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Check, Sparkles } from "lucide-react";

const TIERS = [
  {
    name: "Solo",
    price: "Free",
    sub: "for founders & freelancers",
    features: [
      "1 workspace · 3 agents",
      "100 agent-minutes / month",
      "Bring your own keys",
      "Community support",
    ],
    cta: "Start free",
    accent: false,
  },
  {
    name: "Studio",
    price: "$49",
    sub: "/ seat / month",
    features: [
      "Unlimited workspaces",
      "All 7 agents",
      "5,000 agent-minutes",
      "Brand voice training",
      "Slack + email integrations",
      "Priority support",
    ],
    cta: "Get Studio",
    accent: true,
  },
  {
    name: "Operator",
    price: "Custom",
    sub: "for scaling teams",
    features: [
      "Unlimited agent-minutes",
      "Custom agents + tools",
      "BYO model · self-host option",
      "SSO · audit log · DPA",
      "Dedicated success engineer",
    ],
    cta: "Talk to us",
    accent: false,
  },
];

export function PricingTease() {
  return (
    <Section
      id="pricing"
      eyebrow="Pricing"
      title={<>Early-access pricing, <span className="gradient-text-brand">locked for life.</span></>}
      subtitle="Final pricing lands at launch. Anyone on the waitlist before then keeps these rates forever."
    >
      <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {TIERS.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className={`relative overflow-hidden rounded-2xl border p-7 backdrop-blur-sm transition-all ${
              tier.accent
                ? "border-signal/40 bg-gradient-to-br from-signal/5 via-surface/60 to-violet/10 lg:scale-[1.02] border-glow-signal"
                : "border-edge bg-surface/60"
            }`}
          >
            {tier.accent && (
              <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-signal/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                <Sparkles className="size-3" /> Most popular
              </span>
            )}
            <div className="font-mono text-xs uppercase tracking-widest text-quiet">{tier.name}</div>
            <div className="mt-4 flex items-baseline gap-1.5">
              <div className="text-5xl font-medium tracking-tight text-bone">{tier.price}</div>
              <div className="text-sm text-mute">{tier.sub}</div>
            </div>
            <ul className="mt-6 space-y-2.5">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ash">
                  <Check className={`mt-0.5 size-4 shrink-0 ${tier.accent ? "text-signal" : "text-mute"}`} />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href={tier.name === "Operator" ? "mailto:info.gorecki@gmail.com" : "https://app.magas7.com/login"}
              className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.01] ${
                tier.accent
                  ? "bg-signal text-void"
                  : "border border-edge bg-surface-2 text-bone hover:border-edge-2"
              }`}
            >
              {tier.cta}
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
