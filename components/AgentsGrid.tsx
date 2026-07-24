"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  Telescope, PenLine, Palette, Compass, Radio, LineChart, ShieldCheck,
} from "lucide-react";

const AGENTS = [
  {
    name: "Scout",
    accent: "cyan",
    icon: Telescope,
    role: "Finds the market signal",
    desc: "Researches competitors, audiences, keywords, reviews, and trends so the campaign starts from evidence.",
    skills: ["Competitors", "Audience", "Keywords"],
  },
  {
    name: "Scribe",
    accent: "signal",
    icon: PenLine,
    role: "Writes the words",
    desc: "Drafts ads, landing pages, emails, posts, and scripts in your brand voice.",
    skills: ["Ads", "Pages", "Email"],
  },
  {
    name: "Studio",
    accent: "violet",
    icon: Palette,
    role: "Creates the visuals",
    desc: "Builds ad creative, social visuals, image concepts, and exports for the formats you need.",
    skills: ["Creative", "Social", "Exports"],
  },
  {
    name: "Director",
    accent: "amber",
    icon: Compass,
    role: "Turns goals into plans",
    desc: "Breaks a marketing goal into a channel plan, budget, timeline, and testable campaign.",
    skills: ["Plan", "Budget", "Tests"],
  },
  {
    name: "Conductor",
    accent: "cyan",
    icon: Radio,
    role: "Gets work ready to ship",
    desc: "Prepares posts, calendars, UTMs, approvals, and channel handoffs.",
    skills: ["Calendar", "UTMs", "Approvals"],
  },
  {
    name: "Oracle",
    accent: "signal",
    icon: LineChart,
    role: "Explains performance",
    desc: "Tracks results, spots winners and losers, and turns performance into the next move.",
    skills: ["Dashboards", "Winners", "Reports"],
  },
  {
    name: "Sentinel",
    accent: "violet",
    icon: ShieldCheck,
    role: "Protects the brand",
    desc: "Checks voice, claims, legal risk, and consistency before anything goes public.",
    skills: ["Voice", "Claims", "QA"],
  },
];

const ACCENT_MAP: Record<string, { text: string; bg: string; border: string }> = {
  cyan: { text: "text-cyan", bg: "bg-cyan/10", border: "border-cyan/30" },
  signal: { text: "text-signal", bg: "bg-signal/10", border: "border-signal/30" },
  violet: { text: "text-violet", bg: "bg-violet/10", border: "border-violet/30" },
  amber: { text: "text-amber", bg: "bg-amber/10", border: "border-amber/30" },
};

export function AgentsGrid() {
  return (
    <Section
      id="agents"
      eyebrow="The simple idea"
      title={<>Seven agents, <span className="gradient-text-brand">one marketing workflow.</span></>}
      subtitle="Visitors do not need to learn a new operating system on the first page. The core promise is simpler: each agent owns one familiar part of campaign work."
    >
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent, i) => {
          const Icon = agent.icon;
          const ac = ACCENT_MAP[agent.accent];
          const isWide = i === 6;
          return (
            <motion.article
              key={agent.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className={`group relative overflow-hidden rounded-xl border border-edge bg-surface/60 p-5 backdrop-blur-sm transition-all hover:border-edge-2 hover:bg-surface ${isWide ? "lg:col-span-3" : ""}`}
            >
              <div className={`pointer-events-none absolute -right-16 -top-16 size-48 rounded-full ${ac.bg} blur-3xl opacity-45 transition-opacity group-hover:opacity-80`} />
              <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`inline-flex size-10 items-center justify-center rounded-lg border ${ac.border} ${ac.bg} ${ac.text}`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-quiet">Agent {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight text-bone">{agent.name}</h3>
                <p className="mt-1 text-sm font-medium text-mute">{agent.role}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">{agent.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {agent.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`rounded-md border ${ac.border} ${ac.bg} px-2 py-0.5 font-mono text-[11px] ${ac.text}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
