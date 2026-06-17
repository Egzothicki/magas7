"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";

const STEPS = [
  {
    n: "01",
    title: "Wire up your stack",
    body: "Connect your CMS, ad accounts, analytics, CRM, email, design tool, or anything with an API. Agents inherit your auth, never the other way around.",
    aside: "10 min setup · OAuth or token · everything stays in your accounts",
  },
  {
    n: "02",
    title: "Train your brand",
    body: "Drop in your past work. Sentinel ingests every page, ad, post, and deck to build a voice + tone + claim model that every agent obeys.",
    aside: "Versioned brand profile · revertable · diff-able",
  },
  {
    n: "03",
    title: "Give MAGAS7 a goal",
    body: "Type or paste a brief. The Director scopes it, picks agents, builds the plan, and pings you with anything that needs a call.",
    aside: "Goals: launch, test, ship, audit, fix, monitor",
  },
  {
    n: "04",
    title: "Review and ship",
    body: "Watch the thread. Approve key gates. Sentinel blocks anything risky. Conductor pushes the rest live. Oracle measures and re-routes.",
    aside: "Always-in-the-loop · roll back any move with one command",
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how"
      eyebrow="How it works"
      title={<>From brief to live <span className="gradient-text-brand">in hours, not weeks.</span></>}
      subtitle="MAGAS7 is built around four loops: setup, training, direction, and review. After the first two you barely touch them. Direction and review become the whole job."
    >
      <div className="relative mt-16">
        {/* Vertical connector */}
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-edge to-transparent lg:block" />

        <ol className="space-y-12 lg:space-y-20">
          {STEPS.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={`relative grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-12 ${isLeft ? "" : "lg:[&>*:first-child]:order-2"}`}
              >
                <div className={isLeft ? "lg:pr-10" : "lg:pl-10"}>
                  <div className="mb-3 inline-flex items-center gap-2 font-mono text-xs text-quiet">
                    <span className="text-signal">{step.n}</span>
                    <span className="h-px w-8 bg-edge" />
                    <span>step {i + 1} of 4</span>
                  </div>
                  <h3 className="text-2xl font-medium tracking-tight text-bone lg:text-3xl">{step.title}</h3>
                  <p className="mt-3 text-pretty text-ash">{step.body}</p>
                  <p className="mt-3 font-mono text-xs text-quiet">{step.aside}</p>
                </div>

                {/* Visual placeholder card */}
                <div className={isLeft ? "lg:pl-10" : "lg:pr-10"}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-edge bg-surface/60 backdrop-blur-sm">
                    <div className="absolute inset-0 grid-bg-fine opacity-50" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <div className="font-mono text-[11px] uppercase tracking-widest text-quiet">{step.title}</div>
                      <div className="mt-1 text-sm text-mute">[placeholder: see PRD note for ${step.n}]</div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet/5 via-transparent to-signal/5" />
                  </div>
                </div>

                {/* Node dot on the central rail */}
                <span className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal border-glow-signal lg:block" />
              </motion.li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
