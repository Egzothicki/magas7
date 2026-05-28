"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Check, X } from "lucide-react";

const ROWS = [
  ["Single-shot output", "Long, multi-step jobs"],
  ["One generic chatbot", "Seven specialist agents"],
  ["Disconnected from your stack", "Native to Meta, Google, HubSpot, Figma, Slack, +20 more"],
  ["Forgets your brand", "Voice + tone + claims learned from your past work"],
  ["No QA, no review gates", "Sentinel blocks risky ships before they go out"],
  ["Black-box outputs", "Every step logged, every asset versioned, every action revertable"],
  ["Generic results", "Coordinated campaigns with attribution and winner detection"],
];

export function Comparison() {
  return (
    <Section
      eyebrow="MAGAS7 vs the rest"
      title={<>Marketing isn't <span className="gradient-text-brand">one prompt.</span></>}
      subtitle="Most AI marketing tools give you a chat box and a one-shot output. MAGAS7 gives you a coordinated team that owns the work end-to-end."
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-12 overflow-hidden rounded-2xl border border-edge"
      >
        <div className="grid grid-cols-2 border-b border-edge bg-surface-2">
          <div className="px-5 py-4 text-sm font-medium text-mute">Generic AI marketing tools</div>
          <div className="border-l border-edge px-5 py-4 text-sm font-medium text-signal">MAGAS7</div>
        </div>
        {ROWS.map(([left, right], i) => (
          <div
            key={i}
            className={`grid grid-cols-2 ${i !== ROWS.length - 1 ? "border-b border-edge" : ""}`}
          >
            <div className="flex items-start gap-3 bg-void/40 px-5 py-4 text-sm text-mute">
              <X className="mt-0.5 size-4 shrink-0 text-quiet" />
              <span>{left}</span>
            </div>
            <div className="flex items-start gap-3 border-l border-edge px-5 py-4 text-sm text-bone">
              <Check className="mt-0.5 size-4 shrink-0 text-signal" />
              <span>{right}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </Section>
  );
}
