"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { Section } from "./Section";

const FAQS = [
  {
    q: "What is MAGAS7 in plain English?",
    a: "It is an AI marketing team. You give it a campaign goal, and seven specialist agents prepare the research, copy, creative, schedule, checks, and reporting.",
  },
  {
    q: "Does it publish or spend money automatically?",
    a: "No. Public posts, paid campaigns, claims, and sensitive changes wait for your approval by default.",
  },
  {
    q: "What does it help me make?",
    a: "Campaign plans, competitor research, ad copy, landing page copy, emails, social posts, creative concepts, publishing plans, QA notes, and performance reports.",
  },
  {
    q: "Where does my data live?",
    a: "Your work stays connected to your accounts and tools. The goal is to help your existing stack work faster, not replace where your data already lives.",
  },
  {
    q: "When does it ship?",
    a: "Early-access cohort is forming now. Waitlist gets first invites and locked-in early pricing. Public download follows shortly after.",
  },
];

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Quick answers."
      subtitle="The basics a visitor needs before they decide whether to try it."
    >
      <div className="mx-auto mt-12 max-w-3xl">
        {FAQS.map((item, i) => {
          const isOpen = openIdx === i;
          return (
            <motion.div
              key={item.q}
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
