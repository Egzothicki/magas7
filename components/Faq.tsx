"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "./Section";

const FAQS = [
  {
    q: "Is this a chat product or a real OS?",
    a: "It's an OS. The chat surface is the front door — under it, agents have tools, state, memory, file systems, scheduling, and integrations. They run multi-day jobs without you babysitting.",
  },
  {
    q: "How is this different from Codex / Claude Code, but for marketing?",
    a: "Same shape, different domain. Codex-style agents write and ship code. MAGAS7-style agents research, write, design, schedule, post, analyze, and protect your brand. Same multi-step, tool-using, file-system-aware loop — purpose-built for marketing work.",
  },
  {
    q: "Do I lose my brand voice?",
    a: "Opposite — you gain a versioned, enforceable one. Sentinel learns voice and tone from your past work and blocks anything that drifts. You can revert, branch, or update the voice profile any time.",
  },
  {
    q: "Where does my data live?",
    a: "In your accounts. MAGAS7 talks to your stack with your auth, on your machine. We never train on your data. Self-hosted Operator plan available.",
  },
  {
    q: "Which models does it use?",
    a: "Whatever you want. Frontier models out of the box (Claude, GPT, Gemini), or bring your own API key, or point at a local model for sensitive workloads. Each agent can be on a different model.",
  },
  {
    q: "Will it actually post / send / spend money without me?",
    a: "Only if you say so. Every shipping action is gated by an approval rule you set. The default is human-in-the-loop on anything that's public or costs money.",
  },
  {
    q: "When does it ship?",
    a: "Early-access cohort is forming now. Waitlist gets first invites + locked-in early pricing. Public download follows shortly after.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions everyone asks."
      subtitle="If yours isn't here, ask us on the waitlist form — we read every one."
    >
      <div className="mx-auto mt-12 max-w-3xl">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className="border-b border-edge"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-bone"
              >
                <span className="text-[17px] font-medium text-bone">{item.q}</span>
                <Plus
                  className={`size-5 shrink-0 text-mute transition-transform duration-300 ${isOpen ? "rotate-45 text-signal" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-8 text-[15px] leading-relaxed text-ash">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
