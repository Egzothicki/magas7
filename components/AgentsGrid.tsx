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
    role: "Research & intel",
    desc: "Crawls competitors, monitors SOV, mines reviews and forums, and scores audiences against your ICP. Always-on market radar.",
    skills: ["Competitor watch", "SERP & SOV", "Audience research", "ICP scoring", "Trend mining"],
  },
  {
    name: "Scribe",
    accent: "signal",
    icon: PenLine,
    role: "Copy & content",
    desc: "Writes ads, landing pages, emails, blog posts, scripts, and one-liners in your brand voice. Cites sources. Versions everything.",
    skills: ["Ad copy", "Landing pages", "Email sequences", "Long-form SEO", "Voice & tone"],
  },
  {
    name: "Studio",
    accent: "violet",
    icon: Palette,
    role: "Design & visuals",
    desc: "Produces images, ad creatives, social posts, OG cards, and exports across every ratio. Brand tokens baked in.",
    skills: ["Image gen", "Figma frames", "Ad creatives", "OG / social", "Brand tokens"],
  },
  {
    name: "Director",
    accent: "amber",
    icon: Compass,
    role: "Strategy & planning",
    desc: "Turns goals into campaigns, picks channels, sizes budgets, and decides what to test. Owns the roadmap and the calendar.",
    skills: ["Campaign planning", "Channel mix", "Budget modeling", "Roadmaps", "Experimentation"],
  },
  {
    name: "Conductor",
    accent: "cyan",
    icon: Radio,
    role: "Distribution & scheduling",
    desc: "Posts, schedules, and pushes across paid + organic. Manages calendars, queues, UTMs, and approval flows.",
    skills: ["Paid + organic posting", "Calendar mgmt", "UTM hygiene", "Approval flows", "Cross-channel"],
  },
  {
    name: "Oracle",
    accent: "signal",
    icon: LineChart,
    role: "Analytics & insight",
    desc: "Builds live dashboards, attributes outcomes, detects winners early, and writes the weekly performance brief.",
    skills: ["Attribution", "Live dashboards", "Winner detection", "Cohort analysis", "Weekly briefs"],
  },
  {
    name: "Sentinel",
    accent: "violet",
    icon: ShieldCheck,
    role: "Brand & QA",
    desc: "Guards voice, claims, legal lines, and brand consistency. Reviews everything before it ships. Blocks what shouldn't.",
    skills: ["Brand consistency", "Claim QA", "Legal review", "Compliance", "Pre-ship gates"],
  },
];

const ACCENT_MAP: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  cyan: { text: "text-cyan", bg: "bg-cyan/10", border: "border-cyan/30", glow: "shadow-[0_0_40px_rgba(108,240,255,0.18)]" },
  signal: { text: "text-signal", bg: "bg-signal/10", border: "border-signal/30", glow: "shadow-[0_0_40px_rgba(177,255,90,0.18)]" },
  violet: { text: "text-violet", bg: "bg-violet/10", border: "border-violet/30", glow: "shadow-[0_0_40px_rgba(157,108,255,0.18)]" },
  amber: { text: "text-amber", bg: "bg-amber/10", border: "border-amber/30", glow: "shadow-[0_0_40px_rgba(255,184,107,0.18)]" },
};

export function AgentsGrid() {
  return (
    <Section
      id="agents"
      eyebrow="The 7 agents"
      title={<>Each agent is a <span className="gradient-text-brand">specialist</span>, not a chatbot.</>}
      subtitle="MAGAS7 ships with seven purpose-built agents. They coordinate through the Director, route work to each other, and report back in one thread. Add your own. Replace ours. Bring your own model."
    >
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent, i) => {
          const Icon = agent.icon;
          const ac = ACCENT_MAP[agent.accent];
          const isWide = i === 6; // last card spans wider
          return (
            <motion.article
              key={agent.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.05 }}
              className={`group relative overflow-hidden rounded-2xl border border-edge bg-surface/60 p-6 backdrop-blur-sm transition-all hover:border-edge-2 hover:bg-surface ${isWide ? "lg:col-span-3" : ""}`}
            >
              <div className={`pointer-events-none absolute -right-16 -top-16 size-56 rounded-full ${ac.bg} blur-3xl opacity-50 transition-opacity group-hover:opacity-90`} />
              <div className="relative">
                <div className="mb-5 flex items-center justify-between">
                  <div className={`inline-flex size-11 items-center justify-center rounded-xl border ${ac.border} ${ac.bg} ${ac.text}`}>
                    <Icon className="size-5" />
                  </div>
                  <span className="font-mono text-xs text-quiet">/agent · {String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-xl font-medium tracking-tight text-bone">
                  {agent.name}
                  <span className="ml-2 text-sm font-normal text-mute">— {agent.role}</span>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ash">{agent.desc}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
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
