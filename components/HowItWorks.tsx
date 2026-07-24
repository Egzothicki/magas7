"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";

const STEPS = [
  {
    n: "01",
    title: "Give it a goal",
    body: "Describe the campaign, audience, offer, or problem you want handled.",
    aside: "Example: launch a 6-day pricing test for Meta, LinkedIn, and email",
  },
  {
    n: "02",
    title: "Agents prepare the work",
    body: "MAGAS7 researches, writes, designs, schedules, checks, and measures the campaign pieces.",
    aside: "You see the plan, assets, and recommendations in one place",
  },
  {
    n: "03",
    title: "You review key decisions",
    body: "Anything public, expensive, or sensitive waits for approval before it moves.",
    aside: "Brand, claims, spend, and publishing stay under your control",
  },
  {
    n: "04",
    title: "Ship and learn",
    body: "Once approved, the campaign goes live and Oracle reports what is working.",
    aside: "The next test starts from real performance data",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>The workflow is <span className="gradient-text-brand">easy to understand.</span></>}
      subtitle="No jargon tour. No maze of features. MAGAS7 follows the same four steps a marketer already knows."
    >
      <div className="relative mt-12">
        <ol className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          {STEPS.map((step) => (
            <motion.li
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative rounded-xl border border-edge bg-surface/60 p-5"
            >
              <div className="mb-4 inline-flex size-9 items-center justify-center rounded-lg border border-signal/30 bg-signal/10 font-mono text-xs text-signal">
                {step.n}
              </div>
              <h3 className="text-xl font-medium tracking-tight text-bone">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{step.body}</p>
              <p className="mt-4 font-mono text-[11px] leading-relaxed text-quiet">{step.aside}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
