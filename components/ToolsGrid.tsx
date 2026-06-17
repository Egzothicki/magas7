"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  Search, FileText, Megaphone, Mail, BarChart3, Calendar, Image as ImageIcon,
  GitBranch, Globe, Brain, Tag, MessageSquare, Sparkles, Workflow,
} from "lucide-react";

const TOOLS = [
  { icon: Search, name: "Audience & keyword research", desc: "ICP scoring · intent clustering · keyword maps with volume + difficulty." },
  { icon: FileText, name: "Copy lab", desc: "Ads, landing pages, emails, scripts, posts. Voice-locked. Source-cited. Version-controlled." },
  { icon: ImageIcon, name: "Creative studio", desc: "Image gen, brand-tokenized visuals, Figma frames, every ratio exported." },
  { icon: Megaphone, name: "Paid ads operator", desc: "Meta · Google · LinkedIn · X · TikTok · Reddit. Plans, launches, optimizes, reports." },
  { icon: Calendar, name: "Content calendar", desc: "Cross-channel publishing queue, approval flows, drift detection, time-zone aware." },
  { icon: Mail, name: "Email & lifecycle", desc: "Sequences, broadcasts, segmentation, trigger maps. Sync with Klaviyo, HubSpot, Mailchimp." },
  { icon: BarChart3, name: "Attribution & dashboards", desc: "Live KPIs, multi-touch attribution, winner detection, weekly auto-briefs." },
  { icon: Brain, name: "Brand voice engine", desc: "Train on your past output. Locks voice across every agent. Versioned and revertable." },
  { icon: GitBranch, name: "Campaign branching", desc: "Fork a campaign, test 3 variants, merge the winner. Git-style for marketing." },
  { icon: Globe, name: "SEO command", desc: "Site audits, content briefs, internal-link planning, schema generation, rank tracking." },
  { icon: Tag, name: "Pricing & offer lab", desc: "Test price points, packaging, offer copy. Scout pulls comps, Oracle scores outcomes." },
  { icon: MessageSquare, name: "Community ops", desc: "Reddit · Discord · X · LinkedIn. Engages, monitors brand mentions, escalates issues." },
  { icon: Sparkles, name: "Launch sequencer", desc: "Multi-week launches choreographed across PR, paid, organic, email, and partnerships." },
  { icon: Workflow, name: "Marketing CI/CD", desc: "Every asset versioned. Every change reviewed. Push live with one approval." },
];

export function ToolsGrid() {
  return (
    <Section
      id="tools"
      eyebrow="The toolset"
      title={<>The full marketing stack, <span className="gradient-text-brand">agent-operable.</span></>}
      subtitle="MAGAS7 gives every agent a deep, real-world toolset. No toy demos. These are the surfaces your team actually works in, wired up so agents can use them safely."
    >
      <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TOOLS.map((tool, i) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.04 }}
              className="group relative overflow-hidden rounded-xl border border-edge bg-surface/60 p-5 transition-colors hover:border-edge-2 hover:bg-surface"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-edge-2 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg border border-edge bg-void/60 text-signal">
                <Icon className="size-4" />
              </div>
              <h3 className="text-[15px] font-medium text-bone">{tool.name}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ash">{tool.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
